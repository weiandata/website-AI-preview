import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getPublishedSkills } from "@/lib/skills/repository";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const skills = await getPublishedSkills();
  const staticRoutes = ["", "/skills", "/about"].map(
    (path) => ({
      url: `${siteConfig.url}${path}`,
      lastModified: new Date("2026-07-18"),
      changeFrequency: path === "/skills" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : path === "/skills" ? 0.9 : 0.7,
    }),
  );
  const skillRoutes = skills.map((skill) => ({
    url: `${siteConfig.url}/skills/${skill.slug}`,
    lastModified: new Date(skill.updatedAt),
    changeFrequency: "monthly" as const,
    priority: skill.featured ? 0.8 : 0.7,
  }));

  return [...staticRoutes, ...skillRoutes];
}
