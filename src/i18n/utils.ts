import { Dictionary } from './config';

/**
 * Creates a translation function that resolves nested translation keys
 * and handles placeholder substitution
 * 
 * @param dictionary The dictionary object containing translations
 * @returns A translation function
 */
export function createTranslationFunction(dictionary: Dictionary) {
  return function t(key: string, placeholders?: Record<string, string>): string {
    // Split the key by dots to access nested properties
    const keys = key.split('.');
    let value: unknown = dictionary;
    
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
} 