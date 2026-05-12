import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const CHANNEL_ID = 'UCUjFNTMKnaeP5TyN-cOF5bw';
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

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

function decodeXmlEntities(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

function parseFeed(xml: string): VideoItem[] {
  // Channel-level author name (used as channelTitle)
  const channelAuthorMatch = xml.match(/<author>\s*<name>([^<]+)<\/name>/);
  const channelTitle = channelAuthorMatch ? decodeXmlEntities(channelAuthorMatch[1]) : '';

  const entries = xml.split(/<entry>/).slice(1).map((chunk) => chunk.split(/<\/entry>/)[0]);
  const videos: VideoItem[] = [];

  for (const entry of entries) {
    const videoId = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
    if (!videoId) continue;

    const title = decodeXmlEntities(entry.match(/<title>([^<]+)<\/title>/)?.[1] ?? '');
    const publishedAt = entry.match(/<published>([^<]+)<\/published>/)?.[1] ?? '';
    const thumbnail =
      entry.match(/<media:thumbnail\s+url="([^"]+)"/)?.[1] ??
      `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    const description = decodeXmlEntities(
      entry.match(/<media:description>([\s\S]*?)<\/media:description>/)?.[1] ?? ''
    );

    videos.push({
      id: videoId,
      videoId,
      title,
      description,
      thumbnail,
      publishedAt,
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

    const UAS = [
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
      'feedfetcher-google',
    ];

    let xml: string | null = null;
    let lastErr = '';
    for (let i = 0; i < UAS.length; i++) {
      try {
        const res = await fetch(RSS_URL, { headers: { 'User-Agent': UAS[i], 'Accept': 'application/atom+xml,application/xml,text/xml,*/*' } });
        if (res.ok) {
          xml = await res.text();
          break;
        }
        lastErr = `status ${res.status}`;
        console.warn(`RSS attempt ${i + 1} failed: ${lastErr}`);
      } catch (e: any) {
        lastErr = e.message;
        console.warn(`RSS attempt ${i + 1} threw: ${lastErr}`);
      }
    }

    if (!xml) {
      // Serve stale cache if we have one
      if (cache) {
        return new Response(JSON.stringify({ videos: cache.videos, cached: true, stale: true }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      return new Response(JSON.stringify({ error: `RSS fetch failed: ${lastErr}`, videos: [] }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const videos = parseFeed(xml);
    cache = { videos, expiresAt: Date.now() + CACHE_TTL_MS };

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
