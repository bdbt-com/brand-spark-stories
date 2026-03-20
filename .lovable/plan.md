

# Fix Daily Graphs: True All-Time + Left-Side Layout

## What's wrong
1. **"All time" starts March 4, 2026** — but you launched Dec 28, 2024. The SQL function hardcodes `'2026-03-04'` as the start date. There's no tracked data before that date (tracking only started then), but the graphs should at minimum acknowledge the full timeline or clarify what they show.
2. **Graphs are in the main center column**, not on the left side as requested. Currently they sit inside the same `flex-1` column as all the stat cards.

## Fix

### 1. Layout: Move graphs to a dedicated left column
Currently the page has two columns: main content (left) + activity feed (right). Change to three columns on large screens:
- **Left column (w-80)**: The 3 line graphs, sticky so they stay visible while scrolling
- **Center column (flex-1)**: All the existing stat cards (Today Live, Page Analytics, Bio Clicks, etc.)
- **Right column (w-80)**: Activity feed (unchanged)

On smaller screens, graphs stack above the stats as they do now.

### 2. Data: Include baseline visitors for pre-tracking period
The DB only has data from March 4, 2026 onward. To show "all time" from launch (Dec 28, 2024), prepend a single synthetic data point for Dec 28, 2024 using the known baseline of 4,684 visitors. This gives the graph context of the full history. Bio clicks and auto-redirects have no pre-tracking data, so those start from March 4 naturally.

Actually — since there's no daily granularity for the pre-tracking period (just a lump sum), the most honest approach is: keep the graphs starting from March 4 (when daily tracking began) but label them "Daily Trends (Since Tracking Started)" instead of "All Time", OR add the baseline as a single point at launch date showing the cumulative pre-tracking total. 

Given you want "all time" — I'll add the baseline as a single data point at Dec 28 2024 so the graph spans the full history, with a gap until March 4 when daily data begins.

### 3. Update the SQL function
Change `generate_series` start from `'2026-03-04'` to `'2024-12-28'` so all days from launch are included (most will be zero, with the baseline point added client-side or in SQL).

### Files changed

| File | Change |
|------|--------|
| Migration SQL | Update `get_daily_stats()` to start from `2024-12-28` |
| `src/pages/AdminList.tsx` | Restructure to 3-column layout; move graphs to sticky left sidebar; add baseline data point for visitors |

