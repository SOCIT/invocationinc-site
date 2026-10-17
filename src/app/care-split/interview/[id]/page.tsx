import type { Metadata } from "next";
import { InterviewSession } from "@/components/care-split/Interview";

export const metadata: Metadata = {
  title: "Interview — WHEN",
};

export default async function InterviewSessionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <InterviewSession id={id} />;
}
