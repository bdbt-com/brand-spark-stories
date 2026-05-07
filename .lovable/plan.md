## Replace Homepage "Top Podcast Episodes" with top 3 most-viewed from /bio

### What changes

The 3 episode cards on the Home page (currently `cfLHVIIp4o0`, `-3_zj_Q_1kI`, `OjwSKAXveN8` with hardcoded titles + view counts) will be replaced with the **top 3 most-viewed videos** from the 6 episodes shown on `/bio`:

```
OjwSKAXveN8, pdjVnhCUwA8, SioUIPf4Sls, L6cqky7TLpE, D4dzO5rfBfs, EhpmrICLRK8
```

Titles and view counts will be pulled live from YouTube (same edge function `/bio` uses) and the cards will re-rank automatically as view counts change. The middle (highest-viewed) card stays visually featured (`md:scale-110`) — same layout as today.

### Technical changes

**1. `supabase/functions/get-podcast-stats/index.ts`**
- Also return raw numeric `viewCountRaw` alongside the formatted `views` string, so the client can sort by views without parsing the "12.8K" string.

**2. `src/pages/Home.tsx`**
- Replace the static `podcastEpisodes` constant with `useState` seeded from the same 6 IDs as `/bio` (titles/views blank).
- On mount, call `supabase.functions.invoke("get-podcast-stats")` with the 6 IDs.
  - Reuse the `bdbt-podcast-stats-v1` localStorage cache (24h TTL) that `/bio` already writes — no duplicate network calls when the user visits both pages.
- Sort the 6 results by `viewCountRaw` descending, slice the top 3.
- Reorder so the highest-viewed sits in the middle slot and gets the `featured` flag (preserves the existing scaled-up centre layout). The other two go left/right by view count.
- While stats are loading (first ever visit, no cache), render 3 skeleton cards using the first 3 IDs so layout doesn't shift; titles fill in once the fetch resolves.
- `setPlayingVideo` / auto-redirect logic stays unchanged — it already reads from `podcastEpisodes[index]`.

### Files
- `supabase/functions/get-podcast-stats/index.ts` (add `viewCountRaw` to response)
- `src/pages/Home.tsx` (dynamic top-3 selection + live data fetch)

### Notes
- "Most viewed" reflects YouTube's lifetime view count, refreshed daily via the existing 24h client cache.
- If the API call fails and there is no cache, the first 3 IDs render with thumbnails only (no titles/views) — page never breaks.
