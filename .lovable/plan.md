
# Brand Recolour: Black + Gold + White

Apply the new brand palette globally by updating the design-system tokens. Because every page/component uses semantic tokens (`bg-background`, `text-foreground`, `text-primary`, `bg-card`, etc.), changing tokens once cascades to every page automatically — no per-page rewrites needed.

## New palette

- Background: pure black `0 0% 6%` (near-black, easier on eyes than #000)
- Surface / cards: dark grey `0 0% 11%`
- Elevated surface / muted: `0 0% 16%`
- Borders: `0 0% 22%`
- Primary text / headers: gold `42 55% 62%` (warm brand gold)
- Foreground body text: white `0 0% 96%`
- Accent: gold (same as primary)
- Secondary text / muted-foreground: light grey `0 0% 72%`

Gold is used for headings (h1–h6), nav logo/links, and primary CTAs. White is the default body text. Dark grey is used for cards/sections to create depth on the black background.

## Changes

### 1. `src/index.css` — rewrite `:root` tokens
Replace all light-mode tokens with the new dark brand palette so the default (non-`.dark`) theme is already black/gold/white. Also update `.dark` to the same values for consistency.

Key token updates:
- `--background: 0 0% 6%`
- `--foreground: 0 0% 96%` (white body)
- `--card / --popover: 0 0% 11%`
- `--card-foreground / --popover-foreground: 0 0% 96%`
- `--primary: 42 55% 62%` (gold) / `--primary-foreground: 0 0% 6%`
- `--primary-glow: 42 60% 72%`
- `--secondary: 0 0% 16%` / `--secondary-foreground: 0 0% 96%`
- `--muted: 0 0% 16%` / `--muted-foreground: 0 0% 72%`
- `--accent: 42 55% 62%` / `--accent-foreground: 0 0% 6%`
- `--border: 0 0% 22%`, `--input: 0 0% 16%`, `--ring: 42 55% 62%`
- `--nav-background: 0 0% 6%`
- `--cream: 0 0% 96%` (re-mapped to white)
- `--success / --warning / --destructive`: keep semantic hues but darken bg variants for contrast on black
- Gradients: `--gradient-primary`, `--gradient-accent`, `--gradient-hero`, `--gradient-card` updated to black→dark-grey with gold highlights
- Shadows: deepen to `hsl(0 0% 0% / 0.5+)`
- Update `p { color: hsl(var(--foreground)) }` so paragraphs are white instead of inheriting `--primary` (gold)

### 2. `tailwind.config.ts`
No structural change needed — already consumes the CSS variables. Verified.

### 3. Spot-check pages for hard-coded colours
Sweep these files for literal `text-white`, `text-black`, `bg-white`, `bg-black`, `text-gray-*`, `bg-gray-*`, hex codes, and replace with semantic tokens (`text-foreground`, `bg-background`, `bg-card`, `text-primary`, `text-muted-foreground`, etc.):

- `src/components/Navigation.tsx` (header — must use `bg-background` + gold logo/links)
- `src/pages/Home.tsx`
- `src/pages/About.tsx`
- `src/pages/Tips.tsx`
- `src/pages/Podcast.tsx`
- `src/pages/Blueprint.tsx`
- `src/pages/LinkInBio.tsx`
- `src/pages/AdminList.tsx`
- `src/pages/DailyWins.tsx`
- `src/pages/FeelingStuck.tsx`
- `src/pages/Partnership.tsx`
- `src/pages/Community.tsx`
- `src/pages/NotFound.tsx` (uses hard-coded `bg-gray-100`, `text-gray-600`, `text-blue-500`)
- `src/pages/Index.tsx`
- `src/components/EmailCaptureForm.tsx`
- `src/components/TipCard.tsx`
- `src/components/TipsCarousel.tsx`
- `src/components/AITipFinder.tsx`

I'll grep for hard-coded colours and patch only the offenders — most files already use semantic tokens and will recolour automatically.

### 4. Save brand memory
Update `mem://style/brand-colors` and the Core index entry to record the new palette (black bg, gold primary, white body) so future work stays on-brand.

## Out of scope

- No layout, typography-family, or copy changes
- No component restructure — pure colour token swap + hard-coded-colour cleanup
- Email templates / edge functions untouched
- Thumbnails (TikTok/YouTube templates) keep their fixed brand styling per existing memory
