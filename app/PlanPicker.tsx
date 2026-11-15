"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function PlanPicker({ plan }: { plan: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function start() {
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || "Could not start checkout");
      router.push(data.url); // Stripe-hosted page, or /demo-checkout in demo mode
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setBusy(false);
    }
  }

  return (
    <>
      <button className="btn" style={{ width: "100%" }} onClick={start} disabled={busy}>
        {busy ? "Redirecting…" : "Subscribe"}
      </button>
      {error && <p style={{ color: "#c01", fontSize: ".85rem", marginTop: 8 }}>{error}</p>}
    </>
  );
}
