## What's actually wrong

`/podcast` is being hammered by bots/crawlers — ~47,000 hits/day, of which ~47,000 are "unique" `session_id`s (each bot request is a fresh browser mount, so every hit gets a new session id). Only ~400 sessions in a day have more than one page-view; the rest are one-shot direct hits to `/podcast`.

Result: `daily_stats_cache.visitors` for the last 14 days is ~40k/day, cumulative ~1.02M → 1.06M. The counter isn't broken — it's counting bots as real visitors. Every other stat that rolls up from `page_views` (page stats, podcast clicks, avg duration) is inflated the same way. Bio, redirects, subscribers, video clicks, course signups look clean.

## Plan

### 1. Detect bots at ingest (track-page-view edge function)

Add server-side user-agent classification. If UA matches a bot pattern (Googlebot, bingbot, GPTBot, ClaudeBot, PerplexityBot, facebookexternalhit, Twitterbot, LinkedInBot, headless Chrome, curl/wget/python/go-http, empty UA, etc.) mark the row as bot and skip it from stats.

### 2. Store the signal on `page_views`

Migration adds two nullable columns:
- `user_agent text`
- `is_bot boolean not null default false`

Edge function writes both on insert. No backfill of UA for old rows.

### 3. Exclude bots from every aggregate

Update these RPCs so every `page_views` scan adds `AND is_bot = false`:
- `refresh_daily_stats_cache` (fills both `daily_stats_cache` and `page_daily_stats_cache`)
- `get_daily_stats` (today live branch)
- `get_hourly_stats_today`
- `get_visitor_stats`
- `get_page_stats`
- `get_bio_click_sessions`
- `get_podcast_click_sessions`
- `get_today_live_tick`

### 4. One-time historical cleanup

Old rows have no UA, so use a heuristic backfill for `is_bot`:
- `page_path = '/podcast'` AND session had exactly one page-view AND `duration_seconds` is null or 0 → mark bot.
Anything else stays human. Then re-run `refresh_daily_stats_cache('2026-03-01', yesterday)` to rewrite both cache tables.

### 5. Weekly auto-reconcile (pg_cron)

Schedule a job every Monday 03:00 UTC that:
1. Calls `refresh_daily_stats_cache(today - 14, yesterday)` — rebuilds the last two weeks from raw data so any drift/late-arriving duration updates are corrected.
2. Logs row counts before/after into a small `stats_reconcile_log` table so we can see what changed.

`pg_cron` and `pg_net` are already installed on this project; the schedule SQL is inserted (not migrated) because it embeds project-specific URLs.

### 6. Verification pass on the admin dashboard

After the cleanup migration lands I'll spot-check:
- `get_today_live_tick` matches raw `page_views` (excluding bots) for today
- `get_daily_stats` last 7 days matches `daily_stats_cache` sums
- `get_page_stats` totals per page look sane (no page > total visitors)
- Bio clicks, podcast clicks, redirects, signups unchanged from current values

### Files touched

- `supabase/functions/track-page-view/index.ts` — UA capture + bot classification
- Migration: `page_views.user_agent`, `page_views.is_bot`, index on `is_bot`, RPC rewrites, backfill, cache rebuild, `stats_reconcile_log` table
- Insert (not migration): pg_cron weekly schedule

No frontend changes — `AdminList.tsx` keeps working; the numbers just become real.

### Credits

Low. One edge-function edit, one migration, one cron insert, one verification read. The backfill is a single UPDATE + one `refresh_daily_stats_cache` call over ~140 days.
