"use client";

import {
  ChevronDown,
  GitFork,
  Menu,
  Search,
  Workflow,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { categories } from "@/data/categories";
import { localize } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/language/language-switcher";
import { useLanguage } from "@/components/language/language-provider";
import { buttonClassName } from "@/components/ui/button";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const { locale, t } = useLanguage();
  const navItems = [
    { href: "/", label: t("nav.home") },
    { href: "/skills", label: t("nav.skills") },
    { href: "/categories", label: t("nav.categories") },
    { href: "/submit", label: t("nav.submit") },
    { href: "/about", label: t("nav.about") },
  ];

  useEffect(() => {
    if (!menuOpen) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    }

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  return (
    <header id="page-top" className="site-header">
      <div className="container-shell header-inner">
        <Link href="/" className="brand-lockup" aria-label="WEIAN DATA home">
          <span className="brand-mark liquid-glass">
            <Workflow aria-hidden="true" size={21} strokeWidth={1.8} />
          </span>
          <span>
            <strong>WEIAN DATA</strong>
            <small>惟安数据科技</small>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) =>
            item.href === "/skills" ? (
              <details className="nav-dropdown" key={item.href}>
                <summary
                  className={cn(
                    "nav-link",
                    pathname.startsWith("/skills") && "is-active",
                  )}
                >
                  {item.label}
                  <ChevronDown aria-hidden="true" size={14} strokeWidth={1.8} />
                </summary>
                <div className="dropdown-panel liquid-glass">
                  {categories.map((category) => (
                    <Link
                      href={`/skills?category=${category.id}`}
                      key={category.id}
                    >
                      {localize(category.name, locale)}
                    </Link>
                  ))}
                </div>
              </details>
            ) : (
              <Link
                href={item.href}
                key={item.href}
                className={cn(
                  "nav-link",
                  (pathname === item.href ||
                    (item.href !== "/" && pathname.startsWith(item.href))) &&
                    "is-active",
                )}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="header-actions">
          <Link
            href="/skills?focus=search"
            className="icon-button header-search"
            aria-label={t("nav.search")}
          >
            <Search aria-hidden="true" size={18} strokeWidth={1.8} />
          </Link>
          <LanguageSwitcher />
          <a
            href="https://github.com/topics/ai-agents"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClassName({ variant: "secondary", size: "sm", className: "github-button" })}
          >
            <GitFork aria-hidden="true" size={16} strokeWidth={1.8} />
            <span>{t("nav.github")}</span>
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            className="icon-button mobile-menu-button"
            aria-label={menuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
          >
            {menuOpen ? (
              <X aria-hidden="true" size={20} strokeWidth={1.8} />
            ) : (
              <Menu aria-hidden="true" size={20} strokeWidth={1.8} />
            )}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="mobile-nav-panel">
          <nav className="container-shell" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                href={item.href}
                key={item.href}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
      <div className="header-divider" />
    </header>
  );
}
