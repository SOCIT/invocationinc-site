import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import {
  INTERVIEW_PACK_SIZE,
  INTERVIEW_PRICE_ENV,
  validateCareSplitPrice,
} from "@/lib/care-split/stripe-price";

export const runtime = "nodejs";

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
    if (
      session.metadata?.product !== "care-split" ||
      session.mode !== "payment" ||
      session.metadata?.tier !== "interviews"
    ) {
      return NextResponse.json({ error: "That payment is not for WHEN." }, { status: 400 });
    }
    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Payment is not complete." }, { status: 402 });
    }

    const expected = process.env[INTERVIEW_PRICE_ENV];
    const lineItems = await stripe.checkout.sessions.listLineItems(sessionId, { limit: 1 });
    const price = lineItems.data[0]?.price;
    const priceId = typeof price === "string" ? price : price?.id;
    if (!expected || !priceId || priceId !== expected || !price || typeof price === "string") {
      return NextResponse.json({ error: "The paid price does not match WHEN." }, { status: 400 });
    }

    const check = validateCareSplitPrice("interviews", {
      unit_amount: price.unit_amount,
      currency: price.currency,
      recurring: price.recurring,
    });
    if (!check.ok) {
      return NextResponse.json({ error: check.error }, { status: 409 });
    }

    return NextResponse.json({
      tier: "interviews",
      sessionId,
      interviews: INTERVIEW_PACK_SIZE,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "";
    if (!/sk_(live|test)_/i.test(message)) {
      console.error("WHEN confirm error:", message);
    }
    return NextResponse.json(
      { error: "The payment could not be confirmed." },
      { status: 502 },
    );
  }
}
