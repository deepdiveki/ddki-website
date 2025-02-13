import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/auth";

export async function GET() {
  // Retrieve the NextAuth session server-side
  const session = await getServerSession(authOptions);

  if (!session) {
    // Not logged in
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // Logged in: return user info
  return NextResponse.json({ name: session.user?.name }, { status: 200 });
}
