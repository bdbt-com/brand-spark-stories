## Targeted trims to `/courses`

Only the items below — nothing else on the page changes.

### 1. Remove the hero trust strip (screenshot 1)
In `src/pages/Courses.tsx`, delete the entire "Trust strip" block inside the Hero section (the two pills: "30,000+ learning daily" and "As heard on the Daily Wins Podcast"). The headline + subheadline stay.

### 2. Locked card cleanup (screenshot 2)
- Remove the centred "UNLOCKING SOON" overlay (lock icon + caption + hover hint) inside `LockedCover` — it duplicates the top-right COMING SOON pill.
- Keep the frost / holographic sheen / shimmer layers so the cards still read as locked.
- The whole-card click → `scrollToWaitlist(course.topic)` and the "Join the Waitlist" button stay exactly as they are.

### 3. Remove em-dash "AI markers" in course hooks
Edit the two course hooks that contain ` — `:
- Movement Method: `Build a workout into your day — no gym, no trainer, no extra time.` → `Build a workout into your day. No gym, no trainer, no extra time.`
- Money System: `Stop money leaks and lower financial stress — without budgets or spreadsheets.` → `Stop money leaks and lower financial stress, without budgets or spreadsheets.`

(Other course hooks have no em-dash.)

### 4. Remove four full sections (screenshots 3 & 4)
Delete these `<section>` blocks from `Courses.tsx` in full:
- "They're All Connected" (connection-flow pills + supporting lines + "Explore The Full Daily Wins System" button)
- "Start For Free" (Foundation Blueprint card with the Download button)
- "Learn For Free Every Day" (3-video YouTube grid + "Watch On YouTube" button)
- "About Me" (DW avatar, copy, "My Story" button)

After removal the page order becomes:
1. Hero (headline + sub only)
2. Courses grid (4 cards)
3. Join the Courses Waiting List (email capture form)
4. Follow / Social footer (stats + social icons)
5. Sticky mobile bottom bar (unchanged)

### Cleanup that falls out of removing those sections
- Drop now-unused imports from `lucide-react`: `Play`, `ArrowDown`, `Target`. Keep `Lock`, `ArrowRight`, `Dumbbell`, `PiggyBank`, `Apple`, `Moon`, `Check`, `Sparkles`, `LucideIcon`.
- Drop unused `Link` (react-router-dom) import — no remaining `<Link>` on the page.
- Drop `useEffect`, `youtubeEpisodes`, `connectionFlow`, the `playingVideo` state and its effect, and the related `startTrackedRedirect` / `supabase` calls that were only used by the removed video grid. Keep `supabase` only if still referenced (it isn't after this trim, so remove its import too).

### Files touched
- `src/pages/Courses.tsx` — the only file changed.

No CSS, DB, edge-function, routing, or other-page changes.
