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
  redirectTo = "/auth/signin",
}: AuthGuardProps): Promise<React.ReactElement> {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    // Get the current path from headers to use as callback URL
    const headersList = headers();
    const pathname = headersList.get("x-pathname") || "";
    
    const redirectUrl = new URL(redirectTo, "http://localhost");
    
    if (pathname) {
      redirectUrl.searchParams.append("callbackUrl", pathname);
    }
    
    redirect(redirectUrl.pathname + redirectUrl.search);
  }

  return <>{children}</>;
} 