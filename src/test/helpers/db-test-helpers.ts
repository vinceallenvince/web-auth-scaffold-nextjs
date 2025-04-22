import { PrismaClient } from '@prisma/client';
import { mockUser } from './auth-test-helpers';

// Determine test mode based on environment variables
const TEST_MODE = process.env.TEST_MODE || 'mock'; // Options: 'mock', 'real'

let prisma: PrismaClient;

if (TEST_MODE === 'mock') {
  console.info('🧪 Running tests with MOCK database');
  // Explicitly create a mock client
  prisma = {
    user: {
      findUnique: async () => null,
      upsert: async () => mockUser,
      deleteMany: async () => ({ count: 0 }),
    },
    session: {
      findUnique: async () => null,
      upsert: async () => ({ userId: mockUser.id, sessionToken: 'test-session-token', expires: new Date() }),
      deleteMany: async () => ({ count: 0 }),
    },
    account: {
      deleteMany: async () => ({ count: 0 }),
    },
    verificationToken: {
      deleteMany: async () => ({ count: 0 }),
      create: async (data: { data: any }) => data.data,
      findUnique: async (params: { where: { token: string } }) => {
        // For mocking token verification
        if (params.where.token === 'mock-valid-token') {
          return {
            identifier: 'test@example.com',
            token: 'mock-valid-token',
            expires: new Date(Date.now() + 3600000),
          };
        }
        return null;
      },
    },
    $disconnect: async () => {},
  } as unknown as PrismaClient;
} else {
  console.info('🧪 Running tests with REAL database');
  // Use a real Prisma client
  try {
    prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });
  } catch (error) {
    console.error('❌ Failed to initialize Prisma client:', error);
    // Don't mask the error - make it clear there's an issue
    throw new Error('Failed to initialize database for tests. Set TEST_MODE=mock if you want to use mocks.');
  }
}

/**
 * Seed the test database with a test user
 */
export async function seedTestUser() {
  try {
    const user = await prisma.user.upsert({
      where: { id: mockUser.id },
      update: {
        name: mockUser.name,
        email: mockUser.email,
        emailVerified: mockUser.emailVerified,
      },
      create: {
        id: mockUser.id,
        name: mockUser.name,
        email: mockUser.email,
        emailVerified: mockUser.emailVerified,
      },
    });

    return user;
  } catch (error) {
    console.error('Error seeding test user:', error);
    return mockUser;
  }
}

/**
 * Create a mock session in the database for the test user
 */
export async function createTestSession() {
  try {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const session = await prisma.session.upsert({
      where: { 
        sessionToken: 'test-session-token' 
      },
      update: {
        expires: tomorrow,
      },
      create: {
        sessionToken: 'test-session-token',
        userId: mockUser.id,
        expires: tomorrow,
      },
    });

    return session;
  } catch (error) {
    console.error('Error creating test session:', error);
    throw error;
  }
}

/**
 * Clean up the test database
 */
export async function cleanupTestDb() {
  try {
    // Delete in correct order to avoid foreign key constraints
    await prisma.session.deleteMany();
    await prisma.account.deleteMany();
    await prisma.verificationToken.deleteMany();
    await prisma.user.deleteMany();
  } catch (error) {
    console.error('Error cleaning up test database:', error);
    throw error;
  }
}

/**
 * Initialize the test database - run this before all tests
 */
export async function initializeTestDb() {
  try {
    await cleanupTestDb();
    await seedTestUser();
  } catch (error) {
    console.error('Error initializing test database:', error);
    throw error;
  }
}

/**
 * Close database connection - run this after all tests
 */
export async function closePrismaConnection() {
  await prisma.$disconnect();
}

/**
 * Create a verification token for testing
 */
export async function createMockVerificationToken({
  identifier,
  token,
  expires,
}: {
  identifier: string;
  token: string;
  expires: Date;
}) {
  try {
    return await prisma.verificationToken.create({
      data: {
        identifier,
        token,
        expires,
      },
    });
  } catch (error) {
    console.error('Error creating verification token:', error);
    throw error;
  }
}

/**
 * Find a verification token
 */
export async function findVerificationToken({
  identifier,
  token,
}: {
  identifier: string;
  token: string;
}) {
  try {
    return await prisma.verificationToken.findUnique({
      where: {
        token,
      },
    });
  } catch (error) {
    console.error('Error finding verification token:', error);
    return null;
  }
}

/**
 * Delete all verification tokens
 */
export async function deleteVerificationTokens() {
  try {
    return await prisma.verificationToken.deleteMany();
  } catch (error) {
    console.error('Error deleting verification tokens:', error);
    throw error;
  }
} 