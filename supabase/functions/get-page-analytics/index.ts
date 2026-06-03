import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const LAUNCH_DATE = "2024-12-28T00:00:00Z";

// Historical Lovable analytics before custom tracking began.
// Only lifetime totals should carry this offset; rolling windows must be raw
// current-window data or 7/14/30-day figures become permanently inflated.
const SINCE_LAUNCH_BASELINE = { visitors: 4684, avg_duration: 241 };

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

    const results: Record<string, { visitors: number; avg_duration: number; live_visitors?: number }> = {};
    const bioClicks: Record<string, number> = {};
    const podcastClicks: Record<string, number> = {};

    const periodKeys = Object.keys(periods);
    const todayDate = new Date().toISOString().split("T")[0];

    // Run every RPC in parallel — sequential calls were exceeding the edge-function CPU budget.
    const visitorPromises = periodKeys.map((k) =>
      supabase.rpc("get_visitor_stats", { since_ts: periods[k] })
    );
    const bioPromises = periodKeys.map((k) =>
      supabase.rpc("get_bio_click_sessions", { since_ts: periods[k] })
    );
    const podcastPromises = periodKeys.map((k) =>
      supabase.rpc("get_podcast_click_sessions", { since_ts: periods[k] })
    );

    const [visitorResults, bioResults, podcastResults] = await Promise.all([
      Promise.all(visitorPromises),
      Promise.all(bioPromises),
      Promise.all(podcastPromises),
    ]);

    periodKeys.forEach((key, i) => {
      const { data, error } = visitorResults[i];
      if (error) {
        console.error(`Error fetching ${key}:`, error);
        const fallback = BASELINES[key] || { visitors: 0, avg_duration: 0 };
        results[key] = { ...fallback, live_visitors: 0 };
      } else {
        const row = Array.isArray(data) ? data[0] : data;
        const liveVisitors = Number(row?.unique_visitors || 0);
        const liveAvg = Number(row?.avg_duration || 0);
        const baseline = key === "today"
          ? (todayDate === TODAY_BASELINE_DATE ? TODAY_BASELINE : { visitors: 0, avg_duration: 0 })
          : (key === "since_launch" ? SINCE_LAUNCH_BASELINE : { visitors: 0, avg_duration: 0 });
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

      const bio = bioResults[i];
      bioClicks[key] = bio.error ? 0 : Number(bio.data) || 0;
      const pod = podcastResults[i];
      podcastClicks[key] = pod.error ? 0 : Number(pod.data) || 0;
    });


    return new Response(JSON.stringify({ analytics: results, bio_clicks: bioClicks, podcast_clicks: podcastClicks }), {
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
