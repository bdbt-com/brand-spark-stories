## Intent-capture popup on `/courses` load

A dismissible modal opens shortly after `/courses` mounts, lets the visitor pick a course of interest, captures name + email, and signs them up to the waitlist in one step.

### Behaviour
- Opens ~600ms after page mount (lets the page paint first).
- Closeable via `X` (Radix Dialog default), backdrop click, or `Esc`.
- Once closed or successfully submitted, suppressed for the rest of the session via `sessionStorage["courses_intent_modal_seen"]`. Re-opens on next session.
- Body scroll-locked only while open (Radix default).

### Modal UI
- Title: `Pick where you want your first win` (gold italic).
- Subline: `Get the free Foundation Blueprint + early access when your course drops.`
- Pill selector: Exercise / Money / Nutrition / Sleep / All of them (same gold-on-dark styling used in `EmailCaptureForm`). Selection optional.
- First name + email inputs (reusing `useFormValidation`).
- Submit: `Join the Waitlist + Get the Blueprint →`.
- Footer: `No spam. Unsubscribe anytime.`
- Success state in the same modal: `You're on the list ✓ / Check your inbox for the Foundation Blueprint.` Auto-closes after ~4s.

### Wiring (reuses existing infra)
- Submit calls `supabase.functions.invoke("send-guide", { firstName, email, guideTitle: "Courses Waiting List", guideDownloadUrl: getGuideUrl("BDBT Foundation Blueprint") })` — same edge function the page already uses.
- If a course is picked, fires best-effort `supabase.from("course_waitlist").insert({ email, course_title })` in parallel (mirrors `EmailCaptureForm`).
- On success: mark session-storage seen, call `onSubmitted(course)` so the page can pre-select that course in its in-page waitlist form.

### Files
- **New:** `src/components/CoursesIntentModal.tsx` — Radix `Dialog` from `@/components/ui/dialog`. Props: `open`, `onOpenChange`, `onSubmitted(course)`.
- **Edit:** `src/pages/Courses.tsx` — add `useEffect` on mount that opens the modal unless `sessionStorage.getItem("courses_intent_modal_seen")` is set; render `<CoursesIntentModal />`; `onSubmitted` sets the existing `selectedCourse` state so the bottom form mirrors the pick.

### Out of scope
- No new edge function, no new DB table (uses existing `course_waitlist` + `send-guide`).
- No analytics events, no A/B variant.
- No other section of the page touched.
