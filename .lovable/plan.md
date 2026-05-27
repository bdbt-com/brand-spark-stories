## Update RedirectBridge page

**File:** `src/pages/RedirectBridge.tsx`

**Change the loading screen styling:**
- Replace hardcoded `bg-[#36455A]` with `bg-background` (brand black).
- Remove the "Opening YouTube…" text entirely.
- Replace it with a smooth circular spinner: a thin gold (`border-primary`) ring with a transparent top segment, rotating via `animate-spin`, centered on screen.

**Markup:**
```tsx
<div className="min-h-screen bg-background flex items-center justify-center">
  <div className="h-12 w-12 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
</div>
```

No behaviour changes — tracking + redirect logic untouched.