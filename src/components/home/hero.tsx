"use client";

import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/language/language-provider";
import { ButtonLink } from "@/components/ui/button";

const HERO_VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4";

export function Hero() {
  const { locale, t } = useLanguage();
  const accessibleTitle =
    locale === "zh"
      ? `${t("hero.titleLead")}${t("hero.titleAccent")}`
      : `${t("hero.titleLead")} ${t("hero.titleAccent")}`;

  return (
    <section className="hero-section">
      <video className="hero-video" autoPlay muted loop playsInline aria-hidden="true">
        <source src={HERO_VIDEO_URL} type="video/mp4" />
      </video>
      <div className="hero-shade" aria-hidden="true" />
      <div className="container-shell hero-layout">
        <div className="hero-content">
          <span className="hero-eyebrow">{t("hero.badge")}</span>
          <h1 aria-label={accessibleTitle}>
            <span>{t("hero.titleLead")}</span>
            <span>{t("hero.titleAccent")}</span>
          </h1>
          <p>{t("hero.description")}</p>
          <div className="hero-actions">
            <ButtonLink href="/skills" size="lg">
              {t("hero.primary")}
              <ArrowRight aria-hidden="true" size={17} strokeWidth={1.8} />
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
