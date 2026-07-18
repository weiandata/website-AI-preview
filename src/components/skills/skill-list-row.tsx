"use client";

import { ArrowUpRight, BadgeCheck } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/language/language-provider";
import { Badge } from "@/components/ui/badge";
import { buttonClassName } from "@/components/ui/button";
import { categories } from "@/data/categories";
import { localize } from "@/lib/i18n";
import { formatDate } from "@/lib/utils";
import type { Skill } from "@/types/content";
import { DownloadDialog } from "./download-dialog";
import { SkillIcon } from "./skill-icon";

export function SkillListRow({ skill }: { skill: Skill }) {
  const { locale, t } = useLanguage();
  const category = categories.find((item) => item.id === skill.category)!;

  return (
    <article className="skill-list-row">
      <span className="skill-icon liquid-glass">
        <SkillIcon icon={skill.icon} />
      </span>
      <div className="skill-list-main">
        <div>
          <h3>{locale === "zh" ? skill.nameZh ?? skill.name : skill.name}</h3>
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
      <div className="skill-list-actions">
        <Link
          href={`/skills/${skill.slug}`}
          className={buttonClassName({ variant: "ghost", size: "sm" })}
        >
          {t("common.viewDetails")}
          <ArrowUpRight aria-hidden="true" size={15} strokeWidth={1.8} />
        </Link>
        <DownloadDialog skill={skill} compact />
      </div>
    </article>
  );
}
