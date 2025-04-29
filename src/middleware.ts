import { NextRequest, NextResponse } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

// List of supported locales
const locales = ['en', 'es'];
const defaultLocale = 'en';

// Get locale from request
function getLocale(request: NextRequest): string {
  // First, try to get locale from cookie
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }
  
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // Use negotiator and intl-localematcher to get best locale
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  
  // If no languages are specified, use default locale
  if (!languages || !languages.length) {
    return defaultLocale;
  }
  
  // Match to supported locales 
  return matchLocale(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
  // Get the pathname from the URL
  const pathname = request.nextUrl.pathname;
  
  // Get locale using the getLocale function
  const locale = getLocale(request);
  
  // Clone the request headers
  const requestHeaders = new Headers(request.headers);
  
  // Add the pathname to the headers
  requestHeaders.set("x-pathname", pathname);

  // Add locale to headers
  requestHeaders.set("x-locale", locale);
  
  // Add protocol information (useful for auth redirects)
  const protocol = request.nextUrl.protocol;
  // Use substring instead of replace for better compatibility with edge runtime
  const protocolValue = protocol.substring(0, protocol.length - 1);
  requestHeaders.set("x-forwarded-proto", protocolValue);
  
  // Create the response
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  
  // If there's no NEXT_LOCALE cookie or it's different from the detected locale,
  // set the cookie for future requests
  const currentCookieLocale = request.cookies?.get('NEXT_LOCALE')?.value;
  if (currentCookieLocale !== locale) {
    // Set the locale cookie with a 1-year expiry
    response.cookies.set('NEXT_LOCALE', locale, { 
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
    });
  }
  
  return response;
}

// Specify which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
}; 