# Polish: Range selector, activity feed animations, counter animations

All changes confined to presentation layer. No data/RPC/business logic changes.

## 1. Bigger, more prominent Graph Range section (`src/pages/AdminList.tsx`)

Promote the current thin inline strip into a proper control bar:

- Wrap in its own `Card` (or bordered panel) with `p-4` and subtle gradient background
- Larger icon (`w-5 h-5`), bolder label `text-sm` with gold accent
- Range buttons become proper pills: `px-4 py-2`, `text-sm font-semibold`, rounded-full, with active state using `bg-gradient-primary text-primary-foreground shadow-accent` and hover state `hover:bg-secondary/80 hover:scale-[1.03]`
- Add a small "Showing data for:" prefix and the resolved range label (e.g. `Since Launch`) as a chip on the right, so users always see what's active
- Sticky-ish positioning at top of main column (`sticky top-4 z-10`) with a translucent backdrop (`bg-background/85 backdrop-blur`) so it stays visible while scrolling

## 2. Mechanical "typewriter" entrance for Live Activity Feed items

Two feed renders use `animate-bubble-in` today (right-column main feed at line 1146 and a smaller inline feed at line 522). Replace with a new mechanical reveal:

- Add new keyframes to `tailwind.config.ts`:
  - `type-reveal`: row slides in from `translateX(-6px)` + clip-path `inset(0 100% 0 0)` to `inset(0 0 0 0)` over `~420ms` with `steps(24)` timing for a chunked typewriter sweep
  - `caret-blink`: a thin 1px primary-coloured vertical bar fades 1→0 over 700ms, looped twice, then hides
  - `tick-in`: tiny scale 0.85→1 pop for the leading status dot using `cubic-bezier(0.34, 1.56, 0.64, 1)` so each row "snaps" into place
- Compose into a single `animate-type-row` utility that plays clip-reveal + tick-in together, with a brief temporary caret element (absolute-positioned, removed via animation end)
- Apply only to rows flagged `isNew`; existing rows stay static (no re-trigger on re-render — already keyed by id)
- Stagger when multiple new rows arrive in one tick: `style={{ animationDelay: `${index * 60}ms` }}` for the first N flagged-new rows
- Respect `prefers-reduced-motion`: fall back to a 150ms opacity fade

## 3. Mechanical counter animation upgrade (`src/components/AnimatedCounter.tsx`)

Current digit reels use a smooth cubic-bezier translate. Make it feel like a split-flap / odometer:

- Change reel easing to `steps(10, end)` over `~520ms` so each digit ticks through intermediate numerals discretely instead of gliding
- Add a very subtle vertical settle: after the stepped translate finishes, a 90ms `cubic-bezier(0.34, 1.56, 0.64, 1)` micro-bounce of `translateY(1px → 0)` on the digit column
- Add a faint horizontal divider line at the digit baseline (1px, `hsl(var(--border))`, 30% opacity) inside each Reel so it reads as a mechanical flap card
- Stagger digit animations left-to-right by `30ms * index` so the number "rolls" across like a tally counter rather than all digits moving in unison
- Respect `prefers-reduced-motion`: skip animation, jump straight to final value
- Keep public API identical (`value`, `className`, `format`, `duration`) so all 30+ existing call sites work unchanged

## Out of scope

- No changes to data fetching, polling intervals, RPCs, or edge functions
- No changes to layout/grid of metric rows, Page Stats cards, or right column structure
- No new colours added; reuse `primary`, `border`, `muted-foreground`
- The "Maximum call stack" runtime error noted in the preview will be investigated separately if it persists — not part of this plan unless it's caused by the new animations

## Files touched

- `src/pages/AdminList.tsx` — range selector block (~lines 547-568) and two feed row renderers (~lines 522, 1146)
- `src/components/AnimatedCounter.tsx` — reel timing + styling
- `tailwind.config.ts` — new keyframes/animations for `type-reveal`, `caret-blink`, `tick-in`, `type-row`
- `src/index.css` — optional `@media (prefers-reduced-motion)` override block
