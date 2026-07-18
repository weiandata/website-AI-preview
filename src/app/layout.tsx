import type { Metadata } from "next";
import type { ReactNode } from "react";
import { LanguageProvider } from "@/components/language/language-provider";
import { SiteShell } from "@/components/layout/site-shell";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "开源 AI Skill 下载与分享平台｜惟安数据科技",
  description:
    "惟安数据科技精选并整理实用的开源 AI Skills，覆盖编程开发、数据分析、研究写作、内容创作与自动化等场景。",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN" data-scroll-behavior="smooth">
      <body>
        <LanguageProvider>
          <SiteShell>{children}</SiteShell>
        </LanguageProvider>
      </body>
    </html>
  );
}
