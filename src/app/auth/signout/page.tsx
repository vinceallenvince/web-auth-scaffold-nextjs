'use client';

import { useAuth } from "@/lib/hooks/use-auth";
import { useEffect } from "react";
import Link from "next/link";

export default function SignOutPage() {
  const { logout, isAuthenticated, isLoading } = useAuth();

  // Automatically sign out when this page is loaded
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      logout({ callbackUrl: '/' });
    }
  }, [isAuthenticated, isLoading, logout]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <div>
          <h1 className="text-2xl font-bold">Signing out...</h1>
          <p className="mt-2 text-sm text-gray-600">
            Please wait while we sign you out.
          </p>
        </div>
        
        <div className="mt-8">
          <div className="rounded-md bg-blue-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L10 9.586 7.707 7.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3 flex-1 md:flex md:justify-between">
                <p className="text-sm text-blue-700">
                  You will be redirected to the home page automatically.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <p className="text-sm text-gray-600">
            If you're not redirected,{" "}
            <Link href="/" className="font-medium text-blue-600 hover:text-blue-500">
              click here to go back home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 