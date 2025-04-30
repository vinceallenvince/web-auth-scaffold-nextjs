"use client";

import { I18nProvider } from "@/app/lib/i18n-context";

// Type definition for the dictionary based on our JSON structure
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