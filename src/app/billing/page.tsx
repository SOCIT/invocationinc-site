"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function BillingPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        setError(data.error || "Something went wrong. Try again.");
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <Header />
      <main className="inner-page lf-wrap" style={{ paddingBottom: 48 }}>
        <p>
          <Link href="/">Home</Link> / Billing
        </p>
        <h1>Manage billing</h1>
        <p>
          Enter the email you bought with and we&rsquo;ll open your billing
          portal &mdash; invoices, receipts, and payment methods, direct from
          Stripe.
        </p>
        <form onSubmit={onSubmit} className="hub-form">
          <label htmlFor="billing-email">Email address</label>
          <input
            id="billing-email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="lf-btn lf-btn-red"
            disabled={busy}
          >
            {busy ? "Opening…" : "Open billing portal"}
          </button>
          {error && <p className="hub-form-error">{error}</p>}
        </form>
        <p className="hub-fine">
          Need a refund on a one-time purchase? Email{" "}
          <a href="mailto:info@invocationinc.com">info@invocationinc.com</a>{" "}
          &mdash; refunds don&rsquo;t go through the portal.
        </p>
        <Footer />
      </main>
    </>
  );
}
