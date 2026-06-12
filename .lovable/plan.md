## Plan

1. **Replace the Foundation Blueprint cover immediately**
   - Upload `/mnt/user-uploads/Screenshot_2026-06-11_at_20.00.44.png` as the new `foundation-blueprint-cover.png` Lovable asset.
   - Overwrite `src/assets/foundation-blueprint-cover.png.asset.json` so the existing homepage import automatically shows the new cover.

2. **Fix the “new subs today” number**
   - Update the live tick database function so `subscribers_today` counts **unique new email addresses today**, not raw rows in `email_subscriptions`.
   - Use `COUNT(DISTINCT lower(email))` for today’s subscriber count.

3. **Remove the incorrect fallback that can show 2**
   - Update `src/pages/AdminList.tsx` so the dashboard displays the deduplicated `todaySubscribers` value directly, instead of `Math.max(liveTick.subscribers_today, todaySubscribers)` which can force the wrong higher number.

4. **Verify**
   - Confirm the asset pointer now points to the new uploaded cover.
   - Confirm the admin dashboard logic can only show the unique-subscriber count for today.