import { NextResponse } from "next/server";

// Passwort-Gate für den KI-Praxis-Komplettkurs. Prüfung server-seitig, damit das
// Passwort NICHT im Client-Bundle landet. Über die Umgebungsvariable KURS_PASSWORD
// überschreibbar; Standard ist "2309".
const KURS_PASSWORD = process.env.KURS_PASSWORD ?? "2309";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { password?: unknown };
    const password = typeof body.password === "string" ? body.password.trim() : "";
    return NextResponse.json({ valid: password.length > 0 && password === KURS_PASSWORD });
  } catch {
    return NextResponse.json({ valid: false }, { status: 400 });
  }
}
