Add a hover tooltip to the "X.X /min" live counter on `/admin-list` showing three stats:

1. **Current** — the live value already displayed (feed items in trailing 60s, server-time adjusted).
2. **Today's best** — highest per-minute rate observed since 00:00 local today.
3. **All-time best** — highest per-minute rate ever recorded.

## Implementation

**Frontend (`src/pages/AdminList.tsx`)**
- Wrap the "/min" stat (both mobile and desktop instances) in a shadcn `HoverCard` (already available in `src/components/ui/hover-card.tsx`) so hover/tap reveals a small dark card with the 3 rows.
- Every second when `interactionsPerMin` recomputes, compare against `todayBest` state; if higher, update and persist.
- On mount, load `todayBest` and `allTimeBest` from a new lightweight table via a `SELECT`, and load today's from same table filtered by date.
- When a new best is set, `upsert` it to the DB so it survives refresh and is shared across admin sessions.

**Backend (new migration)**
- Create `public.interaction_rate_records` with columns: `id`, `day` (date, unique), `best_per_min` (numeric), `recorded_at`. 
- Grant `SELECT, INSERT, UPDATE` to `authenticated` + `ALL` to `service_role`; enable RLS with a policy allowing admin role (reuse existing `has_role` pattern already used on admin tables).
- "All-time best" = `MAX(best_per_min)` across all rows.

## Notes
- No changes to how the current /min number is calculated — only reads it and stores highs.
- Tooltip styled to match the existing black/gold admin card aesthetic.
- Values shown to 0.1 decimal like the current counter.