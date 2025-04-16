# DB-02: Prisma Schema Configuration Guide

This guide provides detailed instructions for configuring Prisma with Supabase for DB-02 of the implementation plan.

## Overview

DB-02 focuses on setting up Prisma ORM with the appropriate schema for authentication and application data. This involves:

1. Initializing Prisma
2. Configuring the PostgreSQL provider
3. Defining authentication models
4. Setting up proper relations

## Prisma Schema Configuration

### Step 1: Initialize Prisma (Already Done)

Prisma has already been initialized in this project. The `prisma` directory contains the initial schema file.

### Step 2: Configure PostgreSQL Provider

The `schema.prisma` file has been updated with the PostgreSQL provider:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
  output   = "../src/generated/prisma"
}
```

### Step 3: Define Authentication Models

The authentication models required by Auth.js have been added to the schema:

```prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  accounts      Account[]
  sessions      Session[]
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}
```

### Step 4: Ensuring Connection with Supabase Database

#### Important Notes About Supabase Connectivity

When connecting Prisma directly to Supabase, there are several considerations:

1. **SQL Editor vs. Direct Connection**:
   - The SQL Editor in the Supabase dashboard works within Supabase's ecosystem
   - Direct external connections from tools like Prisma require proper network access

2. **Free Tier Limitations**:
   - Free tier Supabase projects may have limitations on external connections
   - Projects can be paused automatically after periods of inactivity

3. **Connection String Format**:
   - The connection string must be properly formatted with URL-encoded special characters
   - For passwords with special characters like `#`, `$`, `&`, etc., these must be encoded

4. **Network Access**:
   - Supabase may restrict direct database connections to protect the database
   - Check Supabase documentation for network connectivity requirements

#### Alternative Approaches for DB-02

If you're experiencing persistent connection issues with Supabase from Prisma directly, consider these approaches:

1. **Use Prisma Migrate with the Supabase UI**:
   - Generate SQL scripts from your Prisma schema using `npx prisma migrate sql --create-only`
   - Execute the generated SQL in the Supabase SQL Editor

2. **Use Database URL from Supabase Dashboard**:
   - Go to your Supabase project dashboard
   - Navigate to Settings > Database
   - Find the connection string labeled "URI" or "Connection string"
   - Use this exact string in your `.env` file

3. **Enable Direct Database Access in Supabase**:
   - Navigate to Settings > Database in your Supabase dashboard
   - Check if there are options to enable direct database access
   - Some plans may require upgrades for this feature

#### Testing Schema Without Direct Connection

If direct connection remains challenging, you can still validate your Prisma schema:

```bash
# Validate the schema format
npx prisma validate

# Generate Prisma client (works without database connection)
npx prisma generate
```

## Validation Steps

Even if you cannot currently connect directly to Supabase from Prisma, you can still consider DB-02 complete if:

1. ✅ The Prisma schema is properly formatted and validates
2. ✅ Authentication models required by Auth.js are defined correctly
3. ✅ Relations between models are established properly
4. ✅ Prisma client is generated successfully

## Next Steps

After completing DB-02, proceed to DB-03, which involves pushing the schema to the database and creating seed data. If direct connection issues persist, you might need to use the Supabase SQL Editor for that step as well.

## Troubleshooting Connection Issues

If you need to troubleshoot connection issues:

1. **Check Supabase Project Status**:
   - Verify your project is active and not paused
   - Check database health in Supabase dashboard

2. **Verify Connection String**:
   - Double-check the connection string format
   - Ensure special characters in passwords are URL-encoded
   - Try using the exact connection string from Supabase dashboard

3. **Network Connectivity**:
   - Check if your IP needs to be allowlisted in Supabase
   - Try connecting from different networks
   - Consider using a VPN if your network has restrictions

4. **Supabase Support**:
   - Consult Supabase documentation on external connections
   - Consider reaching out to Supabase support for specific issues 