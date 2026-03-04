

## Fix Mobile Compatibility for Public-Facing Pages

The public pages (Home, Blueprint) receive ad traffic that is predominantly mobile. The video sections and layout need to work well on small screens without changing the desktop experience.

### Issues Found

1. **Home.tsx (line 218)**: Featured video uses `scale-110` unconditionally -- causes overflow on mobile single-column layout. Blueprint already correctly uses `md:scale-110 md:z-10`.

2. **Home.tsx video section**: The play button and video card layout works structurally (responsive grid), but the featured scaling needs to be desktop-only.

3. **AdminList.tsx**: The subscriber table grid `grid-cols-[1fr_2fr_auto]` and tips grid can clip text on mobile. Not critical (admin only), but easy to fix with overflow handling and responsive adjustments.

### Changes

**`src/pages/Home.tsx`** (line 218)
- Change `scale-110 z-10` to `md:scale-110 md:z-10` so the featured video only scales up on desktop, matching Blueprint's approach

**`src/pages/AdminList.tsx`** -- Mobile-friendly admin layout:
- Video cards grid: already `grid-cols-1 md:grid-cols-3` (fine)
- Subscriber table: Add `overflow-x-auto` wrapper and reduce column padding on mobile
- Tips table: Same overflow treatment
- Add smaller text sizing on mobile for table rows

### No desktop changes
All fixes use `md:` breakpoint prefixes or wrapper-level overflow handling, so desktop rendering remains identical.

