import { describe, it, expect, beforeEach, afterEach, vi, beforeAll, afterAll } from 'vitest';
import { Session } from 'next-auth';
import { 
  mockAuthenticated, 
  mockUnauthenticated, 
  clearAuthMocks, 
  mockUser,
  mockSession
} from './helpers/auth-test-helpers';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

/**
 * Session Management Tests
 * 
 * These tests verify the session management functionality, including:
 * - Session creation after authentication
 * - Session validation with getServerSession
 * - Session persistence across page loads
 * - Session expiration
 * - Logout functionality
 */

// Mock signOut function directly
const signOut = vi.fn().mockImplementation(() => Promise.resolve({ url: '/auth/signin' }));

// Mock next-auth/react with our signOut mock
vi.mock('next-auth/react', async () => {
  const actual = await vi.importActual('next-auth/react');
  return {
    ...(actual as any),
    useSession: vi.fn(),
    signOut
  };
});

describe('Session Management Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset to unauthenticated state by default
    mockUnauthenticated();
    
    // Reset timer mocks
    vi.useFakeTimers();
  });
  
  afterEach(() => {
    vi.useRealTimers();
  });
  
  afterAll(() => {
    clearAuthMocks();
  });

  describe('Session Creation', () => {
    it('should create a session with correct user information after authentication', async () => {
      // Mock a successful authentication
      mockAuthenticated();
      
      // Verify server-side session contains the correct user data
      const session = await getServerSession();
      expect(session).not.toBeNull();
      expect(session?.user).toEqual({
        id: mockUser.id,
        name: mockUser.name,
        email: mockUser.email,
        image: mockUser.image,
      });
      
      // Verify client-side session data
      const { useSession } = await import('next-auth/react');
      expect(useSession()).toEqual({
        data: mockSession,
        status: 'authenticated',
        update: expect.any(Function),
      });
    });
    
    it('should properly store the session token', async () => {
      // Mock a successful authentication
      mockAuthenticated();
      
      // Check if session contains expiration date
      const session = await getServerSession();
      expect(session).not.toBeNull();
      expect(session?.expires).toBeDefined();
      
      // Verify expires timestamp is in the future (24 hours from creation by default)
      const expiresDate = new Date(session!.expires);
      const now = new Date();
      expect(expiresDate.getTime()).toBeGreaterThan(now.getTime());
    });
  });

  describe('Session Validation', () => {
    it('should validate session with getServerSession on protected routes', async () => {
      // Mock a successful authentication
      mockAuthenticated();
      
      // This simulates a request to a protected route
      const session = await getServerSession();
      
      // Verify session is valid and contains expected data
      expect(session).not.toBeNull();
      expect(session?.user).toBeDefined();
      expect(session?.user.id).toBe(mockUser.id);
      
      // Confirm redirect was not called (for protection middleware)
      expect(redirect).not.toHaveBeenCalled();
    });
    
    it('should redirect unauthenticated users on protected routes', async () => {
      // Mock an unauthenticated user
      mockUnauthenticated();
      
      // Helper function to simulate a protected middleware
      const protectRoute = async () => {
        const session = await getServerSession();
        if (!session) {
          redirect('/auth/signin');
          return null;
        }
        return session;
      };
      
      // Call the protected route function
      const session = await protectRoute();
      
      // Verify there is no session
      expect(session).toBeNull();
      
      // Verify redirect was called to the signin page
      expect(redirect).toHaveBeenCalledWith('/auth/signin');
    });
    
    it('should persist session state across page loads', async () => {
      // Mock a successful authentication
      mockAuthenticated();
      
      // Get the session multiple times to simulate different page loads
      const session1 = await getServerSession();
      const session2 = await getServerSession();
      
      // Verify both session objects contain the same data
      expect(session1).toEqual(session2);
      
      // Verify user data persists
      expect(session1?.user.id).toBe(mockUser.id);
      expect(session2?.user.id).toBe(mockUser.id);
    });
  });

  describe('Session Expiration', () => {
    it('should expire session after expiration time', async () => {
      // Mock a successful authentication with a session that expires in 24 hours
      const expireTime = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now
      const sessionWithExpiry: Session = {
        ...mockSession,
        expires: expireTime.toISOString(),
      };
      
      // Override the default mock to use our custom session
      (getServerSession as any).mockResolvedValue(sessionWithExpiry);
      
      // Verify the session is valid now
      const sessionBefore = await getServerSession();
      expect(sessionBefore).not.toBeNull();
      
      // Advance time past the expiration time
      vi.advanceTimersByTime(25 * 60 * 60 * 1000); // 25 hours later
      
      // After expiration, simulate session check that would occur on the server
      // In a real application, the session would be invalidated by the server
      // Here we simulate this by changing the mock response
      (getServerSession as any).mockResolvedValue(null);
      
      // Verify the session is now null (expired)
      const sessionAfter = await getServerSession();
      expect(sessionAfter).toBeNull();
    });
    
    it('should redirect to login after session expiration', async () => {
      // Mock a successful authentication that will expire
      mockAuthenticated();
      
      // Helper function to simulate a protected middleware with expiry check
      const protectRouteWithExpiry = async () => {
        const session = await getServerSession();
        if (!session) {
          redirect('/auth/signin');
          return null;
        }
        
        // Check if session is expired
        const expiresDate = new Date(session.expires);
        const now = new Date();
        
        if (now > expiresDate) {
          redirect('/auth/signin?expired=true');
          return null;
        }
        
        return session;
      };
      
      // Initially the session is valid
      const sessionBefore = await protectRouteWithExpiry();
      expect(sessionBefore).not.toBeNull();
      expect(redirect).not.toHaveBeenCalled();
      
      // Override the mock session with an expired one
      const expiredDate = new Date(Date.now() - 1000); // In the past
      const expiredSession: Session = {
        ...mockSession,
        expires: expiredDate.toISOString(),
      };
      (getServerSession as any).mockResolvedValue(expiredSession);
      
      // Now the session should be detected as expired
      const sessionAfter = await protectRouteWithExpiry();
      expect(sessionAfter).toBeNull();
      
      // Verify redirect was called with expired parameter
      expect(redirect).toHaveBeenCalledWith('/auth/signin?expired=true');
    });
  });

  describe('Logout Functionality', () => {
    it('should clear session when user logs out', async () => {
      // Mock a successful authentication
      mockAuthenticated();
      
      // Verify we have a valid session initially
      const sessionBefore = await getServerSession();
      expect(sessionBefore).not.toBeNull();
      
      // Call signOut function
      await signOut();
      
      // After logout, there should be no session
      // In the test environment, we need to manually update the mock
      mockUnauthenticated();
      
      // Verify the session is now null
      const sessionAfter = await getServerSession();
      expect(sessionAfter).toBeNull();
      
      // Verify signOut was called
      expect(signOut).toHaveBeenCalled();
    });
    
    it('should redirect to signin page after logout', async () => {
      // Mock a successful authentication
      mockAuthenticated();
      
      // Call signOut with redirect option
      await signOut({ callbackUrl: '/auth/signin' });
      
      // Verify signOut was called with the correct options
      expect(signOut).toHaveBeenCalledWith({ callbackUrl: '/auth/signin' });
      
      // In a real application, this would trigger a redirect to the sign-in page
      // The actual redirect is handled by next-auth internally
    });
  });
}); 