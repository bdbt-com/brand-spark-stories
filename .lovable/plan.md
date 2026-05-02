## Redirect YouTube Button to Playlists Page

### Change
Update the `BDBT Daily Podcast (YouTube)` link button on `/bio` to point to the channel's playlists page instead of the channel home.

**`src/pages/LinkInBio.tsx`** (line 66):
```ts
href: "https://www.youtube.com/@bigdaddysbigtips/playlists",
```

The YouTube social icon (line 37) stays pointing at the main channel — only the labelled podcast button changes. Tracking via `startTrackedRedirect` is unchanged; the bridge will forward to the new URL.

Note: the redirect bridge currently appends `/watch?v=<id>` style URLs only for video IDs. Since this is a full external URL passed through the link button (not a videoId), confirm the click handler routes external `href` directly. If it goes through the redirect bridge with a videoId param, we'd need to special-case it. Will verify on implementation and adjust if needed.

### Files
- `src/pages/LinkInBio.tsx` — single href change