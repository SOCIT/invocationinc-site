"use client";

import { useState } from "react";
import Link from "next/link";
import { CreditLine } from "./CreditLine";

export function PricingPanel() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function buy() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/care-split/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier: "interviews" }),
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
      setBusy(false);
    }
  }

  return (
    <div className="cs-pricing-actions">
      <CreditLine />
      <button type="button" className="cs-btn" disabled={busy} onClick={() => buy()}>
        {busy ? "Opening checkout…" : "AI interview: $9.99. Includes five interviews."}
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
