import type { Metadata } from "next";
import { BuyerCopyView } from "@/components/care-split/BuyerCopyView";

export const metadata: Metadata = {
  title: "The Care Split",
};

export default function CareSplitPage() {
  return <BuyerCopyView />;
}
