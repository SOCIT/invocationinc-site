import type { Metadata } from "next";
import { WorksheetView } from "@/components/care-split/WorksheetView";

export const metadata: Metadata = {
  title: "Packet — The Care Split",
};

export default function WorksheetPacketPage() {
  return <WorksheetView surface="packet" />;
}
