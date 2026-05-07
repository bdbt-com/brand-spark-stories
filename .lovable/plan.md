## Changes to `src/pages/LinkInBio.tsx`

**1. Remove the bigger sizing on the auto-redirect card** (line 470)
- Change className from `` `group ${episode.videoId === 'cfLHVIIp4o0' ? 'md:scale-110 md:z-10' : ''}` `` to just `"group"` so all 6 cards render identically.

**2. Randomise the auto-redirect target (50/50 split)**
Replace the tiered visit-number logic (lines 295–308) with a coin flip:
- 50% chance → `cfLHVIIp4o0` (the current "primary" auto-redirect)
- 50% chance → uniformly pick one of the other 5 episodes (`pdjVnhCUwA8`, `SioUIPf4Sls`, `L6cqky7TLpE`, `D4dzO5rfBfs`, `EhpmrICLRK8`) — 10% each.

Delay stays at the existing first-visit value (4s) — or we keep the visit-tier delay schedule. **Question:** keep the escalating delay (4s → 8s → 8s) based on prior redirects, or always use one delay (e.g. 7s)? I'll default to keeping the existing tiered delay (4s for first idle visit, 8s afterward) since that just controls timing, not destination — only the chosen video becomes random.

The `STORAGE_KEY` / 7-day reset / recent-redirects tracking stays so delay tiering still works.

### Result
- All 6 grid cards are the same size.
- Each idle auto-redirect: 50% chance lands on the "Build a Life…" video, 10% chance each on the other 5.
