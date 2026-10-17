"use client";

import { useState } from "react";
import Link from "next/link";
import type { CareSplitTier } from "@/lib/care-split/stripe-price";
import { useFamily } from "@/lib/care-split/storage";
import { CreditLine } from "./CreditLine";

export function PricingPanel() {
  const state = useFamily();
  const [busy, setBusy] = useState<CareSplitTier | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function buy(tier: CareSplitTier) {
    setBusy(tier);
    setError(null);
    try {
      const res = await fetch("/api/care-split/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier }),
      });
      const data = (await res.json()) as {
        url?: string;
        error?: string;
        missing?: string[];
      };
      if (!res.ok || !data.url) {
        const missing = Array.isArray(data.missing) && data.missing.length
          ? ` Missing: ${data.missing.join(", ")}.`
          : "";
        setError(`${data.error || "Checkout could not be started."}${missing}`);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Checkout could not be started.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="cs-pricing-actions">
      <CreditLine />
      {state.reviewSessions.length > 0 && (
        <p>Human review: purchased on this device.</p>
      )}
      <button
        type="button"
        className="cs-btn"
        disabled={busy !== null}
        onClick={() => buy("interviews")}
      >
        {busy === "interviews"
          ? "Opening checkout…"
          : "AI interview: $24.99. Includes five interviews."}
      </button>
      <button
        type="button"
        className="cs-btn cs-btn-secondary"
        disabled={busy !== null}
        onClick={() => buy("review")}
      >
        {busy === "review" ? "Opening checkout…" : "Human review: $100 or more."}
      </button>
      <p>
        <Link href="/care-split/interview">Go to the interview</Link>
      </p>
      {error && (
        <p className="cs-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
