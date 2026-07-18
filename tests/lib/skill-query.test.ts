import { describe, expect, it } from "vitest";
import { skills } from "@/data/skills";
import {
  filterSkills,
  getCategoryCounts,
  getRelatedSkills,
  parseSkillQuery,
  serializeSkillQuery,
} from "@/lib/skill-query";

describe("skill discovery selectors", () => {
  it("matches Chinese descriptions and English tags case-insensitively", () => {
    expect(
      filterSkills(skills, { query: "数据质量" }, "zh").map(
        (skill) => skill.slug,
      ),
    ).toContain("data-analysis-assistant");
    expect(
      filterSkills(skills, { query: "github" }, "en").map(
        (skill) => skill.slug,
      ),
    ).toContain("github-workflow-helper");
  });

  it("combines category, platform, and license filters", () => {
    const result = filterSkills(
      skills,
      {
        categories: ["data-analytics"],
        platforms: ["Python"],
        licenses: ["MIT"],
      },
      "en",
    );

    expect(result).toHaveLength(1);
    expect(result[0].slug).toBe("data-analysis-assistant");
  });

  it("supports tag filters and download sorting", () => {
    const result = filterSkills(
      skills,
      { tags: ["Writing"], sort: "downloads" },
      "en",
    );

    expect(result.map((skill) => skill.slug)).toEqual([
      "research-writing-assistant",
      "content-publishing-assistant",
    ]);
  });

  it("round-trips shareable query state", () => {
    const state = {
      query: "PDF",
      categories: ["files-pdf" as const],
      platforms: ["Local"],
      sort: "updated" as const,
      view: "list" as const,
    };

    expect(parseSkillQuery(serializeSkillQuery(state))).toMatchObject(state);
  });

  it("parses and applies featured discovery and search-focus state", () => {
    const state = parseSkillQuery("featured=true&focus=search");

    expect(state).toMatchObject({ featured: true, focusSearch: true });
    expect(filterSkills(skills, state, "en")).toHaveLength(6);
    expect(serializeSkillQuery(state).toString()).toBe(
      "featured=true&focus=search",
    );
  });

  it("round-trips and applies the latest 30-day catalog window", () => {
    const catalog = [
      { ...skills[0], id: "recent", slug: "recent", addedAt: "2026-07-12" },
      { ...skills[1], id: "boundary", slug: "boundary", addedAt: "2026-06-12" },
      { ...skills[2], id: "old", slug: "old", addedAt: "2026-06-11" },
    ];
    const state = parseSkillQuery("period=30d&sort=added");

    expect(state).toMatchObject({ period: "30d", sort: "added" });
    expect(serializeSkillQuery(state).toString()).toBe("period=30d&sort=added");
    expect(filterSkills(catalog, state, "en").map((skill) => skill.slug)).toEqual([
      "recent",
      "boundary",
    ]);
  });

  it("ignores unsupported period values", () => {
    expect(parseSkillQuery("period=year").period).toBeUndefined();
  });

  it("ranks same-category and shared-tag skills without returning the source", () => {
    const source = skills.find(
      (skill) => skill.slug === "research-writing-assistant",
    )!;
    const related = getRelatedSkills(source, skills, 3);

    expect(related).toHaveLength(3);
    expect(related.map((skill) => skill.slug)).not.toContain(source.slug);
    expect(related[0].slug).toBe("content-publishing-assistant");
  });

  it("derives category counts from the supplied collection", () => {
    const counts = getCategoryCounts(skills);

    expect(counts["data-analytics"]).toBe(1);
    expect(Object.values(counts).reduce((sum, count) => sum + count, 0)).toBe(
      skills.length,
    );
  });
});
