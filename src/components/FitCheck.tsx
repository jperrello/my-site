"use client"

import { useState } from "react"

type Result = {
  verdict: "STRONG" | "MODERATE" | "WEAK"
  summary: string
  matches: { skill: string; evidence: string }[]
  gaps: { skill: string; explanation: string }[]
}

export default function FitCheck() {
  const [jd, setJd] = useState("")
  const [result, setResult] = useState<Result | null>(null)
  const [loading, setLoading] = useState(false)
  const [exampleLoading, setExampleLoading] = useState<string | null>(null)
  const [error, setError] = useState("")

  async function check(text: string) {
    setLoading(true)
    setError("")
    setResult(null)
    try {
      const res = await fetch("/api/fit-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: text }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || "Request failed")
      }
      const data = await res.json()
      setResult(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  async function example(type: "strong" | "weak") {
    setExampleLoading(type)
    setError("")
    try {
      const res = await fetch("/api/fit-example", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      })
      if (!res.ok) throw new Error("Failed to generate example")
      const data = await res.json()
      setJd(data.description)
      await check(data.description)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong")
    } finally {
      setExampleLoading(null)
    }
  }

  const strong = result?.verdict === "STRONG"
  const weak = result?.verdict === "WEAK"

  return (
    <section id="fit-check">
      <h2>Honest Fit Assessment</h2>
      <p style={{ color: "var(--color-muted)", fontSize: "0.875rem", marginBottom: "1rem" }}>
        Paste a job description. Get an honest assessment of whether I&apos;m the right
        person &mdash; including when I&apos;m not.
      </p>

      <textarea
        value={jd}
        onChange={(e) => setJd(e.target.value)}
        placeholder="Paste a job description here..."
        rows={6}
        style={{
          width: "100%",
          padding: "0.75rem",
          border: "2px solid var(--color-border)",
          fontFamily: "inherit",
          fontSize: "0.875rem",
          resize: "vertical",
          marginBottom: "0.75rem",
        }}
      />

      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        <button
          className="cta"
          onClick={() => check(jd)}
          disabled={!jd.trim() || loading}
          style={{ marginTop: 0 }}
        >
          {loading ? "Analyzing..." : "Check Fit"}
        </button>
        <button
          className="nav-link"
          onClick={() => example("strong")}
          disabled={loading || exampleLoading !== null}
          style={{ cursor: "pointer", background: "none" }}
        >
          {exampleLoading === "strong" ? "Generating..." : "Strong Fit Example"}
        </button>
        <button
          className="nav-link"
          onClick={() => example("weak")}
          disabled={loading || exampleLoading !== null}
          style={{ cursor: "pointer", background: "none" }}
        >
          {exampleLoading === "weak" ? "Generating..." : "Weak Fit Example"}
        </button>
      </div>

      {error && (
        <p style={{ color: "red", marginTop: "1rem", fontSize: "0.875rem" }}>
          {error}
        </p>
      )}

      {result && (
        <div
          style={{
            marginTop: "1.5rem",
            padding: "1.5rem",
            border: strong
              ? "3px solid var(--fit-strong)"
              : weak
                ? "3px solid var(--fit-weak)"
                : "3px solid var(--color-border)",
            background: "var(--color-surface-alt)",
          }}
        >
          <h3
            style={{
              marginTop: 0,
              fontSize: "1.5rem",
              color: strong
                ? "var(--fit-strong)"
                : weak
                  ? "var(--fit-weak)"
                  : "var(--color-muted)",
            }}
          >
            {strong
              ? "Strong Fit \u2014 Let\u2019s Talk"
              : weak
                ? "Honest Assessment \u2014 Probably Not Your Person"
                : `${result.verdict} FIT`}
          </h3>
          <p>{result.summary}</p>

          {result.matches.length > 0 && (
            <>
              <h3>Where I Match</h3>
              <ul>
                {result.matches.map((m, i) => (
                  <li key={i} style={{ marginBottom: "0.5rem" }}>
                    <span style={{ marginRight: "0.5rem" }}>&#10003;</span>
                    <strong>{m.skill}</strong>: {m.evidence}
                  </li>
                ))}
              </ul>
            </>
          )}

          {result.gaps.length > 0 && (
            <>
              <h3 style={{ color: "var(--fit-weak)" }}>Where I Don&apos;t Fit</h3>
              <ul>
                {result.gaps.map((g, i) => (
                  <li key={i} style={{ marginBottom: "0.5rem" }}>
                    <span style={{ marginRight: "0.5rem" }}>&#10005;</span>
                    <strong>{g.skill}</strong>: {g.explanation}
                  </li>
                ))}
              </ul>
            </>
          )}

          <p style={{ marginTop: "1rem", fontSize: "0.875rem" }}>
            Interested?{" "}
            <a href="mailto:jperrello8@gmail.com">Reach out</a> — I&apos;d love to talk.
          </p>
        </div>
      )}
    </section>
  )
}
