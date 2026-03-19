import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const LAUNCH_DATE = "2024-12-28T00:00:00Z";

// Historical baselines from Lovable analytics (data before custom tracking started 2026-03-04)
const BASELINES: Record<string, { visitors: number; avg_duration: number }> = {
  "7d":          { visitors: 528,  avg_duration: 284 },
  "14d":         { visitors: 1300, avg_duration: 351 },
  "30d":         { visitors: 3100, avg_duration: 299 },
  since_launch:  { visitors: 4684, avg_duration: 241 },
};

// Today's baseline — only applies on this specific date, resets to 0 tomorrow
const TODAY_BASELINE_DATE = "2026-03-04";
const TODAY_BASELINE = { visitors: 76, avg_duration: 132 };
const TRACKING_START = new Date("2026-03-04T00:00:00Z");

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const now = new Date();
    const todayMidnight = new Date(now);
    todayMidnight.setUTCHours(0, 0, 0, 0);
    const periods: Record<string, string> = {
      today: todayMidnight.toISOString(),
      "7d": new Date(now.getTime() - 7 * 86400000).toISOString(),
      "14d": new Date(now.getTime() - 14 * 86400000).toISOString(),
      "30d": new Date(now.getTime() - 30 * 86400000).toISOString(),
      since_launch: LAUNCH_DATE,
    };

    const results: Record<string, { visitors: number; avg_duration: number }> = {};

    for (const [key, since] of Object.entries(periods)) {
      const { data, error } = await supabase.rpc("get_visitor_stats", {
        since_ts: since,
      });

      if (error) {
        console.error(`Error fetching ${key}:`, error);
        results[key] = BASELINES[key] || { visitors: 0, avg_duration: 0 };
        continue;
      }

      const row = Array.isArray(data) ? data[0] : data;
      const liveVisitors = Number(row?.unique_visitors || 0);
      const liveAvg = Number(row?.avg_duration || 0);

      // For "today": apply date-aware baseline
      const todayDate = new Date().toISOString().split("T")[0];
      const baseline = key === "today"
        ? (todayDate === TODAY_BASELINE_DATE ? TODAY_BASELINE : { visitors: 0, avg_duration: 0 })
        : (BASELINES[key] || { visitors: 0, avg_duration: 0 });
      const combinedVisitors = baseline.visitors + liveVisitors;
      const combinedAvg = combinedVisitors > 0
        ? Math.round(
            (baseline.visitors * baseline.avg_duration + liveVisitors * liveAvg) /
            combinedVisitors
          )
        : 0;

      results[key] = {
        visitors: combinedVisitors,
        avg_duration: combinedAvg,
        live_visitors: liveVisitors,
      };
    }

    // Count /bio and /links page views for each time period
    const bioPeriods = { today: periods["today"], "7d": periods["7d"], "14d": periods["14d"], "30d": periods["30d"] };
    const bioClicks: Record<string, number> = {};
    for (const [key, since] of Object.entries(bioPeriods)) {
      const { count } = await supabase
        .from("page_views")
        .select("*", { count: "exact", head: true })
        .in("page_path", ["/bio", "/links"])
        .gte("entered_at", since);
      bioClicks[key] = count || 0;
    }

    return new Response(JSON.stringify({ analytics: results, bio_clicks: bioClicks }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Analytics error:", err);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
