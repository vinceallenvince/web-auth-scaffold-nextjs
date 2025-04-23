# Authentication Guide

This guide provides detailed information about the authentication implementation in this application using Auth.js (formerly NextAuth.js).

## Overview

This application uses magic link authentication via Auth.js with a Prisma adapter. Magic links are sent to the user's email, allowing them to sign in without a password.

## Setup and Configuration

### Auth.js Configuration

The Auth.js configuration is defined in `src/app/api/auth/[...nextauth]/route.ts`. Key configurations include:

1. **Database Adapter**: `PrismaAdapter` is used to store authentication data in the PostgreSQL database.
2. **Email Provider**: Configured to send magic links via email.
3. **Pages**: Custom pages for various authentication flows (sign in, sign out, error, etc.).
4. **Session Strategy**: Database session strategy for best security.
5. **Callbacks**: Custom callbacks to enhance session data.

### Session Configuration

Sessions are configured with the following settings:

```typescript
session: {
  strategy: "database",  // Store sessions in the database
  maxAge: 30 * 24 * 60 * 60,  // 30 days
  updateAge: 24 * 60 * 60,  // 24 hours
}
```

- `strategy: "database"`: Sessions are stored in the database rather than JWT
- `maxAge`: Sessions expire after 30 days of inactivity
- `updateAge`: Session is updated in the database every 24 hours

## Authentication Flow

### Magic Link Authentication Flow

1. **User Requests Magic Link**:
   - User navigates to `/auth/magic-link`
   - User enters their email address
   - Form is submitted to the server

2. **Magic Link Creation**:
   - Server validates the email address
   - A unique token is generated and stored in the database
   - A magic link containing the token is created
   - In development, the link is logged to console and file
   - In production, the link is sent via email

3. **User Authentication**:
   - User clicks the magic link in their email
   - Auth.js verifies the token
   - If valid, a session is created for the user
   - User is redirected to the callback URL or dashboard

4. **Session Management**:
   - The session is stored in the database
   - Session is checked on protected routes
   - Session expires after 30 days of inactivity

## Protected Routes

### Server-Side Protection

The `AuthGuard` component in `src/components/auth/auth-guard.tsx` is used to protect routes on the server side:

```tsx
import { AuthGuard } from "@/components/auth/auth-guard";

export default function ProtectedPage() {
  return (
    <AuthGuard>
      <h1>Protected Content</h1>
      <p>This content is only visible to authenticated users</p>
    </AuthGuard>
  );
}
```

### Client-Side Protection

For client components, the `useAuth` hook provides authentication state and functions:

```tsx
'use client';
import { useAuth } from "@/lib/hooks/use-auth";

export default function ProfileButton() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return null;

  return <div>Profile Content</div>;
}
```

## Email Configuration

### Development Environment

In development, magic links are:
1. Logged to the console
2. Saved to `logs/magic-links.log`
3. Not actually sent via email

This allows developers to test the authentication flow without setting up an email service.

### Production Environment

In production, the application uses the Resend email service:

1. Configure Resend API key in environment variables
2. Templates are defined in `src/emails/magic-link-template.ts`
3. Emails are sent using the `sendEmail` function in `src/lib/email.ts`

## Database Schema

The Prisma schema includes the following tables for authentication:

- `User`: Stores user information
- `Account`: Used for OAuth providers (if implemented)
- `Session`: Stores active sessions
- `VerificationToken`: Stores magic link tokens

## Security Considerations

1. **CSRF Protection**: Auth.js includes CSRF protection for all form submissions
2. **Rate Limiting**: Implement rate limiting for authentication endpoints
3. **Secure Cookies**: Sessions use HTTP-only, secure cookies
4. **Token Expiration**: Magic links expire after 10 minutes
5. **Logging**: Avoid logging sensitive information in production

## Extending Authentication

### Adding OAuth Providers

To add OAuth providers (e.g., Google, GitHub):

1. Install the required provider package
2. Add provider configuration to Auth.js options
3. Update the sign-in page to include OAuth buttons

Example:

```typescript
import GoogleProvider from "next-auth/providers/google";

// Add to providers array
providers: [
  EmailProvider({
    // existing email provider config
  }),
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }),
]
```

### Customizing User Data

To add custom fields to the user profile:

1. Extend the User model in Prisma schema
2. Update the session callback to include the additional fields
3. Use the extended data in your application

## Troubleshooting

### Common Issues

1. **Magic Link Not Working**:
   - Check if the token has expired
   - Verify the email address matches
   - Ensure database connection is working

2. **Session Not Persisting**:
   - Check cookie settings
   - Verify session table in database
   - Check for CSRF token issues

3. **Email Not Being Sent**:
   - Verify Resend API key is correct
   - Check for email service errors
   - Ensure email templates are valid

### Debugging

For detailed debugging:

1. Enable debug mode in Auth.js configuration
2. Check the server logs for Auth.js messages
3. Use the magic link log file in development
4. Check the database tables for session and token data 