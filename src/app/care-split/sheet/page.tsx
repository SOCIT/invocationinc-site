import type { Metadata } from "next";
import { SplitSheetView } from "@/components/care-split/SplitSheetView";

export const metadata: Metadata = {
  title: "Split Sheet — The Care Split",
};

export default function SheetPage() {
  return <SplitSheetView />;
}
