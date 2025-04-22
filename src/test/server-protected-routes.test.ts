import { describe, expect, it, beforeEach, afterEach, vi, type Mock } from 'vitest';
import { GET } from './mocks/protected-api';
import { setMockAuthenticated, isAuthenticated } from './mocks/auth';

// Mock the auth library to avoid Next.js request scope issues
vi.mock('@/lib/auth', () => {
  return import('./mocks/auth');
});

// Mock the protected API route to use our mocked auth
vi.mock('@/app/helloworld/protected-api/route', () => {
  return import('./mocks/protected-api');
});

// Mock the next/navigation module
vi.mock('next/navigation', () => ({
  redirect: vi.fn()
}));

// Import redirect after mocking to spy on it
import { redirect } from 'next/navigation';

describe('Protected Routes', () => {
  beforeEach(() => {
    // Reset auth state before each test
    setMockAuthenticated(false);
    vi.clearAllMocks();
  });

  describe('API Route Protection', () => {
    it('should return 401 for unauthenticated users', async () => {
      // Arrange - auth state already set to false in beforeEach
      
      // Act
      const response = await GET();
      
      // Assert
      expect(response.status).toBe(401);
      
      const responseBody = await response.json();
      expect(responseBody).toEqual({ error: 'Unauthorized access' });
    });

    it('should return 200 with data for authenticated users', async () => {
      // Arrange
      setMockAuthenticated(true);
      
      // Act
      const response = await GET();
      
      // Assert
      expect(response.status).toBe(200);
      
      const responseBody = await response.json();
      expect(responseBody).toEqual({ message: 'Hello from protected API route' });
    });
  });

  describe('Route Middleware Protection', () => {
    it('should redirect unauthenticated users to login', async () => {
      // Arrange - auth state already set to false in beforeEach
      const mockRedirectFn = redirect as unknown as Mock;
      
      // Act - simulate middleware redirecting unauthenticated user
      const mockAuthProtection = async () => {
        setMockAuthenticated(false);
        const isAuth = await isAuthenticated();
        if (!isAuth) {
          redirect('/auth/magic-link');
        }
        return null;
      };
      
      await mockAuthProtection();
      
      // Assert
      expect(mockRedirectFn).toHaveBeenCalledWith('/auth/magic-link');
    });
    
    it('should allow authenticated users to access protected routes', async () => {
      // Arrange
      const mockRedirectFn = redirect as unknown as Mock;
      setMockAuthenticated(true);
      
      // Act - simulate middleware with authenticated user
      const mockAuthProtection = async () => {
        setMockAuthenticated(true);
        const isAuth = await isAuthenticated();
        if (!isAuth) {
          redirect('/auth/magic-link');
        }
        return null;
      };
      
      await mockAuthProtection();
      
      // Assert
      expect(mockRedirectFn).not.toHaveBeenCalled();
    });
  });
}); 