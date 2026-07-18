"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/language/language-provider";
import { localize } from "@/lib/i18n";
import { formatDate } from "@/lib/utils";
import type { Skill } from "@/types/content";

export function RecentSkills({ skills }: { skills: Skill[] }) {
  const { locale, t } = useLanguage();
  const recent = [...skills]
    .sort((left, right) => right.addedAt.localeCompare(left.addedAt))
    .slice(0, 4);

  return (
    <section className="recent-section">
      <div className="section-heading recent-heading">
        <div>
          <span className="section-kicker">
            {locale === "zh" ? "目录更新" : "Catalog updates"}
          </span>
          <h2>{t("home.recentTitle")}</h2>
        </div>
        <Link href="/skills?period=30d&sort=added" className="editorial-link">
          {t("home.recentLink")}
          <ArrowRight aria-hidden="true" size={15} strokeWidth={1.8} />
        </Link>
      </div>
      <div className="recent-list">
        {recent.map((skill) => (
          <Link href={`/skills/${skill.slug}`} key={skill.id}>
            <span>
              <strong>{locale === "zh" ? skill.nameZh ?? skill.name : skill.name}</strong>
              <small>{localize(skill.description, locale)}</small>
            </span>
            <time dateTime={skill.addedAt}>{formatDate(skill.addedAt, locale)}</time>
            <ArrowRight aria-hidden="true" size={16} strokeWidth={1.8} />
          </Link>
        ))}
      </div>
    </section>
  );
}
