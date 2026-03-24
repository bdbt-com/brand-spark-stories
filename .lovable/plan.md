
# Make Redirect Tracking Reliable Everywhere

## What’s broken
Redirect tracking is currently based on fragile browser events (`blur`, `visibilitychange`, `pagehide`) in `/bio`, and other pages use separate YouTube-opening logic with no proper redirect tracking at all. That makes TikTok/Instagram/in-app browsers inconsistent.

## Fix
Replace the current heuristic approach with one standard redirect-tracking flow used everywhere:

1. Create one shared YouTube redirect helper
- Centralize platform detection + navigation logic in a reusable helper
- Use it from:
  - `/bio`
  - Home
  - Blueprint

2. Record redirects before navigation using an unload-safe request
- Stop relying on `blur` / `visibilitychange` as the source of truth
- Send tracking with `navigator.sendBeacon(...)` first
- Fall back to `fetch(..., { keepalive: true })` if needed
- Then perform the redirect

3. Make the tracking edge function accept beacon-style requests
- Update `track-video-click` so it can accept:
  - normal JSON POSTs
  - beacon/plain-text or lightweight payloads
- Return quickly so redirects are not delayed

4. Keep analytics format compatible
- Continue storing:
  - `auto-redirect:VIDEO_ID` for idle `/bio` redirects
  - plain `VIDEO_ID` for normal video clicks
- If we also want “timed redirect” tracking from Home/Blueprint separated from manual clicks, use a compatible prefix like `redirect:VIDEO_ID`

5. Update `/bio` timer logic
- When the idle timer fires, immediately log the redirect with the unload-safe call
- Only after that trigger the YouTube navigation
- Keep local redirect history updates in the same successful redirect path so the visit sequence stays accurate

6. Update Home + Blueprint redirect flows
- Their “play then open YouTube after 4 seconds” flow should use the same shared helper
- This ensures those redirects are tracked too, not just clicks

## Files to change
| File | Change |
|------|--------|
| `src/pages/LinkInBio.tsx` | Remove event-based redirect confirmation logic; use shared tracked redirect helper |
| `src/pages/Home.tsx` | Route 4-second YouTube open through shared tracked redirect helper |
| `src/pages/Blueprint.tsx` | Route 4-second YouTube open through shared tracked redirect helper |
| `src/lib/...` | Add shared YouTube redirect/tracking utility |
| `supabase/functions/track-video-click/index.ts` | Support beacon/keepalive-friendly payload handling |

## Technical details
- The current event-listener approach is the main problem; it is not reliable across TikTok, Instagram, app deep links, and mobile webviews.
- `sendBeacon` / `keepalive` is the standard pattern for outbound-click / redirect tracking because it survives page unload much better.
- This change makes redirect counting consistent without needing fragile focus-loss detection.
- Admin graphs and live feed should continue working because they already read from `video_clicks`; only the write path becomes reliable.
