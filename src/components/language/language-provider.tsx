"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { translate } from "@/lib/i18n";
import type { TranslationKey } from "@/data/translations";
import type { Locale } from "@/types/content";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getBrowserLocale(): Locale {
  const stored = window.localStorage.getItem("weian-locale");
  if (stored === "zh" || stored === "en") return stored;
  const preferred = window.navigator.languages?.[0] ?? window.navigator.language;
  return preferred.toLocaleLowerCase().startsWith("en") ? "en" : "zh";
}

function subscribeToLocale(onStoreChange: () => void): () => void {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("weian-locale-change", onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("weian-locale-change", onStoreChange);
  };
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore<Locale>(
    subscribeToLocale,
    getBrowserLocale,
    () => "zh",
  );

  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
  }, [locale]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale(nextLocale) {
        window.localStorage.setItem("weian-locale", nextLocale);
        window.dispatchEvent(new Event("weian-locale-change"));
      },
      t: (key) => translate(key, locale),
    }),
    [locale],
  );

  return (
    <LanguageContext.Provider value={value}>
      <div className="language-frame" data-locale={locale}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
}
