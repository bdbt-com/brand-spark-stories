import { useEffect, useState } from "react";

export interface TopVideo {
  videoId: string;
  title: string;
  thumbnail: string;
  viewCountText: string;
  publishedText: string;
}


export const useTopVideos = (limit = 3) => {
  const [videos, setVideos] = useState<TopVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/youtube-videos?sort=views&limit=${limit}&fresh=1`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        if (cancelled) return;
        if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);
        setVideos(
          (data.videos || []).map((v: any) => ({
            videoId: v.videoId,
            title: v.title,
            thumbnail: v.thumbnail,
            viewCountText: v.viewCountText || v.viewCount || "",
          }))
        );
      } catch (e: any) {
        if (!cancelled) setError(e.message || "Failed to load videos");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [limit]);

  return { videos, loading, error };
};
