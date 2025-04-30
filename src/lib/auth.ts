import { getServerSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import EmailProvider from "next-auth/providers/email";
import { prisma } from "@/lib/prisma";
import { type NextAuthOptions } from "next-auth";
import fs from 'fs';
import path from 'path';
import { sendEmail } from "@/lib/email";
import generateMagicLinkEmail from "@/emails/magic-link-template";
import { defaultLocale } from "@/constants/i18n";

// Create logs directory if it doesn't exist
const logDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Auth.js configuration
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  debug: process.env.NODE_ENV === "development",
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER || { 
        host: process.env.EMAIL_SERVER_HOST || "localhost", 
        port: Number(process.env.EMAIL_SERVER_PORT) || 25, 
        auth: {
          user: process.env.EMAIL_SERVER_USER || "",
          pass: process.env.EMAIL_SERVER_PASSWORD || "",
        }
      },
      from: process.env.EMAIL_FROM || "noreply@example.com",
      sendVerificationRequest: async ({ identifier: email, url }) => {
        // Create a log entry with the magic link
        const logEntry = `
=======================================================================
🔑🔑🔑 MAGIC LINK CREATED AT ${new Date().toISOString()} 🔑🔑🔑
-----------------------------------------------------------------------
📧 EMAIL: ${email}
🔗 LINK:  ${url}
=======================================================================\n\n`;
        
        // Output to console with high visibility
        console.log(logEntry);
        
        // Also save to file for easy reference - using async file operations to avoid blocking the event loop
        try {
          const logFile = path.join(logDir, 'magic-links.log');
          // Use async file write instead of synchronous appendFileSync
          await fs.promises.appendFile(logFile, logEntry);
          console.log(`✅ Magic link saved to ${logFile}`);
        } catch (error) {
          console.error('❌ Failed to save magic link to log file:', error);
        }
        
        // Generate the email content using our template
        const { html, text } = generateMagicLinkEmail(url, email);
        
        // Extract domain from URL for subject line
        const { host } = new URL(url);
        
        // Send the email using our abstracted email service
        // This will log in development or send via Resend in production
        await sendEmail({
          to: email,
          subject: `Sign in to ${host}`,
          text,
          html,
        });
      },
    }),
  ],
  pages: {
    signIn: `/${defaultLocale}/auth/magic-link`,
    signOut: `/${defaultLocale}/auth/signout`,
    error: `/${defaultLocale}/auth/error`,
    verifyRequest: `/${defaultLocale}/auth/verify-request`,
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        // Include user ID in the session
        session.user.id = user.id;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Handle relative URLs and ensure they maintain the user's current locale
      if (url.startsWith('/')) {
        // Get the locale from the current URL if available
        const locale = url.split('/')[1];
        if (locale && /^[a-z]{2}(-[a-z]{2})?$/i.test(locale)) {
          // URL already has a locale segment, return as is
          return `${baseUrl}${url}`;
        }
        
        // URL doesn't have a locale, add the default locale
        return `${baseUrl}/${defaultLocale}${url}`;
      }
      
      // Handle absolute URLs (starts with the baseUrl)
      else if (url.startsWith(baseUrl)) {
        return url;
      }
      
      // Fall back to the base URL with default locale
      return `${baseUrl}/${defaultLocale}`;
    },
  },
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
};

/**
 * Helper function to get the current session in server components and API routes
 * @returns The current session or null if not authenticated
 */
export const getSession = () => getServerSession(authOptions);

/**
 * Helper function to check if a user is authenticated in server components and API routes
 * @returns Boolean indicating if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return !!session?.user;
}

/**
 * Helper function to get the current user ID from session
 * @returns The current user ID or null if not authenticated
 */
export async function getCurrentUserId(): Promise<string | null> {
  const session = await getSession();
  return session?.user?.id || null;
} 