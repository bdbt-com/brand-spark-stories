## Fix the Bio & Podcast Link Clicks chart

### Root cause

`src/pages/AdminList.tsx` line 651 still rewrites every row before passing it to the chart:

```ts
const mirrored = src.map((r) => ({ ...r, podcast_clicks: r.bio_clicks }));
```

This was a leftover from when the ad URL was switched from `/bio` to `/podcast`. It forces the `/podcast` series to equal the `/bio` series, which produces the two symptoms in the screenshot:

- The `/bio` line is hidden because the `/podcast` line is plotted with identical values directly on top of it.
- The June 2 tooltip shows `podcast_clicks: 4` instead of the real 8,061 from the Today card, because the chart is reading mirrored bio data, not the real `podcast_clicks` field that the RPC already returns correctly.

The underlying RPCs (`get_daily_stats`, `get_hourly_stats_today`) already return accurate `podcast_clicks` per day/hour — the chart is just discarding them.

### Fix

In `src/pages/AdminList.tsx` around lines 648–664, remove the `mirrored` rewrite and feed the raw rows straight into `InlineGraph`:

```ts
{(graphRange === 'today' ? hourlyStats.length > 0 : filteredDailyStats.length > 0) && (
  <InlineGraph
    data={graphRange === 'today' ? hourlyStats : filteredDailyStats}
    dataKey="bio_clicks"
    label="/bio"
    color="hsl(142, 71%, 45%)"
    dataKey2="podcast_clicks"
    label2="/podcast"
    color2="hsl(210, 90%, 60%)"
    hourly={graphRange === 'today'}
  />
)}
```

After this:

- The `/podcast` line will reflect real `/podcast` session counts (matches the 8,061 Today card on June 2).
- The `/bio` line will be visible again as a separate, lower-volume green line.
- No data-source or RPC changes needed.

### Files

- `src/pages/AdminList.tsx` — drop the `mirrored` map, pass `src` directly to `InlineGraph`.
