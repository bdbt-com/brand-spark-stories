
I hear you. The previous tweak was not enough. Here is the direct fix plan to make it clearly gentler and clearly smaller on mobile.

## Plan: Make center card truly gentle + make cards visibly smaller on first load

### 1) Stop the “vibrating” effect (root cause fix)
File: `src/index.css` and `src/pages/LinkInBio.tsx`

- Replace current pulse with a slower “breathing” keyframe:
  - `scale(1) -> scale(1.008~1.012) -> scale(1)`
  - duration `6s` (not 2.5/4s), `ease-in-out`, infinite
- Apply pulse to the **inner thumbnail/play area only** (not the whole card wrapper) to avoid text jitter and anti-alias flicker.
- Add `transform-gpu` + `origin-center` + `will-change-transform` on the animated element for smoother rendering.
- Keep animation mobile-only (`md:animate-none`).

Why this works: scaling the whole card (including text) can look jittery; scaling only the media area gives the “alive/clickable” cue without “sprinting/vibrating.”

### 2) Make cards much smaller on mobile (hard cap, not loose %)
File: `src/pages/LinkInBio.tsx`

- Replace `min-w-[38%]` with a tighter fixed/clamped width for mobile, e.g.:
  - `min-w-[clamp(108px,31vw,132px)] max-w-[clamp(108px,31vw,132px)]`
- Keep desktop unchanged (`md:min-w-0 md:max-w-none`).
- Reduce spacing to match smaller cards:
  - `gap-4` -> `gap-2` on mobile
  - keep compact text block (`p-2`), and if needed set title to `text-xs` on mobile with `line-clamp-2`.

Why this works: percentage widths still felt big; clamped px/vw gives predictable small cards across 320–430px screens.

### 3) Ensure center card is fully visible immediately on open
File: `src/pages/LinkInBio.tsx`

- Upgrade centering logic from single `scrollLeft` set to robust centering:
  - use `scrollIntoView({ inline: "center", block: "nearest" })` on card index `1`
  - run once on mount, then a second pass after a short timeout (`~150–250ms`) to account for first paint/layout settling
- Keep snap behavior but ensure initial position lands centered reliably.

Why this works: current one-shot offset math can land wrong on some devices at first paint.

### 4) Keep section label as requested
File: `src/pages/LinkInBio.tsx`

- Confirm header stays exactly: `Picked For You`.

## Exact implementation targets

- `src/index.css`
  - Replace current `@keyframes gentle-pulse` with slower, lower-amplitude keyframes.
- `src/pages/LinkInBio.tsx`
  - Move animation class from outer card wrapper to inner media block.
  - Tighten mobile card width to clamped small width.
  - Tighten mobile gap/typography as needed.
  - Harden initial centering logic (mount + delayed recenter).
  - Keep `Picked For You`.

## Success criteria (what you should see)

1. Center card feels like a slow “breath,” not vibration.
2. On mobile open, center card thumbnail + title are fully visible.
3. Cards are noticeably smaller than current version, with side cards visible.
4. Header reads `Picked For You`.
