import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { day, best_per_min } = await req.json();
    const dayStr = String(day || "").slice(0, 10);
    const value = Number(best_per_min);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dayStr) || !isFinite(value) || value <= 0) {
      return new Response(JSON.stringify({ error: "bad input" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Max-guarded upsert: only overwrite when incoming value is higher.
    const { data: existing } = await supabase
      .from("interaction_rate_records")
      .select("best_per_min")
      .eq("day", dayStr)
      .maybeSingle();

    const currentStored = Number(existing?.best_per_min || 0);
    if (value <= currentStored) {
      return new Response(JSON.stringify({ ok: true, kept: currentStored }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { error } = await supabase
      .from("interaction_rate_records")
      .upsert(
        { day: dayStr, best_per_min: value, recorded_at: new Date().toISOString() },
        { onConflict: "day" }
      );
    if (error) throw error;

    return new Response(JSON.stringify({ ok: true, saved: value }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
