# Fix /admin-list layout — make each row read as one cohesive unit

The current layout breaks because each `flex-1` graph column collapses to its content while the tile sits at fixed width far to the right, leaving a huge empty void in the middle. Page Stats cards are also stretched vertically.

All changes in `src/pages/AdminList.tsx`.

## 1. Each metric row = one Card containing graph + stat side-by-side

Wrap each of the three rows (Page Visitors, Bio & Podcast Link Clicks, /bio & /podcast Redirects) in a single `Card` with:

- `grid grid-cols-1 xl:grid-cols-[1fr_280px]` — graph genuinely fills remaining width; stat is a fixed 280px rail on the right
- Vertical divider between the two on `xl+` (`xl:border-l xl:border-border/50`)
- Inner padding `p-5`; consistent gap
- Section heading stays above the card (smaller, with a thin divider beneath it instead of just margin)

The graph component already renders inside a Card — drop its outer Card wrapper for these three rows so we don't get a card-in-a-card; let the row Card own the chrome.

## 2. Stat rail composition (right side of each row)

- Range label as a small uppercase tag, top-centered
- Big number, 4xl–5xl, tabular-nums, baseline-centered vertically within the rail (`flex flex-col items-center justify-center h-full`)
- Sub-label ("VISITORS" / "/BIO" / "/PODCAST") directly under the number
- For Today-only extras (avg time, /bio /podcast mini stats on Page Visitors row), put them as a small row of pills below the main number, not as stacked centered text
- Two-metric rows (Clicks, Redirects): show the two numbers as a compact 2-row stack with coloured dot indicators aligned to a consistent left edge inside the rail, so eye flows top→bottom rather than centring per number

## 3. Page Stats row — tighten the 6-card strip

- Reduce vertical padding `p-4` → `p-3`
- Drop the empty-line spacing; arrange as: label (sm bold gold) · path (mono xs muted) on one line, big number, "visitors", then a single muted footer line `Xm Ys · Y,YYY views` instead of three stacked lines
- Make all six cards equal height with `h-full`
- Add subtle hover lift (`hover:border-primary/40 transition-colors`)

## 4. Section headings

- Use a consistent header bar pattern: icon + title + range tag, with a thin `border-b border-border/40 pb-3 mb-4` underneath
- Removes the visual "floating heading" problem

## 5. Graph Range toggle

- Move it into a sticky-ish position right next to the page title at the very top of the main column, so it reads as a global control (not buried mid-page)
- Pill-style buttons stay the same

## Out of scope

- No data, RPC, or polling changes
- No changes to the Latest Video Redirects card, Avg Time / New Subs row, Bio Button Clicks section, or the right-hand Activity Feed
- No new colours added to the design system
