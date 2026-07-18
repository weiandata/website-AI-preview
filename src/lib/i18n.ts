import { translations, type TranslationKey } from "@/data/translations";
import type { Locale, LocalizedText } from "@/types/content";

export function localize(text: LocalizedText, locale: Locale): string {
  return text[locale] || text.zh;
}

export function translate(key: TranslationKey, locale: Locale): string {
  return translations[locale][key] ?? translations.zh[key];
}
