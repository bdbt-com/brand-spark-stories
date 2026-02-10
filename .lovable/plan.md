

## Add TikTok Thumbnail - Podcast 37: Sit and Stand Without Using Your Arms

New template at index 55, following the established alternating background pattern.

---

### Changes Required

#### 1. `src/components/TikTokTemplate.tsx`

- **Type definition** (line 33): Add `| 55` to the `templateIndex` union type
- **Backgrounds array** (line 38): Add `tikTokBg28` as the 56th entry (odd index in the alternating pattern uses tikTokBg28)
- **JSX title block** (after the template 54 block, before the `null`): Add new conditional block:
  ```
  BDBT PODCAST 37
  SIT AND STAND
  WITHOUT USING
  YOUR ARMS
  ```
  Last line "YOUR ARMS" in brand gold `hsl(35, 45%, 75%)`

#### 2. `src/pages/ThumbnailTemplate.tsx`

- **tikTokTemplates array** (after line 376): Add new entry:
  ```
  { id: 55, name: "Podcast 37 Sit Stand Arms", title: "Sit And Stand Without Using Your Arms", subtitle: "", image: "" }
  ```
- **Rendering block** (after the template 54 block, around line 1059): Add:
  ```jsx
  {currentTemplateIndex === 55 && mode === 'instagram' && (
    <div className="relative">
      <TikTokTemplate templateIndex={55} />
    </div>
  )}
  ```

---

### Summary

| Location | Change |
|----------|--------|
| TikTokTemplate type | Add `55` to union |
| TikTokTemplate backgrounds | Add `tikTokBg28` at position 55 |
| TikTokTemplate JSX | Add podcast 37 title block |
| ThumbnailTemplate metadata | Add id 55 entry |
| ThumbnailTemplate rendering | Add `currentTemplateIndex === 55` block |
