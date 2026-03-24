
# Fix TikTok Redirect Tracking Properly

## What’s actually wrong
The current approach still tries to record the redirect at the exact moment the app leaves the page:

- `trackAndRedirect()` sends `navigator.sendBeacon(...)`
- then TikTok uses `window.open(webUrl, "_blank")`

That is fragile in TikTok’s in-app browser. `sendBeacon` can return `true` even when the request never fully reaches the edge function before TikTok hands control to the system browser. Also, because the beacon path returns early, the `fetch(...keepalive)` fallback never runs.

That matches what I found:
- the `/bio` page still tracks before leaving
- TikTok navigation is still an immediate handoff
- recent `track-video-click` logs don’t show real traffic coming through during these failures

## Correct fix
Stop trying to race the tracking request against the external redirect.

Instead, use a **same-site redirect bridge page**:

```text
/bio  ->  /redirect?video=...&trackId=auto-redirect:...
         -> record tracking on our own site first
         -> then open YouTube with platform-specific logic
```

This is much more reliable because TikTok is only leaving the app **after** the tracking request has already been made from your own page.

## Plan

### 1. Add a dedicated internal redirect page
Create a lightweight route/page whose only job is:
- read `videoId` and optional `trackId`
- call `track-video-click` with a normal request
- once that request resolves (or times out after a short fallback), send user to YouTube

This page can show a simple “Opening YouTube…” message for a split second.

### 2. Change the shared redirect helper
Refactor `src/lib/youtube-redirect.ts` so it supports two phases:
- `startTrackedRedirect(videoId, trackId?)` → navigate internally to `/redirect?...`
- `navigateToYouTube(videoId)` → keep the platform-specific outbound logic here

This removes the unreliable “track while unloading” pattern from the main pages.

### 3. Update `/bio` to use the bridge flow
In `src/pages/LinkInBio.tsx`:
- replace direct `trackAndRedirect(...)` calls with the new internal redirect starter
- use it for:
  - idle auto-redirect
  - manual episode clicks
  - 4-second “play then open YouTube” flow

### 4. Update Home and Blueprint too
In:
- `src/pages/Home.tsx`
- `src/pages/Blueprint.tsx`

route all YouTube opens through the same internal redirect page so every tracked redirect follows one standard path.

### 5. Make TikTok navigation itself safer
Inside `navigateToYouTube(videoId)`:
- keep TikTok on the web URL path
- prefer the method that opens cleanly from the bridge page
- avoid depending on pre-unload tracking entirely

The key improvement is not just changing TikTok navigation again — it’s making sure tracking happens **before** TikTok tries to hand off.

### 6. Keep analytics format unchanged
Continue storing:
- `auto-redirect:VIDEO_ID` for idle redirects
- plain `VIDEO_ID` for normal video opens
- existing admin graphs and live feed should keep working without schema changes

### 7. Optional hardening
While implementing, also improve the edge function slightly:
- accept both JSON and plain text as it already does
- optionally add lightweight request logging around received `videoId` for easier debugging if needed

## Files to change
| File | Change |
|------|--------|
| `src/lib/youtube-redirect.ts` | Replace unload-time tracking flow with internal redirect starter + keep outbound YouTube logic |
| `src/pages/LinkInBio.tsx` | Route all YouTube opens through internal redirect page |
| `src/pages/Home.tsx` | Route tracked opens through internal redirect page |
| `src/pages/Blueprint.tsx` | Route tracked opens through internal redirect page |
| `src/App.tsx` | Add route for redirect bridge page |
| `src/pages/...` new redirect page | Track first, then send user to YouTube |
| `supabase/functions/track-video-click/index.ts` | Optional logging/hardening only; no schema change required |

## Technical note
The real issue is not “TikTok vs Instagram” by itself. The problem is trying to complete analytics **during page exit** in a hostile in-app browser. A short first-party redirect bridge is the standard reliable solution here.
