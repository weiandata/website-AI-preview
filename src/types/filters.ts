import type { CategoryId } from "./content";

export type SkillSort = "recommended" | "updated" | "added" | "name" | "downloads";
export type SkillView = "grid" | "list";
export type SkillPeriod = "30d";

export type SkillFilterState = {
  query?: string;
  featured?: boolean;
  focusSearch?: boolean;
  period?: SkillPeriod;
  categories?: CategoryId[];
  platforms?: string[];
  licenses?: string[];
  tags?: string[];
  sort?: SkillSort;
  view?: SkillView;
};
