import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const LAUNCH_DATE = "2024-12-28T00:00:00Z";
const SINCE_LAUNCH_BASELINE = { visitors: 4684, avg_duration: 241 };
const TODAY_BASELINE_DATE = "2026-03-04";
const TODAY_BASELINE = { visitors: 76, avg_duration: 132 };

type PeriodKey = "today" | "7d" | "14d" | "30d" | "since_launch";
type Row = { session_id: string | null; page_path: string | null; duration_seconds: number | null; entered_at: string | null };

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

    const now = new Date();
    const todayMidnight = new Date(now);
    todayMidnight.setUTCHours(0, 0, 0, 0);
    const starts: Record<PeriodKey, Date> = {
      today: todayMidnight,
      "7d": new Date(now.getTime() - 7 * 86400000),
      "14d": new Date(now.getTime() - 14 * 86400000),
      "30d": new Date(now.getTime() - 30 * 86400000),
      since_launch: new Date(LAUNCH_DATE),
    };

    // One bounded recent read keeps the dashboard responsive instead of firing
    // 15 expensive RPCs at once. Since-launch keeps the historic baseline below.
    const { data, error } = await supabase
      .from("page_views")
      .select("session_id,page_path,duration_seconds,entered_at")
      .gte("entered_at", starts["30d"].toISOString())
      .order("entered_at", { ascending: false })
      .limit(1500);

    if (error) throw error;

    const rows = (data || []) as Row[];
    const analytics: Record<PeriodKey, { visitors: number; avg_duration: number; live_visitors?: number }> = {
      today: { visitors: 0, avg_duration: 0, live_visitors: 0 },
      "7d": { visitors: 0, avg_duration: 0, live_visitors: 0 },
      "14d": { visitors: 0, avg_duration: 0, live_visitors: 0 },
      "30d": { visitors: 0, avg_duration: 0, live_visitors: 0 },
      since_launch: { ...SINCE_LAUNCH_BASELINE, live_visitors: 0 },
    };
    const bioClicks: Record<PeriodKey, number> = { today: 0, "7d": 0, "14d": 0, "30d": 0, since_launch: 0 };
    const podcastClicks: Record<PeriodKey, number> = { today: 0, "7d": 0, "14d": 0, "30d": 0, since_launch: 0 };

    for (const key of ["today", "7d", "14d", "30d"] as PeriodKey[]) {
      const startMs = starts[key].getTime();
      const sessions = new Set<string>();
      const bioSessions = new Set<string>();
      const podcastSessions = new Set<string>();
      let durationTotal = 0;
      let durationCount = 0;

      for (const row of rows) {
        const ts = row.entered_at ? new Date(row.entered_at).getTime() : 0;
        if (ts < startMs) continue;
        const sid = row.session_id || `anon:${row.entered_at}:${row.page_path}`;
        const path = normalisePath(row.page_path);
        sessions.add(sid);
        if (path === "/bio" || path === "/links") bioSessions.add(sid);
        if (path === "/podcast") podcastSessions.add(sid);
        if (typeof row.duration_seconds === "number") {
          durationTotal += Number(row.duration_seconds || 0);
          durationCount += 1;
        }
      }

      const liveVisitors = sessions.size;
      const liveAvg = durationCount > 0 ? Math.round(durationTotal / durationCount) : 0;
      const todayDate = now.toISOString().split("T")[0];
      const baseline = key === "today" && todayDate === TODAY_BASELINE_DATE ? TODAY_BASELINE : { visitors: 0, avg_duration: 0 };
      const visitors = baseline.visitors + liveVisitors;
      analytics[key] = {
        visitors,
        avg_duration: visitors > 0
          ? Math.round((baseline.visitors * baseline.avg_duration + liveVisitors * liveAvg) / visitors)
          : 0,
        live_visitors: liveVisitors,
      };
      bioClicks[key] = bioSessions.size;
      podcastClicks[key] = podcastSessions.size;
    }

    bioClicks.since_launch = bioClicks["30d"];
    podcastClicks.since_launch = podcastClicks["30d"];

    return new Response(JSON.stringify({ analytics, bio_clicks: bioClicks, podcast_clicks: podcastClicks }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("Analytics error:", err);
    return new Response(JSON.stringify({ error: err.message || "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});