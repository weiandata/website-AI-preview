import type { CategoryId, Locale, Skill } from "@/types/content";
import type {
  SkillFilterState,
  SkillPeriod,
  SkillSort,
  SkillView,
} from "@/types/filters";

const categoryIds = new Set<CategoryId>([
  "development",
  "data-analytics",
  "research-writing",
  "content-creation",
  "automation",
  "image-design",
  "files-pdf",
  "productivity",
]);

const sortValues = new Set<SkillSort>([
  "recommended",
  "updated",
  "added",
  "name",
  "stars",
]);

const viewValues = new Set<SkillView>(["grid", "list"]);
const periodValues = new Set<SkillPeriod>(["30d"]);

function normalize(value: string): string {
  return value.trim().toLocaleLowerCase();
}

function includesAny(source: string[], selected?: string[]): boolean {
  if (!selected?.length) return true;
  const normalizedSource = source.map(normalize);
  return selected.some((value) => normalizedSource.includes(normalize(value)));
}

function createSearchDocument(skill: Skill): string {
  return normalize(
    [
      skill.name,
      skill.nameZh ?? "",
      skill.description.zh,
      skill.description.en,
      skill.longDescription.zh,
      skill.longDescription.en,
      skill.category,
      ...skill.tags,
      ...skill.platforms,
      ...skill.features.zh,
      ...skill.features.en,
      ...skill.useCases.zh,
      ...skill.useCases.en,
    ].join(" "),
  );
}

function getPeriodCutoff(
  collection: Skill[],
  period?: SkillPeriod,
): string | undefined {
  if (period !== "30d" || collection.length === 0) return undefined;

  const latest = collection.reduce(
    (current, skill) => (skill.addedAt > current ? skill.addedAt : current),
    collection[0].addedAt,
  );
  const cutoff = new Date(`${latest}T00:00:00.000Z`);
  cutoff.setUTCDate(cutoff.getUTCDate() - 30);
  return cutoff.toISOString().slice(0, 10);
}

function sortSkills(collection: Skill[], sort: SkillSort, locale: Locale): Skill[] {
  return [...collection].sort((left, right) => {
    if (sort === "updated") {
      return right.updatedAt.localeCompare(left.updatedAt);
    }
    if (sort === "added") {
      return right.addedAt.localeCompare(left.addedAt);
    }
    if (sort === "name") {
      const leftName = locale === "zh" ? left.nameZh ?? left.name : left.name;
      const rightName = locale === "zh" ? right.nameZh ?? right.name : right.name;
      return leftName.localeCompare(rightName, locale === "zh" ? "zh-CN" : "en");
    }
    if (sort === "stars") {
      return right.stars - left.stars;
    }

    const featuredOrder = Number(right.featured) - Number(left.featured);
    if (featuredOrder) return featuredOrder;
    if (left.featured && right.featured) {
      const rankOrder = left.featuredRank - right.featuredRank;
      if (rankOrder) return rankOrder;
    }
    return (
      Number(right.verified) - Number(left.verified) ||
      right.stars - left.stars
    );
  });
}

export function filterSkills(
  collection: Skill[],
  filters: SkillFilterState,
  locale: Locale,
): Skill[] {
  const query = normalize(filters.query ?? "");
  const periodCutoff = getPeriodCutoff(collection, filters.period);
  const filtered = collection.filter((skill) => {
    const queryMatches = !query || createSearchDocument(skill).includes(query);
    const featuredMatches = !filters.featured || skill.featured;
    const categoryMatches =
      !filters.categories?.length || filters.categories.includes(skill.category);
    const platformMatches = includesAny(skill.platforms, filters.platforms);
    const licenseMatches = includesAny([skill.license], filters.licenses);
    const tagMatches = includesAny(skill.tags, filters.tags);
    const periodMatches = !periodCutoff || skill.addedAt >= periodCutoff;

    return (
      queryMatches &&
      featuredMatches &&
      categoryMatches &&
      platformMatches &&
      licenseMatches &&
      tagMatches &&
      periodMatches
    );
  });

  return sortSkills(filtered, filters.sort ?? "recommended", locale);
}

export function getRelatedSkills(
  source: Skill,
  collection: Skill[],
  limit = 3,
): Skill[] {
  const sourceTags = new Set(source.tags.map(normalize));

  return collection
    .filter((skill) => skill.id !== source.id)
    .map((skill) => {
      const sharedTags = skill.tags.filter((tag) => sourceTags.has(normalize(tag))).length;
      const score =
        (skill.category === source.category ? 6 : 0) +
        sharedTags * 4 +
        Number(skill.featured) +
        Number(skill.verified);
      return { skill, score };
    })
    .sort(
      (left, right) =>
        right.score - left.score || right.skill.stars - left.skill.stars,
    )
    .slice(0, limit)
    .map(({ skill }) => skill);
}

export function getCategoryCounts(
  collection: Skill[],
): Record<CategoryId, number> {
  const counts = Object.fromEntries(
    [...categoryIds].map((category) => [category, 0]),
  ) as Record<CategoryId, number>;

  for (const skill of collection) {
    counts[skill.category] += 1;
  }

  return counts;
}

function getSourceParams(
  source: URLSearchParams | string,
): URLSearchParams {
  return typeof source === "string" ? new URLSearchParams(source) : source;
}

export function parseSkillQuery(
  source: URLSearchParams | string,
): SkillFilterState {
  const params = getSourceParams(source);
  const categories = params
    .getAll("category")
    .filter((value): value is CategoryId => categoryIds.has(value as CategoryId));
  const sort = params.get("sort") as SkillSort | null;
  const view = params.get("view") as SkillView | null;
  const period = params.get("period") as SkillPeriod | null;
  const platforms = params.getAll("platform").filter(Boolean);
  const licenses = params.getAll("license").filter(Boolean);
  const tags = params.getAll("tag").filter(Boolean);

  return {
    query: params.get("q") || undefined,
    featured: params.get("featured") === "true" || undefined,
    focusSearch: params.get("focus") === "search" || undefined,
    period: period && periodValues.has(period) ? period : undefined,
    categories: categories.length ? categories : undefined,
    platforms: platforms.length ? platforms : undefined,
    licenses: licenses.length ? licenses : undefined,
    tags: tags.length ? tags : undefined,
    sort: sort && sortValues.has(sort) ? sort : undefined,
    view: view && viewValues.has(view) ? view : undefined,
  };
}

export function serializeSkillQuery(
  state: SkillFilterState,
): URLSearchParams {
  const params = new URLSearchParams();
  if (state.query?.trim()) params.set("q", state.query.trim());
  if (state.featured) params.set("featured", "true");
  if (state.focusSearch) params.set("focus", "search");
  if (state.period) params.set("period", state.period);
  state.categories?.forEach((value) => params.append("category", value));
  state.platforms?.forEach((value) => params.append("platform", value));
  state.licenses?.forEach((value) => params.append("license", value));
  state.tags?.forEach((value) => params.append("tag", value));
  if (state.sort && state.sort !== "recommended") params.set("sort", state.sort);
  if (state.view && state.view !== "grid") params.set("view", state.view);
  return params;
}
