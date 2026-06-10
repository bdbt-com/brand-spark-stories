## Podcast page CTA cleanup (`src/pages/Podcast.tsx`, ~lines 256–295)

1. **Remove the square Blueprint button** (lines 281–294) entirely.
2. **Centre the Spotify square** in its own row and add a bit of top margin to push it down slightly (e.g. `mt-2 sm:mt-3`). Container becomes a single centred flex with just the Spotify tile.
3. **Add a second primary button under "Watch on YouTube"** labelled **"Browse Courses"**, matching the homepage gold gradient style (from `Home.tsx` lines 214–225): same gradient, shimmer, rounded-2xl, ArrowRight icon, links to `/courses?intent=1`. Full width like the YouTube button (`w-full h-12 sm:h-14`). Tracked via `trackClick("button-courses")`.

Resulting stack order:
- Watch on YouTube (existing primary)
- Browse Courses (new, gold gradient)
- Spotify square (centred, slightly lower)

No other pages or logic touched.