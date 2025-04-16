# Connecting to Supabase PostgreSQL

This guide covers how to properly connect to your Supabase PostgreSQL database, with a focus on using the connection pooler for reliable connectivity.

## Background: IPv4 vs IPv6 Compatibility

Supabase's direct database connections (using the `db.{ref}.supabase.co` hostname) may only be accessible over IPv6 networks. However, many development environments primarily use IPv4 networking, which can lead to connection issues such as:

- DNS resolution errors
- Connection timeouts
- "Host not found" errors

## Solution: Use the Connection Pooler

Supabase provides a connection pooler that is compatible with IPv4 networks. This is the recommended approach for connecting to your Supabase database from external applications like Prisma ORM.

### Benefits of Using the Connection Pooler

1. **IPv4 Compatibility**: Works with standard IPv4 networks, which most development environments use
2. **Connection Management**: Efficiently handles pooling and reuse of database connections
3. **Reliability**: More consistent connections for external applications
4. **Performance**: Can reduce connection overhead for frequent database operations

## Finding Your Connection Pooler URL

1. Log into your [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Navigate to Project Settings > Database
4. Scroll down to the "Connection Pooling" section
5. Copy the "Connection string" URI

The connection pooler URL format looks like this:
```
postgresql://postgres.{project-ref}:{password}@aws-0-{region}.pooler.supabase.com:5432/postgres
```

## Setting Up Your Environment

1. Open your `.env.local` file (or create one if it doesn't exist)
2. Add or update your `DATABASE_URL` variable with the connection pooler URL:
   ```
   DATABASE_URL="postgresql://postgres.{project-ref}:{password}@aws-0-{region}.pooler.supabase.com:5432/postgres"
   ```
3. Replace `{project-ref}`, `{password}`, and `{region}` with your actual project values

## Testing the Connection

You can test your connection using our included script:

```bash
npm run test-db-pooler
# or using pnpm
pnpm test-db-pooler
```

This script will:
- Check if your connection string uses the pooler format
- Attempt to connect to the database
- Run a simple query to verify functionality
- Provide troubleshooting tips if the connection fails

## Troubleshooting Connection Issues

If you still encounter issues connecting to your Supabase database:

1. **Verify your connection string**:
   - Check for typos in your project reference, password, or region
   - Ensure the password doesn't contain special characters that need URL encoding

2. **Check network restrictions**:
   - Some corporate networks may block outgoing PostgreSQL connections
   - Try connecting from a different network or using a VPN

3. **Supabase project settings**:
   - Verify if your project has IP restrictions enabled
   - Check if your current IP is allowed in the Supabase dashboard

4. **Upgrade plan if needed**:
   - Free tier Supabase projects may have more restrictions on external connections
   - Consider upgrading to a paid plan for production use

## Additional Resources

- [Supabase Connection Pooling Documentation](https://supabase.com/docs/guides/database/connection-pooling)
- [Prisma with Supabase Guide](https://www.prisma.io/docs/orm/overview/databases/supabase)
- [Troubleshooting Database Connections](../troubleshooting/database-connection.md) 