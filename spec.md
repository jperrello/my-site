# Personal AI Interface — Spec

Reference: rework.md (strategy), current site at docs/ (content + aesthetic to preserve)

## Current State

The existing site lives in `docs/` as three static HTML files: `index.html`, `projects.html`, `work-experience.html`. It uses a brutalist aesthetic — white background, black borders, monospace tags, system font stack, uppercase labels, no rounded corners, no gradients. The homepage has a deeply personal biography section that tells the story of growing up in Turlock, studying at CSU Stanislaus, mentors like Ayat Hatem, study abroad in London, and the journey to UCSC.

**What to preserve from the current site:**
- The brutalist white aesthetic (colors, borders, typography feel)
- The full biography text (all 5 paragraphs from `docs/index.html` lines 408-422)
- The grad photo (`docs/assets/grad_photo.jpg`)
- The personal, honest voice — this site doesn't sound corporate
- Social links: Email, GitHub, Twitter/X, LinkedIn, Resume, Reddit

**What changes:**
- Static HTML → Next.js (for API routes powering AI chat + fit check)
- Three separate pages → single scrollable page
- Add AI chat modal, experience cards with AI Context toggles, skills grid, fit check tool
- CSS moves from inline `<style>` blocks to minimal Tailwind + custom brutalist classes

## Page Structure — Single Page Scroll

```
Hero (friendly intro paragraphs + photo, old-site style)
  ↓
Biography
  ↓
Skills Grid (Strong / Moderate / Gaps)
  ↓
Experience Cards (with "View AI Context" toggles)
  ↓
Fit Check (Honest Fit Assessment)
  ↓
Footer (social links repeated)

[AI Chat Modal — floating overlay, triggered from Hero or nav]
```

## Sections

### 1. Hero

Friendly intro section matching the old site's style. White background, thick black bottom border. Photo on the right, text on the left.

- **Nav**: Site title or initials (left). "Biography" | "Skills" | "Experience" | "Fit Check" | "Ask AI" (right). "Ask AI" is a bordered button that opens the chat modal. Nav links are anchor scrolls to sections on the page.
- **Heading**: "Hello, I'm Joey Perrello." — bold, system font, warm and direct.
- **Intro paragraphs**: 3 short paragraphs in the style of the old site hero. Conversational, personal voice. Updated content:
  - **Paragraph 1**: Graduated from UCSC with MSE in CS&E, research in Computational Media. Built Saturn. Was a TA for Database Systems (no longer as of January 2026). Passion for LLMs, generative AI, AI agents for education/creativity/productivity.
  - **Paragraph 2**: Saturn description — zero-config service discovery, mDNS/DNS-SD, product workflow. Side interests: 3D art (donut render), Infopolitics research, game-playing agents (Slay the Spire), game AI (MCTS, A*, wave function collapse). Keep all inline links.
  - **Paragraph 3**: "Feel free to look around..." invitation. Updated: "I last updated this page in March 2026."
- **Photo**: Grad photo (`assets/grad_photo.jpg`), positioned to the right of intro text (same layout as current site). 2px black border.
- **"Ask AI About Me" button**: Placed directly under the photo. Black background, white text, thick border. Opens chat modal.
- **Social links**: Below the intro text. Email, GitHub, Twitter/X, LinkedIn, Resume, Reddit — styled as bordered, uppercase, bold buttons.

No scroll indicator. No serif fonts. Keep the system font stack: `-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif`.

### 2. Biography

The full personal narrative from the current site. All 5 paragraphs preserved as-is. This is a differentiator — most portfolio sites don't have one.

Content source: `docs/index.html` lines 408-422 (the `#about` section). The text covers:
1. Modesto Junior College during COVID, Togo's Sandwiches, struggling to find purpose
2. CSU Stanislaus support system, Learning Services, Ayat Hatem, ASPIRE Pathway, Google Explore CSR
3. Study abroad in London, living in Monterey, Kayak Connection, Blender, Leetcode
4. UCSC — Network Security with Ram Raman, Interactive Storytelling with Mateas, Teaching with Generative AI with Adam Smith, building Saturn
5. Looking forward, wanting to build AI tools for productivity

Keep all the inline links (to UCSC, Blender, Capcut, Kayak Connection, etc.). The biography is the human part of the site — it shouldn't be compressed or rewritten.

### 3. Experience Cards

Vertical list of cards. Each card has a thick black border, white/light gray background (`#fafafa`).

- **Header row**: Project or company name (left), date range (right)
- **Subtitle**: Role title
- **Bullets**: 2-4 concise achievement lines
- **"View AI Context" toggle button**: Bordered button, uppercase. Expands inline to show a SITUATION / APPROACH / RESULT narrative per bullet. Toggles to "Hide AI Context" when open.

Data source: `data/experience-cards.json` — already contains all entries with pre-generated AI Context narratives. Use **Option A (pre-generated at build time)** since the narratives already exist as static JSON.

