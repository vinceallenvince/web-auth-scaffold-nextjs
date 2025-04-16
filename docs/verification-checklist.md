# Development Environment Verification Checklist

This document outlines the verification steps for SETUP-04 and provides a checklist to ensure your local development environment is properly configured.

## Project Structure Note

This project uses the `src` directory structure, so all app files are located in `src/app` rather than directly in `app`.

## Automatic Verification

Run the verification script to automatically check your environment:

```bash
npm run verify-setup
```

This script will verify:

- Node.js version (v18+ required)
- Package manager (pnpm or npm with helper script)
- Environment configuration (.env.local)
- Dependencies installation (node_modules)
- Next.js build tools 
- Database verification endpoint implementation

## Manual Verification Steps

Beyond the automated checks, please verify the following manually:

### 1. Next.js Server

- [ ] Run the development server:
```bash
# Using pnpm (if available)
pnpm dev

# Using npm-to-pnpm helper (if pnpm has issues)
node scripts/npm-to-pnpm.js dev

# Using npm directly 
npm run dev
```

- [ ] Verify the app loads at http://localhost:3000
- [ ] Make a small change to `src/app/page.tsx` and verify hot reloading works

### 2. Database Configuration

- [ ] Visit http://localhost:3000/verify-db to test database configuration
- [ ] Verify the endpoint returns status information
- [ ] Check that DATABASE_URL and other required environment variables are detected

### 3. TypeScript Verification

- [ ] Run TypeScript compilation check:
```bash
# Using pnpm (if available)
pnpm tsc --noEmit

# Using npm-to-pnpm helper (if pnpm has issues)
node scripts/npm-to-pnpm.js tsc --noEmit

# Using npm directly
npx tsc --noEmit
```

- [ ] Verify no TypeScript errors are reported

## Common Issues and Solutions

### PNPM Issues

If you encounter issues with PNPM commands not executing correctly:

1. Use the NPM to PNPM helper script:
```bash
node scripts/npm-to-pnpm.js <command>
```

2. See [docs/troubleshooting/pnpm-issues.md](./troubleshooting/pnpm-issues.md) for detailed troubleshooting steps.

### Environment Configuration

If environment variables are missing:

1. Copy `.env.example` to `.env.local`
2. Fill in all required values (see comments in the file)
3. Restart the development server

### 404 Not Found Issues

If you're experiencing 404 errors when accessing the site:

1. Make sure the development server is running
2. Remember that all page components should be in `src/app/`, not directly in `app/`
3. Check that route components follow Next.js App Router conventions (page.tsx, layout.tsx, route.ts)

### Database Connection Issues

The database verification in SETUP-04 only checks configuration, not actual connection, since Supabase setup is part of DB-01. 

1. Ensure `DATABASE_URL` is defined in `.env.local`
2. It should be in the format: `postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres`
3. Always use the connection pooler URL from Supabase (not the direct connection) to ensure compatibility with IPv4 networks
4. Actual database connection will be verified in DB-01

## Next Steps

After successfully completing SETUP-04 verification:

1. Proceed to DB-01: Supabase Project Setup
2. Continue with the rest of the implementation tasks
3. Keep this verification checklist for reference when onboarding new developers 