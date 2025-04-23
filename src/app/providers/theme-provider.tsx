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
  // Initialize with the default theme set in the HTML element
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>('bumblebee');
  
  // Initialize theme on first client-side render
  useEffect(() => {
    // Check for stored theme preference
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme - stored preference takes priority over system preference
    const initialTheme = storedTheme || (prefersDark ? 'night' : 'bumblebee');
    
    // Validate theme value before setting
    const validTheme = (
      initialTheme === 'bumblebee' || initialTheme === 'night' 
        ? initialTheme 
        : 'bumblebee'
    ) as Theme;
    
    setTheme(validTheme);
    document.documentElement.setAttribute('data-theme', validTheme);
    setMounted(true);
  }, []);
  
  // Apply theme change (only after the component has mounted)
  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme, mounted]);
  
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