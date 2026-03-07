

## Fix Activity Feed: Distinguish Clicks from Auto-Redirects

### Problem
1. Auto-redirects fire two `track-video-click` calls (one for `"auto-redirect"`, one for the specific videoId), so the feed shows a paired "click" + "redirect" for every auto-redirect — but it should be one or the other.
2. The "Auto-redirect" feed entry doesn't say which video it redirected to.

### Solution
Use a single tracking call for auto-redirects with a composite ID format: `auto-redirect:VIDEO_ID`. Manual clicks continue using just the videoId. The edge function parses this to produce correct feed entries.

### Changes

**1. `src/pages/LinkInBio.tsx`** — Auto-redirect tracking
- Replace the two `track-video-click` calls with a single call: `{ videoId: "auto-redirect:" + videoId }`

**2. `supabase/functions/get-activity-feed/index.ts`** — Feed processing
- Detect `auto-redirect:VIDEO_ID` entries: type = "redirect", label = video title, detail = "Auto-redirect"
- Keep handling legacy `"auto-redirect"` (no colon) as before
- All other video_ids become type = "click"

**3. `supabase/functions/get-video-clicks/index.ts`** — Click counting
- When aggregating counts, entries with `auto-redirect:VIDEO_ID` should count toward both the `auto-redirect` total AND the specific video's total (preserving existing dashboard counters)

### Result
- Feed shows either "Auto-redirect → [Video Title]" OR "Video click → [Video Title]", never both for the same event
- Each video's click counter still includes auto-redirect views
- The global auto-redirect counter still works

