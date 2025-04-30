/**
 * Navigation component exports
 * Note: Keep server components in separate imports to avoid "server-only" errors
 */

// Client components (safe to import in client components)
export { SkipToContent } from "./SkipToContent";
export { Sidebar } from "./Sidebar";

// Type exports (safe for both client and server components)
export type { NavigationTranslations } from "./types"; 