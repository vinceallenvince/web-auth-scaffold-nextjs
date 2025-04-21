import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { 
  setupEmailTesting, 
  capturedEmails, 
  getLastEmail,
  extractMagicLinkFromEmail,
  resetEmailMocks 
} from './helpers/email-test-helpers';
import { sendEmail, isResendConfigured } from '@/lib/email';

describe('Email Test Setup', () => {
  // Set up email testing before each test
  beforeEach(() => {
    setupEmailTesting();
  });

  // Clean up after each test
  afterEach(() => {
    resetEmailMocks();
  });

  it('should capture sent emails', async () => {
    // Send a test email
    await sendEmail({
      to: 'test@example.com',
      subject: 'Test Email',
      text: 'This is a test email',
      html: '<p>This is a test email</p>',
    });

    // Check that the email was captured
    expect(capturedEmails.length).toBe(1);
    
    const email = capturedEmails[0];
    expect(email.to).toBe('test@example.com');
    expect(email.subject).toBe('Test Email');
    expect(email.text).toBe('This is a test email');
    expect(email.html).toBe('<p>This is a test email</p>');
  });

  it('should retrieve the last sent email', async () => {
    // Send two test emails
    await sendEmail({
      to: 'test1@example.com',
      subject: 'Test Email 1',
      text: 'This is test email 1',
      html: '<p>This is test email 1</p>',
    });

    await sendEmail({
      to: 'test2@example.com',
      subject: 'Test Email 2',
      text: 'This is test email 2',
      html: '<p>This is test email 2</p>',
    });

    // Get the last email
    const lastEmail = getLastEmail();
    
    // Check that it's the second email
    expect(lastEmail).not.toBeUndefined();
    expect(lastEmail?.to).toBe('test2@example.com');
    expect(lastEmail?.subject).toBe('Test Email 2');
  });

  it('should extract magic link from email text', () => {
    // Create email text with a magic link
    const emailText = `
      Hello,
      
      Please click the link below to sign in:
      https://example.com/auth/verify?token=abc123def456
      
      This link will expire in 24 hours.
    `;

    // Extract the magic link
    const magicLink = extractMagicLinkFromEmail(emailText);
    
    // Check that the link was extracted correctly
    expect(magicLink).toBe('https://example.com/auth/verify?token=abc123def456');
  });

  it('should mock isResendConfigured to return false', () => {
    // Check that isResendConfigured returns false
    expect(isResendConfigured()).toBe(false);
  });
}); 