/**
 * Authentication Component Exports
 * 
 * This file exports shared authentication-related components that can be used
 * across different parts of the application. These components handle various
 * aspects of the authentication flow, including guards, status indicators,
 * and visual elements for auth-related pages.
 * 
 * Organization Strategy:
 * - All shared auth components are centralized here for consistency
 * - Route-specific auth components remain in their respective route folders
 * - Components follow the Auth.js (NextAuth) patterns for session management
 * - Components are exported individually to allow for tree-shaking
 */

export { default as AuthHero } from './AuthHero'; 