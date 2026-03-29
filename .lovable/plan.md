

# Podcast 84 Thumbnail + Rename "BDBT PODCAST" → "DAILY WINS PODCAST" on All TikTok Templates

## Two changes

### 1. Add Podcast 84 — "Use Saffron As An Anti-Depressant"
- **TikTok (index 102)**: Add to type union, backgrounds array (even → `tikTokBg24`), new JSX block with "DAILY WINS PODCAST 84" / "USE SAFFRON AS AN" / "ANTI-DEPRESSANT" (gold)
- **YouTube (index 88)**: Add metadata entry + render block. Title: "Use Saffron As An" (white) / "Anti-Depressant" (gold). Subtitle: "Daily Wins Podcast 84"

### 2. Rename every "BDBT PODCAST" to "DAILY WINS PODCAST" across all TikTok templates
- ~80+ instances of `BDBT PODCAST XX` in `TikTokTemplate.tsx` need to become `DAILY WINS PODCAST XX`
- Simple find-and-replace: `BDBT PODCAST` → `DAILY WINS PODCAST`
- YouTube templates stay unchanged

### Files changed

| File | Change |
|------|--------|
| `src/components/TikTokTemplate.tsx` | Add index 102 to type, backgrounds, JSX. Replace all "BDBT PODCAST" with "DAILY WINS PODCAST" |
| `src/pages/ThumbnailTemplate.tsx` | Add YT id 88 + TT id 102 metadata and render blocks |

