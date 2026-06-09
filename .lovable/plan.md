I’ll tighten the live-feed behaviour so bursts never overlap and every item gets its own clean entrance.

## Plan

1. **Replace per-batch delays with one global reveal queue**
   - Add a single queue for incoming feed items, shared across polling cycles.
   - If a second poll returns items while earlier items are still animating, append them to the existing queue instead of starting a new animation batch.
   - Release exactly one item at a time into the visible feed.

2. **Guarantee animation completion before the next item starts**
   - Use one timing constant that is longer than the row animation duration.
   - The next item will not be inserted until the previous item has finished its entry plus a small polish gap.
   - Remove the current `index * delay` approach that can restart at `0ms` for a later batch and cause overlap.

3. **Make the row animation more polished and consistent**
   - Adjust the live-feed entrance from a clipped/stepped reveal into a smoother mechanical reveal: subtle horizontal slide, soft opacity ramp, crisp content reveal, and icon tick timed inside the row animation.
   - Keep the “typewriter/mechanical” character, but make the timing less jumpy and more premium.

4. **Apply consistently across feed renderers**
   - Update both desktop and mobile/live-feed row rendering so the same queue and animation behaviour is used everywhere.
   - Keep existing feed data, filters, counts, and layout intact.

## Technical notes

- `fetchFeedIncremental` will dedupe incoming items, sort them oldest-to-newest, then push them into a `useRef` queue.
- A queue pump function will insert one item into `feed`, schedule the next release after the full animation window, and stop when empty.
- Fresh animation state will be tracked by item key and cleaned after the entry finishes, instead of relying on batch-specific delayed CSS.
- Tailwind animation timing will be updated so the row and icon feel synchronised and deterministic.