# Move Latest → /podcast

## Changes
1. **src/App.tsx**
   - Remove `import Latest from "./pages/Latest"` and `import Podcast from "./pages/Podcast"`.
   - Add `import Podcast from "./pages/Podcast"` (new), where the file is the renamed Latest.
   - Remove the `/latest` route.
   - Keep the `/podcast` route, now rendering the new (ex-Latest) component.
   - Add a redirect from `/latest` → `/podcast` so any existing links still work.

2. **Rename file**
   - Move `src/pages/Latest.tsx` → `src/pages/Podcast.tsx` (overwriting the old Podcast page).
   - Update the component name inside from `Latest` to `Podcast`.

3. **Delete** the old `src/pages/Podcast.tsx` (handled by the overwrite above).

4. **Navigation** — `src/components/Navigation.tsx` already points "Podcast" → `/podcast`. No change needed; clicking the Podcast tab will now show the new page.

## Notes
- The Navigation tab already exists and is wired to `/podcast`, so no nav edits required.
- Adding the `/latest` → `/podcast` redirect prevents broken links from anywhere (e.g. shared URLs).
