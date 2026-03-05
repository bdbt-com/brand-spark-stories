

## Plan: Fix pulse animation, shrink cards, rename section

Three issues to fix:

### 1. Fix pulse animation (`src/index.css`)
The current `scale(1.04)` at 2.5s is too fast/aggressive. Change to a much gentler animation:
- `scale(1) → scale(1.02) → scale(1)` over **4s** — slow, breathing motion, not vibrating

### 2. Shrink video cards (`src/pages/LinkInBio.tsx`)
The user wants each card width to be roughly the width of the "Picked For You" header text plus ~50% padding on each side. Currently `min-w-[45%]` is still too big.
- Change to `min-w-[38%]` so cards are noticeably smaller and the full center card (thumbnail + title) is visible on the opening screen
- Reduce padding in the card text area (`p-4` → `p-2`) to keep things compact

### 3. Rename section header (`src/pages/LinkInBio.tsx`)
- Change "🎙 Top Episodes" to "Picked For You"

### Files Changed
- `src/index.css` — slow down and soften the pulse keyframes  
- `src/pages/LinkInBio.tsx` — shrink cards, rename header text

