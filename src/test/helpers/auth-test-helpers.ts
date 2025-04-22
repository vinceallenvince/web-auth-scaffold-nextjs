import { vi } from 'vitest';
import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

// Create mock functions for Next.js authentication
vi.mock('next-auth', () => ({
  getServerSession: vi.fn(),
}));

vi.mock('next-auth/react', () => ({
  useSession: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

/**
 * User mock data for testing
 */
export const mockUser = {
  id: 'test-user-id',
  name: 'Test User',
  email: 'test@example.com',
  image: null,
  emailVerified: new Date(),
};

/**
 * Mock session data for testing
 */
export const mockSession: Session = {
  user: {
    id: mockUser.id,
    name: mockUser.name,
    email: mockUser.email,
    image: mockUser.image,
  },
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
};

/**
 * Mock JWT data for testing
 */
export const mockJwt: JWT = {
  name: mockUser.name,
  email: mockUser.email,
  picture: mockUser.image,
  sub: mockUser.id,
};

/**
 * Mock the user as authenticated
 */
export function mockAuthenticated() {
  // Mock server-side session
  (getServerSession as any).mockResolvedValue(mockSession);
  
  // Mock client-side session
  (useSession as any).mockReturnValue({
    data: mockSession,
    status: 'authenticated',
    update: vi.fn(),
  });
  
  // Clear any redirect mocks
  (redirect as any).mockClear();
}

/**
 * Mock the user as unauthenticated
 */
export function mockUnauthenticated() {
  // Mock server-side session
  (getServerSession as any).mockResolvedValue(null);
  
  // Mock client-side session
  (useSession as any).mockReturnValue({
    data: null,
    status: 'unauthenticated',
    update: vi.fn(),
  });
}

/**
 * Clear all auth-related mocks
 */
export function clearAuthMocks() {
  (getServerSession as any).mockReset();
  (useSession as any).mockReset();
  (redirect as any).mockReset();
} 