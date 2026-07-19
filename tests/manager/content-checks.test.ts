import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { parseSkillMarkdown } from "@/lib/skills/markdown";
import type { SkillDocument } from "@/lib/skills/schema";
import { checkLinks, extractLinks } from "../../tools/skill-manager/lib/link-check";
import { createMarkdownStyleFixer } from "../../tools/skill-manager/lib/markdown-style";
import { SkillStore } from "../../tools/skill-manager/lib/skill-store";

describe("publish-time content checks", () => {
  describe("link extraction", () => {
    it("finds links in frontmatter and prose alike", () => {
      const source = [
        "---",
        "githubUrl: https://github.com/ibelick/ui-skills",
        "---",
        "",
        "See [the guide](https://guide.test/start) and <https://bare.test/page>.",
      ].join("\n");

      expect(extractLinks(source)).toEqual([
        "https://bare.test/page",
        "https://github.com/ibelick/ui-skills",
        "https://guide.test/start",
      ]);
    });

    it("skips the addresses the CI check never resolves", () => {
      const source = [
        "http://localhost:3000",
        "http://127.0.0.1:4174/preview",
        "https://example.com/projects/example-skill",
        "http://127.0.0.1:$port",
      ].join("\n");

      expect(extractLinks(source)).toEqual([]);
    });

    it("drops sentence punctuation that is not part of the address", () => {
      expect(extractLinks("Read https://weian.test/guide.")).toEqual([
        "https://weian.test/guide",
      ]);
    });
  });

  describe("link checking", () => {
    it("blocks publishing on a dead link", async () => {
      const problems = await checkLinks(
        [{ path: "content/skills/a.md", source: "https://weian.test/gone" }],
        async () => ({ ok: false, status: 404 }),
      );

      expect(problems).toEqual([
        {
          path: "content/skills/a.md",
          url: "https://weian.test/gone",
          reason: "打不开（HTTP 404）",
          blocking: true,
        },
      ]);
    });

    it("only warns when the network could not confirm the link", async () => {
      const problems = await checkLinks(
        [{ path: "content/skills/a.md", source: "https://weian.test/slow" }],
        async () => {
          const error = new Error("timed out");
          error.name = "TimeoutError";
          throw error;
        },
      );

      expect(problems).toMatchObject([{ blocking: false, reason: "检查超时，没能确认" }]);
    });

    it("reports nothing when every link answers", async () => {
      const problems = await checkLinks(
        [{ path: "content/skills/a.md", source: "https://weian.test/ok" }],
        async () => ({ ok: true, status: 200 }),
      );

      expect(problems).toEqual([]);
    });
  });

  describe("Markdown style repair on save", () => {
    let root: string;
    let document: SkillDocument;

    beforeEach(async () => {
      root = await mkdtemp(path.join(os.tmpdir(), "weian-skill-style-"));
      const templatePath = path.join(process.cwd(), "content/skill-template.md");
      document = parseSkillMarkdown(await readFile(templatePath, "utf8"), "example-skill.md");
    });

    afterEach(async () => {
      await rm(root, { recursive: true, force: true });
    });

    it("repairs administrator prose that would fail the CI style check", async () => {
      const fixer = createMarkdownStyleFixer(process.cwd());
      // A list with no blank line above it is what MD032 rejects.
      const fixed = await fixer("# Title\n**Files:**\n- one\n");

      expect(fixed).toBe("# Title\n\n**Files:**\n\n- one\n");
    });

    it("writes the repaired Markdown, not the raw serialization", async () => {
      const store = new SkillStore(
        path.join(root, "content/skills"),
        path.join(root, ".skill-manager-trash"),
        async (source) => `${source}\n<!-- repaired -->\n`,
      );

      const saved = await store.save({ document });

      expect(saved.source).toContain("<!-- repaired -->");
      expect(await readFile(saved.path, "utf8")).toContain("<!-- repaired -->");
    });
  });
});
