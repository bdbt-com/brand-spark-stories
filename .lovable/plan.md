Mirror the Bio approach in the **Auto-Redirects** row to fix the visual overlap and unify the metrics.

### 1. Database migration
Update `get_daily_stats()` and `get_hourly_stats_today()` so the `auto_redirects` column counts **both** legacy `auto-redirect:%` and newer `latest-auto:%` `video_id` prefixes (currently only the legacy prefix is counted, while podcast page redirects use `latest-auto:`). This makes the graph line match what's shown in the 5-tile total.

### 2. `src/pages/AdminList.tsx` — Auto-Redirects section
- **Graph**: pass a second series to `InlineGraph` — `dataKey2="podcast_clicks"`, `label2="/podcast clicks"`, `color2="hsl(210, 90%, 60%)"` (same blue used in the Bio section). Section heading becomes `Auto-Redirects & /podcast clicks`.
- **5 stat tiles (Today / 7d / 14d / 30d / Total)**: same layout as the new Bio tiles — top half shows the redirects number with an orange dot (combined `ar.* + pr.*` so `auto-redirect:*` + `latest-auto:*` totals), bottom half shows `/podcast clicks` (`pc.*`) with the blue dot, divider in between. `TodayTrendBadge` on the Today tile for both rows; `TrendBadge` on 7d/14d/30d for both rows.
- **Remove** the separate bottom `/podcast redirects` + `/podcast clicks` 2-tile row (now merged into the 5 tiles above; the redirects portion is preserved inside `ar+pr`).
- Keep the **Latest Video Redirects** card unchanged.
- Fix the overlap by ensuring the right side renders as a single column (`flex-1` containing only the 5-tile grid) instead of two stacked grids fighting for width.

No changes to the Bio Link Clicks section, Latest Video Redirects card, or any other section.