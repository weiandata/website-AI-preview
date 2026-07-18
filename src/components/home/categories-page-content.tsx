"use client";

import { useLanguage } from "@/components/language/language-provider";
import { CategoryExplorer } from "./category-explorer";

export function CategoriesPageContent() {
  const { t } = useLanguage();

  return (
    <>
      <div className="container-shell page-hero-simple">
        <h1>{t("categories.title")}</h1>
        <p>{t("categories.description")}</p>
      </div>
      <div className="container-shell categories-page-grid">
        <CategoryExplorer showHeader={false} />
      </div>
    </>
  );
}
