## Flat black rectangle "Browse Courses" button on Podcast page

**Goal:** Replace the current gradient-gold shimmer "Browse Courses" button on `/podcast` with a cleaner, flatter black rectangle that matches the Exercise card CTA style (black background, gold text, less rounded).

### What to change
**File:** `src/pages/Podcast.tsx` — lines 263-275 (the "Browse Courses" CTA)

**Current:** gradient-gold pill with shimmer, black text, heavy rounded-2xl, tall height.
**New:**
- `bg-black` background
- `text-primary` (gold) text
- `rounded-xl` (less rounded, more rectangular)
- Remove gradient, shimmer, and holographic overlay spans
- Keep the same width (`w-full`), height (`h-12 sm:h-14`), font weight, and link behavior (`to="/courses?intent=1"`)
- Keep hover/active transitions (`hover:scale-[1.02]`, `active:scale-[0.98]`, `hover:bg-black/90`)
- Keep the `ArrowRight` icon and `group-hover:translate-x-1` hover effect

### Verify
- Reload `/podcast` and confirm the "Browse Courses" button is now a flat black rectangle with gold text.
- Click it — still routes to `/courses?intent=1` and tracks correctly.
