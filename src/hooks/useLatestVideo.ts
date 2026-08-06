import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface LatestVideo {
  videoId: string;
  title: string;
  thumbnail: string;
  viewCountText: string;
  publishedText: string;
  duration: string;
}

const withTimeout = (ms: number) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  return { signal: controller.signal, clear: () => clearTimeout(timer) };
};

export const useLatestVideo = () => {
  const [video, setVideo] = useState<LatestVideo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const liveFallback = async (): Promise<LatestVideo | null> => {
      const t = withTimeout(3000);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/youtube-videos?limit=1&fresh=1`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
              "Content-Type": "application/json",
            },
            signal: t.signal,
          }
        );
        if (!res.ok) return null;
        const data = await res.json();
        const v = data?.videos?.[0];
        if (!v) return null;
        return {
          videoId: v.videoId,
          title: v.title,
          thumbnail: v.thumbnail,
          viewCountText: v.viewCountText || v.viewCount || "",
          publishedText: v.publishedAt || "",
          duration: v.duration || "",
        };
      } catch {
        return null;
      } finally {
        t.clear();
      }
    };

    (async () => {
      setLoading(true);
      setError(null);

      let cached: LatestVideo | null = null;
      let dbErrMsg: string | null = null;
      let fresh = false;

      try {
        const { data, error: dbErr } = await supabase
          .from("latest_video_cache")
          .select("*")
          .eq("id", 1)
          .maybeSingle();

        if (dbErr) dbErrMsg = dbErr.message;

        if (data) {
          cached = {
            videoId: data.video_id,
            title: data.title,
            thumbnail: data.thumbnail_url,
            viewCountText: data.view_count_text || "",
            publishedText: data.published_text || "",
            duration: data.duration || "",
          };
          fresh = Date.now() - new Date(data.updated_at).getTime() < 60 * 60 * 1000;
        }
      } catch (e: any) {
        dbErrMsg = e?.message ?? "Failed to load latest video";
      }

      if (cancelled) return;

      // Always render whatever we have straight away — never block the UI on the network.
      if (cached) {
        setVideo(cached);
        setLoading(false);
      }

      if (!fresh) {
        const live = await liveFallback();
        if (cancelled) return;
        if (live) setVideo(live);
      }

      if (cancelled) return;
      if (!cached) {
        setError(dbErrMsg || "No video available");
      }
      setLoading(false);

      // Fire-and-forget: refresh the cache so the next visitor gets up-to-date data.
      try {
        const t = withTimeout(3000);
        fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/refresh-latest-video`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            "Content-Type": "application/json",
          },
          signal: t.signal,
        })
          .catch(() => {})
          .finally(() => t.clear());
      } catch {
        /* ignore */
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { video, loading, error };
};
