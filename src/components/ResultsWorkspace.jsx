import { AssistantResponse } from "./AssistantResponse.jsx"
import { SourceCard } from "./SourceCard.jsx"

function EmptyPane({ title, description }) {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h2 className="font-display text-xl font-semibold text-slate-950">{title}</h2>
      </div>
      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-10 text-sm text-slate-500">
        {description}
      </div>
    </section>
  )
}

function ResultColumn({ title, count, items, emptyLabel }) {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="font-display text-xl font-semibold text-slate-950">{title}</h2>
        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500">
          {count}
        </span>
      </div>

      {items.length ? (
        <div className="space-y-4">
          {items.map((item) => (
            <SourceCard item={item} key={item.id} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-sm text-slate-500">
          {emptyLabel}
        </div>
      )}
    </section>
  )
}

function LoadingPanels() {
  return (
    <div className="grid gap-6">
      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display text-2xl font-semibold text-slate-950">AI Insights</h2>
          <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700">
            Processing
          </span>
        </div>
        <div className="mt-5 rounded-3xl border border-slate-200 bg-slate-50 px-5 py-5 text-sm leading-7 text-slate-600">
          Fetching publications, fetching clinical trials, and generating an evidence-backed answer.
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-display text-xl font-semibold text-slate-950">Relevant Publications</h2>
          <div className="mt-5 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-sm text-slate-500">
            Fetching publication results...
          </div>
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-display text-xl font-semibold text-slate-950">Clinical Trials</h2>
          <div className="mt-5 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-sm text-slate-500">
            Fetching clinical trial results...
          </div>
        </section>
      </div>
    </div>
  )
}

function TurnCard({ turn }) {
  const { input } = turn

  return (
    <article className="space-y-4 rounded-[32px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex justify-end">
        <div className="max-w-3xl rounded-[24px] bg-slate-950 px-5 py-4 text-white">
          <p className="text-sm leading-7">{input.displayText}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80">{input.disease}</span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80">{input.location}</span>
            {input.intent ? (
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80">{input.intent}</span>
            ) : null}
          </div>
        </div>
      </div>

      {turn.status === "loading" ? <LoadingPanels /> : null}

      {turn.status === "error" ? (
        <section className="rounded-[28px] border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700 shadow-sm">
          {turn.error || "Unable to complete this search."}
        </section>
      ) : null}

      {turn.status === "completed" ? (
        <div className="grid gap-6">
          <AssistantResponse response={turn.response} />

          <div className="grid gap-6 xl:grid-cols-2">
            <ResultColumn
              count={turn.response.evidence.publications.length}
              emptyLabel="No publication results were ranked for this search."
              items={turn.response.evidence.publications}
              title="Relevant Publications"
            />
            <ResultColumn
              count={turn.response.evidence.trials.length}
              emptyLabel="No clinical trials were ranked for this search."
              items={turn.response.evidence.trials}
              title="Clinical Trials"
            />
          </div>
        </div>
      ) : null}
    </article>
  )
}

export function ResultsWorkspace({ turns = [] }) {
  if (!turns.length) {
    return (
      <div className="grid gap-6">
        <EmptyPane title="AI Insights" description="Submit a disease and location to generate an evidence-backed answer." />
        <div className="grid gap-6 xl:grid-cols-2">
          <EmptyPane title="Relevant Publications" description="Top-ranked publications will appear here for each search." />
          <EmptyPane title="Clinical Trials" description="Matching clinical trials will appear here for each search." />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {turns.map((turn) => (
        <TurnCard key={turn.id} turn={turn} />
      ))}
    </div>
  )
}
