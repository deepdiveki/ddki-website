import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2026-03-25.dahlia",
    });
  }
  return _stripe;
}

/** Generate a random 8-character alphanumeric access code. */
export function generateAccessCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I to avoid confusion
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

/** Check if a timestamp (seconds) is within the last `days` days. */
export function isWithinDays(timestampSeconds: number, days: number): boolean {
  const now = Math.floor(Date.now() / 1000);
  const cutoff = now - days * 24 * 60 * 60;
  return timestampSeconds >= cutoff;
}
