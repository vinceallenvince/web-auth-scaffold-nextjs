import { isAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import React from "react";

interface AuthGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
}

/**
 * Server component that protects routes by checking authentication status
 * Redirects unauthenticated users to the specified path or signin page
 */
export async function AuthGuard({
  children,
  redirectTo = "/auth/magic-link",
}: AuthGuardProps): Promise<React.ReactElement> {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    // Get the current path from headers to use as callback URL
    const headersList = await headers();
    const pathname = headersList.get("x-pathname") || "";
    
    // We can safely use URLSearchParams without needing an absolute URL
    // First, separate the path from any existing query string
    const [path, existingQuery] = redirectTo.split('?');
    const searchParams = new URLSearchParams(existingQuery || '');
    
    // Add the callback URL as a query parameter if available
    if (pathname && pathname.length > 0) {
      searchParams.set("callbackUrl", pathname);
    }
    
    // Reconstruct the final redirect path
    const queryString = searchParams.toString();
    const finalRedirectPath = queryString 
      ? `${path}?${queryString}` 
      : path;
    
    redirect(finalRedirectPath);
  }

  return <>{children}</>;
} 