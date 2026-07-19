import { readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { describe, expect, it } from "vitest";
import { parseSkillMarkdown } from "@/lib/skills/markdown";
import { skillFrontmatterSchema } from "@/lib/skills/schema";

/**
 * The template documented for agents is only useful if it still imports. These
 * guard it against drifting away from the schema it is supposed to demonstrate.
 */
describe("agent-facing Skill import template", () => {
  const templatePath = path.join(process.cwd(), "docs/skill-import-template.md");
  const fileName = "skill-import-template.md";

  async function readTemplate(): Promise<string> {
    return readFile(templatePath, "utf8");
  }

  it("parses exactly as the Skill manager would parse it", async () => {
    const document = parseSkillMarkdown(await readTemplate(), fileName);

    expect(document.slug).toBe("skill-import-template");
    expect(document.description.zh).not.toHaveLength(0);
    expect(document.description.en).not.toHaveLength(0);
    expect(document.installation.length).toBeGreaterThan(0);
    expect(document.changelog.length).toBeGreaterThan(0);
    expect(document.faq.length).toBeGreaterThan(0);
  });

  it("carries every frontmatter field an agent has to fill", async () => {
    const present = new Set(Object.keys(matter(await readTemplate()).data));

    // A field missing from the template is a field an agent will silently omit.
    for (const field of Object.keys(skillFrontmatterSchema.shape)) {
      expect(present).toContain(field);
    }
  });

  it("cannot reach the site or claim editorial standing on import", async () => {
    const document = parseSkillMarkdown(await readTemplate(), fileName);

    // The guide tells agents to leave these alone; the template must agree.
    expect(document.status).toBe("draft");
    expect(document.featured).toBe(false);
    expect(document.featuredRank).toBe(0);
    expect(document.verified).toBe(false);
  });
});
