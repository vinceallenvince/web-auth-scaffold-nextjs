# 🗭 Full Stack Developer Guide

## 🧐 Overview

We're building a full-stack TypeScript web app using **Next.js 13+ with the App Router**.\
This app is modern, scalable, portable, and optimized for fast developer workflows.

You'll be working across:

- The **frontend** (UI components, pages)
- The **backend** (API routes and Server Actions)
- A **PostgreSQL database** via a type-safe ORM
- **Authentication** with passwordless email login (magic link)
- A modern **design system** with DaisyUI and Tailwind
- Clean code practices with automated testing and formatting tools

---

## 🛠️ Tech Stack Summary

| Layer              | Tech                                      | Notes                                                                   |
| ------------------ | ----------------------------------------- | ----------------------------------------------------------------------- |
| **Framework**      | Next.js 13+ (App Router)                  | App directory structure with React Server Components and Server Actions |
| **Styling**        | Tailwind CSS                              | Utility-first CSS framework                                             |
| **UI Components**  | DaisyUI + Tailwind CSS                    | Rapid development with clean, styled components                         |
| **Authentication** | Auth.js (NextAuth)                        | Secure, passwordless login with email magic links                       |
| **Database**       | PostgreSQL via Prisma ORM                 | Type-safe, modern ORM for DB interactions                               |
| **Build Tooling**  | Turbopack (Next.js default)               | Blazing-fast bundler replacing Webpack                                  |
| **Testing**        | Vitest, Playwright, Zod, ESLint, Prettier | Robust test suite, type validation, and code linting                    |
| **Languages**      | TypeScript (strict mode enabled)          | Fully type-safe across the stack                                        |

---

## ✅ Key Architecture Decisions

### 1. **Next.js with App Router**

- Use the `app/` directory (not `pages/`)
- Structure routes by folder (e.g., `app/login/page.tsx`)
- Prefer **React Server Components** and **Server Actions**
- Avoid client-side-only state unless necessary

### 2. **API Logic**

- Use `app/api/*/route.ts` for REST endpoints
- Use **Server Actions** for form handling, mutations, and sensitive logic
- Avoid frontend-side business logic

### 3. **Auth.js (NextAuth)**

- Email login using **magic links**
- Auth sessions stored in DB (via Prisma)
- All sensitive auth logic lives in Server Actions or API routes
- Wrap auth UI in reusable components (e.g., `<LoginForm />`)

### 4. **Database + ORM**

- PostgreSQL (Supabase for external hosting)
- Prisma handles:
  - Schema migrations
  - Type-safe DB queries
  - Relations between models
- DB access logic lives in `lib/db/` and never in components

### 5. **UI and Styling**

- Tailwind CSS for all layout and styles
- DaisyUI for styled components (`btn`, `card`, `modal`, etc.)
- Wrap DaisyUI elements in our own components for flexibility (`<Button />`, `<Modal />`)
- Dark mode and themes are supported via DaisyUI config

---

## 📁 Recommended Folder Structure

```
app/
  layout.tsx         → App layout (header/footer/theme)
  page.tsx           → Landing page
  dashboard/         → Protected routes (authenticated)
    page.tsx
  api/
    auth/            → API routes (e.g., login, logout)
    users/           → Other CRUD endpoints

lib/
  db/                → Prisma client, models, seed scripts
  auth/              → Auth helpers (e.g., getSession, sendMagicLink)
  utils/             → Misc utilities and validators

components/
  ui/                → Reusable UI components (Button, Input, etc.)
  auth/              → Auth-specific components (LoginForm, LogoutButton)

types/
  index.ts           → Shared types between client/server

middleware.ts        → Optional route guards or localization
```

---

## 🚧 Development Guidelines

### General

- Use **TypeScript strict mode** – no `any`
- Prefer **server-first** patterns: fetch and mutate data on the server
- Wrap third-party libraries in your own helpers/components

### Styling

- Use **Tailwind utility classes** + DaisyUI component classes
- Avoid inline styles or custom CSS unless necessary
- Group your class names logically and consistently

### Authentication

- Use **Auth.js** with magic link strategy
- Store user session in DB with Prisma adapter
- Use `getServerSession()` from Auth.js in Server Components and API routes

---

## 💪 Testing & Code Quality

| Tool           | Purpose                                 |
| -------------- | --------------------------------------- |
| **Vitest**     | Unit and integration tests              |
| **Playwright** | End-to-end testing (login flow, UI)     |
| **Zod**        | Runtime type validation                 |
| **ESLint**     | Linting with TypeScript + accessibility |
| **Prettier**   | Code formatting                         |

### Guidelines

- Validate all user input with Zod
- Write tests for all auth flows and DB access
- Use `testid` attributes for Playwright selectors
- Run `pnpm lint` and `pnpm test` before pushing

---

## 🚀 Deployment & Portability

We're building this project to be **platform-agnostic** — meaning it should run smoothly on a variety of environments including **Replit**, **Vercel**, **Render**, **Fly.io**, or your local machine.

To support that flexibility, our codebase avoids assumptions or dependencies tied to any one hosting platform.

### ✅ Portability Guidelines

