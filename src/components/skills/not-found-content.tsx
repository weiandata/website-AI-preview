"use client";

import { ArrowLeft, FileQuestion } from "lucide-react";
import { useLanguage } from "@/components/language/language-provider";
import { ButtonLink } from "@/components/ui/button";

export function NotFoundContent() {
  const { locale } = useLanguage();
  return (
    <main className="not-found-page container-shell">
      <span className="empty-state-icon liquid-glass">
        <FileQuestion aria-hidden="true" size={28} strokeWidth={1.7} />
      </span>
      <h1>{locale === "zh" ? "未找到 Skill" : "Skill not found"}</h1>
      <p>
        {locale === "zh"
          ? "这个 Skill 可能已移动、重命名或尚未收录。"
          : "This Skill may have moved, been renamed, or not yet been indexed."}
      </p>
      <ButtonLink href="/skills" variant="secondary">
        <ArrowLeft aria-hidden="true" size={16} strokeWidth={1.8} />
        {locale === "zh" ? "返回 Skill 库" : "Back to Skill Library"}
      </ButtonLink>
    </main>
  );
}
