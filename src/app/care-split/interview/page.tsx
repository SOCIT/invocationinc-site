import type { Metadata } from "next";
import { InterviewHome } from "@/components/care-split/Interview";

export const metadata: Metadata = {
  title: "Interview — The Care Split",
};

export default function InterviewPage() {
  return <InterviewHome />;
}
