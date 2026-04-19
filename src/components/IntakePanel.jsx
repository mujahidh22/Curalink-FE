const fields = [
  {
    id: "patientName",
    label: "Patient name",
    placeholder: "John Smith"
  },
  {
    id: "disease",
    label: "Disease",
    placeholder: "Parkinson's disease",
    required: true
  },
  {
    id: "intent",
    label: "Research angle",
    placeholder: "Deep brain stimulation"
  },
  {
    id: "location",
    label: "Location",
    placeholder: "Toronto, Canada",
    required: true
  }
]

export function IntakePanel({
  values,
  onChange,
  onSubmit,
  isLoading,
  error
}) {
  return (
    <aside className="space-y-6">
      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="font-display text-2xl font-semibold text-slate-950">Search</h2>
          <p className="mt-1 text-sm text-slate-500">Enter a condition and location to find research.</p>
        </div>

        <form className="space-y-5" onSubmit={onSubmit}>
          <div className="grid gap-4">
            {fields.map((field) => (
              <label className="block" htmlFor={field.id} key={field.id}>
                <span className="mb-2 block text-sm font-medium text-slate-700">
                  {field.label}
                  {field.required ? <span className="ml-1 text-rose-500">*</span> : null}
                </span>
                <input
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5"
                  id={field.id}
                  name={field.id}
                  onChange={onChange}
                  placeholder={field.placeholder}
                  required={field.required}
                  value={values[field.id]}
                />
              </label>
            ))}
          </div>

          {error ? (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>
          ) : null}

          <button
            className="w-full rounded-full bg-slate-950 px-5 py-3 font-display text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </form>
      </section>
    </aside>
  )
}
