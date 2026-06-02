import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const CHANNEL_ID = 'UCUjFNTMKnaeP5TyN-cOF5bw';
const CHANNEL_URLS = [
  'https://www.youtube.com/@BigDaddysBigTips/videos',
  `https://www.youtube.com/channel/${CHANNEL_ID}/videos`,
];
const CACHE_TTL_MS = 30 * 1000; // keep the ad funnel close to the live channel state
const jsonHeaders = { ...corsHeaders, 'Content-Type': 'application/json', 'Cache-Control': 'no-store, max-age=0' };

interface VideoItem {
  id: string;
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  duration: string;
  viewCount: string;
  viewCountText: string;
  viewCountNumber: number;
  channelTitle: string;
}

const cache = new Map<string, { videos: VideoItem[]; expiresAt: number }>();

const YT_API_KEY = Deno.env.get('YOUTUBE_API_KEY') ?? '';

function parseViewCount(text: string): number {
  if (!text) return 0;
  const m = text.match(/([\d.,]+)\s*([KMB])?/i);
  if (!m) return 0;
  const n = parseFloat(m[1].replace(/,/g, ''));
  if (isNaN(n)) return 0;
  const suf = (m[2] || '').toUpperCase();
  const mult = suf === 'K' ? 1_000 : suf === 'M' ? 1_000_000 : suf === 'B' ? 1_000_000_000 : 1;
  return Math.round(n * mult);
}

function formatViews(n: number): string {
  if (n < 0 || !Number.isFinite(n)) return '';
  if (n < 1000) return `${n} views`;
  if (n < 1_000_000) {
    const v = n / 1000;
    return `${v >= 100 ? Math.round(v) : v.toFixed(1).replace(/\.0$/, '')}K views`;
  }
  if (n < 1_000_000_000) {
    const v = n / 1_000_000;
    return `${v >= 100 ? Math.round(v) : v.toFixed(1).replace(/\.0$/, '')}M views`;
  }
  const v = n / 1_000_000_000;
  return `${v.toFixed(1).replace(/\.0$/, '')}B views`;
}

