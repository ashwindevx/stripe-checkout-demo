import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Checkout demo - Stripe test mode",
  description: "A hosted-checkout payment flow with Stripe test mode, webhooks and a no-key demo fallback.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
