# Limit Page Stats to the nav pages

Only show stat boxes for the six pages in the top nav: **Home, About, Blueprint, Tips, Courses, Podcast**.

## Changes

`src/pages/AdminList.tsx` — Page Stats section:
- Define a fixed ordered list:
  - `/` → Home
  - `/about` → About
  - `/blueprint` → Blueprint
  - `/tips` → Tips
  - `/courses` → Courses
  - `/podcast` → Podcast
- Build a lookup from the RPC rows by normalised `page_path`.
- Render exactly those six cards in that order, showing the page's friendly label (e.g. "Home") with the path underneath in mono, plus visitors / avg time / views.
- Missing pages still render a card showing `0 visitors` / `0s avg` so the row stays consistent.
- Grid becomes `grid-cols-2 sm:grid-cols-3 lg:grid-cols-6` so all six fit on one row on desktop.

No backend changes — the existing `get_page_stats` RPC and `get-page-stats` edge function already return everything; we just filter client-side.