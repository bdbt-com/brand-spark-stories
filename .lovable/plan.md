## Split Auto-Redirects row into /bio vs /podcast redirects

(Stats RPCs already updated in DB — `get_daily_stats` and `get_hourly_stats_today` now return `bio_redirects` and `podcast_redirects` columns instead of the old combined `auto_redirects` + `podcast_clicks`.)

### `src/pages/AdminList.tsx` — Auto-Redirects section only

- **Types** (lines 212–213): `dailyStats` / `hourlyStats` use `bio_redirects` and `podcast_redirects` instead of `auto_redirects` / `podcast_clicks`.
- **Heading**: "Auto-Redirects & /podcast clicks" → **"/bio Redirects & /podcast Redirects"**.
- **Graph** (lines 595–604):
  - `dataKey="bio_redirects"` `label="/bio redirects"` (orange, unchanged colour)
  - `dataKey2="podcast_redirects"` `label2="/podcast redirects"` (blue, unchanged colour)
- **Tile sums** (lines 553–588):
  - `br` = sum of `videoCounts` keys starting with `auto-redirect:` (plus bare `auto-redirect` legacy) → top half (orange) `/bio redirects`
  - `pr` = sum of keys starting with `latest-auto:` → bottom half (blue) `/podcast redirects`
  - Drop the old `pc` page-click sum.
- **Tile labels** (lines 619 & 631): "redirects" → "/bio redirects"; "/podcast clicks" → "/podcast redirects".

### `supabase/functions/get-page-analytics/index.ts`

The `podcastClicks` block (lines 86–104) is no longer used by the Auto-Redirects row, but `bioClicks` is still used by the **Bio Link Clicks** section above. Leave the edge function as-is (returning both) — removing `podcast_clicks` would require touching the Bio row, which the user didn't ask about. Frontend simply stops consuming `podcast_clicks` for this section.

No changes to: Bio Link Clicks section, Latest Video Redirects card, Bio Button Clicks, or any other section.
