import type { Metadata } from "next";
import { WorksheetView } from "@/components/care-split/WorksheetView";

export const metadata: Metadata = {
  title: "Worksheet — WHEN",
};

export default function WorksheetCoverPage() {
  return <WorksheetView surface="cover" />;
}
