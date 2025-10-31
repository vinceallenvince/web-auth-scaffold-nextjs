import { PrismaClient } from '@/generated/prisma';

/**
 * Global Prisma Client instance for database operations
 * 
 * This singleton pattern prevents connection exhaustion in development by reusing
 * the same PrismaClient instance across hot reloads. In production, a new instance
 * is created for each deployment.
 * 
 * @example
 * ```typescript
 * import { prisma } from '@/lib/prisma';
 * 
 * // Query users
 * const users = await prisma.user.findMany();
 * 
 * // Create a session
 * const session = await prisma.session.create({
 *   data: { sessionToken, userId, expires }
 * });
 * ```
 * 
 * @see {@link https://pris.ly/d/help/next-prisma-client-js} - Next.js Prisma best practices
 */
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma; 