import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";
import { isResendConfigured } from "@/lib/email";

console.log('✅ AUTH.JS setup - Magic Link configuration is active');

// Report on Resend configuration
if (isResendConfigured()) {
  console.log('✅ Resend is configured and ready for email delivery in production');
} else {
  console.log('ℹ️ Resend is not configured, magic links will be logged (not sent via email)');
}

// Auth.js handler
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 