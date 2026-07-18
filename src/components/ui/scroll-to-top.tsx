"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/language/language-provider";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const top = document.getElementById("page-top");
    if (!top) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(top);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      className="scroll-top liquid-glass"
      aria-label={t("common.backToTop")}
      onClick={() => document.getElementById("page-top")?.scrollIntoView()}
    >
      <ArrowUp aria-hidden="true" size={18} strokeWidth={1.8} />
    </button>
  );
}
