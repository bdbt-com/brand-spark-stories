# Randomise YouTube button on /bio

## Goal
Instead of the YouTube social icon on `/bio` going to the fixed playlist URL, it should pick **one of the 6 episode videos at random** each click and route through our tracked `/redirect` bridge (so analytics still fire).

## The 6 videos (already defined in `INITIAL_EPISODES`)
- pdjVnhCUwA8
- SioUIPf4Sls
- L6cqky7TLpE
- cfLHVIIp4o0
- D4dzO5rfBfs
- EhpmrICLRK8

## Changes

**`src/pages/LinkInBio.tsx`**
1. Remove the playlist `href` from the YouTube entry in `socialLinks` (or repurpose it as a fallback).
2. Add an `onClick` handler on the YouTube social link that:
   - Picks a random `videoId` from `INITIAL_EPISODES`.
   - Calls `startTrackedRedirect(videoId, "social-youtube-random:" + videoId)` so the click is tracked under a distinct trackId.
   - Calls `e.preventDefault()` to stop the anchor's default navigation.
3. Leave Instagram, TikTok, Spotify untouched.

No backend or other page changes needed. The existing `/redirect` bridge already handles tracking + opening YouTube (app deep link with web fallback).

## Out of scope
- Home page YouTube links (not mentioned).
- Changing the 6 video list or the view counts.
