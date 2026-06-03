## Targeted edits to `/courses`

Only the changes you listed — nothing else gets touched.

### 1. Replace modal with smooth scroll + course pre-select

- Remove `WaitlistModal` import, the `waitlistFor` state, and the `<WaitlistModal />` render at the bottom of `src/pages/Courses.tsx`. Delete `src/components/WaitlistModal.tsx` (no longer used).
- Add a ref `waitlistFormRef` on the bottom "Join the Courses Waiting List" section (already has `scroll-mt-24`).
- Add `selectedCourse` state on the page (default `null`). New handler `scrollToWaitlist(topic?: string)` sets the state and smooth-scrolls to the section.
- Wire all three CTAs to it:
  - Each course card "Join the Waitlist" button → `scrollToWaitlist(course.topic)`.
  - "Download Free Blueprint" button in Start For Free section → `scrollToWaitlist()`.
  - Mobile sticky bottom-bar CTA → `scrollToWaitlist()`.
- Each locked course card (whole card) becomes clickable → same handler with its topic. Inner buttons/links use `stopPropagation` so they still behave independently.

### 2. Polish `EmailCaptureForm`

Extend `src/components/EmailCaptureForm.tsx` with three optional props (defaults preserve existing behaviour everywhere else it's used):

- `showCourseSelector?: boolean`
- `courseValue?: string` + `onCourseChange?: (v: string) => void` (controlled from Courses page)
- `submitLabel?: string`
- `successTitle?: string` + `successDescription?: string`
- `headingLabel?: string | null` — when `null`, the "Get Your Free Copy" label is omitted.

Changes inside the form:
- Replace the "Get Your Free Copy" heading with `headingLabel` when provided; on the courses page pass `"Reserve your spot"`.
- Render a pill selector under the email field when `showCourseSelector` is true: options Exercise / Money / Nutrition / Sleep / All of them. Label: "Which course are you most interested in? (optional)". Styled with the gold-on-dark pill style already used on the Connection Flow (`bg-[#141414] border border-primary/40`, selected = `bg-primary/20 border-primary text-primary`).
- Submit button label uses `submitLabel` when provided; courses page passes `"Join the Waitlist + Get the Free Blueprint →"`.
- Success state uses `successTitle` / `successDescription` when provided; courses page passes `"You're on the list ✓"` and `"check your inbox for the Foundation Blueprint."`.
- On submit, if a course is selected, fire a parallel `supabase.from("course_waitlist").insert({ email, course_title })` (best-effort, ignore duplicate errors) so existing waitlist analytics still work. The Resend `send-guide` call is unchanged.

No changes to `send-guide` edge function. No DB migration needed (table `course_waitlist` already exists).

### 3. Form card visual

Update the bottom section card on Courses to use the same gold-tinted background as Start For Free:
`bg-gradient-to-br from-primary/10 via-[#141414] to-primary/5 border-primary/30`. Pass the props above into `EmailCaptureForm`.

### 4. Keep My Story button

Verified the gold-outline "My Story" `<Link to="/about">` button in About Me section stays exactly as it is.

### 5. Holographic frosted locked cover on each Coming Soon card

Add a `LockedCover` component rendered inside each coming-soon card (skipped when `status === "available"`).

Layered, absolutely-positioned, inherits the card's `rounded-2xl`:

```text
[card content: icon, title, hook, bullets, button] (z-0, visible behind)
└─ LockedCover (absolute inset-0, rounded-2xl overflow-hidden, z-10)
   ├─ Frost layer  → backdrop-blur-[5px] bg-[rgba(10,10,10,0.35)]
   │                 fallback bg-[rgba(20,20,20,0.6)] via @supports
   ├─ Holographic sheen → gradient (champagne gold → faint pearl
   │                       purple/teal) opacity-30 mix-blend-overlay
   ├─ Shimmer streak → diagonal translucent band, ~7s linear loop,
   │                    disabled under prefers-reduced-motion
   └─ Centre stack → Lock icon 44px #E8CE8A with gold drop-shadow,
                     caption "UNLOCKING SOON"
```

Crisp above the cover (z-20, no blur, no pointer-events on cover behind them):
- the COMING SOON status pill (top-right)
- the "Join the Waitlist" button (bottom).

Card interactions:
- Whole card `onClick` → `scrollToWaitlist(course.topic)`, `cursor-pointer`, hover lift `md:hover:-translate-y-1` (already present).
- Desktop hover: cover frost eases lighter (`md:group-hover:bg-[rgba(10,10,10,0.18)]` + sheen opacity to 0.45) and a small `"Join the Waitlist →"` hint fades in under the lock. Driven by Tailwind `group-hover` so it can be removed in one line if you'd rather keep it fully locked.

When a course is later flipped to `status: "available"`, the cover doesn't render — nothing else needed.

### Tailwind / CSS additions

Add to `src/index.css` (scoped utility classes, no token changes):

```css
@keyframes holo-shimmer {
  0%   { transform: translateX(-120%) skewX(-12deg); }
  100% { transform: translateX(220%)  skewX(-12deg); }
}
.holo-shimmer { animation: holo-shimmer 7s linear infinite; }
@media (prefers-reduced-motion: reduce) {
  .holo-shimmer { animation: none; }
}
.holo-sheen {
  background: linear-gradient(115deg,
    rgba(232,206,138,0.25) 0%,
    rgba(200,170,255,0.10) 35%,
    rgba(120,220,210,0.10) 65%,
    rgba(232,206,138,0.25) 100%);
}
.frost-fallback { background: rgba(20,20,20,0.6); }
@supports (backdrop-filter: blur(5px)) {
  .frost-fallback { background: rgba(10,10,10,0.35); backdrop-filter: blur(5px); }
}
```

### Files touched

- `src/pages/Courses.tsx` — remove modal, add scroll handler + selectedCourse state, wire 3 CTAs, locked cover overlay, gold-tint waiting list card.
- `src/components/EmailCaptureForm.tsx` — new optional props for course selector, custom labels, custom success copy, optional course_waitlist insert.
- `src/components/WaitlistModal.tsx` — delete.
- `src/index.css` — add holo shimmer / sheen / frost-fallback utilities.

No DB changes, no edge-function changes, no navigation changes, no other pages touched.