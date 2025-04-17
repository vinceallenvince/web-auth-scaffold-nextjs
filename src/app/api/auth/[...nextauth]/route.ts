import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import EmailProvider from "next-auth/providers/email";
import { prisma } from "@/lib/prisma";
import { type NextAuthOptions } from "next-auth";
import fs from 'fs';
import path from 'path';

console.log('\n\n=============================================================');
console.log('🔒 AUTH.JS SETUP - MAGIC LINK CONFIGURATION IS ACTIVE 🔒');
console.log('=============================================================\n\n');

// Create logs directory if it doesn't exist
const logDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Auth.js configuration
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  debug: true,
  providers: [
    EmailProvider({
      server: { host: "localhost", port: 25, auth: { user: "", pass: "" } },
      from: "noreply@example.com",
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
        
        // Also save to file for easy reference
        try {
          const logFile = path.join(logDir, 'magic-links.log');
          fs.appendFileSync(logFile, logEntry);
          console.log(`✅ Magic link saved to ${logFile}`);
        } catch (error) {
          console.error('❌ Failed to save magic link to log file:', error);
        }
        
        // In a real implementation, you would send an actual email here
        // For development, we're just logging the link
      },
    }),
  ],
  pages: {
    signIn: '/auth/magic-link',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        // Include user ID in the session
        session.user.id = user.id;
      }
      return session;
    },
  },
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
};

// Auth.js handler
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 