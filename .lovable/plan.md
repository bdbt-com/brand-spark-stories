## Goal

On `/bio`, show 6 carousel cards = 3 newest YouTube uploads + 3 fixed "most viewed" pinned episodes, interleaved as:

`[new, top, new, top, new, top]`

The 3 pinned never change. The 3 newest auto-refresh from YouTube on every page load (already live via `useYouTubeVideos` + `?fresh=1`). When a brand new upload hits the channel, it bumps the oldest of the 3 "new" slots out automatically — no manual work.

## Pinned top 3 (from current INITIAL_EPISODES, ordered by views)

1. `cfLHVIIp4o0` — "Build a Life You Don't Need to Escape From" — 23K views
2. `L6cqky7TLpE` — "Daily Wins Podcast 115 — Why a £10 Decision is Actually a £100,000 Decision" — 17K views
3. `D4dzO5rfBfs` — "Daily Wins Podcast 112 — Why Choosing Discomfort Feels So Hard" — 14K views

## Change (single file: `src/pages/LinkInBio.tsx`)

1. Split `INITIAL_EPISODES` into:
   - `PINNED_TOP` (the 3 above, with views) — always rendered.
   - `INITIAL_NEW` (3 fallback "newest" episodes for when the YouTube fetch hasn't returned yet).

2. Replace the current `podcastEpisodes` builder:
   - Take `ytVideos.slice(0, 3)` (the 3 most recent uploads) when available, else fall back to `INITIAL_NEW`.
   - De-dupe against `PINNED_TOP` videoIds so a pinned video doesn't accidentally appear twice (skip + take next).
   - Build the final array by interleaving: `[new0, top0, new1, top1, new2, top2]`.
   - Forward real view counts from `ytVideos` (already done for the top 6 — keep that behaviour for the new 3).

3. Carousel mechanics (`totalSlides`, `clonedEpisodes`, indices, autoplay) stay unchanged — array length stays at 6.

## Notes

- No edge-function or backend changes. The "update when new video added" behaviour is already free: each page load re-scrapes the channel, so `ytVideos[0..2]` is always the live latest 3.
- Pinned trio is hardcoded per your instruction; easy to swap later if you want different ones.
