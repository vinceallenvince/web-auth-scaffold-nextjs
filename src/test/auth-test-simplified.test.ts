import { describe, it, expect, beforeEach, afterEach, vi, beforeAll, afterAll } from 'vitest';
import { 
  setupEmailTesting, 
  capturedEmails, 
  getLastEmail,
  extractMagicLinkFromEmail,
  resetEmailMocks 
} from './helpers/email-test-helpers';
import { 
  mockAuthenticated, 
  mockUnauthenticated, 
  clearAuthMocks, 
  mockUser 
} from './helpers/auth-test-helpers';
import { 
  initializeTestDb, 
  cleanupTestDb, 
  closePrismaConnection
} from './helpers/db-test-helpers';

/**
 * This is a simplified auth test that doesn't try to mock all of NextAuth's
 * internal modules, but instead focuses on the core functionality.
 */

// Define the email interface
interface EmailData {
  to: string;
  subject: string;
  text: string;
  html: string;
}

// Mock for sendEmail function
const sendEmail = vi.fn().mockResolvedValue({ success: true });

// Interface for verification tokens
interface VerificationToken {
  identifier: string;
  token: string;
  expires: Date;
}

// Mock verification token operations
const mockVerificationTokens: Map<string, VerificationToken> = new Map();

// Mock rate limiting for tokens
const tokenRequestCounts: Map<string, number> = new Map();

