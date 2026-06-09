import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const LAUNCH_DATE = "2024-12-28T00:00:00Z";
type PageRow = { page_path: string; unique_visitors: number; avg_duration: number; views: number };
type ViewRow = { page_path: string | null; session_id: string | null; duration_seconds: number | null; entered_at: string | null };
type PeriodKey = "today" | "7d" | "14d" | "30d" | "since_launch";

const normalisePath = (path: string | null) => (path || "/").replace(/\/+$/, "") || "/";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const now = Date.now();
    const todayMidnight = new Date();
    todayMidnight.setUTCHours(0, 0, 0, 0);
    const periods: Record<PeriodKey, string> = {
      today: todayMidnight.toISOString(),
      "7d": new Date(now - 7 * 86400000).toISOString(),
      "14d": new Date(now - 14 * 86400000).toISOString(),
      "30d": new Date(now - 30 * 86400000).toISOString(),
      since_launch: LAUNCH_DATE,
    };

    const { data, error } = await supabase
      .from("page_views")
      .select("page_path,session_id,duration_seconds,entered_at")
      .gte("entered_at", periods["30d"])
      .order("entered_at", { ascending: false })
      .limit(1500);

    if (error) throw error;
    const rows = (data || []) as ViewRow[];
    const pages: Record<PeriodKey, PageRow[]> = { today: [], "7d": [], "14d": [], "30d": [], since_launch: [] };

    for (const key of ["today", "7d", "14d", "30d"] as PeriodKey[]) {
      const start = new Date(periods[key]).getTime();
      const buckets = new Map<string, { sessions: Set<string>; duration: number; durationCount: number; views: number }>();
      for (const row of rows) {
        const ts = row.entered_at ? new Date(row.entered_at).getTime() : 0;
        if (ts < start) continue;
        const path = normalisePath(row.page_path);
        if (path.startsWith("/redirect") || path.startsWith("/admin-list")) continue;
        if (!buckets.has(path)) buckets.set(path, { sessions: new Set(), duration: 0, durationCount: 0, views: 0 });
        const bucket = buckets.get(path)!;
        bucket.sessions.add(row.session_id || `anon:${row.entered_at}:${row.page_path}`);
        bucket.views += 1;
        if (typeof row.duration_seconds === "number") {
          bucket.duration += Number(row.duration_seconds || 0);
          bucket.durationCount += 1;
        }
      }
      pages[key] = Array.from(buckets.entries())
        .map(([page_path, bucket]) => ({
          page_path,
          unique_visitors: bucket.sessions.size,
          avg_duration: bucket.durationCount > 0 ? Math.round(bucket.duration / bucket.durationCount) : 0,
          views: bucket.views,
        }))
        .sort((a, b) => b.unique_visitors - a.unique_visitors)
        .slice(0, 50);
    }

    // Until the database aggregate migration can run, expose the same recent
    // rows for since-launch instead of an empty state; lifetime totals still
    // live in the main analytics endpoint baseline.
    pages.since_launch = pages["30d"];

    return new Response(JSON.stringify({ pages }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("page-stats error:", err);
    return new Response(JSON.stringify({ error: err.message || "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});