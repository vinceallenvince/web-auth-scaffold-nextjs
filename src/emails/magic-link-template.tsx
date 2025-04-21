/**
 * Magic Link Email Template
 * 
 * This component renders an HTML email template for magic link authentication.
 * It's designed to be accessible and responsive across different email clients.
 */

export interface MagicLinkTemplateProps {
  /**
   * The URL that the user should click to authenticate
   */
  url: string;
  
  /**
   * The hostname of the application (extracted from URL)
   */
  host: string;
  
  /**
   * Optional user's name or email for personalization
   */
  userIdentifier?: string;
}

/**
 * Renders a magic link email template suitable for various email clients
 */
export function renderMagicLinkEmail({
  url,
  host,
  userIdentifier,
}: MagicLinkTemplateProps): {
  html: string;
  text: string;
} {
  // Plain text version for email clients that don't support HTML
  const text = `
Sign in to ${host}

Click this link to sign in to your account:
${url}

This link will expire in 24 hours.

If you did not request this email, you can safely ignore it.
`;

  // HTML version with inline CSS for maximum compatibility
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <title>Sign in to ${host}</title>
</head>
<body style="margin: 0; padding: 0; width: 100%; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; -webkit-text-size-adjust: 100%; color: #333333;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
    <tr>
      <td style="padding: 20px 0;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; border-collapse: collapse;">
          <!-- Header -->
          <tr>
            <td style="background-color: #ffffff; padding: 20px; text-align: center; border-top: 4px solid #4F46E5;">
              <h1 style="margin: 0; font-size: 24px; line-height: 32px; color: #1F2937;">Sign in to ${host}</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="background-color: #ffffff; padding: 24px 24px 32px; border-bottom: 1px solid #E5E7EB;">
              ${userIdentifier ? `<p style="margin: 0 0 16px; font-size: 16px; line-height: 24px;">Hello ${userIdentifier},</p>` : ''}
              
              <p style="margin: 0 0 16px; font-size: 16px; line-height: 24px;">
                We received a request to sign in to your account. Use the button below to securely sign in.
              </p>
              
              <!-- Magic Link Button -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 32px 0;">
                <tr>
                  <td align="center">
                    <a href="${url}" target="_blank" rel="noopener noreferrer" style="display: inline-block; background-color: #4F46E5; color: #ffffff; font-weight: bold; text-decoration: none; padding: 12px 24px; border-radius: 4px; font-size: 16px; line-height: 24px; min-width: 140px; text-align: center;">
                      Sign In
                    </a>
                  </td>
                </tr>
              </table>
              
              <!-- Fallback Link -->
              <p style="margin: 24px 0 8px; font-size: 14px; line-height: 24px; color: #6B7280;">
                If the button doesn't work, copy and paste this link into your browser:
              </p>
              <div style="margin: 0 0 16px; background-color: #F3F4F6; border-radius: 4px; padding: 12px; word-break: break-all;">
                <a href="${url}" style="color: #4F46E5; text-decoration: underline; font-size: 14px; line-height: 24px;">
                  ${url}
                </a>
              </div>
              
              <p style="margin: 24px 0 0; font-size: 14px; line-height: 20px; color: #6B7280;">
                This link will expire in 24 hours.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #F9FAFB; padding: 24px; text-align: center; font-size: 12px; line-height: 16px; color: #6B7280;">
              <p style="margin: 0 0 12px;">
                If you did not request this email, you can safely ignore it.
              </p>
              <p style="margin: 0;">
                &copy; ${new Date().getFullYear()} ${host}. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

  return { html, text };
}

/**
 * Utility function to generate a magic link email
 */
export default function generateMagicLinkEmail(
  url: string,
  userIdentifier?: string
): { html: string; text: string } {
  const { host } = new URL(url);
  return renderMagicLinkEmail({ url, host, userIdentifier });
} 