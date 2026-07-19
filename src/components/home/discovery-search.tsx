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
            {locale === "zh" ? "不知道从哪开始？" : "Not sure where to start?"}
          </span>
          <h2>
            {locale === "zh"
              ? "直接说你想做的事。"
              : "Just say what you need done."}
          </h2>
          <p>
            {locale === "zh"
              ? "不用记专业名词，像跟人说话那样搜就行。每个技能都写清楚了它能帮你做什么、怎么装、怎么用。"
              : "No jargon needed — search the way you would ask a person. Every Skill spells out what it does for you, how to install it, and how to use it."}
          </p>
        </div>
        <HeroSearch skills={skills} />
      </div>
    </section>
  );
}
