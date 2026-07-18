"use client";

import {
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  Download,
  GitFork,
  PackageOpen,
  ShieldCheck,
  Star,
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/language/language-provider";
import { Badge } from "@/components/ui/badge";
import { ButtonLink, buttonClassName } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { categories } from "@/data/categories";
import { skills } from "@/data/skills";
import { localize } from "@/lib/i18n";
import { getRelatedSkills } from "@/lib/skill-query";
import { siteConfig } from "@/lib/site-config";
import { formatCompactNumber, formatDate } from "@/lib/utils";
import type { Skill } from "@/types/content";
import { DownloadDialog } from "./download-dialog";
import { SkillCard } from "./skill-card";
import { SkillIcon } from "./skill-icon";

export function SkillDetail({ skill }: { skill: Skill }) {
  const { locale, t } = useLanguage();
  const category = categories.find((item) => item.id === skill.category)!;
  const related = getRelatedSkills(skill, skills, 3);
  const name = locale === "zh" ? skill.nameZh ?? skill.name : skill.name;
  const list = <T,>(value: { zh: T[]; en: T[] }) => value[locale];

  return (
    <main className="skill-detail-page">
      <div className="container-shell">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">{t("nav.home")}</Link>
          <span>/</span>
          <Link href="/skills">{t("nav.skills")}</Link>
          <span>/</span>
          <span aria-current="page">{name}</span>
        </nav>

        <header className="detail-header detail-editorial-hero">
          <div className="detail-identity">
            <span className="detail-icon liquid-glass">
              <SkillIcon icon={skill.icon} size={31} />
            </span>
            <div>
              <div className="detail-badges">
                <Badge tone="blue">{t("common.openSource")}</Badge>
                {skill.verified ? (
                  <Badge tone="teal">
                    <BadgeCheck aria-hidden="true" size={13} strokeWidth={1.8} />
                    {t("common.verified")}
                  </Badge>
                ) : null}
              </div>
              <h1>{name}</h1>
              <p>{localize(skill.description, locale)}</p>
            </div>
          </div>

          <div className="detail-actions">
            <DownloadDialog
              skill={skill}
              label={locale === "zh" ? "下载 Skill" : "Download Skill"}
              prominent
            />
            {skill.githubUrl ? (
              <ButtonLink href={skill.githubUrl} external variant="secondary">
                <GitFork aria-hidden="true" size={16} strokeWidth={1.8} />
                {t("detail.github")}
              </ButtonLink>
            ) : null}
          </div>
        </header>

        <div className="detail-stats">
          <span>
            <Star aria-hidden="true" size={16} strokeWidth={1.8} />
            <strong>{formatCompactNumber(skill.stars, locale)}</strong>
            {t("common.stars")}
          </span>
          <span>
            <Download aria-hidden="true" size={16} strokeWidth={1.8} />
            <strong>{formatCompactNumber(skill.downloads, locale)}</strong>
            {t("common.downloads")}
          </span>
          <span>
            <PackageOpen aria-hidden="true" size={16} strokeWidth={1.8} />
            <strong>{skill.version}</strong>
            {t("common.version")}
          </span>
          <span>
            <ShieldCheck aria-hidden="true" size={16} strokeWidth={1.8} />
            <strong>{skill.license}</strong>
            {t("common.license")}
          </span>
        </div>

        <div className="detail-layout detail-editorial-layout">
          <div className="detail-content">
            <section className="detail-anchor-section" id="overview">
              <h2>{t("detail.overview")}</h2>
              <p>{localize(skill.longDescription, locale)}</p>
            </section>

            <section className="detail-two-column detail-anchor-section" id="features">
              <div>
                <h2>{t("detail.features")}</h2>
                <ul>
                  {list(skill.features).map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h2>{t("detail.useCases")}</h2>
                <ul>
                  {list(skill.useCases).map((useCase) => (
                    <li key={useCase}>{useCase}</li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="detail-anchor-section" id="installation">
              <h2>{t("detail.installation")}</h2>
              <div className="installation-blocks">
                {skill.installation.map((command) => (
                  <div className="code-block" key={command}>
                    <div>
                      <span>bash</span>
                      <CopyButton value={command} />
                    </div>
                    <pre>
                      <code>{command}</code>
                    </pre>
                  </div>
                ))}
              </div>
            </section>

            <section className="detail-anchor-section" id="usage">
              <h2>{t("detail.usage")}</h2>
              <p>{localize(skill.usage, locale)}</p>
            </section>

            <section>
              <h2>{t("detail.workflow")}</h2>
              <ol className="workflow-steps">
                {list(skill.workflow).map((step) => (
                  <li key={step}>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            <section>
              <h2>{t("detail.changelog")}</h2>
              <div className="changelog-list">
                {skill.changelog.map((entry) => (
                  <article key={`${entry.version}-${entry.date}`}>
                    <div>
                      <strong>{entry.version}</strong>
                      <time dateTime={entry.date}>{formatDate(entry.date, locale)}</time>
                    </div>
                    <p>{localize(entry.notes, locale)}</p>
                  </article>
                ))}
              </div>
            </section>

            <section>
              <h2>{t("detail.faq")}</h2>
              <div className="faq-list">
                {skill.faq.map((item) => (
                  <details key={item.question.en}>
                    <summary>{localize(item.question, locale)}</summary>
                    <p>{localize(item.answer, locale)}</p>
                  </details>
                ))}
              </div>
            </section>
          </div>

          <aside className="detail-sidebar">
            <nav
              className="detail-on-page-nav"
              aria-label={locale === "zh" ? "页面导航" : "On this page"}
            >
              <span>{locale === "zh" ? "本页内容" : "On this page"}</span>
              <a href="#overview">{t("detail.overview")}</a>
              <a href="#features">{t("detail.features")}</a>
              <a href="#installation">{t("detail.installation")}</a>
              <a href="#usage">{t("detail.usage")}</a>
            </nav>
            <div className="detail-sidebar-card">
              <DownloadDialog
                skill={skill}
                label={locale === "zh" ? "下载 Skill" : "Download Skill"}
                prominent
              />
              <dl>
                <div>
                  <dt>{t("common.author")}</dt>
                  <dd>{skill.author}</dd>
                </div>
                <div>
                  <dt>{t("common.category")}</dt>
                  <dd>{localize(category.name, locale)}</dd>
                </div>
                <div>
                  <dt>{t("common.version")}</dt>
                  <dd>{skill.version}</dd>
                </div>
                <div>
                  <dt>{t("common.license")}</dt>
                  <dd>{skill.license}</dd>
                </div>
                <div>
                  <dt>{t("common.updated")}</dt>
                  <dd>{formatDate(skill.updatedAt, locale)}</dd>
                </div>
              </dl>
              <div className="sidebar-platforms">
                <span>{t("common.platforms")}</span>
                <div>
                  {skill.platforms.map((platform) => (
                    <Badge key={platform}>{platform}</Badge>
                  ))}
                </div>
              </div>
              <div className="sidebar-tags">
                <span>{t("common.tags")}</span>
                <div>
                  {skill.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <a
                href={`mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(`Broken link: ${skill.name}`)}`}
                className={buttonClassName({ variant: "ghost", size: "sm" })}
              >
                {t("detail.report")}
                <ArrowUpRight aria-hidden="true" size={14} strokeWidth={1.8} />
              </a>
            </div>
          </aside>
        </div>

        <section className="related-skills">
          <div className="related-header">
            <h2>{t("detail.related")}</h2>
            <Link href="/skills" className={buttonClassName({ variant: "ghost", size: "sm" })}>
              <ArrowLeft aria-hidden="true" size={15} strokeWidth={1.8} />
              {t("hero.primary")}
            </Link>
          </div>
          <div>
            {related.map((item) => (
              <SkillCard skill={item} key={item.id} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
