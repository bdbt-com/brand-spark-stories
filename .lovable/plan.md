## Replace /bio Podcast Episodes + Add Live View Counts

### What changes

**Keep** the auto-redirect / featured episode: `OjwSKAXveN8` ("The Dangers of Screen-time Before Bed") — the scaled-up centre card.

**Replace** the other 5 episodes with:
- `pdjVnhCUwA8`
- `SioUIPf4Sls`
- `L6cqky7TLpE`
- `D4dzO5rfBfs`
- `EhpmrICLRK8`

Titles and view counts will be pulled live from the YouTube Data API (so they're always real and refresh whenever the page is loaded — effectively daily, with a 24h client cache to avoid quota burn).

### Technical changes

**1. New edge function** `supabase/functions/get-podcast-stats/index.ts`
- `verify_jwt = false` (added to `supabase/config.toml`)
- Uses existing `YOUTUBE_API_KEY` secret
- Accepts `?ids=id1,id2,...` (or hardcodes the 6 IDs as a default)
- Calls `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=...`
- Returns `[{ videoId, title, viewCount }]` with viewCount formatted (`12.8K`, `1.2M`)
- CORS headers as in other functions

**2. `src/pages/LinkInBio.tsx`**
- Update `podcastEpisodes` array: keep `OjwSKAXveN8` in its current centre position, replace the other 5 with the new IDs. Seed with placeholder titles + `"— views"` as fallback.
- Update `REDIRECT_SEQUENCE` (inside the auto-redirect `useEffect`) to use the new ID list so tiered idle redirects use real episodes.
- Add a `useEffect` on mount that:
  - Reads cached stats from `localStorage` key `bdbt-podcast-stats-v1` (TTL 24h). If valid, use immediately.
  - Calls `supabase.functions.invoke("get-podcast-stats")` and merges live `title` + `viewCount` into the episodes state.
  - Writes fresh result + timestamp back to `localStorage`.
- Convert `podcastEpisodes` from a constant to a `useState` so the carousel re-renders with live data.
- Both desktop grid and mobile carousel already read from the same array — no layout changes needed.

### Files
- `supabase/functions/get-podcast-stats/index.ts` (new)
- `supabase/config.toml` (register new function with `verify_jwt = false`)
- `src/pages/LinkInBio.tsx` (replace IDs, add live-stats fetch + cache)

### Notes
- View counts refresh on every page load, capped to once per 24h via cache → "updates daily" requirement met without a cron job.
- If the API call fails, the last cached values (or placeholders) remain visible — page never shows broken/empty counts.