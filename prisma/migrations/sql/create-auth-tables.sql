-- SQL Migration Script for Auth.js Tables
-- For use in Supabase SQL Editor if direct Prisma connection is not possible

-- User table
CREATE TABLE IF NOT EXISTS "User" (
  "id" TEXT NOT NULL,
  "name" TEXT,
  "email" TEXT,
  "emailVerified" TIMESTAMP(3),
  "image" TEXT,
  
  CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- Create unique index on email
CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");

-- Account table
CREATE TABLE IF NOT EXISTS "Account" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "provider" TEXT NOT NULL,
  "providerAccountId" TEXT NOT NULL,
  "refresh_token" TEXT,
  "access_token" TEXT,
  "expires_at" INTEGER,
  "token_type" TEXT,
  "scope" TEXT,
  "id_token" TEXT,
  "session_state" TEXT,
  
  CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- Create unique index on provider and providerAccountId
CREATE UNIQUE INDEX IF NOT EXISTS "Account_provider_providerAccountId_key" 
ON "Account"("provider", "providerAccountId");

-- Add foreign key constraint
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Session table
CREATE TABLE IF NOT EXISTS "Session" (
  "id" TEXT NOT NULL,
  "sessionToken" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "expires" TIMESTAMP(3) NOT NULL,
  
  CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- Create unique index on sessionToken
CREATE UNIQUE INDEX IF NOT EXISTS "Session_sessionToken_key" ON "Session"("sessionToken");

-- Add foreign key constraint
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- VerificationToken table
CREATE TABLE IF NOT EXISTS "VerificationToken" (
  "identifier" TEXT NOT NULL,
  "token" TEXT NOT NULL,
  "expires" TIMESTAMP(3) NOT NULL
);

-- Create unique index on token
CREATE UNIQUE INDEX IF NOT EXISTS "VerificationToken_token_key" ON "VerificationToken"("token");

-- Create unique compound index on identifier and token
CREATE UNIQUE INDEX IF NOT EXISTS "VerificationToken_identifier_token_key" 
ON "VerificationToken"("identifier", "token");

-- Add helpful comment for future reference
COMMENT ON TABLE "User" IS 'Stores user information for Auth.js authentication';
COMMENT ON TABLE "Account" IS 'Stores OAuth account information linked to users';
COMMENT ON TABLE "Session" IS 'Stores authentication sessions';
COMMENT ON TABLE "VerificationToken" IS 'Stores tokens for email verification and password reset'; 