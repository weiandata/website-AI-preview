import type { ReactNode } from "react";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="site-shell">
      <SiteHeader />
      {children}
      <SiteFooter />
      <ScrollToTop />
    </div>
  );
}
