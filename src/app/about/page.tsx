import type { Metadata } from "next";
import { AboutContent } from "@/components/about/about-content";

export const metadata: Metadata = {
  title: "关于惟安数据科技｜开源 AI Skills",
  description: "了解 WEIAN DATA 如何筛选、整理并分享实用的开源 AI Skills。",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <AboutContent />;
}
