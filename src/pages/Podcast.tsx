import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Play, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLatestVideo } from "@/hooks/useLatestVideo";
import { useYouTubeVideos } from "@/hooks/useYouTubeVideos";
import { useTopVideos } from "@/hooks/useTopVideos";
import { startTrackedRedirect, trackClick } from "@/lib/youtube-redirect";

const SPOTIFY_URL =
  "https://open.spotify.com/show/7AryqWOzeVCOC7WQ9wcBlk?si=2ede4b3121ea46c1&nd=1&dlsi=f03fd58680794b34";

const AUTO_REDIRECT_SECONDS = 10;

interface GridEpisode {
  videoId: string;
  title: string;
  thumbnail: string;
  viewCountText: string;
  duration?: string;
}

const Podcast = () => {
  const { video, loading } = useLatestVideo();
  const { videos: recentVideos } = useYouTubeVideos();
  const { videos: topVideos } = useTopVideos(3);
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

  // Idle-based auto-redirect: fires after AUTO_REDIRECT_SECONDS of no interaction
  useEffect(() => {
    if (!video || redirected) return;

    let timerId: number | undefined;
    const reset = () => {
      if (timerId) window.clearTimeout(timerId);
      timerId = window.setTimeout(() => {
        setRedirected(true);
        startTrackedRedirect(video.videoId, `latest-auto:${video.videoId}`);
      }, AUTO_REDIRECT_SECONDS * 1000);
    };

    const events: (keyof WindowEventMap)[] = [
      "mousemove",
      "mousedown",
      "keydown",
      "touchstart",
      "scroll",
      "wheel",
    ];
    events.forEach((e) => window.addEventListener(e, reset, { passive: true }));
    reset();

    return () => {
      if (timerId) window.clearTimeout(timerId);
      events.forEach((e) => window.removeEventListener(e, reset));
    };
  }, [video, redirected]);




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
            {/* Inactive social icons (Instagram, TikTok) above thumbnail */}
            <div className="flex items-center justify-center gap-5 sm:gap-6 pt-1" aria-hidden="true">
              <span className="text-foreground/30">
                <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </span>
              <span className="text-foreground/30">
                <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </span>
            </div>

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

export default Podcast;
