Three small tweaks to `/latest`:

1. **Remove greyscale** — drop the `grayscale` class on the thumbnail `<img>` so it renders in full colour like a normal YouTube thumbnail.
2. **Mobile-friendly polish** in `src/pages/Latest.tsx`:
   - Tighten outer padding on small screens (`px-4 py-6 sm:py-10`).
   - Scale the centre play-button overlay down on mobile (`h-14 w-20 sm:h-20 sm:w-28`, icon `h-7 w-7 sm:h-10 sm:w-10`).
   - Title responsive sizing already uses `text-2xl md:text-3xl` — keep, but add `break-words` so long titles don't overflow.
   - CTA button: shrink height on small screens (`h-12 sm:h-14`, `text-base sm:text-lg`).
   - Ensure the article uses `gap-4 sm:gap-5`.
3. **Auto-redirect delay** — change `AUTO_REDIRECT_SECONDS` from `15` to `20`.

No backend, routing, cron, or tracking changes.
