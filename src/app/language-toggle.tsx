'use client';

import React, { useTransition } from 'react';
import { useTranslations } from '@/i18n';
import { locales, Locale } from '@/i18n/config';
import { setCookie } from '@/lib/client-cookies';

export default function LanguageToggle() {
  const { locale } = useTranslations();
  const [isPending, startTransition] = useTransition();

  const toggleLanguage = (newLocale: Locale) => {
    // Don't do anything if it's the same locale
    if (newLocale === locale) return;
    
    // Set the cookie with the new locale
    setCookie('NEXT_LOCALE', newLocale, { maxAge: 60 * 60 * 24 * 365 }); // 1 year
    
    // Use startTransition to improve perceived performance
    startTransition(() => {
      // Force a hard refresh to make sure all components re-render with the new locale
      window.location.reload();
    });
  };

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <span className="text-sm font-medium uppercase">{locale}</span>
      </div>
      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
        {locales.map((l) => (
          <li key={l}>
            <button 
              onClick={() => toggleLanguage(l)}
              className={locale === l ? 'active' : ''}
              disabled={isPending}
            >
              {l === 'en' ? 'English' : l === 'es' ? 'Español' : l}
              {isPending && l !== locale && ' ...'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
} 