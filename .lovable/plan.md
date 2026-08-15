# Fix how the site appears in Google results

## What Google is actually showing and why

Checked the live source, not memory — the SEO work never covered these:

- **"Big Daddy's Big Tips Logo" as the homepage title.** The nav logo image has `alt="Big Daddy's Big Tips Logo"`, and it's the first strong text Google finds. Google overrides your `<title>` with it.
- **Every page shares one title and description.** `index.html` has a single `<title>BigDaddy'sBigTips</title>` and one description; there is no per-route metadata anywhere in the app, so About, Courses, Blueprint and Podcast all inherit the same tags. Google then invents descriptions from page text — that's where "Unsubscribe from paid streaming services…" comes from.
- **No canonical tag, and og:url points at `bdbt.lovable.app`** while the site people visit is `bigdaddysbigtips.com`.
- **No `sitemap.xml`,** and `robots.txt` has no sitemap line, so Google discovers pages slowly and unevenly.

## What I'll change

1. **Fix the logo alt text** to `Big Daddy's Big Tips` (drop "Logo") so it stops being harvested as a title.
2. **Add per-page titles and descriptions** using `react-helmet-async`, written for search intent, one unique pair per public route:
   - `/` — home/brand + what the site is
   - `/about`, `/courses`, `/blueprint`, `/podcast`, `/daily-wins`, `/tips`, `/partnership`, `/links`
   - `/admin-list`, `/redirect`, `/thumbnail-template` get `noindex` so they stop appearing.
3. **Self-referencing canonical + og:url per route** on `https://bigdaddysbigtips.com`, and update the sitewide `og:*` fallback in `index.html` to the same domain.
4. **Improve the homepage title/description in `index.html`** so non-JS crawlers and social previews get a real, keyword-bearing title instead of the bare brand name.
5. **Add `public/sitemap.xml`** listing the public routes, and add a `Sitemap:` line to `robots.txt`.

## Technical notes

- Install `react-helmet-async`, wrap the app in `HelmetProvider` in `src/main.tsx`, and add a small `<Seo />` wrapper component so each page sets title/description/canonical/og in one line.
- Remove the canonical from `index.html` (routes own it); keep the sitewide `og:*` there as the fallback for social crawlers, which don't run JS.
- Keep the existing `Organization`/`WebSite` JSON-LD; no FAQ schema.
- `Podcast.tsx` currently sets `document.title` imperatively — replace that with the Helmet tag so it doesn't fight the new setup.

## Timing expectation

These are crawl-time fixes. Google will keep showing the old titles until it re-crawls — typically a few days to a couple of weeks. It can be sped up by requesting indexing for the homepage in Search Console after this ships.
