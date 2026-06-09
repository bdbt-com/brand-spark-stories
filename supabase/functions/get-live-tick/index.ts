import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const normalisePath = (path: string | null) => (path || "/").replace(/\/+$/, "") || "/";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const midnight = new Date();
    midnight.setUTCHours(0, 0, 0, 0);
    const since = midnight.toISOString();

    const [viewsRes, clicksRes, subsRes] = await Promise.all([
      supabase.from("page_views").select("session_id,page_path").gte("entered_at", since).limit(20000),
      supabase.from("video_clicks").select("video_id").gte("clicked_at", since).limit(20000),
      supabase.from("email_subscriptions").select("email").gte("created_at", since).limit(5000),
    ]);

    if (viewsRes.error) throw viewsRes.error;
    if (clicksRes.error) throw clicksRes.error;
    if (subsRes.error) throw subsRes.error;

    const visitors = new Set<string>();
    const bio = new Set<string>();
    const podcast = new Set<string>();
    for (const row of viewsRes.data || []) {
      const sid = row.session_id || crypto.randomUUID();
      const path = normalisePath(row.page_path);
      visitors.add(sid);
      if (path === "/bio" || path === "/links") bio.add(sid);
      if (path === "/podcast") podcast.add(sid);
    }

    let bioRedirects = 0;
    let podcastRedirects = 0;
    for (const row of clicksRes.data || []) {
      const vid = row.video_id || "";
      if (vid === "auto-redirect" || vid.startsWith("auto-redirect:")) bioRedirects += 1;
      if (vid.startsWith("latest-auto:")) podcastRedirects += 1;
    }

    return new Response(
      JSON.stringify({
        visitors_today: visitors.size,
        subscribers_today: (subsRes.data || []).length,
        bio_clicks_today: bio.size,
        podcast_clicks_today: podcast.size,
        bio_redirects_today: bioRedirects,
        podcast_redirects_today: podcastRedirects,
        total_clicks_today: (clicksRes.data || []).length,
        server_time: new Date().toISOString(),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});