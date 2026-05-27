## Match About hero background to Home page

The "Story Behind The System" hero on About currently uses `bg-primary` (gold). The Home hero uses `bg-background` (black) with white headings + gold accent. Update About to mirror that look.

### Changes — `src/pages/About.tsx`

1. **Hero section (line 39)**: change `bg-primary` → `bg-background`.
2. **Headings (lines 46–47)**:
   - "The Story Behind" stays white (already `text-white`).
   - "The System" — change `text-[hsl(35_45%_75%)]` → `text-primary` so the accent line uses brand gold against black (matches "Big Life Changes" on Home).
3. **Body paragraphs (lines 51, 54)**: `text-white` → `text-foreground` for proper token usage on black.
4. **Read My Story button (line 62)**: swap `bg-background/95` → `bg-card` and keep `border-primary/30` so it stays visible against black.
5. **Image border (line 75)**: `border-white/20` → `border-primary/20` to blend with black background.

### Out of scope

- The expandable story section below (line 85 onward) keeps its gold background — user only referenced the visible top hero.
- No other sections, no copy changes, no layout changes.
