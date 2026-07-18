import type { Metadata } from "next";
import { SubmitPageContent } from "@/components/submit/submit-page-content";

export const metadata: Metadata = {
  title: "提交开源 Skill｜惟安数据科技",
  description: "向 WEIAN DATA 推荐来源清晰、许可证明确、具有实际用途的开源 AI Skill。",
  alternates: { canonical: "/submit" },
};

export default function SubmitPage() {
  return <SubmitPageContent />;
}
