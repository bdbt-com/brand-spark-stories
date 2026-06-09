I know it looks like the data was wiped, but the logs show the database calls are timing out, so the admin page is rendering empty/zero states because it is not getting responses. I will not delete, truncate, reset, or overwrite any analytics data.

## Recovery plan

1. **Stop the admin page from flooding the database on load**
   - Keep the date range selector always visible.
   - Stage the initial admin requests instead of firing every heavy analytics endpoint at once.
   - Keep live polling, but only for lightweight live/feed updates.
   - Do not pause counting when you are away from the page; only avoid building an animation queue while away.

2. **Restore historical dashboard data properly**
   - Keep counters, graphs, subscribers, downloads, video clicks, page stats, and feed history loading when the admin page opens.
   - If a heavy request fails once, keep the section visible and retry instead of making the page look wiped.

3. **Fix the actual timeout source in Supabase**
   - Add/replace optimised database functions for admin analytics so they aggregate the needed periods more efficiently.
   - Avoid repeated `COUNT(DISTINCT ...)` scans for every period separately where possible.
   - Add supporting indexes for `page_views`, `video_clicks`, and subscription lookups if missing.
   - This is a safe schema/function migration only; no user data is removed.

4. **Keep the feed queue behaviour exactly as requested**
   - Historical events that happened before opening `/admin-list` appear immediately and silently.
   - New events that happen while the page is open animate one at a time.
   - Events are still recorded while you are away; they just do not backlog as pop-up animations.

5. **Verify after implementation**
   - Test the deployed edge functions directly.
   - Check Supabase edge logs for timeout errors.
   - Open `/admin-list` and confirm the date selector, graph sections, counters, and live feed all show data again.