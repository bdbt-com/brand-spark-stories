## Homepage Hero Revamp

Update the left side of the hero in `src/pages/Home.tsx`. Keep the existing headline "Small Daily Steps. Big Life Changes." and the carousel on the right exactly as they are.

### Changes

1. **Replace the descriptive paragraph** (currently "Big Daddy's Big Tips teaches simple daily habits…") with the new two-line headline and supporting copy from screenshot 1:
   - Bold emphasised line: "Are your habits building the life you want **or quietly pulling you away from it?**" (first half in white, second half in gold to match the existing headline accent).
   - Subtext below: "Your days are shaped by tiny repeated habits. And whether you realise it or not, your energy, health, finances, confidence and momentum are already compounding, either moving you forward or holding you back."

2. **Replace the single "Start Your Journey Here" button** with two equal-size, side-by-side buttons in the freed-up space:
   - **Start With The Free Foundation Blueprint** → links to `/blueprint`
   - **Browse Courses** → links to `/courses`
   - Both same height (`h-14 md:h-16`), equal width via a 2-column grid, stacking to a single column on mobile.

3. Leave the bottom chevron, hero background, and the rest of the page untouched.

### Out of scope (for later)

- Stats block ("30K+ YouTube Subscribers…"), social icons row, and the closing quote shown in screenshot 1 — those are not in the hero area you flagged; I'll wait for a follow-up before placing them.
