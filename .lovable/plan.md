## Goal
Surface the "Browse Courses" and "Spotify" button clicks from `/podcast` on the AdminList dashboard — both as a small inline count on the relevant Page Stats card, and as items in the Live Activity Feed.

## Context found
- Both buttons already log to `video_clicks` via `trackClick("button-courses")` and `trackClick("button-spotify")` on `src/pages/Podcast.tsx`.
- `videoCounts` in `AdminList.tsx` already returns counts per `video_id` (it's used by the Bio Button Clicks section), so `videoCounts["button-courses"]` and `videoCounts["button-spotify"]` are already available — no new query needed.
- `supabase/functions/get-activity-feed/index.ts` maps button IDs to feed labels in `BUTTON_LABELS`. `button-spotify` is mapped only for /bio; `button-courses` is missing entirely, and there is already a placeholder `podcast-spotify` / `podcast-blueprint` pattern.

## Changes

### 1. `src/pages/AdminList.tsx` — Page Stats cards (around lines 720-744)
Add a small extra line at the bottom of specific cards:
- **Courses card**: show `videoCounts["button-courses"]?.total ?? 0` as `"N course btn clicks"` (small muted text under the existing visits/time line).
- **Podcast card**: show `videoCounts["button-spotify"]?.total ?? 0` as `"N spotify clicks"`.
All other cards render unchanged. Use the same `text-[10px] text-muted-foreground` styling already in use, prefixed with a tiny icon (e.g. `MousePointerClick`) for visual consistency.

### 2. `supabase/functions/get-activity-feed/index.ts` — feed labels
Update `BUTTON_LABELS`:
- Add `"button-courses": { label: "Browse Courses", detail: "Click from /podcast (button)" }`.
- Change `"button-spotify"` detail so the source isn't hard-coded to `/bio`. Since the same ID is fired from both `/bio` and `/podcast`, we can't distinguish without a code change on the client. Simplest: relabel detail to just `"Spotify show click"` (drop the page). 

Alternative (cleaner attribution): also change `Podcast.tsx` to call `trackClick("podcast-spotify")` instead of `"button-spotify"`, then add a `podcast-spotify` entry in BUTTON_LABELS and a separate `podcast-spotify` stat card. (See question below.)

### 3. No DB / schema / new edge function needed.

## Question for you
For the Spotify count on the Podcast Page Stats card and the live feed:
- **Option A (simplest)**: Keep the single `button-spotify` ID. The Podcast card count then includes Spotify clicks from both `/bio` and `/podcast` (they share the ID today). Feed shows generic "Spotify show click".
- **Option B (clean split)**: Switch the Podcast page's Spotify button to track as `podcast-spotify` so the Podcast card shows only Podcast-page Spotify clicks, and the feed clearly says "Click from /podcast (Spotify)". `/bio` clicks remain `button-spotify`.

Want me to go with **Option B**? It's a 1-line client change plus one extra map entry, and gives accurate per-page numbers.