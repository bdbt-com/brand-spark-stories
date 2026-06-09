import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Play, TrendingDown, TrendingUp, BarChart3, Clock, MousePointerClick, ArrowRightLeft, UserPlus, Download, Activity, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useYouTubeVideos } from "@/hooks/useYouTubeVideos";
import { useLatestVideo } from "@/hooks/useLatestVideo";
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
    <div className="w-full min-w-0">
      <p className="text-[10px] font-medium text-muted-foreground mb-2 uppercase tracking-wider flex items-center gap-3">
        <span className="inline-flex items-center gap-1.5"><span className="inline-block w-2 h-2 rounded-full" style={{ background: color }} />{label}</span>
        {dataKey2 && label2 && (
          <span className="inline-flex items-center gap-1.5"><span className="inline-block w-2 h-2 rounded-full" style={{ background: color2 }} />{label2}</span>
        )}
      </p>
      <div className="h-[200px]">
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
    </div>
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
  country?: string | null;
  seq?: number;
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
  const [loading, setLoading] = useState(false);
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
  const [pageStats, setPageStats] = useState<Record<string, { page_path: string; unique_visitors: number; avg_duration: number; views: number }[]>>({});
  const rangeKey = graphRange === 'all' ? 'since_launch' : graphRange;
  const rangeLabel = graphRange === 'all' ? 'Since Launch' : graphRange === 'today' ? 'Today' : graphRange === '7d' ? 'Last 7 Days' : graphRange === '14d' ? 'Last 14 Days' : 'Last 30 Days';
  const [showPreviousVideos, setShowPreviousVideos] = useState(false);
  const { videos: ytVideos } = useYouTubeVideos();
  const { video: cachedLatestVideo } = useLatestVideo();
  const latestVideo = cachedLatestVideo || ytVideos[0];
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

  const lastFeedSince = useRef<string | null>(null);
  const feedItemKeys = useRef<Set<string>>(new Set());
  // Keys currently mid-entry-animation. Drives the animate-* classes precisely
  // and is cleared after the animation duration so re-renders don't re-trigger.
  const [animatingKeys, setAnimatingKeys] = useState<Set<string>>(new Set());
  // Global single-item release queue: ensures one entry animates fully before the next begins.
  const feedQueue = useRef<FeedItem[]>([]);
  const feedPumpTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animClearTimers = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());
  // Baseline snapshot of liveTick at the moment the last analytics fetch completed.
  // Used to project today's live deltas onto every longer-period stat so they tick in sync.
  const liveTickRef = useRef<typeof liveTick>(null);
  const analyticsBaseline = useRef<{
    visitors: number;
    bio_clicks: number;
    podcast_clicks: number;
    bio_redirects: number;
    podcast_redirects: number;
    total_clicks: number;
    subscribers: number;
  } | null>(null);
  useEffect(() => { liveTickRef.current = liveTick; }, [liveTick]);
  const captureBaseline = useCallback(() => {
    const t = liveTickRef.current;
    if (!t) return; // wait until first liveTick arrives so deltas don't spike
    analyticsBaseline.current = {
      visitors: t.visitors_today,
      bio_clicks: t.bio_clicks_today,
      podcast_clicks: t.podcast_clicks_today,
      bio_redirects: t.bio_redirects_today,
      podcast_redirects: t.podcast_redirects_today,
      total_clicks: t.total_clicks_today,
      subscribers: t.subscribers_today,
    };
  }, []);
  // When liveTick first arrives after analytics, set the initial baseline.
  useEffect(() => {
    if (liveTick && !analyticsBaseline.current) captureBaseline();
  }, [liveTick, captureBaseline]);

  // Live deltas — how much each "today" counter has grown since the last analytics fetch.
  // Added to every longer-period number so 7d/14d/30d/Total all tick up in sync with Today.
  const liveDeltas = useMemo(() => {
    const b = analyticsBaseline.current;
    const t = liveTick;
    if (!b || !t) {
      return { visitors: 0, bio_clicks: 0, podcast_clicks: 0, bio_redirects: 0, podcast_redirects: 0, subscribers: 0 };
    }
    const d = (cur: number, base: number) => Math.max(0, cur - base);
    return {
      visitors: d(t.visitors_today, b.visitors),
      bio_clicks: d(t.bio_clicks_today, b.bio_clicks),
      podcast_clicks: d(t.podcast_clicks_today, b.podcast_clicks),
      bio_redirects: d(t.bio_redirects_today, b.bio_redirects),
      podcast_redirects: d(t.podcast_redirects_today, b.podcast_redirects),
      subscribers: d(t.subscribers_today, b.subscribers),
    };
  }, [liveTick]);

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
      captureBaseline();
    } catch {}
  }, [captureBaseline]);

  const fetchSubscribers = useCallback(async () => {
    try {
      const { data, error } = await supabase.functions.invoke("admin-email-stats");
      if (error) throw error;
      setSubscribers(data.subscribers || []);
      setTodaySubscribers(data.today_count || 0);
    } catch (err: any) {
      // Don't block the page render on subscriber-list failures.
      console.warn("admin-email-stats failed", err);
    } finally {
      setLoading(false);
    }
  }, []);



  const feedKey = (item: FeedItem) =>
    `${item.type}:${item.timestamp}:${item.label}:${item.detail}`;
  const feedRenderKey = (item: FeedItem) =>
    item.seq != null ? `${feedKey(item)}#${item.seq}` : feedKey(item);
  const feedSeq = useRef(0);

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
        fresh.push({ ...item, seq: ++feedSeq.current });
      }
      if (fresh.length === 0) return;
      // Sort oldest→newest so the most recent event is released LAST (lands on top).
      const ordered = [...fresh].sort(
        (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
      // Append to the global queue; pump will release one per tick.
      feedQueue.current.push(...ordered);
      startFeedPump();
    } catch {}
  }, []);

  // Time between releases. Must exceed the row entry animation duration so each
  // item finishes animating before the next one begins (silky, non-overlapping).
  const FEED_RELEASE_MS = 560;
  const FEED_ANIM_MS = 520;
  const startFeedPump = useCallback(() => {
    if (feedPumpTimer.current) return; // already pumping
    const release = () => {
      const next = feedQueue.current.shift();
      if (!next) {
        feedPumpTimer.current = null;
        return;
      }
      const k = feedKey(next);
      setFeed((prev) => {
        const merged = [next, ...prev];
        merged.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        const capped = merged.slice(0, 500);
        feedItemKeys.current = new Set(capped.map(feedKey));
        return capped;
      });
      setAnimatingKeys((prev) => {
        const next = new Set(prev);
        next.add(k);
        return next;
      });
      const clear = setTimeout(() => {
        setAnimatingKeys((prev) => {
          if (!prev.has(k)) return prev;
          const n = new Set(prev);
          n.delete(k);
          return n;
        });
        animClearTimers.current.delete(clear);
      }, FEED_ANIM_MS + 40);
      animClearTimers.current.add(clear);
      feedPumpTimer.current = setTimeout(release, FEED_RELEASE_MS);
    };
    release();
  }, []);

  const fetchDailyStats = useCallback(async () => {
    try {
      const { data } = await supabase.functions.invoke("get-daily-stats");
      if (data?.daily) setDailyStats(data.daily);
      if (data?.hourly) setHourlyStats(data.hourly);
    } catch {}
  }, []);

  const fetchLiveTick = useCallback(async () => {
    if (typeof document !== "undefined" && document.visibilityState === "hidden") return;
    try {
      const { data } = await supabase.functions.invoke("get-live-tick");
      if (data && typeof data.visitors_today === "number") setLiveTick(data);
    } catch {}
  }, []);

  const fetchPageStats = useCallback(async () => {
    try {
      const { data } = await supabase.functions.invoke("get-page-stats");
      if (data?.pages) setPageStats(data.pages);
    } catch {}
  }, []);

  useEffect(() => {
    fetchSubscribers();
    fetchVideoCounts();
    fetchDownloadCounts();
    fetchAnalytics();
    // Start the live feed from this moment — don't backfill history.
    lastFeedSince.current = new Date().toISOString();
    fetchDailyStats();
    fetchLiveTick();
    fetchPageStats();

    const slow = setInterval(() => {
      fetchSubscribers();
      fetchVideoCounts();
      fetchDownloadCounts();
      fetchAnalytics();
      fetchDailyStats();
      fetchPageStats();
    }, 15000);

    const tick = setInterval(() => {
      fetchLiveTick();
    }, 1000);

    const fast = setInterval(() => {
      fetchFeedIncremental();
    }, 1000);

    const onVisible = () => {
      if (document.visibilityState === "visible") {
        fetchFeedIncremental();
        fetchLiveTick();
      }
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      clearInterval(slow);
      clearInterval(fast);
      clearInterval(tick);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [fetchSubscribers, fetchVideoCounts, fetchDownloadCounts, fetchAnalytics, fetchFeed, fetchFeedIncremental, fetchDailyStats, fetchLiveTick, fetchPageStats]);

  // Cleanup queued animation-clear timers on unmount
  useEffect(() => {
    return () => {
      animClearTimers.current.forEach((t) => clearTimeout(t));
      animClearTimers.current.clear();
      if (feedPumpTimer.current) {
        clearTimeout(feedPumpTimer.current);
        feedPumpTimer.current = null;
      }
    };
  }, []);

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
                filteredFeed.map((item) => {
                  const config = FEED_CONFIG[item.type] || FEED_CONFIG.click;
                  const Icon = config.icon;
                  const k = feedKey(item);
                  const isNew = animatingKeys.has(k);
                  const sub = item.country || item.label;
                  return (
                    <div
                      key={`mobile-${k}`}
                      className={`flex items-center gap-2 py-1.5 border-t border-border/30 ${isNew ? 'animate-type-row' : ''}`}
                    >
                      <div
                        className={`p-1 rounded ${config.bg} flex-shrink-0 ${isNew ? 'animate-tick-in' : ''}`}
                      >
                        <Icon className={`w-3 h-3 ${config.color}`} />
                      </div>
                      <span className="text-[11px] font-medium text-foreground truncate">{item.detail}</span>
                      <span className="text-[10px] text-muted-foreground truncate">{sub}</span>
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

          {/* Graph range toggle — global control */}
          {filteredDailyStats.length > 0 && (
            <div className="sticky top-4 z-20 rounded-xl border border-border/60 bg-background/85 backdrop-blur p-4 shadow-soft">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <span className="text-sm font-bold text-primary uppercase tracking-wider">Graph Range</span>
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  {(['today', '7d', '14d', '30d', 'all'] as const).map((r) => (
                    <button
                      key={r}
                      onClick={() => setGraphRange(r)}
                      className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
                        graphRange === r
                          ? 'bg-gradient-primary text-primary-foreground shadow-accent'
                          : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 hover:scale-[1.03]'
                      }`}
                    >
                      {r === 'all' ? 'All Time' : r === 'today' ? 'Today' : r.toUpperCase()}
                    </button>
                  ))}
                </div>
                <div className="ml-auto flex items-center gap-2 text-xs">
                  <span className="text-muted-foreground uppercase tracking-wider">Showing</span>
                  <span className="px-3 py-1 rounded-full bg-primary/15 text-primary font-semibold border border-primary/30">{rangeLabel}</span>
                </div>
              </div>
            </div>
          )}

          {/* Per-page stats */}
          <section>
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border/40">
              <BarChart3 className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Page Stats</h2>
              <span className="text-xs font-medium text-muted-foreground">· {rangeLabel}</span>
            </div>
            {(() => {
              const rows = pageStats[rangeKey] || [];
              const byPath = new Map(rows.map((r) => [r.page_path === '' ? '/' : r.page_path, r]));
              const NAV_PAGES: { path: string; label: string }[] = [
                { path: '/', label: 'Home' },
                { path: '/about', label: 'About' },
                { path: '/blueprint', label: 'Blueprint' },
                { path: '/tips', label: 'Tips' },
                { path: '/courses', label: 'Courses' },
                { path: '/podcast', label: 'Podcast' },
              ];
              return (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {NAV_PAGES.map(({ path, label }) => {
                    const p = byPath.get(path) || { unique_visitors: 0, avg_duration: 0, views: 0 };
                    const mins = Math.floor(p.avg_duration / 60);
                    const secs = Math.round(p.avg_duration % 60);
                    const timeStr = `${mins > 0 ? `${mins}m ` : ''}${secs}s`;
                    return (
                      <Card key={path} className="border-primary/20 hover:border-primary/40 transition-colors h-full">
                        <CardContent className="p-3 text-center">
                          <div className="flex items-baseline justify-center gap-1.5">
                            <p className="text-sm font-bold text-primary">{label}</p>
                            <p className="text-[10px] font-mono text-muted-foreground truncate" title={path}>{path}</p>
                          </div>
                          <p className="text-3xl font-bold text-foreground mt-2 tabular-nums leading-none">
                            <AnimatedCounter value={p.unique_visitors} />
                          </p>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">visitors</p>
                          <p className="text-[10px] text-muted-foreground mt-2 tabular-nums inline-flex items-center justify-center gap-1">
                            <Clock className="w-2.5 h-2.5" />{timeStr} avg · {p.views.toLocaleString()} views
                          </p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              );
            })()}
          </section>




          {/* Page Visitors — graph inline */}
          <section>
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border/40">
              <BarChart3 className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Page Visitors</h2>
              <span className="text-xs font-medium text-muted-foreground">· {rangeLabel}</span>
            </div>
            <Card>
              <CardContent className="p-5">
                <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-5">
                  <div className="min-w-0">
                    {(graphRange === 'today' ? hourlyStats.length > 0 : filteredDailyStats.length > 0) && (
                      <InlineGraph data={graphRange === 'today' ? hourlyStats : filteredDailyStats} dataKey="visitors" label="Visitors" color="hsl(210, 40%, 96%)" hourly={graphRange === 'today'} />
                    )}
                  </div>
                  <div className="xl:border-l xl:border-border/50 xl:pl-5 border-t xl:border-t-0 border-border/50 pt-4 xl:pt-0 flex flex-col items-center justify-center text-center">
                    {(() => {
                      const isToday = graphRange === 'today';
                      const today = analytics["today"];
                      const period = analytics[rangeKey];
                      const baselineVisitors = today ? (today.visitors - (today.live_visitors ?? 0)) : 0;
                      const liveVisitors = liveTick ? liveTick.visitors_today : (today?.live_visitors ?? 0);
                      const bioClicksLive = liveTick ? liveTick.bio_clicks_today : (bioClicks.today || 0);
                      const podClicksLive = liveTick ? liveTick.podcast_clicks_today : (podcastClicks.today || 0);
                      const visitorsDisplay = isToday
                        ? baselineVisitors + liveVisitors
                        : (period?.visitors || 0) + liveDeltas.visitors;
                      const avgSrc = isToday ? today : period;
                      const avgMins = avgSrc ? Math.floor(avgSrc.avg_duration / 60) : 0;
                      const avgSecs = avgSrc ? Math.round(avgSrc.avg_duration % 60) : 0;
                      return (
                        <>
                          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.15em]">{rangeLabel}</p>
                          <p className="text-5xl font-bold text-foreground tabular-nums leading-none mt-3"><AnimatedCounter value={visitorsDisplay} /></p>
                          <div className="flex items-center gap-1.5 mt-2">
                            <p className="text-[11px] text-muted-foreground uppercase tracking-wider">Visitors</p>
                            {isToday && <TodayTrendBadge today={liveVisitors} sevenDay={analytics["7d"]?.live_visitors ?? analytics["7d"]?.visitors ?? 0} />}
                          </div>
                          <div className="flex items-center gap-1.5 text-muted-foreground mt-3">
                            <Clock className="w-3.5 h-3.5" />
                            <span className="text-xs tabular-nums">{avgMins > 0 ? `${avgMins}m ` : ""}{avgSecs}s avg</span>
                          </div>
                          {isToday && (
                            <div className="mt-4 pt-3 border-t border-border/50 w-full flex justify-center gap-4">
                              <div className="flex flex-col items-center">
                                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">/bio</span>
                                <span className="inline-flex items-center gap-1 text-sm font-semibold text-foreground tabular-nums">
                                  <AnimatedCounter value={bioClicksLive} />
                                  <TodayTrendBadge today={bioClicksLive} sevenDay={bioClicks["7d"] || 0} />
                                </span>
                              </div>
                              <div className="w-px bg-border/50" />
                              <div className="flex flex-col items-center">
                                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">/podcast</span>
                                <span className="inline-flex items-center gap-1 text-sm font-semibold text-foreground tabular-nums">
                                  <AnimatedCounter value={podClicksLive} />
                                  <TodayTrendBadge today={podClicksLive} sevenDay={podcastClicks["7d"] || 0} />
                                </span>
                              </div>
                            </div>
                          )}
                        </>
                      );
                    })()}
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>



          {/* Bio Link Clicks — graph inline */}
          <section>
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border/40">
              <BarChart3 className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Bio &amp; Podcast Link Clicks</h2>
              <span className="text-xs font-medium text-muted-foreground">· {rangeLabel}</span>
            </div>
            <Card>
              <CardContent className="p-5">
                <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-5">
                  <div className="min-w-0">
                    {(graphRange === 'today' ? hourlyStats.length > 0 : filteredDailyStats.length > 0) && (
                      <InlineGraph
                        data={graphRange === 'today' ? hourlyStats : filteredDailyStats}
                        dataKey="bio_clicks"
                        label="/bio"
                        color="hsl(25, 95%, 53%)"
                        dataKey2="podcast_clicks"
                        label2="/podcast"
                        color2="hsl(210, 90%, 60%)"
                        hourly={graphRange === 'today'}
                      />
                    )}
                  </div>
                  <div className="xl:border-l xl:border-border/50 xl:pl-5 border-t xl:border-t-0 border-border/50 pt-4 xl:pt-0 flex flex-col justify-center gap-4">
                    {(() => {
                      const isToday = graphRange === 'today';
                      const dB = liveDeltas.bio_clicks;
                      const dP = liveDeltas.podcast_clicks;
                      const bio = isToday
                        ? (liveTick ? liveTick.bio_clicks_today : (bioClicks.today || 0))
                        : (bioClicks[rangeKey] || 0) + dB;
                      const pod = isToday
                        ? (liveTick ? liveTick.podcast_clicks_today : (podcastClicks.today || 0))
                        : (podcastClicks[rangeKey] || 0) + dP;
                      return (
                        <>
                          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.15em] text-center">{rangeLabel}</p>
                          <div className="grid grid-cols-1 gap-3">
                            <div className="flex items-center justify-between gap-3">
                              <span className="inline-flex items-center gap-2 text-[11px] text-muted-foreground uppercase tracking-wider">
                                <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: "hsl(25, 95%, 53%)" }} />/bio
                              </span>
                              <span className="inline-flex items-center gap-1.5 text-3xl font-bold text-foreground tabular-nums leading-none">
                                <AnimatedCounter value={bio} />
                                {isToday && <TodayTrendBadge today={bio} sevenDay={bioClicks["7d"] || 0} />}
                              </span>
                            </div>
                            <div className="border-t border-border/50" />
                            <div className="flex items-center justify-between gap-3">
                              <span className="inline-flex items-center gap-2 text-[11px] text-muted-foreground uppercase tracking-wider">
                                <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: "hsl(210, 90%, 60%)" }} />/podcast
                              </span>
                              <span className="inline-flex items-center gap-1.5 text-3xl font-bold text-foreground tabular-nums leading-none">
                                <AnimatedCounter value={pod} />
                                {isToday && <TodayTrendBadge today={pod} sevenDay={podcastClicks["7d"] || 0} />}
                              </span>
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>



          {/* Auto-Redirect Stats — graph inline */}
          <section>
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border/40">
              <Play className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">/bio Redirects &amp; /podcast Redirects</h2>
              <span className="text-xs font-medium text-muted-foreground">· {rangeLabel}</span>
            </div>
            <div className="flex flex-col gap-4">
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
                const br = sum((k) => k === "auto-redirect" || k.startsWith("auto-redirect:"));
                const pr = sum((k) => k.startsWith("latest-auto:"));
                const dBR = liveDeltas.bio_redirects;
                const dPR = liveDeltas.podcast_redirects;
                const todayBR = liveTick ? liveTick.bio_redirects_today : br.today;
                const todayPR = liveTick ? liveTick.podcast_redirects_today : pr.today;
                const lc = latestVideoId ? (videoCounts[`latest-auto:${latestVideoId}`] || { total: 0, today: 0, "7d": 0, "14d": 0, "30d": 0 }) : null;
                const otherPodcastRedirectsToday = lc ? Math.max(0, todayPR - lc.today) : 0;
                return (
                  <>
                    <Card>
                      <CardContent className="p-5">
                        <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-5">
                          <div className="min-w-0">
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
                          </div>
                          <div className="xl:border-l xl:border-border/50 xl:pl-5 border-t xl:border-t-0 border-border/50 pt-4 xl:pt-0 flex flex-col justify-center gap-4">
                            {(() => {
                              const isToday = graphRange === 'today';
                              const sumKey = rangeKey === 'since_launch' ? 'total' : rangeKey;
                              const topVal = isToday ? todayBR : (br[sumKey] || 0) + dBR;
                              const botVal = isToday ? todayPR : (pr[sumKey] || 0) + dPR;
                              return (
                                <>
                                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.15em] text-center">{rangeLabel}</p>
                                  <div className="grid grid-cols-1 gap-3">
                                    <div className="flex items-center justify-between gap-3">
                                      <span className="inline-flex items-center gap-2 text-[11px] text-muted-foreground uppercase tracking-wider">
                                        <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: "hsl(25, 95%, 53%)" }} />/bio
                                      </span>
                                      <span className="inline-flex items-center gap-1.5 text-3xl font-bold text-foreground tabular-nums leading-none">
                                        <AnimatedCounter value={topVal} />
                                        {isToday && <TodayTrendBadge today={topVal} sevenDay={br["7d"]} />}
                                      </span>
                                    </div>
                                    <div className="border-t border-border/50" />
                                    <div className="flex items-center justify-between gap-3">
                                      <span className="inline-flex items-center gap-2 text-[11px] text-muted-foreground uppercase tracking-wider">
                                        <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: "hsl(210, 90%, 60%)" }} />/podcast
                                      </span>
                                      <span className="inline-flex items-center gap-1.5 text-3xl font-bold text-foreground tabular-nums leading-none">
                                        <AnimatedCounter value={botVal} />
                                        {isToday && <TodayTrendBadge today={botVal} sevenDay={pr["7d"]} />}
                                      </span>
                                    </div>
                                  </div>
                                </>
                              );
                            })()}
                          </div>
                        </div>
                      </CardContent>
                    </Card>




                    {/* Row 2: compact Latest Video Redirects card + Avg Time / New Subs filling the empty space */}
                    {(() => {
                      const today = analytics["today"];
                      const avgMins = today ? Math.floor(today.avg_duration / 60) : 0;
                      const avgSecs = today ? today.avg_duration % 60 : 0;
                      const subsDisplay = liveTick ? Math.max(liveTick.subscribers_today, todaySubscribers) : todaySubscribers;
                      return (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                          <Card className="border-primary/30 bg-primary/5">
                            <CardContent className="p-3">
                              <p className="text-[10px] font-medium text-muted-foreground mb-2 uppercase tracking-wider text-center">Current /podcast Latest Video Redirects</p>
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
                                      <AnimatedCounter value={lc.today} /> <TodayTrendBadge today={lc.today} sevenDay={lc["7d"]} />
                                    </p>
                                    <p className="text-[10px] text-muted-foreground mb-1">today</p>
                                    <div className="grid grid-cols-4 gap-x-1 text-[10px] text-muted-foreground">
                                      <div className="flex flex-col items-center">
                                        <span className="font-semibold text-primary"><AnimatedCounter value={lc["7d"]} /></span>
                                        <span>7d</span>
                                      </div>
                                      <div className="flex flex-col items-center">
                                        <span className="font-semibold text-primary"><AnimatedCounter value={lc["14d"]} /></span>
                                        <span>14d</span>
                                      </div>
                                      <div className="flex flex-col items-center">
                                        <span className="font-semibold text-primary"><AnimatedCounter value={lc["30d"]} /></span>
                                        <span>30d</span>
                                      </div>
                                      <div className="flex flex-col items-center">
                                        <span className="font-semibold text-primary"><AnimatedCounter value={lc.total} /></span>
                                        <span>Total</span>
                                      </div>
                                     {otherPodcastRedirectsToday > 0 && (
                                       <p className="text-[10px] text-muted-foreground mt-1">
                                         +<AnimatedCounter value={otherPodcastRedirectsToday} /> other /podcast redirects today
                                       </p>
                                     )}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                          <Card className="border-primary/30 bg-primary/5">
                            <CardContent className="p-5 flex flex-col items-center justify-center h-full">
                              <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Avg Time</p>
                              <p className="text-3xl font-bold text-foreground">
                                {avgMins > 0 ? `${avgMins}m ` : ""}{avgSecs}s
                              </p>
                              <p className="text-[10px] text-muted-foreground mt-1">today</p>
                            </CardContent>
                          </Card>
                          <Card className="border-primary/30 bg-primary/5">
                            <CardContent className="p-5 flex flex-col items-center justify-center h-full">
                              <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">New Subs</p>
                              <p className="text-3xl font-bold text-foreground"><AnimatedCounter value={subsDisplay} /></p>
                              <p className="text-[10px] text-muted-foreground mt-1">today</p>
                            </CardContent>
                          </Card>
                        </div>
                      );
                    })()}
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
                      <p className="text-3xl font-bold text-foreground inline-flex items-center gap-2 justify-center"><AnimatedCounter value={c.today} /> <TodayTrendBadge today={c.today} sevenDay={c["7d"]} /></p>
                      <p className="text-[10px] text-muted-foreground mb-1">today</p>
                      {(() => { const trackingDays = Math.max(1, Math.round((Date.now() - new Date("2026-03-04").getTime()) / 86400000)); return (
                      <div className="grid grid-cols-4 gap-x-2 text-xs text-muted-foreground mt-2">
                        <div className="flex flex-col items-center gap-0.5">
                          <span className="font-semibold text-primary"><AnimatedCounter value={c["7d"]} /></span>
                          <span className="flex items-center gap-0.5">7d <TrendBadge current={c["7d"]} currentDays={7} outer={c["14d"]} outerDays={14} /></span>
                        </div>
                        <div className="flex flex-col items-center gap-0.5">
                          <span className="font-semibold text-primary"><AnimatedCounter value={c["14d"]} /></span>
                          <span className="flex items-center gap-0.5">14d <TrendBadge current={c["14d"]} currentDays={14} outer={c["30d"]} outerDays={30} /></span>
                        </div>
                        <div className="flex flex-col items-center gap-0.5">
                          <span className="font-semibold text-primary"><AnimatedCounter value={c["30d"]} /></span>
                          <span className="flex items-center gap-0.5">30d {trackingDays > 30 && <TrendBadge current={c["30d"]} currentDays={30} outer={c.total} outerDays={trackingDays} />}</span>
                        </div>
                        <div className="flex flex-col items-center gap-0.5">
                          <span className="font-semibold text-primary"><AnimatedCounter value={c.total} /></span>
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

                      {/* Clicks row */}
                      <p className="text-2xl font-bold text-foreground inline-flex items-center gap-2 justify-center">
                        <span className="inline-block w-2 h-2 rounded-full" style={{ background: "hsl(210, 40%, 96%)" }} />
                        <AnimatedCounter value={c.today} /> <TodayTrendBadge today={c.today} sevenDay={c["7d"]} />
                      </p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">clicks today</p>
                      <div className="grid grid-cols-4 gap-x-2 text-xs text-muted-foreground mb-2">
                        <div className="flex flex-col items-center gap-0.5">
                          <span className="font-semibold text-primary"><AnimatedCounter value={c["7d"]} /></span>
                          <span className="flex items-center gap-0.5">7d <TrendBadge current={c["7d"]} currentDays={7} outer={c["14d"]} outerDays={14} /></span>
                        </div>
                        <div className="flex flex-col items-center gap-0.5">
                          <span className="font-semibold text-primary"><AnimatedCounter value={c["14d"]} /></span>
                          <span className="flex items-center gap-0.5">14d <TrendBadge current={c["14d"]} currentDays={14} outer={c["30d"]} outerDays={30} /></span>
                        </div>
                        <div className="flex flex-col items-center gap-0.5">
                          <span className="font-semibold text-primary"><AnimatedCounter value={c["30d"]} /></span>
                          <span className="flex items-center gap-0.5">30d {launchDaysTracking > 30 && <TrendBadge current={c["30d"]} currentDays={30} outer={c.total} outerDays={launchDaysTracking} />}</span>
                        </div>
                        <div className="flex flex-col items-center gap-0.5">
                          <span className="font-semibold text-primary"><AnimatedCounter value={c.total} /></span>
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
                    <span className="text-primary font-semibold"><AnimatedCounter value={count} /></span>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Subscribers */}
          <section>
            <h1 className="text-2xl font-bold text-foreground mb-2">Email Subscribers</h1>
            <p className="text-muted-foreground mb-6">
              <AnimatedCounter value={subscribers.length} /> unique subscribers
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
                    filteredFeed.map((item) => {
                      const config = FEED_CONFIG[item.type] || FEED_CONFIG.click;
                      const Icon = config.icon;
                      const k = feedKey(item);
                      const isNew = animatingKeys.has(k);
                      const sub = item.country || item.label;
                      return (
                        <div
                          key={k}
                          className={`flex items-start gap-3 p-2.5 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors ${isNew ? 'animate-type-row' : ''}`}
                        >
                          <div
                            className={`p-1.5 rounded-md ${config.bg} flex-shrink-0 mt-0.5 ${isNew ? 'animate-tick-in' : ''}`}
                          >
                            <Icon className={`w-3.5 h-3.5 ${config.color}`} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-medium text-foreground truncate">{item.detail}</p>
                            <p className="text-[10px] text-muted-foreground truncate">{sub}</p>
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
