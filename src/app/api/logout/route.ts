import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Create a response that redirects to your homepage
  const response = NextResponse.redirect("https://www.deepdive-ki.de/");

  // Clear the cookie by setting its expiration date to the past.
  // Make sure to match the attributes from your cookie config.
  response.cookies.set("next-auth.session-token", "", {
    path: "/",
    domain: ".deepdive-ki.de",
    expires: new Date(0),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return response;
}
