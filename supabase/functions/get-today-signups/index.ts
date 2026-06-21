import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const midnight = new Date();
    midnight.setUTCHours(0, 0, 0, 0);
    const sinceIso = midnight.toISOString();

    const [emailRes, courseRes] = await Promise.all([
      supabase
        .from("email_subscriptions")
        .select("email, first_name, created_at")
        .gte("created_at", sinceIso)
        .order("created_at", { ascending: true }),
      supabase
        .from("course_waitlist")
        .select("email, course_title, created_at")
        .gte("created_at", sinceIso)
        .order("created_at", { ascending: true }),
    ]);

    if (emailRes.error) throw emailRes.error;
    if (courseRes.error) throw courseRes.error;

    return new Response(
      JSON.stringify({
        email_signups: emailRes.data || [],
        course_signups: courseRes.data || [],
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("get-today-signups error:", err);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
