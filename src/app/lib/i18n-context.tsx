"use client";

import React, { createContext, useContext, useMemo } from "react";
import type { Dictionary, DotNotationPath, NestedDictionaryValue } from "@/types/i18n.types";

// Type for the i18n context value
type I18nContextType = {
  dictionary: Dictionary;
};

// Create the context with a default empty value
// The actual value will be provided by the I18nProvider
const I18nContext = createContext<I18nContextType | null>(null);

// Props for the I18nProvider component
type I18nProviderProps = {
  dictionary: Dictionary;
  children: React.ReactNode;
};

// Provider component that wraps client components needing translations
export function I18nProvider({ dictionary, children }: I18nProviderProps) {
  return (
    <I18nContext.Provider value={{ dictionary }}>
      {children}
    </I18nContext.Provider>
  );
}

// useT hook for accessing translations with dot notation
export function useT() {
  // Get the context value
  const context = useContext(I18nContext);
  
  // If the context is null, throw an error
  if (!context) {
    throw new Error(
      "useT must be used within an I18nProvider. Make sure you have wrapped your component tree with I18nProvider."
    );
  }

  // Cache for previously resolved translations
  const translationCache = useMemo(() => new Map<string, string>(), []);
  
  // Return a function that accepts a dot notation path and returns the translation
  return function t(path: DotNotationPath): string {
    // Check cache first
    if (translationCache.has(path)) {
      return translationCache.get(path)!;
    }
    
    const { dictionary } = context;
    
    // Split the path into segments
    const segments = path.split(".");
    
    // Traverse the dictionary object using the segments
    let result: NestedDictionaryValue = dictionary;
    
    for (const segment of segments) {
      // If the result is not an object or doesn't have the property, return the path as fallback
      if (
        typeof result !== "object" || 
        result === null || 
        !Object.prototype.hasOwnProperty.call(result, segment)
      ) {
        console.warn(`Translation key "${path}" not found in dictionary.`);
        translationCache.set(path, path); // Cache the fallback
        return path; // Fallback to the key itself
      }
      
      result = result[segment] as NestedDictionaryValue;
    }
    
    // If the result is not a string, log a warning and return the path
    if (typeof result !== "string") {
      console.warn(`Translation key "${path}" does not resolve to a string.`);
      translationCache.set(path, path); // Cache the fallback
      return path;
    }
    
    // Cache the successful result
    translationCache.set(path, result);
    return result;
  };
} 