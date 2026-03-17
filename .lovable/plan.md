

# Add "Today vs Recent Average" Trend Badges

For "today" stats, we can't compare to yesterday (no data). Instead, compare today's count to the **average daily rate from the 7d period** (excluding today). This gives a "today vs your recent daily average" comparison.

## New helper: `calcTodayTrend(today, sevenDay)`
- `recentDailyAvg = (sevenDay - today) / 6` (prior 6 days excluding today)
- If avg is 0 → flat. Otherwise `pct = ((today - avg) / avg) * 100`

## 3 locations in `src/pages/AdminList.tsx`:

1. **Today's Visitors** (~line 229): Add `TrendBadge`-style indicator comparing `analytics.today.visitors` vs `analytics["7d"].visitors`

2. **Today's /bio clicks** (~line 230): Add trend comparing `bioClicks.today` vs `bioClicks["7d"]`

3. **Today's Auto-Redirects** (~line 330): Add trend comparing `ar.today` vs `ar["7d"]`

All use the same `calcTodayTrend` helper and render the same green/red badge style. One file, ~15 lines of new code.

