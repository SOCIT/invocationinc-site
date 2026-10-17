import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import {
  validateCareSplitPrice,
  type CareSplitTier,
} from "@/lib/care-split/stripe-price";

export const runtime = "nodejs";

function priceEnv(tier: CareSplitTier) {
  return tier === "interviews"
    ? process.env.STRIPE_PRICE_CARE_SPLIT_INTERVIEWS
    : process.env.STRIPE_PRICE_CARE_SPLIT_REVIEW;
}

export async function POST(request: NextRequest) {
  let sessionId = "";
  try {
    const body = await request.json();
    if (typeof body?.sessionId === "string") sessionId = body.sessionId;
  } catch {
    return NextResponse.json({ error: "Missing session." }, { status: 400 });
  }
  if (!sessionId) {
    return NextResponse.json({ error: "Missing session." }, { status: 400 });
  }

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { error: "Checkout is not configured.", missing: ["STRIPE_SECRET_KEY"] },
      { status: 503 },
    );
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const tier = session.metadata?.tier;
    if (
      session.metadata?.product !== "care-split" ||
      session.mode !== "payment" ||
      (tier !== "interviews" && tier !== "review")
    ) {
      return NextResponse.json({ error: "That payment is not for The Care Split." }, { status: 400 });
    }
    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Payment is not complete." }, { status: 402 });
    }

    const expected = priceEnv(tier);
    const lineItems = await stripe.checkout.sessions.listLineItems(sessionId, { limit: 1 });
    const price = lineItems.data[0]?.price;
    const priceId = typeof price === "string" ? price : price?.id;
    if (!expected || !priceId || priceId !== expected || !price || typeof price === "string") {
      return NextResponse.json({ error: "The paid price does not match The Care Split." }, { status: 400 });
    }

    const check = validateCareSplitPrice(tier, {
      unit_amount: price.unit_amount,
      currency: price.currency,
      recurring: price.recurring,
    });
    if (!check.ok) {
      return NextResponse.json({ error: check.error }, { status: 409 });
    }

    return NextResponse.json({
      tier,
      sessionId,
      interviews: tier === "interviews" ? 5 : 0,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "";
    if (!/sk_(live|test)_/i.test(message)) {
      console.error("Care Split confirm error:", message);
    }
    return NextResponse.json(
      { error: "The payment could not be confirmed." },
      { status: 502 },
    );
  }
}
