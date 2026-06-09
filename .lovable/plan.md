## Hero alignment + spacing pass

### 1. Truly centre the hero text (all breakpoints)
The previous change used `text-center lg:text-left`, which is why mobile-sized previews are still left-aligning each wrapped line. Change the hero left column wrapper to `text-center` only (drop the `lg:text-left` override), so every line of the H1 and the supporting paragraph is centred on mobile, tablet **and** desktop. Also wrap the paragraph in `mx-auto max-w-prose` so the centred text doesn't span uncomfortably wide on desktop.

The Browse Courses button stays centred via `flex justify-center`.

### 2. Shrink the hero by ~20%
Reduce the hero section's vertical padding so the whole dark/lighter top band is more compact:
- `py-24 lg:py-32` → `py-16 lg:py-24`
- Tighten the H1 → paragraph spacing (`mb-6` → `mb-5`, `mb-8` → `mb-7`).
- Reduce the chevron's distance from the bottom (`bottom-16` → `bottom-8`) so it sits closer to the trimmed edge.

### 3. Give the Daily Wins / Daily Drifts boxes breathing room
The section directly under the hero currently uses `py-24`. Bump the top padding so the boxes sit further down the page, leaving clear space around the Browse Courses CTA when the hero shortens:
- `py-24` → `pt-32 md:pt-40 pb-24`

### 4. Mobile pass
- Stack order is already correct (text first, carousel second).
- The button is already `w-full sm:w-auto` so it remains a generous tap target on mobile.
- Carousel keeps its existing aspect ratio — no change.

### Files touched
- `src/pages/Home.tsx` only.

No new dependencies. After this lands, please scroll through on mobile + desktop and send the next round of feedback.
