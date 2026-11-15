import { NextResponse } from "next/server";
import { getStripe, isPlanId, PLANS } from "@/lib/stripe";

export async function POST(req: Request) {
  const { plan } = await req.json().catch(() => ({}));
  if (typeof plan !== "string" || !isPlanId(plan)) {
    return NextResponse.json({ error: "unknown plan" }, { status: 400 });
  }

  const stripe = getStripe();
  if (!stripe) {
    // Demo mode: render a local, clearly-labelled simulation of the
    // Stripe Checkout page so the flow works with zero configuration.
    return NextResponse.json({ url: `/demo-checkout?plan=${plan}` });
  }

  const base = process.env.NEXT_PUBLIC_BASE_URL || new URL(req.url).origin;
  const p = PLANS[plan];
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: p.amount,
          recurring: { interval: p.interval },
          product_data: { name: p.name },
        },
        quantity: 1,
      },
    ],
    success_url: `${base}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${base}/cancel`,
  });
  return NextResponse.json({ url: session.url });
}
