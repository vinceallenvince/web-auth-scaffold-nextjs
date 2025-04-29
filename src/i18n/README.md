# Internationalization (i18n) in Next.js

This project implements internationalization using a custom approach with Next.js App Router. The implementation is designed to be simple to use and extend.

## Structure

- `/src/i18n/` - Main directory for i18n resources
  - `/config.ts` - Configuration and type definitions
  - `/client.tsx` - Client-side components and hooks
  - `/server.ts` - Server-side utilities
  - `/locales/` - Contains locale JSON files
    - `en.json` - English translations
    - `es.json` - Spanish translations
  - `/messages/` - Directory for future message format support

## Usage

### Server Components

In server components, you can use the `getLocale` and `getDictionary` functions:

```tsx
import { getLocale, getDictionary, createTranslations } from '@/i18n';

export default async function ServerPage() {
  const locale = getLocale();
  const dictionary = await getDictionary(locale);
  const t = createTranslations(dictionary);
  
  return (
    <div>
      <h1>{t('common.navigation.home')}</h1>
      <p>{t('some.nested.key')}</p>
    </div>
  );
}
```

### Client Components

In client components, use the `useTranslations` hook:

```tsx
'use client';

import { useTranslations } from '@/i18n';

export default function ClientComponent() {
  const { t, locale } = useTranslations();
  
  return (
    <div>
      <h1>{t('common.navigation.home')}</h1>
      <p>Current locale: {locale}</p>
    </div>
  );
}
```

## Language Switching

The app provides a `LanguageToggle` component that allows users to switch between languages. The selected language is stored in a cookie and respected on future requests.

```tsx
import LanguageToggle from '@/app/language-toggle';

export default function MyLayout() {
  return (
    <div>
      <LanguageToggle />
    </div>
  );
}
```

## Adding New Translations

1. Add a new locale in `/src/i18n/config.ts`
2. Create a new JSON file in `/src/i18n/locales/`
3. Import and add the new locale in `/src/i18n/server.ts`

## Translation Format

Translations are organized in a nested object structure:

```json
{
  "section": {
    "subsection": {
      "key": "Translation value"
    }
  }
}
```

Access translations using dot notation: `t('section.subsection.key')`

## Message Format (Future)

For more complex translations with pluralization, date formatting, and other localization features, we plan to implement a message format system in the `/src/i18n/messages/` directory.

## References

- [Next.js Internationalization](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
- [FormatJS](https://formatjs.io/)
- [Next.js with i18n Example](https://github.com/vercel/next.js/tree/canary/examples/app-dir-i18n-routing) 