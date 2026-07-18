"use client";

import { useLanguage } from "@/components/language/language-provider";

const values = [
  {
    zh: ["人工筛选", "不是简单堆放链接，而是优先收录真正实用、说明清晰的项目。"],
    en: ["Human Curated", "More than a directory. We prioritize useful projects with clear documentation."],
  },
  {
    zh: ["分类清晰", "按照工作场景、平台与功能整理，减少寻找工具的时间。"],
    en: ["Clearly Organized", "Browse by workflow, platform, category, and use case."],
  },
  {
    zh: ["持续更新", "不断补充新的 Skill，并及时维护链接和版本信息。"],
    en: ["Continuously Updated", "New Skills are added regularly, with links and metadata kept current."],
  },
  {
    zh: ["开源优先", "尊重项目许可证，清晰展示来源、作者和官方链接。"],
    en: ["Open-Source First", "Licenses, authors, sources, and official links are clearly presented."],
  },
];

export function PlatformValues() {
  const { locale, t } = useLanguage();

  return (
    <section className="values-section">
      <div className="values-intro">
        <span className="section-kicker">
          {locale === "zh" ? "我们的标准" : "Our standard"}
        </span>
        <h2>{t("home.whyTitle")}</h2>
        <p>
          {locale === "zh"
            ? "把寻找工具的时间，留给真正重要的工作。"
            : "Spend less time hunting for tools and more time doing the work."}
        </p>
      </div>
      <div className="values-list">
        {values.map((value, index) => {
          const [title, description] = value[locale];
          return (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
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
