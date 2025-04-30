# Implementation Plan: Manual JSON + built-in i18n

## Overview

This implementation plan outlines the approach for adding internationalization (i18n) to our Next.js application using a manual JSON + built-in i18n approach. This solution is 100% App Router-native, requires zero additional dependencies, and generates fully-static locale-aware pages.

## Context

Based on the application requirements, users should be able to:
1. Access the application in multiple languages
2. Seamlessly switch between supported languages
3. See consistent translations across all UI components
4. Experience no performance degradation due to i18n implementation

This approach avoids additional runtime dependencies while maintaining full compatibility with Next.js App Router, TypeScript, Tailwind, and DaisyUI.

## Development Goals

1. Create a future-proof i18n implementation with zero external dependencies
2. Ensure all translations are loaded and resolved at build time (SSG-friendly)
3. Provide strong TypeScript support for translation keys
4. Support both server components and client components
5. Maintain performance with static generation
6. Provide straightforward developer experience for adding/updating translations

## Development Steps

### Phase 1: Initial Setup

1. Configure Next.js with supported locales
   - Update `next.config.js` to include the i18n configuration block
   - Define supported locales (initial support for 'en', 'es')
   - Set default locale ('en')
   - Consider disabling automatic locale detection based on user preference

2. Establish the root locale segment structure
   - Create the `[lang]` dynamic segment folder in the app directory
   - Move existing page components into this folder hierarchy
   - Update imports and paths to reflect the new structure

### Phase 2: Translation Management

1. Create the dictionary structure
   - Set up the `app/[lang]/dictionaries` directory
   - Create initial JSON files for each supported locale (en.json, es.json)
   - Establish consistent schema across all locale files
   - Organize translations by component/feature area

2. Implement the server-side dictionary loader
   - Create `app/[lang]/dictionaries.ts` helper
   - Use dynamic imports with `server-only` to keep translations out of client bundle
   - Implement the `getDictionary` function to load locale-specific translations
   - Add robust error handling for missing or invalid locale files:
     - Implement fallback to default locale if requested locale is unavailable
     - Log errors when dictionary loading fails but don't break the application
     - Consider adding type guards to validate dictionary structure after loading
     - Cache successful dictionary loads to improve performance

3. Configure static generation for all locales
   - Add `generateStaticParams` to the root layout to pre-render all locale variants
   - Update the root layout to set the HTML lang attribute correctly
   - Prepare for passing dictionary to child components

### Phase 3: Component Integration

1. Update server components to consume translations
   - Modify page components to receive the locale parameter
   - Load and use dictionary translations in server components
   - Ensure all UI text uses translation keys

2. Implement client-side translation context
   - Create `app/lib/i18n-context.tsx` with React context
   - Build the `useT()` hook for accessing translations in client components
   - Wrap relevant sections with the context provider

3. Build the language switcher component
   - Create a client component for switching between languages
   - Use Next.js navigation hooks to handle path replacement
   - Style with DaisyUI for consistent UI

### Phase 4: Type Safety & Testing

1. Enhance type safety
   - Convert JSON dictionaries to TypeScript with `as const`
   - Implement type derivation for dictionaries
   - Add type checking to the `useT()` hook

2. Test across locales
   - Verify correct rendering of all supported languages
   - Test language switching behavior
   - Confirm no client-side performance impact
   - Validate that all text is properly translated

### Phase 5: Documentation & Refinement

1. Document the i18n implementation
   - Create a guide for adding new translation keys
   - Document the process for adding support for additional languages
   - Add examples of using translations in different component types

2. Refine based on feedback
   - Optimize bundle size if needed
   - Improve developer experience
   - Address any edge cases discovered during implementation

## Acceptance Criteria

The i18n implementation is complete when:
1. All UI text is externalized to translation files
2. The application correctly renders in all supported languages
3. Users can switch between languages without page reload
4. All pages are statically generated for each locale
5. No client JS is bloated with unnecessary translation data
6. Type safety is maintained for translation keys
7. Developer experience for adding/updating translations is straightforward