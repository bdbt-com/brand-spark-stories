import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Play, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const VIDEO_MAP: Record<string, string> = {
  ERXXO8mG5IY: "Why 70% of People Are Dehydrated",
  OjwSKAXveN8: "Dangers of Screen-time Before Bed",
  TY1nkJsQtyw: "BDBT Explained",
};

interface Subscriber {
  email: string;
  first_name: string | null;
  created_at: string | null;
}

const AdminList = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [videoCounts, setVideoCounts] = useState<Record<string, number>>({});
  const [downloadCounts, setDownloadCounts] = useState<[string, number][]>([]);

  const fetchVideoCounts = useCallback(async () => {
    try {
      const { data } = await supabase.functions.invoke("get-video-clicks");
      if (data?.counts) setVideoCounts(data.counts);
    } catch {}
  }, []);

  const fetchDownloadCounts = useCallback(async () => {
    try {
      const { data } = await supabase.functions.invoke("get-download-counts");
      if (data?.counts) {
        const sorted = Object.entries(data.counts as Record<string, number>)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 10);
        setDownloadCounts(sorted);
      }
    } catch {}
  }, []);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const { data, error } = await supabase.functions.invoke("admin-email-stats");
        if (error) throw error;
        setSubscribers(data.subscribers || []);
      } catch (err: any) {
        setError(err.message || "Failed to load subscribers");
      } finally {
        setLoading(false);
      }
    };

    fetchSubscribers();
    fetchVideoCounts();
    fetchDownloadCounts();

    // Realtime subscription for video clicks
    const channel = supabase
      .channel("video-clicks-realtime")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "video_clicks" }, (payload) => {
        const videoId = payload.new?.video_id;
        if (videoId) {
          setVideoCounts((prev) => ({ ...prev, [videoId]: (prev[videoId] || 0) + 1 }));
        }
      })
      .subscribe();

    // Poll download counts every 30s
    const interval = setInterval(fetchDownloadCounts, 30000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(interval);
    };
  }, [fetchVideoCounts, fetchDownloadCounts]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto space-y-12">

        {/* Video Click Counters */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Play className="w-5 h-5 text-primary" /> Video Clicks
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(VIDEO_MAP).map(([videoId, title]) => (
              <Card key={videoId}>
                <CardContent className="p-5 text-center">
                  <img
                    src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
                    alt={title}
                    className="w-full aspect-video object-cover rounded-lg mb-3"
                  />
                  <p className="text-sm font-medium text-foreground mb-1 line-clamp-2">{title}</p>
                  <p className="text-3xl font-bold text-primary">{videoCounts[videoId] || 0}</p>
                  <p className="text-xs text-muted-foreground">clicks</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Top 10 Downloaded Tips */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-primary" /> Top 10 Downloaded Tips
          </h2>
          {downloadCounts.length === 0 ? (
            <p className="text-muted-foreground text-sm">No download data yet.</p>
          ) : (
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="grid grid-cols-[auto_1fr_auto] gap-2 p-3 bg-muted/30 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <span>#</span>
                <span>Guide Title</span>
                <span>Downloads</span>
              </div>
              {downloadCounts.map(([title, count], i) => (
                <div
                  key={title}
                  className="grid grid-cols-[auto_1fr_auto] gap-2 p-3 border-t border-border text-sm hover:bg-muted/20 transition-colors"
                >
                  <span className="text-muted-foreground font-mono w-6">{i + 1}</span>
                  <span className="text-foreground truncate">{title}</span>
                  <span className="text-primary font-semibold">{count}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Subscribers */}
        <section>
          <h1 className="text-2xl font-bold text-foreground mb-2">Email Subscribers</h1>
          <p className="text-muted-foreground mb-6">
            {subscribers.length} unique subscribers
          </p>

          <div className="border border-border rounded-lg overflow-hidden">
            <div className="grid grid-cols-[1fr_2fr_auto] gap-2 p-3 bg-muted/30 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <span>Name</span>
              <span>Email</span>
              <span>Date</span>
            </div>

            {subscribers.map((sub, i) => (
              <div
                key={i}
                className="grid grid-cols-[1fr_2fr_auto] gap-2 p-3 border-t border-border text-sm hover:bg-muted/20 transition-colors"
              >
                <span className="text-foreground truncate">{sub.first_name || "—"}</span>
                <span className="text-foreground truncate">{sub.email}</span>
                <span className="text-muted-foreground whitespace-nowrap">
                  {sub.created_at
                    ? new Date(sub.created_at).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "2-digit",
                      })
                    : "—"}
                </span>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default AdminList;
