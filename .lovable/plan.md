## Plan: Add "Interactions/min" live counter next to the Last 24 Hours header

**File:** `src/pages/AdminList.tsx` (Last 24 Hours activity feed card header)

Add a small live-updating stat to the right of the existing "Last 24 Hours (100/100)" header, aligned into the empty space before the green pulse dot.

**Label:** `X.X /min` (e.g. `2.4 /min`) with a subtle "interactions" caption underneath, styled to match the existing card typography (gold value, muted caption).

**Calculation:**
- Source: the same `feedItems` array that powers the Last 24 Hours list (every notification row — clicks, redirects, signups, downloads).
- Formula: `count of items whose timestamp falls within the last 60 seconds` — recomputed every second via a `setInterval` tick.
- Rounded to 1 decimal place using `.toFixed(1)`.
- Because each feed item = 1 notification, this literally measures "notifications popping into the feed per minute" as requested.

**Edge cases:**
- On first mount (feed still loading) → show `0.0 /min`.
- If fewer than 60s of data are available (page just opened), still use the raw count over the last 60s window (so it ramps up naturally rather than being inflated).
- Counter re-renders once per second; underlying feed continues polling on its existing schedule — no new network calls, no new edge functions, no DB changes.

**Layout:** Insert a right-aligned flex child inside the existing header row so it sits between the "(100/100)" text and the green pulse dot without disturbing mobile stacking.
