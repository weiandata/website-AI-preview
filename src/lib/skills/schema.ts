import { z } from "zod";
import type { Skill } from "@/types/content";

export const skillStatuses = ["draft", "published"] as const;
export type SkillStatus = (typeof skillStatuses)[number];

export type SkillDocument = Skill & {
  schemaVersion: 1;
  status: SkillStatus;
};

export const skillFrontmatterSchema = z
  .object({
    schemaVersion: z.literal(1),
    status: z.enum(skillStatuses),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    name: z.string().min(1),
    nameZh: z.string().min(1),
    category: z.enum([
      "development",
      "data-analytics",
      "research-writing",
      "content-creation",
      "automation",
      "image-design",
      "files-pdf",
      "productivity",
    ]),
    tags: z.array(z.string().min(1)),
    platforms: z.array(z.string().min(1)),
    author: z.string().min(1),
    version: z.string().min(1),
    license: z.string().min(1),
    addedAt: z.iso.date(),
    updatedAt: z.iso.date(),
    githubUrl: z.union([z.url(), z.literal("")]).optional(),
    officialUrl: z.union([z.url(), z.literal("")]).optional(),
    downloadUrl: z.union([z.url(), z.literal("")]).optional(),
    featured: z.boolean(),
    featuredRank: z.number().int().nonnegative(),
    verified: z.boolean(),
    icon: z.enum([
      "analysis",
      "automation",
      "code",
      "document",
      "image",
      "productivity",
      "research",
      "writing",
    ]),
    stars: z.number().int().nonnegative(),
  })
  .strict();

export type SkillFrontmatter = z.infer<typeof skillFrontmatterSchema>;
