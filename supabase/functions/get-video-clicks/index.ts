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

    const { data, error } = await supabase.rpc("get_video_click_counts");
    if (error) throw error;

    // Reassemble counts object, handling auto-redirect composite IDs
    const counts: Record<string, { total: number; today: number; "7d": number; "14d": number; "30d": number }> = {};

    const ensure = (key: string) => {
      if (!counts[key]) counts[key] = { total: 0, today: 0, "7d": 0, "14d": 0, "30d": 0 };
    };

    for (const row of data || []) {
      const vid = row.video_id || "";
      const stats = { total: Number(row.total), today: Number(row.today), "7d": Number(row.d7), "14d": Number(row.d14), "30d": Number(row.d30) };

      const addTo = (key: string) => {
        ensure(key);
        counts[key].total += stats.total;
        counts[key].today += stats.today;
        counts[key]["7d"] += stats["7d"];
        counts[key]["14d"] += stats["14d"];
        counts[key]["30d"] += stats["30d"];
      };

      // Always keep the raw composite id available
      addTo(vid);

      // Prefixes that wrap a real videoId — fold their counts onto the bare videoId
      // so the Video Clicks tiles (which key on raw videoId) include them.
      const prefixes = ["auto-redirect:", "latest-page:", "latest-auto:", "latest-grid:"];
      for (const p of prefixes) {
        if (vid.startsWith(p)) {
          const actualId = vid.slice(p.length);
          if (actualId) addTo(actualId);
          // Preserve the legacy aggregate bucket used by the redirects card
          if (p === "auto-redirect:") addTo("auto-redirect");
          break;
        }
      }
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
