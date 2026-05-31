## Fix /podcast: missing view count + make IG/TikTok clickable

### 1. View count empty
`latest_video_cache.view_count_text` is `""` because `youtube-videos` scrapes the channel HTML and YouTube often omits a view count for very recent uploads (the metadata row simply isn't there). Confirmed via DB read.

**Fix:** in `supabase/functions/refresh-latest-video/index.ts`, after we already know `videoId`, call the YouTube Data API directly to get authoritative stats:

```
GET https://www.googleapis.com/youtube/v3/videos?part=statistics&id=<videoId>&key=<YOUTUBE_API_KEY>
```

Format `statistics.viewCount` (raw integer) into the same style YouTube uses: `"1.2K views"`, `"845 views"`, `"3.4M views"`. If the API call fails or returns no value, fall back to whatever `youtube-videos` produced (so we never regress).

Write the formatted string to `view_count_text`. No frontend change needed — `Podcast.tsx` already renders `video.viewCountText` next to `publishedText`.

### 2. IG/TikTok icons don't link
On `/podcast` they are decorative `<span aria-hidden="true">` with `text-foreground/30` — no anchor. Make them real links matching the LinkInBio top bar:

- Instagram → `https://www.instagram.com/bigdaddysbigtips`
- TikTok → `https://www.tiktok.com/@bigdaddysbigtips`

Convert each `<span>` to `<a href={...} target="_blank" rel="noopener noreferrer" aria-label="Instagram|TikTok">`, keep the muted look but add `hover:text-foreground/70 transition-colors` and `focus:outline-none focus:ring-2 focus:ring-primary rounded`. Remove `aria-hidden` on the wrapping div.

### Files changed
- `supabase/functions/refresh-latest-video/index.ts` — fetch + format view count via YouTube Data API.
- `src/pages/Podcast.tsx` — convert the two social spans into anchors.

### Out of scope
- No DB schema changes, no new tracking, no other page edits.
