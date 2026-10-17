export type CareSplitTier = "interviews" | "review";

export type PriceShape = {
  unit_amount: number | null;
  currency: string | null;
  recurring: { interval?: string } | null;
};

export const INTERVIEW_PACK_CENTS = 2499;
export const REVIEW_MIN_CENTS = 10000;
export const INTERVIEW_PACK_SIZE = 5;

export function validateCareSplitPrice(
  tier: CareSplitTier,
  price: PriceShape,
): { ok: true } | { ok: false; error: string } {
  if (price.recurring) {
    return {
      ok: false,
      error:
        "The Care Split price must be a one-time payment. Recurring prices are not used.",
    };
  }
  if (price.currency !== "usd") {
    return { ok: false, error: "The Care Split price must be in USD." };
  }
  if (tier === "interviews") {
    if (price.unit_amount !== INTERVIEW_PACK_CENTS) {
      return {
        ok: false,
        error:
          "STRIPE_PRICE_CARE_SPLIT_INTERVIEWS must be a one-time price of $24.99.",
      };
    }
    return { ok: true };
  }
  if (price.unit_amount == null || price.unit_amount < REVIEW_MIN_CENTS) {
    return {
      ok: false,
      error: "STRIPE_PRICE_CARE_SPLIT_REVIEW must be a one-time price of $100 or more.",
    };
  }
  return { ok: true };
}
