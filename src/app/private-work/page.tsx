import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Private work — Invocation Inc",
};

export default function PrivateWorkPage() {
  return (
    <>
      <Header />
      <main className="inner-page lf-wrap" style={{ paddingBottom: 48 }}>
        <p>
          <Link href="/">Home</Link> / Private work
        </p>
        <h1>Private work</h1>
        <p>
          <strong>We don&rsquo;t take new clients.</strong>
        </p>
        <p>
          No application. No discovery call. No waitlist. If you&rsquo;re
          reading this page hoping to hire us, the answer is no.
        </p>
        <p>
          The one exception is a referral from a prior client. Then it works
          like this:
        </p>
        <ol>
          <li>
            <strong>Referral.</strong> A prior client puts your name forward.
            That&rsquo;s the only way in.
          </li>
          <li>
            <strong>NDA.</strong> Before we discuss anything, both sides
            sign. You don&rsquo;t talk about our methods. We don&rsquo;t talk
            about you. Ever.
          </li>
          <li>
            <strong>Interview.</strong> $500, nonrefundable. That&rsquo;s the
            price of our time, and we keep it whether or not we take you on.
            The interview goes both ways &mdash; we turn down engagements
            that aren&rsquo;t a fit, including situations where change work
            would be inappropriate or unsafe.
          </li>
          <li>
            <strong>Engagement.</strong> $5K up front, $5K mid-delivery.
          </li>
        </ol>
        <p>
          Note the order: the $5K is stated before the interview. But if we
          decline you after it, you don&rsquo;t pay it. Keeping money we
          didn&rsquo;t earn would be bad business.
        </p>
        <p>
          Gurus say &ldquo;invest in yourself.&rdquo; Real practitioners talk
          about payment milestones. Those are ours.
        </p>
        <p>You have never heard of us. That&rsquo;s by design.</p>
        <p>
          <strong>
            If you were referred, your referrer knows how to reach us.
          </strong>
        </p>
        <Footer />
      </main>
    </>
  );
}
