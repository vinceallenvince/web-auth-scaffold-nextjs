import { vi } from 'vitest';
import { sendEmail, isResendConfigured } from '@/lib/email';

// Mock email service
vi.mock('@/lib/email', async () => {
  return {
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
  (sendEmail as any).mockImplementation(async (email: any) => {
    capturedEmails.push({
      to: typeof email.to === 'string' ? email.to : email.to[0],
      subject: email.subject || '',
      text: email.text || '',
      html: email.html || '',
    });
    
    return { success: true };
  });
  
  // Ensure isResendConfigured returns false in tests
  (isResendConfigured as any).mockReturnValue(false);
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
  (sendEmail as any).mockReset();
  (isResendConfigured as any).mockReset();
  capturedEmails.length = 0;
} 