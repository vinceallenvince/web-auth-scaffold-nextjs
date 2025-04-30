"use client";

import { I18nProvider } from "@/app/lib/i18n-context";
import type { Dictionary } from "@/types/i18n.types";

// Props type for the TranslationsProvider
type TranslationsProviderProps = {
  translations: Dictionary;
  children: React.ReactNode;
};

// Client component that provides translations to the I18nProvider
export function TranslationsProvider({
  translations,
  children,
}: TranslationsProviderProps) {
  return <I18nProvider dictionary={translations}>{children}</I18nProvider>;
} 