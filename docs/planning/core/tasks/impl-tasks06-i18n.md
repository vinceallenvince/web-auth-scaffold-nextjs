# Implementation Tasks: Manual JSON + built-in i18n

## Overview
This document outlines the implementation tasks for adding internationalization (i18n) to our Next.js application using a manual JSON + built-in i18n approach. This solution is 100% App Router-native, requires zero additional dependencies, and generates fully-static locale-aware pages.

## Tasks

### I18N-01: Next.js Locale Configuration
**Type**: Task  
**Summary**: Configure Next.js with supported locales and establish basic i18n structure  
**Description**:
- Set up the Next.js configuration to support multiple languages and establish the foundation for the i18n implementation

**Implementation Details**:
- Follow these steps:
  1. **Update Next.js configuration**:
     - Modify `next.config.js` to include the i18n configuration block
     - Define supported locales (initial support for 'en', 'es')
     - Set default locale to 'en'
     - Configure locale detection settings

  2. **Create root locale segment structure**:
     - Create the `[lang]` dynamic segment folder in the app directory
     - Move existing page components into this folder hierarchy
     - Update imports and paths to reflect the new structure
     - Ensure routing continues to work correctly with the new structure

  3. **Test basic routing**:
     - Verify that pages are accessible with locale prefixes (e.g., /en/home, /es/home)
     - Test default locale redirection
     - Check that dynamic routes work correctly with the new structure

**Acceptance Criteria**:
- [ ] `next.config.js` updated with correct i18n configuration
- [ ] App directory restructured with `[lang]` segment as the root
- [ ] All routes accessible via locale-prefixed URLs
- [ ] Default locale redirection working correctly
- [ ] No routing regressions from the restructuring

**Common Pitfalls & Tips**:
- If routing behavior changes unexpectedly, check that all path references are updated
- Test both static and dynamic routes to ensure all work with the locale prefix
- Remember that the locale parameter will be passed to all pages and layouts automatically
- Check that not-found, error, and loading states work correctly with the new structure
- Ensure backward compatibility with any hardcoded links in the application

**Testing Instructions**:
- Navigate to various routes with different locale prefixes and verify they load correctly
- Check that the default locale redirects properly
- Test direct navigation to routes without locale prefix
- Verify dynamic routes work with different locales

