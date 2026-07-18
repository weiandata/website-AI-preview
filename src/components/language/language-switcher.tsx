"use client";

import { Languages } from "lucide-react";
import { useLanguage } from "./language-provider";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div className="language-switcher" aria-label={t("language.label")}>
      <Languages aria-hidden="true" size={16} strokeWidth={1.8} />
      <button
        type="button"
        className={locale === "zh" ? "is-active" : undefined}
        aria-pressed={locale === "zh"}
        onClick={() => setLocale("zh")}
      >
        {t("language.zh")}
      </button>
      <span aria-hidden="true">/</span>
      <button
        type="button"
        className={locale === "en" ? "is-active" : undefined}
        aria-pressed={locale === "en"}
        onClick={() => setLocale("en")}
      >
        {t("language.en")}
      </button>
    </div>
  );
}
