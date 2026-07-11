## What I found so far

Scanned every counter on `/admin-list` and the tracking that feeds them. Two concrete bugs, plus a verification pass for the rest.

### Bug 1 — Page Stats grid is missing `/bio`

`NAV_PAGES` in `AdminList.tsx` lists Home `/`, Courses, Podcast, Tips, About — but not `/bio` (the Link‑in‑Bio landing page). So visitors landing on `/bio` (and `/links`) don't get their own card. If a card looks "swapped" between /bio and /podcast, this is the likely cause: bio traffic isn't shown, so the eye pairs the wrong numbers.

**Fix:** add a `/bio` card to `NAV_PAGES` (folds `/bio` + `/links` visitors together since `get_bio_click_sessions` treats them as one).

### Bug 2 — Courses card's "course btn clicks" is always 0/stale

The Courses card shows `vcField('button-courses')`, but `button-courses` is never emitted anywhere in the codebase. The Podcast page's "Browse Courses" button doesn't call `trackClick("button-courses")`.

**Fix:** add `trackClick("button-courses")` to the Browse Courses button in `src/pages/Podcast.tsx`.

### Verification pass (no changes expected, just confirming)

- `/bio` vs `/podcast` **link clicks** (`bio_clicks` / `podcast_clicks`) come from `get_today_live_tick` / `get_daily_stats` / `get_hourly_stats_today` — all three RPCs consistently define `/bio` = `page_path IN ('/bio','/links')` and `/podcast` = `regexp_replace(page_path,'/+$','') = '/podcast'`. Labels in the panel match the data keys (`dataKey="bio_clicks"` → `/bio`, `dataKey2="podcast_clicks"` → `/podcast`). ✅ not swapped.
- `/bio` vs `/podcast` **redirects** — `br` sums `auto-redirect*` (bio), `pr` sums `latest-auto:*` (podcast); labels/graph keys match. ✅ not swapped.
- Podcast card extras (`podcast-spotify`, `podcast-exercise-course`) are actually tracked in `Podcast.tsx`. ✅ correct.
- `vcField` correctly maps range → `today`/`7d`/`14d`/`30d`/`total`. ✅
- Live-tick optimistic bumps: `podcast_clicks` on `latest-page:` / `latest-grid:`, `bio_clicks` on `bio-click:`, redirect buckets on `auto-redirect*` / `latest-auto:*`. ✅ match server semantics.

### Files touched

- `src/pages/AdminList.tsx` — add `/bio` entry to `NAV_PAGES`.
- `src/pages/Podcast.tsx` — add `trackClick("button-courses")` to the Browse Courses button's onClick.

No DB or edge‑function changes. Low credit cost.

### If something else is actually off

If after these two fixes you still see a specific counter that looks wrong, tell me which card + which number and I'll trace that one directly — from what I can see in the code, everything else is wired to the correct source.