/** Reject account, card, and routing numbers. Phone-length numbers are allowed. */
export function looksLikeAccountNumber(text: string): boolean {
  if (
    /\b(routing|account|acct\.?|card)\s*(number|#|no\.?)?\s*[:#-]?\s*\d{4,}/i.test(
      text,
    )
  ) {
    return true;
  }
  if (/\b\d{3}-\d{2}-\d{4}\b/.test(text)) return true;
  const runs = text.match(/[0-9][0-9 -]{10,}[0-9]/g) ?? [];
  for (const run of runs) {
    const digits = run.replace(/\D/g, "");
    if (digits.length >= 12) return true;
  }
  return false;
}

export const ACCOUNT_NUMBER_ERROR =
  "Account numbers are not saved. Enter the amount only, with no account, card, or routing numbers.";
