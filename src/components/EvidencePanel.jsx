import { SourceCard } from "./SourceCard.jsx"

export function EvidencePanel({ result }) {
  return (
    <section className="rounded-[32px] border border-white/70 bg-white/70 p-5 shadow-panel backdrop-blur">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink/40">Evidence</p>
          <h2 className="mt-1 font-display text-2xl font-semibold text-ink">Top sources</h2>
        </div>
        {result ? (
          <span className="rounded-full bg-tide/10 px-3 py-1 text-xs font-semibold text-tide">
            {result.evidence.publications.length + result.evidence.trials.length} surfaced
          </span>
        ) : null}
      </div>

      {!result ? (
        <div className="rounded-3xl border border-dashed border-ink/15 px-4 py-8 text-center text-sm leading-7 text-ink/60">
          Run a question to see ranked publications and clinical trials here.
        </div>
      ) : (
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink/45">Publications</p>
            <div className="space-y-3">
              {result.evidence.publications.map((item) => (
                <SourceCard item={item} key={item.id} />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink/45">Clinical Trials</p>
            <div className="space-y-3">
              {result.evidence.trials.length ? (
                result.evidence.trials.map((item) => <SourceCard item={item} key={item.id} />)
              ) : (
                <div className="rounded-2xl bg-mist px-4 py-3 text-sm text-ink/70">
                  No trial cards were ranked for the latest query.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

