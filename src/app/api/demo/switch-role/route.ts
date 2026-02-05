import { NextResponse } from 'next/server';
import { auth, signIn } from '@/lib/auth';
import { UserRole } from '@prisma/client';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { role } = await request.json();

    // Validate role
    if (!Object.values(UserRole).includes(role)) {
      return NextResponse.json(
        { success: false, message: 'Invalid role' },
        { status: 400 }
      );
    }

    // Update user role in database
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { role },
    });

    console.log(`✅ Demo: User ${session.user.email} switched to ${role}`);

    // Return success - client will handle re-authentication
    return NextResponse.json({ 
      success: true, 
      message: `Role switched to ${role}`,
      role,
      email: updatedUser.email
    });
  } catch (error) {
    console.error('❌ Role switch failed:', error);
    return NextResponse.json(
      { success: false, message: 'Role switch failed' },
      { status: 500 }
    );
  }
}
