
## Add Podcast 29 Thumbnail Template - Check Your Posture in The Mirror

This plan adds a new TikTok thumbnail template for **Podcast 29: Check Your Posture in The Mirror**, reusing the "Always Take The Stairs" background image (`tiktok-bg-template-33.png`).

---

### Overview

| Property | Value |
|----------|-------|
| Template Index | 38 |
| Podcast Number | 29 |
| Title | "Check Your Posture in The Mirror" |
| Background | `tiktok-bg-template-33.png` (same as Podcast 16 - Stairs) |

---

### Changes Required

#### 1. TikTokTemplate.tsx - Type Definition (Line 33)

Add `| 38` to the union type:

```tsx
// Current
templateIndex: 0 | 1 | ... | 37;

// Updated
templateIndex: 0 | 1 | ... | 37 | 38;
```

---

#### 2. TikTokTemplate.tsx - Backgrounds Array (Line 38)

Add the stairs background (`tikTokBg29`) to position 38:

```tsx
// Current ends with:
..., tikTokBg22];

// Updated ends with:
..., tikTokBg22, tikTokBg29];
```

---

#### 3. TikTokTemplate.tsx - JSX Title Block (After Line 609)

Add the rendering block for template index 38:

```tsx
) : templateIndex === 38 ? (
  <>
    <span className="text-white/90 block text-2xl tracking-wider">
      BDBT PODCAST 29
    </span>
    <span className="block mt-3 text-white">
      CHECK YOUR POSTURE
    </span>
    <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
      IN THE MIRROR
    </span>
  </>
```

---

#### 4. ThumbnailTemplate.tsx - tikTokTemplates Array (After Line 331)

Add metadata for the new template:

```tsx
{ id: 38, name: "Podcast 29 Check Your Posture", title: "Check Your Posture in The Mirror", subtitle: "", image: "" }
```

---

### Files to Modify

| File | Changes |
|------|---------|
| `src/components/TikTokTemplate.tsx` | Type definition, backgrounds array, JSX title block |
| `src/pages/ThumbnailTemplate.tsx` | Add template metadata to `tikTokTemplates` array |
