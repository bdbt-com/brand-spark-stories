import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Play, TrendingDown, TrendingUp, BarChart3, Clock, MousePointerClick, ArrowRightLeft, UserPlus, Download, Activity, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useYouTubeVideos } from "@/hooks/useYouTubeVideos";
import { PINNED_TOP_VIDEOS } from "@/data/pinnedTopVideos";
import { AnimatedCounter } from "@/components/AnimatedCounter";

function calcTrend(current: number, currentDays: number, outer: number, outerDays: number): { pct: number; direction: 'up' | 'down' | 'flat' } {
  const prior = outer - current;
  const priorDays = outerDays - currentDays;
  if (priorDays <= 0 || prior <= 0) return { pct: 0, direction: 'flat' };
  const currentRate = current / currentDays;
  const priorRate = prior / priorDays;
  const pct = Math.round(((currentRate - priorRate) / priorRate) * 100);
  if (pct === 0) return { pct: 0, direction: 'flat' };
  return { pct: Math.abs(pct), direction: pct > 0 ? 'up' : 'down' };
}

function calcTodayTrend(today: number, sevenDay: number): { pct: number; direction: 'up' | 'down' | 'flat' } {
  const prior6 = sevenDay - today;
  if (prior6 <= 0) return { pct: 0, direction: 'flat' };
  const avg = prior6 / 6;
  const pct = Math.round(((today - avg) / avg) * 100);
  if (pct === 0) return { pct: 0, direction: 'flat' };
  return { pct: Math.abs(pct), direction: pct > 0 ? 'up' : 'down' };
}

