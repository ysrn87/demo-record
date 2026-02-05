import { NextResponse } from 'next/server';
import { PrismaClient, UserRole, UserStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST() {
  try {
    console.log('🧹 Demo Reset: Cleaning database...');

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

    // Delete ALL users
    await prisma.user.deleteMany();

    // Recreate the demo PRIVILEGE user
    const hashedPassword = await bcrypt.hash('password123', 10);
    await prisma.user.create({
      data: {
        email: 'privilege@example.com',
        password: hashedPassword,
        name: 'Demo Admin',
        phone: '+1 234 567 8901',
        role: UserRole.PRIVILEGE,
        status: UserStatus.ACTIVE,
      },
    });

    console.log('✅ Demo Reset: Database cleaned and demo user recreated');

    return NextResponse.json({ 
      success: true, 
      message: 'Demo data reset successfully' 
    });
  } catch (error) {
    console.error('❌ Demo Reset failed:', error);
    return NextResponse.json(
      { success: false, message: 'Reset failed' },
      { status: 500 }
    );
  }
}