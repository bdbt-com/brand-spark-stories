

## Make Admin Dashboard Update Live

### Current State
- **Video clicks**: Has a Supabase Realtime subscription, but it likely doesn't work because the `video_clicks` table has no SELECT RLS policy (Realtime requires SELECT access for the subscribing role).
- **Download counts**: Polled every 30 seconds via edge function.
- **Subscribers**: Fetched once on mount, never refreshes.

### Problem with Realtime Approach
Both `video_clicks` and `email_subscriptions` have no SELECT RLS policies. Adding public SELECT policies would expose user data. Since this is an admin-only page, polling is the simpler and more secure approach.

### Plan: Poll All Three Sections

**`src/pages/AdminList.tsx`**:
- Extract subscriber fetching into a `useCallback` like the other two fetchers
- Remove the broken Realtime channel (no SELECT RLS = no events delivered)
- Set up a single `setInterval` that polls all three functions every 15 seconds
- Initial fetch on mount stays the same
- Clean up interval on unmount

This means all three sections (video clicks, download counts, subscribers) will auto-refresh every 15 seconds without needing to republish or manually reload.

### Files Changed
- `src/pages/AdminList.tsx` only

