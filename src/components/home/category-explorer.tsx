"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/language/language-provider";
import { SkillIcon } from "@/components/skills/skill-icon";
import { categories } from "@/data/categories";
import { skills } from "@/data/skills";
import { localize } from "@/lib/i18n";
import { getCategoryCounts } from "@/lib/skill-query";

export function CategoryExplorer({ showHeader = true }: { showHeader?: boolean }) {
  const { locale, t } = useLanguage();
  const counts = getCategoryCounts(skills);

  return (
    <section className="category-explorer">
      {showHeader ? (
        <div className="section-heading">
          <h2>{t("home.categoriesTitle")}</h2>
          <p>{t("home.categoriesDescription")}</p>
        </div>
      ) : null}
      <div className="category-grid">
        {categories.map((category, index) => (
          <Link
            href={`/skills?category=${category.id}`}
            className={`category-card category-card-${(index % 4) + 1}`}
            key={category.id}
          >
            <span className="category-icon">
              <SkillIcon icon={category.icon} size={21} />
            </span>
            <span className="category-copy">
              <strong>{localize(category.name, locale)}</strong>
              <small>{localize(category.description, locale)}</small>
            </span>
            <span className="category-count">
              {counts[category.id]} {t("categories.skills")}
            </span>
            <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.7} />
          </Link>
        ))}
      </div>
    </section>
  );
}
