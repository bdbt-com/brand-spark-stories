import { useEffect, useMemo, useState } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLatestVideo } from "@/hooks/useLatestVideo";
import { useYouTubeVideos } from "@/hooks/useYouTubeVideos";
import { useTopVideos } from "@/hooks/useTopVideos";
import { startTrackedRedirect } from "@/lib/youtube-redirect";

const AUTO_REDIRECT_SECONDS = 8;

interface GridEpisode {
  videoId: string;
  title: string;
  thumbnail: string;
  viewCountText: string;
  duration?: string;
}

const Latest = () => {
  const { video, loading } = useLatestVideo();
  const { videos: recentVideos } = useYouTubeVideos();
  const { videos: topVideos } = useTopVideos(3);
  const [secondsLeft, setSecondsLeft] = useState(AUTO_REDIRECT_SECONDS);
  const [redirected, setRedirected] = useState(false);

  // noindex this page
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex,nofollow";
    document.head.appendChild(meta);
    const originalTitle = document.title;
    document.title = "Latest Episode — Daily Wins";
    return () => {
      document.head.removeChild(meta);
      document.title = originalTitle;
    };
  }, []);

  const goToVideo = (auto = false) => {
    if (!video || redirected) return;
    setRedirected(true);
    const trackPrefix = auto ? "latest-auto" : "latest-page";
    startTrackedRedirect(video.videoId, `${trackPrefix}:${video.videoId}`);
  };

  const goToGridVideo = (videoId: string) => {
    setRedirected(true); // cancel hero countdown
    startTrackedRedirect(videoId, `latest-grid:${videoId}`);
  };

  // Countdown + auto-redirect — PAUSED
  useEffect(() => {
    // Auto-redirect paused during development
  }, []);

  // Build the 6-card grid: interleave [new1, top1, new2, top2, new3, top3]
  const gridEpisodes = useMemo<GridEpisode[]>(() => {
    const heroId = video?.videoId;
    const topIds = new Set(topVideos.map((t) => t.videoId));

    const recents: GridEpisode[] = [];
    for (const v of recentVideos) {
      if (recents.length >= 3) break;
      if (v.videoId === heroId) continue;
      if (topIds.has(v.videoId)) continue;
      recents.push({
        videoId: v.videoId,
        title: v.title,
        thumbnail: v.thumbnail,
        viewCountText: v.viewCount || "",
        duration: v.duration,
      });
    }

    const tops: GridEpisode[] = topVideos.map((t) => ({
      videoId: t.videoId,
      title: t.title,
      thumbnail: t.thumbnail,
      viewCountText: t.viewCountText || "",
    }));

    const interleaved: GridEpisode[] = [];
    for (let i = 0; i < 3; i++) {
      if (recents[i]) interleaved.push(recents[i]);
      if (tops[i]) interleaved.push(tops[i]);
    }

    const seen = new Set<string>();
    const out: GridEpisode[] = [];
    for (const e of interleaved) {
      if (seen.has(e.videoId)) continue;
      seen.add(e.videoId);
      out.push(e);
      if (out.length >= 6) break;
    }
    return out;
  }, [recentVideos, topVideos, video?.videoId]);

  return (
    <main className="min-h-[100dvh] bg-background flex flex-col items-center px-3 sm:px-4 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:pt-8">
      <div className="w-full max-w-2xl">
        {loading || !video ? (
          <div className="flex flex-col items-center gap-4 text-foreground/70 py-16">
            <div className="h-10 w-10 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
            <p className="text-sm">Loading today's episode…</p>
          </div>
        ) : (
          <article className="flex flex-col gap-3 sm:gap-5">
            {/* Thumbnail card */}
            <button
              type="button"
              onClick={() => goToVideo(false)}
              className="group relative block w-full overflow-hidden rounded-2xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary active:scale-[0.995] transition-transform"
              aria-label={`Watch ${video.title} on YouTube`}
            >
              <div className="relative aspect-video w-full">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-14 w-20 sm:h-20 sm:w-28 items-center justify-center rounded-2xl bg-black/80 group-hover:bg-black/90 transition-colors">
                    <Play className="h-7 w-7 sm:h-10 sm:w-10 fill-white text-white" />
                  </span>
                </div>
                {video.duration && (
                  <span className="absolute bottom-2 right-2 rounded bg-black/85 px-1.5 py-0.5 text-[11px] sm:text-xs font-medium text-white">
                    {video.duration}
                  </span>
                )}
              </div>
            </button>

            {/* Title + meta */}
            <div className="flex flex-col gap-1.5 sm:gap-2 px-0.5">
              <h1 className="text-lg sm:text-2xl md:text-3xl font-bold leading-snug text-primary break-words [text-wrap:balance]">
                {video.title}
              </h1>
              <p className="text-xs sm:text-sm text-foreground/60">
                {[video.viewCountText, video.publishedText].filter(Boolean).join(" · ") ||
                  "Daily Wins Podcast"}
              </p>
            </div>

            {/* CTA */}
            <Button
              size="lg"
              onClick={() => goToVideo(false)}
              className="w-full h-12 sm:h-14 text-base sm:text-lg font-semibold touch-manipulation"
            >
              <Play className="mr-2 h-5 w-5 fill-current" />
              Watch on YouTube
            </Button>

            <p className="text-center text-xs sm:text-sm text-foreground/70 px-2">
              You'll be taken to YouTube to watch today's latest episode.
            </p>
            <p className="text-center text-[11px] sm:text-xs text-foreground/40">
              {redirected ? "Opening…" : `Redirecting in ${secondsLeft}s…`}
            </p>
          </article>
        )}
      </div>

      {/* More episodes grid */}
      {gridEpisodes.length > 0 && (
        <section className="w-full max-w-5xl mt-8 sm:mt-14">
          <div className="flex items-center gap-3 mb-3 sm:mb-6">
            <span className="text-[11px] sm:text-sm font-semibold uppercase tracking-[0.18em] sm:tracking-[0.2em] text-primary">
              More episodes
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-4">
            {gridEpisodes.map((ep) => (
              <button
                key={ep.videoId}
                type="button"
                onClick={() => goToGridVideo(ep.videoId)}
                className="group flex flex-col gap-1.5 sm:gap-2 text-left focus:outline-none focus:ring-2 focus:ring-primary rounded-xl active:scale-[0.98] transition-transform touch-manipulation"
                aria-label={`Watch ${ep.title} on YouTube`}
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-lg sm:rounded-xl border border-border bg-card">
                  <img
                    src={ep.thumbnail}
                    alt={ep.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
                    <span className="flex h-8 w-11 sm:h-12 sm:w-16 items-center justify-center rounded-lg sm:rounded-xl bg-black/75 group-hover:bg-black/90 transition-colors">
                      <Play className="h-4 w-4 sm:h-6 sm:w-6 fill-white text-white" />
                    </span>
                  </div>
                  {ep.duration && (
                    <span className="absolute bottom-1 right-1 sm:bottom-1.5 sm:right-1.5 rounded bg-black/85 px-1 py-0.5 sm:px-1.5 text-[10px] sm:text-xs font-medium text-white">
                      {ep.duration}
                    </span>
                  )}
                </div>
                <h3 className="text-[13px] sm:text-base font-semibold leading-snug text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                  {ep.title}
                </h3>
                {ep.viewCountText && (
                  <p className="text-[11px] sm:text-xs text-foreground/50">{ep.viewCountText}</p>
                )}
              </button>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default Latest;
