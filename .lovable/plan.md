

## Update AdminList Video Maps & Ensure Mobile Compatibility

### What's changing

**`src/pages/AdminList.tsx`** — Update the video tracking maps to reflect the current rotation:

**Current `VIDEO_MAP`** (active videos being tracked):
```ts
const VIDEO_MAP: Record<string, string> = {
  cfLHVIIp4o0: "Build a Life You Don't Need to Escape From",
  "-3_zj_Q_1kI": "Reduce Decision Fatigue Wherever Possible",
  TJTe4wtW158: "Skip for 5 Minutes Daily",
  WNf06ZLUIJw: "Expose Yourself to Sunlight Daily",
  pRRSGS7eLJM: "Capitalise on Benefits Offered by Your Employer",
  OjwSKAXveN8: "Dangers of Screen-time Before Bed",
};
```

**Updated `PREVIOUS_VIDEO_MAP`** (retired videos — add the 4 removed ones):
```ts
const PREVIOUS_VIDEO_MAP: Record<string, string> = {
  zz2rVKKt1l0: "Go Exploring",
  "-a4NbW5Y718": "If You Know You're Capable of More",
  ERXXO8mG5IY: "Why 70% of People Are Dehydrated",
  bv27Bn6qWIo: "Why Most People Invest Completely Wrong",
  vPd9pieng58: "Read For 20 Minutes Every Day",
  Irm5oIb5ySo: "Connect with More Animals",
};
```

**Mobile compatibility check** — I'll review the Home and LinkInBio pages for any layout issues at mobile breakpoints and fix if needed (both pages already use responsive classes, but I'll verify the video cards/carousel render properly).

### Files
- `src/pages/AdminList.tsx` — Update `VIDEO_MAP` and `PREVIOUS_VIDEO_MAP`
- `src/pages/Home.tsx` — Verify mobile layout (fix if needed)
- `src/pages/LinkInBio.tsx` — Verify mobile layout (fix if needed)

