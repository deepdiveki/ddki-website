import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  // Read the session token using getToken or directly from cookies
  const token = await getToken({ req, secret: process.env.SECRET });

  // Alternatively, access cookies directly if needed:
  // const sessionToken = req.cookies.get("session_token")?.value;

  // Protect paths for the specific domain and `/profile` - toolbox redirect block doesnt work
  if (((req.headers.get("host") || "") === "toolbox.deepdive-ki.de") || req.nextUrl.pathname.startsWith("/profil")) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }
  }

  return NextResponse.next();
}

// Configuration to apply the middleware
export const config = {
  matcher: ["/profil/:path*", "/:path*"],  // All paths are matched
};
