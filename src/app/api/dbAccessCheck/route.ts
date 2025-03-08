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

  if (!newAccess) {
    return NextResponse.json({ error: "Missing newAccess" }, { status: 400 });
  }

  // Update session data
  session.user.access = newAccess;

  if (!authOptions.callbacks?.jwt) {
      throw new Error("JWT callback is not defined in authOptions");
    }

  await authOptions.callbacks.jwt({
    token: { user: session.user },
    user: session.user as unknown as AdapterUser, // Cast to AdapterUser
    account: null, // Provide a default value for account
    trigger: "update",
    session: { access: newAccess },
  });

  console.log("Session updated with new access:", newAccess);

  // Return the updated session to the client
  return NextResponse.json(
    { message: "Session updated", session },
    { status: 200 }
  );
}


export async function OPTIONS() {
  return new NextResponse(null, { headers: corsHeaders });
}