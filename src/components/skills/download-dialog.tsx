"use client";

import { Download, ExternalLink, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/components/language/language-provider";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import type { Skill } from "@/types/content";

export function DownloadDialog({
  skill,
  compact = false,
  label,
  prominent = false,
}: {
  skill: Skill;
  compact?: boolean;
  label?: string;
  prominent?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const { locale, t } = useLanguage();

  function close() {
    setOpen(false);
  }

  function continueDownload() {
    if (!skill.downloadUrl) return;
    window.open(skill.downloadUrl, "_blank", "noopener,noreferrer");
    close();
  }

  let host = "";
  if (skill.downloadUrl) {
    try {
      host = new URL(skill.downloadUrl).hostname;
    } catch {
      host = skill.downloadUrl;
    }
  }

  return (
    <>
      <Button
        variant={compact ? "ghost" : prominent ? "primary" : "secondary"}
        size={compact ? "sm" : "md"}
        disabled={!skill.downloadUrl}
        onClick={() => setOpen(true)}
      >
        <Download aria-hidden="true" size={16} strokeWidth={1.8} />
        {label ?? t("common.download")}
      </Button>
      <Dialog
        open={open}
        onClose={close}
        title={t("download.title")}
        description={t("download.description")}
        closeLabel={t("common.cancel")}
      >
        <div className="download-destination">
          <ShieldCheck aria-hidden="true" size={21} strokeWidth={1.7} />
          <span>
            <small>{locale === "zh" ? "目标网站" : "Destination"}</small>
            <strong>{host}</strong>
          </span>
        </div>
        <div className="dialog-actions">
          <Button variant="ghost" onClick={close}>
            {t("common.cancel")}
          </Button>
          <Button onClick={continueDownload}>
            {t("common.continue")}
            <ExternalLink aria-hidden="true" size={15} strokeWidth={1.8} />
          </Button>
        </div>
      </Dialog>
    </>
  );
}
