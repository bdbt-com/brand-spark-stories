# /courses Page Update Plan

All changes are scoped to `src/pages/Courses.tsx` (plus a tiny addition to `EmailCaptureForm.tsx` for analytics on submit). No new components are created; existing card, badge, form, chip, and sticky button are reused.

## A. Badge text — "COMING SOON · £10"

In `Courses.tsx`, update the inline `StatusPill` component's coming-soon branch:
- Change the label text from `Coming Soon` to `Coming Soon · £10`.
- Keep the `Lock` icon, padding, colours, border, uppercase tracking and size unchanged.

(The pill is local to this file, so the single edit covers all four cards.)

## B. Waitlist section copy

In the waitlist `<Card>`:
- Replace the existing `<p>` subheading with: `Daily Wins courses drop this summer — £10 each, 10 modules of exclusive videos. Join the waitlist for first access before public release, plus the free Foundation Blueprint instantly.`
- Directly below it (still above `EmailCaptureForm`), add a second line using the same muted text style: `Waitlist members get 48-hour early access before doors open to everyone.`
- Keep the `Join the Courses Waiting List` headline, all form fields, chips and submit button untouched.

## C. Desktop/tablet sticky bar

Add a new fixed bar at the bottom of the page, rendered only at `md:` and above (`hidden md:flex`). The existing mobile sticky button stays exactly as it is and remains the only sticky element on mobile.

- Single-line content: `Courses drop this summer · £10 each — Join the waitlist →`
- Styling: dark background (`bg-[#0A0A0A]/95 backdrop-blur-md`), gold accent text (`text-primary`), `h-[52px]`, full width, `border-t border-primary/30`, no animation, no dismiss.
- Acts as a button: clicking anywhere smooth-scrolls to the existing `waitlistRef` section (reuses `scrollToWaitlist()` with no topic, so no chip change from the bar).
- Add `md:pb-[52px]` to the page container so footer/content isn't covered. Mobile keeps its existing `pb-28`.

## D. Course button rewire

The four "Start … Wins" buttons keep their exact labels and styling. Behaviour change in `Courses.tsx`:

- Extend `scrollToWaitlist(topic?)` so when a `topic` is passed it:
  1. Sets `selectedCourse` to the matching chip value (mapping: Exercise→Exercise, Money→Money, Nutrition→Nutrition, Sleep→Sleep — the card `topic` already matches chip labels, including `Nutrition` for the "Start Nutritional Wins" button).
  2. Smooth-scrolls to `waitlistRef`.
  3. After the scroll, focuses the Email Address input (`document.getElementById('email')?.focus({ preventScroll: true })`) via a short `setTimeout` so it runs after the scroll lands.
- Last click wins because the same setter is reused; the user can still click any chip to override (existing chip onClick already calls `onCourseChange`).
- The card-level click handler keeps the same behaviour (passes the topic). The mobile sticky button continues to call `scrollToWaitlist()` with no topic, so no chip is pre-selected and no input is focused — its current generic behaviour is preserved.

## E. Analytics

Reuse the existing `trackClick(...)` helper already used elsewhere on the site (same import pattern as `Podcast.tsx`). In `Courses.tsx`:

- Each "Start X Wins" button click → `trackClick("courses-card-" + topic.toLowerCase())` before scrolling.
- Desktop sticky bar click → `trackClick("courses-sticky-desktop")`.
- Mobile sticky button → leave as is (out of scope).

In `EmailCaptureForm.tsx`, on successful submit fire a single tracking event including the selected chip (or `none`) — `trackClick("waitlist-submit-" + (courseValue || "none"))`. This is the only edit outside `Courses.tsx`, and it does not change the form's UI, fields, or submission flow.

## Acceptance check mapping

1. Badge edit in `StatusPill` covers all four cards.
2. Both new copy lines render inside the existing waitlist card.
3. Desktop bar uses `hidden md:flex`; mobile sticky is unchanged → no stacking.
4. "Start Money Wins" → `scrollToWaitlist("Money")` sets chip, scrolls, focuses `#email`; chip remains user-editable.
5. `EmailCaptureForm` keeps its existing `send-guide` invoke and Foundation Blueprint delivery; no new form/chip/sticky components are added.
