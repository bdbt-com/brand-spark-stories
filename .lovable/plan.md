

## Move Video Sections to Top of Page (Above the Fold)

### Goal
Maximize video visibility for mobile ad traffic to boost YouTube engagement, without altering the desktop/mobile look or removing any existing content.

### Current Layout Order

**Home.tsx:**
1. Hero section (full viewport with CTA + carousel) `py-24 lg:py-32`
2. Podcast videos section `py-24`
3. Daily Wins / Drifts explanation
4. The Vessel, Ripples, Journey...

**Blueprint.tsx:**
1. Heading + Email form + Blueprint info card
2. Podcast videos (at `mt-16`)
3. CTA section

### Problem
On mobile, the hero section fills the entire screen. Users must scroll past it before seeing any video. On Blueprint, videos are even further down -- below the email form and info card.

### Proposed Changes

**`src/pages/Home.tsx`:**
- Reduce the podcast section top padding from `py-24` to `py-10 md:py-24` so it sits tighter below the hero on mobile
- This brings videos into view with minimal scrolling on mobile, while keeping the spacious desktop layout

**`src/pages/Blueprint.tsx`:**
- Move the podcast videos section from below the email/info grid to directly above it (right after the heading)
- Reduce its bottom margin from `mt-16 mb-16` to `mb-8` since it's now at the top
- The email form + blueprint card remain exactly where they are visually on desktop (just one section lower)

### What stays the same
- All existing content remains in place
- Desktop spacing and visual hierarchy unchanged (using `md:` prefixes)
- No styling, color, or component changes
- Video tracking still works identically

