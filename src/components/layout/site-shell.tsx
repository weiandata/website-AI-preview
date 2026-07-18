import type { ReactNode } from "react";
import { LocalizedDocumentTitle } from "@/components/language/localized-document-title";
import { NetworkStatus } from "@/components/ui/network-status";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import type { SkillTitleRecord } from "@/lib/skills/repository";

export function SiteShell({
  children,
  skillTitles,
}: {
  children: ReactNode;
  skillTitles: SkillTitleRecord[];
}) {
  return (
    <div className="site-shell" id="site-shell-content">
      <LocalizedDocumentTitle skillTitles={skillTitles} />
      <SiteHeader />
      {children}
      <SiteFooter />
      <NetworkStatus />
      <ScrollToTop />
    </div>
  );
}
