

## Use Lovable's Historical Analytics Data

The custom `page_views` tracking only started today, so the admin dashboard shows zeros. The user wants the real historical data from Lovable's built-in analytics reflected in the dashboard.

### Approach: Add Historical Baselines to the Edge Function

Since we can't backfill thousands of rows into `page_views`, the simplest approach is to add baseline constants to the `get-page-analytics` edge function. These represent the data recorded by Lovable analytics **before** custom tracking began (March 4, 2026). The live-tracked data from `page_views` will be added on top.

From the Lovable analytics data provided:
- **Since Launch** (Dec 28): 4,684 visitors, 241s avg duration
- **Last 30 days**: 3,100 visitors, 299s avg duration  
- **Last 14 days**: 1,300 visitors, 351s avg duration
- **Last 7 days**: 528 visitors, 284s avg duration

### Changes

**`supabase/functions/get-page-analytics/index.ts`**:
- Add a `TRACKING_START` date constant (2026-03-04)
- Add baseline data per period representing pre-tracking Lovable analytics
- For each period, combine the baseline visitors/duration with the live `page_views` data
- Use weighted average for duration (baseline weighted by baseline visitor count, live weighted by live count)

This way the numbers match reality immediately, and going forward the live tracking adds to them naturally. As time passes and all data falls within the custom-tracking era, the baselines for shorter periods (7d, 14d) will naturally become irrelevant.

### Files Changed
- `supabase/functions/get-page-analytics/index.ts` -- add historical baselines

