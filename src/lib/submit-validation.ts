import type { Locale } from "@/types/content";

export type SkillSubmission = {
  skillName: string;
  sourceUrl: string;
  introduction: string;
  category: string;
  platforms: string[];
  license: string;
  submitterName: string;
  email: string;
  notes: string;
};

export type SubmissionErrors = Partial<Record<keyof SkillSubmission, string>>;

export const emptySubmission: SkillSubmission = {
  skillName: "",
  sourceUrl: "",
  introduction: "",
  category: "",
  platforms: [],
  license: "",
  submitterName: "",
  email: "",
  notes: "",
};

const messages = {
  zh: {
    skillName: "请输入 Skill 名称",
    sourceUrl: "请输入项目地址",
    invalidUrl: "请输入有效的 HTTPS 项目地址",
    introduction: "请输入简短介绍",
    category: "请选择分类",
    platforms: "请至少选择一个支持平台",
    license: "请选择许可证",
    submitterName: "请输入提交人姓名",
    email: "请输入提交人邮箱",
    invalidEmail: "请输入有效的邮箱地址",
  },
  en: {
    skillName: "Enter the Skill name",
    sourceUrl: "Enter the project URL",
    invalidUrl: "Use a valid HTTPS project URL",
    introduction: "Enter a short introduction",
    category: "Select a category",
    platforms: "Select at least one supported platform",
    license: "Select a license",
    submitterName: "Enter the submitter name",
    email: "Enter the submitter email",
    invalidEmail: "Enter a valid email address",
  },
} as const;

function isSecureUrl(value: string): boolean {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

export function validateSubmission(
  values: SkillSubmission,
  locale: Locale,
): SubmissionErrors {
  const copy = messages[locale];
  const errors: SubmissionErrors = {};

  if (!values.skillName.trim()) errors.skillName = copy.skillName;
  if (!values.sourceUrl.trim()) {
    errors.sourceUrl = copy.sourceUrl;
  } else if (!isSecureUrl(values.sourceUrl.trim())) {
    errors.sourceUrl = copy.invalidUrl;
  }
  if (!values.introduction.trim()) errors.introduction = copy.introduction;
  if (!values.category) errors.category = copy.category;
  if (!values.platforms.length) errors.platforms = copy.platforms;
  if (!values.license) errors.license = copy.license;
  if (!values.submitterName.trim()) errors.submitterName = copy.submitterName;
  if (!values.email.trim()) {
    errors.email = copy.email;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = copy.invalidEmail;
  }

  return errors;
}
