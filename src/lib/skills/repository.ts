import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import type { Skill } from "@/types/content";
import { parseSkillMarkdown, validateSkillDocuments } from "./markdown";
import type { SkillDocument } from "./schema";

export type SkillTitleRecord = Pick<Skill, "slug" | "name" | "nameZh">;

export async function getSkillDocuments(
  contentDir = path.join(process.cwd(), "content/skills"),
): Promise<SkillDocument[]> {
  const fileNames = (await readdir(contentDir))
    .filter((fileName) => fileName.endsWith(".md"))
    .sort((left, right) => left.localeCompare(right));
  const documents = await Promise.all(
    fileNames.map(async (fileName) => {
      const source = await readFile(path.join(contentDir, fileName), "utf8");
      return parseSkillMarkdown(source, fileName);
    }),
  );
  validateSkillDocuments(documents);
  return documents;
}

function toPublicSkill(document: SkillDocument): Skill {
  const skill: Partial<SkillDocument> = { ...document };
  delete skill.schemaVersion;
  delete skill.status;
  return skill as Skill;
}

function comparePublishedSkills(left: Skill, right: Skill): number {
  const featuredOrder = Number(right.featured) - Number(left.featured);
  if (featuredOrder) return featuredOrder;
  if (left.featured && right.featured) {
    const rankOrder = left.featuredRank - right.featuredRank;
    if (rankOrder) return rankOrder;
  }
  return (
    right.addedAt.localeCompare(left.addedAt) || left.slug.localeCompare(right.slug)
  );
}

export async function getPublishedSkills(contentDir?: string): Promise<Skill[]> {
  return (await getSkillDocuments(contentDir))
    .filter((document) => document.status === "published")
    .map(toPublicSkill)
    .sort(comparePublishedSkills);
}

export async function getPublishedSkillBySlug(
  slug: string,
  contentDir?: string,
): Promise<Skill | undefined> {
  return (await getPublishedSkills(contentDir)).find((skill) => skill.slug === slug);
}
