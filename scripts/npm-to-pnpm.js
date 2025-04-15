#!/usr/bin/env node

/**
 * NPM to PNPM Command Helper
 * 
 * This script helps translate npm commands to pnpm commands for SETUP-04 verification.
 * It's a temporary solution to unblock development when pnpm is not working correctly.
 * 
 * Usage:
 *   node scripts/npm-to-pnpm.js [command]
 * 
 * Examples:
 *   node scripts/npm-to-pnpm.js dev        => runs: npm run dev
 *   node scripts/npm-to-pnpm.js install    => runs: npm install
 *   node scripts/npm-to-pnpm.js add react  => runs: npm install react
 */

const { spawn } = require('child_process');
const commandMap = {
  // Basic mappings
  'install': 'install',
  'i': 'install',
  'add': 'install',
  'rm': 'uninstall',
  'remove': 'uninstall',
  'uninstall': 'uninstall',
  'run': 'run',
  'exec': 'exec',
  
  // Common script commands (for convenience)
  'dev': 'run dev',
  'build': 'run build',
  'start': 'run start', 
  'lint': 'run lint',
  'test': 'run test',
  'validate-env': 'run validate-env',
  
  // Special cases for Prisma
  'prisma': 'exec prisma',
  'db:push': 'exec prisma db push',
  'db:seed': 'exec prisma db seed',
};

const args = process.argv.slice(2);

if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
  console.log('\nNPM to PNPM Command Helper');
  console.log('-------------------------');
  console.log('Usage: node scripts/npm-to-pnpm.js [command]');
  console.log('\nAvailable command mappings:');
  Object.keys(commandMap).forEach(cmd => {
    console.log(`  ${cmd} => npm ${commandMap[cmd]}`);
  });
  console.log('\nExamples:');
  console.log('  node scripts/npm-to-pnpm.js dev        => runs: npm run dev');
  console.log('  node scripts/npm-to-pnpm.js add react  => runs: npm install react');
  process.exit(0);
}

// Extract the command and any arguments
const command = args[0];
const commandArgs = args.slice(1);

// Map pnpm command to npm equivalent
let npmCommand = 'npm';
let npmArgs = [];

if (commandMap[command]) {
  // Handle mapped commands
  const mappedCommand = commandMap[command].split(' ');
  npmArgs = [...mappedCommand, ...commandArgs];
} else {
  // Fallback for unmapped commands
  npmArgs = ['run', command, ...commandArgs];
}

console.log(`🔄 Converting: pnpm ${args.join(' ')}`);
console.log(`🚀 Running: ${npmCommand} ${npmArgs.join(' ')}`);

// Run the npm command
const child = spawn(npmCommand, npmArgs, { stdio: 'inherit' });

child.on('close', (code) => {
  if (code !== 0) {
    console.error(`\n❌ Command failed with exit code ${code}`);
    process.exit(code);
  }
  console.log('\n✅ Command completed successfully');
}); 