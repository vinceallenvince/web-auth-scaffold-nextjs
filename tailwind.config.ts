import type { Config } from 'tailwindcss';

// Use a more flexible type to include DaisyUI properties
const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Add custom colors here
      },
      fontFamily: {
        // Add custom fonts here
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('daisyui')],
  daisyui: {
    themes: ["bumblebee", "light", "dark"],
    base: true,
    styled: true,
    utils: true,
    themeRoot: "html",
  },
} as Config;

export default config; 