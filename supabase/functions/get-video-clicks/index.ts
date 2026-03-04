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

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    const d7 = new Date(now.getTime() - 7 * 86400000).toISOString();
    const d14 = new Date(now.getTime() - 14 * 86400000).toISOString();
    const d30 = new Date(now.getTime() - 30 * 86400000).toISOString();

    const { data, error } = await supabase
      .from("video_clicks")
      .select("video_id, clicked_at");

    if (error) throw error;

    const counts: Record<string, { total: number; today: number; "7d": number; "14d": number; "30d": number }> = {};

    for (const row of data || []) {
      if (!counts[row.video_id]) {
        counts[row.video_id] = { total: 0, today: 0, "7d": 0, "14d": 0, "30d": 0 };
      }
      const c = counts[row.video_id];
      c.total++;
      const ts = row.clicked_at || "";
      if (ts >= todayStart) c.today++;
      if (ts >= d7) c["7d"]++;
      if (ts >= d14) c["14d"]++;
      if (ts >= d30) c["30d"]++;
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
