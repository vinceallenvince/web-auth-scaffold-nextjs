"use client";

import { I18nProvider } from "@/app/lib/i18n-context";
import type { Dictionary } from "@/types/i18n.types";

type I18nClientProviderProps = {
  dictionary: Dictionary;
  children: React.ReactNode;
};

// Client component that provides the I18n context to client components
export function I18nClientProvider({ dictionary, children }: I18nClientProviderProps) {
  return (
    <I18nProvider dictionary={dictionary}>
      {children}
    </I18nProvider>
  );
} 