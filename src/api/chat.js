const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (
  import.meta.env.MODE === "production"
    ? "https://curalink-be.onrender.com"
    : "http://localhost:5000"
)

export async function submitResearchQuery(payload) {
  const response = await fetch(`${API_BASE_URL}/api/chat/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })

  if (!response.ok) {
    const errorPayload = await response.json().catch(() => ({}))
    throw new Error(errorPayload.error || "Unable to complete this research request.")
  }

  return response.json()
}

