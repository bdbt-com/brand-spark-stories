## Goal

Strip the platform-specific (Instagram / TikTok / Android intent / multi-stage fallback) branches out of the redirect flow. All tracked redirects should attempt the YouTube app first, then fall back to the YouTube web URL if the app isn't installed. IG/TikTok bio traffic still works fine via the same generic flow — it just no longer gets special-cased code.

## Changes

**`src/lib/youtube-redirect.ts`** — replace `navigateToYouTube` with a simple two-step:
- Mobile (iOS/Android): set `window.location.href = "vnd.youtube://www.youtube.com/watch?v={id}"` to trigger the YouTube app.
- After ~1500ms (if the page is still visible, i.e. the app didn't open), fall back to `https://www.youtube.com/watch?v={id}`.
- Desktop: go straight to the web URL in the same tab.
- Delete: `getPlatform()`, Instagram branch, TikTok `window.open`, Android `intent://` URL, `altAppUrl` retry timer.

**`src/pages/RedirectBridge.tsx`** — no logic change needed; it already calls `navigateToYouTube` after tracking. Keep the 1.5s tracking timeout race as-is.

**`src/pages/LinkInBio.tsx`** — keep the 8-second idle auto-redirect on `/bio` exactly as it is (already 8s on first visit). No change needed.

## Out of scope
- Bridge page, tracking logic, fallback video sequence, admin counters — untouched.
- IG/TikTok bio links keep working through the same simplified path.

## Technical notes
- Page-visibility check (`document.hidden`) before firing the web fallback prevents the browser from loading youtube.com in a background tab after the app has already taken over.
- A simple iOS/Android UA test decides whether to attempt the deep link at all; desktop skips it entirely.
