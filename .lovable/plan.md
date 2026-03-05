
Goal: make the “Picked For You” carousel look clean and uniform on mobile so the centered card shows full thumbnail + title + views at first load, with equal card sizing.

Implementation plan

1) Normalize mobile card dimensions (equal width + equal height)
- File: `src/pages/LinkInBio.tsx`
- Replace the current `min-w/max-w` sizing with a single fixed mobile width token for every card (e.g. `w-[52vw]` with matching `min-w`/`max-w`) so all 3 cards are identical.
- Convert each card wrapper to a vertical flex layout (`flex flex-col h-full`) and set a consistent text area height (`min-h-*`) so title/views alignment is identical across all cards.
- Keep `aspect-video` for thumbnail so media dimensions are always equal.

2) Ensure center card is perfectly centered on load
- File: `src/pages/LinkInBio.tsx`
- Replace the current `scrollIntoView`-only centering with explicit container centering math:
  - `scrollLeft = card.offsetLeft - (container.clientWidth - card.clientWidth) / 2`
- Run this on mount + delayed second pass (after layout settles) + on resize/orientation change for iPhone Safari reliability.

3) Move the section upward so full card content is visible in viewport
- File: `src/pages/LinkInBio.tsx`
- Reduce mobile-only vertical spacing above the carousel:
  - Top container vertical padding (`py-*`) reduced on mobile
  - Social icon bottom margin reduced
  - Link list spacing tightened slightly
  - “Picked For You” block `mt-*` reduced
- Keep desktop spacing unchanged with `md:` overrides.

4) Keep ordering neat and consistent
- File: `src/pages/LinkInBio.tsx`
- Maintain same episode order.
- Keep snap behavior (`snap-center`) and consistent gap so side cards peek evenly.
- Preserve existing tap/click tracking behavior and links.

5) Keep pulse subtle and non-distracting
- File: `src/index.css` and `src/pages/LinkInBio.tsx` (only if needed)
- Keep pulse only on the thumbnail area (not whole card) and ensure it does not affect text layout.
- If motion still feels strong, lower scale amplitude slightly while keeping timing slow.

Acceptance criteria
- On mobile initial load, middle episode card is centered.
- Middle card shows full thumbnail + full title block + views without clipping.
- All episode cards are visually equal in width and height.
- Layout appears tighter (moved up) but still clean and ordered.
- Desktop layout behavior remains unchanged.
