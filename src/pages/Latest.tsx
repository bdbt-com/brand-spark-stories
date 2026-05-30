import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLatestVideo } from "@/hooks/useLatestVideo";
import { startTrackedRedirect } from "@/lib/youtube-redirect";

const AUTO_REDIRECT_SECONDS = 15;

const Latest = () => {
  const { video, loading } = useLatestVideo();
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

  // Countdown + auto-redirect
  useEffect(() => {
    if (!video || redirected) return;
    if (secondsLeft <= 0) {
      goToVideo(true);
      return;
    }
    const t = setTimeout(() => {
      if (!document.hidden) setSecondsLeft((s) => s - 1);
    }, 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft, video, redirected]);

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl">
        {loading || !video ? (
          <div className="flex flex-col items-center gap-4 text-foreground/70">
            <div className="h-10 w-10 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
            <p className="text-sm">Loading today's episode…</p>
          </div>
        ) : (
          <article className="flex flex-col gap-5">
            {/* Thumbnail card */}
            <button
              type="button"
              onClick={() => goToVideo(false)}
              className="group relative block w-full overflow-hidden rounded-2xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label={`Watch ${video.title} on YouTube`}
            >
              <div className="relative aspect-video w-full">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="absolute inset-0 h-full w-full object-cover grayscale transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-20 w-28 items-center justify-center rounded-2xl bg-black/80 group-hover:bg-black/90 transition-colors">
                    <Play className="h-10 w-10 fill-white text-white" />
                  </span>
                </div>
                {video.duration && (
                  <span className="absolute bottom-2 right-2 rounded bg-black/85 px-1.5 py-0.5 text-xs font-medium text-white">
                    {video.duration}
                  </span>
                )}
              </div>
            </button>

            {/* Title + meta */}
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl md:text-3xl font-bold leading-tight text-primary">
                {video.title}
              </h1>
              <p className="text-sm text-foreground/60">
                {[video.viewCountText, video.publishedText].filter(Boolean).join(" · ") ||
                  "Daily Wins Podcast"}
              </p>
            </div>

            {/* CTA */}
            <Button
              size="lg"
              onClick={() => goToVideo(false)}
              className="w-full h-14 text-lg font-semibold"
            >
              <Play className="mr-2 h-5 w-5 fill-current" />
              Watch on YouTube
            </Button>

            <p className="text-center text-sm text-foreground/70">
              You'll be taken to YouTube to watch today's latest episode.
            </p>
            <p className="text-center text-xs text-foreground/40">
              Redirecting in {secondsLeft}s…
            </p>
          </article>
        )}
      </div>
    </main>
  );
};

export default Latest;
