import Stripe from "stripe";

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null; // demo mode
  return new Stripe(key);
}

export const PLANS = {
  starter: { name: "Starter plan", amount: 900, interval: "month" as const },
  growth: { name: "Growth plan", amount: 2900, interval: "month" as const },
  scale: { name: "Scale plan", amount: 9900, interval: "month" as const },
} as const;

export type PlanId = keyof typeof PLANS;

export function isPlanId(v: string): v is PlanId {
  return v in PLANS;
}
