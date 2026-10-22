export type CareSplitTier = "interviews";

export type PriceShape = {
  unit_amount: number | null;
  currency: string | null;
  recurring: { interval?: string } | null;
};

export const INTERVIEW_PACK_CENTS = 999;
export const INTERVIEW_PACK_SIZE = 5;

/** The only WHEN checkout price. One-time $9.99. Jonah sets the Stripe price id. */
export const INTERVIEW_PRICE_ENV = "STRIPE_PRICE_CARE_SPLIT_INTERVIEWS";

export function validateCareSplitPrice(
  tier: CareSplitTier,
  price: PriceShape,
): { ok: true } | { ok: false; error: string } {
  if (price.recurring) {
    return {
      ok: false,
      error:
        "WHEN price must be a one-time payment. Recurring prices are not used.",
    };
  }
  if (price.currency !== "usd") {
    return { ok: false, error: "WHEN price must be in USD." };
  }
  if (tier !== "interviews" || price.unit_amount !== INTERVIEW_PACK_CENTS) {
    return {
      ok: false,
      error: `${INTERVIEW_PRICE_ENV} must be a one-time price of $9.99.`,
    };
  }
  return { ok: true };
}
