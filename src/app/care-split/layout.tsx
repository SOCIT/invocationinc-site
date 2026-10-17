import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { findParagraph } from "@/lib/care-split/sections";
import "./care-split.css";

export const metadata: Metadata = {
  title: "The Care Split",
  description: findParagraph("The Care Split helps families organize"),
  robots: { index: false, follow: false },
};

export default function CareSplitLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <div className="cs-shell">{children}</div>
      <div className="cs-footer">
        <Footer />
      </div>
    </>
  );
}
