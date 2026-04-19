import { useState } from "react"

import { submitResearchQuery } from "../api/chat.js"

function normalizeDisplayText(payload) {
  return payload.message?.trim() || payload.intent?.trim() || payload.disease?.trim() || "Research request"
}

export function useChatSession() {
  const [turns, setTurns] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  async function runQuery(payload) {
    const disease = payload.disease?.trim()
    const location = payload.location?.trim()

    if (!disease || !location) {
      setError("Disease and location are required.")
      return
    }

    const turnId = `turn-${Date.now()}`
    const displayText = normalizeDisplayText(payload)

    setError("")
    setIsLoading(true)
    setTurns([
      {
        id: turnId,
        input: {
          patientName: payload.patientName?.trim() || "",
          disease,
          intent: payload.intent?.trim() || "",
          location,
          message: payload.message?.trim() || "",
          displayText
        },
        status: "loading"
      }
    ])

    try {
      const result = await submitResearchQuery({
        patientName: payload.patientName?.trim() || "",
        disease,
        intent: payload.intent?.trim() || "",
        location,
        message: payload.message?.trim() || ""
      })

      setTurns((current) =>
        current.map((turn) =>
          turn.id === turnId
            ? {
                ...turn,
                status: "completed",
                response: result
              }
            : turn
        )
      )
    } catch (requestError) {
      setTurns((current) =>
        current.map((turn) =>
          turn.id === turnId
            ? {
                ...turn,
                status: "error",
                error: requestError.message
              }
            : turn
        )
      )
      setError(requestError.message)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    turns,
    isLoading,
    error,
    runQuery
  }
}
