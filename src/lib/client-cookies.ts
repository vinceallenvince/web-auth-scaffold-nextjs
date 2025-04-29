'use client';

/**
 * Re-export cookie utilities from the main cookies.ts file.
 * 
 * This file is maintained for backward compatibility with existing imports.
 * New code should import directly from '@/lib/cookies'.
 */

export { setCookie, getCookie, deleteCookie } from './cookies'; 