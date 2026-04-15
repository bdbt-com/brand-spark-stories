

## Fix Activity Feed Showing Raw Video IDs Instead of Titles

### Problem
The activity feed on `/admin-list` shows raw YouTube video IDs (e.g. `-3_zj_Q_1kI`) instead of titles because the `VIDEO_MAP` in the **edge function** `get-activity-feed/index.ts` is outdated — it's missing the 4 new videos.

### Changes

**`supabase/functions/get-activity-feed/index.ts`** — Add the 4 new videos to `VIDEO_MAP` (line 9-18):

```ts
const VIDEO_MAP: Record<string, string> = {
  ERXXO8mG5IY: "Why 70% of People Are Dehydrated",
  OjwSKAXveN8: "Dangers of Screen-time Before Bed",
  bv27Bn6qWIo: "Why Most People Invest Completely Wrong",
  vPd9pieng58: "Read For 20 Minutes Every Day",
  cfLHVIIp4o0: "Build a Life You Don't Need to Escape From",
  Irm5oIb5ySo: "Connect with More Animals",
  zz2rVKKt1l0: "Go Exploring",
  "-a4NbW5Y718": "If You Know You're Capable of More",
  "-3_zj_Q_1kI": "Reduce Decision Fatigue Wherever Possible",
  TJTe4wtW158: "Skip for 5 Minutes Daily",
  WNf06ZLUIJw: "Expose Yourself to Sunlight Daily",
  pRRSGS7eLJM: "Capitalise on Benefits Offered by Your Employer",
};
```

Then redeploy the edge function.

### Files
- `supabase/functions/get-activity-feed/index.ts` — add missing video titles to the lookup map

