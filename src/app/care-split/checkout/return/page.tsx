import type { Metadata } from "next";
import { CheckoutReturn } from "@/components/care-split/CheckoutReturn";

export const metadata: Metadata = {
  title: "Checkout — The Care Split",
};

export default async function CheckoutReturnPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const params = await searchParams;
  return <CheckoutReturn sessionId={params.session_id ?? ""} />;
}
