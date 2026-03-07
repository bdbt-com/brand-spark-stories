

## Fix Activity Feed Display

### Problems
1. **Edge function not redeployed** — The old entries in the DB still use legacy `"auto-redirect"` format (no video ID), so they show "Auto-redirect / Idle redirect from /bio". New entries with the composite format (`auto-redirect:VIDEO_ID`) will work correctly once the function is deployed. The edge function code itself is already correct.
2. **Layout swap needed** — Currently: label (video title) is primary, detail (event type) is secondary. User wants it flipped: event type ("Video click" or "Auto-redirect") should be the bigger primary text, video title below it as secondary.

### Changes

**1. `supabase/functions/get-activity-feed/index.ts`** — Needs redeployment (code is already correct). No code changes needed.

**2. `src/pages/AdminList.tsx`** — Swap label/detail in feed items:
- Primary line (larger, `text-xs font-medium`): Show the event type — `item.detail` (e.g., "Video click", "Auto-redirect")
- Secondary line (smaller, `text-[10px]`): Show `item.label` (e.g., video title, subscriber name)

This means in the feed render section (~lines 396-398), swap:
```tsx
// Before
<p className="text-xs font-medium ...">{item.label}</p>
<p className="text-[10px] ...">{item.detail}</p>

// After  
<p className="text-xs font-medium ...">{item.detail}</p>
<p className="text-[10px] ...">{item.label}</p>
```

**3. Deploy the edge function** — Trigger redeployment of `get-activity-feed` so the composite format parsing is live. Existing legacy entries will still show "Auto-redirect" without a video name (since that data wasn't recorded), but all new entries will show the correct video title.

