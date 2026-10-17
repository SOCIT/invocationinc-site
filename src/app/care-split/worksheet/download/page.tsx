import type { Metadata } from "next";
import { WorksheetView } from "@/components/care-split/WorksheetView";

export const metadata: Metadata = {
  title: "Worksheet download — The Care Split",
};

export default function WorksheetDownloadPage() {
  return <WorksheetView surface="download" />;
}
