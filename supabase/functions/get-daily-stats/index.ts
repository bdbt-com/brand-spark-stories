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

    const [dailyRes, hourlyRes] = await Promise.all([
      supabase.rpc("get_daily_stats"),
      supabase.rpc("get_hourly_stats_today"),
    ]);

    if (dailyRes.error) throw dailyRes.error;
    if (hourlyRes.error) throw hourlyRes.error;

    const daily = (dailyRes.data || []).slice().sort((a: any, b: any) => String(a.day).localeCompare(String(b.day)));
    const hourly = (hourlyRes.data || []).slice().sort((a: any, b: any) => String(a.hour).localeCompare(String(b.hour)));

    return new Response(JSON.stringify({ daily, hourly }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
