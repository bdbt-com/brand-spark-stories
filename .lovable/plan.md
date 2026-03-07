

## Live Activity Feed on AdminList Page

### What We're Building
A real-time activity feed panel on the right side of the admin dashboard, showing the 10 most recent events across three categories: video redirects (click or auto), email signups, and guide downloads. Updates every 15 seconds alongside existing polling.

### Layout Change
Convert the current single-column `max-w-5xl` layout into a two-column layout:
- **Left column (~65%)**: All existing dashboard content
- **Right column (~35%)**: Sticky live feed panel with 10 event boxes, newest at top

### New Edge Function: `get-activity-feed`
Queries three data sources and merges into a single timeline:

1. **Video clicks** (`video_clicks` table) — last 50 rows by `clicked_at`. Maps video_id to title using the VIDEO_MAP. Labels "auto-redirect" entries distinctly.
2. **Email signups** (`email_subscriptions` table) — last 50 rows by `created_at`. Shows first name + "subscribed".
3. **Guide downloads** (`email_subscriptions` where `email_sent = true`) — last 50 rows by `email_sent_at`. Shows guide title.

Merges all into a unified array sorted by timestamp descending, returns top 10. Each item has: `{ type: "click" | "redirect" | "signup" | "download", label: string, detail: string, timestamp: string }`.

Config: `verify_jwt = false` in config.toml.

### Feed UI
Each of the 10 boxes shows:
- Color-coded icon/badge by type (e.g., green for signup, blue for click, orange for redirect, purple for download)
- Primary label (video title, subscriber name, guide name)
- Relative timestamp ("2m ago", "just now")
- Compact card style, stacked vertically

The feed column uses `sticky top-24` so it stays visible while scrolling the left content.

### Files Changed
1. **`supabase/functions/get-activity-feed/index.ts`** — New edge function
2. **`supabase/config.toml`** — Add `[functions.get-activity-feed]` with `verify_jwt = false`
3. **`src/pages/AdminList.tsx`** — Two-column layout + feed component with polling

