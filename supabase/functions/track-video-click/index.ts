import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

function pickCountry(req: Request): string | null {
  const h = req.headers;
  const candidates = [
    h.get('cf-ipcountry'),
    h.get('x-vercel-ip-country'),
    h.get('x-country-code'),
    h.get('x-nf-country'),
  ];
  for (const c of candidates) {
    if (c && c.length === 2 && c.toUpperCase() !== 'XX') return c.toUpperCase();
  }
  return null;
}

function clientIp(req: Request): string | null {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return req.headers.get('x-real-ip');
}

async function lookupCountry(ip: string | null): Promise<string | null> {
  if (!ip) return null;
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 800);
    const res = await fetch(`https://ipapi.co/${ip}/country/`, { signal: ctrl.signal });
    clearTimeout(t);
    if (!res.ok) return null;
    const txt = (await res.text()).trim();
    if (txt && txt.length === 2) return txt.toUpperCase();
  } catch {}
  return null;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    let videoId: string | undefined;
    const contentType = req.headers.get("content-type") || "";
    if (contentType.includes("application/json") || contentType.includes("text/plain")) {
      const text = await req.text();
      try {
        const parsed = JSON.parse(text);
        videoId = parsed.videoId;
      } catch {
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

    let country = pickCountry(req);
    if (!country) country = await lookupCountry(clientIp(req));

    await supabase.from("video_clicks").insert({ video_id: videoId, country });

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
