import type { CategoryId } from "./content";

export type SkillSort = "recommended" | "updated" | "added" | "name" | "downloads";
export type SkillView = "grid" | "list";

export type SkillFilterState = {
  query?: string;
  categories?: CategoryId[];
  platforms?: string[];
  licenses?: string[];
  tags?: string[];
  sort?: SkillSort;
  view?: SkillView;
};