function TodayTrendBadge({ today, sevenDay }: { today: number; sevenDay: number }) {
  const { pct, direction } = calcTodayTrend(today, sevenDay);
  if (direction === 'flat') return <span className="inline-flex items-center gap-0.5 text-[10px] text-muted-foreground"><Minus className="w-2.5 h-2.5" />—</span>;
  const isUp = direction === 'up';
  return (
    <span className={`inline-flex items-center gap-0.5 text-[10px] font-semibold ${isUp ? 'text-green-500' : 'text-red-500'}`}>
      {isUp ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
      {pct}%
    </span>
  );
}

function TrendBadge({ current, currentDays, outer, outerDays }: { current: number; currentDays: number; outer: number; outerDays: number }) {
  const { pct, direction } = calcTrend(current, currentDays, outer, outerDays);
  if (direction === 'flat') return <span className="inline-flex items-center gap-0.5 text-[10px] text-muted-foreground"><Minus className="w-2.5 h-2.5" />—</span>;
  const isUp = direction === 'up';
  return (
    <span className={`inline-flex items-center gap-0.5 text-[10px] font-semibold ${isUp ? 'text-green-500' : 'text-red-500'}`}>
      {isUp ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
      {pct}%
    </span>
  );
}

function InlineGraph({ data, dataKey, label, color, hourly, dataKey2, color2, label2 }: { data: any[]; dataKey: string; label: string; color: string; hourly?: boolean; dataKey2?: string; color2?: string; label2?: string }) {
  return (
    <Card className="w-full xl:w-80 flex-shrink-0">
      <CardContent className="p-3">
        <p className="text-[10px] font-medium text-muted-foreground mb-1 uppercase tracking-wider flex items-center gap-2">
          <span className="inline-flex items-center gap-1"><span className="inline-block w-2 h-2 rounded-full" style={{ background: color }} />{label}</span>
          {dataKey2 && label2 && (
            <span className="inline-flex items-center gap-1"><span className="inline-block w-2 h-2 rounded-full" style={{ background: color2 }} />{label2}</span>
          )}
        </p>
        <div className="h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis
                dataKey={hourly ? "hour" : "day"}
                tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }}
                tickFormatter={(v: string) => {
                  if (hourly) {
                    const d = new Date(v);
                    const h = d.getUTCHours();
                    const suffix = h >= 12 ? 'pm' : 'am';
                    const h12 = h % 12 || 12;
                    return `${h12}${suffix}`;
                  }
                  return new Date(v).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
                }}
                interval="preserveStartEnd"
                minTickGap={hourly ? 20 : 30}
              />
              <YAxis tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }} width={30} allowDecimals={false} />
              <Tooltip
                contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "11px" }}
                labelFormatter={(v: string) => {
                  if (hourly) {
                    const d = new Date(v);
                    const h = d.getUTCHours();
                    const suffix = h >= 12 ? 'pm' : 'am';
                    const h12 = h % 12 || 12;
                    return `${h12}:00${suffix}`;
                  }
                  return new Date(v).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
                }}
              />
              <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={1.5} dot={false} activeDot={{ r: 3, strokeWidth: 0 }} />
              {dataKey2 && (
                <Line type="monotone" dataKey={dataKey2} stroke={color2} strokeWidth={1.5} dot={false} activeDot={{ r: 3, strokeWidth: 0 }} />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

const VIDEO_MAP: Record<string, string> = {
  cfLHVIIp4o0: "Build a Life You Don't Need to Escape From",
  pdjVnhCUwA8: "Daily Wins Podcast 120 - You Service Your Car But Not Your Own Body",
  SioUIPf4Sls: "Daily Wins Podcast 118 - Intentional Comfort vs Default Comfort",
  L6cqky7TLpE: "Daily Wins Podcast 115 - Why a £10 Decision is Actually a £100,000 Decision",
  D4dzO5rfBfs: "Daily Wins Podcast 112 - Why Choosing Discomfort Feels So Hard",
  EhpmrICLRK8: "Daily Wins Podcast 113 - Why Challenging Social Norms Polarises People",
};

const PREVIOUS_VIDEO_MAP: Record<string, string> = {
  OjwSKAXveN8: "Dangers of Screen-time Before Bed",
  "-3_zj_Q_1kI": "Reduce Decision Fatigue Wherever Possible",
  TJTe4wtW158: "Skip for 5 Minutes Daily",
  WNf06ZLUIJw: "Expose Yourself to Sunlight Daily",
  pRRSGS7eLJM: "Capitalise on Benefits Offered by Your Employer",
  zz2rVKKt1l0: "Go Exploring",
  "-a4NbW5Y718": "If You Know You're Capable of More",
  ERXXO8mG5IY: "Why 70% of People Are Dehydrated",
  bv27Bn6qWIo: "Why Most People Invest Completely Wrong",
  vPd9pieng58: "Read For 20 Minutes Every Day",
  Irm5oIb5ySo: "Connect with More Animals",
};

interface AnalyticsPeriod {
  visitors: number;
  avg_duration: number;
  live_visitors?: number;
}

interface Subscriber {
  email: string;
  first_name: string | null;
  created_at: string | null;
}

interface FeedItem {
  type: "click" | "redirect" | "signup" | "download";
  label: string;
  detail: string;
  timestamp: string;
}

const FEED_CONFIG: Record<string, { icon: typeof Play; color: string; bg: string; label: string }> = {
  click: { icon: MousePointerClick, color: "text-blue-400", bg: "bg-blue-500/10", label: "Clicks" },
  redirect: { icon: ArrowRightLeft, color: "text-orange-400", bg: "bg-orange-500/10", label: "Redirects" },
  signup: { icon: UserPlus, color: "text-green-400", bg: "bg-green-500/10", label: "Signups" },
  download: { icon: Download, color: "text-purple-400", bg: "bg-purple-500/10", label: "Downloads" },
};

type FeedFilter = "all" | "click" | "redirect" | "signup" | "download";

function timeAgo(ts: string): string {
  const diff = Date.now() - new Date(ts).getTime();
  if (diff < 60000) return "just now";
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return `${Math.floor(diff / 86400000)}d ago`;
}

const FeedFilterBar = ({
  filter,
  setFilter,
  counts,
}: {
  filter: FeedFilter;
  setFilter: (f: FeedFilter) => void;
  counts: Record<string, number>;
}) => {
  const options: FeedFilter[] = ["all", "click", "redirect", "signup", "download"];
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => {
        const isActive = filter === opt;
        const label = opt === "all" ? "All" : FEED_CONFIG[opt].label;
        const count = counts[opt] || 0;
        return (
          <button
            key={opt}
            onClick={() => setFilter(opt)}
            className={`text-[10px] px-2 py-1 rounded-md border transition-colors ${
              isActive
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-muted/30 text-muted-foreground border-border hover:bg-muted/60"
            }`}
          >
            {label} <span className="opacity-70">{count}</span>
          </button>
        );
      })}
    </div>
  );
};