function formatRelative(publishedAt: string): string {
  if (!publishedAt) return '';
  const diffMs = Date.now() - new Date(publishedAt).getTime();
  if (!Number.isFinite(diffMs) || diffMs < 0) return '';
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} minute${mins === 1 ? '' : 's'} ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hour${hrs === 1 ? '' : 's'} ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days} day${days === 1 ? '' : 's'} ago`;
  if (days < 30) {
    const w = Math.floor(days / 7);
    return `${w} week${w === 1 ? '' : 's'} ago`;
  }
  if (days < 365) {
    const mo = Math.floor(days / 30);
    return `${mo} month${mo === 1 ? '' : 's'} ago`;
  }
  const y = Math.floor(days / 365);
  return `${y} year${y === 1 ? '' : 's'} ago`;
}

function parseIsoDuration(iso: string): string {
  if (!iso) return '';
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return '';
  const h = parseInt(m[1] || '0', 10);
  const mn = parseInt(m[2] || '0', 10);
  const s = parseInt(m[3] || '0', 10);
  const pad = (n: number) => n.toString().padStart(2, '0');
  if (h > 0) return `${h}:${pad(mn)}:${pad(s)}`;
  return `${mn}:${pad(s)}`;
}

async function enrichWithDataApi(videos: VideoItem[]): Promise<VideoItem[]> {
  if (!YT_API_KEY || videos.length === 0) return videos;
  try {
    const ids = videos.map((v) => v.videoId).filter(Boolean).slice(0, 50).join(',');
    const url = `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet,contentDetails&id=${ids}&key=${YT_API_KEY}`;
    const r = await fetch(url);
    if (!r.ok) {
      console.warn('YouTube Data API enrich failed', r.status);
      return videos;
    }
    const j = await r.json();
    const items = (j?.items ?? []) as any[];
    const byId = new Map<string, any>();
    for (const it of items) byId.set(it.id, it);

    return videos.map((v) => {
      const it = byId.get(v.videoId);
      if (!it) return v;
      const rawViews = it?.statistics?.viewCount;
      const n = rawViews !== undefined && rawViews !== null ? parseInt(rawViews, 10) : NaN;
      const viewCountText = Number.isFinite(n) ? formatViews(n) : v.viewCountText;
      const viewCountNumber = Number.isFinite(n) ? n : v.viewCountNumber;
      const publishedAtIso = it?.snippet?.publishedAt;
      const publishedAt = publishedAtIso ? formatRelative(publishedAtIso) : v.publishedAt;
      const duration = it?.contentDetails?.duration ? parseIsoDuration(it.contentDetails.duration) : v.duration;
      const title = it?.snippet?.title || v.title;
      return {
        ...v,
        title,
        viewCount: viewCountText || v.viewCount,
        viewCountText: viewCountText || v.viewCountText,
        viewCountNumber,
        publishedAt,
        duration,
      };
    });
  } catch (e) {
    console.warn('YouTube Data API enrich threw', e);
    return videos;
  }
}



function parseChannelHtml(html: string): VideoItem[] {
  const m = html.match(/var ytInitialData = (\{[\s\S]*?\});\s*<\/script>/);
  if (!m) return [];

  let data: any;
  try {
    data = JSON.parse(m[1]);
  } catch {
    return [];
  }

  const channelTitle =
    data?.metadata?.channelMetadataRenderer?.title ?? '';

  const tabs = data?.contents?.twoColumnBrowseResultsRenderer?.tabs ?? [];
  const videosTab = tabs.find(
    (t: any) => t?.tabRenderer?.title === 'Videos' || t?.tabRenderer?.selected && t?.tabRenderer?.content?.richGridRenderer
  );
  const items = videosTab?.tabRenderer?.content?.richGridRenderer?.contents ?? [];

  const videos: VideoItem[] = [];

  for (const it of items) {
    const lv = it?.richItemRenderer?.content?.lockupViewModel;
    if (!lv) continue;

    const videoId = lv.contentId;
    const title = lv?.metadata?.lockupMetadataViewModel?.title?.content ?? '';
    if (!videoId || !title) continue;

    const sources = lv?.contentImage?.thumbnailViewModel?.image?.sources ?? [];
    const thumbnail =
      sources.length > 0
        ? sources[sources.length - 1].url
        : `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

    // Try to extract "Streamed/Published X ago" and "12K views" strings
    const rows =
      lv?.metadata?.lockupMetadataViewModel?.metadata?.contentMetadataViewModel?.metadataRows ?? [];
    let publishedText = '';
    let viewCountText = '';
    for (const row of rows) {
      const parts = row?.metadataParts ?? [];
      for (const p of parts) {
        const t = p?.text?.content;
        if (!t) continue;
        if (!publishedText && /ago$/i.test(t)) publishedText = t;
        if (!viewCountText && /views?$/i.test(t)) viewCountText = t;
      }
      if (publishedText && viewCountText) break;
    }

    videos.push({
      id: videoId,
      videoId,
      title,
      description: '',
      thumbnail,
      publishedAt: publishedText,
      duration: '',
      viewCount: viewCountText || '0',
      viewCountText,
      viewCountNumber: parseViewCount(viewCountText),
      channelTitle,
    });
  }

  return videos;
}


async function fetchChannelHtml(): Promise<{ html: string | null; sourceUrl: string; lastErr: string }> {
  const userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
  ];

  let lastErr = '';
  for (const sourceUrl of CHANNEL_URLS) {
    for (const userAgent of userAgents) {
      try {
        const res = await fetch(`${sourceUrl}?_=${Date.now()}`, {
          headers: {
            'User-Agent': userAgent,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
          },
        });

        if (res.ok) return { html: await res.text(), sourceUrl, lastErr: '' };
        lastErr = `${sourceUrl} status ${res.status}`;
        console.warn(`Channel fetch failed: ${lastErr}`);
      } catch (e: any) {
        lastErr = `${sourceUrl} ${e.message}`;
        console.warn(`Channel fetch threw: ${lastErr}`);
      }
    }
  }

  return { html: null, sourceUrl: '', lastErr };
}

