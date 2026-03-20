

# Inline Graphs with Their Corresponding Stat Sections

## Problem
All three graphs are stacked in a separate left sidebar column, disconnected from the stats they represent.

## Fix
Remove the dedicated left sidebar column. Instead, place each graph inline next to its corresponding stat section using a two-column row layout per section:

```text
┌──────────────┬────────────────────────────┐
│ Visitors     │ Page Analytics             │
│ [line graph] │ [7d] [14d] [30d] [launch]  │
├──────────────┼────────────────────────────┤
│ Bio Clicks   │ Bio Link Clicks            │
│ [line graph] │ [Today] [7d] [14d] [30d]   │
├──────────────┼────────────────────────────┤
│ Auto-Redir   │ Auto-Redirects             │
│ [line graph] │ [Today] [7d] [14d] [30d]   │
└──────────────┴────────────────────────────┘
```

On `xl+` screens: each section becomes a flex row with the graph card on the left (~w-80) and the stat cards grid on the right (flex-1). On smaller screens: graph stacks above the stat cards.

### Layout change
- Remove the left sidebar column (`hidden xl:block w-80`) entirely
- Revert to the previous two-column layout (main content + activity feed)
- For Page Analytics, Bio Link Clicks, and Auto-Redirects sections: wrap each in a `flex` row with the graph card on the left and stats on the right
- Move the range toggle (7d/14d/30d/All Time) to sit above the first graph or as a shared control above all three sections
- Mobile graphs section also removed (replaced by inline stacking)

### File changed
| File | Change |
|------|--------|
| `src/pages/AdminList.tsx` | Remove left sidebar; embed each graph card inline beside its stat section |

