/**
 * Internationalization Types
 * 
 * Central type definitions for i18n functionality
 */

/**
 * Auth section of the dictionary with all sub-sections
 */
export type AuthDictionary = {
  login: string;
  logout: string;
  signIn: string;
  signInWithMagicLink: string;
  profile: string;
  account: string;
  magicLink?: {
    title: string;
    description: string;
    formTitle: string;
    emailLabel: string;
    emailPlaceholder: string;
    emailError: string;
    sendButton: string;
    sending: string;
    successMessage: string;
    rateLimitError: string;
    timeoutError: string;
    networkError: string;
    csrfError: string;
    generalError: string;
  };
  verifyRequest?: {
    title: string;
    description: string;
    tryDifferentEmail: string;
    metaTitle: string;
    metaDescription: string;
  };
  errors?: {
    prefix: string;
    default: string;
    OAuthAccountNotLinked: string;
    EmailSignin: string;
    CredentialsSignin: string;
    SessionRequired: string;
    AccessDenied: string;
    Verification: string;
    [key: string]: string; // Allow for additional error types
  };
};

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
  auth: AuthDictionary;
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