# Translation Dictionary Structure

This directory contains the translation files for the application. Each file corresponds to a supported locale. The translations are organized by component/feature area to make maintenance easier.

For a complete understanding of our i18n approach, please refer to:
- [I18N Implementation Tasks](/docs/planning/core/tasks/impl-tasks06-i18n.md) - Detailed task breakdown of the i18n implementation
- [I18N Rules](/.cursor/rules/i18n-rules.mdc) - Formal rules for working with translations
- [Next.js Structure Rules](/.cursor/rules/next-structure.mdc) - Next.js app structure with i18n considerations

## File Structure

- `en.json`: English translations
- `es.json`: Spanish translations

## Translation Organization

The translations are organized in the following structure:

```jsonc
{
  "common": {
    // Common translations used throughout the app
  },
  "navigation": {
    // Navigation-related translations (navbar, sidebar, etc.)
  },
  "auth": {
    // Authentication-related translations
  },
  "footer": {
    // Footer-related translations
  },
  "home": {
    // Home page translations
  },
  "errors": {
    // Error messages translations
  },
  "meta": {
    // Metadata translations (page titles, descriptions)
  }
}
```

## Adding New Translations

1. Identify the component/feature area where the translation belongs
2. Add the translation key to all language files to maintain consistency
3. Use a logical naming convention for translation keys (e.g., `component.element.state`)

## String Formatting

Some translations may include HTML tags or placeholders:

1. HTML tags: Use string with HTML markup (e.g., `"welcome": "Welcome to <span>Next.js Auth Scaffold</span>"`)
2. Placeholders: Use curly braces for variable substitution (e.g., `"greeting": "Hello, {username}!"`)

## Adding New Languages

To add a new language:

1. Create a new JSON file named with the language code (e.g., `fr.json` for French)
2. Copy the structure from an existing language file (e.g., `en.json`)
3. Translate all values while keeping the keys the same
4. Add the new language code to the `locales` array in `src/constants/i18n.ts` 