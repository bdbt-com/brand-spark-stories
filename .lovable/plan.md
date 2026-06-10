## Change

On `src/pages/Home.tsx`, remove the two-card "Daily Wins / Daily Drifts" section (lines ~229-260) and replace it with a new "Why Life Feels Harder Than It Should" section based on the second screenshot. The "Your Daily Transformation Toolkit" tips section stays where it is and naturally sits below the new section.

## New section content

**Heading (italic, centred):** Why Life Feels Harder Than It Should

**Sub-heading (centred, bold):** Modern life quietly pulls us towards Daily Drifts:

**Chain (centred, italic, one per line, stacked):**
- Too many screens → overstimulated mind
- Overstimulated mind → poor sleep
- Poor sleep → low energy
- Low energy → worse food choices
- Worse food → less movement
- Low movement → lower confidence
- Low confidence → more stress
- More stress → emotional spending
- Emotional spending → financial pressure

**Closing paragraphs (centred):**
- Most people think they have separate problems. In reality, they have a system problem.
- The good news? A system of Daily Drifts can be replaced with a system of Daily Wins.
- This is not another all-or-nothing New Year's resolution. It is a system you build gradually, layering small Daily Wins that quietly reshape your habits, identity, and ultimately, your future.

## Styling

- Wrap in a `<section>` matching the existing rhythm (`pt-10 lg:pt-12 pb-24`, container `max-w-3xl mx-auto px-4`).
- Title gold (`text-primary`), italic, ~`text-3xl md:text-4xl`, centred.
- Sub-heading white/foreground, bold, centred.
- Chain lines italic, white, tight `space-y-2`, centred. Use the `→` character (British English already applied — "behaviour"/"emphasise" not relevant here).
- Closing paragraphs white, `space-y-4`, max-width prose, centred.
- Remove the now-unused `Trophy` and `AlertTriangle` imports if nothing else uses them on the page.

## Out of scope

- The "Browse Courses" CTA above stays untouched.
- The "Your Daily Transformation Toolkit" tips section stays exactly as-is, just shifted down by the new section's height.
- No other pages, no schema, no edge functions.
