import Image from "next/image"
import profile from "@/data/profile.json"

const RESUME_URL = "https://docs.google.com/document/d/1LFRu59g_5Sv_UZbjcVwY2nh2HB6MmaVK/edit?usp=sharing&ouid=108662796257647005613&rtpof=true&sd=true"
const REDDIT_URL = "https://www.reddit.com/user/NorthComplaint7631/"

export default function Hero({ onChatOpen }: { onChatOpen: () => void }) {
  const { bio } = profile
  return (
    <section id="top" className="hero">
      <div style={{ flex: 1 }}>
        <h1>Hello, I&apos;m Joey Perrello.</h1>
        <p style={{ fontSize: "1.125rem", maxWidth: "65ch" }}>
          I graduated from{" "}
          <a href="https://www.ucsc.edu/" target="_blank">UCSC</a> with a MSE
          in Computer Science and Engineering, with most of my research and
          course credit in Computational Media. I built{" "}
          <a href="https://github.com/jperrello/Saturn" target="_blank">Saturn</a>{" "}
          and was a teaching assistant for{" "}
          <a href="https://courses.engineering.ucsc.edu/courses/cse180" target="_blank">
            Database Systems.
          </a>{" "}
          I find large language models, and generative AI
          as a whole, to be incredibly interesting. It remains my primary area of
          focus and research, and I want to make education, creativity, and
          productivity stronger through the use of AI agents.
        </p>
        <p style={{ fontSize: "1.125rem", maxWidth: "65ch" }}>
          Saturn is my best and favorite project I have created. It is a
          zero-configuration service discovery system that uses mDNS and DNS-SD
          to automatically advertise and locate AI services on a network. Beyond
          the technology, this experience taught me the entire workflow behind
          creating a product. I created multiple use cases, a documentation site,
          and promoted it online. Outside of Saturn and generative AI, I enjoy
          creating 3D art as shown by my first{" "}
          <a
            href="https://www.reddit.com/r/BlenderDoughnuts/comments/1c0qcwe/first_donut_render/"
            target="_blank"
          >
            donut render.
          </a>{" "}
          I have done research in infopolitics while taking Network Security, and
          might have predicted the 2024 election results a month before they{" "}
          <a
            href="https://drive.google.com/file/d/1mevR1MN72UcHVMBmSqdMGuTbEDixRjOo/view?usp=sharing"
            target="_blank"
          >
            happened
          </a>
          . I have also built{" "}
          <a
            href="https://github.com/jperrello/MiniStS-Language-Driven-Play-Reimagined"
            target="_blank"
          >
            game playing agents
          </a>{" "}
          for Slay the Spire, and played around with game AI topics like MCTS,
          A*, and wave function collapse.
        </p>
        <p style={{ fontSize: "1.125rem", maxWidth: "65ch" }}>
          Feel free to look around this page at my projects and work experience.
          Below are highlighted projects and previous positions, reach out to me
          if you&apos;d like to talk or chat with AI here. I last updated this page in March 2026.
        </p>
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
          <a href={REDDIT_URL} target="_blank" className="nav-link">
            Reddit
          </a>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <Image
          src="/assets/grad_photo.jpg"
          alt={bio.name}
          width={200}
          height={300}
          priority
          style={{
            border: "2px solid var(--color-border)",
            objectFit: "cover",
          }}
        />
        <button
          className="cta"
          onClick={onChatOpen}
          style={{ marginTop: "1rem", marginRight: 0 }}
        >
          Ask AI About Me
        </button>
      </div>
    </section>
  )
}
