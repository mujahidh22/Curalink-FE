export function AssistantResponse({ response, isLoading }) {
  const { answer, candidateCounts, context, diagnostics = [] } = response

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-semibold text-slate-950">AI Insights</h2>
          <p className="mt-1 text-sm text-slate-500">
            {context.disease || "General search"}
            {context.intent ? ` / ${context.intent}` : ""}
          </p>
        </div>

        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-500">
          {candidateCounts.publications} publications / {candidateCounts.trials} trials reviewed
        </span>
      </div>

      {diagnostics.some((entry) => !entry.ok) ? (
        <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
          Some sources were unavailable for this search:{" "}
          {diagnostics
            .filter((entry) => !entry.ok)
            .map((entry) => entry.source)
            .join(", ")}
          .
        </div>
      ) : null}

      <section className="mt-5 rounded-3xl bg-slate-950 px-6 py-5 text-white">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/50">Summary</p>
        <p className="mt-3 text-sm leading-7 text-white/85">{answer.conditionOverview}</p>
      </section>

      <section className="mt-6 space-y-3">
        <p className="text-sm font-semibold text-slate-950">Key Insights</p>
        <div className="space-y-3">
          {answer.researchInsights?.map((insight) => (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-700" key={insight}>
              {insight}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6 space-y-3">
        <p className="text-sm font-semibold text-slate-950">Trial Outlook</p>
        <div className="space-y-3">
          {answer.clinicalTrials?.map((trialInsight) => (
            <div className="rounded-2xl border border-slate-200 px-4 py-3 text-sm leading-7 text-slate-700" key={trialInsight}>
              {trialInsight}
            </div>
          ))}
        </div>
      </section>

      {answer.followUpQuestions?.length ? (
        <section className="mt-6 space-y-2">
          <p className="text-sm font-semibold text-slate-950">Suggested Follow-ups</p>
          <div className="flex flex-wrap gap-2">
            {answer.followUpQuestions.map((question) => (
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600" key={question}>
                {question}
              </span>
            ))}
          </div>
        </section>
      ) : null}

      {answer.caution ? (
        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
          {answer.caution}
        </div>
      ) : null}

      {isLoading ? (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
          Refreshing results...
        </div>
      ) : null}
    </section>
  )
}
