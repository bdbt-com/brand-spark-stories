

## Three Changes

### 1. Blueprint.tsx: Move signup boxes above videos
The email form + blueprint info card grid (lines 97-154) needs to move above the podcast videos section (lines 46-95). Swap the order so the signup content appears first, then videos below.

### 2. Home.tsx: Reorder videos -- Screen-time first
Move `OjwSKAXveN8` ("Dangers of Screen-time") to index 0 in the array. Update the featured scaling check from `episode.featured` to still highlight the correct video on desktop (keep `featured: true` on it, logic already uses `episode.featured`).

### 3. Fix YouTube redirect on mobile (both pages)
Currently `window.open(url, '_blank')` doesn't open the YouTube app on mobile -- it often gets blocked by popup blockers or just opens in the same browser context.

**Fix**: Replace `window.open()` with `window.location.href` using the YouTube deep link format:
- Use `vnd.youtube://` URI scheme first (opens YouTube app if installed)
- Fall back to regular `https://www.youtube.com/watch?v=` URL after a short delay

Implementation: Create a helper function used in both pages:
```typescript
const openYouTube = (videoId: string) => {
  const webUrl = `https://www.youtube.com/watch?v=${videoId}`;
  // Try YouTube app deep link first
  const appUrl = `vnd.youtube://${videoId}`;
  
  // Set fallback to web URL
  const fallbackTimer = setTimeout(() => {
    window.location.href = webUrl;
  }, 500);
  
  window.location.href = appUrl;
};
```

This approach attempts the app URI scheme. If the YouTube app is installed, it opens immediately and the fallback timer gets cleared by the page unload. If the app isn't installed, the 500ms timer fires and redirects to the YouTube website.

### Files changed
- `src/pages/Home.tsx` -- reorder array, replace `window.open` with `openYouTube` helper
- `src/pages/Blueprint.tsx` -- swap section order, replace `window.open` with `openYouTube` helper

