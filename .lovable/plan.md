

# Make Bio Button Clicks show Today's count as the big number

Currently the big number shows `c.total`. Change it to show `c.today`, and add the 7d/14d/30d stats underneath (same as now, just removing the "Today" sub-stat since it's now the hero number).

## Change — `src/pages/AdminList.tsx` (lines 362-369)

In the Bio Button Clicks card:
- **Line 363**: Change `{c.total}` → `{c.today}`
- **Lines 364-369**: Remove the "Today" sub-item from the 2x2 grid, replace with 7d / 14d / 30d in a 3-column layout (keeping trend badges on 7d and 14d).

Result: Big number = today's count, with 7d/14d/30d underneath — matching the screenshot reference.

