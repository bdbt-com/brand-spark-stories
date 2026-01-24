

## Redesign Link in Bio Page - Clean, High-Converting Layout

Recreate the page to match the screenshot reference exactly: profile photo, tagline, social icons row, and only 3 focused links with thumbnails.

---

### Design Structure

```text
┌─────────────────────────────────────┐
│                                     │
│     ┌─────────────────────────┐     │
│     │  Profile Photo (circle) │     │
│     │    man-in-car.jpeg      │     │
│     └─────────────────────────┘     │
│                                     │
│        BigDaddysBigTips             │
│                                     │
│   🎵 Small daily steps 💥           │
│      Big life changes               │
│  Replace Daily Drifts with          │
│        Daily Wins                   │
│                                     │
│     [IG] [TT] [YT] [Spotify]        │
│                                     │
├─────────────────────────────────────┤
│  ┌──────┬───────────────────────┐   │
│  │ IMG  │ Free Foundation       │   │
│  │      │ Blueprint             │   │
│  └──────┴───────────────────────┘   │
│                                     │
│  ┌──────┬───────────────────────┐   │
│  │ IMG  │ BDBT Daily Podcast    │   │
│  │      │ (YouTube)             │   │
│  └──────┴───────────────────────┘   │
│                                     │
│  ┌────────────────────────────────┐ │
│  │  BDBT Daily Podcast (Spotify)  │ │
│  └────────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

---

### Key Changes

**1. Profile Section**
- Replace logo with circular profile photo (`man-in-car.jpeg`)
- Clean white text: "BigDaddysBigTips"
- Two-line tagline with emoji:
  - "🎵 Small daily steps 💥 Big life changes"
  - "Replace Daily Drifts with Daily Wins"

**2. Social Icons Row**
- Move social icons to just below the tagline (above links)
- Keep only 4 icons: Instagram, TikTok, YouTube, Spotify
- Remove Facebook (not in screenshot)

**3. Simplified Links (Only 3)**
- **Free Foundation Blueprint** - with thumbnail image, links to `/blueprint`
- **BDBT Daily Podcast (YouTube)** - with thumbnail image (`recording-setup-new.jpg`), links to YouTube
- **BDBT Daily Podcast (Spotify)** - no thumbnail, links to Spotify

**4. Link Card Design**
- Black/dark background cards
- Square thumbnail image on left (for first two)
- White text on right
- Clean, minimal styling for high click-through

---

### Images to Use

| Link | Thumbnail |
|------|-----------|
| Profile | `/lovable-uploads/man-in-car.jpeg` |
| Blueprint | `/lovable-uploads/bdbt-score-thumbnail.png` |
| YouTube Podcast | `/lovable-uploads/recording-setup-new.jpg` |
| Spotify Podcast | No thumbnail (text only) |

---

### Technical Implementation

**File to Modify:** `src/pages/LinkInBio.tsx`

**Changes:**
1. Replace logo with circular profile photo
2. Update handle styling to match brand (white text, clean font)
3. Add two-line tagline with emojis
4. Move social icons row below tagline
5. Remove Facebook from social links
6. Replace 6 links with 3 focused links
7. Add thumbnail images to Blueprint and YouTube links
8. Style cards with dark background, rounded corners
9. Maintain dark gradient background

---

### Summary

| Item | Change |
|------|--------|
| Profile | Circular photo instead of logo |
| Tagline | Two-line format with emojis |
| Social Icons | 4 icons below tagline |
| Links | Reduced from 6 to 3 |
| Link Style | Dark cards with thumbnails |
| Background | Keep dark gradient |

This creates a focused, high-converting link page that reduces decision fatigue and matches the professional Linktree style shown in the reference.

