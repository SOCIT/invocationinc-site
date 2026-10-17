import type { Metadata } from "next";
import { WorksheetView } from "@/components/care-split/WorksheetView";

export const metadata: Metadata = {
  title: "Worksheet preview — The Care Split",
};

export default function WorksheetPreviewPage() {
  return <WorksheetView surface="preview" />;
}
