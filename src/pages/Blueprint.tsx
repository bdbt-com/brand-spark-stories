import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Target, Play } from "lucide-react";
import { Link } from "react-router-dom";
import EmailCaptureForm from "@/components/EmailCaptureForm";
import { getGuideUrl } from "@/data/guideMapping";
import { useDownloadCounts } from "@/hooks/useDownloadCounts";
import { supabase } from "@/integrations/supabase/client";
import { trackAndRedirect, trackVideoClick } from "@/lib/youtube-redirect";

const podcastEpisodes = [
  { videoId: "OjwSKAXveN8", title: "The Dangers of Screen-time Before Bed", views: "12.8K views" },
  { videoId: "ERXXO8mG5IY", title: "Why 70% of People Are Dehydrated...", views: "8.4K views" },
  { videoId: "bv27Bn6qWIo", title: "Why Most People Invest Completely Wrong", views: "5.7K views" },
];

const Blueprint = () => {
  const [showEmailForm, setShowEmailForm] = useState(true);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  // Auto-redirect to YouTube after 4 seconds of playing
  useEffect(() => {
    if (playingVideo === null) return;
    const episode = podcastEpisodes.find(e => e.videoId === playingVideo);
    if (!episode) return;
    const timer = setTimeout(() => {
      trackAndRedirect(episode.videoId);
      setPlayingVideo(null);
    }, 4000);
    return () => clearTimeout(timer);
  }, [playingVideo]);
  const guideUrl = getGuideUrl("BDBT Foundation Blueprint");
  const { data: downloadCounts } = useDownloadCounts();
  const blueprintCount = downloadCounts?.["BDBT Foundation Blueprint"] || 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary">
              Get your Free Copy of the Foundation Blueprint here:
            </h1>
          </div>

          {/* Side-by-side: Email form + Blueprint info card */}
          <div className="grid md:grid-cols-2 gap-8 items-start mb-8">
            {/* Email capture form */}
            {showEmailForm && guideUrl && (
              <Card className="border-2 border-primary/20 bg-background shadow-strong">
                <CardContent className="pt-6">
                  <EmailCaptureForm
                    title="BDBT Foundation Blueprint"
                    guideDownloadUrl={guideUrl}
                    onClose={() => setShowEmailForm(false)}
                    compact={false}
                    hideable={false}
                  />
                </CardContent>
              </Card>
            )}

            <Card className="group hover:shadow-strong transition-all duration-300 hover:-translate-y-2 relative overflow-hidden bg-gradient-subtle border-2 border-primary/20 hover:border-warning/30">
              {blueprintCount > 0 && (
                <span className="hidden absolute top-2 left-2 text-xs text-muted-foreground/40 font-mono z-10">
                  {blueprintCount}
                </span>
              )}
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                </div>
                <CardTitle className="text-2xl leading-snug group-hover:text-primary transition-colors text-center text-primary">
                  Big Daddy's Foundation Blueprint
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4 text-center">
                  <ul className="space-y-2 max-w-md mx-auto text-left">
                    {["Spot your Daily Drifts", "Find suggestions for Daily Wins", "Track your new habits", "Document your progress", "Your ultimate reference point for your BDBT journey"].map((item) => (
                      <li key={item} className="text-sm text-primary flex items-start">
                        <CheckCircle className="w-4 h-4 mr-3 mt-0.5 text-primary flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-medium text-primary text-center">Key Takeaways:</p>
                  <ul className="space-y-2 max-w-md mx-auto">
                    {["Momentum is greater than motivation", "A system that works even when your motivation doesn't", "Apply to your unique life", "Benefit from the positive ripple effects"].map((item) => (
                      <li key={item} className="text-sm text-primary flex items-start">
                        <CheckCircle className="w-4 h-4 mr-3 mt-0.5 text-primary flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* YouTube Podcast Episodes Section */}
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-primary mb-8">
              Top Podcast Episodes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center px-4">
              {podcastEpisodes.map((episode, index) => (
                <div
                  key={episode.videoId}
                  className={`rounded-2xl overflow-hidden shadow-medium bg-background border border-border/50 transition-all duration-300 hover:shadow-strong ${
                    index === 0 ? "md:order-2 md:scale-110 md:z-10" : index === 1 ? "md:order-1" : "md:order-3"
                  }`}
                >
                  {playingVideo === episode.videoId ? (
                    <div className="aspect-video">
                      <iframe
                        src={`https://www.youtube.com/embed/${episode.videoId}?autoplay=1`}
                        title={episode.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        className="w-full h-full"
                      />
                    </div>
                  ) : (
                    <div
                      className="relative w-full cursor-pointer"
                      onClick={() => {
                        setPlayingVideo(episode.videoId);
                        supabase.functions.invoke("track-video-click", { body: { videoId: episode.videoId } });
                      }}
                    >
                      <img
                        src={`https://img.youtube.com/vi/${episode.videoId}/hqdefault.jpg`}
                        alt={episode.title}
                        className="w-full aspect-video object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors">
                        <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center shadow-lg">
                          <Play className="w-7 h-7 text-primary-foreground ml-1" />
                        </div>
                      </div>
                    </div>
                  )}
                  <a href={`https://www.youtube.com/watch?v=${episode.videoId}`} target="_blank" rel="noopener noreferrer" className="block p-4 hover:bg-muted/50 transition-colors" onClick={(e) => { e.preventDefault(); trackAndRedirect(episode.videoId); }}>
                    <h3 className="font-semibold text-sm text-foreground line-clamp-2">{episode.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{episode.views}</p>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center bg-warning text-white rounded-2xl p-6 sm:p-12 border-4 border-warning/40">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">
              Start Building Your Foundation Today
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto px-4">
              With your blueprint in hand, explore the complete tip library to maximise your transformation.
            </p>
            <div className="flex justify-center">
              <Button variant="colored-bg" size="lg" asChild className="w-full sm:w-auto max-w-sm">
                <Link to="/tips">Explore All Tips</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blueprint;
