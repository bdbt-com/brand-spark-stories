

# Add % Change Indicators to Admin Dashboard Stats

All calculations done **client-side** using existing data — no backend changes needed.

## Approach

Compare the "daily rate" of each period against the next-longer period to derive a trend. For example:
- **7d**: `(7d_count / 7)` vs `((14d_count - 7d_count) / 7)` → "this week vs last week"
- **14d**: `(14d_count / 14)` vs `((30d_count - 14d_count) / 16)` → "these 2 weeks vs prior 16 days"
- **30d**: `(30d_count / 30)` vs `((since_launch_count - 30d_count) / remaining_days)` (where applicable)
- **Today / Since Launch**: no comparison shown (no prior reference)

Green ↑ for positive, red ↓ for negative, gray "—" for no data or zero baseline.

## Changes — `src/pages/AdminList.tsx` only

1. **Add a helper function** `calcPctChange(current, currentDays, prior, priorDays)` that returns a `{ pct: number, direction: 'up' | 'down' | 'flat' }` object.

2. **Add a small `TrendBadge` component** inline that renders e.g. `↑ 23%` in green or `↓ 12%` in red.

3. **Page Analytics section** (lines 235–259): Below each visitor count, show the trend badge comparing daily visitor rate to the prior period.

4. **Bio Link Clicks section** (lines 268–283): Same pattern — compare 7d vs prior-7d, 14d vs prior-16d, 30d vs remaining.

5. **Bio Button Clicks section** (lines 321–343): Add trend badges next to the 7d/14d/30d sub-stats within each button card.

6. **Video Clicks section** (lines 350–372): Add trend badges next to the 7d/14d/30d sub-stats for each video.

No new dependencies, no backend changes. Pure UI addition.

