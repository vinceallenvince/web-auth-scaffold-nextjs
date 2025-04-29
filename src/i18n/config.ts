// i18n configuration

/**
 * Supported languages
 */
export const locales = ['en', 'es'] as const;

/**
 * Default locale
 */
export const defaultLocale = 'en';

/**
 * Type for locale keys
 */
export type Locale = typeof locales[number];

/**
 * Validate if a given string is a supported locale
 */
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

/**
 * Dictionary type for translations
 */
export type Dictionary = Record<string, Record<string, unknown>>;

/**
 * Get locale from pathname or default to 'en'
 */
export function getLocaleFromPathname(pathname: string): Locale {
  // Extract the first path segment
  const segment = pathname.split('/')[1];
  
  // Check if it's a valid locale
  if (segment && isValidLocale(segment)) {
    return segment as Locale;
  }
  
  return defaultLocale;
} 