"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useLanguage } from "@/components/language/language-provider";
import type { SkillTitleRecord } from "@/lib/skills/repository";

const routeTitles = {
  "/": {
    zh: "开源 AI Skill 下载与分享平台 | 惟安数据科技",
    en: "Open-Source AI Skills | WEIAN DATA",
  },
  "/skills": {
    zh: "开源 Skill 库 | 惟安数据科技",
    en: "Open-Source Skill Library | WEIAN DATA",
  },
  "/categories": {
    zh: "Skill 分类 | 惟安数据科技",
    en: "Skill Categories | WEIAN DATA",
  },
  "/about": {
    zh: "关于惟安数据科技 | 开源 AI Skills",
    en: "About WEIAN DATA | Open-Source AI Skills",
  },
} as const;

export function LocalizedDocumentTitle({
  skillTitles,
}: {
  skillTitles: SkillTitleRecord[];
}) {
  const pathname = usePathname();
  const { locale } = useLanguage();

  useEffect(() => {
    const routeTitle = routeTitles[pathname as keyof typeof routeTitles];
    if (routeTitle) {
      document.title = routeTitle[locale];
      return;
    }

    const slug = pathname.startsWith("/skills/")
      ? pathname.slice("/skills/".length)
      : "";
    const skill = skillTitles.find((item) => item.slug === slug);
    if (skill) {
      const name = locale === "zh" ? skill.nameZh ?? skill.name : skill.name;
      document.title =
        locale === "zh"
          ? `${name} | 开源 AI Skill | 惟安数据科技`
          : `${name} | Open-Source AI Skill | WEIAN DATA`;
    }
  }, [locale, pathname, skillTitles]);

  return null;
}
