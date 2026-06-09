# Hide Blueprint from nav, reorder menu

## `src/components/Navigation.tsx`
Replace the `navItems` array (lines 15–19) with the new order, removing Blueprint:

```ts
{ name: "Home", path: "/" },
{ name: "Courses", path: "/courses" },
{ name: "Podcast", path: "/podcast" },
{ name: "Tips", path: "/tips" },
{ name: "About", path: "/about" },
```

Note: the current array does not include "Home" — need to confirm it's rendered separately (likely via the logo). If Home isn't already a nav link, omit it from the list and keep the new order as Courses → Podcast → Tips → About.

## Untouched
- `/blueprint` route stays live and reachable via existing in-page links (e.g. "Get Your Foundation Blueprint Here" CTAs in Navigation lines 129 and 181).
- No page deletions.
- Applies to desktop and mobile (same array drives both).
