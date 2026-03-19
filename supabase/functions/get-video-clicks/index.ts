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

      if (vid.startsWith("auto-redirect:")) {
        const actualId = vid.replace("auto-redirect:", "");
        // Add to auto-redirect aggregate
        ensure("auto-redirect");
        counts["auto-redirect"].total += stats.total;
        counts["auto-redirect"].today += stats.today;
        counts["auto-redirect"]["7d"] += stats["7d"];
        counts["auto-redirect"]["14d"] += stats["14d"];
        counts["auto-redirect"]["30d"] += stats["30d"];
        // Add to specific video
        ensure(actualId);
        counts[actualId].total += stats.total;
        counts[actualId].today += stats.today;
        counts[actualId]["7d"] += stats["7d"];
        counts[actualId]["14d"] += stats["14d"];
        counts[actualId]["30d"] += stats["30d"];
      } else {
        ensure(vid);
        counts[vid].total += stats.total;
        counts[vid].today += stats.today;
        counts[vid]["7d"] += stats["7d"];
        counts[vid]["14d"] += stats["14d"];
        counts[vid]["30d"] += stats["30d"];
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
