# Update /bio Auto-Redirect Timer Delays

## Goal
Adjust the idle auto-redirect timer on `/bio` so the delays are longer and tiered by visit count.

## Changes

**`src/pages/LinkInBio.tsx`** — Update the delay assignment around line 296:

Current:
```
const delay = visitNumber === 0 ? 4000 : 8000;
```

New:
```
const delay = visitNumber === 0 ? 8000 : 17500;
```

Also update the stale comment block above the effect (lines 268–271) to match the new behaviour.

## Outcome
- First visit: redirects after **8 seconds** of no interaction.
- Second/subsequent visits: redirects after **17.5 seconds** of no interaction.
- 7-day reset logic remains unchanged.