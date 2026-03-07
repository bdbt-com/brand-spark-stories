import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const VIDEO_MAP: Record<string, string> = {
  ERXXO8mG5IY: "Why 70% of People Are Dehydrated",
  OjwSKAXveN8: "Dangers of Screen-time Before Bed",
  bv27Bn6qWIo: "Why Most People Invest Completely Wrong",
  zz2rVKKt1l0: "Go Exploring",
  "-a4NbW5Y718": "If You Know You're Capable of More",
  Irm5oIb5ySo: "Connect with More Animals",
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

    // Fetch recent video clicks
    const { data: clicks } = await supabase
      .from("video_clicks")
      .select("video_id, clicked_at")
      .order("clicked_at", { ascending: false })
      .limit(50);

    // Fetch recent email signups
    const { data: signups } = await supabase
      .from("email_subscriptions")
      .select("first_name, email, created_at, guide_title, email_sent, email_sent_at")
      .order("created_at", { ascending: false })
      .limit(50);

    const items: { type: string; label: string; detail: string; timestamp: string }[] = [];

    // Process clicks
    for (const c of clicks || []) {
      if (c.video_id === "auto-redirect") {
        // Skip generic auto-redirect entries (they're duplicated with specific video)
        continue;
      }
      // Check if this video_id has a corresponding auto-redirect nearby
      const title = VIDEO_MAP[c.video_id] || c.video_id;
      // We can't distinguish click vs auto-redirect from video_clicks alone for specific videos
      // So we label all as "click"
      items.push({
        type: "click",
        label: title,
        detail: "Video click",
        timestamp: c.clicked_at || new Date().toISOString(),
      });
    }

    // Process auto-redirects separately
    for (const c of clicks || []) {
      if (c.video_id === "auto-redirect") {
        items.push({
          type: "redirect",
          label: "Auto-redirect",
          detail: "Idle redirect from /bio",
          timestamp: c.clicked_at || new Date().toISOString(),
        });
      }
    }

    // Process signups
    for (const s of signups || []) {
      items.push({
        type: "signup",
        label: s.first_name || s.email.split("@")[0],
        detail: "New subscriber",
        timestamp: s.created_at || new Date().toISOString(),
      });

      // If guide was downloaded
      if (s.email_sent && s.email_sent_at) {
        items.push({
          type: "download",
          label: s.guide_title || "Guide",
          detail: `by ${s.first_name || s.email.split("@")[0]}`,
          timestamp: s.email_sent_at,
        });
      }
    }

    // Sort by timestamp descending, take top 10
    items.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    const feed = items.slice(0, 10);

    return new Response(JSON.stringify({ feed }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
