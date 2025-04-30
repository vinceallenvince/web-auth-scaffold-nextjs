/**
 * Internationalization Types
 * 
 * Central type definitions for i18n functionality
 */

/**
 * Dictionary type definition based on the JSON translation structure
 */
export type Dictionary = {
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
  
  // Allow for feature-specific or page-specific translations
  [key: string]: Record<string, unknown>;
};

// Type for translation namespace keys
export type Namespace = keyof Dictionary;

// Type for nested keys within a specific namespace
export type NestedKey<N extends Namespace> = N extends keyof Dictionary
  ? keyof Dictionary[N]
  : never;

// Type for nested dictionary values that can be strings or objects
export type NestedDictionaryValue = string | Record<string, unknown>;

// Type for accessing nested properties using string paths
export type DotNotationPath = string;

// Type for translation parameters
export type TranslationParams = Record<string, string | number>;

// Type for formatter configuration
export type FormatterConfig = {
  locale: string;
  timeZone?: string;
}; 