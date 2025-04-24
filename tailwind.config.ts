import type { Config } from 'tailwindcss';
import tailwindForms from '@tailwindcss/forms';
import daisyui from 'daisyui';
import typography from '@tailwindcss/typography';

// Use a more flexible type to include DaisyUI properties
const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],             // 12px
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],         // 14px
        'base': ['1rem', { lineHeight: '1.5rem' }],            // 16px - minimum for body text per accessibility
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],         // 18px
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],          // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],             // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],        // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],          // 36px
        '5xl': ['3rem', { lineHeight: '1' }],                  // 48px
        '6xl': ['3.75rem', { lineHeight: '1' }],               // 60px
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
      },
      borderRadius: {
        'sm': '0.125rem',
        'md': '0.25rem',
        'lg': '0.5rem',
        'xl': '1rem',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [tailwindForms, daisyui, typography],
  daisyui: {
    themes: ["bumblebee", "night"],
    base: true,
    styled: true,
    utils: true,
    themeRoot: "html",
  },
} as Config;

export default config; 