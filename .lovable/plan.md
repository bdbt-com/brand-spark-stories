

## Fix: YouTube Opens in New Tab, Not Over Our Site

### Problem
The current `openYouTube` function uses `window.location.href` for both the app deep link and the web fallback. This navigates **away** from the site on both mobile and desktop, closing our page.

### Current code (in both `Home.tsx` and `Blueprint.tsx`):
```ts
const openYouTube = (videoId: string) => {
  const webUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const appUrl = `vnd.youtube://${videoId}`;
  setTimeout(() => { window.location.href = webUrl; }, 500);
  window.location.href = appUrl;
};
```

### Fix
- Try the YouTube app deep link first via `window.location.href` (this only navigates away if the app is installed)
- For the web fallback, use `window.open(webUrl, '_blank')` so it opens in a **new tab** instead of replacing our site
- Keep the 500ms delay so the app gets a chance to intercept first

```ts
const openYouTube = (videoId: string) => {
  const webUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const appUrl = `vnd.youtube://${videoId}`;
  setTimeout(() => { window.open(webUrl, '_blank'); }, 500);
  window.location.href = appUrl;
};
```

### Files changed
- `src/pages/Home.tsx` — update `openYouTube` function
- `src/pages/Blueprint.tsx` — update `openYouTube` function

