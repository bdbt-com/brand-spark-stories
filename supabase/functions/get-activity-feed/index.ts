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

    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    const { data: clicks } = await supabase
      .from("video_clicks")
      .select("video_id, clicked_at")
      .gte("clicked_at", since)
      .order("clicked_at", { ascending: false })
      .limit(200);

    const { data: signups } = await supabase
      .from("email_subscriptions")
      .select("first_name, email, created_at, guide_title, email_sent, email_sent_at")
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .limit(200);

    const items: { type: string; label: string; detail: string; timestamp: string }[] = [];

    for (const c of clicks || []) {
      const vid = c.video_id || "";
      const ts = c.clicked_at || new Date().toISOString();

      if (vid.startsWith("auto-redirect:")) {
        // New composite format: auto-redirect:VIDEO_ID
        const actualId = vid.replace("auto-redirect:", "");
        const title = VIDEO_MAP[actualId] || actualId;
        items.push({
          type: "redirect",
          label: title,
          detail: "Auto-redirect",
          timestamp: ts,
        });
      } else if (vid === "auto-redirect") {
        // Legacy format (no video info)
        items.push({
          type: "redirect",
          label: "Auto-redirect",
          detail: "Idle redirect from /bio",
          timestamp: ts,
        });
      } else {
        // Manual click
        const title = VIDEO_MAP[vid] || vid;
        items.push({
          type: "click",
          label: title,
          detail: "Video click",
          timestamp: ts,
        });
      }
    }

    for (const s of signups || []) {
      items.push({
        type: "signup",
        label: s.first_name || s.email.split("@")[0],
        detail: "New subscriber",
        timestamp: s.created_at || new Date().toISOString(),
      });

      if (s.email_sent && s.email_sent_at) {
        items.push({
          type: "download",
          label: s.guide_title || "Guide",
          detail: `by ${s.first_name || s.email.split("@")[0]}`,
          timestamp: s.email_sent_at,
        });
      }
    }

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
