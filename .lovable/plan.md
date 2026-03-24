

# Fix: Only Count Auto-Redirects When User Actually Follows Through

## Problem
The `openYouTube` function calls `onAppOpened()` (which triggers tracking) too eagerly:
1. **Instagram/TikTok paths** (lines 56, 64): `onAppOpened?.()` fires immediately before `window.location.href` — even if the redirect is blocked or fails
2. **Normal browsers**: The `blur`/`visibilitychange` listeners fire the callback, which is correct — but if the page loses focus for any other reason, it still counts

For auto-redirects, the tracking callback saves to localStorage AND calls `track-video-click`. If the user doesn't actually leave, it still gets counted.

## Fix

### File: `src/pages/LinkInBio.tsx` — `openYouTube` function

**Instagram/TikTok paths**: Remove the immediate `onAppOpened?.()` call. Instead, rely on the existing `visibilitychange`/`blur` listeners (already set up on lines 50-52) to detect when the page actually loses focus after `window.location.href` is set. The listeners are added before the redirect, so they will fire if the navigation succeeds.

- Line 56: Remove `onAppOpened?.();` from the Instagram block
- Line 64: Remove `onAppOpened?.();` from the TikTok block  
- Remove `cleanup()` from both blocks so the blur/visibility listeners remain active to detect actual navigation

**Normal browsers**: No change needed — the blur/visibilitychange approach already correctly detects when the user leaves.

**Add a safety timeout**: Add a cleanup timeout (e.g. 5 seconds) after which, if the user hasn't left the page, the listeners are cleaned up without firing the callback. This prevents stale listeners.

### Files changed

| File | Change |
|------|--------|
| `src/pages/LinkInBio.tsx` | Remove immediate `onAppOpened()` calls in Instagram/TikTok paths; let blur/visibility listeners handle detection; add safety cleanup timeout |

