## Plan: Show "Exercise course clicks" counter on admin Podcast card

The button already tracks via `trackClick("podcast-exercise-course")`, so no new tracking wiring is needed — clicks land in `video_clicks` under that ID and are already returned by `get-video-clicks` into `videoCounts`.

**File:** `src/pages/AdminList.tsx` (Podcast card in the per-page grid, around lines 969–970)

Change the Podcast card's `extra` block so it shows **two** lines instead of one:
1. Existing: `podcast-spotify` → "spotify clicks"
2. New: `podcast-exercise-course` → "exercise course clicks" (styled the same as the spotify line, gold `MousePointerClick` icon, `AnimatedCounter`)

Implementation detail: replace the single `extra` object for `/podcast` with an array of `{ count, label }` entries and map them into stacked `<p>` rows (same classes as the current one). Same treatment optional for `/courses` if we want symmetry, but per your request only the Podcast card gets the new counter.

No DB changes, no edge function changes.
