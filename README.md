This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, verify your setup to ensure all requirements are met:

```bash
npm run verify-setup
```

Then, run the development server:

```bash
# Using pnpm (recommended)
pnpm dev

# If experiencing pnpm issues, use the helper script
npm run use-pnpm dev

# Or use npm directly
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## PNPM Issues (SETUP-04)

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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
