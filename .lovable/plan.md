## Problem

The hero carousel uses one shared `<img>` with `object-cover` + `object-top`, which force-crops every photo to a fixed frame. Because the photos have wildly different compositions (sky-heavy sunset, vertical portrait, horizontal cinema room, etc.), no single crop rule works — heads, bodies and subjects get sliced off.

## Fix

Stop cropping. Render each photo in full inside the frame using `object-contain` on a dark backdrop that matches the existing card (`bg-black/30`). The frame size stays the same; the image just letterboxes into it. This works for every photo regardless of orientation, on mobile and desktop.

### Change

File: `src/pages/Home.tsx` — the single `<img>` inside the carousel slide (around line 240).

- Remove `object-cover object-top`.
- Add `object-contain` plus a dark inner background so portrait/landscape mismatches read as intentional framing rather than empty space.
- Keep the existing aspect ratios (`aspect-[4/3]` mobile, `aspect-square` desktop) so the layout doesn't shift.

```tsx
<CarouselItem key={src}>
  <div className="w-full aspect-[4/3] lg:aspect-square rounded-xl bg-black/30 overflow-hidden">
    <img
      src={src}
      alt={`Big Life Change inspiration image ${idx + 1}`}
      className="w-full h-full object-contain"
      loading={idx === 0 ? "eager" : "lazy"}
    />
  </div>
</CarouselItem>
```

### Why not per-image focal points

Setting a custom `object-position` per photo would also work, but with ~10 photos in the carousel (and more likely to be added) it's fragile — every new upload needs a manual focal tag, and any photo where the subject spans the whole frame still gets cropped. `object-contain` is the only rule that works for *every* photo without per-asset bookkeeping.

### Out of scope

- No changes to which photos appear, the carousel logic, the autoplay/embla setup, or the surrounding hero copy.
- No changes to other pages.
