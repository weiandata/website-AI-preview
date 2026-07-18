import { readFile } from "node:fs/promises";
import path from "node:path";
import { expect, it } from "vitest";
import { skills as legacySkills } from "@/data/skills";
import { parseSkillMarkdown } from "@/lib/skills/markdown";

it("migrates every legacy Skill without field loss", async () => {
  const migrated = await Promise.all(
    legacySkills.map(async (legacy) => {
      const fileName = `${legacy.slug}.md`;
      const source = await readFile(
        path.join(process.cwd(), "content/skills", fileName),
        "utf8",
      );
      return parseSkillMarkdown(source, fileName);
    }),
  );

  expect(migrated).toHaveLength(legacySkills.length);
  for (const legacy of legacySkills) {
    const document = migrated.find((item) => item.slug === legacy.slug);
    expect(document).toBeDefined();
    const { schemaVersion, status, id, ...publicSkill } = document!;
    const { id: legacyId, ...legacyContent } = legacy;
    expect(schemaVersion).toBe(1);
    expect(status).toBe("published");
    expect(id).toBe(legacy.slug);
    expect(legacyId).toMatch(/^skill-/);
    expect(publicSkill).toEqual(legacyContent);
  }
});
