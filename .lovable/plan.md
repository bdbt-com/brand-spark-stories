## Goal
Create a hidden `/latest` page that ads can point to. It shows the latest Daily Wins upload as a fake-YouTube clickable card and auto-redirects to YouTube after 15 seconds if not clicked. Page is not linked anywhere in the site nav — reachable only by typing `bigdaddysbigtips.com/latest` (or via the Tips search bar).

## Page: `/latest`

Centered on screen, no navigation, no footer. Black background.

Layout (top → bottom):
1. **Thumbnail card** — mimics a YouTube watch card but monochrome:
   - 16:9 thumbnail image (from YouTube `maxresdefault`/`hqdefault`)
   - Greyscale filter on the thumbnail so it reads as "non-coloured" per request
   - Play-button overlay (white triangle in rounded rect), classic YouTube look
   - Bottom-right duration badge if available
2. **Title** — full video title, gold (`hsl(42 55% 62%)`), large
3. **Meta row** — `{viewCount} views · {publishedText}` in muted white, styled like YouTube metadata
4. **Primary CTA button** — "Watch on YouTube" (big, gold, full-width on mobile)
5. **Helper text** — "You'll be taken to YouTube to watch today's latest episode"
6. **Subtle countdown line** — "Redirecting in 15s…" (small, muted)

Entire card + button route through `/redirect?video={id}&trackId=latest-page:{id}` so existing tracking still fires.

## Behaviour

- On mount: fetch latest video (see data flow below), start 15-second countdown.
- Any click on card, thumbnail, or button → cancel timer, navigate via `/redirect` bridge.
- After 15s with no interaction → auto-navigate via `/redirect` bridge with `trackId=latest-auto:{videoId}` so it's distinguishable in analytics from the bio auto-redirect.
- Page sets `<meta name="robots" content="noindex,nofollow" />` so Google won't index it. Not added to any nav, sitemap, or internal link. Reachable only by direct URL or the Tips search bar (already supports arbitrary path entry).

## Data flow — daily 20:03 UK scrape

Mirror the existing `/bio` approach (uses live `youtube-videos` edge function with 30s cache) but add a pre-warm cron:

1. **New table** `latest_video_cache` (single-row): `video_id text`, `title text`, `thumbnail_url text`, `view_count_text text`, `published_text text`, `duration text`, `updated_at timestamptz`. RLS: public SELECT, no public writes (service role only).
2. **New edge function** `refresh-latest-video`:
   - Calls the existing `youtube-videos` logic (newest first), takes `videos[0]`
   - Upserts the single row in `latest_video_cache`
3. **Cron job** (pg_cron + pg_net) running daily at **20:03 UK time** → `03 20 * * *` UTC during GMT, `03 19 * * *` during BST. We'll schedule **two cron entries** (`03 19 * * *` and `03 20 * * *`) and let whichever fires during the active offset run; the function is idempotent. Simpler than tracking DST.
4. **Front-end** uses a small new hook `useLatestVideo()` that reads `latest_video_cache` directly via Supabase client. If the row is older than 24h or missing, it falls back to calling `youtube-videos?limit=1&fresh=1` live.

## Files

New:
- `src/pages/Latest.tsx` — the page
- `src/hooks/useLatestVideo.ts` — cache reader + live fallback
- `supabase/functions/refresh-latest-video/index.ts` — scrape + upsert

Edited:
- `src/App.tsx` — add `<Route path="/latest" element={<Latest />} />` (lazy import, no nav link)
- Migration: create `latest_video_cache` table + RLS + grants

Cron is added via direct SQL insert (not a migration) per Supabase scheduling conventions, since it embeds the function URL and anon key.

## Technical notes

- `<Helmet>` (or direct DOM) used to inject `noindex,nofollow` meta on `/latest` only.
- Greyscale = Tailwind `grayscale` filter on the thumbnail `<img>`; rest of card uses existing brand tokens (gold headings on black).
- Auto-redirect timer cleared on `visibilitychange` hidden so a backgrounded tab doesn't fire (matches `/bio` pattern).
- Tracking: `track-video-click` already accepts arbitrary `videoId` strings — using `latest-auto:{id}` and `latest-page:{id}` lets the admin dashboard separate these from `/bio` traffic.

## Out of scope
- No changes to `/bio` behaviour or timers.
- No new admin dashboard widgets (existing `video_clicks` query already aggregates by id prefix).