Entries in order:
1. Saturn (Master's Project) — 5 bullets with AI Context
2. OpenCode-Saturn (Open Source Contribution) — 1 bullet with AI Context
3. Auto-Student (Academic Assignment Automation) — 1 bullet with AI Context
4. Language Driven Play (LLM Game-Playing Agents) — 1 bullet with AI Context
5. Teaching Assistant — Database Systems — 2 bullets with AI Context
6. In-Person Instructor — iD Tech Camps — 1 bullet with AI Context
7. Software Engineer Intern — Cosmo by Filisia — 1 bullet with AI Context
8. Peer Tutor — Learning Commons — 1 bullet with AI Context

### 4. Skills Grid

**Placed directly after Biography, before Experience Cards.**

Three columns. Each column is a card with thick black border and a color-coded top border or header:

| Column | Top border color | Marker | Purpose |
|--------|-----------------|--------|---------|
| **STRONG** | Black (default) | ✓ | Skills with depth and evidence |
| **MODERATE** | Gray (#666) | ○ | Skills used but not deep |
| **GAPS (I'LL TELL YOU)** | Gray (#666) | ✕ | Honest gaps — the differentiator |

Each skill entry: marker + skill name + one-line detail in smaller text.

Data source: `data/profile.json` → `skills.strong`, `skills.moderate`, `skills.gaps`.

**Additions to Moderate**: "CI/CD Pipelines" and "Large Team Collaboration" must be included in the moderate column.

The Gaps column is the power move. At entry level, publishing gaps signals self-awareness and coachability.

### 5. Fit Check (Honest Fit Assessment)

Standalone section with thick black border.

- **Heading**: "Honest Fit Assessment" (large, bold, system font — NOT serif)
- **Subhead**: "Paste a job description. Get an honest assessment of whether I'm the right person — including when I'm not."
- **Example toggle**: Two bordered buttons — "Strong Fit Example" | "Weak Fit Example". **Each click fires a small LLM call** that generates a different example job description (e.g. Python developer, teaching role, database engineer, infra role, etc.). The generated JD populates the textarea, then the user can run the main fit check. Examples should vary each time — never the same static text.
- **Textarea**: Black-bordered textarea, monospace placeholder text
- **Result display**: Two states:
  - **Strong Fit**: Green-bordered card (`--fit-strong`). "Strong Fit — Let's Talk" header. "WHERE I MATCH" entries with ✓ markers.
  - **Weak Fit**: Red-bordered card (`--fit-weak`). "Honest Assessment — Probably Not Your Person" header. "WHERE I DON'T FIT" entries with ✕ markers.

Both outcomes show a link to email/contact. The AI reads the job description, matches against `data/fit-check-profile.json`, and returns structured JSON rendered into the UI.

**Prompt tuning**: The fit check prompt should be slightly tuned to find alignment where it genuinely exists — highlight relevant experience and transferable skills. However, if the AI would need to fabricate or stretch facts to claim a fit, it must return a weak fit. Honesty over flattery, but generosity in recognizing real overlap.

Prompt: `data/fit-check-prompt.md`

### 6. Footer

Simple footer with top border (3px solid black).

- Social links repeated: Email, GitHub, Twitter/X, LinkedIn, Resume, Reddit — same bordered button style as hero
- No copyright line (current site already removed it)

### 7. AI Chat Modal

Floating modal overlay. Triggered by "Ask AI" nav button or hero CTA. Stays open while user scrolls.

- **Header**: "Ask AI About Joey" + close X button
- **Welcome state**: "What would you like to know?" + 4 suggested question cards (clickable, bordered)
- **Chat state**: User messages right-aligned (black border), AI responses left-aligned (light gray background). Streaming text.
- **Input**: Black-bordered input field + send button

Suggested questions from `data/chat-questions.json`. System prompt from `data/system-prompt.md`.

**Styling**: The modal should feel brutalist — black borders, no rounded corners, no shadows, no blur backdrop. A simple overlay with a white modal box and thick black border.

---

## Visual Design System

Carry forward from the current site's CSS variables:

```css
:root {
  --bg: #ffffff;
  --fg: #000000;
  --border: #000000;
  --gray: #666666;
  --fit-strong: #2e7d32; /* green — strong fit only */
  --fit-weak: #c62828;   /* red — weak fit only */
  --spacing: 1rem;
}
```

**Color rule: black, white, and gray only.** No blue anywhere. Green and red are used exclusively in the Fit Check section for strong/weak fit results.

- **Font**: `-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif` — NO serif fonts, NO Playfair Display
- **Tags/labels**: `monospace`, uppercase, small font, 1px black border, `#f0f0f0` background
- **Borders**: Thick (2-4px) solid black. No rounded corners anywhere.
- **Buttons/links**: Bordered, uppercase, bold, no decoration. Hover inverts (black bg, white text). No accent color hovers.
- **Cards**: White or `#fafafa` background, 3px solid black border, 1.5rem padding
- **No shadows, no gradients, no blur effects, no animations** (except hover state changes)
- **Max width**: 900px, centered
- **Responsive**: Stack to single column at 768px (same breakpoint as current site)

---

## Tech Stack

### Frontend
- **Next.js** (App Router) — handles the page and API routes
- **Tailwind CSS** — used minimally for reset, spacing utilities, and responsive breakpoints. The brutalist look comes from custom CSS classes, NOT Tailwind component patterns. Don't make it look like a Tailwind template.
- **Font**: System font stack only. No Google Fonts imports.
- **Vercel AI SDK** (`ai` package) — `useChat` hook for streaming chat UI

### CSS Approach
Write custom CSS classes that mirror the brutalist aesthetic of the current site. Use Tailwind for:
- CSS reset / normalize
- Spacing utilities (p-4, m-2, etc.) where convenient
- Responsive breakpoints (md:, lg:)
- Flex/grid utilities

Do NOT use Tailwind for:
- Colors (use CSS variables)
- Borders (write explicit border styles)
- Typography (use the system font stack)
- Component patterns (no `rounded-lg shadow-md` etc.)

The result should feel hand-crafted, not generated from a UI kit.

### Backend
- **Next.js API routes** (serverless functions on Vercel) — proxy AI calls so the API key stays server-side
- Three endpoints: `/api/chat` (AI chat), `/api/fit-check` (fit assessment), and `/api/fit-example` (generates a random example job description for the fit check demo buttons)
- No database. Profile data lives as JSON/markdown in `data/`.

### AI Model

| Model | Input/1M tokens | Output/1M tokens | Why |
|-------|-----------------|-------------------|-----|
| **GPT-4o-mini** | $0.15 | $0.60 | Best cost/quality ratio for this use case |
| **Gemini 2.0 Flash** | $0.10 | $0.40 | Cheapest viable option, generous free tier |
| **DeepSeek V3** | $0.07 | $0.28 | Cheapest capable model period |

Recommendation: **GPT-4o-mini**. ~$0.0005 per conversation, ~$0.005 per fit check. 1000 visitors/month = $1-5.

### Hosting

| Service | Cost | What it covers |
|---------|------|----------------|
| **Vercel** | $0 (free tier) | Frontend + API routes + edge CDN |
| **Domain** | ~$12/year | yourname.dev or similar |
| **AI API** | $1-5/month | GPT-4o-mini usage |
| **Total** | ~$2-6/month | |

---

## AI System Design

### System Prompt Architecture

One system prompt for the chat (`data/system-prompt.md`), a separate one for fit check (`data/fit-check-prompt.md`). Both are already written.

### Rate Limiting

- 20 messages per chat session
- 5 fit checks per IP per day
- 500 output token cap per response
- Vercel edge middleware or simple in-memory counter

### AI Context for Experience Bullets

**Use Option A — pre-generated at build time.** The narratives already exist in `data/experience-cards.json` as SITUATION/APPROACH/RESULT structures. The "View AI Context" toggle reveals this pre-written content. Zero runtime cost.

---

## Data Files (Already Prepared)

All in `data/`:

| File | Purpose | Status |
|------|---------|--------|
| `profile.json` | Full structured profile (bio, education, projects, experience, skills) | Ready |
| `experience-cards.json` | Experience entries with AI Context narratives | Ready |
| `biography.md` | Full personal narrative (5 paragraphs, markdown with links) | Ready |
| `system-prompt.md` | System prompt for AI chat (includes personal background context) | Ready |
| `fit-check-prompt.md` | System prompt for fit check endpoint | Ready |
| `fit-check-profile.json` | Condensed profile for fit check matching | Ready |
| `chat-questions.json` | Suggested questions for chat welcome state | Ready |

The biography text lives in `data/biography.md` (extracted from the current site). Render it as static JSX in the Biography component. All links are preserved as markdown links in the file.

---

## Resolved Decisions

- [x] Projects and Experience are folded into one "Experience" section with cards (not separate pages)
- [x] Color scheme: brutalist white (preserve current site aesthetic), NOT dark theme
- [x] Contact surface: social links in hero + footer, AI chat as primary engagement tool
- [x] Biography: kept in full, placed between Hero and Experience
- [x] Photo: kept, placed in Hero section
- [x] AI Context approach: Option A (pre-generated, already in experience-cards.json)
- [x] CSS: Tailwind minimal + custom brutalist classes
- [ ] Domain name: TBD

---

## Making It Work at Entry Level

The rework.md flags a risk: "Early career with limited substance — an AI trained on two internships won't sustain deep interrogation."

Advantages that mitigate this:

1. **Saturn is a real system** — mDNS, DNS-SD, priority routing, OpenAI-compatible API, health monitoring. Sustains deep technical conversation.
2. **The site itself is a project** — building this demonstrates full-stack skills, API integration, prompt engineering, and product thinking.
3. **Teaching experience is rare signal** — most entry-level candidates can't explain things clearly.
4. **The biography is a differentiator** — it shows a real person with a nonlinear path, not a resume factory. Hiring managers remember stories.
5. **Honesty scales down** — the Gaps column and "Probably Not Your Person" fit check are *more* impressive from a new grad.
