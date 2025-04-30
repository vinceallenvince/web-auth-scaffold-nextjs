import 'server-only';
import type { Locale } from '@/constants/i18n';
import { defaultLocale } from '@/constants/i18n';

// Define the dictionary structure type based on the existing JSON structure
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

// Dictionary cache to avoid reloading the same file multiple times
const dictionaries = new Map<Locale, Promise<Dictionary>>();

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  // If the dictionary for this locale is already being loaded, return the cached promise
  const existing = dictionaries.get(locale);
  if (existing) {
    return existing;
  }

  // Otherwise, start loading the dictionary and cache the promise
  const dictionaryPromise = loadDictionary(locale);
  dictionaries.set(locale, dictionaryPromise);
  return dictionaryPromise;
}

async function loadDictionary(locale: Locale): Promise<Dictionary> {
  try {
    // Dynamic import for the locale-specific dictionary
    // This keeps the translations out of the client bundle
    const dictionary = await import(`./dictionaries/${locale}.json`);
    return dictionary as Dictionary;
  } catch (error) {
    console.error(`Error loading dictionary for locale ${locale}:`, error);
    
    // Fallback to default locale if requested locale is not available
    if (locale !== defaultLocale) {
      console.warn(`Falling back to default locale (${defaultLocale})`);
      return getDictionary(defaultLocale as Locale);
    }
    
    // If default locale also fails, return an empty dictionary structure
    console.error('Failed to load default locale dictionary');
    throw new Error(`Failed to load dictionary for locale ${locale}`);
  }
} 