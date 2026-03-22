import { useEffect, useState, useCallback, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Play, TrendingDown, TrendingUp, BarChart3, Clock, MousePointerClick, ArrowRightLeft, UserPlus, Download, Activity, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

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

function InlineGraph({ data, dataKey, label, color }: { data: any[]; dataKey: string; label: string; color: string }) {
  return (
    <Card className="w-full xl:w-80 flex-shrink-0">
      <CardContent className="p-3">
        <p className="text-[10px] font-medium text-muted-foreground mb-1 uppercase tracking-wider">{label}</p>
        <div className="h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="day" tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v: string) => new Date(v).toLocaleDateString("en-GB", { day: "numeric", month: "short" })} interval="preserveStartEnd" minTickGap={30} />
              <YAxis tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }} width={30} allowDecimals={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "11px" }} labelFormatter={(v: string) => new Date(v).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })} />
              <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={1.5} dot={false} activeDot={{ r: 3, strokeWidth: 0 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

const VIDEO_MAP: Record<string, string> = {
  ERXXO8mG5IY: "Why 70% of People Are Dehydrated",
  OjwSKAXveN8: "Dangers of Screen-time Before Bed",
  bv27Bn6qWIo: "Why Most People Invest Completely Wrong",
  zz2rVKKt1l0: "Go Exploring",
  "-a4NbW5Y718": "If You Know You're Capable of More",
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

const FEED_CONFIG: Record<string, { icon: typeof Play; color: string; bg: string }> = {
  click: { icon: MousePointerClick, color: "text-blue-400", bg: "bg-blue-500/10" },
  redirect: { icon: ArrowRightLeft, color: "text-orange-400", bg: "bg-orange-500/10" },
  signup: { icon: UserPlus, color: "text-green-400", bg: "bg-green-500/10" },
  download: { icon: Download, color: "text-purple-400", bg: "bg-purple-500/10" },
};

function timeAgo(ts: string): string {
  const diff = Date.now() - new Date(ts).getTime();
  if (diff < 60000) return "just now";
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return `${Math.floor(diff / 86400000)}d ago`;
}

const AdminList = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [videoCounts, setVideoCounts] = useState<Record<string, { total: number; today: number; "7d": number; "14d": number; "30d": number }>>({});
  const [downloadCounts, setDownloadCounts] = useState<[string, number][]>([]);
  const [analytics, setAnalytics] = useState<Record<string, AnalyticsPeriod>>({});
  const [bioClicks, setBioClicks] = useState<Record<string, number>>({});
  const [todaySubscribers, setTodaySubscribers] = useState(0);
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [dailyStats, setDailyStats] = useState<{ day: string; visitors: number; bio_clicks: number; auto_redirects: number }[]>([]);
  const [graphRange, setGraphRange] = useState<'today' | '7d' | '14d' | '30d' | 'all'>('all');

  const filteredDailyStats = useMemo(() => {
    if (graphRange === 'all') return dailyStats;
    const days = graphRange === 'today' ? 1 : graphRange === '7d' ? 7 : graphRange === '14d' ? 14 : 30;
    return dailyStats.slice(-days);
  }, [dailyStats, graphRange]);

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

  const fetchFeed = useCallback(async () => {
    try {
      const { data } = await supabase.functions.invoke("get-activity-feed");
      if (data?.feed) setFeed(data.feed);
    } catch {}
  }, []);

  const fetchDailyStats = useCallback(async () => {
    try {
      const { data } = await supabase.functions.invoke("get-daily-stats");
      if (data?.daily) setDailyStats(data.daily);
    } catch {}
  }, []);

  useEffect(() => {
    fetchSubscribers();
    fetchVideoCounts();
    fetchDownloadCounts();
    fetchAnalytics();
    fetchFeed();
    fetchDailyStats();

    const interval = setInterval(() => {
      fetchSubscribers();
      fetchVideoCounts();
      fetchDownloadCounts();
      fetchAnalytics();
      fetchFeed();
    }, 15000);

    return () => clearInterval(interval);
  }, [fetchSubscribers, fetchVideoCounts, fetchDownloadCounts, fetchAnalytics, fetchFeed, fetchDailyStats]);

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
              <span className="text-[10px] text-muted-foreground">({feed.length})</span>
              <span className="relative flex h-2 w-2 ml-auto">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
            </div>
            <div className="max-h-60 overflow-y-auto pr-1">
              {feed.length === 0 ? (
                <p className="text-[10px] text-muted-foreground text-center py-2">No recent activity</p>
              ) : (
                feed.map((item, i) => {
                  const config = FEED_CONFIG[item.type] || FEED_CONFIG.click;
                  const Icon = config.icon;
                  return (
                    <div
                      key={`mobile-${item.timestamp}-${i}`}
                      className="flex items-center gap-2 py-1.5 border-t border-border/30"
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
                        <p className="text-3xl font-bold text-primary inline-flex items-center gap-2 justify-center">{today?.visitors || 0} <TodayTrendBadge today={today?.live_visitors ?? today?.visitors ?? 0} sevenDay={analytics["7d"]?.live_visitors ?? analytics["7d"]?.visitors ?? 0} /></p>
                        <p className="text-xs text-muted-foreground mt-1 inline-flex items-center gap-1 justify-center">/bio clicks: {bioClicks.today || 0} <TodayTrendBadge today={bioClicks.today || 0} sevenDay={bioClicks["7d"] || 0} /></p>
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

          {/* Page Analytics — graph inline */}
          <section>
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" /> Page Analytics
            </h2>
            <div className="flex flex-col xl:flex-row gap-4">
              {filteredDailyStats.length > 0 && (
                <InlineGraph data={filteredDailyStats} dataKey="visitors" label="Visitors" color="hsl(var(--primary))" />
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
                        <p className="text-3xl font-bold text-primary">{period?.visitors || 0}</p>
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
              <BarChart3 className="w-5 h-5 text-primary" /> Bio Link Clicks
            </h2>
            <div className="flex flex-col xl:flex-row gap-4">
              {filteredDailyStats.length > 0 && (
                <InlineGraph data={filteredDailyStats} dataKey="bio_clicks" label="Bio Link Clicks" color="hsl(142, 71%, 45%)" />
              )}
              <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Today", value: bioClicks.today || 0, isToday: true, sevenDay: bioClicks["7d"] || 0, days: 0, outerVal: 0, outerDays: 0 },
                  { label: "7 Days", value: bioClicks["7d"] || 0, isToday: false, sevenDay: 0, days: 7, outerVal: bioClicks["14d"] || 0, outerDays: 14 },
                  { label: "14 Days", value: bioClicks["14d"] || 0, isToday: false, sevenDay: 0, days: 14, outerVal: bioClicks["30d"] || 0, outerDays: 30 },
                  { label: "30 Days", value: bioClicks["30d"] || 0, isToday: false, sevenDay: 0, days: 30, outerVal: bioClicks["30d"] || 0, outerDays: 30 },
                ].map(({ label, value, isToday, sevenDay, days, outerVal, outerDays }) => (
                  <Card key={label}>
                    <CardContent className="p-5 text-center">
                      <p className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">{label}</p>
                      <p className="text-3xl font-bold text-primary inline-flex items-center gap-2 justify-center">
                        {value}
                        {isToday && <TodayTrendBadge today={value} sevenDay={sevenDay} />}
                      </p>
                      <div className="flex items-center justify-center gap-1 mt-1">
                        <p className="text-xs text-muted-foreground">clicks</p>
                        {!isToday && days > 0 && outerDays > 0 && days < 30 && <TrendBadge current={value} currentDays={days} outer={outerVal} outerDays={outerDays} />}
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
              <Play className="w-5 h-5 text-primary" /> Auto-Redirects
            </h2>
            <div className="flex flex-col xl:flex-row gap-4">
              {filteredDailyStats.length > 0 && (
                <InlineGraph data={filteredDailyStats} dataKey="auto_redirects" label="Auto-Redirects" color="hsl(25, 95%, 53%)" />
              )}
              {(() => {
                const ar = videoCounts["auto-redirect"] || { total: 0, today: 0, "7d": 0, "14d": 0, "30d": 0 };
                const trackingDays = Math.max(1, Math.round((Date.now() - new Date("2026-03-04").getTime()) / 86400000));
                return (
                  <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-5 text-center">
                        <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Today</p>
                        <p className="text-3xl font-bold text-primary inline-flex items-center gap-2 justify-center">{ar.today} <TodayTrendBadge today={ar.today} sevenDay={ar["7d"]} /></p>
                        <p className="text-xs text-muted-foreground mt-1">redirects</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-5 text-center">
                        <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">7 Days</p>
                        <p className="text-3xl font-bold text-primary">{ar["7d"]}</p>
                        <div className="flex items-center justify-center gap-1 mt-1">
                          <p className="text-xs text-muted-foreground">redirects</p>
                          <TrendBadge current={ar["7d"]} currentDays={7} outer={ar["14d"]} outerDays={14} />
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-5 text-center">
                        <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">14 Days</p>
                        <p className="text-3xl font-bold text-primary">{ar["14d"]}</p>
                        <div className="flex items-center justify-center gap-1 mt-1">
                          <p className="text-xs text-muted-foreground">redirects</p>
                          <TrendBadge current={ar["14d"]} currentDays={14} outer={ar["30d"]} outerDays={30} />
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-5 text-center">
                        <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">30 Days</p>
                        <p className="text-3xl font-bold text-primary">{ar["30d"]}</p>
                        <div className="flex items-center justify-center gap-1 mt-1">
                          <p className="text-xs text-muted-foreground">redirects</p>
                          {trackingDays > 30 && <TrendBadge current={ar["30d"]} currentDays={30} outer={ar.total} outerDays={trackingDays} />}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
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
                      <p className="text-3xl font-bold text-primary inline-flex items-center gap-2 justify-center">{c.today} <TodayTrendBadge today={c.today} sevenDay={c["7d"]} /></p>
                      <p className="text-[10px] text-muted-foreground mb-1">today</p>
                      {(() => { const trackingDays = Math.max(1, Math.round((Date.now() - new Date("2026-03-04").getTime()) / 86400000)); return (
                      <div className="grid grid-cols-3 gap-x-2 text-xs text-muted-foreground mt-2">
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
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(VIDEO_MAP).map(([videoId, title]) => {
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
                      <p className="text-2xl font-bold text-primary inline-flex items-center gap-2 justify-center">{c.today} <TodayTrendBadge today={c.today} sevenDay={c["7d"]} /></p>
                      <p className="text-[10px] text-muted-foreground mb-1">today</p>
                      <div className="grid grid-cols-3 gap-x-2 text-xs text-muted-foreground mt-2">
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
                  <span className="text-[10px] font-normal text-muted-foreground ml-1">({feed.length})</span>
                  <span className="ml-auto relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                </h3>
                <div className="max-h-[calc(100vh-10rem)] overflow-y-auto space-y-2 pr-1 scrollbar-thin">
                  {feed.length === 0 ? (
                    <p className="text-xs text-muted-foreground text-center py-8">No recent activity</p>
                  ) : (
                    feed.map((item, i) => {
                      const config = FEED_CONFIG[item.type] || FEED_CONFIG.click;
                      const Icon = config.icon;
                      return (
                        <div
                          key={`${item.timestamp}-${i}`}
                          className="flex items-start gap-3 p-2.5 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors"
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
