import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const LAUNCH_DATE = "2024-12-28T00:00:00Z";

interface PageRow {
  page_path: string;
  unique_visitors: number;
  avg_duration: number;
  views: number;
}

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

    const periods: Record<string, string> = {
      today: todayMidnight.toISOString(),
      "7d": new Date(now - 7 * 86400000).toISOString(),
      "14d": new Date(now - 14 * 86400000).toISOString(),
      "30d": new Date(now - 30 * 86400000).toISOString(),
      since_launch: LAUNCH_DATE,
    };

    const keys = Object.keys(periods);
    const results = await Promise.all(
      keys.map((k) => supabase.rpc("get_page_stats", { since_ts: periods[k] })),
    );

    const pages: Record<string, PageRow[]> = {};
    keys.forEach((k, i) => {
      const { data, error } = results[i];
      if (error) {
        console.error(`page-stats ${k}:`, error);
        pages[k] = [];
        return;
      }
      pages[k] = (data || []).map((r: any) => ({
        page_path: r.page_path || "/",
        unique_visitors: Number(r.unique_visitors || 0),
        avg_duration: Math.round(Number(r.avg_duration || 0)),
        views: Number(r.views || 0),
      }));
    });

    return new Response(JSON.stringify({ pages }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("page-stats error:", err);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
