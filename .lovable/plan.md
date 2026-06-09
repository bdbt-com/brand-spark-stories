# Even nav spacing + rename CTA

## `src/components/Navigation.tsx` (desktop bar only)

**1. Even spacing between social icons and the Blueprint button**
Currently the row is `flex justify-between` with the nav links hugging the right side. Restructure the desktop layout so the nav items fill the space between the icons and the button:

- Wrap the desktop nav links in a flex-1 container with `justify-around` (or `justify-evenly`) so Home / Courses / Podcast / Tips / About spread evenly across the available width.
- Keep the Blueprint button anchored at the far right (outside the flex-1 container).
- Leave mobile menu untouched.

Concretely: replace the single `hidden md:flex` block (lines 105–130) with two siblings — a flex-1 nav container `hidden md:flex flex-1 justify-evenly` for the links, and the Button kept as its own element at the end with `ml-4` removed (spacing now comes from the evenly-distributed layout, plus a small `pl-6` for breathing room from "About").

**2. Rename CTA text**
Change button label (lines 128 and 180) from:
`Get Your Foundation Blueprint Here`
→ `Get Your Free Foundation Blueprint`

Applies to both desktop and mobile buttons.

## Untouched
- `/blueprint` route, mobile menu order, logo, social icons.
