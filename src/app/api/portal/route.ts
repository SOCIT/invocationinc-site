import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

const RETURN_URL = "https://invocationinc.com/";

/**
 * Mint a one-time Stripe Customer Portal session for the buyer.
 * Body: { email }. The email must match a Stripe Customer from a purchase.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email =
      typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Enter a valid email address." },
        { status: 400 }
      );
    }

    const stripe = getStripe();
    if (!stripe) {
      return NextResponse.json(
        { error: "Billing is not configured yet." },
        { status: 503 }
      );
    }

    const customers = await stripe.customers.list({ email, limit: 1 });
    const customer = customers.data[0];
    if (!customer) {
      return NextResponse.json(
        { error: "No purchase found for that email address." },
        { status: 404 }
      );
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: customer.id,
      return_url: RETURN_URL,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Portal error:", err);
    return NextResponse.json(
      { error: "Could not open the billing portal. Please try again." },
      { status: 500 }
    );
  }
}
