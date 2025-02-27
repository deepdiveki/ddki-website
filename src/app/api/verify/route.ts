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

  // Try to find the verification token record
  const tokenRecord = await prisma.verificationToken.findFirst({
    where: { token, identifier },
  });

  // If no token record is found, check if the user is already verified.
  if (!tokenRecord) {
    const user = await prisma.user.findUnique({
      where: { email: identifier },
      select: { emailVerified: true },
    });
    if (user && user.emailVerified) {
      // If the user is already verified, redirect them to the profile page.
      return NextResponse.redirect(new URL('/profil?verified=success', 'https://deepdive-ki.de'));
    }
    return NextResponse.json(
      { error: 'Invalid verification token.' },
      { status: 400 }
    );
  }

  // Check if the token has expired
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

  // Remove the used token
  await prisma.verificationToken.delete({
    where: { id: tokenRecord.id },
  });

  // Redirect to the profile page with a success message
  const redirectUrl = `/auto-signin?email=${encodeURIComponent(identifier)}&callbackUrl=${encodeURIComponent('/profil?verified=success')}`;
  return NextResponse.redirect(new URL(redirectUrl, 'https://deepdive-ki.de'));
}
