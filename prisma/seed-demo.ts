import { PrismaClient, UserRole, UserStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding demo database...');

  // Create Company Profile
  const company = await prisma.companyProfile.upsert({
    where: { id: 'company-1' },
    update: {},
    create: {
      id: 'company-1',
      name: 'Demo Store',
      address: '123 Demo Street, Demo City',
      phone: '+1 234 567 8900',
      email: 'demo@example.com',
      invoicePrefix: 'INV',
      stockEntryPrefix: 'SE',
    },
  });
  console.log('✅ Company profile created');

  // Create ONLY Privilege User for demo
  const hashedPassword = await bcrypt.hash('password123', 10);

  const privilegeUser = await prisma.user.upsert({
    where: { email: 'privilege@demo.com' },
    update: {},
    create: {
      email: 'privilege@demo.com',
      password: hashedPassword,
      name: 'Demo Admin',
      phone: '+1 234 567 8901',
      role: UserRole.PRIVILEGE,
      status: UserStatus.ACTIVE,
    },
  });

  console.log('✅ Privilege user created');
  console.log('\n🎉 Demo database seeded successfully!');
  console.log('\n📋 Demo Login Credentials:');
  console.log('----------------------------');
  console.log('Email: privilege@example.com');
  console.log('Password: password123');
  console.log('\n🎭 Demo Features:');
  console.log('- Switch roles after login using the role switcher');
  console.log('- Create test data during your session');
  console.log('- All data will be reset automatically on logout');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
