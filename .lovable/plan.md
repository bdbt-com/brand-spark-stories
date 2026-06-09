## What you actually asked for

- Counters, graphs and the live feed list should still show recent history when you open the page (so you can read what happened while away).
- Only the popup animation queue should be calm: items that happened before you opened the page just appear in the list silently — only events that arrive *while you're watching* animate one-at-a-time.
- Last change went too far: it skipped the historical fetch entirely, which is why the page looked empty / broken.

## Plan

1. Restore the historical feed fetch in `get-activity-feed`
   - When called without `since`, fetch recent activity again — but capped tightly so it never times out:
     - Last 100 video_clicks (single page, ordered by `clicked_at desc`, no 10k loop).
     - Last 100 email_subscriptions (single page).
     - No 24h window scan, no pagination loop, no country join cost beyond the single small select.
   - Still return `server_time` so the frontend can advance its cursor.
   - Incremental branch (`since` provided) stays as-is for polling.

2. AdminList: backfill silently, animate only new
   - On mount, do one initial `get-activity-feed` call (no `since`) to populate the list with the recent history, **but mark every returned item with `silent: true`** so they render immediately in their final state — no entry animation, no queue pump.
   - Store `openedAt = server_time` from that response.
   - All subsequent incremental polls use `openedAt` as the cursor; new items go through the existing queue pump (one every ~560ms) with the smooth entry animation.
   - Counters, graphs and subscribers continue to use their own endpoints (unchanged).

3. Queue pump only handles "new" items
   - Silent backfill items bypass the pump entirely and are appended to the rendered list in one batch.
   - Pump only ever drains items that arrived after `openedAt`, so popups never burst and never interrupt each other.

4. Keep the duplicate-key fix
   - Keep the `seq` id on every item (silent + animated) so React keys stay unique.

5. Safety against future timeouts
   - Hard `LIMIT 100` per table on the historical branch means the query is bounded and fast even as the tables grow.
   - If the call still fails, the page renders with an empty feed and a small "Live feed reconnecting…" note — counters/graphs are unaffected because they use different endpoints.

## Out of scope
- No changes to counters, graphs, subscribers list, country labels, layout, or other edge functions.
- No schema changes.

## Technical notes
- Files touched: `supabase/functions/get-activity-feed/index.ts`, `src/pages/AdminList.tsx`.
- `FeedItem` gains an optional `silent?: boolean` flag used only by the renderer/pump to decide whether to animate.
