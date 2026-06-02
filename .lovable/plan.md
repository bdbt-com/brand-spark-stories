## Plan

Tighten the "Today — Live" section so all three rows below match the same `[graph | period cards]` pattern.

### Changes in `src/pages/AdminList.tsx`

**1. Trim the top "Today — Live" row to 2 cards.** Remove the Visitors card. Layout becomes:

```
[ Avg Time ] [ New Subs ]
```

`grid-cols-3` → `grid-cols-2`. Avg Time and New Subs keep their current copy and `AnimatedCounter` ticking.

**2. Add a Today card at the front of the Page Analytics row** so it reads identically to the Bio/Podcast and Redirects rows:

```
[ Visitors graph ] [ TODAY ] [ 7 DAYS ] [ 14 DAYS ] [ 30 DAYS ] [ SINCE LAUNCH ]
```

The TODAY card:
- Big visitor number (live ticking via `AnimatedCounter`, same `baselineVisitors + liveTick.visitors_today` formula already used in the top card).
- "visitors" label + `TodayTrendBadge` vs 7d.
- Subline: `/bio clicks: N` with its own `AnimatedCounter` and trend badge — this absorbs the `/bio clicks` line that was in the removed top card so nothing is lost.
- Same outer/inner padding and font weights as the existing 7/14/30/Since Launch cards so the row is visually uniform.

**3. Inner grid widens from `md:grid-cols-4` to `md:grid-cols-5`** to fit the new Today card alongside the four existing period cards. No other rows touched.

### What stays

- All polling logic (2 s tick, 1 s feed, 15 s slow loop).
- AnimatedCounter on the live numbers.
- The Bio/Podcast and Redirects rows already follow the target pattern — left untouched.

### Files

- edit: `src/pages/AdminList.tsx` only.

No backend, no schema, no edge-function changes.