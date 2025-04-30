# Manual JSON + built-in i18n

Below is a from-scratch "manual JSON + built-in i18n" recipe that's 100% App Router-native (Next 13 +). Follow it step-by-step and you'll end up with fully-static, locale-aware pages with no extra libraries needed.

## Steps

1. Tell Next.js which locales you support

```js
// next.config.js
/** @type {import('next').NextConfig} */
module.exports = {
  i18n: {
    locales: ['en', 'es', 'fr'],   // add / remove at will
    defaultLocale: 'en',
    localeDetection: false         // optional: skip Accept-Language redirects
  }
};
```

With App Router you'll still create a [lang] folder (next step), but the i18n block keeps URL helpers, <Link locale="…">, etc. working consistently.

2. Create a root locale segment

```
app
└─ [lang]            ← every route now sits under this folder
   ├─ layout.tsx
   ├─ page.tsx
   └─ …other routes
```

Because [lang] is a dynamic segment, the router passes the current locale to every nested layout and page as params.lang.

3. Add your dictionaries

```
app/[lang]/dictionaries
   ├─ en.json
   ├─ es.json
   └─ fr.json
```

en.json

```json
{
  "navbar": { "home": "Home", "about": "About" },
  "hero":   { "title": "Welcome", "cta": "Get started" }
}
```

(Keep the shape identical across files to avoid missing keys.)

4. Tiny helper to load a dictionary server-side

```ts
// app/[lang]/dictionaries.ts

import 'server-only';          // ensures this stays out of the client bundle

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((m) => m.default),
  es: () => import('./dictionaries/es.json').then((m) => m.default),
  fr: () => import('./dictionaries/fr.json').then((m) => m.default)
};

export const getDictionary = async (lang: keyof typeof dictionaries) =>
  dictionaries[lang]();
```

Because this code only runs on the **server**, the JSON never balloons your client JS—ideal for SSG.

5. Root `layout.tsx` (sets `<html lang="">` and provides translations)

```tsx
// app/[lang]/layout.tsx
import { getDictionary } from './dictionaries';

export async function generateStaticParams() {
  // 👇 pre-render one HTML file per locale
  return ['en', 'es', 'fr'].map((lang) => ({ lang }));
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { lang: 'en' | 'es' | 'fr' };
}) {
  const dict = await getDictionary(params.lang);

  return (
    <html lang={params.lang}>
      {/* Provide translations to the tree via context or props */}
      <body>{children}</body>
    </html>
  );
}
```

6. Example page that consumes the dictionary

```tsx
// app/[lang]/page.tsx
import { getDictionary } from './dictionaries';

export default async function Home({
  params
}: {
  params: { lang: 'en' | 'es' | 'fr' };
}) {
  const t = await getDictionary(params.lang);
  return (
    <main className="flex flex-col items-center gap-6 p-8">
      <h1 className="text-4xl font-bold">{t.hero.title}</h1>
      <button className="btn btn-primary">{t.hero.cta}</button>
    </main>
  );
}
```

7. (Recommended) Minimal client-side `useT()` hook

If you want to avoid prop-drilling in client components:

```tsx
// app/lib/i18n-context.tsx
'use client';
import { createContext, useContext } from 'react';
export const I18nContext = createContext<Record<string, any>>({});
export const useT = () => {
  const dict = useContext(I18nContext);
  return (path: string) =>
    path.split('.').reduce((obj, key) => obj?.[key], dict) as string;
};
```

Wrap your client subtree inside `<I18nContext.Provider value={dict}>` in a client layout if you need translations on the client side (e.g., for interactive components).

8. Language switcher component (pure client)

```tsx
'use client';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

export default function LocaleSwitcher() {
  const { lang } = useParams<{ lang: string }>();
  const pathname = usePathname();

  return (
    <div className="join">
      {['en', 'es', 'fr'].map((l) => (
        <Link
          key={l}
          href={`/${l}${pathname.replace(/^\/[a-z]{2}/, '')}`}
          className={`btn join-item ${l === lang && 'btn-active'}`}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
```

9. Type-safety extras (optional but nice)
   1. Convert each *.json to *.ts with as const and export it.
   2. Use zod or type-fests Jsonify<T> trick to derive:
      ```ts
      type Dict = typeof import('./dictionaries/en.json');
      ```
      Then type your useT() hook so only legitimate keys compile.

## Recap

| Step | What you did | Why it matters |
|------|-------------|----------------|
| 1 | Added i18n block | Keeps locale helpers & CLI working |
| 2 | Created [lang] segment | Router passes locale param everywhere |
| 3–4 | Saved JSON dictionaries & getDictionary() | Zero runtime deps; server-only loading |
| 5 | Generated static params | One HTML file per locale (pure SSG) |
| 6 | Read strings in pages/components | All data resolved at build time |
| 7–8 | Optional context + switcher | Easy client interactivity |

With this you have a future-proof, dependency-free localization layer that's 100% compatible with Tailwind, DaisyUI, TypeScript, and App Router SSG. Happy shipping 🚀