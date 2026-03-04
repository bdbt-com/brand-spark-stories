

## Plan: Track /bio Referral Sources (Instagram, TikTok, YouTube)

The idea is to use `?ref=` query parameters in the bio URLs you share on each platform, then capture that ref value when tracking page views, and display a per-source breakdown in the admin dashboard.

### How It Works

You'll use different URLs on each platform:
- **Instagram**: `bdbt.lovable.app/bio?ref=instagram`
- **TikTok**: `bdbt.lovable.app/bio?ref=tiktok`
- **YouTube**: `bdbt.lovable.app/bio?ref=youtube`

### Changes

**1. Database: Add `referrer` column to `page_views`**
- Add a nullable `text` column `referrer` to the `page_views` table (migration)

**2. `src/components/PageViewTracker.tsx`**
- Read `?ref=` from the URL search params (`useLocation` already available)
- Pass `referrer` in the body when invoking `track-page-view`

**3. `supabase/functions/track-page-view/index.ts`**
- Accept optional `referrer` field in the insert body and save it to the new column

**4. `supabase/functions/get-page-analytics/index.ts`**
- Query today's `/bio` and `/links` page views grouped by `referrer`
- Return a `bio_referrers` object like `{ instagram: 5, tiktok: 12, youtube: 3, direct: 8 }`

**5. `src/pages/AdminList.tsx`**
- Under the existing `/bio clicks: X` line, show a small breakdown:
  - `IG: 5 · TT: 12 · YT: 3 · Direct: 8`
- All in grey, compact, same card

### Files Changed
- Migration: add `referrer` column to `page_views`
- `src/components/PageViewTracker.tsx` — capture `?ref=` param
- `supabase/functions/track-page-view/index.ts` — store referrer
- `supabase/functions/get-page-analytics/index.ts` — return per-source counts
- `src/pages/AdminList.tsx` — display referrer breakdown

