"use client";

import { ArrowRight, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { useLanguage } from "@/components/language/language-provider";
import { skills } from "@/data/skills";
import { localize } from "@/lib/i18n";
import { filterSkills } from "@/lib/skill-query";
import { SkillIcon } from "./skill-icon";

const popularSearches = ["OpenAI", "Claude", "Codex", "数据分析", "PDF", "自动化", "GitHub", "写作"];

function HighlightedText({ text, query }: { text: string; query: string }) {
  const index = text.toLocaleLowerCase().indexOf(query.toLocaleLowerCase());
  if (!query || index < 0) return text;
  return (
    <>
      {text.slice(0, index)}
      <mark>{text.slice(index, index + query.length)}</mark>
      {text.slice(index + query.length)}
    </>
  );
}

export function HeroSearch() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { locale, t } = useLanguage();
  const suggestions = useMemo(
    () => filterSkills(skills, { query }, locale).slice(0, 5),
    [query, locale],
  );

  useEffect(() => {
    function handleShortcut(event: globalThis.KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (
        event.key === "/" &&
        !target?.matches("input, textarea, select, [contenteditable='true']")
      ) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  function submit(searchQuery = query) {
    const trimmed = searchQuery.trim();
    router.push(trimmed ? `/skills?q=${encodeURIComponent(trimmed)}` : "/skills");
    setOpen(false);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) => Math.min(current + 1, suggestions.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) => Math.max(current - 1, -1));
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (activeIndex >= 0 && suggestions[activeIndex]) {
        router.push(`/skills/${suggestions[activeIndex].slug}`);
      } else {
        submit();
      }
    } else if (event.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    }
  }

  return (
    <div className="hero-search-wrap">
      <div className="hero-search liquid-glass">
        <Search aria-hidden="true" size={20} strokeWidth={1.8} />
        <input
          ref={inputRef}
          type="search"
          role="combobox"
          aria-label={locale === "zh" ? "搜索 Skill" : "Search Skills"}
          aria-expanded={open}
          aria-controls="hero-search-results"
          aria-activedescendant={activeIndex >= 0 ? `search-option-${activeIndex}` : undefined}
          placeholder={t("search.placeholder")}
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
            setActiveIndex(-1);
          }}
          onKeyDown={handleKeyDown}
        />
        <kbd>/</kbd>
        <button type="button" aria-label={t("nav.search")} onClick={() => submit()}>
          <ArrowRight aria-hidden="true" size={18} strokeWidth={1.8} />
        </button>
      </div>

      {open ? (
        <div id="hero-search-results" className="search-results" role="listbox">
          {query ? (
            suggestions.length ? (
              suggestions.map((skill, index) => (
                <button
                  id={`search-option-${index}`}
                  key={skill.id}
                  type="button"
                  role="option"
                  aria-selected={activeIndex === index}
                  className={activeIndex === index ? "is-active" : undefined}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => router.push(`/skills/${skill.slug}`)}
                >
                  <span className="search-result-icon">
                    <SkillIcon icon={skill.icon} size={18} />
                  </span>
                  <span>
                    <strong>
                      <HighlightedText
                        text={locale === "zh" ? skill.nameZh ?? skill.name : skill.name}
                        query={query}
                      />
                    </strong>
                    <small>{localize(skill.description, locale)}</small>
                  </span>
                  <ArrowRight aria-hidden="true" size={16} strokeWidth={1.8} />
                </button>
              ))
            ) : (
              <p className="search-no-results">{t("empty.title")}</p>
            )
          ) : (
            <div className="popular-searches">
              <span>{t("search.popular")}</span>
              <div>
                {popularSearches.map((item) => (
                  <button
                    className="popular-search-term"
                    key={item}
                    type="button"
                    onClick={() => submit(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
