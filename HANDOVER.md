# BDBT website rebuild: handover

Written 24 November 2026. This file is the same on both work branches. Read it before touching anything.

## The short version

Ben Raven sent three documents (Homepage, Coaching, About Me) and a PDF of 28 "Daily Win Scales". Two versions of the new site were built from them so he can choose. Both are on a public preview link. Nothing is live and nothing has been sent to Ben.

## Branches and versions

| Branch | What it is |
| --- | --- |
| `main` | The live site at bigdaddysbigtips.com, hosted by Lovable. Untouched. Do not push here. |
| `ben-docs-only` | **Version A, "Docs only".** The live site's look (white menu bar, system font, photo carousel hero) with only the changes from Ben's documents. His copy is word for word. |
| `new-site-nov-2026` | **Version B, "Upgraded".** Same content, redesigned: BDBT brand system, condensed capital headlines, about 40% less text, scroll effects, faster loading. |
| `gh-pages` | The built preview site that holds both versions. Not source code. |

Both versions share: the new Home, Coaching and About pages, the Daily Wins Test at `/test`, the enquiry forms, the menu (Home, Coaching, About, Podcast, Tips) and "Take Your Free Daily Wins Test" in place of the Blueprint button. `/blueprint` redirects to `/test` so old YouTube description links keep working.

## Preview link

https://bdbt-com.github.io/brand-spark-stories/

- Opens on A. A button fixed to the bottom of the screen switches between "A · Docs only" (`index.html`) and "B · Upgraded" (`b.html`).
- Public: anyone with the link can open it. Search engines are told not to list it.
- Blue "DRAFT" and pink "NEEDED" labels mark drafts and gaps. They only show in preview builds (see `Note` in `src/components/site/ui.tsx`) and never on the live site.
- Forms on this link should save to the real Supabase database. This has not been tested.
- Podcast and Tips have some missing images on the preview only (see "Still open").

There is also an older preview inside Claude ("Daily Wins Site Compare"). It is out of date. Use the link above.

### How to rebuild and publish the preview

Preview builds use hash routing (`VITE_HASH_ROUTER=1`) and relative paths (`--base ./`) so they work from a subfolder. `index.html` and `b.html` on `gh-pages` are hand-written wrappers that hold the A/B switch button. Keep them and only repoint them at the new build files.

```bash
# 1. Build both versions
git checkout ben-docs-only && npm install
VITE_HASH_ROUTER=1 npx vite build --base ./ --outDir /tmp/out-a
git checkout new-site-nov-2026 && npm install
VITE_HASH_ROUTER=1 npx vite build --base ./ --outDir /tmp/out-b

# 2. Open the published site as a folder
git worktree add /tmp/pages gh-pages && cd /tmp/pages

# 3. Swap the code files. Keep index.html, b.html, lovable-uploads/ and .nojekyll
rm assets/*
cp /tmp/out-b/assets/*.js /tmp/out-b/assets/*.css /tmp/out-b/assets/*.woff2 assets/
A_JS=$(grep -o 'assets/index-[^"]*\.js' /tmp/out-a/index.html | cut -d/ -f2)
A_CSS=$(grep -o 'assets/index-[^"]*\.css' /tmp/out-a/index.html | cut -d/ -f2)
B_JS=$(grep -o 'assets/index-[^"]*\.js' /tmp/out-b/index.html | cut -d/ -f2)
B_CSS=$(grep -o 'assets/index-[^"]*\.css' /tmp/out-b/index.html | cut -d/ -f2)
cp /tmp/out-a/assets/$A_JS /tmp/out-a/assets/$A_CSS assets/

# 4. Image paths in the code are absolute. Make them relative for the subfolder
sed -i 's#"/lovable-uploads/#"./lovable-uploads/#g' assets/*.js assets/*.css

# 5. Point the two pages at the new files
sed -i "s#assets/index-[^\"]*\.js#assets/$A_JS#; s#assets/index-[^\"]*\.css#assets/$A_CSS#" index.html
sed -i "s#assets/index-[^\"]*\.js#assets/$B_JS#; s#assets/index-[^\"]*\.css#assets/$B_CSS#" b.html

# 6. Publish
git add -A && git commit -m "Preview: <what changed>" && git push origin gh-pages
cd - && git worktree remove --force /tmp/pages
```

