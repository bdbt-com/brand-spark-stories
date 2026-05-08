# Fix cookie banner blocking content on /bio (mobile)

## Cause

The "privacy & cookies" popup isn't from our app code — there is no cookie banner component in the project. It's coming from the **Google AdSense script** in `index.html` (line 30-31, `adsbygoogle.js`), which auto-injects an EU/UK consent banner pinned to the bottom of the screen. On mobile this overlay sits on top of the text under the video on `/bio`.

We can't reposition Google's banner (it's rendered inside their own iframe), so the options are either remove it or push our content above it.

## Options

**Option A — Remove the AdSense script entirely (recommended if you're not actively running ads)**
- Delete the `adsbygoogle.js` `<script>` tag from `index.html`.
- The cookie banner disappears everywhere on the site.
- Downside: no AdSense ads will load. Google Ads (AW- gtag) tracking is unaffected.

**Option B — Keep AdSense, add bottom spacing on `/bio` so nothing is hidden behind the banner**
- Add `pb-32` (or similar) to the bottom of the `/bio` page content in `src/pages/LinkInBio.tsx` so the text under each video clears the banner on mobile.
- Banner still shows, but no longer covers content.

**Option C — Keep AdSense but hide its consent UI via CSS**
- Not recommended: violates Google's policies and may get the AdSense account flagged.

## Recommendation

Go with **Option A** unless you're actively monetising with AdSense. It's a one-line removal and cleans up the experience site-wide, not just on `/bio`.

Let me know which option you want and I'll implement it.
