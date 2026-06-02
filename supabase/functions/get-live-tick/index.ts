import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );
    const { data, error } = await supabase.rpc("get_today_live_tick");
    if (error) throw error;
    const row = Array.isArray(data) ? data[0] : data;
    return new Response(
      JSON.stringify({
        visitors_today: Number(row?.visitors_today || 0),
        subscribers_today: Number(row?.subscribers_today || 0),
        bio_clicks_today: Number(row?.bio_clicks_today || 0),
        podcast_clicks_today: Number(row?.podcast_clicks_today || 0),
        bio_redirects_today: Number(row?.bio_redirects_today || 0),
        podcast_redirects_today: Number(row?.podcast_redirects_today || 0),
        total_clicks_today: Number(row?.total_clicks_today || 0),
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
