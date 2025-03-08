import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        access: true,
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { userId, newAccess } = await request.json();

    if (!userId || !newAccess) {
      return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
    }

    // Optionally: Verify that the request is coming from an admin.
    // This might include checking cookies, headers, or session data.

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { access: newAccess },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error('Error updating user access:', error);
    return NextResponse.json({ error: 'Failed to update user access' }, { status: 500 });
  }
}

