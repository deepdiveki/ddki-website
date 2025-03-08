import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";

const prisma = new PrismaClient();


/**
 * GET request to check if a user's session access matches the database.
 */
export async function GET(request: Request) {
  try {

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const sessionAccess = searchParams.get("sessionAccess");

    console.log("API Received userId:", userId);
    console.log("API Received sessionAccess:", sessionAccess);

    if (!userId || !sessionAccess) {
      console.error("API received missing parameters:", { userId, sessionAccess });
      return NextResponse.json({ error: "Missing userId or sessionAccess" }, { status: 400 });
    }

    // Fetch user from database
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { access: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      isAccessUpToDate: user.access === sessionAccess,
      sessionAccess,
      databaseAccess: user.access,
      needsUpdate: user.access !== sessionAccess,
    }, { status: 200 });

  } catch (error) {
    console.error('Error checking session access:', error);
    return NextResponse.json({ error: 'Failed to validate session access' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { newAccess } = await request.json();

  // Update session data
  session.user.access = newAccess;

  return NextResponse.json({ message: "Session updated", session }, { status: 200 });
}
