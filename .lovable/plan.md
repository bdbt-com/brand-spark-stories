## Confirmation — course data IS being captured

Verified in the live DB:

- **Emails** → `email_subscriptions` table with `guide_title = "Courses Waiting List"`. These already flow into the admin email list (`/admin-list` email section) like every other signup.
- **Course choice(s)** → `course_waitlist` table (one row per selected course per email).

Both are written from `CoursesIntentModal.tsx` on submit. So yes, everything is being recorded — no fix needed there.

## Add a signups counter to the Courses page stat card

In `src/pages/AdminList.tsx`, the "Courses /courses" card in the Page Stats grid (around line 727) currently shows one extra line — "course btn clicks". I'll add a second line beneath it: **"X course signups"**, time-ranged to match the active filter (today / 7d / 14d / 30d / all).

### How

1. Add a tiny RPC/edge call OR a direct supabase select counting `course_waitlist` rows grouped by created_at buckets. Simplest: fetch all `course_waitlist` rows once (low volume) and compute counts per range client-side, same pattern used for downloads.
2. In the Courses card, render a second small `<AnimatedCounter />` line below "course btn clicks":
   ```
   ✦ <n> course signups
   ```
   Styled identically to the existing extra line (primary/80, 10px, tabular-nums).
3. Count = distinct emails in `course_waitlist` within the active range (so multiple course picks by one user = 1 signup), matching how the email-list dedupes.

### Out of scope

No schema changes, no edge function changes, no changes to the live feed (signups already show there). Purely a frontend addition to one card.
