# App Setup Analysis

## Overview

This document outlines the setup process for the web authentication scaffold Next.js application, providing developers with a clear path to begin development. We'll be using Supabase to host our PostgreSQL database.

## Tech Stack Requirements

| Component | Technology | Version Requirements |
|-----------|------------|----------------------|
| Node.js   | Node       | v18+ recommended     |
| Package Manager | pnpm  | Latest stable       |
| Database  | PostgreSQL via Supabase | Active Supabase account |
| Email Service | SendGrid API | Active account |

## Environment Setup

### Local Development Prerequisites

1. **Node.js & pnpm**
   - Install Node.js v18 or higher
   - Install pnpm: `npm install -g pnpm`

2. **Supabase Database Setup**
   - Create a Supabase account at [https://supabase.com](https://supabase.com) if you don't have one
   - Create a new Supabase project
   - Navigate to Project Settings > Database to find your PostgreSQL connection string
   - The connection string will be in the format: `postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/postgres`

3. **Environment Variables**
   - Copy `.env.example` to `.env.local`
   - Required variables include:
     - `DATABASE_URL`: Supabase PostgreSQL connection string (from step 2)
     - `NEXTAUTH_SECRET`: Secret for Auth.js session encryption
     - `SENDGRID_API_KEY`: For magic link emails in production
     - `EMAIL_FROM`: Sender email address for authentication emails

## Installation Process

```bash
# Clone repository (if not already done)
git clone <repository-url>

# Navigate to project directory
cd web-auth-scaffold-nextjs

# Install dependencies
pnpm install

# Set up database schema with Prisma
pnpm db:push

# Optional: Seed database with test data
pnpm db:seed

# Start development server
pnpm dev
```

## Supabase Integration Details

### Database Configuration

1. **Prisma with Supabase**
   - Ensure your `prisma/schema.prisma` file has the proper PostgreSQL provider
   - Use the Supabase connection string in your `.env.local` file
   - Prisma will handle schema migrations to your Supabase database

2. **Row-Level Security (Optional)**
   - Supabase supports PostgreSQL Row-Level Security policies
   - Consider implementing these for additional data protection
   - Note that with our setup, Prisma will be managing most data access

3. **Database Backups**
   - Supabase includes automatic database backups
   - You can configure backup frequency in the Supabase dashboard

### Supabase Environment Variables

Ensure these Supabase-specific environment variables are correctly set:

```
# Main Database URL from Supabase
DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/postgres"

# Optional: Direct URL for Prisma shadow database (for migrations)
DIRECT_URL="postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/postgres"
```

## Development Workflow

### Authentication Testing

For local development, magic links will be output to the console logs rather than sending actual emails. This allows developers to test the authentication flow without requiring email configuration.

### Key Development Commands

```bash
pnpm dev             # Start development server
pnpm test            # Run all tests
pnpm test:db         # Run database tests
pnpm test:server     # Run server tests
pnpm test:client     # Run client tests
pnpm lint            # Run ESLint
pnpm format          # Run Prettier
pnpm db:push         # Push schema changes to Supabase
```

## Project Structure

The project follows the Next.js 13+ App Router structure:

```
app/                 # Main application directory
├── layout.tsx       # Root layout with header/footer
├── page.tsx         # Home page
├── api/             # API routes
│   └── auth/        # Authentication endpoints
├── dashboard/       # Protected routes (requires auth)
│   └── page.tsx     # Dashboard page
components/          # Reusable components
├── ui/              # UI components
└── auth/            # Auth-specific components
lib/                 # Non-UI code
├── db/              # Database access
├── auth/            # Auth utilities
└── utils/           # Helper functions
types/               # TypeScript type definitions
prisma/              # Prisma schema and migrations
public/              # Static assets
__tests__/           # Test files
├── db/              # Database tests
├── server/          # Server-side tests
│   ├── api/         # API route tests
│   └── actions/     # Server actions tests
├── client/          # Client-side component tests
└── e2e/             # End-to-end tests with Playwright
```

## Test Organization

We follow a structured approach to testing with clear separation of concerns:

### Test Directory Structure

1. **`__tests__/`**: Root test directory containing all test files
   - **`db/`**: Database integration tests
     - Test Prisma models, queries, and migrations
     - Typically use a test database with real queries
   - **`server/`**: Server-side functionality tests
     - **`api/`**: Tests for API routes in `app/api/`
     - **`actions/`**: Tests for Next.js Server Actions
     - Focus on data handling, validation, and authentication flows
   - **`client/`**: Client-side component tests
     - Test React component rendering and user interactions
     - Organized to mirror the component directory structure
   - **`e2e/`**: End-to-end Playwright tests
     - Full user flow testing across multiple pages
     - Authentication flows, form submissions, navigation

### Testing Approach

- **Database Tests**: Focus on data integrity, model relationships, and query performance
- **Server Tests**: Validate API endpoints, server actions, authentication logic, and error handling
- **Client Tests**: Verify component rendering, state management, and user interactions
- **E2E Tests**: Ensure complete user journeys work from end to end

### Testing Tools

- **Vitest**: For unit and integration tests (server, client, and database)
- **Playwright**: For end-to-end browser testing
- **React Testing Library**: For component testing
- **MSW (Mock Service Worker)**: For API mocking in tests

### Running Tests

As mentioned in the development commands section:

```bash
pnpm test            # Run all tests
pnpm test:db         # Run database tests
pnpm test:server     # Run server tests
pnpm test:client     # Run client tests
pnpm test:e2e        # Run end-to-end tests
```

Each test category can be run independently, allowing for focused testing during development.

## Core Features Implementation

### Authentication Flow

The application implements a magic link authentication flow:

1. User enters email address
2. System validates email and rate limits
3. Magic link is sent via email (or logged to console in development)
4. User clicks link which contains a secure token
5. System validates token and establishes session
6. Session is stored in the database via Prisma adapter
7. User is redirected to home page with authenticated state

### Portability Considerations

To maintain platform agnosticism:

1. Use environment variables for all configuration
2. Avoid platform-specific APIs or features
3. Keep database externally hosted via Supabase
4. Ensure authentication works across environments
5. Use standard testing tools compatible with any CI/CD pipeline

## Common Issues

1. **Supabase Database Connection**
   - Ensure your Supabase project is active
   - Verify DATABASE_URL is formatted correctly in .env.local
   - Check IP allow lists in Supabase if connecting from a fixed IP
   - Make sure your Supabase database is not paused (free tier limitation)

2. **Magic Link Not Working**
   - In development, check console logs for the magic link URL
   - Verify NEXTAUTH_URL is set correctly for your environment

3. **Missing Environment Variables**
   - Check all required variables are set in .env.local
   - Restart the development server after changing environment variables

4. **Prisma/Supabase Schema Sync Issues**
   - If schema push fails, check Supabase logs for detailed error messages
   - Consider using `pnpm prisma migrate dev` for more controlled migrations

## Next Steps After Setup

1. Review the core specs to understand product requirements
2. Explore the codebase structure
3. Run tests to ensure everything is working
4. Start with a small feature or bugfix to get familiar with the codebase
5. Refer to the development guide for best practices

## Documentation Resources

To effectively work with this application, refer to the official documentation resources at [/docs/tech-documentation](/docs/tech-documentation.md).

