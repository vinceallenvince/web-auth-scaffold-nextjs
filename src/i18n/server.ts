import { defaultLocale, Dictionary, Locale, isValidLocale } from './config';

// Import the locale files
import en from './locales/en.json';
import es from './locales/es.json';

// Create a dictionary of all translations
const dictionaries = {
  en,
  es,
};

/**
 * Get dictionary for a specific locale
 */
export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return Promise.resolve(dictionaries[locale]);
}

/**
 * Get locale from string (used by both client and server)
 */
export function getLocaleFromString(localeString: string | undefined): Locale {
  if (localeString && isValidLocale(localeString)) {
    return localeString as Locale;
  }
  return defaultLocale;
}

/**
 * Get locale from request - ONLY USE IN SERVER COMPONENTS
 * 
 * In a real app with App Router, you would use headers() from 'next/headers'
 * to access the x-locale header that our middleware sets.
 * 
 * For now, we're keeping it simple to avoid build errors.
 */
export async function getLocaleFromRequest(): Promise<Locale> {
  // For now, just return default locale
  // In a real implementation, you would use:
  // const headersList = headers();
  // const localeHeader = headersList.get('x-locale');
  return defaultLocale;
}

/**
 * Server-side translation helper
 */
export function createTranslations(dictionary: Dictionary) {
  // Helper function to get nested translation values
  return function t(key: string, placeholders?: Record<string, string>): string {
    // Split the key by dots to access nested properties
    const keys = key.split('.');
    let value: unknown = dictionary;
    
    // Navigate through nested objects
    for (const k of keys) {
      if (typeof value === 'object' && value !== null && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key; // Key not found, return the key as fallback
      }
    }
    
    // If the value is not a string, return the key
    if (typeof value !== 'string') {
      return key;
    }
    
    // Replace placeholders if provided
    if (placeholders) {
      return Object.entries(placeholders).reduce((result, [placeholder, replacement]) => {
        return result.replace(new RegExp(`{${placeholder}}`, 'g'), replacement);
      }, value);
    }
    
    return value;
  };
} 