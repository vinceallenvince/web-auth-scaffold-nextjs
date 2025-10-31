'use client';

import { useSession, signIn, signOut } from "next-auth/react";
import type { SignInOptions, SignOutParams } from "next-auth/react";
import { useCallback } from "react";
import type { Session } from "next-auth";

/**
 * Return type for the useAuth hook
 */
interface UseAuthReturn {
  /** Current user session or null if not authenticated */
  session: Session | null;
  /** Authentication status */
  status: "loading" | "authenticated" | "unauthenticated";
  /** Whether authentication state is being determined */
  isLoading: boolean;
  /** Whether user is currently authenticated */
  isAuthenticated: boolean;
  /** Current user's ID if authenticated */
  userId: string | undefined;
  /** Initiate sign-in flow */
  login: (options?: SignInOptions) => Promise<void>;
  /** Sign out the current user */
  logout: (options?: SignOutParams) => Promise<void>;
}

/**
 * Custom hook for handling authentication state and actions
 * 
 * Provides a convenient interface to Auth.js session management with
 * simplified authentication checks and login/logout methods.
 * 
 * @returns Authentication state and methods
 * 
 * @example
 * ```tsx
 * function ProfileButton() {
 *   const { isAuthenticated, isLoading, login, logout, session } = useAuth();
 * 
 *   if (isLoading) return <Spinner />;
 * 
 *   if (!isAuthenticated) {
 *     return <button onClick={() => login()}>Sign In</button>;
 *   }
 * 
 *   return (
 *     <div>
 *       <p>Welcome {session?.user?.email}</p>
 *       <button onClick={() => logout()}>Sign Out</button>
 *     </div>
 *   );
 * }
 * ```
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