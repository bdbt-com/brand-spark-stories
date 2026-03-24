import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Support both regular JSON POST and sendBeacon payloads
    let videoId: string | undefined;

    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/json") || contentType.includes("text/plain")) {
      const text = await req.text();
      try {
        const parsed = JSON.parse(text);
        videoId = parsed.videoId;
      } catch {
        // If JSON parse fails, treat raw text as videoId
        videoId = text.trim() || undefined;
      }
    }

    if (!videoId) {
      return new Response(JSON.stringify({ error: "videoId required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    await supabase.from("video_clicks").insert({ video_id: videoId });

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
