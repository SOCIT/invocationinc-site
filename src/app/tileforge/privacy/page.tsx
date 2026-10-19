import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Tileforge Privacy Policy",
};

export default function TileforgePrivacyPage() {
  return (
    <>
      <Header />
      <main className="inner-page lf-wrap" style={{ paddingBottom: 48 }}>
        <p>
          <Link href="/">Home</Link> / Tileforge / Privacy
        </p>
        <h1>Tileforge Privacy Policy</h1>
        <p>Last updated: October 19, 2026</p>
        <p>
          <strong>Who we are.</strong> Tileforge makes small, free puzzle
          games, including Tilebright. This policy covers every Tileforge
          game. Questions about this policy or your data:{" "}
          <a href="mailto:tileforge@solutionsofconsequence.com">
            tileforge@solutionsofconsequence.com
          </a>
          .
        </p>
        <p>
          <strong>What the games collect: nothing, themselves.</strong> Our
          games do not ask for your name, email, account, or location, and
          they do not send your gameplay to us. Game progress is saved only
          on your device, and uninstalling the game deletes it.
        </p>
        <p>
          <strong>Ads.</strong> Our games are free because they show ads,
          served by Google AdMob. AdMob, not us, may collect your
          device&apos;s advertising ID, your IP address (which can indicate
          approximate location), and ad-interaction and diagnostic
          information, to serve and measure ads, under Google&apos;s own
          privacy policy:{" "}
          <a href="https://policies.google.com/privacy">
            policies.google.com/privacy
          </a>
          . We do not receive, buy, or sell your personal information.
        </p>
        <p>
          <strong>Permissions.</strong> Our games ask only for the
          permissions their features need. Tilebright uses internet access
          so ads can load. No contacts, no camera, no microphone, no
          precise location.
        </p>
        <p>
          <strong>Children.</strong> Our games are general-audience puzzles
          and are not directed at children under 13.
        </p>
        <p>
          <strong>Your choices.</strong> There is no account to delete and
          no profile to erase, because we hold nothing about you. To reset
          ad personalization, use your device&apos;s advertising settings
          (Android: Settings, Privacy, Ads).
        </p>
        <p>
          <strong>Changes.</strong> If this policy changes, the new version
          will be posted at this same address with a new date at the top.
        </p>
        <Footer />
      </main>
    </>
  );
}
