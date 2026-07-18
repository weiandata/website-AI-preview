import type { MetadataRoute } from "next";
import { skills } from "@/data/skills";

const baseUrl = "https://skills.weian-data.example";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/skills", "/categories", "/submit", "/about"].map(
    (path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date("2026-07-18"),
      changeFrequency: path === "/skills" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : path === "/skills" ? 0.9 : 0.7,
    }),
  );
  const skillRoutes = skills.map((skill) => ({
    url: `${baseUrl}/skills/${skill.slug}`,
    lastModified: new Date(skill.updatedAt),
    changeFrequency: "monthly" as const,
    priority: skill.featured ? 0.8 : 0.7,
  }));

  return [...staticRoutes, ...skillRoutes];
}
