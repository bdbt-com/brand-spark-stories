## The real problem

Two separate things are happening:

### 1. View counts + titles are blank — YouTube API key is invalid

The runtime error from the `/bio` page says:
```
Edge function returned 400: {"error":"API key not valid. Please pass a valid API key."}
```

The `YOUTUBE_API_KEY` secret exists in Supabase, but Google is rejecting it. This is why:
- No titles appear under any card on `/bio` or homepage
- No view counts appear anywhere
- The cards just show blank labels

The fix is **not in code** — the key itself needs to be replaced. Likely causes:
- The key was rotated / deleted in Google Cloud Console
- "YouTube Data API v3" is not enabled for that Google Cloud project
- The key has HTTP-referrer restrictions that block calls from the Supabase edge function

### 2. "Dangers of Screen-time" appearing IS the current intended behaviour

Last round you said *"leave the current episode that autoredirects please"*. The auto-redirect video is `OjwSKAXveN8` = **"The Dangers of Screen-time Before Bed"**. So it stayed in the `/bio` carousel by design. The other 5 episodes (`pdjVnhCUwA8`, `SioUIPf4Sls`, `L6cqky7TLpE`, `D4dzO5rfBfs`, `EhpmrICLRK8`) — the ones from your YouTube links — *are* in there now.

So the cards on `/bio` right now are: Screen-time + your 5 new videos = 6 total. That matches what you asked for.

## What I'll do

**Step A — Get a working YouTube API key (you need to do this part)**

1. Go to https://console.cloud.google.com/apis/credentials
2. Either create a new API key or check the existing one
3. Make sure **YouTube Data API v3** is enabled for the project
4. Either remove HTTP-referrer restrictions, or switch the key to "None" / "IP addresses" (Supabase edge functions don't send a referrer)
5. Paste the new key into the `YOUTUBE_API_KEY` secret in Lovable Cloud

Once you do that, titles and view counts will appear within seconds on both `/bio` and the homepage — no code change needed. The fetching logic is already wired up correctly.

**Step B — Confirm what to do with Screen-time**

Pick one:
- **Keep it** as the auto-redirect (current behaviour) — nothing changes
- **Replace it** — tell me which of the 5 new videos should become the auto-redirect, and I'll swap `OjwSKAXveN8` out of `INITIAL_EPISODES`, `REDIRECT_SEQUENCE`, `ALL_EPISODE_IDS` (homepage), and the edge function `DEFAULT_IDS`

**Step C — Make blank states less confusing while the key is broken**

Small code improvement so this doesn't look like a silent failure again: when titles/views can't be fetched, log the edge function error to the browser console (currently it's swallowed by `.catch(() => {})`). That way next time the key breaks, the cause is obvious from console logs instead of looking like the videos weren't updated.

## Files touched (Step C only — Steps A & B need your input)

- `src/pages/LinkInBio.tsx` — surface fetch error to console instead of silently swallowing
- `src/pages/Home.tsx` — same
