import type { Metadata } from "next";
import { MeetingView } from "@/components/care-split/MeetingView";

export const metadata: Metadata = {
  title: "Family meeting — WHEN",
};

export default function MeetingPage() {
  return <MeetingView />;
}
