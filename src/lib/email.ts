import { Resend } from 'resend';
import { emailLogger } from './logger';

// Configuration
const DEFAULT_FROM_EMAIL = process.env.EMAIL_FROM || 'noreply@example.com';
const MAX_RETRY_ATTEMPTS = 3;
const RETRY_DELAY_MS = 1000;

// Initialize Resend with API key from environment variables
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Email sending options interface
export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  text: string;
  html?: string;
  from?: string;
  replyTo?: string;
  cc?: string | string[];
  bcc?: string | string[];
  attachments?: Array<{
    filename: string;
    content: Buffer | string;
  }>;
}

/**
 * Result of an email sending operation
 */
export interface EmailResult {
  success: boolean;
  messageId?: string;
  mode?: 'production' | 'development';
  error?: Error | unknown;
  attempts?: number;
}

/**
 * Sleep utility for retry delays
 */
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Sends an email using Resend in production or logs in development
 * 
 * @param options Email sending options including recipient, subject, and content
 * @returns Object containing success status and optional data or error
 */
export async function sendEmail(options: SendEmailOptions): Promise<EmailResult> {
  const { 
    to, 
    subject, 
    text, 
    html, 
    from = DEFAULT_FROM_EMAIL,
    replyTo,
    cc,
    bcc,
    attachments
  } = options;
  
  // Track email metrics
  const startTime = Date.now();
  let attempts = 0;
  
  // Normalize recipients to string for logging
  const recipients = Array.isArray(to) ? to.join(', ') : to;
  
  // Log the email attempt
  emailLogger.info(`Preparing to send email: "${subject}"`, {
    to: recipients,
    cc: cc ? (Array.isArray(cc) ? cc.join(', ') : cc) : undefined,
    hasAttachments: !!attachments && attachments.length > 0,
    emailSize: text.length + (html?.length || 0)
  });

  // Check if we're in development mode or missing Resend API key
  const shouldSendEmail = process.env.FORCE_EMAIL_SENDING === 'true' || process.env.NODE_ENV === 'production';
  
  if (!resend || !shouldSendEmail) {
    emailLogger.info(`Email logged only (${!shouldSendEmail ? 'development mode' : 'no Resend API key provided'})`);
    
    return { 
      success: true, 
      mode: 'development',
      attempts: 1
    };
  }

  // Production mode with Resend
  let lastError: unknown = null;
  
  // Retry logic for transient errors
  for (attempts = 1; attempts <= MAX_RETRY_ATTEMPTS; attempts++) {
    try {
      // If this is a retry, log the attempt
      if (attempts > 1) {
        emailLogger.warning(`Retrying email delivery (attempt ${attempts}/${MAX_RETRY_ATTEMPTS})`, {
          to: recipients,
          subject
        });
        
        // Wait before retrying to avoid overwhelming the API
        await sleep(RETRY_DELAY_MS * (attempts - 1));
      }
      
      // Prepare email data
      const emailData = {
        from,
        to: Array.isArray(to) ? to : [to],
        subject,
        text,
        html: html || undefined,
        ...(replyTo && { reply_to: replyTo }),
        ...(cc && { cc: Array.isArray(cc) ? cc : [cc] }),
        ...(bcc && { bcc: Array.isArray(bcc) ? bcc : [bcc] }),
        ...(attachments && { attachments })
      };
      
      // Send email via Resend
      const { data, error } = await resend.emails.send(emailData);

      // Handle API error response
      if (error) {
        lastError = error;
        emailLogger.error('Failed to send email via Resend API', error, {
          attemptNumber: attempts,
          to: recipients,
          subject
        });
        continue; // Try again
      }

      // Success! Log and return
      const duration = Date.now() - startTime;
      emailLogger.success(`Email sent successfully via Resend in ${duration}ms`, {
        messageId: data?.id,
        to: recipients,
        subject,
        attempts
      });
      
      return { 
        success: true, 
        messageId: data?.id,
        mode: 'production',
        attempts
      };
    } catch (error) {
      // Handle exceptions during send
      lastError = error;
      emailLogger.error('Exception while sending email via Resend', error, {
        attemptNumber: attempts,
        to: recipients,
        subject
      });
    }
  }

  // If we get here, all attempts failed
  const duration = Date.now() - startTime;
  emailLogger.error(`Failed to send email after ${attempts - 1} retries (${duration}ms)`, lastError, {
    to: recipients,
    subject,
    attempts
  });
  
  return { 
    success: false, 
    error: lastError,
    attempts: attempts - 1 
  };
}

/**
 * Verify Resend configuration by checking API key and optional connection test
 * 
 * @param testConnection Whether to test the connection to Resend API
 * @returns Promise resolving to configuration status
 */
export async function verifyResendConfig(testConnection = false): Promise<{
  configured: boolean;
  apiKeyPresent: boolean;
  connectionSuccessful?: boolean;
  error?: unknown;
}> {
  const apiKeyPresent = !!process.env.RESEND_API_KEY;
  
  // If requested and API key is present, test actual API connection
  if (testConnection && apiKeyPresent && resend) {
    try {
      // Basic API call to test connectivity
      const { data, error } = await resend.domains.list();
      
      if (error) {
        emailLogger.error('Resend API connection test failed', error);
        return { 
          configured: false, 
          apiKeyPresent: true,
          connectionSuccessful: false,
          error 
        };
      }
      
      emailLogger.success('Resend API connection test successful');
      return { 
        configured: true, 
        apiKeyPresent: true,
        connectionSuccessful: true 
      };
    } catch (error) {
      emailLogger.error('Exception during Resend API connection test', error);
      return { 
        configured: false, 
        apiKeyPresent: true,
        connectionSuccessful: false,
        error 
      };
    }
  }
  
  // Simple configuration check without testing connection
  return { 
    configured: apiKeyPresent,
    apiKeyPresent
  };
}

/**
 * Simpler method to check if Resend is configured for backwards compatibility
 */
export function isResendConfigured(): boolean {
  return !!resend;
} 