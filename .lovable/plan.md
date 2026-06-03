# Courses Page (replacing Feeling Stuck)

Build a new `/courses` page based on the six screenshots, swap it into the nav in place of "Feeling Stuck", and remove the old page from the app.

## Routing & nav changes

- `src/components/Navigation.tsx`: replace the `Feeling Stuck` nav item with `Courses` pointing to `/courses` (desktop + mobile lists).
- `src/App.tsx`: add `<Route path="/courses" element={<Courses />} />`. Keep `/feeling-stuck` as a `<Navigate to="/courses" replace />` so old links/SEO don't 404. Remove the `FeelingStuck` import.
- Delete `src/pages/FeelingStuck.tsx`.

## New page: `src/pages/Courses.tsx`

Brand styling: black bg, gold headers, white body (per Core memory). Each "square box with words" in the screenshots becomes a real `Button` (gold-bordered card-style button consistent with the site). Sections stacked vertically, max-w container, generous spacing.

### Section 1 — Hero
- H1: **Start Your Daily Wins Journey** (gold, italic display weight to match screenshot).

### Section 2 — Course cards (4 cards, identical layout)
Each card centred, stacked:
1. **Title button** (large, gold border, non-clickable visual header styled as a button): "Daily Wins For {Topic}".
2. Description paragraph.
3. Bulleted list of benefits (centred, no bullets — line-per-item like screenshot).
4. **CTA button**: "Start {Topic} Wins".
5. For locked courses: italic gold line below — *(Locked — Coming Soon — Join Waiting List)*.

Cards in order:

| # | Title | Description | Benefits | CTA | State |
|---|---|---|---|---|---|
| 1 | Daily Wins For Exercise | Build a workout into your day, without needing a gym, personal trainer or any extra time. | Consistency over intensity / Simple exercise habits / More energy & confidence / No overwhelm | Start Exercise Wins | **Locked** |
| 2 | Daily Wins For Money | Stop money leaks and reduce financial stress without budgets or complicated spreadsheets. | Spending awareness / Habit-based saving / Systems over budgeting / Small wins that compound | Start Money Wins | **Locked** |
| 3 | Daily Wins For Nutrition | Eat better without extreme dieting. | Craving control / Better food defaults (keep your guilty pleasures!) / Energy & mood improvement / Sustainable habits | Start Nutritional Wins | **Locked** |
| 4 | Daily Wins For Sleep | Fix the habit that quietly affects everything else. | Better recovery & confidence / Lower stress/anxiety / More discipline & motivation / Energy ripple effects | Start Sleep Wins | **Locked** |

All four "Start … Wins" buttons currently scroll to a single shared waiting-list email capture at the bottom of the page (uses existing `EmailCaptureForm` with a new `title` like `"Courses Waiting List"` so signups are tagged distinctly in `email_subscriptions`). Note: typo fix — screenshot says "eercise" → render "exercise".

### Section 3 — "They're All Connected"
- H2 (gold italic): **They're All Connected**
- Flow line: `Sleep → Nutrition → Exercise → Money → Confidence → Happiness` (gold arrows).
- Body lines:
  - Most people try to fix life one problem at a time.
  - Daily Wins work differently. Small habits that create ripple effects:
  - Better sleep improves food choices.
  - Better food improves energy.
  - Better energy improves movement.
  - Better routines reduce stress spending.
  - Tiny wins compound into a different life.
- CTA button **Explore The Full Daily Wins System** → links to `/tips`.

### Section 4 — "Start For Free"
- H2: **Start For Free**
- Foundation Blueprint thumbnail (reuse the image/asset already shown on Blueprint page — find existing import in `Blueprint.tsx`; if none, render the same gold gradient Target card used there).
- Sub-head: **Not ready for a course?**
- Body: *Download the free Foundation Blueprint and start building momentum today.*
- CTA button **Download Free Blueprint** → `/blueprint`.

### Section 5 — "Learn For Free Every Day"
- H2: **Learn For Free Every Day**
- Embed top 3 YouTube videos with 100k+ views. Reuse the `podcastEpisodes` trio already hardcoded in `Blueprint.tsx` (all three are 92K–111K, close enough; we can adjust later if you want a stricter ≥100K filter).
- Sub-line: *30,000+ people learning better habits every day.*
- CTA button **Watch On YouTube** → uses `startTrackedRedirect` / `/redirect` bridge to `https://youtube.com/@BigDaddysBigTips` (per Core memory rule for outbound YouTube links).

### Section 6 — "About Me"
- H2: **About Me**
- Two paragraphs (verbatim from screenshot):
  1. *After years working in finance and studying habits, health and behaviour, I realised something surprising; most people do not fail because they are lazy or lack discipline. They are simply living in a world where comfort has evolved faster than our biology.*
  2. *Modern life has made choosing comfort easier. It has made Daily Drifts easier. So I created Daily Wins to help people replace downward spirals with upward momentum through tiny daily actions that quietly compound.*
- CTA button **My Story** → `/about` (and scrolls/jumps to the existing "Read my story" anchor — keep the existing About copy untouched per memory).

## Technical notes

- All "square boxes" rendered as `<Button>` with the existing `outline` or a custom gold-bordered variant — no new component needed, but to match the bordered look I'll use `variant="outline"` with `border-primary border-2 text-primary` and the existing gold token. Titles inside cards that are not actionable get `disabled` styling but stay visually identical to the CTA buttons (the user said each box "simulates a button").
- Locked-state styling: keep CTA enabled (it scrolls to waitlist form); the "(Locked — Coming Soon — Join Waiting List)" label sits below in italic gold for clarity. If you'd rather the CTA be visually disabled with a lock icon, tell me and I'll adjust.
- Page is fully responsive, centred, brand-consistent.
- No DB / edge-function changes required. Waiting list reuses `email_subscriptions` via the existing `EmailCaptureForm`.

## Files touched

- ADD `src/pages/Courses.tsx`
- EDIT `src/App.tsx` (route swap + redirect)
- EDIT `src/components/Navigation.tsx` (nav label/path)
- DELETE `src/pages/FeelingStuck.tsx`
