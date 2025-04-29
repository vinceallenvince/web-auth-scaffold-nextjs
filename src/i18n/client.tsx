'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useParams } from 'next/navigation';
import { defaultLocale, Dictionary, Locale, isValidLocale } from './config';

// Create context for i18n
type I18nContextType = {
  locale: Locale;
  dictionary: Dictionary;
};

const I18nContext = createContext<I18nContextType | null>(null);

// Provider component
export function I18nProvider({
  children,
  locale,
  dictionary,
}: {
  children: ReactNode;
  locale: Locale;
  dictionary: Dictionary;
}) {
  return (
    <I18nContext.Provider value={{ locale, dictionary }}>
      {children}
    </I18nContext.Provider>
  );
}

// Hook to access translations
export function useTranslations() {
  const context = useContext(I18nContext);
  
  if (!context) {
    throw new Error('useTranslations must be used within an I18nProvider');
  }
  
  // Helper function to get nested translation values
  const t = (key: string, placeholders?: Record<string, string>): string => {
    // Split the key by dots to access nested properties
    const keys = key.split('.');
    let value: unknown = context.dictionary;
    
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
  
  return {
    t,
    locale: context.locale,
  };
}

// Hook to get current locale
export function useLocale(): Locale {
  // Get locale from route params if available
  const params = useParams();
  const localeParam = params?.locale as string | undefined;
  
  // Validate and return locale or fallback to default
  if (localeParam && isValidLocale(localeParam)) {
    return localeParam;
  }
  
  return defaultLocale;
} 