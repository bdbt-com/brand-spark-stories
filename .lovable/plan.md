

## Why the Bio Referrer Cards Show 0

The tracking system works by reading a `?ref=` query parameter from the URL. Currently, **all 30 /bio visits have no referrer** — they're all `null`, meaning the links shared on your social media profiles don't include the `?ref=` parameter.

### The Fix (No Code Change Needed)

Update the URLs in your social media bios to include the tracking parameter:

- **Instagram bio**: `https://bdbt.lovable.app/bio?ref=instagram`
- **TikTok bio**: `https://bdbt.lovable.app/bio?ref=tiktok`
- **YouTube about/description**: `https://bdbt.lovable.app/bio?ref=youtube`

Right now you're probably using `https://bdbt.lovable.app/bio` everywhere, so the system can't tell which platform the visitor came from.

### Code Change: Show "Direct" count too

In `src/pages/AdminList.tsx`, add a 4th card for "Direct" visits (those without a `?ref=` param) so the 30 existing visits aren't invisible:

- Add `{ label: "Direct", value: bioReferrers.direct || 0 }` to the Bio Link Clicks cards array
- Change grid from `grid-cols-3` to `grid-cols-4` (or `grid-cols-2 md:grid-cols-4`)

### Files Changed
- `src/pages/AdminList.tsx` — add Direct card, adjust grid columns

