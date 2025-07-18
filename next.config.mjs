/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Completely turn the indicator off
  devIndicators: false,
  
  // Configure environment-specific settings
  /*
  env: {
    APP_ENV: process.env.NODE_ENV || 'development',
    // Disable Next.js telemetry and development toast
    NEXT_TELEMETRY_DISABLED: '1',
    NEXT_DISABLE_NOTIFICATIONS: '1'
  },
  */
  
  // Handle environment-specific logging and features
  onDemandEntries: {
    // Maximum time to keep idle entries in cache (in ms)
    maxInactiveAge: 60 * 60 * 1000,
    // Number of pages to keep in memory
    pagesBufferLength: 5,
  },
};

// Note: Environment validation is performed before build via npm script
// See package.json "build" script and scripts/validate-env.js

export default nextConfig; 