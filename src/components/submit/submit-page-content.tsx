"use client";

import { CircleCheckBig } from "lucide-react";
import { useLanguage } from "@/components/language/language-provider";
import { SubmitSkillForm } from "./submit-skill-form";

export function SubmitPageContent() {
  const { locale, t } = useLanguage();
  return (
    <main className="submit-page">
      <div className="container-shell submit-layout">
        <div className="submit-intro">
          <h1>{t("submit.title")}</h1>
          <p>{t("submit.description")}</p>
          <div className="submission-note">
            <CircleCheckBig aria-hidden="true" size={19} strokeWidth={1.7} />
            <p>
              {locale === "zh"
                ? "提交并不代表一定收录。我们会优先考虑来源清晰、许可证明确、具有实际用途且文档完整的开源项目。"
                : "Submission does not guarantee inclusion. Priority is given to useful open-source projects with clear sources, licenses, and documentation."}
            </p>
          </div>
        </div>
        <SubmitSkillForm />
      </div>
    </main>
  );
}
