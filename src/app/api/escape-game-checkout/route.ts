import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export async function POST() {
  try {
    const priceId = process.env.STRIPE_ESCAPE_GAME_PRICE_ID;
    if (!priceId) {
      return NextResponse.json(
        { error: "Payment not configured" },
        { status: 500 },
      );
    }

    const siteUrl = process.env.SITE_URL || "https://www.deepdive-ki.de";

    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${siteUrl}/fortbildung/escape-game?checkout=success`,
      cancel_url: `${siteUrl}/fortbildung/escape-game?checkout=cancelled`,
      metadata: {
        product: "escape-game-license",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Stripe checkout error:", message);
    return NextResponse.json(
      { error: message },
      { status: 500 },
    );
  }
}
