import { NextRequest, NextResponse } from "next/server";
import { cookieOptions, isValidCode, PRAES_COOKIE, tokenFor } from "@/lib/praesentation-auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  let body: { code?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad json" }, { status: 400 });
  }
  const input = typeof body.code === "string" ? body.code : "";
  if (!isValidCode(input)) {
    // kleine Bremse gegen Durchprobieren
    await new Promise((r) => setTimeout(r, 600));
    return NextResponse.json({ error: "wrong code" }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(PRAES_COOKIE, tokenFor(process.env.PRAESENTATION_CODE || "2325"), cookieOptions());
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(PRAES_COOKIE, "", { ...cookieOptions(), maxAge: 0 });
  return res;
}
