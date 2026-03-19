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
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Paginated fetch to bypass 1000-row limit
    const allData: { email: string; first_name: string | null; created_at: string | null }[] = [];
    let from = 0;
    const PAGE = 1000;
    while (true) {
      const { data, error } = await supabase
        .from("email_subscriptions")
        .select("email, first_name, created_at")
        .order("created_at", { ascending: true })
        .range(from, from + PAGE - 1);

      if (error) throw error;
      if (!data || data.length === 0) break;
      allData.push(...data);
      if (data.length < PAGE) break;
      from += PAGE;
    }

    // Deduplicate: keep earliest entry per email
    const emailMap = new Map<string, { email: string; first_name: string | null; created_at: string | null }>();
    for (const row of allData) {
      if (!emailMap.has(row.email)) {
        emailMap.set(row.email, row);
      }
    }

    // Convert to array, sorted newest first
    const subscribers = Array.from(emailMap.values()).reverse();

    // Count subscribers gained today
    const todayMidnight = new Date();
    todayMidnight.setUTCHours(0, 0, 0, 0);
    const todayCount = subscribers.filter(s => s.created_at && new Date(s.created_at) >= todayMidnight).length;

    return new Response(JSON.stringify({ 
      subscribers,
      total: subscribers.length,
      today_count: todayCount,
    }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
