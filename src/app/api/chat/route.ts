import { createOpenAI } from "@ai-sdk/openai"
import { streamText } from "ai"
import { readFileSync } from "fs"
import { join } from "path"

const openrouter = createOpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
})

const systemPrompt = readFileSync(
  join(process.cwd(), "src/data/system-prompt.md"),
  "utf-8"
)

export async function POST(req: Request) {
  const { messages } = await req.json()

  const normalized = messages.map((m: Record<string, unknown>) => ({
    role: m.role,
    content:
      m.content ??
      (m.parts as { type: string; text?: string }[])
        ?.filter((p) => p.type === "text")
        .map((p) => p.text)
        .join(""),
  }))

  const result = streamText({
    model: openrouter.chat("google/gemini-2.5-flash-lite-preview-09-2025:nitro"),
    system: systemPrompt,
    messages: normalized,
    maxOutputTokens: 500,
  })

  return result.toUIMessageStreamResponse()
}
