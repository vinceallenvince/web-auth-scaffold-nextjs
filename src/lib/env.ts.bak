import { z } from 'zod';

// Define schema for environment variables with strict typing
const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url('Invalid DATABASE_URL'),
  
  // NextAuth
  NEXTAUTH_SECRET: z.string().min(1, 'NEXTAUTH_SECRET is required'),
  NEXTAUTH_URL: z.string().url('Invalid NEXTAUTH_URL'),
  
  // Email
  SENDGRID_API_KEY: z.string().min(1, 'SENDGRID_API_KEY is required'),
  EMAIL_FROM: z.string().email('Invalid EMAIL_FROM address'),
});

// Define the type for validated env
type ValidatedEnv = z.infer<typeof envSchema>;

/**
 * Validates environment variables against the defined schema
 * @returns The validated environment variables
 * @throws Error if validation fails
 */
export function validateEnv(): ValidatedEnv {
  try {
    // Parse and validate environment variables
    const result = envSchema.safeParse({
      DATABASE_URL: process.env.DATABASE_URL,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
      EMAIL_FROM: process.env.EMAIL_FROM,
    });

    if (!result.success) {
      console.error('❌ Invalid environment variables:');
      const formattedErrors = result.error.format();
      
      Object.entries(formattedErrors)
        .filter(([key]) => key !== '_errors')
        .forEach(([key, error]) => {
          if (error && '_errors' in error && Array.isArray(error._errors)) {
            error._errors.forEach((err: string) => console.error(`  ${key}: ${err}`));
          }
        });

      throw new Error('Invalid environment variables, check server logs for more details.');
    }

    return result.data;
  } catch (err) {
    // Log and rethrow the error
    if (err instanceof Error) {
      console.error('❌ Environment validation failed:', err.message);
    } else {
      console.error('❌ Environment validation failed with unknown error');
    }
    throw err;
  }
}

// Export environment schema for type augmentation
export type Env = z.infer<typeof envSchema>;

// Augment the ProcessEnv interface using module augmentation instead of namespace
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    // Define specific properties required in ProcessEnv
    interface ProcessEnv {
      DATABASE_URL: string;
      NEXTAUTH_SECRET: string;
      NEXTAUTH_URL: string;
      SENDGRID_API_KEY: string;
      EMAIL_FROM: string;
    }
  }
}

// Allow this module to be executed directly
if (require.main === module) {
  try {
    validateEnv();
    console.log('✅ Environment validation passed');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_err) {
    // Error is already logged in validateEnv
    console.error('🚨 Environment validation failed. Application cannot start.');
    console.error('   Please check your environment variables and try again.');
    process.exit(1);
  }
} 