# Implementation Plan: App Setup

## Overview

This implementation plan outlines the approach for setting up a Next.js authentication scaffold with App Router and Supabase integration. The plan covers environment setup, database configuration, authentication implementation, and testing infrastructure.

## Context

Based on the core specifications and development guide, we're building a full-stack TypeScript web app with:

1. Next.js 13+ with App Router architecture
2. Supabase-hosted PostgreSQL database
3. Auth.js (formerly NextAuth) with magic link authentication
4. Server-first approach with React Server Components
5. Tailwind CSS and DaisyUI for styling
6. Comprehensive testing infrastructure

This implementation will serve as the foundation for a portable, maintainable web application with a focus on developer experience and code quality.

## Development Goals

1. Create a robust authentication system with magic link email flow
2. Set up a type-safe database connection using Prisma ORM with Supabase
3. Implement proper project structure following Next.js App Router conventions
4. Establish comprehensive testing infrastructure for all application layers
5. Ensure platform agnosticism by following portability guidelines

## Development Steps

### Phase 1: Environment Setup (1-2 days)

1. **Project Scaffolding**
   - Create new Next.js project with App Router:
     ```bash
     pnpm create next-app web-auth-scaffold-nextjs
     
     # If you face issues with company npm registry:
     pnpm create next-app web-auth-scaffold-nextjs --registry=https://registry.npmjs.org/
     ```
   - Select TypeScript, ESLint, and Tailwind CSS during setup
   - Configure VSCode for TypeScript and ESLint

2. **Dependency Installation**
   - Install core dependencies:
     ```bash
     pnpm add @auth/core @auth/prisma-adapter @prisma/client zod
     pnpm add -D prisma vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom 
     pnpm add -D playwright @playwright/test
     
     # If you face issues with company npm registry:
     pnpm add @auth/core @auth/prisma-adapter @prisma/client zod --registry=https://registry.npmjs.org/
     pnpm add -D prisma vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom playwright @playwright/test --registry=https://registry.npmjs.org/
     ```
   - Install UI dependencies:
     ```bash
     pnpm add daisyui @tailwindcss/forms
     
     # If you face issues with company npm registry:
     pnpm add daisyui @tailwindcss/forms --registry=https://registry.npmjs.org/
     ```
   - Note: A local `.npmrc` file is included that configures npm to use the public registry for this project

3. **Environment Configuration**
   - Create `.env.example` template with required variables:
     - `DATABASE_URL`
     - `NEXTAUTH_SECRET`
     - `SENDGRID_API_KEY`
     - `EMAIL_FROM`
     - `NEXTAUTH_URL`
   - Create `.env.local` for local development
   - Set up `.gitignore` to exclude `.env.local`

4. **Local Development Verification**
   - Create a basic test page to verify Next.js setup:
     ```bash
     # Start development server
     pnpm dev
     
     # If you face issues with company npm registry:
     pnpm dev --registry=https://registry.npmjs.org/
     ```
   - Verify the following:
     - Next.js development server starts successfully at http://localhost:3000
     - Tailwind CSS is working properly by testing simple utility classes
     - TypeScript compilation is functioning without errors
     - ESLint is enforcing code standards
   - Create a simple connectivity test to verify Supabase connection:
     ```typescript
     // app/api/verify-db/route.ts
     import { NextResponse } from 'next/server';
     import { PrismaClient } from '@prisma/client';

     export async function GET() {
       try {
         const prisma = new PrismaClient();
         await prisma.$connect();
         await prisma.$disconnect();
         return NextResponse.json({ status: 'Database connection successful' });
       } catch (error) {
         return NextResponse.json(
           { error: 'Database connection failed', details: error.message },
           { status: 500 }
         );
       }
     }
     ```
   - Test the database connection by visiting `/api/verify-db`
   - Document any issues and troubleshooting steps taken

### Phase 2: Database Setup (1-2 days)

1. **Supabase Project Creation**
   - Create Supabase account and new project
   - Obtain PostgreSQL connection string

2. **Prisma Configuration**
   - Initialize Prisma:
     ```bash
     pnpm prisma init
     
     # If you face issues with company npm registry:
     pnpm prisma init --registry=https://registry.npmjs.org/
     ```
   - Configure `schema.prisma` with PostgreSQL provider
   - Define core data models:
     - User
     - Account
     - Session
     - VerificationToken

