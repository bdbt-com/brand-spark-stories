

## Add TikTok Thumbnail for Podcast 19

Create a new TikTok template for **Episode 19 - Use Amazon Subscribe and Save** using the background from "Do 1 Minute of Squats Daily".

---

### Current State
- "Do 1 Minute of Squats Daily" (Template 23) uses `tikTokBg22` which is `tiktok-bg-template-22.png`
- The highest template index is currently **36** (Podcast 18)
- New Podcast 19 will be template index **37**

---

### Changes Required

**1. Update TikTokTemplate.tsx**

**a) Expand the templateIndex type (line 33):**
```typescript
templateIndex: 0 | 1 | 2 | ... | 35 | 36 | 37;
```

**b) Add background mapping in backgrounds array (line 38):**
Add `tikTokBg22` (Squats template background) at index 37:
```typescript
const backgrounds = [...existing..., tikTokBg22]; // reuse squats background
```

**c) Add title text for template 37 (after line 597):**
```typescript
) : templateIndex === 37 ? (
  <>
    <span className="text-white/90 block text-2xl tracking-wider">
      BDBT PODCAST 19
    </span>
    <span className="block mt-3 text-white">
      USE AMAZON SUBSCRIBE
    </span>
    <span className="block mt-1" style={{ color: 'hsl(35, 45%, 75%)' }}>
      AND SAVE
    </span>
  </>
)
```

---

**2. Update ThumbnailTemplate.tsx**

**a) Add metadata to tikTokTemplates array (after line 330):**
```typescript
{ id: 37, name: "Podcast 19 Amazon Subscribe", title: "Use Amazon Subscribe and Save", subtitle: "", image: "" }
```

**b) Add rendering block (after line 900):**
```tsx
{/* Template 38 - Podcast 19 Amazon Subscribe and Save */}
{currentTemplateIndex === 37 && mode === 'instagram' && (
  <div className="relative">
    <TikTokTemplate templateIndex={37} />
  </div>
)}
```

---

### Summary

| Item | Value |
|------|-------|
| Template Index | 37 |
| Podcast Number | 19 |
| Title | USE AMAZON SUBSCRIBE / AND SAVE |
| Background | Reuses Squats template background (`tiktok-bg-template-22.png`) |
| Files to modify | `TikTokTemplate.tsx`, `ThumbnailTemplate.tsx` |

