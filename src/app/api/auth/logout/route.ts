import { signOut } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

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

    // Delete non-PRIVILEGE users
    await prisma.user.deleteMany({
      where: {
        role: { not: 'PRIVILEGE' },
      },
    });

    // Reset PRIVILEGE user role (in case it was changed during demo)
    await prisma.user.updateMany({
      where: {
        email: 'privilege@example.com',
      },
      data: {
        role: 'PRIVILEGE',
      },
    });

    console.log('✅ Demo Logout: Database cleaned successfully');

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