Notes:
- Read the entry file names from each build's `index.html` as shown. Do not use `ls assets/index-*.js`: Version B has several files that start with `index-`.
- If a new page uses a new image, copy it from `public/lovable-uploads/` into `lovable-uploads/` on `gh-pages`. Only the images the new pages use are there, shrunk to keep the preview small.
- GitHub takes a minute or two to refresh the link after a push.
- If a fresh clone only tracks `main`, run `git config remote.origin.fetch "+refs/heads/*:refs/remotes/origin/*"` then `git fetch`.

## Standing rules

From Harry. They apply to all further work.

1. **Preview only.** Work on the two work branches and `gh-pages`. Nothing goes live and nothing is sent to Ben until Harry says so.
2. **Modify, don't rebuild from scratch.**
3. **Keep the Podcast and Tips pages as they are.**
4. **Keep the hero video slot, the stats bar and the top-videos strip.**
5. **Never invent prices or event dates.** Leave a clear placeholder.
6. **Never add content that isn't in Ben's documents** without saying so. Mark anything added as a draft.
7. **Version A stays docs-only.** Design upgrades go in Version B. Fixes that make A match Ben's documents are allowed.
8. **Build and decide, don't send Ben questions.** Make sensible choices, label them as drafts, and let him react.
9. **Report to Harry in short bullet points**, in plain words.

### Writing rules for site copy

- No dashes used as punctuation.
- No "it's not X, it's Y" lines.
- No three-item lists for rhythm.
- No filler openers. No hype words.
- Plain British English that sounds like Ben talking.

## Brand file

`BRAND.md` at the top of the `new-site-nov-2026` branch. It is not on `ben-docs-only`, because Version A keeps the live site's look.

- Colours: black, white, gold `#C29B62`, `coal` `#11100E` for panels, `ash` `#A8A196` for secondary text. Gold has one meaning: the Daily Win.
- Type: one family, Archivo, self-hosted through the `@fontsource-variable/archivo` package. Headlines use `font-display` (condensed, weight 800, capitals, like the YouTube thumbnails). Body uses `font-sans`.
- The tokens are in `tailwind.config.ts`. The shared building blocks are in `src/components/site/ui.tsx` (buttons, `Section`, `Title`, `Lead`, `Card`, `Note`) and `src/components/site/fx.tsx` (scroll effects).

## Where things are

| File | What it holds |
| --- | --- |
| `src/pages/Home.tsx`, `Coaching.tsx`, `About.tsx` | The three new pages |
| `src/pages/DailyWinsTest.tsx` | The test: intro, two opening questions, 28 scales, email step, results |
| `src/data/dailyWinsTest.ts` | The 28 scales, the 5 life areas, all results wording and the scoring. Edit copy here |
| `src/components/site/LeadForm.tsx` | Enquiry pop-up. `saveLead` writes to the Supabase table `course_waitlist` with a label such as "Coaching enquiry: ..." |
| `src/components/Navigation.tsx` | Menu and the test button |
| `src/App.tsx` | Routes. B loads pages on demand |
| `src/lib/youtube-redirect.ts` | Top-video links. Preview builds open YouTube directly |

Ben's source documents are not in this repository. They were chat attachments: "Website November 2026 - Homepage.docx", "... Coaching Page.docx", "... About Me.docx" and "Daily Win Scales.pdf". Ask Harry for them again if you need to re-check the copy.

## Tools used and how to load them again

They were downloaded into the old chat's workspace and are gone. None is installed permanently. To get them back:

```bash
git clone --depth 1 https://github.com/anthropics/skills            # Apache 2.0
git clone --depth 1 https://github.com/vercel-labs/agent-skills     # MIT
```

