

# Add "Total Since Launch" to Video/Bio Cards + "Today" Graph Setting

## Changes

### 1. Add "Total" column to Video Clicks cards
Currently each video card shows a 3-column grid: 7d, 14d, 30d. Add a 4th column showing `c.total` labelled "Total". Change grid from `grid-cols-3` to `grid-cols-4`.

### 2. Add "Total" column to Bio Button Clicks cards
Same change — add a 4th column with `c.total` labelled "Total". Change grid from `grid-cols-3` to `grid-cols-4`.

### 3. Add "Total" to Auto-Redirects section
Already has 4 cards (Today, 7d, 14d, 30d). Add a 5th "Total" card showing `ar.total`. Change grid to `grid-cols-2 md:grid-cols-5`.

### 4. Add "Total" to Bio Link Clicks section
Currently has Today, 7d, 14d, 30d (4 cards). Add a 5th "Total" card. This requires fetching a total bio clicks count — but we don't currently have a "total" or "since_launch" bio clicks value. The simplest fix: add a `since_launch` key to the `bioPeriods` loop in `get-page-analytics` using the launch date, and display it as "Total".

### 5. Add "Today" option to graph range toggle
Add `'today'` to the `graphRange` state type and the toggle buttons. When selected, filter `dailyStats` to only the last 1 day (today's entry).

### Files changed

| File | Change |
|------|--------|
| `src/pages/AdminList.tsx` | Add Total columns to Video Clicks, Bio Button Clicks, Auto-Redirects, Bio Link Clicks; add "Today" graph range option |
| `supabase/functions/get-page-analytics/index.ts` | Add `since_launch` to `bioPeriods` for total bio clicks |

