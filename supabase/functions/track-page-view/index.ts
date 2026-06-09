import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
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

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const body = await req.json();

    if (body.id && body.duration_seconds !== undefined) {
      const { error } = await supabase
        .from("page_views")
        .update({ duration_seconds: body.duration_seconds })
        .eq("id", body.id);

      if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (body.page_path && body.session_id) {
      let country = pickCountry(req);
      if (!country) country = await lookupCountry(clientIp(req));

      const insertData: any = {
        page_path: body.page_path,
        session_id: body.session_id,
        country,
      };
      if (body.referrer) insertData.referrer = body.referrer;

      const { data, error } = await supabase
        .from("page_views")
        .insert(insertData)
        .select("id")
        .single();

      if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ id: data.id }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
