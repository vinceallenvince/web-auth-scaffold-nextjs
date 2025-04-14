#!/usr/bin/env node

/**
 * This script validates that all required environment variables are set properly.
 * It's used in the build process to fail fast if environment is misconfigured.
 */

// Load environment variables from .env.local file
const { config } = require('dotenv');
const { resolve } = require('path');

// Load from .env.local (priority) and .env (fallback)
config({ path: resolve(process.cwd(), '.env.local') });
config({ path: resolve(process.cwd(), '.env') });

// Log environment variables for debugging (without sensitive values)
if (process.env.DEBUG) {
  console.log('Environment variables loaded:');
  console.log('  DATABASE_URL:', process.env.DATABASE_URL ? '[CONFIGURED]' : 'undefined');
  console.log('  NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET ? '[CONFIGURED]' : 'undefined');
  console.log('  NEXTAUTH_URL:', process.env.NEXTAUTH_URL);
  console.log('  SENDGRID_API_KEY:', process.env.SENDGRID_API_KEY ? '[CONFIGURED]' : 'undefined');
  console.log('  EMAIL_FROM:', process.env.EMAIL_FROM);
}

try {
  // Use Node.js require to load TypeScript directly via tsx
  const { validateEnv } = require('../src/lib/env.ts');
  
  // Run validation
  validateEnv();
  console.log('✅ Environment validation passed');
  process.exit(0);
} catch (error) {
  console.error('🚨 Environment validation failed:');
  
  if (error instanceof Error) {
    console.error(`   ${error.message}`);
  } else {
    console.error('   An unknown error occurred');
  }
  
  console.error();
  console.error('Please check your .env.local file and ensure all required variables are set correctly.');
  console.error('See .env.example for required variables and format.');
  
  // Exit with error code
  process.exit(1);
} 