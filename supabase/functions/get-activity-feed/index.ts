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

let displayNames: Intl.DisplayNames | null = null;
try {
  displayNames = new Intl.DisplayNames(['en-GB'], { type: 'region' });
} catch {}

function countryLabel(code: string | null | undefined): string | null {
  if (!code) return null;
  const c = code.toUpperCase();
  try {
    const name = displayNames?.of(c);
    if (name && name !== c) return name;
  } catch {}
  return c;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const serverTime = new Date().toISOString();

    let sinceParam: string | null = null;
    if (req.method === "POST") {
      try {
        const body = await req.json();
        if (body && typeof body.since === "string") sinceParam = body.since;
      } catch {}
    }

    const incremental = !!sinceParam;
    const since = sinceParam || new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    const LIMIT = 100;

    async function fetchAll(table: string, cols: string, tsCol: string) {
      const { data, error } = await supabase
        .from(table)
        .select(cols)
        .gte(tsCol, since)
        .order(tsCol, { ascending: false })
        .limit(LIMIT);
      if (error || !data) return [];
      return data;
    }

    const clicks = await fetchAll("video_clicks", "video_id, clicked_at, country", "clicked_at");
    const signups = await fetchAll(
      "email_subscriptions",
      "first_name, email, created_at, guide_title, email_sent, email_sent_at",
      "created_at"
    );

    const items: { type: string; label: string; detail: string; timestamp: string; country?: string | null }[] = [];

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
      const country = countryLabel(c.country);
      const stripPrefix = (s: string) => {
        const idx = s.indexOf(":");
        return idx >= 0 ? s.slice(idx + 1) : s;
      };

      const push = (type: string, label: string, detail: string) => {
        items.push({ type, label, detail, timestamp: ts, country });
      };

      if (vid.startsWith("latest-auto:")) {
        push("redirect", VIDEO_MAP[stripPrefix(vid)] || stripPrefix(vid), "Redirect from /podcast");
      } else if (vid.startsWith("latest-page:")) {
        push("click", VIDEO_MAP[stripPrefix(vid)] || stripPrefix(vid), "Click from /podcast");
      } else if (vid.startsWith("latest-grid:")) {
        push("click", VIDEO_MAP[stripPrefix(vid)] || stripPrefix(vid), "Click from /podcast (grid)");
      } else if (vid.startsWith("auto-redirect:")) {
        push("redirect", VIDEO_MAP[stripPrefix(vid)] || stripPrefix(vid), "Redirect from /bio");
      } else if (vid === "auto-redirect") {
        push("redirect", "Auto-redirect", "Redirect from /bio");
      } else if (vid.startsWith("bio-click:")) {
        push("click", VIDEO_MAP[stripPrefix(vid)] || stripPrefix(vid), "Click from /bio");
      } else if (BUTTON_LABELS[vid]) {
        push("click", BUTTON_LABELS[vid].label, BUTTON_LABELS[vid].detail);
      } else {
        push("click", VIDEO_MAP[vid] || vid, "Click from /bio");
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

    return new Response(JSON.stringify({ feed: items.slice(0, 500), server_time: serverTime }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
