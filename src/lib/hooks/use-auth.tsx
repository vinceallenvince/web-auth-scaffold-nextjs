'use client';

import { useSession, signIn, signOut } from "next-auth/react";
import type { SignInOptions, SignOutParams } from "next-auth/react";
import { useCallback } from "react";
import type { Session } from "next-auth";

interface UseAuthReturn {
  session: Session | null;
  status: "loading" | "authenticated" | "unauthenticated";
  isLoading: boolean;
  isAuthenticated: boolean;
  userId: string | undefined;
  login: (options?: SignInOptions) => Promise<void>;
  logout: (options?: SignOutParams) => Promise<void>;
}

/**
 * Custom hook for handling authentication state and actions
 * Wraps next-auth's useSession with more convenient methods
 */
export function useAuth(): UseAuthReturn {
  const { data: session, status } = useSession();
  
  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";
  const userId = session?.user?.id;
  
  const login = useCallback(async (options?: SignInOptions) => {
    await signIn(undefined, options);
  }, []);
  
  const logout = useCallback(async (options?: SignOutParams) => {
    await signOut(options);
  }, []);
  
  return {
    session,
    status,
    isLoading,
    isAuthenticated,
    userId,
    login,
    logout
  };
} 