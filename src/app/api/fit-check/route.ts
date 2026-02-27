import { createOpenAI } from "@ai-sdk/openai"
import { generateText } from "ai"
import { readFileSync } from "fs"
import { join } from "path"

import fitCheckProfile from "@/data/fit-check-profile.json"

const openrouter = createOpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
})

const fitCheckPrompt = readFileSync(
  join(process.cwd(), "src/data/fit-check-prompt.md"),
  "utf-8"
)

const limits = new Map<string, { count: number; reset: number }>()
const MAX_PER_DAY = 5

function rateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = limits.get(ip)
  if (!entry || now > entry.reset) {
    limits.set(ip, { count: 1, reset: now + 86400000 })
    return true
  }
  if (entry.count >= MAX_PER_DAY) return false
  entry.count++
  return true
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || "unknown"

  if (!rateLimit(ip)) {
    return Response.json(
      { error: "Rate limit exceeded. Try again tomorrow." },
      { status: 429 }
    )
  }

  const { description } = await req.json()
  if (!description || typeof description !== "string") {
    return Response.json({ error: "Job description required" }, { status: 400 })
  }

  const prompt = `${fitCheckPrompt}\n\n## Candidate Profile Data\n${JSON.stringify(fitCheckProfile, null, 2)}\n\n## Job Description to Evaluate\n${description}`

  const { text } = await generateText({
    model: openrouter("google/gemini-2.5-flash-lite-preview-09-2025:nitro"),
    prompt,
    maxOutputTokens: 1000,
  })

  try {
    const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim()
    const parsed = JSON.parse(cleaned)
    return Response.json(parsed)
  } catch {
    return Response.json(
      { error: "Failed to parse AI response" },
      { status: 500 }
    )
  }
}
