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

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (cache && cache.expiresAt > Date.now()) {
      return new Response(JSON.stringify({ videos: cache.videos, cached: true }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Use the official API first: channel HTML can lag behind scheduled daily uploads.
    const apiVideos = await fetchVideosFromYouTubeApi();
    const PODCAST_TITLE_RE = /^\s*(daily wins )?podcast\s+\d+/i;
    const apiPodcastVideos = apiVideos.filter((v) => PODCAST_TITLE_RE.test(v.title));

    if (apiPodcastVideos.length > 0) {
      cache = { videos: apiPodcastVideos, expiresAt: Date.now() + CACHE_TTL_MS };
      return new Response(JSON.stringify({ videos: apiPodcastVideos, source: 'youtube-api' }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const UAS = [
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
    ];

    let html: string | null = null;
    let lastErr = '';
    for (let i = 0; i < UAS.length; i++) {
      try {
        const res = await fetch(CHANNEL_URL, {
          headers: {
            'User-Agent': UAS[i],
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
          },
        });
        if (res.ok) {
          html = await res.text();
          break;
        }
        lastErr = `status ${res.status}`;
        console.warn(`Channel fetch attempt ${i + 1} failed: ${lastErr}`);
      } catch (e: any) {
        lastErr = e.message;
        console.warn(`Channel fetch attempt ${i + 1} threw: ${lastErr}`);
      }
    }

    if (!html) {
      if (cache) {
        return new Response(JSON.stringify({ videos: cache.videos, cached: true, stale: true }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      return new Response(JSON.stringify({ error: `Channel fetch failed: ${lastErr}`, videos: [] }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Only include full Daily Wins Podcast episodes — exclude Shorts and other uploads.
    // Match both "Daily Wins Podcast 132" and the occasional "Podcast 133" titling.
    const all = parseChannelHtml(html);
    const videos = all.filter((v) => PODCAST_TITLE_RE.test(v.title));

    if (videos.length === 0) {
      console.warn('Channel HTML parsed but produced 0 podcast videos');
      if (cache) {
        return new Response(JSON.stringify({ videos: cache.videos, cached: true, stale: true }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    } else {
      cache = { videos, expiresAt: Date.now() + CACHE_TTL_MS };
    }

    return new Response(JSON.stringify({ videos }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error in youtube-videos function:', error);
    if (cache) {
      return new Response(JSON.stringify({ videos: cache.videos, cached: true, stale: true }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ error: error.message, videos: [] }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
