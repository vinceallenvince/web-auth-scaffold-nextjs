import { NextResponse } from 'next/server';

/**
 * API Route: /api/verify-db
 * 
 * This endpoint verifies that database configuration is properly set up
 * without actually connecting to the database.
 * 
 * SETUP-04: This is a placeholder until DB-01 (Supabase Project Setup) is completed.
 * It checks that environment variables are configured correctly but doesn't 
 * attempt an actual database connection.
 */
export async function GET() {
  try {
    // Check if DATABASE_URL is defined
    const dbUrl = process.env.DATABASE_URL;
    
    if (!dbUrl) {
      return NextResponse.json(
        { 
          success: false, 
          status: 'configuration_missing',
          message: 'DATABASE_URL environment variable is not defined',
          nextSteps: 'Complete the DB-01 task and configure .env.local with proper DATABASE_URL' 
        }, 
        { status: 400 }
      );
    }
    
    // Validate that DATABASE_URL has a proper format without connecting
    // Just basic validation here - we don't connect until DB-01 is complete
    if (!dbUrl.startsWith('postgresql://')) {
      return NextResponse.json(
        { 
          success: false, 
          status: 'configuration_invalid',
          message: 'DATABASE_URL has invalid format. Should start with postgresql://',
          nextSteps: 'Update .env.local with proper Supabase connection string after completing DB-01' 
        }, 
        { status: 400 }
      );
    }
    
    // Check that other required environment variables are present
    const requiredEnvVars = [
      'NEXTAUTH_SECRET',
      'NEXTAUTH_URL',
    ];
    
    const missingVars = requiredEnvVars.filter(name => !process.env[name]);
    
    if (missingVars.length > 0) {
      return NextResponse.json(
        {
          success: false,
          status: 'environment_incomplete',
          message: `Missing required environment variables: ${missingVars.join(', ')}`,
          nextSteps: 'Update .env.local with all required environment variables'
        },
        { status: 400 }
      );
    }
    
    // All checks passed
    return NextResponse.json(
      {
        success: true,
        status: 'ready_for_connection',
        message: 'Database configuration is properly set up',
        nextSteps: 'Proceed with DB-01 to set up actual Supabase project'
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in DB verification endpoint:', error);
    
    return NextResponse.json(
      {
        success: false,
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        nextSteps: 'Check server logs for more details'
      },
      { status: 500 }
    );
  }
} 