const AdminList = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [videoCounts, setVideoCounts] = useState<Record<string, { total: number; today: number; "7d": number; "14d": number; "30d": number }>>({});
  const [downloadCounts, setDownloadCounts] = useState<[string, number][]>([]);
  const [analytics, setAnalytics] = useState<Record<string, AnalyticsPeriod>>({});
  const [bioClicks, setBioClicks] = useState<Record<string, number>>({});
  const [podcastClicks, setPodcastClicks] = useState<Record<string, number>>({});
  const [todaySubscribers, setTodaySubscribers] = useState(0);
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [dailyStats, setDailyStats] = useState<{ day: string; visitors: number; bio_clicks: number; podcast_clicks: number; bio_redirects: number; podcast_redirects: number }[]>([]);
  const [hourlyStats, setHourlyStats] = useState<{ hour: string; visitors: number; bio_clicks: number; podcast_clicks: number; bio_redirects: number; podcast_redirects: number }[]>([]);
  const [feedFilter, setFeedFilter] = useState<FeedFilter>("all");
  const [liveTick, setLiveTick] = useState<{
    visitors_today: number;
    subscribers_today: number;
    bio_clicks_today: number;
    podcast_clicks_today: number;
    bio_redirects_today: number;
    podcast_redirects_today: number;
    total_clicks_today: number;
  } | null>(null);
  const [graphRange, setGraphRange] = useState<'today' | '7d' | '14d' | '30d' | 'all'>('all');
  const [showPreviousVideos, setShowPreviousVideos] = useState(false);
  const { videos: ytVideos } = useYouTubeVideos();
  const latestVideo = ytVideos[0];
  const latestVideoId = latestVideo?.videoId;
  const filteredDailyStats = useMemo(() => {
    if (graphRange === 'all') return dailyStats;
    const days = graphRange === 'today' ? 1 : graphRange === '7d' ? 7 : graphRange === '14d' ? 14 : 30;
    return dailyStats.slice(-days);
  }, [dailyStats, graphRange]);

  const filteredFeed = useMemo(
    () => (feedFilter === "all" ? feed : feed.filter((f) => f.type === feedFilter)),
    [feed, feedFilter]
  );
  const feedCounts = useMemo(() => {
    const counts: Record<string, number> = { all: feed.length };
    for (const item of feed) counts[item.type] = (counts[item.type] || 0) + 1;
    return counts;
  }, [feed]);

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
      if (data?.bio_clicks) setBioClicks(data.bio_clicks);
      if (data?.podcast_clicks) setPodcastClicks(data.podcast_clicks);
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

  const lastFeedSince = useRef<string | null>(null);
  const feedItemKeys = useRef<Set<string>>(new Set());
  const seenKeysAtRender = useRef<Set<string>>(new Set());

  const feedKey = (item: FeedItem) =>
    `${item.type}:${item.timestamp}:${item.label}:${item.detail}`;

  const fetchFeed = useCallback(async () => {
    try {
      const { data } = await supabase.functions.invoke("get-activity-feed", { body: {} });
      if (data?.feed) {
        const items: FeedItem[] = data.feed;
        feedItemKeys.current = new Set(items.map(feedKey));
        setFeed(items);
      }
      if (data?.server_time) lastFeedSince.current = data.server_time;
    } catch {}
  }, []);

  const fetchFeedIncremental = useCallback(async () => {
    if (!lastFeedSince.current) return;
    if (typeof document !== "undefined" && document.visibilityState === "hidden") return;
    try {
      const { data } = await supabase.functions.invoke("get-activity-feed", {
        body: { since: lastFeedSince.current },
      });
      if (data?.server_time) lastFeedSince.current = data.server_time;
      const incoming: FeedItem[] = data?.feed || [];
      if (incoming.length === 0) return;
      const fresh: FeedItem[] = [];
      for (const item of incoming) {
        const k = feedKey(item);
        if (feedItemKeys.current.has(k)) continue;
        feedItemKeys.current.add(k);
        fresh.push(item);
      }
      if (fresh.length === 0) return;
      setFeed((prev) => {
        const merged = [...fresh, ...prev];
        merged.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        const capped = merged.slice(0, 500);
        // prune dedupe set to capped keys to bound memory
        feedItemKeys.current = new Set(capped.map(feedKey));
        return capped;
      });
    } catch {}
  }, []);

  const fetchDailyStats = useCallback(async () => {
    try {
      const { data } = await supabase.functions.invoke("get-daily-stats");
      if (data?.daily) setDailyStats(data.daily);
      if (data?.hourly) setHourlyStats(data.hourly);
    } catch {}
  }, []);

  useEffect(() => {
    fetchSubscribers();
    fetchVideoCounts();
    fetchDownloadCounts();
    fetchAnalytics();
    fetchFeed();
    fetchDailyStats();

    const slow = setInterval(() => {
      fetchSubscribers();
      fetchVideoCounts();
      fetchDownloadCounts();
      fetchAnalytics();
    }, 15000);

    const fast = setInterval(() => {
      fetchFeedIncremental();
    }, 1000);

    const onVisible = () => {
      if (document.visibilityState === "visible") fetchFeedIncremental();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      clearInterval(slow);
      clearInterval(fast);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [fetchSubscribers, fetchVideoCounts, fetchDownloadCounts, fetchAnalytics, fetchFeed, fetchFeedIncremental, fetchDailyStats]);

  // Track which feed keys were rendered last paint so we can animate only new ones
  useEffect(() => {
    seenKeysAtRender.current = new Set(feed.map(feedKey));
  }, [feed]);

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

      {/* Mobile-only compact live feed */}
      <div className="lg:hidden max-w-7xl mx-auto mb-6">
        <Card className="border-primary/20">
          <CardContent className="p-3">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-bold text-foreground">Last 24 Hours</span>
              <span className="text-[10px] text-muted-foreground">({filteredFeed.length}/{feed.length})</span>
              <span className="relative flex h-2 w-2 ml-auto">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
            </div>
            <FeedFilterBar filter={feedFilter} setFilter={setFeedFilter} counts={feedCounts} />
            <div className="max-h-60 overflow-y-auto pr-1 mt-2">
              {filteredFeed.length === 0 ? (
                <p className="text-[10px] text-muted-foreground text-center py-2">No recent activity</p>
              ) : (
                filteredFeed.map((item, i) => {
                  const config = FEED_CONFIG[item.type] || FEED_CONFIG.click;
                  const Icon = config.icon;
                  const k = feedKey(item);
                  const isNew = !seenKeysAtRender.current.has(k);
                  return (
                    <div
                      key={`mobile-${k}`}
                      className={`flex items-center gap-2 py-1.5 border-t border-border/30 ${isNew ? 'animate-in fade-in slide-in-from-top-1 duration-300' : ''}`}
                    >
                      <div className={`p-1 rounded ${config.bg} flex-shrink-0`}>
                        <Icon className={`w-3 h-3 ${config.color}`} />
                      </div>
                      <span className="text-[11px] font-medium text-foreground truncate">{item.detail}</span>
                      <span className="text-[10px] text-muted-foreground truncate">{item.label}</span>
                      <span className="text-[10px] text-muted-foreground whitespace-nowrap ml-auto flex-shrink-0">
                        {timeAgo(item.timestamp)}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="max-w-[120rem] mx-auto flex gap-6">

        {/* Main column */}
        <div className="flex-1 min-w-0 space-y-12">

          {/* Graph range toggle */}
          {filteredDailyStats.length > 0 && (
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold text-foreground uppercase tracking-wider">Graph Range:</span>
              <div className="flex gap-1">
                {(['today', '7d', '14d', '30d', 'all'] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setGraphRange(r)}
                    className={`px-2.5 py-1 text-[10px] font-semibold rounded-md transition-colors ${
                      graphRange === r
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {r === 'all' ? 'All Time' : r === 'today' ? 'Today' : r.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          )}

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
                        <p className="text-3xl font-bold text-foreground inline-flex items-center gap-2 justify-center">{today?.visitors || 0} <TodayTrendBadge today={today?.live_visitors ?? today?.visitors ?? 0} sevenDay={analytics["7d"]?.live_visitors ?? analytics["7d"]?.visitors ?? 0} /></p>
                        <p className="text-xs text-muted-foreground mt-1 inline-flex items-center gap-1 justify-center">/bio clicks: {bioClicks.today || 0} <TodayTrendBadge today={bioClicks.today || 0} sevenDay={bioClicks["7d"] || 0} /></p>
                      </CardContent>
                    </Card>
                    <Card className="border-primary/30 bg-primary/5">
                      <CardContent className="p-5 text-center">
                        <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Avg Time</p>
                        <p className="text-3xl font-bold text-foreground">
                          {avgMins > 0 ? `${avgMins}m ` : ""}{avgSecs}s
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="border-primary/30 bg-primary/5">
                      <CardContent className="p-5 text-center">
                        <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">New Subs</p>
                        <p className="text-3xl font-bold text-foreground">{todaySubscribers}</p>
                      </CardContent>
                    </Card>
                  </>
                );
              })()}
            </div>
          </section>

          {/* Page Analytics — graph inline */}
          <section>
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" /> Page Analytics
            </h2>
            <div className="flex flex-col xl:flex-row gap-4">
              {(graphRange === 'today' ? hourlyStats.length > 0 : filteredDailyStats.length > 0) && (
                <InlineGraph data={graphRange === 'today' ? hourlyStats : filteredDailyStats} dataKey="visitors" label="Visitors" color="hsl(var(--primary))" hourly={graphRange === 'today'} />
              )}
              <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { key: "7d", label: "Last 7 Days", days: 7, outerKey: "14d", outerDays: 14 },
                  { key: "14d", label: "Last 14 Days", days: 14, outerKey: "30d", outerDays: 30 },
                  { key: "30d", label: "Last 30 Days", days: 30, outerKey: "since_launch", outerDays: Math.round((Date.now() - new Date("2024-12-28").getTime()) / 86400000) },
                  { key: "since_launch", label: "Since Launch", days: 0, outerKey: null, outerDays: 0 },
                ].map(({ key, label, days, outerKey, outerDays }) => {
                  const period = analytics[key];
                  const avgMins = period ? Math.floor(period.avg_duration / 60) : 0;
                  const avgSecs = period ? period.avg_duration % 60 : 0;
                  const outer = outerKey ? analytics[outerKey] : null;
                  const liveVal = period?.live_visitors ?? 0;
                  const outerLiveVal = outer?.live_visitors ?? 0;
                  return (
                    <Card key={key}>
                      <CardContent className="p-5 text-center">
                        <p className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">{label}</p>
                        <p className="text-3xl font-bold text-foreground">{period?.visitors || 0}</p>
                        <div className="flex items-center justify-center gap-1 mb-2">
                          <p className="text-xs text-muted-foreground">visitors</p>
                          {outer && days > 0 && <TrendBadge current={liveVal} currentDays={days} outer={outerLiveVal} outerDays={outerDays} />}
                        </div>
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
            </div>
          </section>

          {/* Bio Link Clicks — graph inline */}
          <section>
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" /> Bio & Podcast Link Clicks
            </h2>
            <div className="flex flex-col xl:flex-row gap-4">
              {(graphRange === 'today' ? hourlyStats.length > 0 : filteredDailyStats.length > 0) && (
                <InlineGraph
                  data={graphRange === 'today' ? hourlyStats : filteredDailyStats}
                  dataKey="bio_clicks"
                  label="/bio"
                  color="hsl(142, 71%, 45%)"
                  dataKey2="podcast_clicks"
                  label2="/podcast"
                  color2="hsl(210, 90%, 60%)"
                  hourly={graphRange === 'today'}
                />
              )}
              <div className="flex-1 grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { label: "Today", bio: bioClicks.today || 0, pod: podcastClicks.today || 0, isToday: true, bioSeven: bioClicks["7d"] || 0, podSeven: podcastClicks["7d"] || 0, days: 0, bioOuter: 0, podOuter: 0, outerDays: 0 },
                  { label: "7 Days", bio: bioClicks["7d"] || 0, pod: podcastClicks["7d"] || 0, isToday: false, bioSeven: 0, podSeven: 0, days: 7, bioOuter: bioClicks["14d"] || 0, podOuter: podcastClicks["14d"] || 0, outerDays: 14 },
                  { label: "14 Days", bio: bioClicks["14d"] || 0, pod: podcastClicks["14d"] || 0, isToday: false, bioSeven: 0, podSeven: 0, days: 14, bioOuter: bioClicks["30d"] || 0, podOuter: podcastClicks["30d"] || 0, outerDays: 30 },
                  { label: "30 Days", bio: bioClicks["30d"] || 0, pod: podcastClicks["30d"] || 0, isToday: false, bioSeven: 0, podSeven: 0, days: 30, bioOuter: bioClicks["30d"] || 0, podOuter: podcastClicks["30d"] || 0, outerDays: 30 },
                  { label: "Total", bio: bioClicks.since_launch || 0, pod: podcastClicks.since_launch || 0, isToday: false, bioSeven: 0, podSeven: 0, days: 0, bioOuter: 0, podOuter: 0, outerDays: 0 },
                ].map(({ label, bio, pod, isToday, bioSeven, podSeven, days, bioOuter, podOuter, outerDays }) => (
                  <Card key={label}>
                    <CardContent className="p-4 text-center">
                      <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">{label}</p>
                      {/* Bio (top) */}
                      <div>
                        <p className="text-2xl font-bold text-foreground inline-flex items-center gap-1.5 justify-center">
                          <span className="inline-block w-2 h-2 rounded-full" style={{ background: "hsl(142, 71%, 45%)" }} />
                          {bio}
                          {isToday && <TodayTrendBadge today={bio} sevenDay={bioSeven} />}
                        </p>
                        <div className="flex items-center justify-center gap-1">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">/bio</p>
                          {!isToday && days > 0 && outerDays > 0 && days < 30 && <TrendBadge current={bio} currentDays={days} outer={bioOuter} outerDays={outerDays} />}
                        </div>
                      </div>
                      <div className="border-t border-border my-2" />
                      {/* Podcast (bottom) */}
                      <div>
                        <p className="text-2xl font-bold text-foreground inline-flex items-center gap-1.5 justify-center">
                          <span className="inline-block w-2 h-2 rounded-full" style={{ background: "hsl(210, 90%, 60%)" }} />
                          {pod}
                          {isToday && <TodayTrendBadge today={pod} sevenDay={podSeven} />}
                        </p>
                        <div className="flex items-center justify-center gap-1">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">/podcast</p>
                          {!isToday && days > 0 && outerDays > 0 && days < 30 && <TrendBadge current={pod} currentDays={days} outer={podOuter} outerDays={outerDays} />}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Auto-Redirect Stats — graph inline */}
          <section>
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Play className="w-5 h-5 text-primary" /> /bio Redirects &amp; /podcast Redirects
            </h2>
            <div className="flex flex-col gap-4">
              {/* Row 1: graph + 5 stat tiles (mirrors Bio row above) */}
              {(() => {
                const sum = (pred: (k: string) => boolean) => {
                  const acc: Record<string, number> = { total: 0, today: 0, "7d": 0, "14d": 0, "30d": 0 };
                  for (const [k, v] of Object.entries(videoCounts)) {
                    if (!pred(k)) continue;
                    acc.total += v.total || 0;
                    acc.today += v.today || 0;
                    acc["7d"] += v["7d"] || 0;
                    acc["14d"] += v["14d"] || 0;
                    acc["30d"] += v["30d"] || 0;
                  }
                  return acc;
                };
                const br = sum((k) => k === "auto-redirect" || k.startsWith("auto-redirect:")); // /bio redirects
                const pr = sum((k) => k.startsWith("latest-auto:")); // /podcast redirects
                const trackingDays = Math.max(1, Math.round((Date.now() - new Date("2026-03-04").getTime()) / 86400000));
                const tiles = [
                  { label: "Today", topVal: br.today, botVal: pr.today, isToday: true, topSeven: br["7d"], botSeven: pr["7d"], days: 0, topOuter: 0, botOuter: 0, outerDays: 0 },
                  { label: "7 Days", topVal: br["7d"], botVal: pr["7d"], isToday: false, topSeven: 0, botSeven: 0, days: 7, topOuter: br["14d"], botOuter: pr["14d"], outerDays: 14 },
                  { label: "14 Days", topVal: br["14d"], botVal: pr["14d"], isToday: false, topSeven: 0, botSeven: 0, days: 14, topOuter: br["30d"], botOuter: pr["30d"], outerDays: 30 },
                  { label: "30 Days", topVal: br["30d"], botVal: pr["30d"], isToday: false, topSeven: 0, botSeven: 0, days: 30, topOuter: br.total, botOuter: pr.total, outerDays: trackingDays },
                  { label: "Total", topVal: br.total, botVal: pr.total, isToday: false, topSeven: 0, botSeven: 0, days: 0, topOuter: 0, botOuter: 0, outerDays: 0 },
                ];
                const lc = latestVideoId ? (videoCounts[`auto-redirect:${latestVideoId}`] || videoCounts[`latest-auto:${latestVideoId}`] || videoCounts[latestVideoId] || { total: 0, today: 0, "7d": 0, "14d": 0, "30d": 0 }) : null;
                return (
                  <>
                    <div className="flex flex-col xl:flex-row gap-4">
                      {(graphRange === 'today' ? hourlyStats.length > 0 : filteredDailyStats.length > 0) && (
                        <InlineGraph
                          data={graphRange === 'today' ? hourlyStats : filteredDailyStats}
                          dataKey="bio_redirects"
                          label="/bio redirects"
                          color="hsl(25, 95%, 53%)"
                          dataKey2="podcast_redirects"
                          label2="/podcast redirects"
                          color2="hsl(210, 90%, 60%)"
                          hourly={graphRange === 'today'}
                        />
                      )}
                      <div className="flex-1 grid grid-cols-2 md:grid-cols-5 gap-4">
                        {tiles.map(({ label, topVal, botVal, isToday, topSeven, botSeven, days, topOuter, botOuter, outerDays }) => (
                          <Card key={label}>
                            <CardContent className="p-4 text-center">
                              <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">{label}</p>
                              <div>
                                <p className="text-2xl font-bold text-foreground inline-flex items-center gap-1.5 justify-center">
                                  <span className="inline-block w-2 h-2 rounded-full" style={{ background: "hsl(25, 95%, 53%)" }} />
                                  {topVal}
                                  {isToday && <TodayTrendBadge today={topVal} sevenDay={topSeven} />}
                                </p>
                                <div className="flex items-center justify-center gap-1">
                                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">/bio redirects</p>
                                  {!isToday && days > 0 && outerDays > days && <TrendBadge current={topVal} currentDays={days} outer={topOuter} outerDays={outerDays} />}
                                </div>
                              </div>
                              <div className="border-t border-border my-2" />
                              <div>
                                <p className="text-2xl font-bold text-foreground inline-flex items-center gap-1.5 justify-center">
                                  <span className="inline-block w-2 h-2 rounded-full" style={{ background: "hsl(210, 90%, 60%)" }} />
                                  {botVal}
                                  {isToday && <TodayTrendBadge today={botVal} sevenDay={botSeven} />}
                                </p>
                                <div className="flex items-center justify-center gap-1">
                                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">/podcast redirects</p>
                                  {!isToday && days > 0 && outerDays > days && <TrendBadge current={botVal} currentDays={days} outer={botOuter} outerDays={outerDays} />}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* Row 2: compact Latest Video Redirects card under the graph */}
                    <Card className="border-primary/30 bg-primary/5 max-w-sm">
                      <CardContent className="p-3">
                        <p className="text-[10px] font-medium text-muted-foreground mb-2 uppercase tracking-wider text-center">Latest Video Redirects</p>
                        {!latestVideoId || !lc ? (
                          <p className="text-xs text-muted-foreground text-center py-4">Loading latest video…</p>
                        ) : (
                          <div className="flex gap-3">
                            <img
                              src={`https://img.youtube.com/vi/${latestVideoId}/mqdefault.jpg`}
                              alt={latestVideo?.title || ""}
                              className="w-32 aspect-video object-cover rounded-md flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-[11px] font-medium text-foreground line-clamp-2 mb-1">{latestVideo?.title}</p>
                              <p className="text-2xl font-bold text-foreground inline-flex items-center gap-1.5">
                                {lc.today} <TodayTrendBadge today={lc.today} sevenDay={lc["7d"]} />
                              </p>
                              <p className="text-[10px] text-muted-foreground mb-1">today</p>
                              <div className="grid grid-cols-4 gap-x-1 text-[10px] text-muted-foreground">
                                <div className="flex flex-col items-center">
                                  <span className="font-semibold text-primary">{lc["7d"]}</span>
                                  <span>7d</span>
                                </div>
                                <div className="flex flex-col items-center">
                                  <span className="font-semibold text-primary">{lc["14d"]}</span>
                                  <span>14d</span>
                                </div>
                                <div className="flex flex-col items-center">
                                  <span className="font-semibold text-primary">{lc["30d"]}</span>
                                  <span>30d</span>
                                </div>
                                <div className="flex flex-col items-center">
                                  <span className="font-semibold text-primary">{lc.total}</span>
                                  <span>Total</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </>
                );
              })()}
            </div>
          </section>

          {/* Bio Button Clicks */}
          <section>
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <MousePointerClick className="w-5 h-5 text-primary" /> Bio Button Clicks
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {[
                { id: "button-blueprint", label: "Blueprint" },
                { id: "button-youtube", label: "YouTube" },
                { id: "button-spotify", label: "Spotify" },
              ].map(({ id, label }) => {
                const c = videoCounts[id] || { total: 0, today: 0, "7d": 0, "14d": 0, "30d": 0 };
                return (
                  <Card key={id}>
                    <CardContent className="p-5 text-center">
                      <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">{label}</p>
                      <p className="text-3xl font-bold text-foreground inline-flex items-center gap-2 justify-center">{c.today} <TodayTrendBadge today={c.today} sevenDay={c["7d"]} /></p>
                      <p className="text-[10px] text-muted-foreground mb-1">today</p>
                      {(() => { const trackingDays = Math.max(1, Math.round((Date.now() - new Date("2026-03-04").getTime()) / 86400000)); return (
                      <div className="grid grid-cols-4 gap-x-2 text-xs text-muted-foreground mt-2">
                        <div className="flex flex-col items-center gap-0.5">
                          <span className="font-semibold text-primary">{c["7d"]}</span>
                          <span className="flex items-center gap-0.5">7d <TrendBadge current={c["7d"]} currentDays={7} outer={c["14d"]} outerDays={14} /></span>
                        </div>
                        <div className="flex flex-col items-center gap-0.5">
                          <span className="font-semibold text-primary">{c["14d"]}</span>
                          <span className="flex items-center gap-0.5">14d <TrendBadge current={c["14d"]} currentDays={14} outer={c["30d"]} outerDays={30} /></span>
                        </div>
                        <div className="flex flex-col items-center gap-0.5">
                          <span className="font-semibold text-primary">{c["30d"]}</span>
                          <span className="flex items-center gap-0.5">30d {trackingDays > 30 && <TrendBadge current={c["30d"]} currentDays={30} outer={c.total} outerDays={trackingDays} />}</span>
                        </div>
                        <div className="flex flex-col items-center gap-0.5">
                          <span className="font-semibold text-primary">{c.total}</span>
                          <span>Total</span>
                        </div>
                      </div>
                      ); })()}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Play className="w-5 h-5 text-primary" /> Video Clicks
              <button
                onClick={() => setShowPreviousVideos(prev => !prev)}
                className={`ml-auto px-2.5 py-1 text-[10px] font-semibold rounded-md transition-colors ${
                  showPreviousVideos
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground hover:text-foreground'
                }`}
              >
                {showPreviousVideos ? 'Current' : 'Previous'}
              </button>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(
                showPreviousVideos
                  ? PREVIOUS_VIDEO_MAP
                  : (() => {
                      // 3 most recent (excluding pinned) + 3 most viewed (pinned), matching /bio
                      const pinnedIds = new Set(PINNED_TOP_VIDEOS.map(p => p.videoId));
                      const recent = ytVideos
                        .filter(v => !pinnedIds.has(v.videoId))
                        .slice(0, 3)
                        .map(v => [v.videoId, v.title] as [string, string]);
                      const pinned = PINNED_TOP_VIDEOS.map(p => [p.videoId, p.title] as [string, string]);
                      const combined = [...recent, ...pinned];
                      return Object.fromEntries(
                        combined.length > 0 ? combined : Object.entries(VIDEO_MAP)
                      );
                    })()
              ).map(([videoId, title]) => {
                const c = videoCounts[videoId] || { total: 0, today: 0, "7d": 0, "14d": 0, "30d": 0 };
                const launchDaysTracking = Math.max(1, Math.round((Date.now() - new Date("2026-03-04").getTime()) / 86400000));
                return (
                  <Card key={videoId}>
                    <CardContent className="p-5 text-center">
                      <img
                        src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
                        alt={title}
                        className="w-full aspect-video object-cover rounded-lg mb-3"
                      />
                      <p className="text-sm font-medium text-foreground mb-3 line-clamp-2">{title}</p>
                      <p className="text-2xl font-bold text-foreground inline-flex items-center gap-2 justify-center">{c.today} <TodayTrendBadge today={c.today} sevenDay={c["7d"]} /></p>
                      <p className="text-[10px] text-muted-foreground mb-1">today</p>
                      <div className="grid grid-cols-4 gap-x-2 text-xs text-muted-foreground mt-2">
                        <div className="flex flex-col items-center gap-0.5">
                          <span className="font-semibold text-primary">{c["7d"]}</span>
                          <span className="flex items-center gap-0.5">7d <TrendBadge current={c["7d"]} currentDays={7} outer={c["14d"]} outerDays={14} /></span>
                        </div>
                        <div className="flex flex-col items-center gap-0.5">
                          <span className="font-semibold text-primary">{c["14d"]}</span>
                          <span className="flex items-center gap-0.5">14d <TrendBadge current={c["14d"]} currentDays={14} outer={c["30d"]} outerDays={30} /></span>
                        </div>
                        <div className="flex flex-col items-center gap-0.5">
                          <span className="font-semibold text-primary">{c["30d"]}</span>
                          <span className="flex items-center gap-0.5">30d {launchDaysTracking > 30 && <TrendBadge current={c["30d"]} currentDays={30} outer={c.total} outerDays={launchDaysTracking} />}</span>
                        </div>
                        <div className="flex flex-col items-center gap-0.5">
                          <span className="font-semibold text-primary">{c.total}</span>
                          <span>Total</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
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

        {/* Right column — Live Activity Feed */}
        <div className="hidden lg:block w-80 flex-shrink-0">
          <div className="sticky top-24">
            <Card className="border-primary/20">
              <CardContent className="p-4">
                <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-primary" />
                  Last 24 Hours
                  <span className="text-[10px] font-normal text-muted-foreground ml-1">({filteredFeed.length}/{feed.length})</span>
                  <span className="ml-auto relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                </h3>
                <FeedFilterBar filter={feedFilter} setFilter={setFeedFilter} counts={feedCounts} />
                <div className="max-h-[calc(100vh-12rem)] overflow-y-auto space-y-2 pr-1 scrollbar-thin mt-3">
                  {filteredFeed.length === 0 ? (
                    <p className="text-xs text-muted-foreground text-center py-8">No recent activity</p>
                  ) : (
                    filteredFeed.map((item, i) => {
                      const config = FEED_CONFIG[item.type] || FEED_CONFIG.click;
                      const Icon = config.icon;
                      const k = feedKey(item);
                      const isNew = !seenKeysAtRender.current.has(k);
                      return (
                        <div
                          key={k}
                          className={`flex items-start gap-3 p-2.5 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors ${isNew ? 'animate-in fade-in slide-in-from-top-1 duration-300' : ''}`}
                        >
                          <div className={`p-1.5 rounded-md ${config.bg} flex-shrink-0 mt-0.5`}>
                            <Icon className={`w-3.5 h-3.5 ${config.color}`} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-medium text-foreground truncate">{item.detail}</p>
                            <p className="text-[10px] text-muted-foreground truncate">{item.label}</p>
                          </div>
                          <span className="text-[10px] text-muted-foreground whitespace-nowrap flex-shrink-0">
                            {timeAgo(item.timestamp)}
                          </span>
                        </div>
                      );
                    })
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminList;
