## Two small fixes on `/admin-list`

### 1. Feed row entrance — silky bubble pop instead of janky fade

The "Live Feed" rows (mobile + desktop) currently use Tailwind's stock `animate-in fade-in-0 slide-in-from-top-2 duration-500 ease-out`. That utility chain reads as a stuttery fade because it animates `opacity` + a tiny `translateY` linearly with no scale.

Replace with a custom keyframe `bubble-in`:

- `opacity: 0 → 1`
- `transform: scale(0.85) translateY(-6px) → scale(1) translateY(0)`
- duration ~550ms, easing `cubic-bezier(0.34, 1.56, 0.64, 1)` (gentle overshoot, "pop")
- `will-change: transform, opacity` while animating

Add the keyframe + animation to `tailwind.config.ts` as `animate-bubble-in`, then swap the className on the two feed-row spots in `src/pages/AdminList.tsx` (lines 509 and 1081) from the `animate-in fade-in-0 slide-in-from-top-2 …` chain to `animate-bubble-in fill-mode-both`. Stagger delays via `animationDelay` continue to work.

### 2. Counter reel — roll DOWN from above

In `src/components/AnimatedCounter.tsx`, the digit reel stacks 0–9 top-to-bottom and translates upward as digits grow, so new higher digits enter from below. Reverse it:

- Reverse the `DIGITS` array (or equivalently render `[9,8,…,0]`).
- Change the transform to `translateY(-(9 - digit)em)`.

Net effect: when a count ticks up, the strip slides downward and the new digit drops in from above. Easing/duration unchanged (the user said the motion itself is perfect).

### Files

- `tailwind.config.ts` — add `bubble-in` keyframe + animation
- `src/components/AnimatedCounter.tsx` — invert reel direction
- `src/pages/AdminList.tsx` — swap classes at lines 509 and 1081
