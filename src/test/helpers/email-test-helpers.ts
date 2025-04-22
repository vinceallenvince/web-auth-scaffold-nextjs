import { vi } from 'vitest';
import { sendEmail, isResendConfigured } from '@/lib/email';

// Mock email service
vi.mock('@/lib/email', async () => {
  const actual = await vi.importActual('@/lib/email');
  return {
    ...actual,
    sendEmail: vi.fn(),
    isResendConfigured: vi.fn().mockReturnValue(false),
  };
});

/**
 * Interface for a captured email
 */
export interface CapturedEmail {
  to: string;
  subject: string;
  text: string;
  html: string;
}

/**
 * Array to store captured emails during testing
 */
export const capturedEmails: CapturedEmail[] = [];

/**
 * Set up the email testing environment
 */
export function setupEmailTesting() {
  // Clear any previously captured emails
  capturedEmails.length = 0;
  
  // Mock sendEmail to capture emails
  vi.mocked(sendEmail).mockImplementation(async (email) => {
    capturedEmails.push({
      to: typeof email.to === 'string' ? email.to : email.to[0],
      subject: email.subject || '',
      text: email.text || '',
      html: email.html || '',
    });
    
    return { success: true };
  });
  
  // Ensure isResendConfigured returns false in tests
  vi.mocked(isResendConfigured).mockReturnValue(false);
}

/**
 * Get the most recently sent email
 */
export function getLastEmail(): CapturedEmail | undefined {
  return capturedEmails.length > 0 
    ? capturedEmails[capturedEmails.length - 1] 
    : undefined;
}

/**
 * Extract magic link URL from plain text email content
 */
export function extractMagicLinkFromEmail(emailText: string): string | null {
  // This regex pattern looks for a URL containing 'token='
  const matches = emailText.match(/https?:\/\/[^\s]+token=[^\s]+/);
  return matches ? matches[0] : null;
}

/**
 * Reset email testing mocks
 */
export function resetEmailMocks() {
  vi.mocked(sendEmail).mockReset();
  vi.mocked(isResendConfigured).mockReset();
  capturedEmails.length = 0;
} 