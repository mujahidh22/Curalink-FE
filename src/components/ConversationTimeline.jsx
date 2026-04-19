import { AssistantResponse } from "./AssistantResponse.jsx"

export function ConversationTimeline({ messages, isLoading }) {
  return (
    <section className="rounded-[32px] border border-white/70 bg-white/55 p-5 shadow-panel backdrop-blur">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink/40">Conversation</p>
          <h2 className="mt-1 font-display text-2xl font-semibold text-ink">Research timeline</h2>
        </div>
        {isLoading ? (
          <span className="rounded-full bg-sand/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-ember">
            Searching...
          </span>
        ) : null}
      </div>

      <div className="space-y-4">
        {messages.map((message) => (
          <div key={message.id}>
            {message.role === "assistant" && message.response ? (
              <AssistantResponse response={message.response} />
            ) : (
              <div
                className={`max-w-3xl rounded-[28px] px-5 py-4 text-sm leading-7 ${
                  message.role === "user"
                    ? "ml-auto bg-ink text-white"
                    : "bg-white/90 text-ink shadow-sm"
                }`}
              >
                {message.content}
              </div>
            )}
          </div>
        ))}

        {isLoading ? (
          <div className="max-w-xl rounded-[28px] bg-white/90 px-5 py-4 text-sm text-ink/70 shadow-sm">
            Pulling publications, trials, and evidence-backed insights...
          </div>
        ) : null}
      </div>
    </section>
  )
}

