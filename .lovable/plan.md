## What's broken

The `/bio` 8-second idle auto-redirect is supposed to send users to your **newest YouTube upload**. Right now it's falling back to a random older episode instead.

**Root cause:** YouTube has broken/deprecated their public RSS feed. The `youtube-videos` edge function calls `https://www.youtube.com/feeds/videos.xml?channel_id=...` and gets back `HTTP 404` on every attempt (all 3 User-Agent retries fail). I confirmed this isn't channel-specific — even MrBeast's and Google's RSS feeds now return 404. The endpoint is dead globally.

When the function fails, the frontend's `latestVideoId` is `null`, so `LinkInBio.tsx` falls back to picking a random video from `FALLBACK_SEQUENCE`. That's why redirects still happen, but to old episodes — not the newest one.

## Fix

Replace the RSS approach with **channel-page HTML scraping**, which still works (I tested it and got the latest video ID back cleanly).

### `supabase/functions/youtube-videos/index.ts`

- Change `RSS_URL` → `CHANNEL_URL = https://www.youtube.com/channel/UCUjFNTMKnaeP5TyN-cOF5bw/videos`
- Replace `parseFeed(xml)` with `parseChannelHtml(html)`:
  - Extract the `ytInitialData` JSON blob (regex: `var ytInitialData = (\{.*?\});`)
  - Walk to `contents.twoColumnBrowseResultsRenderer.tabs[…videos].content.richGridRenderer.contents[]`
  - For each `richItemRenderer.content.videoRenderer`, pull `videoId`, `title.runs[0].text`, `publishedTimeText`, and the highest-res `thumbnail.thumbnails[]`
- Keep the same filter: `^daily wins podcast \d+` so Shorts and non-podcast uploads are excluded
- Keep the same 5-minute in-memory cache and the stale-cache fallback on fetch failure
- Keep the same response shape (`{ videos: VideoItem[] }`) so `useYouTubeVideos` and `LinkInBio` need no frontend changes

### Out of scope

- No frontend changes — `LinkInBio.tsx`, `useYouTubeVideos.ts`, `youtube-redirect.ts`, `RedirectBridge.tsx` are all untouched.
- Fallback sequence stays as-is (still useful if YouTube also blocks the HTML scrape one day).
- No new secrets needed — this is a public endpoint, same as the RSS feed was.

## Verification

After deploy, hit the edge function once and confirm `videos[0].videoId` matches the newest "Daily Wins Podcast" episode on the channel, then load `/bio`, wait 8 seconds, and confirm the redirect goes to that same video.
