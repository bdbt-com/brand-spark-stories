import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Fetching download counts...");
    
    // Create Supabase client with service role key to bypass RLS
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Query all email subscriptions where email_sent is true
    const { data, error } = await supabase
      .from("email_subscriptions")
      .select("guide_title")
      .eq("email_sent", true);

    if (error) {
      console.error("Database query error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to fetch download counts" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Count downloads by guide_title
    const counts: Record<string, number> = {};
    data?.forEach((record) => {
      const title = record.guide_title.trim();
      counts[title] = (counts[title] || 0) + 1;
    });

    console.log("Download counts calculated:", counts);

    return new Response(
      JSON.stringify({ counts }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error in get-download-counts function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
