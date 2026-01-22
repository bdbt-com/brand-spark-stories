

## Add TikTok Thumbnail for Podcast 18

Create a new TikTok template for **Podcast 18 - Replace one Sugary Snack, with a Healthier Alternative** using the background from Podcast 16.

---

### Current State
- Podcast 16 (Template 34) uses `tikTokBg29` which is `tiktok-bg-template-33.png`
- The highest template index is currently **35** (Podcast 17)
- New Podcast 18 will be template index **36**

---

### Changes Required

**1. Update TikTokTemplate.tsx**

**a) Expand the templateIndex type (line 33):**
```typescript
templateIndex: 0 | 1 | 2 | ... | 35 | 36;
```

**b) Add background mapping in backgrounds array (line 38):**
Add `tikTokBg29` (Podcast 16's background) at index 36:
```typescript
const backgrounds = [...existing..., tikTokBg29]; // reuse Podcast 16 background
```

**c) Add title text for template 36 (after line 585):**
```typescript
) : templateIndex === 36 ? (
  <>
    <span className="text-white/90 block text-2xl tracking-wider">
      BDBT PODCAST 18
    </span>
    <span className="block mt-3 text-white">
      REPLACE ONE SUGARY SNACK
    </span>
    <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
      WITH A HEALTHIER ALTERNATIVE
    </span>
  </>
)
```

---

**2. Update ThumbnailTemplate.tsx**

Add to `tikTokTemplates` array (after line 329):
```typescript
{ id: 36, name: "Podcast 18 Sugary Snack", title: "Replace one Sugary Snack, with a Healthier Alternative", subtitle: "", image: "" }
```

---

### Summary

| Item | Value |
|------|-------|
| Template Index | 36 |
| Podcast Number | 18 |
| Title | REPLACE ONE SUGARY SNACK / WITH A HEALTHIER ALTERNATIVE |
| Background | Reuses Podcast 16 background (`tiktok-bg-template-33.png`) |
| Files to modify | `TikTokTemplate.tsx`, `ThumbnailTemplate.tsx` |

