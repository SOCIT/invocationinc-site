import type { Metadata } from "next";
import { WorksheetView } from "@/components/care-split/WorksheetView";

export const metadata: Metadata = {
  title: "Worksheet download — WHEN",
};

export default function WorksheetDownloadPage() {
  return <WorksheetView surface="download" />;
}
