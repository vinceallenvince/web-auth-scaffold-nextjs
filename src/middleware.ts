import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Get the pathname from the URL
  const pathname = request.nextUrl.pathname;
  
  // Clone the request headers
  const requestHeaders = new Headers(request.headers);
  
  // Add the pathname to the headers
  requestHeaders.set("x-pathname", pathname);
  
  // Add protocol information (useful for auth redirects)
  const protocol = request.nextUrl.protocol.replace(':', '');
  requestHeaders.set("x-forwarded-proto", protocol);
  
  // Return the response with the modified headers
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
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