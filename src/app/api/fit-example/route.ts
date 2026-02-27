import { createOpenAI } from "@ai-sdk/openai"
import { generateText } from "ai"

const openrouter = createOpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
})

const STRONG_PROMPT = `Generate a realistic job description (3-5 sentences) for a role that would be a strong fit for a new grad with these strengths: Python, TypeScript, mDNS/DNS-SD protocol design, REST API design, LLM integration, SQL/PostgreSQL, Docker, open source contributions, technical communication. Example roles: backend engineer, AI infrastructure engineer, developer tools engineer, API developer, Python developer. Vary the company type, role title, and specific requirements each time. Return ONLY the job description text, no formatting or labels.`

const WEAK_PROMPT = `Generate a realistic job description (3-5 sentences) for a role that would be a weak fit for a new grad. The role should require things like: 5+ years experience, Kubernetes expertise, AWS/GCP infrastructure, production oncall, SRE experience, ML model training, or deep frontend/design skills. Example roles: Staff SRE, Senior DevOps Engineer, ML Research Scientist, Principal Frontend Architect. Vary the company type, role title, and specific requirements each time. Return ONLY the job description text, no formatting or labels.`

export async function POST(req: Request) {
  const { type } = await req.json()
  if (type !== "strong" && type !== "weak") {
    return Response.json({ error: "Type must be 'strong' or 'weak'" }, { status: 400 })
  }

  const { text } = await generateText({
    model: openrouter("google/gemini-2.5-flash-lite-preview-09-2025:nitro"),
    prompt: type === "strong" ? STRONG_PROMPT : WEAK_PROMPT,
    maxOutputTokens: 300,
  })

  return Response.json({ description: text.trim() })
}
