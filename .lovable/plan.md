## Plan

1. **Courses page (`src/pages/Courses.tsx`)** — Remove the "Follow / Social footer" section (lines 244–292), including the 30K+/100+/8PM stats, the "Helping people replace…" italic line, and the "Follow @bigdaddysbigtips" block with social icons. Clean up any now-unused imports (`SiInstagram`, `SiSpotify`, `SiTiktok`, `SiYoutube`) if no longer referenced.

2. **Home page (`src/pages/Home.tsx`)** — Insert two new sections directly after the "Browse Courses CTA" (after line 230) and before the "Why Life Feels Harder Than It Should" section:

   a. **Social footer block** — Same markup as removed from Courses: 3‑column stats grid (30K+ YouTube Subscribers, 100+ Daily Wins Shared, 8PM New Episode Every Day), the "Helping people replace Daily Drifts with Daily Wins." italic line, the "Follow @bigdaddysbigtips" heading, and the row of Instagram/Spotify/TikTok/YouTube social circles. Import the four `Si*` icons from `react-icons/si` at the top of Home.tsx.

   b. **Quote block** — Below the social footer, a centred italic blockquote:
   > "If you don't build a system around your Daily Wins, comfort will quietly build one around your Daily Drifts."
   
   Styled in primary/gold-ish muted tone, max-width ~3xl, generous vertical padding to act as a visual breather before the "Why Life Feels Harder" section.

3. **Spacing** — Adjust the top padding of the "Why Life Feels Harder Than It Should" section so it sits comfortably below the new quote (the quote effectively pushes it down, satisfying the "move down" request); no other sections change.

No changes to functionality, data, routes, or other pages.
