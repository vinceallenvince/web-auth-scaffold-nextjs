'use client';

import { useAuth } from "@/lib/hooks/use-auth";
import React from "react";

export function AuthStatus(): React.ReactElement {
  const { isAuthenticated, isLoading, session, login, logout } = useAuth();

  if (isLoading) {
    return <div className="text-sm">Loading authentication status...</div>;
  }

  return (
    <div className="flex flex-col space-y-2 p-4 border rounded-md">
      <h2 className="text-lg font-semibold">Authentication Status</h2>
      
      {isAuthenticated ? (
        <>
          <p className="text-sm">
            Signed in as <span className="font-medium">{session?.user?.email}</span>
          </p>
          <button
            onClick={() => logout()}
            className="px-4 py-2 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            aria-label="Sign out"
          >
            Sign out
          </button>
        </>
      ) : (
        <>
          <p className="text-sm">You are not signed in</p>
          <button
            onClick={() => login()}
            className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Sign in"
          >
            Sign in
          </button>
        </>
      )}
    </div>
  );
} 