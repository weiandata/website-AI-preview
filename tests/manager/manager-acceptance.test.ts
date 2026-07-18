import { mkdtemp, readFile, readdir, rm } from "node:fs/promises";
import type { Server } from "node:http";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { parseSkillMarkdown } from "@/lib/skills/markdown";
import type { SkillDocument } from "@/lib/skills/schema";
import { GitPublisher, type GitRunner } from "../../tools/skill-manager/lib/git-publisher";
import { SkillStore } from "../../tools/skill-manager/lib/skill-store";
import { createSkillManagerApp } from "../../tools/skill-manager/server";

/**
 * The workflow an administrator actually performs, end to end against the real
 * store: bring in the template, fill it out, save, reopen, export, feature and
 * reorder, delete into the trash, and try to publish something they must not.
 */
describe("administrator workflow acceptance", () => {
  let root: string;
  let contentDir: string;
  let trashDir: string;
  let server: Server;
  let baseUrl: string;
  let template: string;

  beforeEach(async () => {
    root = await mkdtemp(path.join(os.tmpdir(), "weian-acceptance-"));
    contentDir = path.join(root, "content/skills");
    trashDir = path.join(root, ".skill-manager-trash");
    const templatePath = path.join(process.cwd(), "content/skill-template.md");
    template = await readFile(templatePath, "utf8");

    const runner: GitRunner = async (args) => {
      const ok = (stdout = "") => ({ stdout, stderr: "", exitCode: 0 });
      const key = args.join(" ");
      if (key === "rev-parse --abbrev-ref HEAD") return ok("main");
      if (key === "remote get-url origin") return ok("git@github.com:weian/website.git");
      if (key === "rev-list --count HEAD..origin/main") return ok("0");
      if (key === "status --porcelain") return ok("");
      if (key === "diff --cached --quiet") return { stdout: "", stderr: "", exitCode: 1 };
      if (key === "rev-parse HEAD") return ok("acceptance1");
      return ok();
    };

    const app = createSkillManagerApp({
      store: new SkillStore(contentDir, trashDir),
      templatePath,
      root,
      publisher: new GitPublisher(root, runner),
    });
    await new Promise<void>((resolve, reject) => {
      server = app.listen(0, "127.0.0.1", (error?: Error) => (error ? reject(error) : resolve()));
    });
    const address = server.address();
    if (!address || typeof address === "string") throw new Error("missing port");
    baseUrl = `http://127.0.0.1:${address.port}`;
  });

  afterEach(async () => {
    if (server) await new Promise<void>((resolve) => server.close(() => resolve()));
    await rm(root, { recursive: true, force: true });
  });

  const json = async (url: string, init?: RequestInit) => {
    const response = await fetch(`${baseUrl}${url}`, init);
    return { status: response.status, body: await response.json() };
  };

  const put = (document: SkillDocument, originalSlug?: string) =>
    json(`/api/skills/${document.slug}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ document, originalSlug }),
    });

  it("carries an administrator from template import through publication safety", async () => {
    // 1. Import the official template.
    const templateResponse = await fetch(`${baseUrl}/api/template`);
    expect(templateResponse.status).toBe(200);
    const imported = parseSkillMarkdown(await templateResponse.text(), "example-skill.md");

    // 2. Edit every field group.
    const edited: SkillDocument = {
      ...structuredClone(imported),
      id: "acceptance-skill",
      slug: "acceptance-skill",
      status: "published",
      name: "Acceptance Skill",
      nameZh: "验收 Skill",
      category: "productivity",
      icon: "productivity",
      tags: ["Acceptance", "Workflow"],
      platforms: ["Claude", "ChatGPT"],
      author: "WEIAN DATA",
      version: "2.1.0",
      license: "Apache-2.0",
      verified: true,
      stars: 42,
      downloads: 108,
      description: { zh: "验收用的中文描述。", en: "Acceptance English description." },
      longDescription: { zh: "更完整的中文说明。", en: "Longer English explanation." },
      features: { zh: ["功能一", "功能二"], en: ["Feature one", "Feature two"] },
      useCases: { zh: ["场景一"], en: ["Use case one"] },
      installation: ["npm install acceptance-skill"],
      usage: { zh: "中文使用说明。", en: "English usage notes." },
      workflow: { zh: ["第一步", "第二步"], en: ["Step one", "Step two"] },
      changelog: [
        { version: "2.1.0", date: "2026-07-19", notes: { zh: "验收更新。", en: "Acceptance update." } },
      ],
      faq: [
        { question: { zh: "这是什么？", en: "What is this?" }, answer: { zh: "验收用例。", en: "An acceptance case." } },
      ],
    };

    // 3. Save it as a new Markdown file.
    const saved = await put(edited);
    expect(saved.status).toBe(200);
    expect(await readdir(contentDir)).toContain("acceptance-skill.md");

    // 4. Reopen it and get identical values back.
    const reopened = await json("/api/skills/acceptance-skill");
    expect(reopened.status).toBe(200);
    expect(reopened.body.document).toEqual(edited);

    // 5. Export the canonical Markdown and parse it back losslessly.
    const exported = await json("/api/serialize", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ document: edited }),
    });
    expect(exported.status).toBe(200);
    expect(parseSkillMarkdown(exported.body.source, "acceptance-skill.md")).toEqual(edited);

    // 6. Feature two Skills and set their administrator ranks.
    const second: SkillDocument = {
      ...structuredClone(edited),
      id: "acceptance-second",
      slug: "acceptance-second",
      name: "Acceptance Second",
      nameZh: "验收第二个",
    };
    expect(
      (await put({ ...edited, featured: true, featuredRank: 2 }, "acceptance-skill")).status,
    ).toBe(200);
    expect((await put({ ...second, featured: true, featuredRank: 1 })).status).toBe(200);

    const listed = await json("/api/skills");
    const ranks = Object.fromEntries(
      listed.body.items.map((item: { document: SkillDocument }) => [
        item.document.slug,
        item.document.featuredRank,
      ]),
    );
    expect(ranks).toEqual({ "acceptance-skill": 2, "acceptance-second": 1 });

    // 7. Delete a Skill; it lands in the recoverable trash, not oblivion.
    const removed = await json("/api/skills/acceptance-second", { method: "DELETE" });
    expect(removed.status).toBe(200);
    expect(await readdir(contentDir)).not.toContain("acceptance-second.md");
    expect((await readdir(trashDir)).some((name) => name.startsWith("acceptance-second"))).toBe(
      true,
    );

    // 8. Publishing stages only this session's content files, never code.
    const publish = await json("/api/publish", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        message: "content: acceptance",
        paths: ["src/app/page.tsx"],
      }),
    });
    expect(publish.status).toBe(200);
    expect(publish.body.pushed).toBe(true);
  });

  it("rejects a code path even when it is the only thing offered", async () => {
    const publisher = new GitPublisher(root, async () => ({
      stdout: "",
      stderr: "",
      exitCode: 0,
    }));

    await expect(publisher.publish(["src/app/page.tsx"], "content: bad")).rejects.toThrow(
      /content\/skills/,
    );
  });

  it("refuses invalid Markdown with a field-level message", async () => {
    const response = await json("/api/validate", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        source: template.replace("slug: example-skill", "slug: Not A Slug"),
        fileName: "example-skill.md",
      }),
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toMatchObject({ code: "VALIDATION_ERROR" });
  });
});
