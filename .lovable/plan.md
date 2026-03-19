

# Add trend indicators to all stat cards consistently

## Current gaps

| Section | Today trend | 7d trend | 14d trend | 30d trend |
|---------|------------|----------|-----------|-----------|
| Page Analytics | ✅ (visitors) | ✅ | ✅ | ❌ missing |
| Bio Link Clicks | ❌ missing | ✅ | ✅ | ❌ missing |
| Auto-Redirects | ✅ | ❌ no 7d/14d/30d cards at all | — | — |
| Bio Button Clicks | ❌ missing | ✅ | ✅ | ❌ missing |
| Video Clicks | ❌ missing | ✅ | ✅ | ❌ missing |

## Plan

### 1. Auto-Redirects — expand to full 4-column layout
Currently only shows "Today" and "Total". Change to match other sections: Today (with TodayTrendBadge), 7d, 14d, 30d — all with trend badges. The data already exists in `videoCounts["auto-redirect"]`.

### 2. Add TodayTrendBadge to all "today" hero numbers
- Bio Button Clicks: each card's today number gets `TodayTrendBadge`
- Video Clicks: each card's today number gets `TodayTrendBadge`
- Bio Link Clicks: Today card gets `TodayTrendBadge`

### 3. Add 30d trend using since_launch as outer period
For Page Analytics 30d: compare against since_launch as the outer period. For Bio Link Clicks 30d: no since_launch data available, so we skip (or show flat). For Bio Button / Video / Auto-Redirect 30d: the `total` count serves as the outer — use `total` with estimated total days since launch (~447 days since Dec 28 2024).

### File changed
- `src/pages/AdminList.tsx` — UI updates only, no backend changes needed

