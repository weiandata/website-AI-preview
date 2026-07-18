import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  parseSkillMarkdown,
  serializeSkillMarkdown,
} from "@/lib/skills/markdown";
import {
  getPublishedSkillBySlug,
  getPublishedSkills,
  getSkillDocuments,
} from "@/lib/skills/repository";
import type { SkillDocument } from "@/lib/skills/schema";

describe("Markdown Skill repository", () => {
  let tempDir: string;
  let template: SkillDocument;

  beforeEach(async () => {
    tempDir = await mkdtemp(path.join(os.tmpdir(), "weian-skills-"));
    const source = await readFile(
      path.join(process.cwd(), "content/skill-template.md"),
      "utf8",
    );
    template = parseSkillMarkdown(source, "example-skill.md");
  });

  afterEach(async () => {
    await rm(tempDir, { recursive: true, force: true });
  });

  async function writeDocument(
    slug: string,
    overrides: Partial<SkillDocument> = {},
  ): Promise<void> {
    const document: SkillDocument = {
      ...structuredClone(template),
      id: slug,
      slug,
      ...overrides,
    };
    await writeFile(
      path.join(tempDir, `${slug}.md`),
      serializeSkillMarkdown(document),
      "utf8",
    );
  }

  it("returns only published Skills in administrator order", async () => {
    await writeDocument("rank-two", {
      featured: true,
      featuredRank: 2,
      addedAt: "2026-07-18",
    });
    await writeDocument("draft-rank-one", {
      status: "draft",
      featured: true,
      featuredRank: 1,
    });
    await writeDocument("rank-one", {
      featured: true,
      featuredRank: 1,
      addedAt: "2026-07-17",
    });

    const skills = await getPublishedSkills(tempDir);

    expect(skills.map((skill) => skill.slug)).toEqual(["rank-one", "rank-two"]);
    expect(skills.every((skill) => !("status" in skill))).toBe(true);
    expect(await getPublishedSkillBySlug("draft-rank-one", tempDir)).toBeUndefined();
  });

  it("fails the repository load when any document is invalid", async () => {
    await writeFile(path.join(tempDir, "broken.md"), "invalid", "utf8");

    await expect(getSkillDocuments(tempDir)).rejects.toThrow(/broken\.md/);
  });
});
