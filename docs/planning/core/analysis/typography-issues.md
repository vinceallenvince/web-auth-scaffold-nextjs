# Typography Issues

## Overview

This document outlines the challenges with typography in the current build of the app.

## Identified Issues

### 1. Font Loading and Variable Usage

- **Font Variable Inconsistency**: The `var(--font-sans)` and `var(--font-mono)` variables are defined inconsistently between CSS and the React components. The layout component is adding font CSS variables with `${geistSans.variable}` class, but these may not be properly processed during build.

- **Font Display Strategy**: No `font-display` strategy is explicitly defined, which may cause text to be invisible during font loading (FOUT - Flash of Unstyled Text).

- **CSS Variable Nesting**: In `globals.css`, there's a potential circular reference:
  ```css
  --font-sans: var(--font-sans, system-ui, sans-serif);
  ```
  This could cause issues in the production build if the variable references itself.

### 2. Build Process Issues

- **CSS Processing Order**: The build process may be processing the CSS in an order that doesn't properly resolve the font variables before they're used.

- **Font Optimization**: Next.js font optimization may be improperly applying certain optimizations in the production build, causing variables to be processed differently.

- **Missing Fallbacks**: While fallbacks are specified in tailwind config, they may not be properly applied in the production build.

### 3. CSS Specificity and Cascade Problems

- **Tailwind Utility Conflicts**: Tailwind utilities might be overriding our custom font variables in certain contexts.

- **Style Loading Order**: The order of CSS loading in production might differ from development, affecting how font styles are applied.

- **CSS Variable Scope**: CSS variables defined at the `:root` may be getting overridden or not properly inherited in nested components.

## Testing and Reproduction

### Development vs Production

- Typography renders correctly in development mode (`npm run dev`)
- Typography fails to render properly after production build (`npm run build && npm start`)

### Impact Areas

- Headings (H1-H6): Font weight and possibly font family issues
- Body text: Potentially defaulting to system fonts instead of the specified Geist Sans
- Code blocks: Mono font may not be loading correctly

## Potential Solutions

### Short-term Fixes

1. **Simplify CSS Variable Usage**:
   ```css
   /* Replace circular references */
   --font-sans: system-ui, sans-serif;
   ```

2. **Add Explicit Font Display**:
   ```javascript
   // In layout.tsx
   const geistSans = Geist({
     variable: "--font-sans",
     subsets: ["latin"],
     display: 'swap', // Add this line
   });
   ```

3. **Ensure fallback fonts are explicitly included** in all component styles to prevent invisible text.

### Long-term Solutions

1. **Refactor Font Loading Strategy**:
   - Implement a font loading API with proper detection of font load completion
   - Consider a font loading strategy using `FontFace.load()` for better control

2. **Build Process Improvements**:
   - Add custom PostCSS plugin to ensure font variables are processed correctly
   - Implement explicit font preloading in document head

3. **Comprehensive Testing**:
   - Add visual regression tests to detect font rendering issues
   - Create a specific testing flow for typography across various build environments

## Next Steps

1. Implement short-term fix #2 (explicit font display) to address immediate issues
2. Create specific test cases to isolate and reproduce the font rendering issue
3. Review Next.js documentation for any recent changes to font optimization
4. Consult with the UI/UX team to establish acceptable fallback rendering

## References

- [Next.js Font Optimization Docs](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts)
- [CSS Font Loading API](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Font_Loading_API)
- [Web Font Loading Best Practices](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/webfont-optimization)