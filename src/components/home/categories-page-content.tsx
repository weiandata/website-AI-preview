"use client";

import { useLanguage } from "@/components/language/language-provider";
import { CategoryExplorer } from "./category-explorer";

export function CategoriesPageContent() {
  const { locale, t } = useLanguage();

  return (
    <>
      <header className="container-shell page-hero-simple page-hero-editorial">
        <span className="section-kicker">
          {locale === "zh" ? "按领域探索" : "Explore by field"}
        </span>
        <h1>{t("categories.title")}</h1>
        <p>{t("categories.description")}</p>
      </header>
      <div className="container-shell categories-page-grid">
        <CategoryExplorer showHeader={false} />
      </div>
    </>
  );
}
