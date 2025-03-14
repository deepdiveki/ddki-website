import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/auth";

// Define CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "https://toolbox.deepdive-ki.de",
  //"Access-Control-Allow-Origin": "https://ddki-chat-test.osc-fr1.scalingo.io/", //nur zum testen
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Credentials": "true",
};

export async function GET() {
  // Retrieve the NextAuth session server-side
  const session = await getServerSession(authOptions);

  if (!session) {
    // Not logged in: include CORS headers on error responses too
    return NextResponse.json(
      { error: "Not authenticated" },
      { status: 401, headers: corsHeaders }
    );
  }

  // Logged in: return user info with CORS headers
  return NextResponse.json(
    { id: session.user?.id,
      name: session.user?.name,
      email: session.user?.email,
      access: session.user?.access,
    },
    { status: 200, headers: corsHeaders }
  );
}

// Handle preflight requests
export async function OPTIONS() {
  return new NextResponse(null, { headers: corsHeaders });
}
