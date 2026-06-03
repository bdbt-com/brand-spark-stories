# Courses Page Redesign Plan

Scope: only `src/pages/Courses.tsx` plus one new modal component and one waitlist edge function/table. No other pages touched.

## 1. Design tokens (scoped to this page)

Use existing semantic tokens where they already match brand (gold primary, near-black bg). Where the spec needs values not in `index.css`, add page-local utility classes inside Courses.tsx via Tailwind arbitrary values — no global token changes that could ripple to other pages.

- Surface charcoal `#141414` with `border-primary/20`
- Gold highlight `#E8CE8A` for hover glow / gradient
- Card radius `rounded-2xl` (16px), button radius `rounded-xl` (12px)
- Headings: keep `italic font-bold text-primary` with `clamp()` sizing via arbitrary values
- Body min 16px, line-height 1.6
- Buttons: min-h-12, full width on mobile (`w-full sm:w-auto`)
- Desktop hover: card `hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.4)]`; button `hover:scale-[1.02]`

## 2. Section-by-section

### Top trust strip (new)
Just under H1. Small pill row: "30,000+ learning daily · As heard on the Daily Wins Podcast".

### Section 1 — Courses (priority)
- Heading + new subhead: "Four simple systems. One connected life. Pick where you want your first win."
- Grid: `grid-cols-1 md:grid-cols-2` (2x2 desktop, single col mobile), `items-stretch` for equal heights, `h-full flex flex-col` on cards.
- Update `Course` type to add: `icon: LucideIcon`, `status: 'coming-soon' | 'available'`.
- Replace `courses` array with new titles + hooks:
  - Movement Method / Money System / Nutrition Reset / Sleep Reset
- Card structure:
  1. Top row: icon tile (rounded-square, `bg-primary/10`, gold lucide icon, 56px) + COMING SOON pill in top-right (gold bg, Lock icon). Pill component supports green AVAILABLE NOW variant via `status` prop.
  2. Title (gold, bold)
  3. Hook (grey `text-muted-foreground`)
  4. Bullet list with `Check` icon in gold
  5. `mt-auto` single CTA button "Join the Waitlist" → opens modal
- Remove the "Start X Wins" button and the "(Locked — Coming Soon …)" line entirely.
- Icons: Dumbbell, PiggyBank, Apple, Moon from lucide-react.

### Waitlist modal (new component `src/components/WaitlistModal.tsx`)
- Built on existing `Dialog` ui primitive.
- Props: `open`, `onOpenChange`, `courseTitle`.
- Single email field + "Notify Me" button + line "Be first in when {courseTitle} opens."
- On submit: insert into a new `course_waitlist` table (columns: id, email, course_title, created_at) via Supabase client. Show "You're on the list ✓" confirmation state.
- Validation: zod email + trim + max 255.

### Section 2 — They're All Connected
Replace inline arrow text with a visual flow:
- Desktop (`hidden md:flex`): horizontal row of gold pill nodes joined by `ArrowRight` icons.
- Mobile (`flex md:hidden`): vertical stack, `ArrowDown` between.
- Nodes: Sleep → Nutrition → Exercise → Money → Confidence → Happiness.
- Keep the 5-line stacked list and existing CTA button.

### Section 3 — Start For Free
- Wrap in a card with subtle gold-tint background: `bg-gradient-to-br from-primary/10 via-background to-primary/5 border-primary/30`.
- Keep Target icon, heading, sub, and gold "Download Free Blueprint" button (use `variant="default"` for solid gold).

### Section 4 — Learn For Free Every Day
- Keep existing YouTube trio + tracking logic untouched (per memory: /redirect bridge, startTrackedRedirect).
- Tighten thumbnail card styling: uniform `aspect-video`, `rounded-2xl`, gold play overlay (`bg-primary/90` circle around Play icon — already present, just confirm sizing).
- Bold the "30,000+ people learning better habits every day" line.
- Keep "Watch On YouTube" CTA.

### Section 5 — About Me
- Add circular avatar placeholder (96px) with `ring-2 ring-primary/60 ring-offset-2 ring-offset-background` above the heading. Use a placeholder div with initials "JT" or similar until real photo added.
- Keep bio copy verbatim, keep "My Story" button.

### Section 6 — Waiting list capture (existing section)
Keep the `EmailCaptureForm` section as-is; it's the general courses waitlist (vs per-course modal).

### Sticky mobile bottom bar (new)
- `fixed bottom-0 inset-x-0 md:hidden` bar with backdrop blur + gold border-top.
- Single CTA: "Download Free Blueprint" → Link to `/blueprint`.
- Add `pb-20 md:pb-0` to page root so content isn't hidden behind it.

## 3. Backend additions

Migration creating `public.course_waitlist`:
```
id uuid pk default gen_random_uuid()
email text not null
course_title text not null
created_at timestamptz default now()
unique(email, course_title)
```
- GRANT INSERT to anon + authenticated; SELECT to service_role only.
- RLS enabled; policy: allow INSERT to anon/authenticated, no SELECT to public.

No edge function needed — direct client insert is fine given RLS + insert-only policy.

## 4. Files touched

- `src/pages/Courses.tsx` — full rewrite of layout, keep video tracking logic
- `src/components/WaitlistModal.tsx` — new
- `supabase/migrations/<ts>_course_waitlist.sql` — new

No changes to: navigation, other pages, global tokens, video tracking, redirect bridge, existing EmailCaptureForm.

## 5. Out of scope

- Replacing the bottom EmailCaptureForm (kept as general waitlist).
- Real founder photo (placeholder only).
- Email provider wiring beyond DB capture.
