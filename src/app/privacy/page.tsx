import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="inner-page lf-wrap" style={{ paddingBottom: 48 }}>
        <p>
          <Link href="/">Home</Link> / Privacy
        </p>
        <h1>Privacy Policy</h1>
        <p>
          Stub policy for Invocation Inc. Replace with counsel-reviewed text
          before launch.
        </p>
        <p>
          This hub site links out to our product sites, where purchases are
          processed. We collect minimal information here. We do not sell your
          personal information.
        </p>
        <Footer />
      </main>
    </>
  );
}
