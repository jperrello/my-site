"use client"

import { useChat } from "@ai-sdk/react"
import { useState, useRef, useEffect } from "react"
import questions from "@/data/chat-questions.json"

const MAX_MESSAGES = 20

function extract(parts: { type: string; text?: string }[]) {
  return parts
    .filter((p) => p.type === "text")
    .map((p) => p.text)
    .join("")
}

export default function ChatModal({
  open,
  onClose,
  pending,
  onSent,
}: {
  open: boolean
  onClose: () => void
  pending?: string
  onSent?: () => void
}) {
  const [count, setCount] = useState(0)
  const [input, setInput] = useState("")
  const bottom = useRef<HTMLDivElement>(null)
  const last = useRef("")

  const { messages, setMessages, sendMessage, status } = useChat({
    onFinish: () => setCount((c) => c + 1),
  })

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    if (!open || !pending || pending === last.current) return
    last.current = pending
    sendMessage({ text: pending })
    onSent?.()
  }, [open, pending, sendMessage, onSent])

  if (!open) return null

  const loading = status === "streaming" || status === "submitted"
  const limited = count >= MAX_MESSAGES

  async function send(msg: string) {
    if (limited || !msg.trim()) return
    setInput("")
    await sendMessage({ text: msg })
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.5)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 600,
          maxHeight: "80vh",
          background: "var(--color-bg)",
          border: "3px solid var(--color-border)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            padding: "0.75rem 1rem",
            borderBottom: "2px solid var(--color-border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <strong>Ask AI about Joey</strong>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            {messages.length > 0 && (
              <button
                onClick={() => {
                  setMessages([])
                  setCount(0)
                  setInput("")
                }}
                style={{
                  background: "none",
                  border: "1px solid var(--color-border)",
                  padding: "0.25rem 0.5rem",
                  cursor: "pointer",
                  fontSize: "0.75rem",
                }}
              >
                New Chat
              </button>
            )}
            <button
              onClick={onClose}
              style={{
                background: "none",
                border: "none",
                fontSize: "1.25rem",
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              X
            </button>
          </div>
        </div>

        <div style={{ flex: 1, overflow: "auto", padding: "1rem" }}>
          {messages.length === 0 && (
            <div>
              <p style={{ color: "var(--color-muted)", fontSize: "0.875rem" }}>
                Ask me anything about Joey&apos;s background, projects, or
                skills.
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  marginTop: "0.75rem",
                }}
              >
                {questions.map((q) => (
                  <button
                    key={q.text}
                    onClick={() => send(q.text)}
                    style={{
                      textAlign: "left",
                      background: "none",
                      border: "1px solid var(--color-border)",
                      padding: "0.5rem 0.75rem",
                      cursor: "pointer",
                      fontSize: "0.875rem",
                    }}
                  >
                    {q.text}
                  </button>
                ))}
              </div>
            </div>
          )}
          {messages.map((m) => (
            <div
              key={m.id}
              style={{
                marginBottom: "0.75rem",
                display: "flex",
                justifyContent: m.role === "user" ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  maxWidth: "80%",
                  padding: "0.75rem",
                  fontSize: "0.875rem",
                  lineHeight: 1.5,
                  border:
                    m.role === "user"
                      ? "2px solid var(--color-border)"
                      : "none",
                  background:
                    m.role === "user"
                      ? "var(--color-bg)"
                      : "var(--color-surface)",
                  whiteSpace: "pre-wrap",
                }}
              >
                {extract(m.parts as { type: string; text?: string }[])}
              </div>
            </div>
          ))}
          <div ref={bottom} />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            send(input)
          }}
          style={{
            borderTop: "2px solid var(--color-border)",
            padding: "0.75rem",
            display: "flex",
            gap: "0.5rem",
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              limited ? "Message limit reached" : "Ask a question..."
            }
            disabled={limited || loading}
            style={{
              flex: 1,
              padding: "0.5rem",
              border: "2px solid var(--color-border)",
              fontSize: "0.875rem",
              fontFamily: "inherit",
            }}
          />
          <button
            type="submit"
            disabled={limited || loading || !input.trim()}
            className="cta"
            style={{ marginTop: 0, marginRight: 0 }}
          >
            Send
          </button>
        </form>
        {limited && (
          <p
            style={{
              padding: "0.5rem 0.75rem",
              fontSize: "0.75rem",
              color: "var(--color-muted)",
              textAlign: "center",
            }}
          >
            Session limit reached ({MAX_MESSAGES} messages). Refresh to start a
            new session.
          </p>
        )}
      </div>
    </div>
  )
}
