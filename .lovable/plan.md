

## Mobile Live Feed Bar

### Change
In `src/pages/AdminList.tsx`, add a mobile-only compact live feed strip at the top of the page (above all sections), showing the 5 most recent activities in a thin horizontal card. The existing sidebar feed (desktop, `hidden lg:block`) stays unchanged.

### Implementation

**1. Add mobile feed block** — Insert right after the outer `<div>` opens (line ~142), before the flex container:
- A `<div className="lg:hidden mb-6">` wrapping a thin `<Card>` 
- Header: "Live Activity" with green dot, inline
- Show `feed.slice(0, 5)` as compact single-line rows (icon + detail + label + time ago), smaller padding
- Each row uses `flex items-center gap-2 py-1.5` for a tight layout

**2. No changes to desktop sidebar** — it remains `hidden lg:block` with 10 items.

