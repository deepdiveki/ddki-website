import { NextResponse } from "next/server";
import { getStripe, isWithinDays } from "@/lib/stripe";

/** Fixed codes for dimension unlocking (earned in-game). */
const DIMENSION_CODES: Record<string, string> = {
  ueber: "470913",
  durch: "582604",
  mit: "736185",
  // trotz: "249357",
};

/** Fixed admin access code (for internal testing / live events). */
const ADMIN_ACCESS_CODE = process.env.ESCAPE_GAME_ADMIN_CODE || "2309";

const LICENSE_VALIDITY_DAYS = 14;

/**
 * Search Stripe PaymentIntents for a matching escape game code.
 * Returns true if the code exists and was created within the last 7 days.
 */
async function verifyStripeCode(code: string): Promise<boolean> {
  try {
    // Search recent payment intents (last 30 days) for the code
    const paymentIntents = await getStripe().paymentIntents.search({
      query: `metadata["escape_game_code"]:"${code.toUpperCase()}"`,
      limit: 1,
    });

    if (paymentIntents.data.length === 0) return false;

    const pi = paymentIntents.data[0];
    const createdAt = Number(pi.metadata.escape_game_code_created_at);
    if (!createdAt || isNaN(createdAt)) return false;

    return isWithinDays(createdAt, LICENSE_VALIDITY_DAYS);
  } catch (error) {
    console.error("Stripe code verification error:", error);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { type?: string; code?: string };
    const { type, code } = body;

    if (!type || !code || typeof type !== "string" || typeof code !== "string") {
      return NextResponse.json({ valid: false }, { status: 400 });
    }

    const trimmedCode = code.trim().toUpperCase();

    // --- Dimension code validation (in-game earned codes) ---
    if (type !== "access") {
      const expected = DIMENSION_CODES[type];
      if (!expected) {
        return NextResponse.json({ valid: false }, { status: 400 });
      }
      const valid = trimmedCode === expected.toUpperCase();
      return NextResponse.json({ valid });
    }

    // --- Access code validation ---

    // 1) Check admin code first (fast, no API call)
    if (trimmedCode === ADMIN_ACCESS_CODE.toUpperCase()) {
      return NextResponse.json({ valid: true });
    }

    // 2) Check Stripe-issued codes (7-day TTL)
    const stripeValid = await verifyStripeCode(trimmedCode);
    return NextResponse.json({ valid: stripeValid });
  } catch {
    return NextResponse.json({ valid: false }, { status: 400 });
  }
}
