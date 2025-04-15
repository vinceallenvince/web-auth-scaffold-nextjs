# PNPM Troubleshooting Guide

## Common Issues

### SETUP-04 Verification Issue

If you're experiencing issues with PNPM commands not executing correctly during SETUP-04 verification, follow these steps to resolve them:

#### Immediate Solution: Use NPM Instead

A temporary helper script has been provided to use NPM commands while preserving PNPM command syntax:

```bash
# Run development server
node scripts/npm-to-pnpm.js dev

# Install dependencies
node scripts/npm-to-pnpm.js install

# Add a new package
node scripts/npm-to-pnpm.js add package-name

# Help with available commands
node scripts/npm-to-pnpm.js --help
```

#### Verify Registry Configuration

1. Check if you have a `.npmrc` file in your project root with the correct registry:
   ```
   registry=https://registry.npmjs.org/
   ```

2. If you're behind a corporate proxy or firewall, you may need to configure PNPM to use the proper registry:
   ```bash
   pnpm config set registry https://registry.npmjs.org/
   ```

#### Check PNPM Installation

1. Verify PNPM is installed globally:
   ```bash
   pnpm --version
   ```

2. If not found, install it:
   ```bash
   npm install -g pnpm
   ```

3. If you're behind a corporate proxy, use:
   ```bash
   npm install -g pnpm --registry=https://registry.npmjs.org/
   ```

#### Clear PNPM Cache

Sometimes cached data can cause issues:

```bash
pnpm store prune
```

## Advanced Troubleshooting

### Path Issues

1. Check if PNPM is in your PATH:
   ```bash
   which pnpm
   # or on Windows
   where pnpm
   ```

2. If not found, add it to your PATH:
   - macOS/Linux: Add to ~/.bash_profile or ~/.zshrc
     ```
     export PATH="$HOME/.local/share/pnpm:$PATH"
     ```
   - Windows: Add the PNPM installation location to your system PATH

### Node.js Version Compatibility

1. Verify your Node.js version:
   ```bash
   node --version
   ```

2. Ensure you're using Node.js v18+ as required by the project

### Lockfile Issues

If you've switched between npm and pnpm, you might have conflicting lockfiles:

1. Remove existing lockfiles:
   ```bash
   rm package-lock.json pnpm-lock.yaml
   ```

2. Clear node_modules:
   ```bash
   rm -rf node_modules
   ```

3. Reinstall with your preferred package manager:
   ```bash
   pnpm install
   # or
   npm install
   ```

## Reporting Issues

If you continue to experience issues after trying these solutions:

1. Document the specific error messages
2. Note your environment details (OS, Node version, PNPM version)
3. Create an issue in the project repository with this information
4. In the meantime, continue using the npm-to-pnpm.js helper script to unblock your work 