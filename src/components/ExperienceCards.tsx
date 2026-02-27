"use client"

import { useState } from "react"
import cards from "@/data/experience-cards.json"

function Card({
  card,
  onAskChat,
}: {
  card: (typeof cards)[number]
  onAskChat: (q: string) => void
}) {
  const [response, setResponse] = useState<string | null>(null)
  const [questions, setQuestions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  async function expand() {
    setLoading(true)
    try {
      const res = await fetch("/api/experience", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: card.id,
          messages: [
            {
              role: "user",
              content: "Expand on this role and what makes it notable.",
            },
          ],
        }),
      })
      const { text, questions: q } = await res.json()
      setResponse(text)
      setQuestions(q)
    } catch {
      setResponse("Something went wrong. Try again.")
    }
    setLoading(false)
  }

  function collapse() {
    setResponse(null)
    setQuestions([])
  }

  return (
    <article className="card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <h3
          style={{ fontSize: "1.5rem", marginTop: 0, marginBottom: "0.25rem" }}
        >
          {card.header}
        </h3>
        <span
          style={{
            fontSize: "0.875rem",
            color: "var(--color-muted)",
            whiteSpace: "nowrap",
          }}
        >
          {card.dates}
        </span>
      </div>
      <p
        style={{
          fontSize: "0.875rem",
          color: "var(--color-muted)",
          marginBottom: "0.5rem",
        }}
      >
        {card.subtitle}
      </p>
      <ul style={{ marginLeft: "1.5rem", marginBottom: "1rem" }}>
        {card.bullets.map((b, i) => (
          <li key={i} style={{ marginBottom: "0.5rem" }}>
            <span>{b.text}</span>
          </li>
        ))}
      </ul>

      {response === null && !loading && (
        <button
          onClick={expand}
          style={{
            background: "none",
            border: "1px solid var(--color-border)",
            padding: "0.25rem 0.75rem",
            fontSize: "0.75rem",
            fontFamily: "monospace",
            cursor: "pointer",
            textTransform: "uppercase",
          }}
        >
          View AI Context
        </button>
      )}

      {loading && (
        <p
          style={{
            color: "var(--color-muted)",
            fontStyle: "italic",
            fontSize: "0.875rem",
          }}
        >
          Thinking...
        </p>
      )}

      {response !== null && (
        <div
          style={{
            marginTop: "0.5rem",
            padding: "1rem",
            border: "1px solid var(--color-border)",
            background: "var(--color-surface)",
            fontSize: "0.875rem",
            lineHeight: 1.6,
          }}
        >
          <div style={{ whiteSpace: "pre-wrap" }}>{response}</div>

          {questions.length > 0 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.375rem",
                marginTop: "0.75rem",
              }}
            >
              {questions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => onAskChat(q)}
                  style={{
                    textAlign: "left",
                    background: "none",
                    border: "1px solid var(--color-border)",
                    padding: "0.375rem 0.625rem",
                    fontSize: "0.75rem",
                    fontFamily: "monospace",
                    cursor: "pointer",
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          <button
            onClick={collapse}
            style={{
              background: "none",
              border: "none",
              fontSize: "0.75rem",
              fontFamily: "monospace",
              cursor: "pointer",
              marginTop: "0.75rem",
              color: "var(--color-muted)",
              textTransform: "uppercase",
            }}
          >
            Collapse
          </button>
        </div>
      )}
    </article>
  )
}

export default function ExperienceCards({
  onAskChat,
}: {
  onAskChat: (q: string) => void
}) {
  return (
    <section id="experience">
      <h2>Experience</h2>
      {cards.map((card) => (
        <Card key={card.id} card={card} onAskChat={onAskChat} />
      ))}
    </section>
  )
}
