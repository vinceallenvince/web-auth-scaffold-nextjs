'use client';

import React, { useEffect, useState } from 'react';
import { getDictionary } from '@/i18n';
import { I18nProvider } from '@/i18n/client';
import { getCookie } from '@/lib/client-cookies';
import { getLocaleFromString } from '@/i18n';
import { defaultLocale, Locale, Dictionary } from '@/i18n/config';

export default function I18nProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<{
    locale: Locale;
    dictionary: Dictionary | null;
    isLoaded: boolean;
  }>({
    locale: defaultLocale,
    dictionary: null,
    isLoaded: false,
  });

  useEffect(() => {
    // Get locale from cookie
    const cookieLocale = getCookie('NEXT_LOCALE');
    const locale = getLocaleFromString(cookieLocale);
    
    // Get dictionary for the locale
    getDictionary(locale).then((dictionary) => {
      setState({
        locale,
        dictionary,
        isLoaded: true,
      });
    }).catch((error) => {
      console.error('Failed to load dictionary:', error);
      setState({
        locale,
        dictionary: null,
        isLoaded: true, // Mark as loaded to render with fallback
      });
    });
  }, []);

  // Show nothing until dictionary is loaded
  if (!state.isLoaded) {
    return null;
  }

  // If dictionary failed to load but isLoaded is true, we'll try to render with defaultLocale
  if (!state.dictionary) {
    // Attempt to load default locale as fallback
    getDictionary(defaultLocale)
      .then((dictionary) => {
        setState({
          locale: defaultLocale,
          dictionary,
          isLoaded: true,
        });
      })
      .catch((error) => {
        console.error('Failed to load fallback dictionary:', error);
        // Continue rendering even without dictionary, components will have to handle missing translations
      });
    
    // While waiting for fallback dictionary, show a minimal loading indicator
    return <div className="loading loading-spinner loading-lg"></div>;
  }

  return (
    <I18nProvider locale={state.locale} dictionary={state.dictionary}>
      {children}
    </I18nProvider>
  );
} 