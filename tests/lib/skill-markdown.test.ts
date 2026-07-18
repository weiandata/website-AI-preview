import { readFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  parseSkillMarkdown,
  serializeSkillMarkdown,
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
