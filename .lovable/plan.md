

## Fix: Fallback When Popup Is Blocked

### Problem
`window.open` returns `null` when the browser blocks the popup, so the user sees "popup blocked" and nothing happens.

### Fix
Check the return value of `window.open`. If it's `null` (blocked), fall back to `window.location.href` to redirect in the current tab.

### Changes in both `src/pages/Home.tsx` and `src/pages/Blueprint.tsx`:

```ts
setTimeout(() => {
  const newWindow = window.open(webUrl, '_blank');
  if (!newWindow) {
    window.location.href = webUrl;
  }
}, 500);
```

Everything else stays the same.

