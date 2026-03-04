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
      const { data, error } = await supabase
        .from("page_views")
        .select("session_id, duration_seconds")
        .gte("entered_at", since);

      if (error) {
        console.error(`Error fetching ${key}:`, error);
        results[key] = BASELINES[key] || { visitors: 0, avg_duration: 0 };
        continue;
      }

      const rows = data || [];
      const uniqueSessions = new Set(rows.map((r: any) => r.session_id));
      const liveVisitors = uniqueSessions.size;
      const totalDuration = rows.reduce(
        (sum: number, r: any) => sum + (r.duration_seconds || 0),
        0
      );
      const liveAvg = rows.length > 0 ? totalDuration / rows.length : 0;

      // Combine with historical baseline (skip for "today" — no historical data)
      const baseline = key === "today" ? { visitors: 0, avg_duration: 0 } : (BASELINES[key] || { visitors: 0, avg_duration: 0 });
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
      };
    }

    return new Response(JSON.stringify({ analytics: results }), {
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
