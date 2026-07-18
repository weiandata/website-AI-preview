"use client";

import {
  ChevronDown,
  GitFork,
  Menu,
  Search,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { categories } from "@/data/categories";
import { localize } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/language/language-switcher";
import { useLanguage } from "@/components/language/language-provider";
import { buttonClassName } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { locale, t } = useLanguage();
  const isHome = pathname === "/";
  const navItems = [
    { href: "/", label: t("nav.home") },
    { href: "/skills", label: t("nav.skills") },
    { href: "/about", label: t("nav.about") },
  ];

  return (
    <header id="page-top" className={cn("site-header", isHome && "is-home")}>
      <div className="container-shell header-inner">
        <Link href="/" className="brand-lockup" aria-label="WEIAN DATA home">
          <Image
            src={
              isHome
                ? "/brand/weian-logo-reversed.svg"
                : "/brand/weian-logo-primary.svg"
            }
            alt="WEIAN DATA TECH"
            width={174}
            height={50}
            priority
          />
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
            href={isHome ? "/#home-search" : "/skills?focus=search"}
            className="icon-button header-search"
            aria-label={t("nav.search")}
          >
            <Search aria-hidden="true" size={18} strokeWidth={1.8} />
          </Link>
          <LanguageSwitcher />
          {!isHome ? (
            <a
              href="https://github.com/topics/ai-agents"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClassName({
                variant: "secondary",
                size: "sm",
                className: "github-button",
              })}
            >
              <GitFork aria-hidden="true" size={16} strokeWidth={1.8} />
              <span>{t("nav.github")}</span>
            </a>
          ) : null}
          <button
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

      <Dialog
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        title={locale === "zh" ? "导航菜单" : "Navigation menu"}
        closeLabel={t("nav.closeMenu")}
        variant="drawer"
      >
        <nav className="drawer-nav" aria-label="Mobile navigation">
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
      </Dialog>
      <div className="header-divider" />
    </header>
  );
}
