"use client";

import { useLanguage } from "@/components/language/language-provider";
import { HeroSearch } from "@/components/skills/hero-search";
import type { Skill } from "@/types/content";

export function DiscoverySearch({ skills }: { skills: Skill[] }) {
  const { locale } = useLanguage();

  return (
    <section id="home-search" className="home-search-section">
      <div className="container-shell home-search-layout">
        <div>
          <span className="section-kicker">
            {locale === "zh" ? "从任务开始" : "Start with the work"}
          </span>
          <h2>
            {locale === "zh"
              ? "找到适合当前任务的工作流。"
              : "Find the workflow for the task at hand."}
          </h2>
          <p>
            {locale === "zh"
              ? "按名称、标签、平台或使用场景搜索。所有条目均提供来源、许可证与使用说明。"
              : "Search by name, tag, platform, or use case. Every entry includes its source, license, and usage guidance."}
          </p>
        </div>
        <HeroSearch skills={skills} />
      </div>
    </section>
  );
}
