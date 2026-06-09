# Mobile: bigger hero image, push Browse Courses back down

Mobile-only tweaks in `src/pages/Home.tsx`. Desktop unchanged.

## 1. Enlarge carousel image (mobile)
- Wrapper class `max-w-[50%] mx-auto lg:max-w-none` → `max-w-[85%] mx-auto lg:max-w-none`.

## 2. Move Browse Courses CTA back down (mobile)
- CTA section padding `pt-6 lg:pt-24 pb-6 lg:pb-12` → `pt-16 lg:pt-24 pb-6 lg:pb-12`.

## Verification
At 390×844 the image fills ~85% width feeling balanced, and the Browse Courses button sits roughly where it did before, with the Daily Wins/Drifts boxes still further down. Desktop at 1440×900 is identical.
