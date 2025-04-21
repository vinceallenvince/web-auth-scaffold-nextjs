import { PrismaClient } from '@prisma/client';
import { mockUser } from './auth-test-helpers';

// Create a prisma client instance for testing with error handling
let prisma: PrismaClient;

try {
  prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });
} catch (error) {
  console.warn('Could not initialize Prisma client:', error);
  // Create a mock PrismaClient with no-op methods for tests to run when DB is not available
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
    },
    $disconnect: async () => {},
  } as unknown as PrismaClient;
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