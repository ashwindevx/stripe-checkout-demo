import Link from "next/link";

export default function CancelPage() {
  return (
    <main className="wrap" style={{ maxWidth: 520, paddingTop: 72, textAlign: "center" }}>
      <div className="card">
        <p style={{ fontSize: "2.5rem", margin: 0 }}>↩</p>
        <h1>Checkout cancelled</h1>
        <p className="muted">Nothing was charged. You can pick a plan whenever you are ready.</p>
        <Link className="btn" href="/" style={{ marginTop: 8 }}>Back to pricing</Link>
      </div>
    </main>
  );
}
