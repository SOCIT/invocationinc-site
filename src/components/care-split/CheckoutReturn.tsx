"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { applyInterviewPack, creditsRemaining } from "@/lib/care-split/state";
import { updateFamily, useFamily } from "@/lib/care-split/storage";

export function CheckoutReturn({ sessionId }: { sessionId: string }) {
  const state = useFamily();
  const [message, setMessage] = useState(
    sessionId ? "Checking the payment…" : "No payment session was returned.",
  );

  useEffect(() => {
    if (!sessionId) return;
    let cancel = false;
    void (async () => {
      try {
        const res = await fetch("/api/care-split/checkout/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });
        const data = (await res.json()) as {
          error?: string;
          tier?: "interviews";
          sessionId?: string;
        };
        if (cancel) return;
        if (!res.ok || data.tier !== "interviews" || !data.sessionId) {
          setMessage(data.error || "The payment could not be confirmed.");
          return;
        }
        const at = new Date().toISOString();
        updateFamily((current) =>
          applyInterviewPack(current, data.sessionId as string, at),
        );
        setMessage(
          "Payment received. Five interviews were added on this device. They do not expire. This is not a subscription.",
        );
      } catch {
        if (!cancel) setMessage("The payment could not be confirmed.");
      }
    })();
    return () => {
      cancel = true;
    };
  }, [sessionId]);

  return (
    <main className="cs-section">
      <div className="cs-wrap">
        <h1>Checkout</h1>
        <p role="status">{message}</p>
        <p>Interviews remaining on this device: {creditsRemaining(state)}</p>
        <p>
          <Link href="/care-split/interview">Go to the interview</Link>
          {" · "}
          <Link href="/care-split#pricing">Pricing</Link>
        </p>
      </div>
    </main>
  );
}
