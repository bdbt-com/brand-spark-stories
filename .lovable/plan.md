## What I verified

- The `/courses` code does contain the requested badge/copy/sticky/form changes.
- The broken part is the interaction: on mobile, clicking `Start Money Wins` starts moving down the page but can stop around the later course cards instead of landing on the waitlist.
- The likely cause is `scrollToWaitlist()` calling `scrollIntoView({ behavior: "smooth" })`, then focusing `#email` after a fixed `600ms`. On mobile, that timed focus can interrupt the smooth scroll before it reaches the form.

## Plan

1. **Make waitlist scrolling deterministic**
   - Replace the current `scrollIntoView` logic in `src/pages/Courses.tsx` with a helper that calculates the exact page position of the waitlist section.
   - Use `window.scrollTo({ top: targetY, behavior: "smooth" })` with offsets for the sticky top nav and bottom sticky bar.
   - Keep this change only on `/courses`.

2. **Focus email only after the scroll has actually landed**
   - Remove the fixed `600ms` focus timer.
   - Add a small retry/check loop that waits until the page is close to the waitlist target before focusing the email field.
   - Keep `preventScroll: true` when focusing so focus does not pull the viewport away.

3. **Preserve chip pre-selection**
   - Keep `setSelectedCourse(topic)` before scrolling.
   - Ensure `Start Money Wins` selects the `Money` chip, and that the chip group remains manually changeable.

4. **Avoid accidental duplicate scroll behaviour**
   - Keep the button `stopPropagation()` so a card button click only runs one scroll action.
   - Leave the mobile sticky button generic: it scrolls to the waitlist without pre-selecting a course.
   - Leave the desktop sticky bar desktop-only and the original mobile sticky button mobile-only.

5. **Verify in the browser after implementation**
   - Mobile `/courses`: click `Start Money Wins`; confirm it lands on the waitlist, `Money` is selected, and the email field is focused.
   - Mobile: confirm only the original bottom `Join the Waitlist` button appears.
   - Desktop: confirm the desktop sticky bar appears and the mobile sticky button does not.
   - Confirm waitlist form still uses the existing `EmailCaptureForm` and still sends the Foundation Blueprint flow unchanged.