import { NextRequest, NextResponse } from "next/server";

const locales = ['en', 'es'];
const defaultLocale = 'en';

export function middleware(request: NextRequest) {
  // Get the pathname from the URL
  const pathname = request.nextUrl.pathname;
  
  // Check if the pathname already has a locale prefix
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // Clone the request headers
  const requestHeaders = new Headers(request.headers);
  
  // Add the pathname to the headers
  requestHeaders.set("x-pathname", pathname);
  
  // Add protocol information (useful for auth redirects)
  const protocol = request.nextUrl.protocol;
  // Use substring instead of replace for better compatibility with edge runtime
  const protocolValue = protocol.substring(0, protocol.length - 1);
  requestHeaders.set("x-forwarded-proto", protocolValue);
  
  // If the pathname doesn't have a locale prefix, redirect to the default locale
  if (!pathnameHasLocale) {
    // Check if request.url is defined to prevent TypeError
    if (!request.url) {
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }
    // Create a URL object from the request URL
    const url = new URL(request.url);

    // Set the pathname to include the default locale while preserving the query parameters
    url.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`;
    
    // Return a redirect response
    return NextResponse.redirect(url);
  }
  
  // Extract the locale from the pathname
  const locale = pathnameHasLocale ? pathname.split('/')[1] : defaultLocale;
  
  // Add the locale to the headers
  requestHeaders.set("x-locale", locale);
  
  // Get response
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  
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