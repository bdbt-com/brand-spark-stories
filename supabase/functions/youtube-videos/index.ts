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
  channelTitle: string;
}

let cache: { videos: VideoItem[]; expiresAt: number } | null = null;

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

    // Try to extract "Streamed/Published X ago" string from metadata rows
    const rows =
      lv?.metadata?.lockupMetadataViewModel?.metadata?.contentMetadataViewModel?.metadataRows ?? [];
    let publishedText = '';
    for (const row of rows) {
      const parts = row?.metadataParts ?? [];
      for (const p of parts) {
        const t = p?.text?.content;
        if (t && /ago$/i.test(t)) {
          publishedText = t;
          break;
        }
      }
      if (publishedText) break;
    }

    videos.push({
      id: videoId,
      videoId,
      title,
      description: '',
      thumbnail,
      publishedAt: publishedText,
      duration: '',
      viewCount: '0',
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
    const bypassCache = url.searchParams.get('fresh') === '1';

    if (!bypassCache && cache && cache.expiresAt > Date.now()) {
      return new Response(JSON.stringify({ videos: cache.videos, cached: true }), {
        status: 200,
        headers: jsonHeaders,
      });
    }

    const { html, sourceUrl, lastErr } = await fetchChannelHtml();

    if (!html) {
      if (cache) {
        return new Response(JSON.stringify({ videos: cache.videos, cached: true, stale: true }), {
          status: 200,
          headers: jsonHeaders,
        });
      }
      return new Response(JSON.stringify({ error: `Channel fetch failed: ${lastErr}`, videos: [] }), {
        status: 502,
        headers: jsonHeaders,
      });
    }

    const all = await Promise.all(parseChannelHtml(html).slice(0, 12).map(hydrateTitleFromOEmbed));
    const PODCAST_TITLE_RE = /\b(daily wins\s+)?podcast\s+\d+\b/i;
    const videos = (podcastOnly ? all.filter((v) => PODCAST_TITLE_RE.test(v.title)) : all).slice(0, 6);

    if (videos.length === 0) {
      console.warn('Channel HTML parsed but produced 0 podcast videos');
      if (cache) {
        return new Response(JSON.stringify({ videos: cache.videos, cached: true, stale: true }), {
          status: 200,
          headers: jsonHeaders,
        });
      }
    } else {
      cache = { videos, expiresAt: Date.now() + CACHE_TTL_MS };
    }

    return new Response(JSON.stringify({ videos, source: 'youtube-channel-html', sourceUrl }), {
      status: 200,
      headers: jsonHeaders,
    });
  } catch (error: any) {
    console.error('Error in youtube-videos function:', error);
    if (cache) {
      return new Response(JSON.stringify({ videos: cache.videos, cached: true, stale: true }), {
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
