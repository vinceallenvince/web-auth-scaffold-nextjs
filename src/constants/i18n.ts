/**
 * Internationalization constants
 */

// Supported locales
export const locales = ['en', 'es'] as const;

// Default locale
export const defaultLocale = 'en';

// Type for supported locales
export type Locale = (typeof locales)[number]; 