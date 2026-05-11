# Auto-Redirect to Most Recent Video on /bio

## Goal
The idle auto-redirect on `/bio` should always send visitors to the **most recent** YouTube upload (new video posted daily at 8pm UK), instead of randomly picking one of the 6 featured videos. The 6 featured videos remain visible and clickable as manual options.

## Why this works without a cron job
`useYouTubeVideos` already calls the `youtube-videos` edge function on every page load. That function returns the channel's full uploads playlist, newest first. So "most recent video" is simply `videos[0]` at the moment the user lands on `/bio` — it auto-updates the instant a new video is published, with no scheduled job required.

## Changes

**`src/pages/LinkInBio.tsx`**

1. In the auto-redirect effect (around lines 260–320), replace the current logic that picks a video from the 6 featured options with: use the first item from the `useYouTubeVideos` hook's `videos` array (newest upload).
2. Wait for `videos` to be loaded before starting the 8s / 17.5s timer — if the hook is still loading, defer the timer until the latest video is known. If the fetch fails, fall back to the current behaviour (one of the 6 featured videos) so the redirect still works.
3. The 6 featured video cards rendered on the page stay exactly as they are — same layout, same click handlers, same `/redirect` bridge.
4. Keep the existing 8s (first visit) / 17.5s (return visit) timing and 7-day reset logic unchanged.
5. Bump `STORAGE_KEY` to `'bdbt-auto-redirects-v9'` so existing visitors get a fresh first-visit timer under the new behaviour.

## Outcome
- Every idle auto-redirect on `/bio` opens the newest podcast episode via the `/redirect` tracking bridge.
- The list of 6 featured videos remains untouched as manual choices.
- Updates automatically each day once the new 8pm upload appears in the channel's uploads playlist — no scheduled task to maintain.
