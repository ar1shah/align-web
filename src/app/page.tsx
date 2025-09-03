import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="section">
        <div className="container grid gap-10 md:grid-cols-2 items-center">
          <div>
            <span className="badge">Real estate, re-aligned</span>
            <h1 className="text-4xl md:text-5xl font-semibold mt-4 leading-tight">
              Find the realtor who fits you — not just the one who advertises the most.
            </h1>
            <p className="muted mt-4 text-lg">
              Answer a few questions and get matched with vetted agents based on personality, expertise, and your goals.
            </p>
            <div className="flex gap-3 mt-6">
              <Link href="/quiz" className="btn btn-primary">Find My Realtor</Link>
              <a href="#how-it-works" className="btn btn-outline">How it works</a>
            </div>
            <p className="muted text-sm mt-3">It’s free for home buyers and sellers.</p>
          </div>
          <div className="card card-padding">
            <div className="grid gap-3">
              <div className="rounded-lg p-4 border border-[var(--border)] bg-gradient-to-br from-[rgba(99,102,241,0.12)] to-[rgba(6,182,212,0.08)]">
                <p className="text-sm muted">Smart Matching</p>
                <p className="mt-1">We pair you with agents who match your style and market.</p>
              </div>
              <div className="rounded-lg p-4 border border-[var(--border)]">
                <p className="text-sm muted">Verified Agents</p>
                <p className="mt-1">Every agent is license-verified and reviewed before joining.</p>
              </div>
              <div className="rounded-lg p-4 border border-[var(--border)]">
                <p className="text-sm muted">No Spam</p>
                <p className="mt-1">You hear from a small, curated set — not dozens of cold calls.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logos / Trust bar (placeholder) */}
      <section className="section">
        <div className="container flex items-center justify-center gap-10 opacity-80">
          <span className="muted">Trusted by agents across major markets</span>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="section">
        <div className="container">
          <h2 className="text-2xl font-semibold">How it works</h2>
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <div className="card card-padding">
              <span className="badge">Step 1</span>
              <h3 className="mt-2 font-semibold">Tell us about you</h3>
              <p className="muted mt-1">Budget, timeline, location, property type, and preferences.</p>
            </div>
            <div className="card card-padding">
              <span className="badge">Step 2</span>
              <h3 className="mt-2 font-semibold">Get matched</h3>
              <p className="muted mt-1">We surface a curated shortlist of ideal agents.</p>
            </div>
            <div className="card card-padding">
              <span className="badge">Step 3</span>
              <h3 className="mt-2 font-semibold">Meet and choose</h3>
              <p className="muted mt-1">Talk to them and pick the agent you click with.</p>
            </div>
          </div>
          <div className="mt-6">
            <Link href="/quiz" className="btn btn-primary">Start the quiz</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container card card-padding text-center">
          <h2 className="text-2xl font-semibold">Ready to get matched?</h2>
          <p className="muted mt-2">It takes under 2 minutes.</p>
          <div className="mt-4">
            <Link href="/quiz" className="btn btn-primary">Find My Realtor</Link>
          </div>
        </div>
      </section>
    </>
  );
}

