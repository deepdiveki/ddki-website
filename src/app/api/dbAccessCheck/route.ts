import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { getToken } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";

const prisma = new PrismaClient();

const corsHeaders = {
      "Access-Control-Allow-Origin": "https://www.deepdive-ki.de",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Credentials": "true",
    };

/**
 * GET request to check if a user's session access matches the database.
 */
export async function GET(request: NextRequest) {
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

export async function POST(request: NextRequest) {

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { newAccess } = await request.json();

  // Update session data
  session.user.access = newAccess;

  if (!authOptions.callbacks?.session) {
    throw new Error("Session callback is not defined in authOptions");
  }

  const token = await getToken({ req: request });

    const jwtToken = token || {
    user: session.user, // Include the required `user` property
    // Add other required JWT properties if needed
  };

  // Save the updated session to the session store
  await authOptions.callbacks.session({
    session,
    token: jwtToken,
    user: session.user as unknown as AdapterUser,
    newSession: false, // Indicate whether this is a new session
    trigger: "update", // Indicate the trigger for the session update
  });

  console.log('Haloooooooooo?');

  return NextResponse.json({ message: "Session updated", session }, { status: 200, headers: corsHeaders });
}


export async function OPTIONS() {
  return new NextResponse(null, { headers: corsHeaders });
}