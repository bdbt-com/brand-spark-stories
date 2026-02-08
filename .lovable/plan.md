
## New TikTok Thumbnail - Podcast 35

Adding a new TikTok thumbnail for Podcast 35 with the title "Try Natural Anxiety Fixes".

---

### Overview

| Property | Value |
|----------|-------|
| Template Index | 53 |
| Podcast Number | 35 |
| Title | TRY NATURAL ANXIETY FIXES |
| Background | tikTokBg28 (tiktok-bg-template-32.png) |

The background follows the established alternating pattern where odd-indexed templates (51, 53, etc.) use tikTokBg28.

---

### Changes Required

#### 1. TikTokTemplate.tsx - Type Definition (line 33)

Update the `templateIndex` type to include 53:

```text
From: 0 | 1 | ... | 52
To:   0 | 1 | ... | 52 | 53
```

#### 2. TikTokTemplate.tsx - Backgrounds Array (line 38)

Add tikTokBg28 for template 53:

```text
Add at end of array: tikTokBg28
```

#### 3. TikTokTemplate.tsx - JSX Title Block (after line 789)

Add the title rendering for template 53:

```tsx
) : templateIndex === 53 ? (
  <>
    <span className="text-white/90 block text-2xl tracking-wider">
      BDBT PODCAST 35
    </span>
    <span className="block mt-3 text-white">
      TRY NATURAL
    </span>
    <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
      ANXIETY FIXES
    </span>
  </>
```

#### 4. ThumbnailTemplate.tsx - tikTokTemplates Array (after line 367)

Add metadata entry:

```tsx
{ id: 53, name: "Podcast 35 Natural Anxiety Fixes", title: "Try Natural Anxiety Fixes", subtitle: "", image: "" }
```

---

### Files to Modify

| File | Changes |
|------|---------|
| `src/components/TikTokTemplate.tsx` | Add type, background, and JSX title block |
| `src/pages/ThumbnailTemplate.tsx` | Add tikTokTemplates metadata entry |

---

### Style Details

- Title line 1: "TRY NATURAL" (white)
- Title line 2: "ANXIETY FIXES" (brand gold - hsl(35, 45%, 75%))
- Standard podcast thumbnail layout with top-[55%] positioning
- BDBT Podcast 35 subtitle
