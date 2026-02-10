

## New YouTube Thumbnail - Podcast 37

Adding a YouTube thumbnail for Podcast 37 with the title "Sit and Stand Without Using Your Arms".

---

### Overview

| Property | Value |
|----------|-------|
| YouTube Template Index | 41 |
| Podcast Number | 37 |
| Title | Sit and Stand Without Using Your Arms |
| Subtitle | Daily Wins Podcast 37 |

This follows the established pattern of YouTube thumbnails (16:9, 1280x720) with gradient background, right-side image box with glassmorphism, and BDBT logo.

---

### Changes Required

#### 1. ThumbnailTemplate.tsx - YouTube `templates` Array (after line 311)

Add a new entry at id 41:

```tsx
{
  id: 41,
  name: "Sit Stand Without Arms",
  title: "Sit and Stand Without Using Your Arms",
  subtitle: "Daily Wins Podcast 37",
  image: "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png"
}
```

#### 2. ThumbnailTemplate.tsx - YouTube Rendering Block (after line 2580)

Add the rendering conditional for template 41, following the same layout as templates 38-40:

```tsx
{currentTemplateIndex === 41 && mode === 'youtube' && (
  <div className="relative">
    <div id="thumbnail-41" key="template-41" className="w-[1280px] h-[720px] relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-2xl animate-fade-in border-2 border-white">
      <div className="h-full flex items-center p-16 relative">
        <div className="absolute right-16 top-16 bottom-16 flex items-center">
          <div className="w-[650px] h-[650px] bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl overflow-hidden relative">
            <img src={templates[41].image} alt="Podcast thumbnail" className="w-full h-full object-cover border-4 border-white/20" />
            <div className="absolute bottom-4 left-4">
              <img src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" alt="BDBT Logo" className="h-16 opacity-90" />
            </div>
          </div>
        </div>
        <div className="absolute left-8 top-16 bottom-24 right-[35%] pr-4 z-10 flex flex-col justify-center">
          <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-6">
            <span className="text-white block mb-2">Sit and Stand</span>
            <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>Without Using Your Arms</span>
          </h1>
          <p className="text-white/80 text-3xl font-medium">Daily Wins Podcast 37</p>
        </div>
      </div>
    </div>
  </div>
)}
```

---

### Files to Modify

| File | Changes |
|------|---------|
| `src/pages/ThumbnailTemplate.tsx` | Add templates array entry + YouTube rendering block |

---

### Style Details

- Line 1: "Sit and Stand" (white)
- Line 2: "Without Using Your Arms" (brand gold - hsl(35, 45%, 75%))
- Subtitle: "Daily Wins Podcast 37"
- Standard 16:9 YouTube layout with glassmorphism image box and BDBT logo
