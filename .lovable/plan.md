

## Add "Today" Analytics Box

### What it does
Adds a new highlighted card at the top of the Page Analytics section showing three "Today" stats:
1. Visitors today
2. Average time on site today  
3. New subscribers gained today

All update live every 15 seconds alongside the existing data.

### Changes

**1. Edge function: `get-page-analytics`**
- Add a `"today"` period to the periods map, using midnight UTC of the current day as the `since` value
- No baseline needed for today (it's always fresh data)

**2. Edge function: `admin-email-stats`**
- Add a `today_count` field to the response: count subscribers where `created_at >= today midnight UTC`

**3. `src/pages/AdminList.tsx`**
- Add a new "Today" section above the existing analytics grid with 3 cards side by side:
  - **Visitors Today** -- from `analytics["today"]?.visitors`
  - **Avg Time Today** -- from `analytics["today"]?.avg_duration`
  - **New Subscribers Today** -- from the new `today_count` field in the subscribers response
- Style the section with a subtle accent border or background to distinguish it as the "live today" dashboard
- Store `todaySubscribers` count in state, populated from the `admin-email-stats` response

### Technical detail

In the edge function, today's period skips the baseline addition since baselines only cover historical pre-tracking data:

```ts
// In get-page-analytics
const todayMidnight = new Date(now);
todayMidnight.setUTCHours(0, 0, 0, 0);
periods["today"] = todayMidnight.toISOString();

// When combining, skip baseline for "today"
const baseline = key === "today" ? { visitors: 0, avg_duration: 0 } : (BASELINES[key] || ...);
```

In admin-email-stats, add today count:
```ts
const todayMidnight = new Date();
todayMidnight.setUTCHours(0, 0, 0, 0);
const todayCount = subscribers.filter(s => s.created_at && new Date(s.created_at) >= todayMidnight).length;
```

