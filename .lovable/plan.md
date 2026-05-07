## Problem

The `/bio` grid shows "The Dangers of Screen-time Before Bed" (`OjwSKAXveN8`), but the **first** auto-redirect target in the visit sequence — per the code comments and `AdminList` mapping — is supposed to be **"Build a Life You Don't Need to Escape From"** (`cfLHVIIp4o0`). That video is missing from the grid entirely, which is the mismatch you're seeing.

(The current code starts the sequence with `OjwSKAXveN8`, which contradicts its own comments. We'll fix that too so the auto-redirect target and the grid stay in sync.)

## Changes

### 1. `src/pages/LinkInBio.tsx`
- Replace `OjwSKAXveN8` entry in `INITIAL_EPISODES` with:
  - `cfLHVIIp4o0` — "Build a Life You Don't Need to Escape From" — `3.2K views` (matches Blueprint)
- Update `REDIRECT_SEQUENCE` (lines 275–282) so the first slot is `cfLHVIIp4o0` (matching the comment), with `OjwSKAXveN8` removed from the cycle. New order:
  ```
  cfLHVIIp4o0,  // visit 1
  pdjVnhCUwA8,  // visit 2
  SioUIPf4Sls,  // visit 3+
  L6cqky7TLpE,
  D4dzO5rfBfs,
  EhpmrICLRK8,
  ```
- Update the `md:scale-110 md:z-10` featured-card check on line 470 from `OjwSKAXveN8` → `cfLHVIIp4o0` so the auto-redirect video gets the highlighted middle spot.

### 2. `src/pages/Home.tsx`
- Top 3 by views become:
  - `cfLHVIIp4o0` (3.2K, **featured/middle**) — Build a Life You Don't Need to Escape From
  - `D4dzO5rfBfs` (2.1K) — left
  - `EhpmrICLRK8` (1.8K) — right

### 3. `src/pages/AdminList.tsx`
- No change needed — `cfLHVIIp4o0` is already in the title map.

### Result
- 6 grid videos on `/bio` = the 5 podcast episodes + the auto-redirect video (`cfLHVIIp4o0`).
- Home shows the top 3 of those 6 by view count.
- Auto-redirect first hit lands on the highlighted card the user sees on `/bio`.
