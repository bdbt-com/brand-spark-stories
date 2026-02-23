

## Admin Email Stats via Tips Search Bar

When you type "adminstats" in the Tips page search bar, instead of navigating to a separate page, it will reveal an inline email stats dashboard right there on the Tips page -- no new route needed, keeping it completely hidden from regular users.

### What You'll See

- **Total subscribers** count
- **Emails sent vs pending** counts
- **Breakdown by guide** -- how many signups each guide has received
- **Subscriber table** -- name, email, guide requested, date, and sent status (newest first)
- A close button to dismiss the panel

### Changes

#### 1. New file: `src/components/AdminEmailStats.tsx`

- A self-contained component that:
  - Fetches all rows from `email_subscriptions` via the existing Supabase client
  - Uses `@tanstack/react-query` for data fetching (consistent with existing patterns)
  - Displays stat cards (total, sent, pending, per-guide breakdown) using existing Card components
  - Renders a subscriber table using existing Table components
  - Includes a close/dismiss button
  - Shows loading and error states

#### 2. `src/components/AITipFinder.tsx`

- Add a new state: `showAdminStats` (boolean)
- Add a check in `analyzeAndRecommend()` alongside the existing special keyword checks (thumbnail, daily wins, etc.):
  - If search input matches "adminstats" (case-insensitive), set `showAdminStats = true` and return early
- Render `AdminEmailStats` component below the search bar when `showAdminStats` is true, with an onClose callback to hide it

### Technical Notes

- No new routes or navigation changes needed -- everything stays inline on the Tips page
- Uses the same Supabase client already imported elsewhere in the app
- The `email_subscriptions` table schema includes: `id`, `first_name`, `email`, `guide_title`, `guide_download_url`, `email_sent`, `email_sent_at`, `created_at`

