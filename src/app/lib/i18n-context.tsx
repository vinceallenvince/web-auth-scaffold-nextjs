"use client";

import React, { createContext, useContext } from "react";

// Define the dictionary structure type based on the existing JSON structure
type Dictionary = {
  common: {
    appTitle: string;
    appDescription: string;
  };
  navigation: {
    skipToContent: string;
    helloWorld: string;
    examples: string;
    buttons: string;
    cards: string;
    typography: string;
    layout: string;
    forms: string;
    toggleTheme: string;
  };
  auth: {
    login: string;
    logout: string;
    signIn: string;
    signInWithMagicLink: string;
    profile: string;
    dashboard: string;
    account: string;
  };
  footer: {
    about: string;
    contact: string;
  };
  home: {
    welcome: string;
    description: string;
    magicLinkAuthTitle: string;
    magicLinkAuthDescription: string;
    modernStackTitle: string;
    modernStackDescription: string;
    readyToUseTitle: string;
    readyToUseDescription: string;
  };
  errors: {
    notFound: string;
    goHome: string;
    somethingWentWrong: string;
  };
  meta: {
    title: string;
    description: string;
  };
};

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

// Type for accessing nested properties using string paths
type DotNotationPath = string;

// Type for nested dictionary values
type NestedDictionaryValue = string | Record<string, unknown>;

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
  
  // Return a function that accepts a dot notation path and returns the translation
  return function t(path: DotNotationPath): string {
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
        return path; // Fallback to the key itself
      }
      
      result = result[segment] as NestedDictionaryValue;
    }
    
    // If the result is not a string, log a warning and return the path
    if (typeof result !== "string") {
      console.warn(`Translation key "${path}" does not resolve to a string.`);
      return path;
    }
    
    return result;
  };
} 