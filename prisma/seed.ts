import { PrismaClient } from '../src/generated/prisma';
import { hash } from '@node-rs/argon2';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data if in development
  if (process.env.NODE_ENV !== 'production') {
    console.log('🧹 Clearing existing data...');
    await prisma.verificationToken.deleteMany({});
    await prisma.session.deleteMany({});
    await prisma.account.deleteMany({});
    await prisma.user.deleteMany({});
  }

  console.log('👤 Creating test users...');

  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@example.com',
      emailVerified: new Date(),
      image: 'https://avatars.githubusercontent.com/u/1?v=4',
    },
  });
  console.log(`✅ Created admin user: ${adminUser.name} (${adminUser.email})`);

  // Create demo user
  const demoUser = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      name: 'Demo User',
      email: 'user@example.com',
      emailVerified: new Date(),
      image: 'https://avatars.githubusercontent.com/u/2?v=4',
    },
  });
  console.log(`✅ Created demo user: ${demoUser.name} (${demoUser.email})`);

  // Create a test session for the demo user (valid for 30 days)
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 30);
  
  const session = await prisma.session.upsert({
    where: { sessionToken: 'test-session-token' },
    update: {},
    create: {
      userId: demoUser.id,
      expires: futureDate,
      sessionToken: 'test-session-token',
    },
  });
  console.log(`✅ Created test session valid until ${futureDate.toLocaleDateString()}`);

  // Create a mock OAuth account for the demo user
  const oauthAccount = await prisma.account.upsert({
    where: {
      provider_providerAccountId: {
        provider: 'github',
        providerAccountId: '12345',
      }
    },
    update: {},
    create: {
      userId: demoUser.id,
      type: 'oauth',
      provider: 'github',
      providerAccountId: '12345',
      refresh_token: 'mock-refresh-token',
      access_token: 'mock-access-token',
      expires_at: Math.floor(futureDate.getTime() / 1000),
      token_type: 'bearer',
      scope: 'user',
    },
  });
  console.log(`✅ Created OAuth account connection for demo user`);

  // Create a verification token (useful for testing email verification flow)
  const verificationToken = await prisma.verificationToken.upsert({
    where: {
      identifier_token: {
        identifier: 'new-user@example.com',
        token: 'verification-token-123',
      },
    },
    update: {},
    create: {
      identifier: 'new-user@example.com',
      token: 'verification-token-123',
      expires: futureDate,
    },
  });
  console.log(`✅ Created verification token for new-user@example.com`);

  console.log('✨ Seeding complete!');
  console.log('\n📝 Seed Data Summary:');
  console.log('------------------------');
  console.log('👤 Admin User:');
  console.log(`   Email: ${adminUser.email}`);
  console.log(`   Name: ${adminUser.name}`);
  console.log('\n👤 Demo User:');
  console.log(`   Email: ${demoUser.email}`);
  console.log(`   Name: ${demoUser.name}`);
  console.log(`   Session: Valid until ${futureDate.toLocaleDateString()}`);
  console.log(`   OAuth: Connected to GitHub`);
  console.log('\n📧 Verification Token:');
  console.log(`   Email: new-user@example.com`);
  console.log(`   Token: verification-token-123`);
  console.log(`   Expires: ${futureDate.toLocaleDateString()}`);
  console.log('------------------------');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Error during seeding:', e);
    await prisma.$disconnect();
    process.exit(1);
  }); 