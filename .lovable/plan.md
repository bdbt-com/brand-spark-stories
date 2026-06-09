## Update homepage CTA → force Foundation Blueprint popup on Courses

### 1. Rename the button
Change the homepage hero CTA text from **"Browse Courses"** to **"Get Your Free Foundation Blueprint"**. Keep the same premium gold styling and arrow icon.

### 2. Make it force the Courses intent popup every time
Currently `/courses` shows the `CoursesIntentModal` once per session (sessionStorage key `courses_intent_modal_seen`). The user wants the popup to appear **every time** they arrive via this specific button — even repeat visits.

Implementation:
- Link target becomes `/courses?intent=1` instead of `/courses`.
- In `src/pages/Courses.tsx`, read the `intent` query param via `useSearchParams`. When `intent=1` is present, ignore the sessionStorage guard and open the modal immediately (still after the existing 600ms delay so the page paints first), and clear the param from the URL so a refresh behaves normally.

### Files touched
- `src/pages/Home.tsx` — button label + `to="/courses?intent=1"`.
- `src/pages/Courses.tsx` — add `useSearchParams` hook, force-open branch in the existing `useEffect`.

No new dependencies. Existing modal behaviour (auto-once per session) is preserved for normal `/courses` navigation.
