import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/**
 * Einfacher Zugangscode für den Präsentationsbereich.
 * Der Code steht in PRAESENTATION_CODE (Fallback 2325). Das Cookie enthält
 * nicht den Code, sondern ein HMAC davon, damit er nicht im Browser lesbar ist.
 * Bewusst kein Middleware-Einsatz (siehe Commit „rm middleware to stop timeouts“).
 */
export const PRAES_COOKIE = "ddki-praes";
const MAX_AGE = 60 * 60 * 24 * 90; // 90 Tage

const code = () => process.env.PRAESENTATION_CODE || "2325";
const secret = () => process.env.SECRET || process.env.NEXTAUTH_SECRET || "ddki-praes-fallback";

export const tokenFor = (value: string) =>
  createHmac("sha256", secret()).update(`praes:${value}`).digest("hex");

export function isValidCode(input: string) {
  const a = Buffer.from(input.trim());
  const b = Buffer.from(code());
  return a.length === b.length && timingSafeEqual(a, b);
}

export function isValidToken(token: string | undefined) {
  if (!token) return false;
  const expected = tokenFor(code());
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function isAuthed() {
  const store = await cookies();
  return isValidToken(store.get(PRAES_COOKIE)?.value);
}

export const cookieOptions = () => ({
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: MAX_AGE,
});
