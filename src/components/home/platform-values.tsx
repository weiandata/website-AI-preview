"use client";

import { BookOpenCheck, FolderTree, RefreshCcw, ScanSearch } from "lucide-react";
import { useLanguage } from "@/components/language/language-provider";

const values = [
  {
    icon: ScanSearch,
    zh: ["人工筛选", "不是简单堆放链接，而是优先收录真正实用、说明清晰的项目。"],
    en: ["Human Curated", "More than a directory. We prioritize useful projects with clear documentation."],
  },
  {
    icon: FolderTree,
    zh: ["分类清晰", "按照工作场景、平台与功能整理，减少寻找工具的时间。"],
    en: ["Clearly Organized", "Browse by workflow, platform, category, and use case."],
  },
  {
    icon: RefreshCcw,
    zh: ["持续更新", "不断补充新的 Skill，并及时维护链接和版本信息。"],
    en: ["Continuously Updated", "New Skills are added regularly, with links and metadata kept current."],
  },
  {
    icon: BookOpenCheck,
    zh: ["开源优先", "尊重项目许可证，清晰展示来源、作者和官方链接。"],
    en: ["Open-Source First", "Licenses, authors, sources, and official links are clearly presented."],
  },
];

export function PlatformValues() {
  const { locale, t } = useLanguage();

  return (
    <section className="values-section">
      <div className="values-intro">
        <span className="values-monogram">W</span>
        <h2>{t("home.whyTitle")}</h2>
        <p>
          {locale === "zh"
            ? "把寻找工具的时间，留给真正重要的工作。"
            : "Spend less time hunting for tools and more time doing the work."}
        </p>
      </div>
      <div className="values-list">
        {values.map((value) => {
          const [title, description] = value[locale];
          const Icon = value.icon;
          return (
            <article key={title}>
              <Icon aria-hidden="true" size={21} strokeWidth={1.7} />
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
