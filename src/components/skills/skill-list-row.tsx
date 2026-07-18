"use client";

import { ArrowUpRight, BadgeCheck, Star } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/language/language-provider";
import { Badge } from "@/components/ui/badge";
import { categories } from "@/data/categories";
import { localize } from "@/lib/i18n";
import { formatCompactNumber, formatDate } from "@/lib/utils";
import type { Skill } from "@/types/content";

export function SkillListRow({ skill }: { skill: Skill }) {
  const { locale, t } = useLanguage();
  const category = categories.find((item) => item.id === skill.category)!;
  const name = locale === "zh" ? skill.nameZh ?? skill.name : skill.name;

  return (
    <article className="skill-list-row">
      <Link
        className="skill-item-link"
        href={`/skills/${skill.slug}`}
        aria-label={`${name} - ${t("common.viewDetails")}`}
      >
        <div className="skill-list-main">
          <div className="skill-list-eyebrow">
            <span>{localize(category.name, locale)}</span>
            <span>v{skill.version}</span>
          </div>
          <div className="skill-list-title">
            <h3>{name}</h3>
            {skill.verified ? (
              <Badge tone="teal">
                <BadgeCheck aria-hidden="true" size={13} strokeWidth={1.8} />
                {t("common.verified")}
              </Badge>
            ) : null}
          </div>
          <p>{localize(skill.description, locale)}</p>
          <div className="skill-list-footer">
            <div className="skill-list-platforms">
              {skill.platforms.slice(0, 3).map((platform) => (
                <span key={platform}>{platform}</span>
              ))}
            </div>
            <span className="skill-list-meta">
              {skill.license} · {formatDate(skill.updatedAt, locale)}
            </span>
          </div>
        </div>
        <div className="skill-list-aside" aria-hidden="true">
          <span>
            <Star size={14} strokeWidth={1.8} />
            {formatCompactNumber(skill.stars, locale)}
          </span>
          <ArrowUpRight size={19} strokeWidth={1.8} />
        </div>
      </Link>
    </article>
  );
}
