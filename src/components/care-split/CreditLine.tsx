"use client";

import { creditsRemaining } from "@/lib/care-split/state";
import { useFamily } from "@/lib/care-split/storage";

export function CreditLine() {
  const credits = creditsRemaining(useFamily());
  return (
    <p className="cs-credits" data-credits={credits}>
      Interviews remaining on this device: {credits}
    </p>
  );
}
