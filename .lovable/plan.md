## Goal
Make the course selection pills visually match the gold "Join the Waitlist + Get the Blueprint" button, and make the whole intent modal feel native, fast and high-converting on mobile (where 90% of traffic lands).

All work is scoped to `src/components/CoursesIntentModal.tsx`. No backend, route, or business-logic changes.

## Course pill styling (match the gold button)
- Selected state: solid gold `bg-primary` with `text-primary-foreground`, subtle gold glow shadow, no border outline — same flat gold fill as the CTA.
- Unselected state: transparent/dark base with a soft gold border (`border-primary/50`) and gold text, so they read as "ghost" versions of the same button.
- Rounded `rounded-xl` to mirror the CTA pill, bold weight, single-line label.
- Add a small check tick (lucide `Check`) that fades in when selected, right-aligned inside the pill, so multi-select is obvious.
- Tap target ≥ 48px tall on mobile; keep 2-column grid on all sizes (4 options → balanced 2×2).

## Mobile-first modal polish
- Dialog container:
  - Width: `w-[calc(100vw-1.5rem)] max-w-md sm:max-w-lg`, `p-5 sm:p-6`, `rounded-2xl`.
  - Keep current gold-tinted gradient background + gold border.
  - Constrain height with `max-h-[92vh] overflow-y-auto` so the form is always reachable on small screens / when the keyboard opens.
- Header:
  - Title size `text-xl sm:text-2xl` (down from 2xl/3xl) so it never wraps awkwardly on 360px screens.
  - Description `text-sm`, max 2 lines.
- Form spacing: `space-y-3`, labels `text-xs`, inputs `h-11` with `text-base` (prevents iOS zoom-on-focus, which kills conversion).
- Inputs: `inputMode` + `autoComplete` hints — `autoComplete="given-name"` on first name, `type="email" inputMode="email" autoComplete="email"` on email, `autoCapitalize="words"` on name, `autoCapitalize="none"` on email, `enterKeyHint="send"` on email so mobile keyboards show a Send key.
- Submit CTA: full width, `min-h-12`, same gold hero variant (already matches). Keep arrow icon. Disabled state stays gold but dimmed.
- Footer microcopy: keep "No spam. Unsubscribe anytime." in `text-[11px]`.
- Close (X): ensure the built-in DialogContent close button sits in the top-right with a comfortable 44px hit area (add `[&>button]:top-3 [&>button]:right-3 [&>button]:h-9 [&>button]:w-9` class on `DialogContent`).

## Conversion / performance touches
- Pre-fill nothing, but auto-focus the first name field only on `sm:` and up (skip autofocus on mobile so the keyboard doesn't shove the pills off-screen before the user picks a course).
- Show selected-count helper text under the pill grid when ≥1 selected: e.g. "2 selected — we'll tailor your early access." (small, gold, fades in). Reinforces commitment.
- Submit button label stays "Join the Waitlist + Get the Blueprint" (already proven copy).
- Keep the existing optimistic `course_waitlist` insert and the `send-guide` invoke — no logic changes.
- All animations use existing tokens (`animate-scale-in`, simple `transition-all`) — no extra libs, no perf cost.
- No new imports beyond `Check` from `lucide-react`, so bundle stays the same size.

## Out of scope
- No changes to `Courses.tsx`, the waitlist DB, the edge function, or any other page.
- No new colours/tokens added to `index.css` or Tailwind config — uses existing `--primary` token, so it stays consistent with the CTA button.
