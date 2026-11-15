"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

const PLAN_LABEL: Record<string, string> = { starter: "Starter - $9/mo", growth: "Growth - $29/mo", scale: "Scale - $99/mo" };

function DemoCheckout() {
  const router = useRouter();
  const plan = useSearchParams().get("plan") || "growth";
  const [busy, setBusy] = useState(false);

  function pay(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setTimeout(() => router.push(`/success?demo=1&plan=${plan}`), 700);
  }

  return (
    <main className="wrap" style={{ maxWidth: 460, paddingTop: 48 }}>
      <p style={{ textAlign: "center" }}>
        <span className="badge-demo">Simulated Stripe Checkout - set STRIPE_SECRET_KEY for the real hosted page</span>
      </p>
      <div className="card" style={{ marginTop: 20 }}>
        <h1 style={{ fontSize: "1.2rem" }}>Example SaaS</h1>
        <p className="muted" style={{ marginTop: 0 }}>{PLAN_LABEL[plan] ?? plan}</p>
        <form onSubmit={pay} style={{ display: "grid", gap: 12, marginTop: 16 }}>
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" defaultValue="demo@example.com" required />
          </div>
          <div>
            <label htmlFor="card">Card number</label>
            <input id="card" inputMode="numeric" defaultValue="4242 4242 4242 4242" required />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label htmlFor="exp">Expiry</label>
              <input id="exp" defaultValue="12/34" required />
            </div>
            <div>
              <label htmlFor="cvc">CVC</label>
              <input id="cvc" defaultValue="123" required />
            </div>
          </div>
          <button className="btn" disabled={busy}>{busy ? "Processing…" : "Pay"}</button>
          <button type="button" className="btn ghost" onClick={() => router.push("/cancel")}>Cancel</button>
        </form>
      </div>
      <p className="muted" style={{ fontSize: ".8rem", textAlign: "center", marginTop: 16 }}>
        Test card 4242… always succeeds; 4000 0000 0000 0002 declines on the real Stripe page.
      </p>
    </main>
  );
}

export default function DemoCheckoutPage() {
  return (
    <Suspense>
      <DemoCheckout />
    </Suspense>
  );
}
