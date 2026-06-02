## Plan

### 1. Odometer-style counter — replace `AnimatedCounter`

Rewrite `src/components/AnimatedCounter.tsx` (keep the same export name and prop signature so no callers change) to render an odometer:

- Format the number with `toLocaleString()` to get a string of digits + commas.
- For each digit position render a fixed-height "reel" `<span>` that contains 0-9 stacked vertically. The reel translates on the Y axis to show the current digit, animated by `transition: transform 600ms cubic-bezier(0.22, 1, 0.36, 1)` (smooth ease-out, no JS rAF needed).
- Non-digit characters (commas, the literal "0") render as static spans.
- When a new digit is added (e.g. 9 → 10) the new column starts at its target offset and just fades in over 200 ms so the row grows cleanly.
- Reel height = `1em`; uses `overflow: hidden` and `inline-block`. Pure CSS transform — GPU-accelerated, no layout reflow on tick.

This gives the "old digit slides up, new digit slides in" feel the user described, on every digit independently (so 1,974 → 1,975 only animates the last digit).

### 2. Apply to every numeric counter on `/admin-list`

Wrap every visible integer stat in `<AnimatedCounter />`. Specifically:

- Page Analytics row: TODAY visitors (already), all four period visitor totals (`Last 7 / 14 / 30 / Since Launch`).
- Bio & Podcast Link Clicks row: every Today/7d/14d/30d/Total bio + podcast number.
- Redirects row: every Today/7d/14d/30d/Total bio + podcast redirect number.
- Today live cards: New Subs (already), Avg Time minutes/seconds.
- Video tables: every total/today/7d/14d/30d cell (these come from `videoCounts`).
- Download counts list numbers.
- Today subscribers count + total subscribers count.
- Live feed counts in `FeedFilterBar` chips.

Because the odometer is just CSS transforms keyed on the new value, an unchanged number does no work at all — only the digits that actually change animate. No measurable cost from wrapping inert numbers.

### 3. Add `/podcast` under `/bio` in the TODAY card

Mirror the existing `/bio` row beneath it, fed from `liveTick.podcast_clicks_today` (fall back to `podcastClicks.today`), with its own `TodayTrendBadge` against `podcastClicks["7d"]`.

### 4. Bump live tick from 2 s → 1 s

Change the `setInterval(fetchLiveTick, 2000)` in `AdminList.tsx` to `1000`. Other loops stay where they are (feed already at 1 s, slow stats at 15 s).

### 5. Lag analysis (the "if it would cause lag, don't" check)

- **Network:** one tiny `get-live-tick` request per second (~200 bytes). 60 req/min from a single admin viewer. Fine.
- **Edge function / DB:** seven indexed COUNTs in one round-trip; sub-10 ms each.
- **Browser CPU:** the odometer is a CSS `transform: translateY(...)` per digit. ~200 digits on the page = ~200 cheap GPU layers, only animating when a digit changes. No `requestAnimationFrame` loop, no React re-renders for unchanged values (we'll memoise the component on `value`).
- **Battery / hidden tab:** existing visibility-pause already in place — no work happens when the tab is hidden.

Verdict: safe to roll out across the entire page.

### Files

- edit: `src/components/AnimatedCounter.tsx` (new odometer impl, same API)
- edit: `src/pages/AdminList.tsx` (wrap remaining numbers, add /podcast line, 2 s → 1 s)

No backend changes.