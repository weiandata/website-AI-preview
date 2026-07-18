"use client";

import {
  Check,
  Grid2X2,
  List,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "@/components/language/language-provider";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { categories } from "@/data/categories";
import { skills } from "@/data/skills";
import { localize } from "@/lib/i18n";
import {
  filterSkills,
  parseSkillQuery,
  serializeSkillQuery,
} from "@/lib/skill-query";
import type { CategoryId } from "@/types/content";
import type { SkillFilterState, SkillSort, SkillView } from "@/types/filters";
import { SkillCard } from "./skill-card";
import { SkillListRow } from "./skill-list-row";

const allPlatforms = [...new Set(skills.flatMap((skill) => skill.platforms))].sort();
const allLicenses = [...new Set(skills.map((skill) => skill.license))].sort();
const allTags = [...new Set(skills.flatMap((skill) => skill.tags))].sort().slice(0, 12);

type FilterGroupKey = "categories" | "platforms" | "licenses" | "tags";

function FilterGroups({
  filters,
  onToggle,
}: {
  filters: SkillFilterState;
  onToggle: (group: FilterGroupKey, value: string) => void;
}) {
  const { locale, t } = useLanguage();
  const groups = [
    {
      key: "categories" as const,
      title: t("library.category"),
      options: categories.map((category) => ({
        value: category.id,
        label: localize(category.name, locale),
      })),
    },
    {
      key: "platforms" as const,
      title: t("library.platform"),
      options: allPlatforms.map((value) => ({ value, label: value })),
    },
    {
      key: "licenses" as const,
      title: t("library.license"),
      options: allLicenses.map((value) => ({ value, label: value })),
    },
    {
      key: "tags" as const,
      title: t("library.tag"),
      options: allTags.map((value) => ({ value, label: value })),
    },
  ];

  return (
    <div className="filter-groups">
      {groups.map((group) => (
        <fieldset key={group.key}>
          <legend>{group.title}</legend>
          <div>
            {group.options.map((option) => {
              const checked = Boolean(
                filters[group.key]?.includes(option.value as never),
              );
              return (
                <label key={option.value}>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggle(group.key, option.value)}
                  />
                  <span className="filter-check">
                    {checked ? <Check aria-hidden="true" size={12} strokeWidth={2.2} /> : null}
                  </span>
                  <span>{option.label}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
      ))}
    </div>
  );
}

export function SkillLibrary() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { locale, t } = useLanguage();
  const [visibleCount, setVisibleCount] = useState(6);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const filters = useMemo(
    () => parseSkillQuery(searchParams.toString()),
    [searchParams],
  );
  const latestFilters = useRef(filters);
  useEffect(() => {
    latestFilters.current = filters;
  }, [filters]);
  useEffect(() => {
    if (filters.focusSearch) searchInputRef.current?.focus();
  }, [filters.focusSearch]);
  const results = useMemo(
    () => filterSkills(skills, filters, locale),
    [filters, locale],
  );
  const view = filters.view ?? "grid";

  function updateFilters(next: SkillFilterState) {
    latestFilters.current = next;
    const query = serializeSkillQuery(next).toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  function toggleFilter(group: FilterGroupKey, value: string) {
    const currentFilters = latestFilters.current;
    const current = (currentFilters[group] ?? []) as string[];
    const nextValues = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];
    updateFilters({
      ...currentFilters,
      [group]: nextValues.length ? nextValues : undefined,
    });
    setVisibleCount(6);
  }

  function clearFilters() {
    updateFilters({});
    setVisibleCount(6);
  }

  function setView(nextView: SkillView) {
    updateFilters({ ...latestFilters.current, view: nextView });
  }

  function removeFilter(group: FilterGroupKey, value: string) {
    toggleFilter(group, value);
  }

  const activeFilters = [
    ...(filters.categories ?? []).map((value) => ({ group: "categories" as const, value })),
    ...(filters.platforms ?? []).map((value) => ({ group: "platforms" as const, value })),
    ...(filters.licenses ?? []).map((value) => ({ group: "licenses" as const, value })),
    ...(filters.tags ?? []).map((value) => ({ group: "tags" as const, value })),
  ];

  function filterLabel(group: FilterGroupKey, value: string) {
    if (group === "categories") {
      const category = categories.find((item) => item.id === value as CategoryId);
      return category ? localize(category.name, locale) : value;
    }
    return value;
  }

  const sortOptions: Array<[SkillSort, string]> = [
    ["recommended", t("library.sortRecommended")],
    ["updated", t("library.sortUpdated")],
    ["added", t("library.sortAdded")],
    ["name", t("library.sortName")],
    ["downloads", t("library.sortDownloads")],
  ];

  return (
    <main className="library-page">
      <div className="container-shell library-hero">
        <h1>{t("library.title")}</h1>
        <p>{t("library.description")}</p>
        <div className="library-search">
          <Search aria-hidden="true" size={19} strokeWidth={1.8} />
          <input
            ref={searchInputRef}
            type="search"
            aria-label={locale === "zh" ? "搜索 Skill 库" : "Search Skill library"}
            placeholder={t("search.placeholder")}
            value={filters.query ?? ""}
            onChange={(event) => {
              updateFilters({
                ...latestFilters.current,
                query: event.target.value || undefined,
              });
              setVisibleCount(6);
            }}
          />
          {filters.query ? (
            <button
              type="button"
              aria-label={locale === "zh" ? "清除搜索" : "Clear search"}
              onClick={() =>
                updateFilters({ ...latestFilters.current, query: undefined })
              }
            >
              <X aria-hidden="true" size={17} strokeWidth={1.8} />
            </button>
          ) : null}
        </div>
      </div>

      <div className="container-shell library-layout">
        <aside className="library-sidebar" aria-label={t("library.filters")}>
          <div className="sidebar-title">
            <span>
              <SlidersHorizontal aria-hidden="true" size={17} strokeWidth={1.8} />
              {t("library.filters")}
            </span>
          </div>
          <FilterGroups filters={filters} onToggle={toggleFilter} />
        </aside>

        <section className="library-results" aria-live="polite">
          <div className="library-toolbar">
            <div>
              <strong className="library-result-count">{results.length}</strong>
              <span>{t("library.resultCount")}</span>
            </div>
            <div className="toolbar-controls">
              <button
                type="button"
                className="mobile-filter-trigger button-base button-secondary button-sm"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <SlidersHorizontal aria-hidden="true" size={15} strokeWidth={1.8} />
                {t("library.filters")}
              </button>
              <label className="sort-control">
                <span>{t("library.sort")}</span>
                <select
                  value={filters.sort ?? "recommended"}
                  onChange={(event) =>
                    updateFilters({
                      ...latestFilters.current,
                      sort: event.target.value as SkillSort,
                    })
                  }
                >
                  {sortOptions.map(([value, label]) => (
                    <option value={value} key={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
              <div className="view-switcher">
                <button
                  type="button"
                  className={view === "grid" ? "is-active" : undefined}
                  aria-label={t("library.viewGrid")}
                  aria-pressed={view === "grid"}
                  onClick={() => setView("grid")}
                >
                  <Grid2X2 aria-hidden="true" size={16} strokeWidth={1.8} />
                </button>
                <button
                  type="button"
                  className={view === "list" ? "is-active" : undefined}
                  aria-label={t("library.viewList")}
                  aria-pressed={view === "list"}
                  onClick={() => setView("list")}
                >
                  <List aria-hidden="true" size={17} strokeWidth={1.8} />
                </button>
              </div>
            </div>
          </div>

          {activeFilters.length ? (
            <div className="active-filters">
              {activeFilters.map(({ group, value }) => (
                <button
                  type="button"
                  data-filter-chip
                  key={`${group}-${value}`}
                  onClick={() => removeFilter(group, value)}
                >
                  {filterLabel(group, value)}
                  <X aria-hidden="true" size={13} strokeWidth={1.8} />
                </button>
              ))}
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                {t("common.clear")}
              </Button>
            </div>
          ) : null}

          {results.length ? (
            <>
              <div className={view === "grid" ? "library-grid" : "library-list"}>
                {results.slice(0, visibleCount).map((skill) =>
                  view === "grid" ? (
                    <SkillCard skill={skill} key={skill.id} />
                  ) : (
                    <SkillListRow skill={skill} key={skill.id} />
                  ),
                )}
              </div>
              {visibleCount < results.length ? (
                <div className="load-more-row">
                  <Button variant="secondary" onClick={() => setVisibleCount((count) => count + 6)}>
                    {t("common.loadMore")}
                  </Button>
                </div>
              ) : null}
            </>
          ) : (
            <EmptyState
              title={t("empty.title")}
              description={t("empty.description")}
              action={
                <Button variant="secondary" onClick={clearFilters}>
                  {t("common.clear")}
                </Button>
              }
            />
          )}
        </section>
      </div>

      <Dialog
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        title={t("library.filters")}
        closeLabel={t("common.cancel")}
      >
        <div className="mobile-filter-dialog">
          <FilterGroups filters={filters} onToggle={toggleFilter} />
          <Button
            variant="secondary"
            onClick={() => {
              clearFilters();
              setMobileFiltersOpen(false);
            }}
          >
            {t("common.clear")}
          </Button>
        </div>
      </Dialog>
    </main>
  );
}
