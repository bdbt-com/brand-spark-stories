# Mobile hero compression + headline question mark

All changes scoped to `src/pages/Home.tsx`. Desktop (`lg:` and up) stays identical to current.

## 1. First H1 line gets a question mark
- `"Are your habits building the life you want"` → `"Are your habits building the life you want?"`

## 2. Hero section padding
- `py-16 lg:py-24` → `py-6 lg:py-24`

## 3. Grid gap between copy and carousel
- `gap-12` → `gap-6 lg:gap-12`

## 4. H1 size + spacing
- `text-4xl lg:text-6xl mb-5` → `text-2xl lg:text-6xl mb-3 lg:mb-5`

## 5. Hero paragraph
- `text-base lg:text-lg mb-7` → `text-sm lg:text-lg mb-4 lg:mb-7`

## 6. Carousel card
- Wrapper padding `p-8` → `p-4 lg:p-8`
- Image aspect `aspect-square` → `aspect-[4/3] lg:aspect-square` (shorter on mobile)

## 7. Hero chevron
- Hidden on mobile; visible from `lg` up. Button wrapper class adds `hidden lg:block`.

## 8. Browse Courses CTA section spacing
- `pt-16 md:pt-24 pb-8 md:pb-12` → `pt-6 lg:pt-24 pb-6 lg:pb-12`

## 9. Daily Wins/Drifts section
- `pt-8 md:pt-12 pb-24` → `pt-10 lg:pt-12 pb-24` (small breathing room on mobile)

## Verification
After build, view `/` at 390×844 mobile to confirm the Browse Courses button is visible on first paint, and at 1440×900 desktop to confirm nothing shifted.
