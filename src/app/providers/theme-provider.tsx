"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'bumblebee' | 'night';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('bumblebee');
  
  // Initialize theme on first client-side render
  useEffect(() => {
    // Check for stored theme preference
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme - stored preference takes priority over system preference
    const initialTheme = storedTheme || (prefersDark ? 'night' : 'bumblebee');
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);
  
  // Apply theme change
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  // Toggle between light and dark
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'bumblebee' ? 'night' : 'bumblebee');
  };
  
  // Context value
  const contextValue: ThemeContextType = {
    theme,
    setTheme,
    toggleTheme
  };
  
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use the theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 