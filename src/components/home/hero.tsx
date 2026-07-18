"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/components/language/language-provider";
import { SkillCard } from "@/components/skills/skill-card";
import { HeroSearch } from "@/components/skills/hero-search";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { skills } from "@/data/skills";

export function Hero() {
  const { locale, t } = useLanguage();
  const accessibleTitle =
    locale === "zh"
      ? `${t("hero.titleLead")}${t("hero.titleAccent")}`
      : `${t("hero.titleLead")} ${t("hero.titleAccent")}`;

  return (
    <section className="hero-section">
      <div className="hero-grid-overlay" aria-hidden="true" />
      <div className="hero-orb hero-orb-one" aria-hidden="true" />
      <div className="hero-orb hero-orb-two" aria-hidden="true" />
      <div className="container-shell hero-layout">
        <div className="hero-content">
          <Badge tone="blue" className="hero-eyebrow liquid-glass">
            <Sparkles aria-hidden="true" size={13} strokeWidth={1.7} />
            {t("hero.badge")}
          </Badge>
          <h1 aria-label={accessibleTitle}>
            <span>{t("hero.titleLead")}</span>
            <span className="gradient-text">{t("hero.titleAccent")}</span>
          </h1>
          <p>{t("hero.description")}</p>
          <div className="hero-actions">
            <ButtonLink href="/skills" size="lg">
              {t("hero.primary")}
              <ArrowRight aria-hidden="true" size={17} strokeWidth={1.8} />
            </ButtonLink>
            <ButtonLink href="/submit" variant="secondary" size="lg">
              {t("hero.secondary")}
              <ArrowRight aria-hidden="true" size={17} strokeWidth={1.8} />
            </ButtonLink>
          </div>
          <HeroSearch />
        </div>

        <div className="hero-library-preview" aria-label={t("home.featuredTitle")}>
          <div className="preview-index">
            <span>{locale === "zh" ? "开源索引" : "Open index"}</span>
            <strong>{skills.length.toString().padStart(2, "0")}</strong>
          </div>
          {skills.slice(0, 3).map((skill, index) => (
            <div className={`preview-card preview-card-${index + 1}`} key={skill.id}>
              <SkillCard skill={skill} compact />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
