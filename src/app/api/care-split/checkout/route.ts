import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import {
  validateCareSplitPrice,
  type CareSplitTier,
} from "@/lib/care-split/stripe-price";

export const runtime = "nodejs";

function priceEnv(tier: CareSplitTier): "STRIPE_PRICE_CARE_SPLIT_INTERVIEWS" | "STRIPE_PRICE_CARE_SPLIT_REVIEW" {
  return tier === "interviews"
    ? "STRIPE_PRICE_CARE_SPLIT_INTERVIEWS"
    : "STRIPE_PRICE_CARE_SPLIT_REVIEW";
}

function missingEnv(tier: CareSplitTier): string[] {
  const missing: string[] = [];
  if (!process.env.STRIPE_SECRET_KEY) missing.push("STRIPE_SECRET_KEY");
  const name = priceEnv(tier);
  if (!process.env[name]) missing.push(name);
  return missing;
}

export async function POST(request: NextRequest) {
  let tier: CareSplitTier | null = null;
  try {
    const body = await request.json();
    if (body?.tier === "interviews" || body?.tier === "review") tier = body.tier;
  } catch {
    return NextResponse.json({ error: "Missing tier." }, { status: 400 });
  }
  if (!tier) {
    return NextResponse.json({ error: "Missing tier." }, { status: 400 });
  }

  const missing = missingEnv(tier);
  if (missing.length > 0) {
    return NextResponse.json(
      { error: "Checkout is not configured.", missing },
      { status: 503 },
    );
  }

  const stripe = getStripe();
  const priceId = process.env[priceEnv(tier)];
  if (!stripe || !priceId) {
    return NextResponse.json(
      { error: "Checkout is not configured.", missing: missingEnv(tier) },
      { status: 503 },
    );
  }

  try {
    const price = await stripe.prices.retrieve(priceId);
    const check = validateCareSplitPrice(tier, {
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
      metadata: { product: "care-split", tier },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "";
    if (!/sk_(live|test)_/i.test(message)) {
      console.error("Care Split checkout error:", message);
    }
    return NextResponse.json(
      { error: "Checkout could not be started." },
      { status: 502 },
    );
  }
}
