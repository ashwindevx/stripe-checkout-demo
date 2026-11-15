import Link from "next/link";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string; demo?: string; plan?: string }>;
}) {
  const sp = await searchParams;
  return (
    <main className="wrap" style={{ maxWidth: 520, paddingTop: 72, textAlign: "center" }}>
      <div className="card">
        <p style={{ fontSize: "2.5rem", margin: 0 }}>✓</p>
        <h1>Payment successful</h1>
        <p className="muted">
          {sp.demo
            ? `Demo subscription to the ${sp.plan ?? "selected"} plan recorded. No charge was made.`
            : "Your subscription is active. A receipt is on its way to your inbox."}
        </p>
        {sp.session_id && (
          <p className="muted" style={{ fontSize: ".8rem", wordBreak: "break-all" }}>
            Session: {sp.session_id}
          </p>
        )}
        <Link className="btn" href="/" style={{ marginTop: 8 }}>Back to pricing</Link>
      </div>
    </main>
  );
}
