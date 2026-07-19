## Current analytics rule

All page-view traffic must be counted in AdminList stats. Do not classify or exclude ad traffic, missing user agents, in-app browsers, prefetchers, or suspected bots from visitor totals unless the user explicitly asks for that later.

## Applied fix

- `track-page-view` stores new page views with `is_bot = false`.
- Historical rows have been reset to `is_bot = false`.
- Analytics database functions no longer filter with `is_bot = false`.
- `daily_stats_cache` and `page_daily_stats_cache` were rebuilt from `2026-03-01` through yesterday.
- Weekly cache reconciliation now recounts all traffic, not a filtered subset.

## Verification target

Dashboard visitor totals should match raw distinct `session_id` counts from `page_views`, plus the existing lifetime baseline used in the frontend for since-launch totals.