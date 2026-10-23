import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Use",
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="inner-page lf-wrap" style={{ paddingBottom: 48 }}>
        <p>
          <Link href="/">Home</Link> / Terms
        </p>
        <h1>Terms of Use</h1>
        <p>
          Stub terms for Invocation Inc. Replace with counsel-reviewed text
          before launch.
        </p>
        <Footer />
      </main>
    </>
  );
}
