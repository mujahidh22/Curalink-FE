import { useState } from "react"

import { IntakePanel } from "../components/IntakePanel.jsx"
import { ResultsWorkspace } from "../components/ResultsWorkspace.jsx"
import { useChatSession } from "../hooks/useChatSession.js"

const initialForm = {
  patientName: "",
  disease: "",
  intent: "",
  location: ""
}

export function ResearchAssistantPage() {
  const [form, setForm] = useState(initialForm)
  const { turns, isLoading, error, runQuery } = useChatSession()
  const latestCompletedTurn = [...turns].reverse().find((turn) => turn.status === "completed")

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({
      ...current,
      [name]: value
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    await runQuery(form)
  }

  return (
    <main className="min-h-screen px-4 py-5 md:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px] space-y-6">
        <header className="flex flex-col gap-4 rounded-[28px] border border-slate-200 bg-white px-6 py-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-slate-950">Medical Research Assistant</h1>
            <p className="mt-1 text-sm text-slate-500">Search across publications and clinical trials in one workspace.</p>
          </div>

          {latestCompletedTurn?.response?.context ? (
            <div className="flex flex-wrap items-center gap-2">
              {latestCompletedTurn.response.context.disease ? (
                <span className="rounded-full bg-slate-900 px-3 py-1.5 text-xs font-medium text-white">
                  {latestCompletedTurn.response.context.disease}
                </span>
              ) : null}
              {latestCompletedTurn.response.context.intent ? (
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600">
                  {latestCompletedTurn.response.context.intent}
                </span>
              ) : null}
              {latestCompletedTurn.response.context.location ? (
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600">
                  {latestCompletedTurn.response.context.location}
                </span>
              ) : null}
            </div>
          ) : null}
        </header>

        <section className="grid gap-6 lg:grid-cols-[360px,minmax(0,1fr)] xl:grid-cols-[390px,minmax(0,1fr)]">
          <IntakePanel
            error={error}
            isLoading={isLoading}
            onChange={handleChange}
            onSubmit={handleSubmit}
            values={form}
          />

          <ResultsWorkspace isLoading={isLoading} turns={turns} />
        </section>
      </div>
    </main>
  )
}
