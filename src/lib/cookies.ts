'use client';

/**
 * Cookie management utilities that work in both client and server contexts
 */

type CookieOptions = {
  maxAge?: number;
  expires?: Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
};

/**
 * Set a cookie in the browser
 * 
 * @param name Cookie name
 * @param value Cookie value
 * @param options Cookie options
 */
export function setCookie(name: string, value: string, options: CookieOptions = {}): void {
  // Skip if not in browser environment
  if (typeof document === 'undefined') {
    return;
  }
  
  const cookieString = `${name}=${encodeURIComponent(value)}`;
  
  const optionStrings: string[] = [];
  
  if (options.maxAge) {
    optionStrings.push(`max-age=${options.maxAge}`);
  }
  
  if (options.expires) {
    optionStrings.push(`expires=${options.expires.toUTCString()}`);
  }
  
  if (options.path) {
    optionStrings.push(`path=${options.path}`);
  } else {
    // Default to root path
    optionStrings.push('path=/');
  }
  
  if (options.domain) {
    optionStrings.push(`domain=${options.domain}`);
  }
  
  if (options.secure) {
    optionStrings.push('secure');
  }
  
  if (options.sameSite) {
    optionStrings.push(`samesite=${options.sameSite}`);
  }
  
  const cookieWithOptions = [cookieString, ...optionStrings].join('; ');
  
  document.cookie = cookieWithOptions;
}

/**
 * Get a cookie value from the browser
 * 
 * @param name Cookie name
 * @returns Cookie value or undefined if not found
 */
export function getCookie(name: string): string | undefined {
  // Skip if not in browser environment
  if (typeof document === 'undefined') {
    return undefined;
  }
  
  const cookies = document.cookie.split('; ');
  const cookie = cookies.find(c => c.startsWith(`${name}=`));
  
  if (!cookie) {
    return undefined;
  }
  
  return decodeURIComponent(cookie.split('=')[1]);
}

/**
 * Delete a cookie in the browser
 * 
 * @param name Cookie name
 * @param options Cookie options (except maxAge and expires)
 */
export function deleteCookie(name: string, options: Omit<CookieOptions, 'maxAge' | 'expires'> = {}): void {
  // Skip if not in browser environment
  if (typeof document === 'undefined') {
    return;
  }
  
  // To delete a cookie, set its expiration date to the past
  setCookie(name, '', {
    ...options,
    expires: new Date(0),
  });
} 