**Reference Links**:
- [Next.js Internationalization Documentation](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
- [Next.js Dynamic Segments](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)

**Time Estimate**: 2-3 hours  
**Story Points**: 3  
**Dependencies**: None  
**Status**: TODO

### I18N-02: Translation Dictionary Structure
**Type**: Task  
**Summary**: Create the dictionary structure and initial translation files  
**Description**:
- Set up the translation dictionary structure and create initial JSON translation files for supported languages

**Implementation Details**:
- Follow these steps:
  1. **Set up dictionary directory structure**:
     - Create `app/[lang]/dictionaries` directory
     - Establish organization for translation files

  2. **Create initial translation files**:
     - Create `en.json` with English translations
     - Create `es.json` with Spanish translations
     - Ensure consistent schema across all locale files
     - Organize translations by component/feature area (e.g., common, auth, home)

  3. **Extract existing UI text**:
     - Identify all user-facing text in the application
     - Create translation keys for each text element
     - Organize keys logically by component or feature

**Acceptance Criteria**:
- [ ] Dictionary directory structure created
- [ ] Initial translation files (en.json, es.json) created with consistent schema
- [ ] All existing UI text extracted and organized as translation keys
- [ ] Translations organized by component/feature area
- [ ] Documentation for translation file structure

**Common Pitfalls & Tips**:
- Use a logical naming convention for translation keys (e.g., `component.element.state`)
- Keep translation files organized to make maintenance easier
- Consider using nested objects for better organization of related translations
- Ensure all files have identical structure to avoid missing translations
- Document any special formatting or variable interpolation in translations

**Testing Instructions**:
- Verify that all translation files are valid JSON
- Check that the structure is consistent across all language files
- Ensure all existing UI text has corresponding translation keys

**Reference Links**:
- [JSON Structure Best Practices](https://jsonapi.org/format/)
- [i18n Naming Conventions](https://formatjs.io/docs/getting-started/message-syntax/)

**Time Estimate**: 2-3 hours  
**Story Points**: 3  
**Dependencies**: I18N-01  
**Status**: TODO

### I18N-03: Server-Side Dictionary Loader
**Type**: Task  
**Summary**: Implement the server-side dictionary loader for translations  
**Description**:
- Create a server-side utility to load locale-specific translations and keep them out of the client bundle

**Implementation Details**:
- Follow these steps:
  1. **Create dictionary loader helper**:
     - Create `app/[lang]/dictionaries.ts` with dictionary loading functionality
     - Use `server-only` package to ensure translations stay on the server
     - Implement dynamic imports to load language-specific translations

  2. **Implement getDictionary function**:
     - Create function to load dictionary based on locale parameter
     - Add error handling for missing or invalid locales
     - Ensure type safety for the dictionary structure

  3. **Set up static generation for locales**:
     - Add `generateStaticParams` to the root layout
     - Configure to pre-render all locale variants
     - Update root layout to use the correct HTML lang attribute

**Acceptance Criteria**:
- [ ] Dictionary loader implemented with `server-only` protection
- [ ] `getDictionary` function created with proper error handling
- [ ] Static generation configured for all supported locales
- [ ] HTML lang attribute correctly set based on current locale
- [ ] No translation data included in client JavaScript bundle

**Common Pitfalls & Tips**:
- Make sure to use `server-only` to prevent client-side imports of translations
- Verify that dynamic imports are working correctly for each language file
- Error handling should gracefully fall back to default language if needed
- Check bundle size to confirm translations aren't included in client JS
- Ensure TypeScript types are correctly defined for the dictionary structure

**Testing Instructions**:
- Test importing and using the `getDictionary` function in server components
- Verify that the correct locale dictionary is loaded based on the URL
- Check the HTML source to confirm the lang attribute is set correctly
- Analyze client bundle to ensure translations are not included

**Reference Links**:
- [Next.js Server-Only Modules](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#keeping-server-only-code-out-of-client-components)
- [Dynamic Import in Next.js](https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading)
- [Static Generation with App Router](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#static-rendering-default)

**Time Estimate**: 2-4 hours  
**Story Points**: 4  
**Dependencies**: I18N-02  
**Status**: TODO

### I18N-04: Server Component Translation Integration
**Type**: Task  
**Summary**: Integrate translations into server components  
**Description**:
- Update server components to consume translations from the dictionary loader

**Implementation Details**:
- Follow these steps:
  1. **Update root layout**:
     - Modify root layout to load dictionary
     - Set HTML lang attribute based on current locale
     - Prepare for passing translations to child components

  2. **Update page components**:
     - Modify page components to use translations
     - Load and use dictionary in each server component that needs translations
     - Replace hardcoded text with translation keys

  3. **Create helper patterns**:
     - Establish consistent patterns for using translations in server components
     - Create utility functions if needed for special translation cases

**Acceptance Criteria**:
- [ ] Root layout updated to load dictionary and set lang attribute
- [ ] Page components modified to consume translations
- [ ] All visible text in server components replaced with translation keys
- [ ] Consistent pattern established for translation usage
- [ ] Server components render correctly with different locales

**Common Pitfalls & Tips**:
- Be careful not to accidentally render translation objects on the client
- Check for any text that might be dynamically generated
- Ensure error states and loading states use translations as well
- Test with long translations to verify layout handles them correctly
- Verify that all server components properly access the dictionary

**Testing Instructions**:
- Navigate to different pages with different locales and verify translations appear
- Check that no translation keys are visible to users (indicates missing translation)
- Verify that HTML lang attribute changes correctly with locale
- Test with development tools to confirm server rendering is working as expected

**Reference Links**:
- [Next.js Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Patterns for Accessing Data in Server Components](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns)

**Time Estimate**: 3-5 hours  
**Story Points**: 5  
**Dependencies**: I18N-03  
**Status**: TODO

### I18N-05: Client-Side Translation Context
**Type**: Task  
**Summary**: Implement client-side translation context for interactive components  
**Description**:
- Create a React context and useT() hook for accessing translations in client components

**Implementation Details**:
- Follow these steps:
  1. **Create translation context**:
     - Create `app/lib/i18n-context.tsx` for the React context
     - Implement the I18nContext provider
     - Add TypeScript types for the context structure

  2. **Implement useT() hook**:
     - Create the useT() hook for accessing translations
     - Add dot notation path support for accessing nested translations
     - Implement fallback handling for missing translations

  3. **Set up context provider in layout**:
     - Update layout to provide translations to client components
     - Ensure context is only used where needed to minimize client JS

**Acceptance Criteria**:
- [ ] I18nContext provider implemented with proper TypeScript types
- [ ] useT() hook created with dot notation support
- [ ] Context provider added to layout structure
- [ ] Client components can access translations through the hook
- [ ] Fallback handling implemented for missing translations

**Common Pitfalls & Tips**:
- Keep the client-side translation bundle as small as possible
- Only include translations needed by client components
- Make sure to handle missing translation keys gracefully
- Add type safety to prevent accessing non-existent keys
- Ensure the context is only provided where actually needed

**Testing Instructions**:
- Create a test client component that uses the useT() hook
- Verify translations work correctly in client components
- Test accessing nested translations with dot notation
- Check error handling when accessing missing translations
- Verify that only necessary translations are sent to the client

**Reference Links**:
- [React Context API](https://react.dev/reference/react/createContext)
- [Next.js Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)
- [TypeScript with React Context](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/)

**Time Estimate**: 2-4 hours  
**Story Points**: 4  
**Dependencies**: I18N-04  
**Status**: TODO

### I18N-06: Language Switcher Component
**Type**: Task  
**Summary**: Create a language switcher component for users to change the current locale  
**Description**:
- Build an interactive component that allows users to switch between available languages

**Implementation Details**:
- Follow these steps:
  1. **Create the LocaleSwitcher component**:
     - Create a client component for language switching
     - Use Next.js navigation hooks to manage locale changes
     - Implement UI for language selection (buttons or dropdown)

  2. **Implement path replacement logic**:
     - Add logic to preserve the current path when switching languages
     - Handle special cases for default locale and nested routes
     - Ensure smooth transitions between languages

  3. **Style the component**:
     - Use DaisyUI components for consistent styling
     - Make the switcher responsive and accessible
     - Add visual indicators for the current language

**Acceptance Criteria**:
- [ ] LocaleSwitcher component created as a client component
- [ ] Component displays all available languages
- [ ] Current language is visually indicated
- [ ] Language switching preserves the current path
- [ ] Component is styled consistently with the application
- [ ] Switching languages works without page reload
- [ ] Component is fully accessible

**Common Pitfalls & Tips**:
- Test language switching with complex dynamic routes
- Ensure proper focus management when switching languages
- Add appropriate ARIA attributes for accessibility
- Consider using language names instead of just language codes
- Handle edge cases like invalid routes in the target language

**Testing Instructions**:
- Test switching between languages on different pages
- Verify that the current path is preserved when switching
- Check that the current language is correctly indicated
- Ensure keyboard navigation works for accessibility
- Test with screen readers to verify accessibility

**Reference Links**:
- [Next.js Navigation Hooks](https://nextjs.org/docs/app/api-reference/functions/use-router)
- [DaisyUI Button Groups](https://daisyui.com/components/button/)
- [Web Accessibility Guidelines for Language Selection](https://www.w3.org/WAI/WCAG21/Understanding/language-of-page)

**Time Estimate**: 2-3 hours  
**Story Points**: 3  
**Dependencies**: I18N-05  
**Status**: TODO

### I18N-07: Type Safety Enhancements
**Type**: Task  
**Summary**: Enhance type safety for the translation system  
**Description**:
- Improve TypeScript integration to provide better type safety for translation keys

**Implementation Details**:
- Follow these steps:
  1. **Convert dictionaries to TypeScript**:
     - Convert JSON dictionaries to TypeScript with `as const`
     - Export dictionary types from each language file
     - Create a base type for the dictionary structure

  2. **Implement type derivation**:
     - Create utility types for dictionary structure
     - Implement Jsonify<T> trick or similar for type derivation
     - Ensure translation keys are type-checked

  3. **Type the useT() hook**:
     - Add strong typing to the useT() hook
     - Implement type checking for translation path strings
     - Add autocompletion support for IDE

**Acceptance Criteria**:
- [ ] Dictionary files converted to typed TypeScript
- [ ] Base dictionary type defined and exported
- [ ] Type utilities created for working with translations
- [ ] useT() hook properly typed for autocompletion
- [ ] Type checking prevents accessing invalid translation keys
- [ ] TypeScript compilation errors show for invalid translation paths

**Common Pitfalls & Tips**:
- Balance type strictness with developer experience
- Ensure types don't bloat the client bundle
- Consider separating runtime code from type definitions
- Test with complex nested translation structures
- Verify IDE autocompletion works as expected

**Testing Instructions**:
- Check TypeScript compilation with correct and incorrect translation keys
- Verify that IDE autocompletion works for translation paths
- Test with nested translation objects to ensure type safety
- Confirm that invalid paths generate TypeScript errors

**Reference Links**:
- [TypeScript Const Assertions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions)
- [TypeScript Template Literal Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)
- [Advanced TypeScript Patterns](https://www.typescriptlang.org/docs/handbook/advanced-types.html)

**Time Estimate**: 2-3 hours  
**Story Points**: 3  
**Dependencies**: I18N-05  
**Status**: TODO

### I18N-08: Testing and Validation
**Type**: Task  
**Summary**: Test the i18n implementation across all supported locales  
**Description**:
- Thoroughly test all aspects of the internationalization implementation

**Implementation Details**:
- Follow these steps:
  1. **Test rendering in all locales**:
     - Verify correct rendering in all supported languages
     - Check for missing translations or layout issues
     - Test with long translations that might break layouts

  2. **Test language switching behavior**:
     - Verify smooth transitions between languages
     - Test preservation of state during language changes
     - Check URL structure and routing behavior

  3. **Performance testing**:
     - Verify no client-side performance impact
     - Check bundle sizes for client components
     - Test static generation for all locales

**Acceptance Criteria**:
- [ ] Application renders correctly in all supported languages
- [ ] No missing translations or translation keys visible to users
- [ ] Language switching works seamlessly across all routes
- [ ] State is preserved when switching languages
- [ ] Layout handles long translations without breaking
- [ ] Bundle sizes remain optimized with no unnecessary client JS
- [ ] All pages statically generate for each locale

**Common Pitfalls & Tips**:
- Test with real or realistic translation content, not just placeholders
- Check for overflow issues with longer text in different languages
- Verify that user preferences are respected (e.g., remembering language choice)
- Test with browser language preferences set to different languages
- Check performance metrics before and after implementation

**Testing Instructions**:
- Navigate through the application in each supported language
- Switch languages on various pages and verify correct behavior
- Test with browser dev tools to measure performance
- Check the client bundle size to ensure it remains optimized
- Verify static generation by viewing page source

**Reference Links**:
- [Next.js i18n Testing](https://nextjs.org/docs/app/building-your-application/testing)
- [Web Performance Testing](https://web.dev/measure/)
- [Layout Shift Testing](https://web.dev/cls/)

**Time Estimate**: 3-4 hours  
**Story Points**: 4  
**Dependencies**: I18N-06, I18N-07  
**Status**: TODO

### I18N-09: Documentation
**Type**: Task  
**Summary**: Document the i18n implementation and usage guidelines  
**Description**:
- Create comprehensive documentation for the internationalization system

**Implementation Details**:
- Follow these steps:
  1. **Create implementation guide**:
     - Document overall i18n architecture
     - Explain key design decisions
     - Provide overview of the implementation approach

  2. **Write developer guidelines**:
     - Create guide for adding new translation keys
     - Document process for adding new languages
     - Provide examples of using translations in different contexts

  3. **Add component usage examples**:
     - Document how to use translations in server components
     - Provide examples for client component translation usage
     - Include examples of using the language switcher

**Acceptance Criteria**:
- [ ] Implementation guide documenting the i18n architecture
- [ ] Developer guidelines for working with translations
- [ ] Process documented for adding new languages
- [ ] Usage examples for both server and client components
- [ ] Guidelines for maintaining translation files
- [ ] Documentation added to project wiki or docs folder

**Common Pitfalls & Tips**:
- Include concrete examples for all common use cases
- Document any limitations or edge cases developers should be aware of
- Provide guidelines for translation file organization
- Include workflow for getting professional translations
- Document any performance considerations or best practices

**Testing Instructions**:
- Follow the documentation to add a new translation key
- Use the guide to implement translations in a new component
- Follow the process to add support for a new language
- Verify that all documentation matches the actual implementation

**Reference Links**:
- [i18n Best Practices](https://phrase.com/blog/posts/i18n-best-practices/)
- [Next.js Documentation Guidelines](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
- [Technical Documentation Best Practices](https://www.writethedocs.org/guide/writing/beginners-guide-to-docs/)

**Time Estimate**: 2-3 hours  
**Story Points**: 2  
**Dependencies**: I18N-08  
**Status**: TODO