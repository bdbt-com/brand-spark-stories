## Plan

Two things to fix — my earlier mistake conflated the carousel clapperboard photo with the Foundation Blueprint cover.

1. **Upload the real Foundation Blueprint cover** (screenshot 2 — "The Ripple Effect / Big Daddy's Foundation Blueprint") to the Lovable CDN via `lovable-assets create --filename foundation-blueprint-cover.png`, writing the pointer to `src/assets/foundation-blueprint-cover.png.asset.json`.

2. **Update `src/pages/Home.tsx` — "Start For Free" section only**:
   - Import the new `foundation-blueprint-cover.png.asset.json` pointer.
   - Change the `<img src={linkBlueprintAsset.url} … />` inside the Start For Free section to use the new blueprint-cover asset URL.
   - Leave the hero carousel untouched — the new HD clapperboard stays where it already is.
   - Leave `linkBlueprintAsset` and its existing usages elsewhere (e.g. hero carousel slot) unchanged.

No other files, sections, or behaviour change.
