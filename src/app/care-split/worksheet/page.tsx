import type { Metadata } from "next";
import { WorksheetView } from "@/components/care-split/WorksheetView";

export const metadata: Metadata = {
  title: "Worksheet — The Care Split",
};

export default function WorksheetCoverPage() {
  return <WorksheetView surface="cover" />;
}
