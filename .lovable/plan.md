

# Swap 2 Videos Across Site + Add Previous Choices Button to Admin

## Overview
Replace two of the six featured videos everywhere they appear, update the auto-redirect sequence, and add a small "Previous" toggle button on the admin video cards so old video stats remain visible but separate.

## Video Swaps

| Old Video | New Video |
|-----------|-----------|
| `-a4NbW5Y718` "If You Know You're Capable of More" | `cfLHVIIp4o0` "Build a Life You Don't Need to Escape From" |
| `zz2rVKKt1l0` "Go Exploring" | `vPd9pieng58` "Read For 20 Minutes Every Day" |

## Files Changed

### 1. `src/pages/LinkInBio.tsx`
- Update `CAROUSEL_VIDEOS` array: swap `zz2rVKKt1l0` → `vPd9pieng58` and `-a4NbW5Y718` → `cfLHVIIp4o0` with new titles/views
- Update `REDIRECT_SEQUENCE`: 1st visit now redirects to `cfLHVIIp4o0` instead of `-a4NbW5Y718`; replace `zz2rVKKt1l0` with `vPd9pieng58` in the cycle list

### 2. `src/pages/AdminList.tsx`
- Update `VIDEO_MAP` to include the 2 new video IDs with their titles
- Keep old video IDs in a separate `PREVIOUS_VIDEO_MAP` so their stats are still fetched and displayable
- Add a small toggle button (e.g. "Previous" / "Current") at the top-right of the Video Clicks section header that switches between showing the current 6 videos and the retired ones
- Old video cards show with a muted/greyed style to distinguish them

### 3. `supabase/functions/get-activity-feed/index.ts`
- Add the 2 new video IDs to the `VIDEO_NAMES` map so activity feed shows correct names
- Keep old IDs in the map too (they may still appear in historical data)

### 4. `src/pages/Home.tsx`
- No change needed — Home only features Dehydrated, Screen-time, and Invest (none being swapped)

### 5. `src/pages/Blueprint.tsx`
- No change needed — Blueprint only features Screen-time, Dehydrated, and Invest (none being swapped)

