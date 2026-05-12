## Goal
Exclude YouTube Shorts from the "latest video" used by `/bio` redirect and the `/admin-list` "Latest Video Redirects" card. Only Daily Wins Podcast episodes should qualify.

## Approach
The RSS feed mixes regular uploads and Shorts and does not expose duration or a `#shorts` flag. The reliable signal we already have is the title — every full episode follows the convention `Daily Wins Podcast [Number]` (per project memory). Shorts do not.

Filter in the edge function so every consumer (bio redirect, admin card, hooks) gets a clean list automatically.

## Changes

1. `supabase/functions/youtube-videos/index.ts`
   - After `parseFeed(xml)`, filter out entries whose title does not match the podcast convention.
   - Regex: `/^\s*daily wins podcast\s+\d+/i` (case-insensitive, allows trailing em-dash/title text).
   - Apply filter before caching so cached payload is also clean.
   - Keep response shape identical (`{ videos }`).

2. No frontend changes required — `useYouTubeVideos`, `LinkInBio` (`ytVideos[0]`), and the admin card all consume the filtered list.

3. Redeploy `youtube-videos` edge function and verify with `curl_edge_functions` that the first returned video is episode #127 (or newer) and no Shorts appear.

## Technical notes
- The 5-minute in-memory cache will still serve old (unfiltered) data until expiry or cold start; redeploy resets it.
- If a future episode breaks the naming convention, it will be excluded — acceptable given the strict naming rule already in memory.