// app/api/verify/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prismaDB';

export async function GET(request: Request) {
  // Extract query parameters from the URL
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  const identifier = searchParams.get('identifier');

  if (!token || !identifier) {
    return NextResponse.json(
      { error: 'Invalid request parameters.' },
      { status: 400 }
    );
  }

  let tokenRecord;
  try {
    console.log("Debug: token =", token, "identifier =", identifier);
    tokenRecord = await prisma.verificationToken.findFirst({
      where: { token, identifier },
    });
    console.log("Debug: tokenRecord =", tokenRecord);
  } catch (error) {
    console.error("Error while fetching verification token:", error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }

  if (!tokenRecord) {
    console.error("No verification token found for token:", token, "and identifier:", identifier);
    return NextResponse.json(
      { error: 'Invalid verification token.' },
      { status: 400 }
    );
  }

  if (new Date() > tokenRecord.expires) {
    return NextResponse.json(
      { error: 'Verification token has expired.' },
      { status: 400 }
    );
  }

  // Mark the user as verified
  await prisma.user.update({
    where: { email: identifier },
    data: { emailVerified: new Date() },
  });

  // Optionally, remove the used token
  await prisma.verificationToken.delete({
    where: { id: tokenRecord.id },
  });

  return NextResponse.redirect(new URL('/profile?verified=success', request.url));
}
