import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import {
  INTERVIEW_PRICE_ENV,
  validateCareSplitPrice,
} from "@/lib/care-split/stripe-price";

export const runtime = "nodejs";

function missingEnv(): string[] {
  const missing: string[] = [];
  if (!process.env.STRIPE_SECRET_KEY) missing.push("STRIPE_SECRET_KEY");
  if (!process.env[INTERVIEW_PRICE_ENV]) missing.push(INTERVIEW_PRICE_ENV);
  return missing;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (body?.tier !== "interviews") {
      return NextResponse.json({ error: "Missing tier." }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: "Missing tier." }, { status: 400 });
  }

  const missing = missingEnv();
  if (missing.length > 0) {
    return NextResponse.json(
      { error: "Checkout is not configured.", missing },
      { status: 503 },
    );
  }

  const stripe = getStripe();
  const priceId = process.env[INTERVIEW_PRICE_ENV];
  if (!stripe || !priceId) {
    return NextResponse.json(
      { error: "Checkout is not configured.", missing: missingEnv() },
      { status: 503 },
    );
  }

  try {
    const price = await stripe.prices.retrieve(priceId);
    const check = validateCareSplitPrice("interviews", {
      unit_amount: price.unit_amount,
      currency: price.currency,
      recurring: price.recurring,
    });
    if (!check.ok) {
      return NextResponse.json({ error: check.error }, { status: 409 });
    }

    const origin = request.nextUrl.origin;
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/care-split/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/care-split#pricing`,
      metadata: { product: "care-split", tier: "interviews" },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "";
    if (!/sk_(live|test)_/i.test(message)) {
      console.error("WHEN checkout error:", message);
    }
    return NextResponse.json(
      { error: "Checkout could not be started." },
      { status: 502 },
    );
  }
}
