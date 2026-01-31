
## Add Podcast 26 Thumbnail Template - Use Energy Efficient Devices At Home

This plan adds a new TikTok thumbnail template for **Podcast 26**, using `tikTokBg25` (tiktok-bg-template-28.png) as the background to maintain variety from recent templates.

---

### Overview

| Property | Value |
|----------|-------|
| Template Index | 44 |
| Podcast Number | 26 |
| Title | "Use Energy Efficient Devices At Home" |
| Background | `tikTokBg25` (tiktok-bg-template-28.png) - different from last 4 templates |

---

### Changes Required

#### 1. TikTokTemplate.tsx - Type Definition (Line 33)

Add `| 44` to the union type:

```tsx
templateIndex: 0 | 1 | ... | 43 | 44;
```

---

#### 2. TikTokTemplate.tsx - Backgrounds Array (Line 38)

Add `tikTokBg25` to position 44:

```tsx
// Current ends with:
..., tikTokBg24, tikTokBg28];

// Updated ends with:
..., tikTokBg24, tikTokBg28, tikTokBg25];
```

---

#### 3. TikTokTemplate.tsx - JSX Title Block

Add the rendering block for template index 44 after template 43 (around line 681):

```tsx
) : templateIndex === 44 ? (
  <>
    <span className="text-white/90 block text-2xl tracking-wider">
      BDBT PODCAST 26
    </span>
    <span className="block mt-3 text-white">
      USE ENERGY EFFICIENT DEVICES
    </span>
    <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
      AT HOME
    </span>
  </>
) : null
```

---

#### 4. ThumbnailTemplate.tsx - tikTokTemplates Array (Line 337)

Add metadata for the new template:

```tsx
{ id: 44, name: "Podcast 26 Energy Efficient", title: "Use Energy Efficient Devices At Home", subtitle: "", image: "" }
```

---

#### 5. ThumbnailTemplate.tsx - Rendering Block

Add the display block for template 44 after the template 43 block:

```tsx
{/* Template 45 - Podcast 26 Energy Efficient */}
{currentTemplateIndex === 44 && mode === 'instagram' && (
  <div className="relative">
    <TikTokTemplate templateIndex={44} />
  </div>
)}
```

---

### Files to Modify

| File | Changes |
|------|---------|
| `src/components/TikTokTemplate.tsx` | Type definition, backgrounds array, JSX title block |
| `src/pages/ThumbnailTemplate.tsx` | Add template metadata + rendering block |

---

### Background Selection Rationale

Recent templates used:
- Template 43: `tikTokBg28` (tiktok-bg-template-32.png)
- Template 42: `tikTokBg24` (tiktok-bg-template-25.png)
- Template 41: `tikTokBg29` (tiktok-bg-template-33.png)
- Template 40: `tikTokBg22` (tiktok-bg-template-23.png)

Selected: `tikTokBg25` (tiktok-bg-template-28.png) - provides good variety
