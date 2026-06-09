import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

type StatRow = { visitors: number; bio_clicks: number; podcast_clicks: number; bio_redirects: number; podcast_redirects: number };

const blank = (): StatRow => ({ visitors: 0, bio_clicks: 0, podcast_clicks: 0, bio_redirects: 0, podcast_redirects: 0 });
const normalisePath = (path: string | null) => (path || "/").replace(/\/+$/, "") || "/";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const now = new Date();
    const todayMidnight = new Date(now);
    todayMidnight.setUTCHours(0, 0, 0, 0);
    const start = new Date(now.getTime() - 30 * 86400000);
    start.setUTCHours(0, 0, 0, 0);

    const [viewsRes, clicksRes] = await Promise.all([
      supabase
        .from("page_views")
        .select("session_id,page_path,entered_at")
        .gte("entered_at", start.toISOString())
        .order("entered_at", { ascending: false })
        .limit(20000),
      supabase
        .from("video_clicks")
        .select("video_id,clicked_at")
        .gte("clicked_at", start.toISOString())
        .order("clicked_at", { ascending: false })
        .limit(20000),
    ]);

    if (viewsRes.error) throw viewsRes.error;
    if (clicksRes.error) throw clicksRes.error;

    const dailySessions = new Map<string, { all: Set<string>; bio: Set<string>; podcast: Set<string> }>();
    const hourlySessions = new Map<string, { all: Set<string>; bio: Set<string>; podcast: Set<string> }>();
    const dailyClicks = new Map<string, { bio_redirects: number; podcast_redirects: number }>();
    const hourlyClicks = new Map<string, { bio_redirects: number; podcast_redirects: number }>();

    for (let d = new Date(start); d <= now; d.setUTCDate(d.getUTCDate() + 1)) {
      const key = d.toISOString().slice(0, 10);
      dailySessions.set(key, { all: new Set(), bio: new Set(), podcast: new Set() });
      dailyClicks.set(key, { bio_redirects: 0, podcast_redirects: 0 });
    }
    for (let h = new Date(todayMidnight); h <= now; h.setUTCHours(h.getUTCHours() + 1)) {
      const key = h.toISOString();
      hourlySessions.set(key, { all: new Set(), bio: new Set(), podcast: new Set() });
      hourlyClicks.set(key, { bio_redirects: 0, podcast_redirects: 0 });
    }

    for (const row of viewsRes.data || []) {
      if (!row.entered_at) continue;
      const ts = new Date(row.entered_at);
      const dayKey = ts.toISOString().slice(0, 10);
      const hour = new Date(ts);
      hour.setUTCMinutes(0, 0, 0);
      const hourKey = hour.toISOString();
      const sid = row.session_id || `anon:${row.entered_at}:${row.page_path}`;
      const path = normalisePath(row.page_path);

      const add = (bucket?: { all: Set<string>; bio: Set<string>; podcast: Set<string> }) => {
        if (!bucket) return;
        bucket.all.add(sid);
        if (path === "/bio" || path === "/links") bucket.bio.add(sid);
        if (path === "/podcast") bucket.podcast.add(sid);
      };
      add(dailySessions.get(dayKey));
      add(hourlySessions.get(hourKey));
    }

    for (const row of clicksRes.data || []) {
      if (!row.clicked_at) continue;
      const ts = new Date(row.clicked_at);
      const dayKey = ts.toISOString().slice(0, 10);
      const hour = new Date(ts);
      hour.setUTCMinutes(0, 0, 0);
      const hourKey = hour.toISOString();
      const add = (bucket?: { bio_redirects: number; podcast_redirects: number }) => {
        if (!bucket) return;
        if (row.video_id === "auto-redirect" || row.video_id?.startsWith("auto-redirect:")) bucket.bio_redirects += 1;
        if (row.video_id?.startsWith("latest-auto:")) bucket.podcast_redirects += 1;
      };
      add(dailyClicks.get(dayKey));
      add(hourlyClicks.get(hourKey));
    }

    const daily = Array.from(dailySessions.entries()).map(([day, sessions]) => {
      const clicks = dailyClicks.get(day) || { bio_redirects: 0, podcast_redirects: 0 };
      return { day, visitors: sessions.all.size, bio_clicks: sessions.bio.size, podcast_clicks: sessions.podcast.size, ...clicks };
    });

    const hourly = Array.from(hourlySessions.entries()).map(([hour, sessions]) => {
      const clicks = hourlyClicks.get(hour) || { bio_redirects: 0, podcast_redirects: 0 };
      return { hour, visitors: sessions.all.size, bio_clicks: sessions.bio.size, podcast_clicks: sessions.podcast.size, ...clicks };
    });

    return new Response(JSON.stringify({ daily, hourly }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});