"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/components/language/language-provider";
import { Button } from "./button";

export function CopyButton({ value }: { value: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const { locale, t } = useLanguage();

  async function copyValue() {
    try {
      await navigator.clipboard.writeText(value);
      setStatus("copied");
      window.setTimeout(() => setStatus("idle"), 1800);
    } catch {
      setStatus("error");
    }
  }

  const label =
    status === "copied"
      ? t("common.copied")
      : status === "error"
        ? locale === "zh"
          ? "复制失败"
          : "Copy failed"
        : t("common.copy");

  return (
    <Button
      variant="ghost"
      size="sm"
      className="copy-command-button"
      onClick={copyValue}
      aria-live="polite"
    >
      {status === "copied" ? (
        <Check aria-hidden="true" size={15} strokeWidth={1.8} />
      ) : (
        <Copy aria-hidden="true" size={15} strokeWidth={1.8} />
      )}
      {label}
    </Button>
  );
}