| Tool | Where | How it was used |
| --- | --- | --- |
| frontend-design | `skills/skills/frontend-design/SKILL.md` | Design direction for Version B |
| brand-guidelines | `skills/skills/brand-guidelines/SKILL.md` | It is Anthropic's own brand. Used only as the format for `BRAND.md` |
| theme-factory | `skills/skills/theme-factory/` | No preset fitted. A custom BDBT theme was set instead |
| webapp-testing | `skills/skills/webapp-testing/` | `scripts/with_server.py` plus Playwright scripts for the tests |
| Vercel React Best Practices | `agent-skills/skills/react-best-practices/SKILL.md` | On-demand page loading, lighter scroll handlers, image sizes |
| Context7 (`upstash/context7`, MIT) | Not usable | It needs adding as a connector, and its site was blocked. The official React and Tailwind docs were read instead |
| Full-Page Screenshot (`LewisLiu007/full-page-screenshot`, MIT) | Not run | A script from an unknown author that controls Chrome. Playwright's full-page screenshots were used instead |

Testing was done with Playwright and the Chrome already in the workspace. The test scripts were written in the old chat and were not saved. They did four things, on desktop (1366 wide) and phone (390 wide):
- loaded every page of both versions and checked for sideways scrolling, overlapping controls, cut-off text and broken images
- clicked every button and link on Home, Coaching, About and the test
- ran the whole test from the opening questions through all 28 scales to the results
- compared every sentence of Ben's documents against the page source

## What's finished

- Both versions built, pushed and on the preview link.
- **Version A:** every sentence from Ben's three documents is in, apart from the deliberate changes listed below. All 28 scales match his PDF.
- **Version B:** brand system, shorter copy (Home 1,289 words to 730, Coaching 1,402 to 790, About 281 to 176), coaching offers as a price list, scroll effects, phone test bar, share-my-score button, smaller photos, main script 1.6MB down to 572KB.
- **The test, both versions:** 5 life areas, opening-question options and the money, health and habits wording all follow the mock-ups in Ben's homepage document.
- Last test run, on a local copy of the build: no layout problems on any page of either version on desktop or phone, and the full test ran to results on both.

### Deliberate differences from Ben's documents

- "Life Scorecard" is called the "Daily Wins Test", as Ben asked in his message.
- The Community button joins a waiting list. His document says to link the YouTube community, but Harry said the community will be hosted on the site.
- Two typos in his copy are corrected ("keep doing repeating", "Daily Wis").
- Version B shortens his wording by design. Offers, prices and meaning are kept.
- Courses links: A goes to the hidden `/courses` page as his document implies. B goes to The Invisible Workout on Xperiencify.

## What's still open

**Placeholders and drafts (labelled on the preview)**
- Hero video: a photo stands in for Ben's b-roll. Swap `HERO_IMAGE` in `Home.tsx` for a video when it arrives.
- Every coaching price and the £9.99 community price are Ben's draft figures.
- Event dates, venue and booking link are missing. Cards say "To be confirmed".
- Stats bar figures (30K+, 300+, 8PM) need confirming.
- The test: which scale counts towards which of the 5 areas is a draft. Only one scale is about money, so Financial Wellbeing rests on one answer. The Relationships and Purpose advice wording is a draft. Ben's Canva design for the test has not arrived.
- About page: Ben said a revised About Me text is coming.
- Coaching page, preview only: empty slots for client quotes, an intro video of Ben and a booking calendar.

**Not tested**
- The public preview link itself. All tests ran on a local copy of the same files.
- Forms saving to Supabase.
- YouTube: it is blocked in the test workspace, so video links were only seen opening a new tab, and the Podcast and Tips pages were partly empty in tests.
- Speed on a real phone.
- Pages outside the rebuild (Courses, Partnership, Community, Link in bio) were not re-tested after the menu and font changes.

**Not built**
- Community members area and payments.
- Results email after the test.
- Email alerts for new enquiries, and a proper leads table.
- Hosting move off Lovable. Some images on the old pages are served only by Lovable (paths starting `/__l5e/`) and will break when hosting moves. They need copying into the project first.

## Waiting on Harry

- **Supabase login** (project `xvqhkjgowlwfdosxmvba`): needed for enquiry alerts, the results email, a leads table and the members area.
- **Choice of version** once Ben has seen both.
- **Going live:** his say-so, then new hosting (for example Vercel) and pointing the domain at it. He does not want to renew Lovable.
- **From Ben, through Harry:** final prices, event dates, the revised About text, the Canva test, hero video, client quotes, and a calendar account if he wants online booking.
