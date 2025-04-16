/**
 * Script to test database connection using the Supabase connection pooler
 * 
 * This script attempts to connect to the database using the connection pooler URL
 * defined in the .env.local or .env file and performs a simple query to verify connectivity.
 * 
 * Run with: node scripts/test-pooler-connection.js
 */

require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');

// Check if we have a DATABASE_URL
if (!process.env.DATABASE_URL) {
  console.error('❌ Error: DATABASE_URL not found in environment variables');
  console.error('Please ensure you have a .env.local file with a valid DATABASE_URL');
  process.exit(1);
}

// Check if the URL contains pooler.supabase.com
if (!process.env.DATABASE_URL.includes('pooler.supabase.com')) {
  console.warn('⚠️ Warning: Your DATABASE_URL does not appear to be using the Supabase connection pooler.');
  console.warn('This may lead to connection issues if you are connecting from an IPv4 network.');
  console.warn('Recommended format: postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres');
}

// Initialize Prisma client
const prisma = new PrismaClient();

// Attempt to connect and run a simple query
async function testConnection() {
  console.log('🔄 Testing connection to database using connection pooler...');
  
  try {
    // Simple query to test connection
    const result = await prisma.$queryRaw`SELECT 1 as result`;
    
    console.log('✅ Connection successful!');
    console.log('Database response:', result);
    
    // Check if we can query database version
    try {
      const version = await prisma.$queryRaw`SELECT version()`;
      console.log('Database version:', version[0].version);
    } catch (versionError) {
      // This is not critical, so we just log it
      console.log('Could not query database version, but connection is working.');
    }
    
  } catch (error) {
    console.error('❌ Connection failed:');
    console.error(error);
    
    // Provide helpful troubleshooting tips
    console.log('\n📋 Troubleshooting tips:');
    console.log('1. Verify your DATABASE_URL is using the Supabase connection pooler format');
    console.log('2. Check your database password is correct');
    console.log('3. Ensure your IP is allowed in Supabase project settings');
    console.log('4. Refer to docs/troubleshooting/database-connection.md for more help');
    
    process.exit(1);
  } finally {
    // Always disconnect the client
    await prisma.$disconnect();
  }
}

// Run the test
testConnection(); 