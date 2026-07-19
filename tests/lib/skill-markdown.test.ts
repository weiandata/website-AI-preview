import { readFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  parseSkillMarkdown,
  serializeSkillMarkdown,
  SkillContentError,
  validateSkillDocuments,
} from "@/lib/skills/markdown";

describe("Skill Markdown", () => {
  it("parses the official template and round-trips every field", async () => {
    const source = await readFile(
      path.join(process.cwd(), "content/skill-template.md"),
      "utf8",
    );
    const parsed = parseSkillMarkdown(source, "example-skill.md");

    expect(parsed.slug).toBe("example-skill");
    expect(parsed.description.zh).toContain("Skill");
    expect(parsed.features.en).toHaveLength(3);
    expect(parsed.installation).toHaveLength(2);
    expect(
      parseSkillMarkdown(
        serializeSkillMarkdown(parsed),
        "example-skill.md",
      ),
    ).toEqual(parsed);
  });

  it("reports a file-scoped error for invalid headings", () => {
    expect(() =>
      parseSkillMarkdown("---\nschemaVersion: 1\n---", "broken.md"),
    ).toThrow(/broken\.md/);
  });

  it("collects every problem so one edit pass can fix the file", () => {
    // Frontmatter, sections and section bodies are all broken at once.
    let error: SkillContentError | undefined;
    try {
      parseSkillMarkdown(
        [
          "---",
          "schemaVersion: 1",
          "status: draft",
          "slug: Bad Slug",
          "name: Demo",
          "---",
          "",
          "# Description",
          "",
          "## zh",
          "",
          "只有中文",
          "",
          "# Installation",
          "",
          "普通段落而不是代码块",
          "",
          "# Unknown Section",
          "",
          "内容",
        ].join("\n"),
        "demo.md",
      );
    } catch (thrown) {
      error = thrown as SkillContentError;
    }

    expect(error).toBeInstanceOf(SkillContentError);
    const issues = error!.issues;
    // Missing frontmatter fields are reported together, not one per attempt.
    expect(issues.filter((issue) => issue.field).length).toBeGreaterThan(3);
    expect(issues.map((issue) => issue.field)).toContain("category");
    expect(issues.map((issue) => issue.field)).toContain("slug");
    // Body problems survive a broken frontmatter instead of being hidden by it.
    expect(issues.map((issue) => issue.section)).toContain("Unknown Section");
    expect(issues.map((issue) => issue.section)).toContain("Description");
    expect(issues.map((issue) => issue.section)).toContain("Installation");
    expect(issues.map((issue) => issue.section)).toContain("FAQ");
    // Every issue carries guidance the administrator can act on.
    expect(issues.every((issue) => Boolean(issue.hint))).toBe(true);
  });

  it("keeps the thrown message readable when a single problem exists", () => {
    expect(() =>
      parseSkillMarkdown("---\nschemaVersion: 2\n---", "broken.md"),
    ).toThrow(/broken\.md/);
  });

  it("rejects duplicate slugs", async () => {
    const source = await readFile(
      path.join(process.cwd(), "content/skill-template.md"),
      "utf8",
    );
    const document = parseSkillMarkdown(
      source.replaceAll("example-skill", "same"),
      "same.md",
    );

    expect(() => validateSkillDocuments([document, document])).toThrow(
      /duplicate slug/i,
    );
  });
});