async function hydrateTitleFromOEmbed(video: VideoItem): Promise<VideoItem> {
  if (video.title && /podcast\s+\d+/i.test(video.title)) return video;

  try {
    const res = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${video.videoId}&format=json`, {
      headers: { 'Accept': 'application/json', 'Cache-Control': 'no-cache' },
    });
    if (!res.ok) return video;

    const data = await res.json();
    if (!data?.title) return video;
    return { ...video, title: data.title, channelTitle: data.author_name ?? video.channelTitle };
  } catch {
    return video;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const podcastOnly = url.searchParams.get('filter') === 'podcast';
    const sortByViews = url.searchParams.get('sort') === 'views';
    const limitParam = parseInt(url.searchParams.get('limit') || '6', 10);
    const limit = Math.min(Math.max(isNaN(limitParam) ? 6 : limitParam, 1), 12);
    const bypassCache = url.searchParams.get('fresh') === '1';
    const cacheKey = `${podcastOnly ? 'pod' : 'all'}:${sortByViews ? 'views' : 'recent'}:${limit}`;

    const cached = cache.get(cacheKey);
    if (!bypassCache && cached && cached.expiresAt > Date.now()) {
      return new Response(JSON.stringify({ videos: cached.videos, cached: true }), {
        status: 200,
        headers: jsonHeaders,
      });
    }

    const { html, sourceUrl, lastErr } = await fetchChannelHtml();

    if (!html) {
      if (cached) {
        return new Response(JSON.stringify({ videos: cached.videos, cached: true, stale: true }), {
          status: 200,
          headers: jsonHeaders,
        });
      }
      return new Response(JSON.stringify({ error: `Channel fetch failed: ${lastErr}`, videos: [] }), {
        status: 502,
        headers: jsonHeaders,
      });
    }

    const parsed = parseChannelHtml(html);
    const enriched = await enrichWithDataApi(parsed);
    const PODCAST_TITLE_RE = /\b(daily wins\s+)?podcast\s+\d+\b/i;
    let pool = podcastOnly ? enriched.filter((v) => PODCAST_TITLE_RE.test(v.title)) : enriched;
    if (sortByViews) {
      pool = [...pool].sort((a, b) => b.viewCountNumber - a.viewCountNumber);
    }
    const sliced = pool.slice(0, limit);
    // Only fall back to oEmbed for titles the Data API couldn't supply
    const videos = await Promise.all(
      sliced.map((v) => (v.title && /podcast\s+\d+/i.test(v.title) ? Promise.resolve(v) : hydrateTitleFromOEmbed(v))),
    );


    if (videos.length === 0) {
      console.warn('Channel HTML parsed but produced 0 videos for', cacheKey);
      if (cached) {
        return new Response(JSON.stringify({ videos: cached.videos, cached: true, stale: true }), {
          status: 200,
          headers: jsonHeaders,
        });
      }
    } else {
      cache.set(cacheKey, { videos, expiresAt: Date.now() + CACHE_TTL_MS });
    }

    return new Response(JSON.stringify({ videos, source: 'youtube-channel-html', sourceUrl }), {
      status: 200,
      headers: jsonHeaders,
    });
  } catch (error: any) {
    console.error('Error in youtube-videos function:', error);
    const anyCached = cache.values().next().value;
    if (anyCached) {
      return new Response(JSON.stringify({ videos: anyCached.videos, cached: true, stale: true }), {
        status: 200,
        headers: jsonHeaders,
      });
    }
    return new Response(JSON.stringify({ error: error.message, videos: [] }), {
      status: 500,
      headers: jsonHeaders,
    });
  }
});

