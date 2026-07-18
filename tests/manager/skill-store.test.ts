import { mkdtemp, readFile, readdir, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { parseSkillMarkdown } from "@/lib/skills/markdown";
import type { SkillDocument } from "@/lib/skills/schema";
import { SkillStore } from "../../tools/skill-manager/lib/skill-store";

describe("SkillStore", () => {
  let root: string;
  let contentDir: string;
  let trashDir: string;
  let store: SkillStore;
  let document: SkillDocument;

  beforeEach(async () => {
    root = await mkdtemp(path.join(os.tmpdir(), "weian-skill-store-"));
    contentDir = path.join(root, "content/skills");
    trashDir = path.join(root, ".skill-manager-trash");
    store = new SkillStore(contentDir, trashDir);
    const source = await readFile(
      path.join(process.cwd(), "content/skill-template.md"),
      "utf8",
    );
    document = parseSkillMarkdown(source, "example-skill.md");
  });

  afterEach(async () => {
    await rm(root, { recursive: true, force: true });
  });

  it("saves canonical Markdown atomically and reloads it", async () => {
    const saved = await store.save({ document });

    expect(saved.path).toBe(path.join(contentDir, "example-skill.md"));
    expect((await store.get("example-skill")).document).toEqual(document);
    expect(await readdir(contentDir)).toEqual(["example-skill.md"]);
  });

  it("does not silently overwrite a different existing slug", async () => {
    await store.save({ document });

    await expect(store.save({ document: structuredClone(document) })).rejects.toThrow(
      /already exists/i,
    );
  });

  it("renames only after validating and trashes the old path", async () => {
    await store.save({ document });
    const renamed = {
      ...structuredClone(document),
      id: "renamed-skill",
      slug: "renamed-skill",
    };

    await store.save({ document: renamed, originalSlug: document.slug });

    expect((await store.list()).map((item) => item.document.slug)).toEqual([
      "renamed-skill",
    ]);
    expect(await readdir(trashDir)).toHaveLength(1);
  });

  it("moves deletion to trash and returns the deleted content path", async () => {
    await store.save({ document });

    const result = await store.remove("example-skill");

    expect(result.deletedPath).toBe(path.join(contentDir, "example-skill.md"));
    expect(await readdir(trashDir)).toHaveLength(1);
    expect(await readdir(contentDir)).toHaveLength(0);
  });
});
