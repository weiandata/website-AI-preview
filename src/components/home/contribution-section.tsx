"use client";

import { ArrowRight, GitPullRequestArrow } from "lucide-react";
import { useLanguage } from "@/components/language/language-provider";
import { ButtonLink } from "@/components/ui/button";

export function ContributionSection() {
  const { t } = useLanguage();

  return (
    <section className="contribution-section container-shell">
      <div className="contribution-mark liquid-glass">
        <GitPullRequestArrow aria-hidden="true" size={30} strokeWidth={1.6} />
      </div>
      <div>
        <h2>{t("home.contributeTitle")}</h2>
        <p>{t("home.contributeDescription")}</p>
      </div>
      <ButtonLink href="/submit" variant="secondary">
        {t("home.contributeAction")}
        <ArrowRight aria-hidden="true" size={16} strokeWidth={1.8} />
      </ButtonLink>
    </section>
  );
}
