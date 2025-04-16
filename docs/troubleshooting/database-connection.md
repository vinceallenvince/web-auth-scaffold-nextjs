# Database Connection Troubleshooting

## Common Connection Issues

### IPv4 Compatibility with Supabase

When connecting to Supabase PostgreSQL databases from external applications, you may encounter the following issue:

**Problem**: Direct connection to Supabase PostgreSQL fails with DNS resolution or connection timeout errors.

**Cause**: Supabase's direct database connections (`db.{ref}.supabase.co`) may only be accessible over IPv6 networks, while many development environments use IPv4.

**Solution**: Use Supabase's connection pooler instead of direct connection.

## Using the Connection Pooler

Supabase provides a connection pooler that works with IPv4 networks. This is the recommended approach for connecting to Supabase from external applications like Prisma.

### Connection String Format

```
postgresql://postgres.{project-ref}:{password}@aws-0-{region}.pooler.supabase.com:5432/postgres
```

Where:
- `{project-ref}` is your Supabase project reference (found in the project URL)
- `{password}` is your database password
- `{region}` is the region where your Supabase project is hosted (e.g., us-east-1)

### Where to Find the Connection Pooler URL

1. Open your Supabase dashboard
2. Go to Project Settings > Database
3. Look for "Connection pooling" section
4. Copy the "Connection string" from the "URI" field

### Benefits of the Connection Pooler

1. **IPv4 Compatibility**: Works with IPv4 networks, which is essential for many development environments
2. **Connection Management**: Efficiently manages database connections
3. **Improved Stability**: Can provide more reliable connections than direct database access

## Troubleshooting Steps

If you're still experiencing connection issues:

1. **Verify the connection string format**:
   - Make sure you're using the pooler URL, not the direct connection
   - Check that all parts of the URL are correct (username, project reference, password, host)

2. **Test with a simple connection script**:
   ```js
   // scripts/test-db-connection.js
   const { PrismaClient } = require('@prisma/client');
   const prisma = new PrismaClient();

   async function testConnection() {
     try {
       const result = await prisma.$queryRaw`SELECT 1 as result`;
       console.log('Connection successful:', result);
     } catch (error) {
       console.error('Connection failed:', error);
     } finally {
       await prisma.$disconnect();
     }
   }

   testConnection();
   ```

3. **Check firewall settings**:
   - Some networks may block outgoing connections to PostgreSQL ports
   - Try connecting from a different network if possible

4. **Supabase free plan limitations**:
   - Free tier projects may have more restrictions on external connections
   - Consider upgrading to a paid plan for production use

5. **Use the Supabase SQL Editor**:
   - If direct connections consistently fail, you can use the Supabase SQL Editor in the dashboard
   - This is useful for running migrations or queries when external connections aren't working

## Further Resources

- [Supabase Connection Pooling Documentation](https://supabase.com/docs/guides/database/connection-pooling)
- [Prisma with Supabase Guide](https://www.prisma.io/docs/orm/overview/databases/supabase) 