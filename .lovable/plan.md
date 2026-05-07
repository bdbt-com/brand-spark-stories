Hardcode the 6 podcast titles + view counts on `/bio` and use the top 3 by views on `/`.

### Numbers

| Video | Title | Views |
|---|---|---|
| `D4dzO5rfBfs` | Daily Wins Podcast 112 — Why Choosing Discomfort Feels So Hard | 2.1K |
| `EhpmrICLRK8` | Daily Wins Podcast 113 — Why Challenging Social Norms Polarises People | 1.8K |
| `L6cqky7TLpE` | Daily Wins Podcast 115 — Why a £10 Decision is Actually a £100,000 Decision | 1.6K |
| `SioUIPf4Sls` | Daily Wins Podcast 118 — Intentional Comfort vs Default Comfort | 1.4K |
| `pdjVnhCUwA8` | Daily Wins Podcast 120 — You Service Your Car But Not Your Own Body | 1.2K |
| `OjwSKAXveN8` | The Dangers of Screen-time Before Bed | 980 |

### Changes

1. **`src/pages/LinkInBio.tsx`** — populate `INITIAL_EPISODES` with all 6 titles + views; remove the `get-podcast-stats` fetch effect, localStorage cache, `STATS_CACHE_KEY`/`STATS_TTL_MS`, and the `useState` wrapper (replace with `const podcastEpisodes = INITIAL_EPISODES`).
2. **`src/pages/Home.tsx`** — replace `PODCAST_EPISODES` with the top 3 by views: `EhpmrICLRK8` (left), `D4dzO5rfBfs` (featured/middle), `L6cqky7TLpE` (right).
3. **Delete** `supabase/functions/get-podcast-stats/` and remove its entry from `supabase/config.toml`; call `delete_edge_functions` to remove the deployed function.
