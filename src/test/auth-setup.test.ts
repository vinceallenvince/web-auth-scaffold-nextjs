import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import { mockAuthenticated, mockUnauthenticated, clearAuthMocks } from './helpers/auth-test-helpers';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

// This test suite verifies that the basic auth testing infrastructure works correctly
describe('Authentication Test Setup', () => {
  // Clean up mocks after all tests
  afterAll(() => {
    clearAuthMocks();
  });

  describe('Mock Authenticated', () => {
    beforeAll(() => {
      mockAuthenticated();
    });

    it('should mock server session properly', async () => {
      const session = await getServerSession();
      expect(session).not.toBeNull();
      expect(session?.user?.id).toBe('test-user-id');
      expect(session?.user?.email).toBe('test@example.com');
    });

    it('should mock client session properly', () => {
      const { data, status } = useSession();
      expect(status).toBe('authenticated');
      expect(data).not.toBeNull();
      expect(data?.user?.email).toBe('test@example.com');
    });
  });

  describe('Mock Unauthenticated', () => {
    beforeAll(() => {
      mockUnauthenticated();
    });

    it('should mock server session as null', async () => {
      const session = await getServerSession();
      expect(session).toBeNull();
    });

    it('should mock client session as unauthenticated', () => {
      const { data, status } = useSession();
      expect(status).toBe('unauthenticated');
      expect(data).toBeNull();
    });
  });

  describe('Redirect Functionality', () => {
    beforeAll(() => {
      mockUnauthenticated();
      vi.mocked(redirect).mockImplementation(() => {
        throw new Error('Redirect');
      });
    });

    it('should allow testing redirect behavior', () => {
      expect(() => redirect('/auth/magic-link')).toThrow('Redirect');
      expect(redirect).toHaveBeenCalledWith('/auth/magic-link');
    });
  });
}); 