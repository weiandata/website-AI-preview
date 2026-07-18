import type { ReactNode } from "react";
import { LocalizedDocumentTitle } from "@/components/language/localized-document-title";
import { NetworkStatus } from "@/components/ui/network-status";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="site-shell" id="site-shell-content">
      <LocalizedDocumentTitle />
      <SiteHeader />
      {children}
      <SiteFooter />
      <NetworkStatus />
      <ScrollToTop />
    </div>
  );
}
