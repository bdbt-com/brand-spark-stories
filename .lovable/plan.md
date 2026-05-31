In `src/pages/Podcast.tsx`:

1. Remove the helper text `"You'll be taken to YouTube to watch today's latest episode."` (the `<p>` above the removed status line).
2. Add an idle-based auto-redirect:
   - New `useEffect` that runs once `video` is loaded and `redirected` is false.
   - Start a 10-second timeout that calls `goToVideo(true)`.
   - Listen for `mousemove`, `mousedown`, `keydown`, `touchstart`, `scroll`, `wheel` on `window` (passive). Any event clears and restarts the 10s timer.
   - Cleanup removes listeners and clears the timeout on unmount or when `redirected` flips true.
3. Keep `AUTO_REDIRECT_SECONDS = 10` as the idle threshold.