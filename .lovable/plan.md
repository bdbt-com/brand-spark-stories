## Add /podcast totals beside /bio Auto-Redirects

Add two small stat tiles inside the existing **Auto-Redirects** section on `/admin-list` (the same box that currently shows the /bio redirect totals), so /podcast activity is visible at a glance without a whole new section.

### What gets added

Two compact cards appended after the existing 5-card row (Today / 7d / 14d / 30d / Total), styled smaller and muted so they read as "secondary" context:

1. **/podcast redirects** — sum of all `latest-auto:*` tokens
2. **/podcast clicks** — sum of all `latest-page:*`, `latest-grid:*`, `podcast-spotify`, `podcast-blueprint` tokens

Each tile shows: Today (big number + `TodayTrendBadge`) and small `7d / 30d / Total` underneath. No new graph, no new RPC.

### How

`src/pages/AdminList.tsx`, Auto-Redirects section (~line 568):
- Compute `podcastRedirects` and `podcastClicks` by iterating `videoCounts` entries and summing where `key.startsWith("latest-auto:")` / (`startsWith("latest-page:") || startsWith("latest-grid:") || === "podcast-spotify" || === "podcast-blueprint"`) for each window (today / 7d / 30d / total).
- Render the two tiles inside the same `flex` container as the existing /bio cards, with `border-muted bg-muted/20` and smaller text so they're visually distinct from the primary /bio metrics.

### Out of scope
- No changes to graphs, RPCs, edge functions, or the live feed (feed already labels them correctly).
- No new section, no Spotify/Blueprint split — just the two combined tiles.

### Files changed
- `src/pages/AdminList.tsx`
