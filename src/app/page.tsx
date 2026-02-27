"use client"

import { useState } from "react"
import Nav from "@/components/Nav"
import Hero from "@/components/Hero"
import Biography from "@/components/Biography"
import SkillsGrid from "@/components/SkillsGrid"
import ExperienceCards from "@/components/ExperienceCards"
import FitCheck from "@/components/FitCheck"
import Footer from "@/components/Footer"
import ChatModal from "@/components/ChatModal"

export default function Home() {
  const [chat, setChat] = useState(false)
  const [pending, setPending] = useState("")

  function openChat(question?: string) {
    if (question) setPending(question)
    setChat(true)
  }

  return (
    <>
      <Nav onChatOpen={() => openChat()} />
      <Hero onChatOpen={() => openChat()} />
      <ExperienceCards onAskChat={(q) => openChat(q)} />
      <Biography />
      <SkillsGrid />
      <FitCheck />
      <Footer />
      <ChatModal
        open={chat}
        onClose={() => { setChat(false); setPending("") }}
        pending={pending}
        onSent={() => setPending("")}
      />
    </>
  )
}
