# Mobile: shrink carousel + enlarge headline

Mobile-only changes in `src/pages/Home.tsx`. Desktop (`lg:` and up) unchanged.

## 1. Shrink carousel image (mobile only)
Wrap the carousel card so it renders at ~50% width on mobile, full-width on desktop:
- Add `max-w-[50%] mx-auto lg:max-w-none` to the `bg-white/10 backdrop-blur-md rounded-2xl ...` wrapper.

## 2. Enlarge H1 (mobile only)
- `text-2xl lg:text-6xl` → `text-4xl lg:text-6xl`
- Spacing stays `mb-3 lg:mb-5`.

## 3. Body paragraph unchanged
- Keeps `text-sm lg:text-lg`.

## Verification
View `/` at 390×844 — carousel image is roughly half the previous width, headline is larger, body unchanged, Browse Courses still above the fold. Confirm desktop at 1440×900 is identical.
