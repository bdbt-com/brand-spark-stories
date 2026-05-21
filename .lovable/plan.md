## Goal

Make the "Picked For You" section on `/bio` show the **6 most recent Daily Wins Podcast uploads** from the channel, auto-updating. When a new episode drops, it appears as #1 and pushes the oldest off the list — no manual updates needed.

## How it works today

- The `youtube-videos` edge function already scrapes the channel page and returns videos sorted newest-first, filtered to `Daily Wins Podcast N` titles. This is the same data source already powering the 8-second idle auto-redirect (which correctly hits the newest upload).
- `LinkInBio.tsx` currently ignores that list for "Picked For You" and renders a hard-coded `INITIAL_EPISODES` array of 6 older episodes.

## Change

### `src/pages/LinkInBio.tsx`

- Replace the hard-coded `podcastEpisodes = INITIAL_EPISODES` with:
  - `podcastEpisodes = ytVideos.slice(0, 6).map(v => ({ videoId, title, views: '' }))`
  - If `ytVideos` is empty (first paint / fetch failed), fall back to `INITIAL_EPISODES` so the section never renders blank.
- Keep `INITIAL_EPISODES` in the file purely as the fallback.
- View counts: the channel-page scrape doesn't expose view counts, so the "9K views" line under each card will be hidden when showing live data (only shown when falling back to `INITIAL_EPISODES`, which has them baked in).
- Mobile carousel: already loops over `podcastEpisodes` and clones the first/last — works unchanged with the new dynamic list as long as length stays at 6.
- Desktop grid: already `md:grid-cols-3` over `podcastEpisodes` — works unchanged.
- The carousel uses video IDs as React `key`s in some places and array indexes in others — confirmed safe with dynamic data since the list re-mounts on first load when `ytVideos` arrives.

### Caching / refresh cadence

- Edge function already has a 5-minute in-memory cache, so the list refreshes within ~5 min of a new upload (per warm function instance). No new infra needed for "daily" updates — it's effectively near-realtime.
- No frontend caching beyond React state. Every page load re-fetches.

### Out of scope

- No changes to the edge function, the redirect logic, the carousel mechanics, or the top "Free Foundation Blueprint / Spotify / YouTube" link cards.
- No view-count backfill — accepting the trade-off of hiding views when showing live data. (If you want view counts later, we'd need to either call the YouTube Data API per video, or scrape each watch page — both are heavier; happy to add as a follow-up.)

## Verification

After deploy: load `/bio`, confirm the 6 thumbnails match the 6 newest Daily Wins Podcast episodes on the channel (top-left = newest). Wait for a new upload, reload after ~5 min, confirm it appears first and the previous 6th drops off.
