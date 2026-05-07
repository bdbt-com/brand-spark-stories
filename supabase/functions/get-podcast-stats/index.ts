import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const DEFAULT_IDS = [
  "OjwSKAXveN8",
  "pdjVnhCUwA8",
  "SioUIPf4Sls",
  "L6cqky7TLpE",
  "D4dzO5rfBfs",
  "EhpmrICLRK8",
];

function formatViews(count: string): string {
  const n = parseInt(count || "0", 10);
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M views`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K views`;
  return `${n} views`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const KEY = Deno.env.get("YOUTUBE_API_KEY");
    if (!KEY) {
      return new Response(JSON.stringify({ error: "YOUTUBE_API_KEY not set" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const url = new URL(req.url);
    const idsParam = url.searchParams.get("ids");
    const ids = idsParam ? idsParam.split(",").map(s => s.trim()).filter(Boolean) : DEFAULT_IDS;

    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${ids.join(",")}&key=${KEY}`;
    const res = await fetch(apiUrl);
    const data = await res.json();

    if (data.error) {
      return new Response(JSON.stringify({ error: data.error.message }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const map = new Map<string, { videoId: string; title: string; views: string }>();
    for (const item of data.items ?? []) {
      map.set(item.id, {
        videoId: item.id,
        title: item.snippet?.title ?? "",
        views: formatViews(item.statistics?.viewCount ?? "0"),
      });
    }

    const stats = ids.map(id => map.get(id) ?? { videoId: id, title: "", views: "" });

    return new Response(JSON.stringify({ stats }), {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
