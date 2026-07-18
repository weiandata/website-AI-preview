"use client";

import { BadgeCheck } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/language/language-provider";
import { Badge } from "@/components/ui/badge";
import { categories } from "@/data/categories";
import { localize } from "@/lib/i18n";
import { formatDate } from "@/lib/utils";
import type { Skill } from "@/types/content";
import { SkillIcon } from "./skill-icon";

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
        <span className="skill-icon liquid-glass">
          <SkillIcon icon={skill.icon} />
        </span>
        <div className="skill-list-main">
          <div>
            <h3>{name}</h3>
            {skill.verified ? (
              <Badge tone="teal">
                <BadgeCheck aria-hidden="true" size={13} strokeWidth={1.8} />
                {t("common.verified")}
              </Badge>
            ) : null}
          </div>
          <p>{localize(skill.description, locale)}</p>
          <span className="skill-list-meta">
            {localize(category.name, locale)} / {skill.license} / {formatDate(skill.updatedAt, locale)}
          </span>
        </div>
      </Link>
    </article>
  );
}
