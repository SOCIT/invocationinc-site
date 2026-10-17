import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import "./caregiver.css";

const title = "Caregiver Communication & De-escalation — Invocation Inc";
const description =
  "Caregiver Communication & De-escalation teaches communication principles drawn from the Invocation books. Lessons teach communication mechanics, not therapy, medical advice, dementia treatment, or crisis intervention.";

export const metadata: Metadata = {
  title: {
    default: title,
    template: "%s — Caregiver Communication & De-escalation",
  },
  description,
  openGraph: {
    title,
    description,
    siteName: "Invocation Inc",
    type: "website",
  },
  robots: { index: false, follow: false },
};

export default function CaregiverLayout({ children }: { children: ReactNode }) {
  return (
    <div className="cc-root">
      <Header />
      {children}
    </div>
  );
}
