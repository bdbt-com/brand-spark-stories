## Three changes

**1. White header bar**
- `src/index.css`: add `--nav-foreground: 0 0% 12%` (near-black for text on white) and `--nav-border: 0 0% 88%`.
- `src/components/Navigation.tsx`:
  - Change `<nav>` to `bg-white border-b border-[hsl(var(--nav-border))]`.
  - Desktop links: text colour to `text-[hsl(var(--nav-foreground))]`, hover `hover:text-primary`, active state keeps gold underline + `text-primary`.
  - Social icons: `text-[hsl(var(--nav-foreground))]`, hover gold.
  - Mobile dropdown panel: white bg with same dark text rules.
  - Logo: keep current transparent PNG (works on white — letters are gold/dark).

**2. Body text white, gold reserved for headings + inline highlights**
- Root cause: many `<p>` elements use `text-primary` (gold) for descriptions. Fix by swapping `text-primary` → `text-foreground` only on paragraph tags (headings keep gold via global `h1–h6` rule).
- Files swept: `Home.tsx`, `About.tsx`, `Blueprint.tsx`, `Podcast.tsx`, `Community.tsx`, `AdminList.tsx`, `Partnership.tsx`, `FeelingStuck.tsx`, `DailyWins.tsx`, `Index.tsx`, `TipCard.tsx`, `TipsCarousel.tsx`, `EmailCaptureForm.tsx`, `AITipFinder.tsx`.
- Mechanical rule: regex over `<p ... className="... text-primary ..."` → replace `text-primary` with `text-foreground`. Headings (`h1`–`h3`), buttons, icons, accents untouched → gold remains.
- Going forward (memory): headings = gold; body paragraphs = white; gold inline only for explicit keyword `<span class="text-primary">` highlights.

**3. Activity feed: full 24h, no 200-row cap**
- `supabase/functions/get-activity-feed/index.ts`: change `.limit(200)` on both `video_clicks` and `email_subscriptions` queries → `.limit(10000)` (Supabase hard cap, safely covers any single day).

**Memory**
- Update `mem://style/brand-colors` with the heading-vs-body rule + white-header note.

**Out of scope**
- Other components' icon/button colours, hero sections, gradient cards — gold stays where it's not paragraph copy.
