import { NextResponse } from "next/server";
import { getStripe, generateAccessCode } from "@/lib/stripe";
import { sendEmail } from "@/lib/email";
import type Stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Only process escape game purchases
    if (session.metadata?.product !== "escape-game-license") {
      return NextResponse.json({ received: true });
    }

    const accessCode = generateAccessCode();
    const createdAt = Math.floor(Date.now() / 1000);

    // Store the access code as metadata on the payment intent
    if (session.payment_intent && typeof session.payment_intent === "string") {
      await getStripe().paymentIntents.update(session.payment_intent, {
        metadata: {
          escape_game_code: accessCode,
          escape_game_code_created_at: String(createdAt),
        },
      });
    }

    // Send email with the access code
    const customerEmail = session.customer_details?.email;
    if (customerEmail) {
      try {
        await sendEmail({
          to: customerEmail,
          subject: "Dein Zugangscode für das KI Escape Game",
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 520px; margin: 0 auto;">
              <h2 style="color: #1a1a2e;">Dein Escape Game Zugangscode</h2>
              <p>Vielen Dank für deinen Kauf! Hier ist dein persönlicher Zugangscode:</p>
              <div style="background: #1a1a2e; color: #c6bdfa; font-size: 32px; font-weight: bold; letter-spacing: 6px; text-align: center; padding: 24px; border-radius: 12px; margin: 24px 0;">
                ${accessCode}
              </div>
              <p><strong>Gültigkeit:</strong> 14 Tage ab jetzt.</p>
              <p>Gehe auf <a href="https://www.deepdive-ki.de/fortbildung/escape-game" style="color: #6366f1;">deepdive-ki.de/fortbildung/escape-game</a> und gib den Code im Zugangsfeld ein.</p>
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
              <p style="font-size: 12px; color: #94a3b8;">Bei Fragen erreichst du uns unter info@deepdive-ki.de</p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error("Failed to send access code email:", emailError);
      }
    }
  }

  return NextResponse.json({ received: true });
}
