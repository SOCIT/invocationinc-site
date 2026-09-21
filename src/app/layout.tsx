import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Invocation Inc — Human Potential Engineering",
  description:
    "Invocation Inc: rapid personal change, engineered. Human Performance Engineers building systems for happiness, relationships, time, and social fluency — sold direct.",
  openGraph: {
    title: "Invocation Inc — Human Potential Engineering",
    description:
      "Change doesn't take years. It takes a moment. Four programs: Eight Weeks to Happy, How to Train Your Partner, How to Create Time, How to Like People.",
    siteName: "Invocation Inc",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
