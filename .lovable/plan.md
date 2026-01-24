

## Fix Link in Bio Thumbnail Images

Update the Link in Bio page to use the correct images from the homepage carousel as specified.

---

### Image Mapping

Based on your screenshots and the homepage carousel:

| Link | Current Image | Correct Image |
|------|--------------|---------------|
| Free Foundation Blueprint | `bdbt-score-thumbnail.png` | `bc6fa209-b818-463e-aeb6-08d6c7b423c6.png` (Carousel image 1 - sunset silhouette) |
| BDBT Daily Podcast (YouTube) | `recording-setup-new.jpg` | `recording-setup-new.jpg` (Man on sofa with green wall - already correct!) |
| BDBT Daily Podcast (Spotify) | No thumbnail | `75853635-930c-4fa5-9403-d0b58c6db83b.png` (Man meditating in gazebo) |

---

### Changes Required

**File to Modify:** `src/pages/LinkInBio.tsx`

**Update the links array (lines 42-63):**

```tsx
const links = [
  {
    title: "Free Foundation Blueprint",
    href: "/blueprint",
    external: false,
    thumbnail: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png", // Carousel image 1 - sunset silhouette
  },
  {
    title: "BDBT Daily Podcast",
    subtitle: "(YouTube)",
    href: "https://www.youtube.com/@BigDaddysBigTips",
    external: true,
    thumbnail: "/lovable-uploads/recording-setup-new.jpg", // Man on sofa with green wall (already correct)
  },
  {
    title: "BDBT Daily Podcast",
    subtitle: "(Spotify)",
    href: "https://open.spotify.com/show/4PO4P4X6dF3FJasqf3dR5L",
    external: true,
    thumbnail: "/lovable-uploads/75853635-930c-4fa5-9403-d0b58c6db83b.png", // Man meditating in gazebo
  },
];
```

---

### Summary

| Item | Change |
|------|--------|
| Blueprint thumbnail | Changed from `bdbt-score-thumbnail.png` to carousel image 1 (sunset silhouette) |
| YouTube thumbnail | No change needed - already using correct image (man on sofa) |
| Spotify thumbnail | Added gazebo meditation image (was previously no thumbnail) |

