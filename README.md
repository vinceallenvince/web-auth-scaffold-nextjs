# Web Authentication Scaffold with Next.js App Router

This is a secure, production-ready authentication scaffold for Next.js applications built with the App Router. It features magic link authentication via Auth.js (formerly NextAuth.js), PostgreSQL database integration with Prisma, and a clean UI with DaisyUI and Tailwind CSS.

## Features

- **Magic Link Authentication** - Secure, passwordless authentication via Auth.js
- **PostgreSQL Database** - Supabase PostgreSQL with Prisma ORM for data management
- **Modern UI** - Clean, responsive interface using Tailwind CSS and DaisyUI
- **TypeScript** - Full type safety throughout the codebase
- **Testing** - Comprehensive test suite with Vitest and Playwright
- **Accessibility** - WCAG 2.1 Level AA compliant components and pages
- **Internationalization (i18n)** - Multi-language support with locale-based routing and dictionary-based translations


## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm
- PostgreSQL database (recommended: Supabase)

### Environment Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/web-auth-scaffold-nextjs.git
   cd web-auth-scaffold-nextjs
   ```

2. Copy `.env.example` to `.env.local` and fill in your environment variables:
   ```bash
   cp .env.example .env.local
   ```

3. Update the following variables in `.env.local`:
   - `DATABASE_URL`: Your PostgreSQL connection string (Use Supabase connection pooler URL)
   - `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
   - `NEXTAUTH_URL`: Set to `http://localhost:3000` for development
   - `EMAIL_FROM`: Email address for magic link sender

### Installation and Verification

First, verify your setup to ensure all requirements are met:

```bash
npm run verify-setup
```

Then, install dependencies:

```bash
# Using npm
npm install

# Using pnpm (recommended)
pnpm install
```

Run the development server:

```bash
# Using pnpm (recommended)
pnpm dev

# If experiencing pnpm issues, use the helper script
npm run use-pnpm dev

# Or use npm directly
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development Workflow

### Directory Structure

```
├── src/                    # Application source code
│   ├── app/                # Next.js App Router pages and API routes
│   │   ├── api/            # API routes including Auth.js endpoints
│   │   ├── auth/           # Authentication pages
│   │   └── dashboard/      # Protected dashboard pages
│   ├── lib/                # Shared utilities and business logic
│   ├── components/         # React components
│   ├── emails/             # Email templates
│   └── types/              # TypeScript type definitions
├── prisma/                 # Prisma schema and migrations
│   └── schema.prisma      # Database schema
├── public/                 # Static assets
└── docs/                   # Documentation
```

### Coding Standards

- **TypeScript**: Use strict mode with proper typing
- **Components**: Create reusable components in `src/components`
- **Server Actions**: Implement data mutations with Next.js Server Actions
- **Authentication**: Use Auth.js hooks for session management
- **Database**: Use Prisma Client for database operations
- **Styling**: Use Tailwind utility classes and DaisyUI components
- **Testing**: Write tests for all new functionality

### Running Tests

This project uses Vitest for testing with dedicated configuration files for different test categories:

```bash
# Run all tests
npm test

# Run auth tests
npm run test:auth

# Run db tests
npm run test:db

# Run email tests
npm run test:email
```

## Database Connection

This project connects to a Supabase PostgreSQL database using Prisma ORM. For reliable external connections:

1. Always use the Supabase connection pooler URL format:
   ```
   postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres
   ```

2. Direct connections to Supabase databases may fail from IPv4 networks

3. For detailed instructions, see:
   - [Supabase Connection Guide](docs/guides/supabase-connection.md)
   - [Database Troubleshooting](docs/troubleshooting/database-connection.md)

4. Test your connection with:
   ```bash
   npm run test-db-pooler
   ```

## PNPM Issues

If you're experiencing issues with PNPM commands not running correctly, you can:

1. Run the verification script to check your environment:
   ```bash
   npm run verify-setup
   ```

2. Use the helper script that translates pnpm commands to npm:
   ```bash
   npm run use-pnpm <command>
   # Examples:
   npm run use-pnpm dev
   npm run use-pnpm add react
   ```

3. See detailed troubleshooting steps in [docs/troubleshooting/pnpm-issues.md](docs/troubleshooting/pnpm-issues.md)

## Documentation

- [Technical Documentation](docs/tech-documentation.md) - Core technologies and references
- [Development Guide](docs/development-guide.md) - Detailed development instructions
- [API Documentation](docs/api-documentation.md) - API endpoints and usage
- [Component Documentation](docs/component-documentation.md) - UI components and props
- [Authentication Guide](docs/guides/authentication.md) - Auth.js implementation details

## Deployment

This application is designed to be deployed on any platform that supports Next.js applications:

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

For detailed deployment instructions for specific platforms, see [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## License

This project is licensed under the MIT License - see the LICENSE file for details.
