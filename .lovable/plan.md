## Changes to Admin List activity feed

**1. `supabase/functions/get-activity-feed/index.ts`**
- Remove the `page_views` query and the loop that pushes `visitor` items into the feed (it clogs the feed).
- Keep `video_clicks` and `email_subscriptions` queries, both at `.limit(10000)`.

**2. `src/pages/AdminList.tsx`**
- Remove the `visitor` filter pill from `FeedFilterBar`.
- Remove `"visitor"` from the `FeedFilter` union and from `FEED_CONFIG`.
- Remove the unused `Eye` icon import.
- Leave filters: All / Clicks / Redirects / Signups / Downloads.

No other behaviour changes — feed still shows last 24h, capped at 10,000 per source.