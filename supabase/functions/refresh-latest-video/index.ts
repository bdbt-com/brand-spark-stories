import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const YT_API_KEY = Deno.env.get("YOUTUBE_API_KEY") ?? "";

function formatViews(n: number): string {
  if (n < 0 || !Number.isFinite(n)) return "";
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

async function fetchYtStats(videoId: string): Promise<{ views: string; published: string }> {
  if (!YT_API_KEY) return { views: "", published: "" };
  try {
    const r = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoId}&key=${YT_API_KEY}`,
    );
    if (!r.ok) return { views: "", published: "" };
    const j = await r.json();
    const item = j?.items?.[0];
    const raw = item?.statistics?.viewCount;
    const n = raw !== undefined && raw !== null ? parseInt(raw, 10) : NaN;
    const views = Number.isFinite(n) ? formatViews(n) : "";
    const publishedAt = item?.snippet?.publishedAt;
    let published = "";
    if (publishedAt) {
      const diffMs = Date.now() - new Date(publishedAt).getTime();
      const mins = Math.floor(diffMs / 60000);
      if (mins < 1) published = "just now";
      else if (mins < 60) published = `${mins} minute${mins === 1 ? "" : "s"} ago`;
      else {
        const hrs = Math.floor(mins / 60);
        if (hrs < 24) published = `${hrs} hour${hrs === 1 ? "" : "s"} ago`;
        else {
          const days = Math.floor(hrs / 24);
          if (days < 7) published = `${days} day${days === 1 ? "" : "s"} ago`;
          else if (days < 30) {
            const w = Math.floor(days / 7);
            published = `${w} week${w === 1 ? "" : "s"} ago`;
          } else if (days < 365) {
            const mo = Math.floor(days / 30);
            published = `${mo} month${mo === 1 ? "" : "s"} ago`;
          } else {
            const y = Math.floor(days / 365);
            published = `${y} year${y === 1 ? "" : "s"} ago`;
          }
        }
      }
    }
    return { views, published };
  } catch {
    return { views: "", published: "" };
  }
}

function sanitizeScrapedViews(s: string): string {
  if (!s) return "";
  const t = s.trim();
  if (!t) return "";
  // Reject bare "0" / numeric-only strings without a "views" suffix
  if (/^\d+$/.test(t)) return "";
  return t;
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