- **Avoid provider-specific features**
  - Don't use platform-only APIs, edge runtime hacks, or logging/analytics tools tied to a single host
  - Stick with standard **Next.js features** like API routes and Server Actions
- **Use environment variables**, not hardcoded secrets
  - All configuration (e.g., DB URLs, auth secrets) should come from `.env.local`
  - Load them via `process.env` in code, and document required values in `.env.example`
- **Database** should be externally hosted (e.g., Neon, PlanetScale, Supabase)
  - This avoids tying DB access to the host environment
- **Authentication**, **email services**, and **APIs** should work in local dev and in the cloud
  - For example, sending magic links via SendGrid or Resend should work regardless of hosting platform
- **Testing and dev tools** should not rely on a specific platform's CI/CD
  - Use **Vitest**, **Playwright**, and **ESLint** locally and in any CI pipeline (e.g., GitHub Actions, Replit Deploy Hooks)

### 🛠️ Deployment Scenarios We Support

| Environment                | Notes                                                           |
| -------------------------- | --------------------------------------------------------------- |
| **Local Development**      | Runs with `pnpm dev`, `.env.local`, SQLite/Postgres locally     |
| **Replit**                 | Use `.replit` config and ensure ports/env vars are set properly |
| **Vercel, Render, Fly.io** | Use Postgres-compatible hosting and standard Node runtime       |
| **Docker** *(optional)*    | Can containerize if needed for future deploy flexibility        |

By avoiding lock-in and using web standards, we ensure this project can scale, move, and evolve over time — whether we deploy to a cloud platform, self-host, or demo on Replit.

---

## 🧮 Tips for Working in the Codebase

- Use `"use client"` only when you need interactivity (forms, modals, etc.)
- Break down UI into atomic components and wrap DaisyUI for reusability
- Keep **business logic** in `lib/`, not in components or route handlers
- Use **shared types** (e.g., `User`, `Session`) in `types/` to prevent drift
- Keep your codebase clean — if it feels messy, it probably is. Refactor early.

---

### ✅ Example: Using a Server Action for Magic Link Login

```ts
// app/login/actions.ts
'use server'

import { sendMagicLink } from '@/lib/auth'

export async function loginWithEmail(email: string) {
  await sendMagicLink(email)
}
```

```tsx
// app/login/page.tsx
'use client'

import { loginWithEmail } from './actions'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const handleSubmit = () => loginWithEmail(email)

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" onChange={e => setEmail(e.target.value)} />
      <button type="submit" className="btn btn-primary">Send Link</button>
    </form>
  )
}
```

---

## 🪥 Scripts & NPM Commands

```bash
pnpm dev             # Start dev server
pnpm lint            # Run ESLint
pnpm format          # Prettier formatting
pnpm test            # Run Vitest tests
pnpm db:push         # Apply schema changes with Prisma
pnpm db:seed         # Seed DB with test data

# If you face issues with company npm registry, use:
pnpm <command> --registry=https://registry.npmjs.org/
# Example: pnpm install --registry=https://registry.npmjs.org/
```

> **Note**: A local `.npmrc` file is included that configures npm to use the public registry for this project

---

## 📍 Onboarding Checklist for New Devs

  ✅ Install Node + pnpm 
     - If facing issues with company npm registry: `npm install -g pnpm --registry=https://registry.npmjs.org/`

  ✅ Clone the repo and run pnpm install
     - If facing issues with company npm registry: `pnpm install --registry=https://registry.npmjs.org/`

  ✅ Copy .env.example to .env.local and fill in keys

  ✅ Run pnpm dev and visit http\://localhost:3000
     - If facing issues with company npm registry: `pnpm dev --registry=https://registry.npmjs.org/`

  ✅ Run pnpm test to confirm everything is passing
     - If facing issues with company npm registry: `pnpm test --registry=https://registry.npmjs.org/`

  ✅ Read this guide

  ✅ Start with a small bug or feature ticket

## Package Manager Instructions

### Standard Usage (with PNPM)
```bash
pnpm dev             # Start dev server
pnpm lint            # Run ESLint
pnpm format          # Prettier formatting
pnpm test            # Run Vitest tests
pnpm db:push         # Apply schema changes with Prisma
pnpm db:seed         # Seed DB with test data
```

If facing issues with company npm registry:
```bash
pnpm <command> --registry=https://registry.npmjs.org/
# Example: pnpm install --registry=https://registry.npmjs.org/
```

### Temporary NPM Solution (SETUP-04 Verification)
If you're experiencing issues with PNPM commands not running correctly, you can use the temporary helper script to run commands with NPM instead:

```bash
# Use the npm-to-pnpm.js helper script
node scripts/npm-to-pnpm.js dev        # Equivalent to: npm run dev
node scripts/npm-to-pnpm.js install    # Equivalent to: npm install
node scripts/npm-to-pnpm.js add react  # Equivalent to: npm install react

# For help with available commands
node scripts/npm-to-pnpm.js --help
```

Alternatively, you can use npm directly:
```bash
npm run dev            # Start dev server
npm run lint           # Run ESLint
npm run test           # Run tests
npx prisma db push     # Apply schema changes with Prisma
npx prisma db seed     # Seed DB with test data
```

This temporary solution is implemented to unblock SETUP-04 verification while the PNPM issues are being resolved.
