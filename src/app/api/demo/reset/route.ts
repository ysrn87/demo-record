import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

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

    // Delete non-PRIVILEGE users
    await prisma.user.deleteMany({
      where: {
        role: { not: 'PRIVILEGE' },
      },
    });

    console.log('✅ Demo Reset: Database cleaned successfully');

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
