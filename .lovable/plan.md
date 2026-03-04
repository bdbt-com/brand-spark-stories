

## Update Podcast Page to Show All YouTube Uploads

### Current State
The Podcast page (`src/pages/Podcast.tsx`) and the edge function (`supabase/functions/youtube-videos/index.ts`) are already fully built to fetch and display videos from `@bigdaddysbigtips`. The hook `useYouTubeVideos(50)` calls the edge function which resolves the channel and fetches videos.

### What Needs to Be Done

**1. Deploy the edge function**
The `youtube-videos` edge function needs to be deployed to Supabase so it's callable from the frontend.

**2. Verify the `YOUTUBE_API_KEY` secret**
The edge function requires a `YOUTUBE_API_KEY` environment variable (YouTube Data API v3 key). This must be set as a Supabase secret. If you don't have one yet, you'll need to create one at [Google Cloud Console](https://console.cloud.google.com/) with the YouTube Data API v3 enabled.

**3. Support pagination for channels with 50+ videos**
The YouTube Search API caps at 50 results per request. To show ALL uploads, I'll update the edge function to use the channel's `uploads` playlist (via the Channels API) instead of the Search API. This is both more efficient (fewer API quota units) and supports pagination via `pageToken` to fetch beyond 50 videos.

### Technical Changes

**`supabase/functions/youtube-videos/index.ts`** -- Refactor to:
- Use `channels?forHandle=@bigdaddysbigtips` to get the channel's `uploads` playlist ID (1 API call instead of search)
- Use `playlistItems` API to fetch all videos with `nextPageToken` pagination
- Still fetch video details (duration, views) in batches
- This approach uses 1 quota unit per 50 videos vs 100 units for search

**`src/hooks/useYouTubeVideos.ts`** -- Clean up:
- Remove the redundant `supabase.functions.invoke` call (currently makes 2 requests -- one via invoke and one via fetch)
- Keep only the fetch-based call

**`supabase/config.toml`** -- Add function config:
- Add `[functions.youtube-videos]` with `verify_jwt = false` so it's publicly callable

### No UI changes needed
The Podcast page grid/carousel already renders whatever videos the hook returns, so it will automatically show more videos once the backend returns them.

