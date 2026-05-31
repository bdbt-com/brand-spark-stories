# Clarify click & redirect sources in /admin-list

Right now the activity feed just says "Video click" or "Auto-redirect" with no indication of which page the user was on. We'll tag every tracked event with its source page and surface that in the admin feed.

## Current state of tracking IDs

| Source | Event | Current `trackId` |
|---|---|---|
| `/podcast` hero card | manual click | `latest-page:VIDEOID` |
| `/podcast` grid card | manual click | `latest-grid:VIDEOID` |
| `/podcast` idle redirect | auto-redirect | `latest-auto:VIDEOID` |
| `/bio` carousel card | manual click | bare `VIDEOID` (no prefix) |
| `/bio` link buttons | manual click | `button-blueprint` / `button-youtube` / `button-spotify` |
| `/bio` idle redirect | auto-redirect | `auto-redirect:VIDEOID` |

The `/podcast` events are already prefixed nicely. `/bio` carousel clicks are bare IDs (ambiguous), so we'll add an explicit prefix going forward.

## Changes

### 1. Tag `/bio` carousel clicks explicitly
`src/pages/LinkInBio.tsx` — change `startTrackedRedirect(episode.videoId)` to `startTrackedRedirect(episode.videoId, "bio-click:" + episode.videoId)` so the source is unambiguous.

### 2. Teach the activity feed to attribute source
`supabase/functions/get-activity-feed/index.ts` — extend the parser to recognize the prefixes and emit a `source` ("/podcast" or "/bio") plus a clearer `detail` string:

| `video_id` value | Type | Detail shown |
|---|---|---|
| `latest-page:VID` | click | `Click from /podcast` |
| `latest-grid:VID` | click | `Click from /podcast (grid)` |
| `latest-auto:VID` | redirect | `Redirect from /podcast` |
| `auto-redirect:VID` | redirect | `Redirect from /bio` |
| `auto-redirect` (legacy) | redirect | `Redirect from /bio` |
| `bio-click:VID` | click | `Click from /bio` |
| `button-blueprint` / `button-youtube` / `button-spotify` | click | `Click from /bio (button)` |
| bare `VIDEOID` (historic) | click | `Click from /bio` (legacy default) |

The `label` keeps the resolved video title via `VIDEO_MAP` (or button name).

### 3. Admin feed display
`src/pages/AdminList.tsx` — no structural changes needed; the new `detail` strings will flow through the existing feed row (which already renders `item.detail`). Mobile and desktop feed lists both pick this up automatically.

## Out of scope
- No DB migration; we don't rewrite historical `video_clicks` rows. Old bare-VID rows are assumed `/bio` since that was the only page emitting them at the time.
- No change to per-video click totals (`get-video-clicks`) — those continue to aggregate by underlying VIDEOID.
