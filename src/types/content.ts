export type Locale = "zh" | "en";

export type LocalizedText = {
  zh: string;
  en: string;
};

export type LocalizedTextList = {
  zh: string[];
  en: string[];
};

export type CategoryId =
  | "development"
  | "data-analytics"
  | "research-writing"
  | "content-creation"
  | "automation"
  | "image-design"
  | "files-pdf"
  | "productivity";

export type Category = {
  id: CategoryId;
  name: LocalizedText;
  description: LocalizedText;
  icon: SkillIconKey;
};

export type SkillIconKey =
  | "analysis"
  | "automation"
  | "code"
  | "document"
  | "image"
  | "productivity"
  | "research"
  | "writing";

export type SkillFaq = {
  question: LocalizedText;
  answer: LocalizedText;
};

export type SkillChangelog = {
  version: string;
  date: string;
  notes: LocalizedText;
};

export type Skill = {
  id: string;
  slug: string;
  name: string;
  nameZh?: string;
  description: LocalizedText;
  longDescription: LocalizedText;
  category: CategoryId;
  tags: string[];
  platforms: string[];
  author: string;
  version: string;
  license: string;
  updatedAt: string;
  addedAt: string;
  githubUrl?: string;
  officialUrl?: string;
  downloadUrl?: string;
  featured: boolean;
  featuredRank: number;
  verified: boolean;
  icon: SkillIconKey;
  stars: number;
  features: LocalizedTextList;
  useCases: LocalizedTextList;
  installation: string[];
  usage: LocalizedText;
  workflow: LocalizedTextList;
  changelog: SkillChangelog[];
  faq: SkillFaq[];
};
