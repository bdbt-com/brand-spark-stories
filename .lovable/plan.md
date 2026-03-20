

# Add Time Range Filter to Daily Trend Graphs

## Change

Add a row of 4 toggle buttons (7d, 14d, 30d, All Time) below the three line graphs in the left sidebar (and mobile view). Clicking a button filters the `dailyStats` array to show only that time range.

## Implementation

### File: `src/pages/AdminList.tsx`

1. Add state: `const [graphRange, setGraphRange] = useState<'7d' | '14d' | '30d' | 'all'>('all');`

2. Add a `useMemo` that filters `dailyStats` based on `graphRange`:
   - `7d`: last 7 days
   - `14d`: last 14 days
   - `30d`: last 30 days
   - `all`: no filter (full array)

3. Add a row of 4 small buttons below the "Daily Trends" heading (both in the desktop left sidebar and the mobile section), styled as toggle pills — the active one gets a filled primary style, others get an outline/muted style.

4. Pass `filteredDailyStats` instead of `dailyStats` to all 6 `LineChart` instances (3 desktop, 3 mobile).

No backend changes needed — the data is already fetched in full from the `get_daily_stats` RPC.

