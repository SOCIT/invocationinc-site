import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./care-split.css";

const title =
  "WHEN — Who Handles Each Need | Split a Parent's Care Between Siblings, On Paper — Invocation Inc";
const description =
  "WHEN (Who Handles Each Need) interviews each sibling separately and organizes the answers into a proposed caregiving responsibility split — who does what, who pays, who is backup — plus a family-meeting script. Education and meeting preparation only. Free core; AI interview pack $24.99 for five interviews.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description:
      "WHEN (Who Handles Each Need) interviews each sibling separately and organizes the answers into a proposed caregiving responsibility split — who does what, who pays, who is backup — plus a family-meeting script.",
    siteName: "Invocation Inc",
    type: "website",
  },
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
