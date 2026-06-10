## Goal
Every row in the `/admin-list` live feed shows a country label. No more raw 2-letter codes, and no more blank locations on signups/downloads.

## Changes

### 1. `supabase/functions/get-activity-feed/index.ts`
- Replace the `Intl.DisplayNames` lookup (unreliable in Deno, this is why some rows still show `PK`, `DZ`, `KH`, etc.) with a built-in ISO 3166-1 alpha-2 → country name map covering all ~250 codes. `countryLabel("PK")` always returns `"Pakistan"`.
- Attach country to **signups** and **downloads** too. `email_subscriptions` doesn't store country, so we backfill from `page_views`:
  - In one query, pull recent `page_views` (last ~48h, country IS NOT NULL) and build a `Map<session_id, country>` plus a fallback `Map<normalised_email_local_part, country>` is not available — instead we match signups to the most recent prior page_view by time-window + (later) session if we add it.
  - Practical approach for now: for each signup, find the most recent `page_views` row with a non-null country whose `entered_at` is within ±10 minutes of `created_at`. Done with one batched query (`page_views` since `min(signups.created_at) - 10m`), then resolved in-memory.
  - Download rows reuse the signup's resolved country (same subscriber).
- If no country can be resolved, label falls back to `"Unknown"` so the UI still shows a location chip rather than nothing.

### 2. `src/pages/AdminList.tsx` (live feed renderer)
- Show the country chip on every feed row type, not only clicks. If `country` is `"Unknown"`, render the chip in muted style.

## Technical notes
- The country map lives inline in the edge function (single `const COUNTRY_NAMES: Record<string,string>`). British English spellings where applicable.
- No DB schema changes; no migration.
- No new tables, no new secrets.

## Out of scope
- Storing country directly on `email_subscriptions` (would need a schema change + client update). Can do later if the ±10-minute join proves inaccurate.
