import type { Metadata } from "next";
import { BuyerCopyView } from "@/components/care-split/BuyerCopyView";

export const metadata: Metadata = {
  title:
    "WHEN — Who Handles Each Need | Split a Parent's Care Between Siblings, On Paper — Invocation Inc",
};

export default function CareSplitPage() {
  return <BuyerCopyView />;
}
