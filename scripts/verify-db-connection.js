#!/usr/bin/env node

/**
 * Supabase Database Connection Verification Script
 * 
 * This script validates the connection to your Supabase PostgreSQL database
 * using Prisma. It's intended to help verify DB-01 setup.
 * 
 * Usage:
 *   node scripts/verify-db-connection.js
 */

require('dotenv').config({ path: '.env.local' });
// Use explicit path to import PrismaClient
const { PrismaClient } = require('../src/generated/prisma');

// ANSI color codes for output formatting
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  bold: '\x1b[1m'
};

console.log(`${colors.bold}========================================${colors.reset}`);
console.log(`${colors.bold}${colors.blue}   Supabase Database Connection Test   ${colors.reset}`);
console.log(`${colors.bold}========================================${colors.reset}\n`);

// Check if DATABASE_URL is defined
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.log(`${colors.red}Error: DATABASE_URL is not defined in .env.local${colors.reset}`);
  console.log(`${colors.yellow}Please add DATABASE_URL to your .env.local file from Supabase connection details${colors.reset}`);
  process.exit(1);
}

// Validate DATABASE_URL format
if (!databaseUrl.startsWith('postgresql://')) {
  console.log(`${colors.red}Error: Invalid DATABASE_URL format${colors.reset}`);
  console.log(`${colors.yellow}DATABASE_URL should start with postgresql://${colors.reset}`);
  console.log(`${colors.yellow}Format: postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/postgres${colors.reset}`);
  process.exit(1);
}

console.log(`${colors.blue}DATABASE_URL found in .env.local${colors.reset}`);
console.log(`${colors.yellow}Attempting to connect to Supabase PostgreSQL database...${colors.reset}\n`);

// Extract connection details (masking the password)
const connectionDetails = databaseUrl.replace(/postgresql:\/\/postgres:([^@]+)@/, 'postgresql://postgres:********@');
console.log(`Connection string: ${connectionDetails}\n`);

// Initialize Prisma client and test connection
let prisma;
try {
  prisma = new PrismaClient();
} catch (error) {
  console.log(`${colors.red}Failed to initialize Prisma Client:${colors.reset}`);
  console.log(`${colors.red}${error.message}${colors.reset}`);
  process.exit(1);
}

async function testConnection() {
  try {
    // Execute a simple query to test the connection
    const result = await prisma.$queryRaw`SELECT NOW() as current_time`;
    
    console.log(`${colors.green}${colors.bold}Connection successful!${colors.reset}`);
    console.log(`${colors.green}Connected to database at: ${result[0].current_time}${colors.reset}\n`);
    
    // Check for any existing tables
    const tablesResult = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `;
    
    if (tablesResult.length > 0) {
      console.log(`${colors.blue}${colors.bold}Existing tables in the database:${colors.reset}`);
      tablesResult.forEach((table) => {
        console.log(`- ${table.table_name}`);
      });
    } else {
      console.log(`${colors.yellow}No tables found in the database.${colors.reset}`);
      console.log(`${colors.yellow}This is expected if you haven't run DB-02 yet.${colors.reset}`);
    }
    
    console.log(`\n${colors.green}${colors.bold}Verification complete!${colors.reset}`);
    console.log(`${colors.green}Your Supabase PostgreSQL database is correctly configured.${colors.reset}`);
    console.log(`${colors.blue}You can now proceed with DB-02: Prisma Schema Configuration.${colors.reset}`);
    
    return true;
  } catch (error) {
    console.log(`${colors.red}${colors.bold}Connection failed!${colors.reset}`);
    console.log(`${colors.red}Error: ${error.message}${colors.reset}\n`);
    
    console.log(`${colors.yellow}${colors.bold}Troubleshooting tips:${colors.reset}`);
    console.log(`${colors.yellow}1. Verify your DATABASE_URL is correct in .env.local${colors.reset}`);
    console.log(`${colors.yellow}2. Check if your Supabase project is active (not paused)${colors.reset}`);
    console.log(`${colors.yellow}3. Ensure your IP address is allowed in Supabase IP restrictions${colors.reset}`);
    console.log(`${colors.yellow}4. Verify the database password is correct${colors.reset}`);
    
    return false;
  } finally {
    // Disconnect from the database
    await prisma.$disconnect();
  }
}

// Run the test
testConnection()
  .then(success => {
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.log(`${colors.red}Unexpected error: ${error.message}${colors.reset}`);
    process.exit(1);
  }); 