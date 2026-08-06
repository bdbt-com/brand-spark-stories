# Fix: latest podcast redirect stuck loading

## What's actually wrong

The Supabase Edge Functions for this project are currently **blocked at the platform level**. Any call to a function returns:

```text
402 — Service for this project is restricted: exceed_edge_functions_invocations_quota.
The project owner must upgrade their plan or remove spend caps to restore service.
```

Confirmed by calling `track-video-click` directly (402) and by the browser console on the preview, where `track-page-view` fails with "Failed to fetch".

This is the reason it broke today and not in the previous 80 days — nothing in the code changed. It affects every function: click tracking, page-view tracking, `youtube-videos`, and `refresh-latest-video`.

Knock-on effect on the podcast page: `useLatestVideo` sees the `latest_video_cache` row is stale (last refreshed ~9 hours ago, because `refresh-latest-video` can no longer run) and then awaits the `youtube-videos` function with **no timeout**. While that request hangs against the restricted gateway, the card stays in its loading state and the redirect never gets a video ID.

## The primary fix (outside the code)

Raise or remove the spend cap / upgrade the plan for the Supabase project so edge functions serve again. Until that happens, tracking and auto-refresh of the latest video cannot work.

## Code changes to make the page resilient

So a function outage degrades gracefully instead of hanging:

1. `src/hooks/useLatestVideo.ts`
   - Add an `AbortController` timeout (3s) to the `youtube-videos` fallback fetch and to the fire-and-forget `refresh-latest-video` call.
   - Show the cached row immediately (even when stale) instead of waiting on the network, then upgrade it in place if a fresh result arrives.
   - Always clear `loading` on any failure path.

2. `src/pages/RedirectBridge.tsx`
   - Reduce the tracking race timeout from 1500ms to 800ms and add a hard safety timer so the page always navigates to YouTube even if the tracking request never settles.
   - If no `video` param is present, redirect to `/podcast` rather than spinning forever.

3. `src/lib/youtube-redirect.ts`
   - No behaviour change needed; tracking already fails silently.

## Notes

- Analytics numbers for today will have gaps for the period the functions were restricted; the stored `page_views` rows are unaffected once service resumes.
- No database or counting logic is touched — all traffic continues to be counted as-is.