3. **Database Schema Deployment**
   - Push schema to Supabase:
     ```bash
     pnpm prisma db push
     
     # If you face issues with company npm registry:
     pnpm prisma db push --registry=https://registry.npmjs.org/
     ```
   - Create database seed script for development data

### Phase 3: Authentication Implementation (2-3 days)

1. **Auth.js Setup**
   - Create `app/api/auth/[...nextauth]/route.ts`
   - Configure Auth.js with:
     - Prisma adapter
     - Email provider for magic links
     - Session strategy
     - Callbacks for user profile

2. **Authentication UI Components**
   - Create login form component
   - Implement magic link request flow
   - Create session handling utilities
   - Add authentication status components (login/logout buttons)

3. **Protected Routes**
   - Implement middleware for route protection
   - Create sample protected dashboard page
   - Add server-side session validation

### Phase 4: Testing Infrastructure (2 days)

1. **Test Directory Structure**
   - Set up `__tests__` directory with subdirectories:
     - `db` - Database tests
     - `server` - API and server action tests
     - `client` - Component tests
     - `e2e` - Playwright end-to-end tests

2. **Test Configuration**
   - Configure Vitest for unit and integration tests
   - Set up Playwright for E2E tests
   - Create test utilities and helpers
   - Configure test database for database tests

3. **Core Test Implementation**
   - Write tests for authentication flow
   - Create database access tests
   - Implement component rendering tests
   - Build E2E tests for critical user journeys

### Phase 5: Core Feature Implementation (3-4 days)

1. **Project Structure Setup**
   - Implement recommended folder structure
   - Create core components and layouts
   - Set up utility functions and helpers

2. **UI Implementation**
   - Configure Tailwind CSS and DaisyUI
   - Create base layout with header/footer
   - Implement responsive design patterns
   - Build form components with validation

3. **Error Handling and Validation**
   - Implement Zod schemas for data validation
   - Create error boundary components
   - Add proper error handling for API routes
   - Implement toast notifications for user feedback

### Phase 6: Documentation and Cleanup (1 day)

1. **Documentation**
   - Update README with setup instructions
   - Document API endpoints and authentication flow
   - Create component documentation
   - Document testing approach

2. **Code Quality**
   - Run linting and fix issues:
     ```bash
     pnpm lint
     
     # If you face issues with company npm registry:
     pnpm lint --registry=https://registry.npmjs.org/
     ```
   - Ensure consistent code formatting:
     ```bash
     pnpm format
     
     # If you face issues with company npm registry:
     pnpm format --registry=https://registry.npmjs.org/
     ```
   - Validate TypeScript types:
     ```bash
     pnpm tsc --noEmit
     
     # If you face issues with company npm registry:
     pnpm tsc --noEmit --registry=https://registry.npmjs.org/
     ```

3. **Final Testing**
   - Run complete test suite:
     ```bash
     pnpm test
     
     # If you face issues with company npm registry:
     pnpm test --registry=https://registry.npmjs.org/
     ```
   - Verify all critical flows work end-to-end
   - Fix any remaining issues

## Timeline and Milestones

| Phase | Duration | Milestone |
|-------|----------|-----------|
| Environment Setup | 1-2 days | Project scaffold with dependencies |
| Database Setup | 1-2 days | Working Prisma + Supabase connection |
| Authentication | 2-3 days | Functional magic link auth flow |
| Testing Infrastructure | 2 days | Test suite running successfully |
| Core Features | 3-4 days | Essential UI and functionality working |
| Documentation & Cleanup | 1 day | Polished codebase with documentation |

**Total Estimated Time**: 10-14 days

## Success Criteria

The implementation will be considered successful when:

1. Users can register and authenticate using magic links
2. Authentication data is properly stored in the Supabase database
3. Protected routes are only accessible to authenticated users
4. The application is responsive across different device sizes
5. All tests pass successfully
6. The application can be deployed to multiple platforms without modification
7. Development workflow is smooth with working commands for testing, linting, and development

## Post-Implementation Tasks

1. Load testing to ensure performance under load
2. Security audit of authentication implementation
3. Consideration of additional authentication methods (social login, etc.)
4. Refinement of UI/UX based on user feedback
5. Implementation of additional features based on product requirements