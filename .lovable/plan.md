

# Podcast 60 Thumbnails: "Reframe one Thing In Your Life Today"

## What will be built
Both YouTube (16:9) and TikTok/Instagram (9:16) thumbnail templates for Podcast 60 with the title "Reframe one Thing In Your Life Today".

## Changes

### 1. `src/pages/ThumbnailTemplate.tsx`

**YouTube templates array** (after line 472, before the closing `];`):
- Add entry `id: 64` with name/title "Reframe one Thing In Your Life Today", subtitle "Daily Wins Podcast 60"

**TikTok templates array** (after line 553, before the closing `];`):
- Add entry `id: 78` with name "Podcast 60 Reframe one Thing In Your Life Today"

**YouTube rendering block** (after the template 63 block ending at line 3454):
- Add `currentTemplateIndex === 64 && mode === 'youtube'` block
- Standard podcast layout: gradient background, right-side image box with glassmorphism, podcast image, BDBT logo
- Title split: "Reframe one Thing" (white) / "In Your Life Today" (gold accent)
- Subtitle: "Daily Wins Podcast 60"

**TikTok rendering block** (after the template 77 instagram block):
- Add `currentTemplateIndex === 78 && mode === 'instagram'` block rendering `<TikTokTemplate templateIndex={78} />`

### 2. `src/components/TikTokTemplate.tsx`

**Type definition** (line 33):
- Extend union type to include `78`

**Backgrounds array** (line 38):
- Append `tikTokBg24` (P60 is even-numbered, uses bg 24 per the mapping)

**Title rendering** (after the templateIndex === 77 block, before the `: null}`):
- Add `templateIndex === 78` case
- "BDBT PODCAST 60" header, "REFRAME ONE THING" (white), "IN YOUR LIFE TODAY" (gold)

