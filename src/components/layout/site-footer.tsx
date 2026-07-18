"use client";

import Link from "next/link";
import { GitFork } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/components/language/language-provider";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  const { locale, t } = useLanguage();
  const columns = [
    {
      title: t("footer.explore"),
      links: [
        [t("nav.skills"), "/skills"],
        [t("nav.categories"), "/categories"],
        [t("home.recentTitle"), "/skills?sort=added"],
        [t("home.featuredTitle"), "/skills?featured=true"],
      ],
    },
    {
      title: t("footer.resources"),
      links: [
        ["GitHub", "https://github.com/topics/ai-agents"],
        [t("detail.usage"), "/about#usage"],
        [t("common.openSource"), "/about#open-source"],
      ],
    },
    {
      title: t("footer.company"),
      links: [
        [t("nav.about"), "/about"],
        ["WEIAN DATA", "/about#company"],
        [
          locale === "zh" ? "联系我们" : "Contact",
          `mailto:${siteConfig.contactEmail}`,
        ],
        [locale === "zh" ? "隐私政策" : "Privacy", "/about#privacy"],
      ],
    },
  ];

  return (
    <footer className="site-footer">
      <div className="container-shell footer-grid">
        <div className="footer-brand">
          <Image
            src="/brand/weian-logo-reversed.svg"
            alt="WEIAN DATA TECH"
            width={174}
            height={50}
          />
          <p>{t("footer.description")}</p>
        </div>
        {columns.map((column) => (
          <div key={column.title} className="footer-column">
            <h2>{column.title}</h2>
            {column.links.map(([label, href]) =>
              href.startsWith("http") || href.startsWith("mailto") ? (
                <a
                  href={href}
                  key={label}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {label}
                </a>
              ) : (
                <Link href={href} key={label}>
                  {label}
                </Link>
              ),
            )}
          </div>
        ))}
      </div>
      <div className="container-shell footer-bottom">
        <p>
          {locale === "zh"
            ? "© 2026 WEIAN DATA。保留所有权利。"
            : "© 2026 WEIAN DATA. All rights reserved."}
        </p>
        <p>{t("footer.notice")}</p>
        <a
          href="https://github.com/topics/ai-agents"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <GitFork aria-hidden="true" size={18} strokeWidth={1.8} />
        </a>
      </div>
    </footer>
  );
}
