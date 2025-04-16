import { getServerSession } from "next-auth";
import type { Session } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

/**
 * Helper function to get the current session in server components and API routes
 * @returns The current session or null if not authenticated
 */
export async function getSession(): Promise<Session | null> {
  return await getServerSession(authOptions);
}

/**
 * Helper function to check if a user is authenticated in server components and API routes
 * @returns Boolean indicating if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return !!session?.user;
}

/**
 * Helper function to get the current user ID from session
 * @returns The current user ID or null if not authenticated
 */
export async function getCurrentUserId(): Promise<string | null> {
  const session = await getSession();
  return session?.user?.id || null;
} 