import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  // Read the session token using getToken or directly from cookies
  const token = await getToken({ req, secret: process.env.SECRET });


  return NextResponse.next();
}

// Configuration to apply the middleware
export const config = {
  matcher: ["/:path*"],  // All paths are matched
};
