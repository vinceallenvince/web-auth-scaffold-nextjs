# Database Seed Data

This document provides details about the seed data created for development and testing purposes.

## How to Run the Seed Script

```bash
# Using npm
npm run db:seed

# Using pnpm
pnpm db:seed
```

## Available Test Users

### Admin User
- **Email**: admin@example.com
- **Name**: Admin User
- **Status**: Email verified
- **Profile Image**: GitHub avatar

### Demo User
- **Email**: user@example.com
- **Name**: Demo User
- **Status**: Email verified
- **Profile Image**: GitHub avatar
- **Session**: Active test session (valid for 30 days from seed time)
- **OAuth**: Connected to GitHub provider

## Test Data

### Sessions
A pre-created session is available for the Demo User with:
- **Session Token**: test-session-token
- **Expiration**: 30 days from seed date

### OAuth Accounts
The Demo User has a mock GitHub OAuth connection:
- **Provider**: github
- **Provider Account ID**: 12345
- **Scopes**: user
- **Tokens**: Mock tokens for testing

### Verification Tokens
A verification token for testing email verification flows:
- **Email**: new-user@example.com
- **Token**: verification-token-123
- **Expiration**: 30 days from seed date

## Using Seed Data for Testing

### Authentication Testing
You can use the Demo User credentials to test authentication flows. The seed creates a persistent session that can be used for testing protected routes.

### Email Verification Testing
The verification token for new-user@example.com can be used to test the email verification flow.

### OAuth Connection Testing
The Demo User's GitHub connection can be used to test the OAuth account linking and authentication features.

## Resetting Seed Data

The seed script automatically resets existing data in development environments before creating new seed data. To completely reset and regenerate the seed data, simply run the seed command again.

```bash
npm run db:seed
```

## Production Note

The seed script checks for the NODE_ENV environment variable and will only clear existing data if not in production mode. This prevents accidental data loss in production environments.

If you need to seed a production database, ensure you customize the script to prevent data deletion. 