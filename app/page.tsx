import { PLANS } from "@/lib/stripe";
import { PlanPicker } from "./PlanPicker";

const FEATURES: Record<string, string[]> = {
  starter: ["1 workspace", "Basic analytics", "Email support"],
  growth: ["Unlimited workspaces", "Advanced analytics", "Priority support"],
  scale: ["Everything in Growth", "SSO & audit log", "Dedicated manager"],
};

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export default function PricingPage() {
  const demoMode = !process.env.STRIPE_SECRET_KEY;
  return (
    <main className="wrap">
      <header className="top">
        <span className="logo">◈ Example SaaS</span>
        {demoMode && <span className="badge-demo">Demo mode - no Stripe key set</span>}
      </header>
      <section style={{ textAlign: "center", padding: "48px 0 32px" }}>
        <h1 style={{ fontSize: "2.4rem" }}>Pricing</h1>
        <p className="muted" style={{ maxWidth: "52ch", margin: "0 auto" }}>
          Pick a plan and check out with Stripe. Use the test card{" "}
          <code>4242 4242 4242 4242</code>, any future date and any CVC.
        </p>
      </section>
      <section
        style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", paddingBottom: 64 }}
      >
        {(Object.keys(PLANS) as Array<keyof typeof PLANS>).map((id) => (
          <div className="card" key={id}>
            <h2>{PLANS[id].name}</h2>
            <p style={{ fontSize: "2rem", fontWeight: 800, margin: "4px 0 12px" }}>
              {usd.format(PLANS[id].amount / 100)}
              <span className="muted" style={{ fontSize: "1rem", fontWeight: 500 }}>/{PLANS[id].interval}</span>
            </p>
            <ul className="muted" style={{ paddingLeft: 18, margin: "0 0 20px", minHeight: 72 }}>
              {FEATURES[id].map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <PlanPicker plan={id} />
          </div>
        ))}
      </section>
      <footer className="muted" style={{ textAlign: "center", fontSize: ".85rem", paddingBottom: 40 }}>
        Test mode only - no real charges. Built with Next.js and the Stripe API.
      </footer>
    </main>
  );
}
