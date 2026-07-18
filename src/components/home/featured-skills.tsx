"use client";

import { ArrowRight, ArrowUpRight, BadgeCheck } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/language/language-provider";
import { categories } from "@/data/categories";
import { skills } from "@/data/skills";
import { localize } from "@/lib/i18n";

export function FeaturedSkills() {
  const { locale, t } = useLanguage();
  const featured = skills.filter((skill) => skill.featured).slice(0, 3);

  return (
    <section className="featured-section container-shell">
      <div className="section-heading">
        <div>
          <span className="section-kicker">
            {locale === "zh" ? "经筛选的开放工作流" : "Curated open workflows"}
          </span>
          <h2>{t("home.featuredTitle")}</h2>
          <p>{t("home.featuredDescription")}</p>
        </div>
        <Link className="editorial-link" href="/skills?featured=true">
          {locale === "zh" ? "查看全部" : "View all"}
          <ArrowRight aria-hidden="true" size={15} />
        </Link>
      </div>
      <div className="featured-grid">
        {featured.map((skill, index) => {
          const category = categories.find((item) => item.id === skill.category)!;
          return (
            <Link
              className={`featured-skill featured-skill-tone-${index + 1}`}
              data-tone={String(index + 1)}
              href={`/skills/${skill.slug}`}
              key={skill.id}
            >
              <span className="featured-skill-meta">
                <span>{localize(category.name, locale)}</span>
                <span>
                  {skill.verified ? (
                    <BadgeCheck aria-hidden="true" size={14} />
                  ) : null}
                  {skill.verified ? t("common.verified") : skill.license}
                </span>
              </span>
              <span className="featured-skill-copy">
                <strong>{locale === "zh" ? skill.nameZh ?? skill.name : skill.name}</strong>
                <span>{localize(skill.description, locale)}</span>
              </span>
              <ArrowUpRight className="featured-skill-arrow" aria-hidden="true" size={22} />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
