import type { Metadata } from "next";
import { Suspense } from "react";
import { SkillLibrary } from "@/components/skills/skill-library";

export const metadata: Metadata = {
  title: "开源 Skill 库｜惟安数据科技",
  description: "搜索、筛选并发现适合开发、研究、数据分析、内容创作和自动化工作的开源 AI Skills。",
  alternates: {
    canonical: "/skills",
  },
};

export default function SkillsPage() {
  return (
    <Suspense fallback={<div className="library-skeleton container-shell" aria-hidden="true" />}>
      <SkillLibrary />
    </Suspense>
  );
}
