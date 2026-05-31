## 1. Playlist-based auto-redirect

**Uploads playlist ID** (derived from your channel `UCUjFNTMKnaeP5TyN-cOF5bw`):
`UULFUjFNTMKnaeP5TyN-cOF5bw`

Append `&list=UULFUjFNTMKnaeP5TyN-cOF5bw` to the YouTube URL whenever the redirect is for the latest podcast video. After the chosen video ends, YouTube auto-plays the next item in your uploads playlist.

**Where to change:**
- `src/lib/youtube-redirect.ts` → `navigateToYouTube(videoId, opts?)`
  - Add optional `{ playlist?: string }` param.
  - Web URL: `https://www.youtube.com/watch?v=${videoId}&list=${playlist}`
  - App deep link: `vnd.youtube://www.youtube.com/watch?v=${videoId}&list=${playlist}` (YouTube app honours the `list` param too).
- `startTrackedRedirect(videoId, trackId?, playlist?)` → forwards `playlist` to `/redirect` as a query param.
- `src/pages/RedirectBridge.tsx` (the bridge page) → reads `playlist` from URL and passes to `navigateToYouTube`.
- Every call site that currently triggers an **auto/latest** redirect (`/podcast` auto-redirect, "Latest" tiles, latest-video CTAs) passes `playlist: "UULFUjFNTMKnaeP5TyN-cOF5bw"`. Manual single-video clicks (specific episode tiles) stay as plain `?v=` so they don't drag the user into the uploads queue.

A small constant `UPLOADS_PLAYLIST_ID = "UULFUjFNTMKnaeP5TyN-cOF5bw"` lives in `src/lib/youtube-redirect.ts`.

## 2. Daily 20:00 cache refresh

The `latest_video_cache` table already stores the current latest video. Add a scheduled job so it's guaranteed fresh once a day at 20:00 UTC (in addition to the on-demand fetches that already happen).

Migration (pg_cron + pg_net, both already in the project since `http` extension is enabled — we'll use `pg_cron`):

```sql
create extension if not exists pg_cron;
create extension if not exists pg_net;

select cron.schedule(
  'refresh-latest-video-2000',
  '0 20 * * *',
  $$
  select net.http_post(
    url := 'https://xvqhkjgowlwfdosxmvba.supabase.co/functions/v1/youtube-videos?limit=1&fresh=1&refresh=1',
    headers := jsonb_build_object('Content-Type','application/json')
  );
  $$
);
```

The existing `youtube-videos` edge function (`fresh=1`) already updates `latest_video_cache` when it fetches; the cron just guarantees it ticks at 20:00 daily so the redirect always points at the newest upload.

## 3. Auto-Redirects layout fix (screenshots 1–3)

Currently the `Latest Video Redirects` card sits **left of** the 5 stat tiles, squashing them. Move it into the empty space **under the graph** and let the 5 tiles fill the full row (matching the Bio row above).

In `src/pages/AdminList.tsx` Auto-Redirects section (lines ~546–682):

```text
┌──────────────────────────────┬──────────────────────────────────────┐
│ Graph (inline, ~flex 2)      │  5 stat tiles (Today/7/14/30/Total)  │
├──────────────────────────────┘  (one row, equal widths)             │
│ Latest Video Redirects card                                          │
│ (shrunk: ~max-w-md, thumbnail aspect-video, compact stats below)    │
└──────────────────────────────────────────────────────────────────────┘
```

Concretely:
- Outer wrapper: `flex flex-col gap-4` (drop the `xl:flex-row`).
- Row 1: `flex flex-col xl:flex-row gap-4` containing `<InlineGraph>` (flex-1) and the 5-tile `grid grid-cols-2 md:grid-cols-5 gap-4 flex-1`.
- Row 2: the `Latest Video Redirects` card with `max-w-sm` (or `xl:w-80`) sitting under the graph column. Trim the inner padding (`p-3`), keep the thumbnail at `aspect-video w-full`, and keep the 4-mini-stat grid.
- The 5 tiles keep their existing top/bottom split (orange redirects / blue /podcast clicks) so they line up perfectly under the Bio row.

No changes to data, RPCs, or graph series.

## Files touched

- `src/lib/youtube-redirect.ts` — playlist param support + constant
- `src/pages/RedirectBridge.tsx` — forward `playlist` query
- Auto-redirect call sites (e.g. `Podcast.tsx`, Links/Latest tiles) — pass `playlist`
- `src/pages/AdminList.tsx` — relayout Auto-Redirects section
- New migration — pg_cron job @ 20:00 daily
