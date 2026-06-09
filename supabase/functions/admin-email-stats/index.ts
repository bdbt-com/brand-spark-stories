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

    const todayMidnight = new Date();
    todayMidnight.setUTCHours(0, 0, 0, 0);

    // Bounded read: the old endpoint paginated the full table and started timing
    // out once the list grew. Keep the visible admin list useful and fast.
    const { data, error } = await supabase
      .from("email_subscriptions")
      .select("email, first_name, created_at")
      .order("created_at", { ascending: false })
      .limit(1000);

    if (error) throw error;

    const emailMap = new Map<string, { email: string; first_name: string | null; created_at: string | null }>();
    for (const row of data || []) {
      if (row.email && !emailMap.has(row.email)) emailMap.set(row.email, row);
    }

    const subscribers = Array.from(emailMap.values());
    const todayCount = subscribers.filter(s => s.created_at && new Date(s.created_at) >= todayMidnight).length;

    return new Response(JSON.stringify({ 
      subscribers,
      total: subscribers.length,
      today_count: todayCount,
      partial: (data || []).length >= 1000,
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
