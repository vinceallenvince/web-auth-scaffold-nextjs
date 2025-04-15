# Verifying Supabase PostgreSQL Connection

This guide provides multiple methods to verify your Supabase PostgreSQL database connection as required in DB-01.

## Method 1: Using Supabase Dashboard

The simplest way to verify your connection is directly through the Supabase dashboard:

1. Log in to your Supabase account at [https://app.supabase.io/](https://app.supabase.io/)
2. Select your project
3. Navigate to **SQL Editor** in the left sidebar
4. Run a simple query to test the connection:
   ```sql
   SELECT NOW();
   ```
5. If you see the current timestamp returned, your connection is working

## Method 2: Using Prisma CLI

You can use Prisma CLI to verify the connection using the DATABASE_URL in your .env.local file:

1. Make sure your .env.local file has the correct DATABASE_URL from Supabase:
   ```
   DATABASE_URL=postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/postgres
   ```

2. Run the Prisma introspection command to test the connection:
   ```bash
   # Using pnpm
   pnpm prisma db pull

   # Using npm-to-pnpm helper
   node scripts/npm-to-pnpm.js prisma db pull

   # Using npx directly
   npx prisma db pull
   ```

3. If the command completes without errors, your connection is working

## Method 3: Using a PostgreSQL Client

You can use a dedicated PostgreSQL client to verify connection with the credentials from Supabase:

### Using pgAdmin (GUI Client)

1. Download and install [pgAdmin](https://www.pgadmin.org/download/)
2. Create a new server connection with the following details:
   - **Host**: Find in your Supabase connection string (after the @ symbol)
   - **Port**: Usually 5432 or 6543 for Supabase
   - **Username**: Usually "postgres" for Supabase
   - **Password**: The password you set when creating the Supabase project
   - **Database**: "postgres"

3. Test the connection and save if successful

### Using psql (Command Line)

1. Ensure PostgreSQL client tools are installed on your system
2. Parse the connection details from your DATABASE_URL
3. Connect using the psql command:
   ```bash
   psql -h [HOST] -p [PORT] -U postgres -d postgres
   ```
4. When prompted, enter your database password
5. If you get a postgres prompt (`postgres=#`), your connection is working

### Using Database Connection URL Directly

1. Parse your full connection string from Supabase
2. Use psql with the full connection string:
   ```bash
   psql "postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/postgres"
   ```

## Method 4: Testing with the Supabase JS Client

If you're using the Supabase JavaScript client in your project:

1. Create a test script, e.g., `scripts/test-supabase.js`:

```javascript
// scripts/test-supabase.js
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_ANON_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    // Test a simple query
    const { data, error } = await supabase
      .from('_prisma_migrations')
      .select('*')
      .limit(1);
    
    if (error) throw error;
    
    console.log('Successfully connected to Supabase PostgreSQL database!');
    console.log('Sample data:', data);
    return true;
  } catch (error) {
    console.error('Connection failed:', error.message);
    return false;
  }
}

testConnection();
```

2. Install the Supabase JS client if needed:
   ```bash
   npm install @supabase/supabase-js dotenv
   ```

3. Run the test script:
   ```bash
   node scripts/test-supabase.js
   ```

## Troubleshooting Connection Issues

### IP Restrictions
- Supabase may have IP restrictions enabled
- Make sure your current IP address is allowed in the Supabase dashboard
- For development, you might want to allow all IPs or just your development IP

### Connection String Format
- Double check the formatting of your connection string
- Format should be: `postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/postgres`
- Ensure password is properly URL encoded if it contains special characters

### SSL Requirements
- Supabase requires SSL for connections
- If using a client that requires explicit SSL configuration, ensure it's enabled

### Database Status
- Check if your Supabase project is active (not paused)
- Free tier projects may be automatically paused after inactivity

### Authentication Issues
- Verify that you're using the correct password
- Try resetting the database password in Supabase dashboard if necessary

## Next Steps After Verification

Once you've verified that your connection is working:

1. Proceed with DB-02: Prisma Schema Configuration
2. Document your connection details securely
3. Set up environment variables for CI/CD if needed 