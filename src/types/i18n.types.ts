export type Messages = {
  metadata: {
    title: string;
    description: string;
  };
  common: {
    appName: string;
    loading: string;
    error: string;
    selectLanguage: string;
    languages: {
      en: string;
      fr: string;
      es: string;
      de: string;
    };
    buttons: {
      submit: string;
      cancel: string;
      save: string;
      delete: string;
      edit: string;
      back: string;
    };
  };
  navigation: {
    home: string;
    login: string;
    logout: string;
    profile: string;
    settings: string;
    dashboard: string;
  };
  auth: {
    emailPlaceholder: string;
    loginButton: string;
    checkEmail: string;
    magicLinkSent: string;
    invalidLink: string;
    rateLimit: string;
    login: {
      title: string;
      subtitle: string;
    };
    logout: {
      success: string;
    };
  };
  validation: {
    required: string;
    email: string;
    minLength: string;
    maxLength: string;
    pattern: string;
    match: string;
  };
  notifications: {
    success: string;
    error: string;
    info: string;
    warning: string;
    actionRequired: string;
    sessionExpired: string;
  };
  profile: {
    title: string;
    personalInfo: string;
    name: string;
    email: string;
    updateSuccess: string;
    updateError: string;
  };
};

// Type for translation namespace keys
export type Namespace = keyof Messages;

// Type for nested keys within a specific namespace
export type NestedKey<N extends Namespace> = N extends keyof Messages
  ? keyof Messages[N]
  : never;

// Type for translation parameters
export type TranslationParams = Record<string, string | number>;

// Type for formatter configuration
export type FormatterConfig = {
  locale: string;
  timeZone?: string;
}; 