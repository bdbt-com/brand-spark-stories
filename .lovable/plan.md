## Plan

### 1) Home page — append three new sections (in order) at the bottom, after the existing "They're All Connected" section

**(a) Start For Free** — centred section
- Italic heading: *Start For Free*
- Foundation Blueprint thumbnail image. Use the existing `linkBlueprintAsset` (already imported at top of Home.tsx) so we don't add a new asset.
- Sub-heading (bold italic): *Not ready for a course?*
- Body (italic muted): *Download the free Foundation Blueprint and start building momentum today.*
- Primary CTA button **Download Free Blueprint** → links to `/blueprint`

**(b) Learn For Free Every Day** — centred section
- Italic gold heading: *Learn For Free Every Day*
- Embed the three existing top podcast episodes (`PODCAST_EPISODES` already declared in Home.tsx) as YouTube embeds in a responsive 1‑col mobile / 3‑col desktop grid
- Sub-line (italic): *30,000+ people learning better habits every day*
- Outline button **Watch On YouTube** → opens `https://youtube.com/@BigDaddysBigTips` via the `/redirect` bridge (per project rule)
- Below that, the **About Me** block:
  - Italic gold heading *About Me*
  - The two italic paragraphs already used on `/about` (lines 51 and 54 of About.tsx) — copy the strings, do not refactor the About page
  - Outline button **My Story** → `Link` to `/about#story` (so it goes to the existing Read My Story content)

**(c) Ready To Replace Daily Drifts With Daily Wins?** — final closing section, sits at very bottom of page
- Large italic gold heading
- Two side‑by‑side CTA buttons (stack on mobile):
  - **Start With The Free Foundation Blueprint** → `/blueprint`
  - **Browse Courses** → `/courses`

All three sections use existing semantic tokens (`text-primary`, `text-foreground`, `text-muted-foreground`, `bg-background`, `border-primary/...`). No new files, no new imports beyond what's already in Home.tsx.

### 2) Courses page (`src/pages/Courses.tsx`)

**(a) Fix the waitlist submit button formatting** — the long label *"Join the Waitlist + Get the Free Blueprint →"* overflows on mobile (shown in screenshot). Shorten the `submitLabel` prop passed to `EmailCaptureForm` to:
- **"Join the Waitlist →"**

(This shortens the visible label; the underlying action is unchanged.)

**(b) Sticky mobile bottom bar** — currently reads "Download Free Blueprint" and calls `scrollToWaitlist()`. Change the visible text to **"Join the Waitlist"**. Behaviour unchanged.

No other Courses page changes.

### Technical notes
- Home.tsx already imports `linkBlueprintAsset`, `Link`, `Button`, `ArrowRight`, and declares `PODCAST_EPISODES`, so we can reuse them directly.
- YouTube outbound link routed through `/redirect?url=...` per the project's redirect-bridge rule.
- About Me copy on the homepage is a verbatim duplicate of the existing About page paragraphs — About page is left untouched.
- No backend, schema, or routing changes.
