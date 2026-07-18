import type { Metadata } from "next";
import { CategoriesPageContent } from "@/components/home/categories-page-content";

export const metadata: Metadata = {
  title: "Skill 分类｜惟安数据科技",
  description: "按工作场景、平台和用途浏览 WEIAN DATA 精选的开源 AI Skills。",
};

export default function CategoriesPage() {
  return (
    <main className="inner-page">
      <CategoriesPageContent />
    </main>
  );
}
