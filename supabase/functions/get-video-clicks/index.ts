import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data, error } = await supabase
      .from("video_clicks")
      .select("video_id, clicked_at")
      .order("clicked_at", { ascending: false })
      .limit(3000);
    if (error) throw error;

    // Reassemble counts object.
    //
    // For each real videoId we now expose TWO derived buckets so the dashboard
    // can show clicks and redirects separately (instead of folding them
    // together which double-counted redirects in the Video Clicks tiles):
    //
    //   - counts[<videoId>]              → CLICKS only (bare id + bio-click: + latest-page: + latest-grid:)
    //   - counts["redirect:" + videoId]  → REDIRECTS only (latest-auto: + auto-redirect:)
    //
    // Composite keys (e.g. "latest-auto:abc") are also preserved as-is so the
    // /bio & /podcast redirect tiles (which sum by prefix) keep working.
    const counts: Record<string, { total: number; today: number; "7d": number; "14d": number; "30d": number }> = {};

    const ensure = (key: string) => {
      if (!counts[key]) counts[key] = { total: 0, today: 0, "7d": 0, "14d": 0, "30d": 0 };
    };

    const addTo = (key: string, stats: { total: number; today: number; "7d": number; "14d": number; "30d": number }) => {
      ensure(key);
      counts[key].total += stats.total;
      counts[key].today += stats.today;
      counts[key]["7d"] += stats["7d"];
      counts[key]["14d"] += stats["14d"];
      counts[key]["30d"] += stats["30d"];
    };

    const CLICK_PREFIXES = ["bio-click:", "latest-page:", "latest-grid:"];
    const REDIRECT_PREFIXES = ["auto-redirect:", "latest-auto:"];

    const now = Date.now();
    const todayMidnight = new Date();
    todayMidnight.setUTCHours(0, 0, 0, 0);
    const starts = {
      today: todayMidnight.getTime(),
      "7d": now - 7 * 86400000,
      "14d": now - 14 * 86400000,
      "30d": now - 30 * 86400000,
    };
    const rawCounts = new Map<string, { total: number; today: number; "7d": number; "14d": number; "30d": number }>();

    for (const row of data || []) {
      const vid = row.video_id || "";
      const ts = row.clicked_at ? new Date(row.clicked_at).getTime() : 0;
      if (!rawCounts.has(vid)) rawCounts.set(vid, { total: 0, today: 0, "7d": 0, "14d": 0, "30d": 0 });
      const stats = rawCounts.get(vid)!;
      stats.total += 1;
      if (ts >= starts.today) stats.today += 1;
      if (ts >= starts["7d"]) stats["7d"] += 1;
      if (ts >= starts["14d"]) stats["14d"] += 1;
      if (ts >= starts["30d"]) stats["30d"] += 1;
    }

    for (const [vid, stats] of rawCounts) {

      // Always keep the raw composite id available
      addTo(vid, stats);

      if (vid.startsWith("button-youtube-random:")) {
        addTo("button-youtube", stats);
        continue;
      }

      let matched = false;
      for (const p of CLICK_PREFIXES) {
        if (vid.startsWith(p)) {
          const actualId = vid.slice(p.length);
          if (actualId) addTo(actualId, stats); // fold into CLICKS bucket
          matched = true;
          break;
        }
      }
      if (matched) continue;

      for (const p of REDIRECT_PREFIXES) {
        if (vid.startsWith(p)) {
          const actualId = vid.slice(p.length);
          if (actualId) addTo("redirect:" + actualId, stats); // REDIRECTS bucket
          matched = true;
          break;
        }
      }
      if (matched) continue;

      // Bare videoId (no known prefix) → treat as a click on that video.
      // addTo(vid, stats) above already counted it under the bare key.
    }


    return new Response(JSON.stringify({ counts }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
