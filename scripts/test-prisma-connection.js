#!/usr/bin/env node

/**
 * Prisma Connection Test Script for DB-02
 * 
 * This script tests the connection to Supabase using Prisma,
 * explicitly loading environment variables from .env.local
 */

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

// Import the PrismaClient from the generated location
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
console.log(`${colors.bold}${colors.blue}   Prisma - Supabase Connection Test   ${colors.reset}`);
console.log(`${colors.bold}========================================${colors.reset}\n`);

// Check DATABASE_URL
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.log(`${colors.red}Error: DATABASE_URL not found in .env.local${colors.reset}`);
  process.exit(1);
}

// Mask the connection string for display (this could expose part of the password if it contains special characters)
const maskedUrl = databaseUrl.replace(/postgresql:\/\/([^:]+):([^@]+)@/, 'postgresql://$1:********@');
console.log(`${colors.blue}Using database URL:${colors.reset} ${maskedUrl}\n`);

// Initialize PrismaClient
const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log(`${colors.yellow}Testing connection...${colors.reset}`);
    
    // Test with a simple query that should work on any PostgreSQL database
    const result = await prisma.$queryRaw`SELECT current_timestamp as time, current_database() as database, current_user as user`;
    
    console.log(`${colors.green}${colors.bold}Connection successful!${colors.reset}\n`);
    console.log(`${colors.green}Server time: ${result[0].time}${colors.reset}`);
    console.log(`${colors.green}Database: ${result[0].database}${colors.reset}`);
    console.log(`${colors.green}User: ${result[0].user}${colors.reset}\n`);
    
    // Check if we can access the database schema
    console.log(`${colors.yellow}Checking database schema...${colors.reset}`);
    
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `;
    
    if (tables.length > 0) {
      console.log(`${colors.green}Found ${tables.length} tables in database:${colors.reset}`);
      tables.forEach(table => {
        console.log(`- ${table.table_name}`);
      });
    } else {
      console.log(`${colors.yellow}No tables found in database.${colors.reset}`);
      console.log(`${colors.yellow}This is expected if you haven't pushed the schema yet.${colors.reset}`);
    }
    
    console.log(`\n${colors.green}${colors.bold}Verification complete!${colors.reset}`);
    console.log(`${colors.green}Prisma can successfully connect to your Supabase database.${colors.reset}`);
    console.log(`${colors.blue}You can now proceed with pushing your schema using:${colors.reset}`);
    console.log(`${colors.blue}npx prisma db push${colors.reset}`);
    
    return true;
  } catch (error) {
    console.log(`${colors.red}${colors.bold}Connection failed!${colors.reset}`);
    console.log(`${colors.red}Error: ${error.message}${colors.reset}\n`);
    
    console.log(`${colors.yellow}${colors.bold}Troubleshooting tips:${colors.reset}`);
    console.log(`${colors.yellow}1. Check if your Supabase database is active and not paused${colors.reset}`);
    console.log(`${colors.yellow}2. Verify your DATABASE_URL in .env and .env.local is correct${colors.reset}`);
    console.log(`${colors.yellow}3. Ensure your database password is correct${colors.reset}`);
    console.log(`${colors.yellow}4. Check if your IP address is allowed in Supabase${colors.reset}`);
    
    return false;
  } finally {
    // Disconnect Prisma client
    await prisma.$disconnect();
  }
}

// Run the test
testConnection()
  .then(success => {
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('Unexpected error:', error);
    process.exit(1);
  }); 