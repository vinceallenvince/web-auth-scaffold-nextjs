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
    });
  }, []);

  // Show nothing until dictionary is loaded
  if (!state.isLoaded || !state.dictionary) {
    return null;
  }

  return (
    <I18nProvider locale={state.locale} dictionary={state.dictionary}>
      {children}
    </I18nProvider>
  );
} 