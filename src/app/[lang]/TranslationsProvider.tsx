"use client";

import { I18nProvider } from "@/app/lib/i18n-context";

// Dictionary type definition
type Dictionary = {
  common: {
    appTitle: string;
    appDescription: string;
  };
  navigation: {
    skipToContent: string;
    helloWorld: string;
    examples: string;
    buttons: string;
    cards: string;
    typography: string;
    layout: string;
    forms: string;
    toggleTheme: string;
  };
  auth: {
    login: string;
    logout: string;
    signIn: string;
    signInWithMagicLink: string;
    profile: string;
    dashboard: string;
    account: string;
  };
  footer: {
    about: string;
    contact: string;
  };
  home: {
    welcome: string;
    description: string;
    magicLinkAuthTitle: string;
    magicLinkAuthDescription: string;
    modernStackTitle: string;
    modernStackDescription: string;
    readyToUseTitle: string;
    readyToUseDescription: string;
  };
  errors: {
    notFound: string;
    goHome: string;
    somethingWentWrong: string;
  };
  meta: {
    title: string;
    description: string;
  };
};

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