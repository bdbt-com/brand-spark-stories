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
  vPd9pieng58: "Read For 20 Minutes Every Day",
  cfLHVIIp4o0: "Build a Life You Don't Need to Escape From",
  Irm5oIb5ySo: "Connect with More Animals",
  zz2rVKKt1l0: "Go Exploring",
  "-a4NbW5Y718": "If You Know You're Capable of More",
  "-3_zj_Q_1kI": "Reduce Decision Fatigue Wherever Possible",
  TJTe4wtW158: "Skip for 5 Minutes Daily",
  WNf06ZLUIJw: "Expose Yourself to Sunlight Daily",
  pRRSGS7eLJM: "Capitalise on Benefits Offered by Your Employer",
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

    const PAGE = 1000;
    const MAX = 10000;

    async function fetchAll(table: string, cols: string, tsCol: string) {
      const all: any[] = [];
      for (let from = 0; from < MAX; from += PAGE) {
        const { data, error } = await supabase
          .from(table)
          .select(cols)
          .gte(tsCol, since)
          .order(tsCol, { ascending: false })
          .range(from, from + PAGE - 1);
        if (error || !data || data.length === 0) break;
        all.push(...data);
        if (data.length < PAGE) break;
      }
      return all;
    }

    const clicks = await fetchAll("video_clicks", "video_id, clicked_at", "clicked_at");
    const signups = await fetchAll(
      "email_subscriptions",
      "first_name, email, created_at, guide_title, email_sent, email_sent_at",
      "created_at"
    );


    const items: { type: string; label: string; detail: string; timestamp: string }[] = [];

    const BUTTON_LABELS: Record<string, { label: string; detail: string }> = {
      "button-blueprint": { label: "Free Foundation Blueprint", detail: "Click from /bio (button)" },
      "button-youtube": { label: "YouTube channel", detail: "Click from /bio (button)" },
      "button-spotify": { label: "Spotify show", detail: "Click from /bio (button)" },
      "podcast-spotify": { label: "Spotify show", detail: "Click from /podcast (Spotify)" },
      "podcast-blueprint": { label: "Free Foundation Blueprint", detail: "Click from /podcast (Blueprint)" },
    };

    for (const c of clicks || []) {
      const vid = c.video_id || "";
      const ts = c.clicked_at || new Date().toISOString();

      // Helper to pull the underlying video id off a "prefix:VID" token
      const stripPrefix = (s: string) => {
        const idx = s.indexOf(":");
        return idx >= 0 ? s.slice(idx + 1) : s;
      };

      if (vid.startsWith("latest-auto:")) {
        const actualId = stripPrefix(vid);
        items.push({
          type: "redirect",
          label: VIDEO_MAP[actualId] || actualId,
          detail: "Redirect from /podcast",
          timestamp: ts,
        });
      } else if (vid.startsWith("latest-page:")) {
        const actualId = stripPrefix(vid);
        items.push({
          type: "click",
          label: VIDEO_MAP[actualId] || actualId,
          detail: "Click from /podcast",
          timestamp: ts,
        });
      } else if (vid.startsWith("latest-grid:")) {
        const actualId = stripPrefix(vid);
        items.push({
          type: "click",
          label: VIDEO_MAP[actualId] || actualId,
          detail: "Click from /podcast (grid)",
          timestamp: ts,
        });
      } else if (vid.startsWith("auto-redirect:")) {
        const actualId = stripPrefix(vid);
        items.push({
          type: "redirect",
          label: VIDEO_MAP[actualId] || actualId,
          detail: "Redirect from /bio",
          timestamp: ts,
        });
      } else if (vid === "auto-redirect") {
        // Legacy bare redirect token
        items.push({
          type: "redirect",
          label: "Auto-redirect",
          detail: "Redirect from /bio",
          timestamp: ts,
        });
      } else if (vid.startsWith("bio-click:")) {
        const actualId = stripPrefix(vid);
        items.push({
          type: "click",
          label: VIDEO_MAP[actualId] || actualId,
          detail: "Click from /bio",
          timestamp: ts,
        });
      } else if (BUTTON_LABELS[vid]) {
        items.push({
          type: "click",
          label: BUTTON_LABELS[vid].label,
          detail: BUTTON_LABELS[vid].detail,
          timestamp: ts,
        });
      } else {
        // Historic bare VIDEOID — only /bio carousel used this format
        items.push({
          type: "click",
          label: VIDEO_MAP[vid] || vid,
          detail: "Click from /bio",
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
    const feed = items;

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
