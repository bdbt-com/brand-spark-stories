## Recolour `/bio` series from green to orange

In `src/pages/AdminList.tsx`, replace the two `hsl(142, 71%, 45%)` usages tied to `/bio` (chart line + the small dot beside the `/bio` stat number) with `hsl(25, 95%, 53%)` — the same orange used by the redirects row below.

- Line 653: `color="hsl(142, 71%, 45%)"` → `color="hsl(25, 95%, 53%)"` (chart `/bio` line)
- Line 681: `style={{ background: "hsl(142, 71%, 45%)" }}` → `hsl(25, 95%, 53%)` (legend/stat dot)

The chart's legend dot (`InlineGraph` internal) will pick up the new colour automatically since it derives from the `color` prop.

No other component or RPC change.
