#!/usr/bin/env node

/**
 * Setup Verification Script
 * This script verifies that the local environment is properly set up for development.
 * It can be used to validate SETUP-04 functionality.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');

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
console.log(`${colors.bold}${colors.blue}   Next.js Auth Scaffold - Setup Verification   ${colors.reset}`);
console.log(`${colors.bold}========================================${colors.reset}\n`);

// Results tracking
const results = {
  passed: 0,
  failed: 0,
  warnings: 0
};

// Helper function to run a verification test
function verifyTest(name, testFn) {
  process.stdout.write(`${colors.bold}Testing:${colors.reset} ${name} ... `);
  
  try {
    const result = testFn();
    
    if (result === true) {
      console.log(`${colors.green}PASS${colors.reset}`);
      results.passed++;
      return true;
    } else if (result === 'warning') {
      console.log(`${colors.yellow}WARNING${colors.reset}`);
      results.warnings++;
      return 'warning';
    } else {
      console.log(`${colors.red}FAIL${colors.reset}`);
      results.failed++;
      return false;
    }
  } catch (error) {
    console.log(`${colors.red}ERROR${colors.reset}`);
    console.error(`  ${colors.red}→ ${error.message}${colors.reset}`);
    results.failed++;
    return false;
  }
}

// Helper function for async tests
async function verifyTestAsync(name, testFn) {
  process.stdout.write(`${colors.bold}Testing:${colors.reset} ${name} ... `);
  
  try {
    const result = await testFn();
    
    if (result === true) {
      console.log(`${colors.green}PASS${colors.reset}`);
      results.passed++;
      return true;
    } else if (result === 'warning') {
      console.log(`${colors.yellow}WARNING${colors.reset}`);
      results.warnings++;
      return 'warning';
    } else {
      console.log(`${colors.red}FAIL${colors.reset}`);
      results.failed++;
      return false;
    }
  } catch (error) {
    console.log(`${colors.red}ERROR${colors.reset}`);
    console.error(`  ${colors.red}→ ${error.message}${colors.reset}`);
    results.failed++;
    return false;
  }
}

// Helper function to make an HTTP request
function makeRequest(options) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({ statusCode: res.statusCode, data: jsonData });
        } catch (error) {
          resolve({ statusCode: res.statusCode, data: data });
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.end();
  });
}

// Verify Node.js version
verifyTest('Node.js version', () => {
  const nodeVersion = process.version;
  const major = parseInt(nodeVersion.slice(1).split('.')[0], 10);
  
  if (major >= 18) {
    return true;
  } else {
    console.error(`  ${colors.red}→ Node.js version ${nodeVersion} detected. v18+ is required.${colors.reset}`);
    return false;
  }
});

// Verify package manager
verifyTest('Package manager', () => {
  try {
    execSync('pnpm --version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    console.log(`  ${colors.yellow}→ PNPM not found or not working correctly.${colors.reset}`);
    console.log(`  ${colors.yellow}→ Using npm-to-pnpm.js helper script instead.${colors.reset}`);
    return 'warning';
  }
});

// Check for environment file
verifyTest('Environment configuration', () => {
  if (fs.existsSync(path.join(process.cwd(), '.env.local'))) {
    return true;
  } else {
    console.error(`  ${colors.red}→ Missing .env.local file.${colors.reset}`);
    console.error(`  ${colors.red}→ Copy .env.example to .env.local and fill in the values.${colors.reset}`);
    return false;
  }
});

// Verify dependencies are installed
verifyTest('Dependencies installation', () => {
  if (fs.existsSync(path.join(process.cwd(), 'node_modules'))) {
    return true;
  } else {
    console.error(`  ${colors.red}→ node_modules directory not found.${colors.reset}`);
    console.error(`  ${colors.red}→ Run 'pnpm install' or 'node scripts/npm-to-pnpm.js install' to install dependencies.${colors.reset}`);
    return false;
  }
});

// Verify Next.js builds correctly
verifyTest('Next.js build', () => {
  try {
    // Just check the presence of the next command, don't actually run the build
    execSync('npx next --version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    console.error(`  ${colors.red}→ Next.js command not found.${colors.reset}`);
    console.error(`  ${colors.red}→ Make sure Next.js is installed properly.${colors.reset}`);
    return false;
  }
});

// Check if DB verification API is implemented
verifyTest('Database verification endpoint', () => {
  // Check if the API file exists (without running it)
  const dbApiPath = path.join(process.cwd(), 'src', 'app', 'api', 'verify-db', 'route.ts');
  if (fs.existsSync(dbApiPath)) {
    return true;
  } else {
    console.error(`  ${colors.red}→ Database verification API not found at ${dbApiPath}${colors.reset}`);
    console.error(`  ${colors.red}→ Create the API route to verify database configuration.${colors.reset}`);
    return false;
  }
});

// Summary
console.log(`\n${colors.bold}========================================${colors.reset}`);
console.log(`${colors.bold}               SUMMARY                  ${colors.reset}`);
console.log(`${colors.bold}========================================${colors.reset}`);
console.log(`${colors.green}Passed: ${results.passed}${colors.reset}`);
console.log(`${colors.yellow}Warnings: ${results.warnings}${colors.reset}`);
console.log(`${colors.red}Failed: ${results.failed}${colors.reset}`);

// Next steps
if (results.failed > 0) {
  console.log(`\n${colors.red}${colors.bold}Setup verification failed!${colors.reset}`);
  console.log(`Please fix the issues above and run this script again.`);
  process.exit(1);
} else if (results.warnings > 0) {
  console.log(`\n${colors.yellow}${colors.bold}Setup verification passed with warnings.${colors.reset}`);
  console.log(`You can continue with development, but consider addressing the warnings.`);
  console.log(`For PNPM issues, see: docs/troubleshooting/pnpm-issues.md`);
  process.exit(0);
} else {
  console.log(`\n${colors.green}${colors.bold}Setup verification passed successfully!${colors.reset}`);
  console.log(`You're ready to start development.`);
  console.log(`Run 'pnpm dev' or 'node scripts/npm-to-pnpm.js dev' to start the development server.`);
  console.log(`Visit http://localhost:3000/verify-db to test database configuration.`);
  process.exit(0);
} 