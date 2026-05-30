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

export const useLatestVideo = () => {
  const [video, setVideo] = useState<LatestVideo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const liveFallback = async (): Promise<LatestVideo | null> => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/youtube-videos?limit=1&fresh=1`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );
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
      }
    };

    (async () => {
      setLoading(true);
      setError(null);

      const { data, error: dbErr } = await supabase
        .from("latest_video_cache")
        .select("*")
        .eq("id", 1)
        .maybeSingle();

      let result: LatestVideo | null = null;

      const fresh =
        data && Date.now() - new Date(data.updated_at).getTime() < 24 * 60 * 60 * 1000;

      if (data && fresh) {
        result = {
          videoId: data.video_id,
          title: data.title,
          thumbnail: data.thumbnail_url,
          viewCountText: data.view_count_text || "",
          publishedText: data.published_text || "",
          duration: data.duration || "",
        };
      } else {
        result = await liveFallback();
        if (!result && data) {
          // Stale cache is better than nothing
          result = {
            videoId: data.video_id,
            title: data.title,
            thumbnail: data.thumbnail_url,
            viewCountText: data.view_count_text || "",
            publishedText: data.published_text || "",
            duration: data.duration || "",
          };
        }
      }

      if (cancelled) return;
      if (!result) setError(dbErr?.message || "No video available");
      setVideo(result);
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { video, loading, error };
};
