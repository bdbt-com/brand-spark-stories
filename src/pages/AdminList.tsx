import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Play, TrendingDown, BarChart3, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const VIDEO_MAP: Record<string, string> = {
  ERXXO8mG5IY: "Why 70% of People Are Dehydrated",
  OjwSKAXveN8: "Dangers of Screen-time Before Bed",
  TY1nkJsQtyw: "BDBT Explained",
};

interface AnalyticsPeriod {
  visitors: number;
  avg_duration: number;
}

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
  const [analytics, setAnalytics] = useState<Record<string, AnalyticsPeriod>>({});
  const [bioClicks, setBioClicks] = useState(0);
  const [bioReferrers, setBioReferrers] = useState<Record<string, number>>({});
  const [todaySubscribers, setTodaySubscribers] = useState(0);

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

  const fetchAnalytics = useCallback(async () => {
    try {
      const { data } = await supabase.functions.invoke("get-page-analytics");
      if (data?.analytics) setAnalytics(data.analytics);
      if (data?.bio_clicks !== undefined) setBioClicks(data.bio_clicks);
      if (data?.bio_referrers) setBioReferrers(data.bio_referrers);
    } catch {}
  }, []);

  const fetchSubscribers = useCallback(async () => {
    try {
      const { data, error } = await supabase.functions.invoke("admin-email-stats");
      if (error) throw error;
      setSubscribers(data.subscribers || []);
      setTodaySubscribers(data.today_count || 0);
    } catch (err: any) {
      setError(err.message || "Failed to load subscribers");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubscribers();
    fetchVideoCounts();
    fetchDownloadCounts();
    fetchAnalytics();

    const interval = setInterval(() => {
      fetchSubscribers();
      fetchVideoCounts();
      fetchDownloadCounts();
      fetchAnalytics();
    }, 15000);

    return () => clearInterval(interval);
  }, [fetchSubscribers, fetchVideoCounts, fetchDownloadCounts, fetchAnalytics]);

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

        {/* Today's Live Stats */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" /> Today — Live
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {(() => {
              const today = analytics["today"];
              const avgMins = today ? Math.floor(today.avg_duration / 60) : 0;
              const avgSecs = today ? today.avg_duration % 60 : 0;
              return (
                <>
                   <Card className="border-primary/30 bg-primary/5">
                    <CardContent className="p-5 text-center">
                      <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Visitors</p>
                      <p className="text-3xl font-bold text-primary">{today?.visitors || 0}</p>
                      <p className="text-xs text-muted-foreground mt-1">/bio clicks: {bioClicks}</p>
                      
                    </CardContent>
                  </Card>
                  <Card className="border-primary/30 bg-primary/5">
                    <CardContent className="p-5 text-center">
                      <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Avg Time</p>
                      <p className="text-3xl font-bold text-primary">
                        {avgMins > 0 ? `${avgMins}m ` : ""}{avgSecs}s
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-primary/30 bg-primary/5">
                    <CardContent className="p-5 text-center">
                      <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">New Subs</p>
                      <p className="text-3xl font-bold text-primary">{todaySubscribers}</p>
                    </CardContent>
                  </Card>
                </>
              );
            })()}
          </div>
        </section>

        {/* Bio Link Clicks */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" /> Bio Link Clicks
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Instagram", value: bioReferrers.instagram || 0 },
              { label: "TikTok", value: bioReferrers.tiktok || 0 },
              { label: "YouTube", value: bioReferrers.youtube || 0 },
            ].map(({ label, value }) => (
              <Card key={label}>
                <CardContent className="p-5 text-center">
                  <p className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">{label}</p>
                  <p className="text-3xl font-bold text-primary">{value}</p>
                  <p className="text-xs text-muted-foreground mt-1">clicks</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Page Analytics */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" /> Page Analytics
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { key: "7d", label: "Last 7 Days" },
              { key: "14d", label: "Last 14 Days" },
              { key: "30d", label: "Last 30 Days" },
              { key: "since_launch", label: "Since Launch" },
            ].map(({ key, label }) => {
              const period = analytics[key];
              const avgMins = period ? Math.floor(period.avg_duration / 60) : 0;
              const avgSecs = period ? period.avg_duration % 60 : 0;
              return (
                <Card key={key}>
                  <CardContent className="p-5 text-center">
                    <p className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">{label}</p>
                    <p className="text-3xl font-bold text-primary">{period?.visitors || 0}</p>
                    <p className="text-xs text-muted-foreground mb-2">visitors</p>
                    <div className="flex items-center justify-center gap-1 text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span className="text-xs">
                        {avgMins > 0 ? `${avgMins}m ` : ""}{avgSecs}s avg
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

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
          <div className="overflow-x-auto border border-border rounded-lg">
              <div className="grid grid-cols-[auto_1fr_auto] gap-2 p-2 md:p-3 bg-muted/30 text-xs font-semibold text-muted-foreground uppercase tracking-wider min-w-[300px]">
                <span>#</span>
                <span>Guide Title</span>
                <span>Downloads</span>
              </div>
              {downloadCounts.map(([title, count], i) => (
                <div
                  key={title}
                  className="grid grid-cols-[auto_1fr_auto] gap-2 p-2 md:p-3 border-t border-border text-xs md:text-sm hover:bg-muted/20 transition-colors min-w-[300px]"
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

          <div className="overflow-x-auto border border-border rounded-lg">
            <div className="grid grid-cols-[1fr_2fr_auto] gap-2 p-2 md:p-3 bg-muted/30 text-xs font-semibold text-muted-foreground uppercase tracking-wider min-w-[400px]">
              <span>Name</span>
              <span>Email</span>
              <span>Date</span>
            </div>

            {subscribers.map((sub, i) => (
              <div
                key={i}
                className="grid grid-cols-[1fr_2fr_auto] gap-2 p-2 md:p-3 border-t border-border text-xs md:text-sm hover:bg-muted/20 transition-colors min-w-[400px]"
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
