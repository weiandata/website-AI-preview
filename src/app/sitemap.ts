import type { MetadataRoute } from "next";
import { skills } from "@/data/skills";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/skills", "/categories", "/about"].map(
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
