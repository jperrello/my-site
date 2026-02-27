import profile from "@/data/profile.json"

export default function SkillsGrid() {
  const { skills } = profile
  return (
    <section id="skills">
      <h2>Skills</h2>
      <div className="skills-grid">
        <div className="card" style={{ borderTopWidth: "6px", borderTopColor: "#000" }}>
          <h3 style={{ color: "#000", marginTop: 0 }}>STRONG</h3>
          <ul style={{ listStyle: "none", marginLeft: 0 }}>
            {skills.strong.map((s) => (
              <li key={s.name} style={{ marginBottom: "0.5rem" }}>
                <span style={{ marginRight: "0.5rem" }}>&#10003;</span>
                <strong>{s.name}</strong>
                <br />
                <span style={{ fontSize: "0.8125rem", color: "var(--color-muted)" }}>
                  {s.detail}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card" style={{ borderTopWidth: "6px", borderTopColor: "#666" }}>
          <h3 style={{ color: "#666", marginTop: 0 }}>MODERATE</h3>
          <ul style={{ listStyle: "none", marginLeft: 0 }}>
            {skills.moderate.map((s) => (
              <li key={s.name} style={{ marginBottom: "0.5rem" }}>
                <span style={{ marginRight: "0.5rem" }}>&#9675;</span>
                <strong>{s.name}</strong>
                <br />
                <span style={{ fontSize: "0.8125rem", color: "var(--color-muted)" }}>
                  {s.detail}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card" style={{ borderTopWidth: "6px", borderTopColor: "#666" }}>
          <h3 style={{ color: "#666", marginTop: 0 }}>GAPS</h3>
          <ul style={{ listStyle: "none", marginLeft: 0 }}>
            {skills.gaps.map((s) => (
              <li key={s.name} style={{ marginBottom: "0.5rem" }}>
                <span style={{ marginRight: "0.5rem" }}>&#10005;</span>
                <strong>{s.name}</strong>
                <br />
                <span style={{ fontSize: "0.8125rem", color: "var(--color-muted)" }}>
                  {s.detail}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
