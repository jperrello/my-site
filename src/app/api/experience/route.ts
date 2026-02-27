import { createOpenAI } from "@ai-sdk/openai"
import { generateText } from "ai"
import cards from "@/data/experience-cards.json"

const openrouter = createOpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
})

function prompt(id: string) {
  const card = cards.find((c) => c.id === id)
  if (!card) return ""

  const bullets = card.bullets
    .map((b) => {
      let s = `- ${b.text}`
      if (b.ai_context) {
        s += `\n  Situation: ${b.ai_context.situation}`
        s += `\n  Approach: ${b.ai_context.approach}`
        s += `\n  Result: ${b.ai_context.result}`
      }
      return s
    })
    .join("\n\n")

  const others = cards
    .filter((c) => c.id !== id)
    .map((c) => `- ${c.header} (${c.dates})`)
    .join("\n")

  return `You represent Joey Perrello's professional background. You are discussing:

${card.header}
${card.subtitle} | ${card.dates}

Details:
${bullets}

Other experience (reference if relevant):
${others}

Rules:
- Expand on what's written with depth and specificity. Third person.
- 2-3 short paragraphs max. No markdown formatting.
- End with exactly 3 follow-up questions, each on its own line starting with "?> ".
- Questions should mainly be about this role but can reference other experience.`
}

export async function POST(req: Request) {
  const { id, messages } = await req.json()

  const { text } = await generateText({
    model: openrouter("google/gemini-2.5-flash-lite-preview-09-2025:nitro"),
    system: prompt(id),
    messages,
    maxOutputTokens: 500,
  })

  const lines = text.split("\n")
  const questions = lines
    .filter((l) => l.trimStart().startsWith("?> "))
    .map((l) => l.trimStart().slice(3).trim())
  const body = lines
    .filter((l) => !l.trimStart().startsWith("?> "))
    .join("\n")
    .trim()

  return Response.json({ text: body, questions })
}
