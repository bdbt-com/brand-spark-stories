## Problem

When someone joins the Courses Waiting List, they receive the generic "tip download" email — including a "Download Your Free Guide" CTA pointing to a Google Drive link. There's nothing to download for a waitlist signup, the copy talks about a "tip", and it doesn't feel like a proper waitlist confirmation.

## Plan

### 1. Add a dedicated waitlist branch in `supabase/functions/send-guide/index.ts`

Detect waitlist signups (`guideTitle === "Courses Waiting List"`) before the existing isBlueprint/tip branching and use:

- **Subject:** `You're on the list — Big Daddy's Courses Waiting List`
- **No download button.** Replace the CTA with a "What happens next" section.
- **Brand styling matching the site:** black background `#0F0F0F`, gold accent `hsl(42 55% 62%)` ≈ `#C9A85C` for the headline, large gold "DAILY WINS" wordmark / Big Daddy signature feel, white body text on a dark card, generous spacing.
- **Copy** (warm, on-brand, British English):
  - Headline (gold): `You're on the list, {firstName} 🙌`
  - Body:
    - "Thanks for raising your hand for the Big Daddy's Big Tips courses. You're officially on the waiting list."
    - "These courses are being built to take everything I share on the podcast and in the tips and turn it into a proper, step-by-step path you can actually follow — health, wealth, mindset, relationships, the lot."
    - "Here's what happens next:" followed by a 3-step list:
      1. I'll send you a heads-up the moment doors open — waitlist gets first access.
      2. You'll get early-bird pricing before anyone else.
      3. In the meantime, keep stacking Daily Wins — small steps, every day.
    - "While you wait, grab the free Foundation Blueprint to get going today:" with a gold secondary button → `/blueprint` (or the existing blueprint PDF URL — using site link is cleaner).
  - Sign-off: `Big love,` / `Big Daddy` (bold)
  - Small footer line: "Got questions? Just hit reply — this inbox is monitored."

Skip the rate-limit check for the waitlist branch (or keep it — 2/day is fine), but **do not** include the `guideDownloadUrl` button or the "If the button doesn't work, copy this link" fallback for waitlist emails.

### 2. No frontend changes required

`CoursesIntentModal` already sends `guideTitle: "Courses Waiting List"`. The new branch in the edge function handles everything based on that title.

### 3. Deploy

Redeploy the `send-guide` edge function after the edit.

## Technical notes

- Single file edit: `supabase/functions/send-guide/index.ts` — add a 3rd branch (`isWaitlist`) ahead of the blueprint/tip logic.
- Keep existing DB insert + `email_sent` flag flow unchanged.
- Inline-styled HTML email (email clients ignore external CSS) using the brand palette already used elsewhere in the project.
