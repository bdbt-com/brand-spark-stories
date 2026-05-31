1. In `src/pages/Podcast.tsx`, change `AUTO_REDIRECT_SECONDS` from `8` to `10`.
2. Remove the paused countdown `useEffect` entirely (lines 52-55).
3. Remove the "Auto-redirect paused" text line (lines 162-164).
4. Clean up unused state: delete `secondsLeft`, `setSecondsLeft`, and `redirected` / `setRedirected` if no longer referenced.