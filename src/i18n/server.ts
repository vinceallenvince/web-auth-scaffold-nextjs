import 'server-only';
import { headers } from 'next/headers';
import { defaultLocale, Dictionary, Locale, isValidLocale } from './config';
import { createTranslationFunction } from './utils';

// Import the locale files
import en from './locales/en.json';
import es from './locales/es.json';

// Create a dictionary of all translations
const dictionaries = {
  en,
  es,
};

/**
 * Gets the appropriate dictionary for the provided locale
 */
export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale] || dictionaries[defaultLocale];
}

/**
 * Extracts and validates locale from a string
 */
export function getLocaleFromString(localeString: string | undefined): Locale {
  if (localeString && isValidLocale(localeString)) {
    return localeString;
  }
  return defaultLocale;
}

/**
 * Creates a translations object with the t() function for server components
 */
export function createTranslations(dictionary: Dictionary) {
  const t = createTranslationFunction(dictionary);
  
  return {
    t,
    dictionary,
  };
}

/**
 * Gets the current locale from the Accept-Language header or falls back to default
 */
export async function getLocaleFromHeaders(): Promise<Locale> {
  try {
    // Get the Accept-Language header
    const headersList = await headers();
    const acceptLanguage = headersList.get('Accept-Language');
    
    if (!acceptLanguage) {
      return defaultLocale;
    }
    
    // Parse the Accept-Language header
    const preferredLocales = acceptLanguage.split(',')
      .map((locale: string) => locale.split(';')[0].trim());
    
    // Find the first supported locale
    for (const locale of preferredLocales) {
      const localePrefix = locale.split('-')[0];
      if (isValidLocale(localePrefix)) {
        return localePrefix as Locale;
      }
    }
  } catch (error) {
    console.error('Error getting locale from headers:', error);
  }
  
  return defaultLocale;
} 