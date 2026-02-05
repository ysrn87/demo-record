import { signOut } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { PrismaClient, UserRole, UserStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Prevent caching of auth responses
export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    // Perform demo reset before logout
    console.log('🧹 Demo Logout: Cleaning database...');

    // Delete in order (respect foreign key constraints)
    await prisma.activityLog.deleteMany();
    await prisma.saleItem.deleteMany();
    await prisma.sale.deleteMany();
    await prisma.customer.deleteMany();
    await prisma.stockEntryItem.deleteMany();
    await prisma.stockEntry.deleteMany();
    await prisma.productVariantValue.deleteMany();
    await prisma.productVariant.deleteMany();
    await prisma.variantOption.deleteMany();
    await prisma.variantType.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();

    // Delete ALL users (including privilege user that may have changed roles)
    await prisma.user.deleteMany();

    // Recreate the demo PRIVILEGE user
    const hashedPassword = await bcrypt.hash('password123', 10);
    await prisma.user.create({
      data: {
        email: 'privilege@demo.com',
        password: hashedPassword,
        name: 'Demo Admin',
        phone: '+1 234 567 8901',
        role: UserRole.PRIVILEGE,
        status: UserStatus.ACTIVE,
      },
    });

    console.log('✅ Demo Logout: Database cleaned and demo user recreated');

    // Sign out user
    await signOut({ redirect: false });

    return NextResponse.json({ 
      success: true,
      redirect: '/login'
    });
  } catch (error) {
    console.error('❌ Demo Logout failed:', error);
    // Still sign out even if reset fails
    await signOut({ redirect: false });
    return NextResponse.json({ 
      success: true,
      redirect: '/login'
    });
  }
}

export async function GET() {
  return POST();
}