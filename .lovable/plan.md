## Goal
1. Rewrite all four course cards on `/courses` to match the original document copy (screenshot 2).
2. Make the **First Name** field on the "Reserve your spot" waitlist form optional — email stays the only required field.

## 1. Course card copy (src/pages/Courses.tsx)
Replace the `courses` array with the original document text:

| Topic | Title | Hook | Bullets | CTA |
|---|---|---|---|---|
| Exercise | **Daily Wins For Exercise** | Build a workout into your day, without needing a gym, personal trainer or any extra time. | Consistency over intensity • Simple exercise habits • More energy & confidence • No overwhelm | Start Exercise Wins |
| Money | **Daily Wins For Money** | Stop money leaks and reduce financial stress without budgets or complicated spreadsheets. | Spending awareness • Habit-based saving • Systems over budgeting • Small wins that compound | Start Money Wins |
| Nutrition | **Daily Wins For Nutrition** | Eat better without extreme dieting. | Craving control • Better food defaults (keep your guilty pleasures!) • Energy & mood improvement • Sustainable habits | Start Nutritional Wins |
| Sleep | **Daily Wins For Sleep** | Fix the habit that quietly affects everything else. | Better recovery & confidence • Lower stress/anxiety • More discipline & motivation • Energy ripple effects | Start Sleep Wins |

- Add a `cta` field to the `Course` interface so each card uses its own button label (Start Exercise Wins / Start Money Wins / Start Nutritional Wins / Start Sleep Wins) instead of the generic "Join the Waitlist".
- Keep the existing COMING SOON badge — the "(Locked – Coming Soon – Join Waiting List)" line from the doc is already represented by the badge + the button action that scrolls to the waitlist, so no extra duplicate row is added.
- No layout, colour, icon, or spacing changes.

## 2. First Name optional on Reserve-your-spot form (src/components/EmailCaptureForm.tsx)
- Change the label from `First Name *` to `First Name <span className="text-muted-foreground font-normal">(optional)</span>`.
- Remove the firstName check from submission validation: call `validateAllFields("Friend", email)` and pass `firstName: firstName || "Friend"` into the `send-guide` invoke body, mirroring what we already do in `CoursesIntentModal`.
- Stop running `validateField("firstName", …)` on blur/change so an empty first name never paints the input red or shows "First name is required".
- Email remains required and keeps full validation.
- No other forms or pages touched — change is local to `EmailCaptureForm.tsx` and applies everywhere the component is used (Blueprint, Courses waitlist, etc., which is the desired behaviour: email-only is faster and converts better on mobile).

## Out of scope
- No changes to the intent modal, the database, the edge function, styling, or any other page.
