import '@testing-library/jest-dom';
import { vi } from 'vitest';
import dotenv from 'dotenv';
import path from 'path';

// Load test environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.test') });

// Mock Next.js navigation
vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: vi.fn(),
      replace: vi.fn(),
      refresh: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
    })),
    useSearchParams: vi.fn(() => ({
      get: vi.fn(),
      getAll: vi.fn(),
      has: vi.fn(),
      forEach: vi.fn(),
      entries: vi.fn(),
      keys: vi.fn(),
      values: vi.fn(),
      toString: vi.fn(),
    })),
    redirect: vi.fn(),
    usePathname: vi.fn(),
  };
});

// Mock NextAuth session
vi.mock('next-auth/react', async () => {
  const actual = await vi.importActual('next-auth/react');
  return {
    ...actual,
    useSession: vi.fn(() => ({
      data: null,
      status: 'unauthenticated',
      update: vi.fn(),
    })),
    getSession: vi.fn(),
    signIn: vi.fn(),
    signOut: vi.fn(),
  };
});

// Mock NextAuth server-side functions
vi.mock('next-auth', async () => {
  const actual = await vi.importActual('next-auth');
  return {
    ...actual,
    getServerSession: vi.fn(),
  };
}); 