import { formatAuthors, formatLocations, formatMeta } from "../lib/formatters.js"

export function SourceCard({ item }) {
  const isTrial = item.type === "trial"

  return (
    <article className="rounded-[24px] border border-slate-200 bg-white p-5 transition hover:border-slate-300">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            {isTrial ? "Clinical Trial" : "Publication"}
          </p>
          <h3 className="mt-2 font-display text-lg font-semibold leading-7 text-slate-950">{item.title}</h3>
        </div>
        {item.score ? (
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500">
            Score {item.score}
          </span>
        ) : null}
      </div>

      <p className="mt-3 text-sm text-slate-500">{formatMeta(item)}</p>

      {isTrial ? (
        <>
          <p className="mt-4 text-sm leading-6 text-slate-700">{item.snippet || item.summary || "Trial summary unavailable."}</p>
          <p className="mt-4 text-sm text-slate-500">{formatLocations(item.locations)}</p>
        </>
      ) : (
        <>
          <p className="mt-4 text-sm leading-6 text-slate-700">{item.snippet || "Abstract not available."}</p>
          <p className="mt-4 text-sm text-slate-500">{formatAuthors(item.authors)}</p>
        </>
      )}

      {item.url ? (
        <a
          className="mt-5 inline-flex text-sm font-semibold text-slate-900 transition hover:text-slate-600"
          href={item.url}
          rel="noreferrer"
          target="_blank"
        >
          View source
        </a>
      ) : null}
    </article>
  )
}