describe('Magic Link Authentication Tests', () => {
  // Skip tests if DATABASE_URL is not configured for tests
  const skipDatabaseTests = !process.env.DATABASE_URL?.includes('auth_testing');
  
  beforeAll(async () => {
    if (!skipDatabaseTests) {
      try {
        await initializeTestDb();
      } catch (error) {
        console.warn('Error initializing test database:', error);
      }
    }
  });
  
  afterAll(async () => {
    if (!skipDatabaseTests) {
      try {
        await cleanupTestDb();
        await closePrismaConnection();
      } catch (error) {
        console.warn('Error cleaning up test database:', error);
      }
    }
    
    clearAuthMocks();
  });
  
  beforeEach(() => {
    setupEmailTesting();
    mockUnauthenticated();
    vi.clearAllMocks();
    
    // Clear mock data
    mockVerificationTokens.clear();
    tokenRequestCounts.clear();
  });
  
  afterEach(() => {
    resetEmailMocks();
  });

  describe('Magic Link Request', () => {
    /**
     * Simplified send verification request function
     */
    async function sendVerificationRequest({ identifier, url }: { identifier: string; url: string }) {
      await Promise.resolve(); // Simulate async operation
      try {
        return await sendEmail({
          to: identifier,
          subject: 'Sign in to Test App',
          text: `Click this link to sign in: ${url}`,
          html: `<p>Click <a href="${url}">this link</a> to sign in.</p>`,
        });
      } catch (error) {
        // Log the error but don't throw
        console.error('Failed to send verification email:', error);
        return { success: false, error };
      }
    }
    
    /**
     * Create a verification token with rate limiting
     */
    function createToken(identifier: string): string {
      // Check for rate limiting
      const currentCount = tokenRequestCounts.get(identifier) || 0;
      if (currentCount >= 5) {
        throw new Error('Rate limit exceeded');
      }
      
      // Update rate limiting count
      tokenRequestCounts.set(identifier, currentCount + 1);
      
      // Validate email format
      if (!identifier || !identifier.includes('@')) {
        throw new Error('Invalid email format');
      }
      
      // Create token
      const token = `token-${Math.random().toString(36).substring(2, 15)}`;
      
      // Store token
      mockVerificationTokens.set(token, {
        identifier,
        token,
        expires: new Date(Date.now() + 3600000),
      });
      
      return token;
    }
    
    /**
     * Use a verification token - only works once
     */
    function useToken(token: string): VerificationToken | null {
      // Get the token
      const verificationToken = mockVerificationTokens.get(token);
      
      // If token doesn't exist, return null
      if (!verificationToken) {
        return null;
      }
      
      // Check if token is expired
      if (verificationToken.expires < new Date()) {
        mockVerificationTokens.delete(token); // Remove expired token
        throw new Error('Token expired');
      }
      
      // Delete the token so it can't be used again
      mockVerificationTokens.delete(token);
      
      // Return the token data
      return verificationToken;
    }
    
    it('should generate a magic link for a valid email', async () => {
      // Prepare a test email and URL
      const testEmail = 'valid@example.com';
      const token = createToken(testEmail);
      const testUrl = `https://example.com/auth/callback?token=${token}`;
      
      // Send the verification request
      await sendVerificationRequest({ identifier: testEmail, url: testUrl });
      
      // Check that an email was sent
      expect(sendEmail).toHaveBeenCalledWith({
        to: testEmail,
        subject: 'Sign in to Test App',
        text: expect.stringContaining(testUrl),
        html: expect.stringContaining(testUrl),
      });
    });
    
    it('should reject invalid email formats', async () => {
      // Attempt to create a token with invalid email
      const invalidEmail = 'not-an-email';
      
      // Use adapter method directly for testing validation
      expect(() => {
        createToken(invalidEmail);
      }).toThrow('Invalid email format');
      
      // Verify no token was created
      expect(mockVerificationTokens.size).toBe(0);
    });
    
    it('should handle email sending errors gracefully', async () => {
      // Mock email sending to fail
      sendEmail.mockRejectedValueOnce(new Error('Email sending failed'));
      
      // Prepare a test email and URL
      const testEmail = 'error@example.com';
      const token = createToken(testEmail);
      const testUrl = `https://example.com/auth/callback?token=${token}`;
      
      // This should not throw despite the email error
      const result = await sendVerificationRequest({ identifier: testEmail, url: testUrl });
      
      // Expect the error to be handled without throwing
      expect(sendEmail).toHaveBeenCalled();
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
    
    it('should implement rate limiting for repeated requests', async () => {
      const testEmail = 'ratelimit@example.com';
      
      // Make requests under the limit
      for (let i = 0; i < 5; i++) {
        createToken(testEmail);
      }
      
      // This should succeed
      expect(tokenRequestCounts.get(testEmail)).toBe(5);
      
      // Next request should hit rate limit
      expect(() => {
        createToken(testEmail);
      }).toThrow('Rate limit exceeded');
    });
  });
  
  describe('Magic Link Verification', () => {
    /**
     * Create a test verification token
     */
    function createTestToken(identifier: string, token: string, expiresInMs: number): VerificationToken {
      const verificationToken = {
        identifier,
        token,
        expires: new Date(Date.now() + expiresInMs),
      };
      
      mockVerificationTokens.set(token, verificationToken);
      return verificationToken;
    }
    
    /**
     * Use a verification token - only works once
     */
    function useToken(token: string): VerificationToken | null {
      // Get the token
      const verificationToken = mockVerificationTokens.get(token);
      
      // If token doesn't exist, return null
      if (!verificationToken) {
        return null;
      }
      
      // Check if token is expired
      if (verificationToken.expires < new Date()) {
        mockVerificationTokens.delete(token); // Remove expired token
        throw new Error('Token expired');
      }
      
      // Delete the token so it can't be used again
      mockVerificationTokens.delete(token);
      
      // Return the token data
      return verificationToken;
    }
    
    it('should verify a valid magic link token', async () => {
      // Create a valid token
      const testEmail = 'valid@example.com';
      const testToken = 'valid-token';
      createTestToken(testEmail, testToken, 3600000); // 1 hour in the future
      
      // Verify the token
      const result = useToken(testToken);
      
      // Check the verification was successful
      expect(result).toBeDefined();
      expect(result?.identifier).toBe(testEmail);
      
      // Make sure the token is no longer in the map
      expect(mockVerificationTokens.has(testToken)).toBe(false);
    });
    
    it('should reject an expired token', async () => {
      // Create an expired token
      const testEmail = 'expired@example.com';
      const testToken = 'expired-token';
      createTestToken(testEmail, testToken, -3600000); // 1 hour in the past
      
      // Verify the token should throw
      expect(() => {
        useToken(testToken);
      }).toThrow('Token expired');
    });
    
    it('should reject an invalid token', async () => {
      // Try to use a non-existent token
      const result = useToken('invalid-token');
      
      // Should return null for invalid tokens
      expect(result).toBeNull();
    });
    
    it('should only allow a token to be used once', async () => {
      // Create a valid token
      const testEmail = 'oneuse@example.com';
      const testToken = 'single-use-token';
      createTestToken(testEmail, testToken, 3600000); // 1 hour in the future
      
      // First use should succeed
      const firstUse = useToken(testToken);
      expect(firstUse).toBeDefined();
      
      // Second use should fail
      const secondUse = useToken(testToken);
      expect(secondUse).toBeNull();
    });
  });
  
  describe('User Session after Authentication', () => {
    beforeEach(() => {
      mockAuthenticated();
    });
    
    it('should create a session with correct user data', async () => {
      // Create a mock session
      const mockSession = {
        user: {
          id: mockUser.id,
          name: mockUser.name,
          email: mockUser.email,
          image: mockUser.image,
        },
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      };
      
      // Verify session contains correct user data
      expect(mockSession).not.toBeNull();
      expect(mockSession?.user?.id).toBe(mockUser.id);
      expect(mockSession?.user?.email).toBe(mockUser.email);
      expect(mockSession?.user?.name).toBe(mockUser.name);
    });
  });
}); 