
## Problem

The `/admin-list` page hangs because `get-activity-feed` is timing out (502 / statement timeout / idle timeout in runtime errors). The initial call fetches 24h of `video_clicks` + `email_subscriptions` (up to 10k rows, now also selecting the new `country` column), which is exceeding Postgres statement timeout. The page sits on a loader until that resolves.

Separately, you don't want a backlog of events animating when you open the page — only new events that occur while you're watching should queue up.

## Plan

1. Make the initial feed load instant and non-blocking
   - On mount, set the feed baseline to "now" without fetching any historical data.
   - Render the page immediately; the live feed simply starts empty with a small "Waiting for live activity…" placeholder.
   - This removes the slow 24h backfill call that's currently hanging the page.

2. Only queue events that happen after the page is opened
   - Store an `openedAt` timestamp when the AdminList component mounts.
   - Polling uses this as the `since` cursor for the first incremental call, then advances it using the server time returned by subsequent polls.
   - Anything older than `openedAt` is never fetched, so no backlog burst.

3. Keep the existing smooth queue animation
   - Reuse the per-item queue pump (one item released every ~560ms, exceeding the row animation duration) so events still appear one-at-a-time, never overlapping.
   - Clear queue + timers on unmount so nothing keeps running when you leave the page.

4. Make the edge function safer so it can't hang the page in the future
   - In `get-activity-feed`, when `since` is omitted, return an empty feed + `server_time` immediately instead of scanning 24h of data. The frontend will always pass `since` going forward, so the heavy branch is never hit.
   - Keep incremental fetch (`since` provided) on its current small page size; it only ever returns very recent rows.

5. Fix the duplicate React key warning from earlier logs
   - The current feed key (`type:timestamp:id:detail`) can collide when the same click row is re-emitted across polls. Add a monotonically increasing local sequence id to each queued item so React keys are unique even for identical payloads.

## Out of scope
- No changes to data schema, tracking, country labels, layout, colours, counters, or graphs.
- No changes to other edge functions or pages.

## Technical notes
- Files touched: `src/pages/AdminList.tsx`, `supabase/functions/get-activity-feed/index.ts`.
- Behaviour change for admins: on first open, the live feed pane shows a placeholder until the first new event arrives, instead of replaying recent history.
