import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import type Stripe from "stripe";

// Receives Stripe events. Verify the signature, then handle the events the
// app cares about. In production, fulfil the subscription in your database.
export async function POST(req: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) {
    return NextResponse.json({ error: "webhook not configured" }, { status: 501 });
  }

  const body = await req.text();
  const sig = req.headers.get("stripe-signature") || "";

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch {
    return NextResponse.json({ error: "invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("checkout.session.completed", session.id, session.customer_email);
      break;
    }
    case "customer.subscription.deleted":
      console.log("subscription cancelled", event.data.object.id);
      break;
    default:
      console.log("unhandled event", event.type);
  }
  return NextResponse.json({ received: true });
}
