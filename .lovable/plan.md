
## Course launch + chart fix (single batch — keeps within 5-credit budget)

**External course URL:** https://bigdaddysbigtips.xperiencify.io

### 1. Fix Page Visitors "Today" chart — dot lands on the line, not after 8pm
Root cause: the chart's XAxis category is the raw `hour` string from Postgres (e.g. `"2026-06-25T05:00:00+00:00"`), but signup markers were keyed with `new Date(...).toISOString()` (e.g. `"2026-06-25T05:00:00.000Z"`). Recharts treats those as different categories and appends the dot at the end of the axis.

Fix in `src/pages/AdminList.tsx` (marker builder, ~lines 344–383): index hourlyStats by epoch ms, look the signup hour up against it, and emit the marker using the **exact same `hour` string** the XAxis uses (and the visitor count at that hour as `y`). The dot then sits on the line at the correct hour.

### 2. Unlock "Daily Wins For Exercise" on Home + Courses pages
- `src/pages/Courses.tsx`: Exercise card `status: "available"`. New visual variant: gold background, black text/icon/bullets, black "Available Now" pill, black button reading **Start Exercise Wins** that opens the external link in a new tab. Other 3 cards unchanged.
- `src/pages/Home.tsx`: same treatment for Exercise card in the Courses preview section; other 3 cards untouched.

### 3. Waitlist form changes (modal + Courses-page form)
- Field set becomes **First Name *, Last Name *, Email Address *** — all three mandatory with inline validation.
- Course selector label → **"Which future course are you most interested in? (optional)"**
- Remove **Exercise** from selector options (now a live course). Remaining: Money, Nutrition, Sleep (+ "All of them" on the Courses page form).
- Files: `src/components/EmailCaptureForm.tsx`, `src/components/CoursesIntentModal.tsx`, `src/hooks/useFormValidation.ts`, `src/utils/validation.ts` (add `validateLastName`).

### 4. Persist last name
- Migration: `ALTER TABLE public.email_subscriptions ADD COLUMN IF NOT EXISTS last_name text;`
- `supabase/functions/send-guide/index.ts`: accept optional `lastName`, store it on insert.

### 5. Verify
- Reload `/admin-list` → Today chart: visitor line + signup dot sitting on it at the correct hour (no stray "5am" after 8am).
- `/` and `/courses`: Exercise card gold/black, "Start Exercise Wins" opens xperiencify.io; other cards unchanged.
- Submit waitlist with any field blank → blocked; all three filled → succeeds, row stored with last_name.

No emails, no other pages, no business logic touched beyond the above.
