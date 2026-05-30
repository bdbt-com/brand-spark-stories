import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

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

    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);
    const { error } = await supabase
      .from("latest_video_cache")
      .upsert({
        id: 1,
        video_id: v.videoId,
        title: v.title,
        thumbnail_url: v.thumbnail,
        view_count_text: v.viewCountText ?? v.viewCount ?? "",
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
