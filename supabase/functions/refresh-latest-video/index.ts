import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const YT_API_KEY = Deno.env.get("YOUTUBE_API_KEY") ?? "";

function formatViews(n: number): string {
  if (!n || n < 0) return "";
  if (n < 1000) return `${n} views`;
  if (n < 1_000_000) {
    const v = n / 1000;
    return `${v >= 100 ? Math.round(v) : v.toFixed(1).replace(/\.0$/, "")}K views`;
  }
  if (n < 1_000_000_000) {
    const v = n / 1_000_000;
    return `${v >= 100 ? Math.round(v) : v.toFixed(1).replace(/\.0$/, "")}M views`;
  }
  const v = n / 1_000_000_000;
  return `${v.toFixed(1).replace(/\.0$/, "")}B views`;
}

async function fetchYtViewCountText(videoId: string): Promise<string> {
  if (!YT_API_KEY) return "";
  try {
    const r = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${YT_API_KEY}`,
    );
    if (!r.ok) return "";
    const j = await r.json();
    const raw = j?.items?.[0]?.statistics?.viewCount;
    const n = raw ? parseInt(raw, 10) : 0;
    return formatViews(n);
  } catch {
    return "";
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    // Reuse the existing youtube-videos function as the source of truth.
    const res = await fetch(
      `${SUPABASE_URL}/functions/v1/youtube-videos?limit=1&fresh=1`,
      {
        headers: {
          Authorization: `Bearer ${SERVICE_ROLE}`,
          apikey: SERVICE_ROLE,
        },
      }
    );
    const data = await res.json();
    const v = data?.videos?.[0];
    if (!v) {
      return new Response(JSON.stringify({ error: "no video found", data }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Prefer authoritative YouTube Data API view count over scraped value.
    const apiViews = await fetchYtViewCountText(v.videoId);
    const viewCountText = apiViews || v.viewCountText || v.viewCount || "";

    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);
    const { error } = await supabase
      .from("latest_video_cache")
      .upsert({
        id: 1,
        video_id: v.videoId,
        title: v.title,
        thumbnail_url: v.thumbnail,
        view_count_text: viewCountText,
        published_text: v.publishedAt ?? "",
        duration: v.duration ?? "",
        updated_at: new Date().toISOString(),
      });


    if (error) throw error;

    return new Response(JSON.stringify({ ok: true, videoId: v.videoId, title: v.title }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e: any) {
    console.error("refresh-latest-video error", e);
    return new Response(JSON.stringify({ error: e.message ?? String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
