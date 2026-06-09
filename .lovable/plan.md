I’ll tighten the live feed so entries cannot visually overlap, and I’ll add country information if the tracking data can provide it.

Plan:

1. Make the live feed queue deterministic
- Replace the render-time “is this new?” detection with explicit per-item animation state.
- Each queued item gets released only after the previous item’s full entry animation plus a small buffer has completed.
- Avoid re-sorting the visible feed during a queue release, because that can make multiple new rows appear/reposition at once.
- Add proper cleanup for queue timers on unmount.

2. Polish feed item animations for all item types
- Apply the same entry treatment to blue click rows, orange redirect rows, signups, and downloads.
- Make the row animation feel more mechanical/typed: stable height, crisp left-to-right reveal, small icon tick, and no basic pop/fade.
- Use the same animation classes in both the mobile feed and right-hand desktop feed.

3. Improve number-change animation consistency
- Adjust the existing odometer counter timing so number changes feel more precise and less jumpy.
- Keep the mechanical feel, but make the transitions smoother and better synchronised.

4. Add country labels to feed rows where possible
- Extend `FeedItem` with optional country fields.
- Check whether existing `video_clicks` / `page_views` rows already contain country data. From the current code, they do not appear to.
- For future events, update the tracking edge functions to capture country from request headers when available, commonly `cf-ipcountry`, `x-vercel-ip-country`, or similar hosting/CDN headers.
- Add a migration to store country on `video_clicks` and `page_views`, then update `get-activity-feed` to return a readable country label.
- Replace the little raw code underneath each popup with the country label when available; fall back to the current label only when country is unknown.

Technical notes:
- Existing historical clicks cannot reliably show country unless the country was already captured somewhere, which this codebase does not currently show.
- New clicks after deployment should show country if the hosting/Supabase edge request includes a country header; otherwise they’ll show “Unknown country” or keep the existing fallback.