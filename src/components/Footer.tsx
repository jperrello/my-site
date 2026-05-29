import profile from "@/data/profile.json"

const RESUME_URL = "/Joseph_Perrello_Resume.pdf"
const TRANSCRIPT_URL = "/Joseph_Perrello_Transcript.pdf"
const REDDIT_URL = "https://www.reddit.com/user/NorthComplaint7631/"

export default function Footer() {
  const { bio } = profile
  return (
    <footer
      style={{
        marginTop: "4rem",
        paddingTop: "2rem",
        borderTop: "3px solid var(--color-border)",
      }}
    >
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        <a href={`mailto:${bio.contact.email}`} className="nav-link">
          Email
        </a>
        <a href={bio.contact.github} target="_blank" className="nav-link">
          GitHub
        </a>
        <a
          href={`https://x.com/${bio.contact.twitter?.replace("@", "")}`}
          target="_blank"
          className="nav-link"
        >
          Twitter / X
        </a>
        <a href={bio.contact.linkedin} target="_blank" className="nav-link">
          LinkedIn
        </a>
        <a href={RESUME_URL} target="_blank" className="nav-link">
          Resume
        </a>
        <a href={TRANSCRIPT_URL} target="_blank" className="nav-link">
          Transcript
        </a>
        <a href={REDDIT_URL} target="_blank" className="nav-link">
          Reddit
        </a>
      </div>
    </footer>
  )
}
