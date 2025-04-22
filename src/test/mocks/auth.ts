import { Session } from "next-auth";
import { vi } from "vitest";

// Store the mock state
let mockIsAuthenticated = false;
let mockSession: Session | null = null;

// Mock the authentication functions
export async function getSession(): Promise<Session | null> {
  return mockSession;
}

export async function isAuthenticated(): Promise<boolean> {
  return mockIsAuthenticated;
}

export async function getCurrentUserId(): Promise<string | null> {
  return mockSession?.user?.id || null;
}

// Helper functions to control the mock state in tests
export function setMockAuthenticated(authenticated: boolean): void {
  mockIsAuthenticated = authenticated;
}

export function setMockSession(session: Session | null): void {
  mockSession = session;
}

// Create spy functions for tests
export const getSessionSpy = vi.fn(getSession);
export const isAuthenticatedSpy = vi.fn(isAuthenticated);
export const getCurrentUserIdSpy = vi.fn(getCurrentUserId); 