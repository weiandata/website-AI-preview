"use client";

import { BadgeCheck, GitFork, Star } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/language/language-provider";
import { Badge } from "@/components/ui/badge";
import { categories } from "@/data/categories";
import { localize } from "@/lib/i18n";
import { formatCompactNumber, formatDate } from "@/lib/utils";
import type { Skill } from "@/types/content";
import { SkillIcon } from "./skill-icon";

export function SkillCard({ skill, compact = false }: { skill: Skill; compact?: boolean }) {
  const { locale, t } = useLanguage();
  const category = categories.find((item) => item.id === skill.category)!;
  const name = locale === "zh" ? skill.nameZh ?? skill.name : skill.name;

  return (
    <article className={`skill-card${compact ? " is-compact" : ""}`}>
      <Link
        className="skill-item-link"
        href={`/skills/${skill.slug}`}
        aria-label={`${name} - ${t("common.viewDetails")}`}
      >
        <div className="skill-card-topline">
          <span className="skill-icon liquid-glass">
            <SkillIcon icon={skill.icon} />
          </span>
          <div className="skill-trust">
            {skill.featured ? <Badge tone="blue">{t("common.featured")}</Badge> : null}
            {skill.verified ? (
              <Badge tone="teal">
                <BadgeCheck aria-hidden="true" size={13} strokeWidth={1.8} />
                {t("common.verified")}
              </Badge>
            ) : (
              <Badge>{t("common.openSource")}</Badge>
            )}
          </div>
        </div>

        <div className="skill-card-copy">
          <p className="skill-category">{localize(category.name, locale)}</p>
          <h3>{name}</h3>
          <p>{localize(skill.description, locale)}</p>
        </div>

        <div className="skill-platforms" aria-label={t("common.platforms")}>
          {skill.platforms.slice(0, 3).map((platform) => (
            <span key={platform}>{platform}</span>
          ))}
          {skill.platforms.length > 3 ? <span>+{skill.platforms.length - 3}</span> : null}
        </div>

        <div className="skill-card-meta">
          <span>
            <GitFork aria-hidden="true" size={13} strokeWidth={1.8} />
            {skill.license}
          </span>
          <span>
            <Star aria-hidden="true" size={13} strokeWidth={1.8} />
            {formatCompactNumber(skill.stars, locale)}
          </span>
          <span>{formatDate(skill.updatedAt, locale)}</span>
        </div>
      </Link>
    </article>
  );
}
