"use client"

export default function Nav({ onChatOpen }: { onChatOpen: () => void }) {
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        background: "var(--color-bg)",
        borderBottom: "3px solid var(--color-border)",
        padding: "0.5rem 0",
        marginBottom: "1rem",
        zIndex: 100,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "0.5rem",
      }}
    >
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        <a href="#about" className="nav-link">
          Biography
        </a>
        <a href="#skills" className="nav-link">
          Skills
        </a>
        <a href="#experience" className="nav-link">
          Experience
        </a>
        <a href="#fit-check" className="nav-link">
          Fit Check
        </a>
        <button className="cta" onClick={onChatOpen} style={{ marginTop: 0 }}>
          Ask AI
        </button>
      </div>
    </nav>
  )
}
