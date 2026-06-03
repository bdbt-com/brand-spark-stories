import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Lock,
  Play,
  ArrowRight,
  ArrowDown,
  Target,
  Dumbbell,
  PiggyBank,
  Apple,
  Moon,
  Check,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import EmailCaptureForm from "@/components/EmailCaptureForm";
import { getGuideUrl } from "@/data/guideMapping";
import { supabase } from "@/integrations/supabase/client";
import { startTrackedRedirect } from "@/lib/youtube-redirect";

type CourseStatus = "coming-soon" | "available";

interface Course {
  topic: string;
  title: string;
  hook: string;
  bullets: string[];
  icon: LucideIcon;
  status: CourseStatus;
}

const courses: Course[] = [
  {
    topic: "Exercise",
    title: "The Daily Wins Movement Method",
    hook: "Build a workout into your day — no gym, no trainer, no extra time.",
    bullets: [
      "Consistency over intensity",
      "Simple exercise habits",
      "More energy & confidence",
      "No overwhelm",
    ],
    icon: Dumbbell,
    status: "coming-soon",
  },
  {
    topic: "Money",
    title: "The Daily Wins Money System",
    hook: "Stop money leaks and lower financial stress — without budgets or spreadsheets.",
    bullets: [
      "Spending awareness",
      "Habit-based saving",
      "Systems over budgeting",
      "Small wins that compound",
    ],
    icon: PiggyBank,
    status: "coming-soon",
  },
  {
    topic: "Nutrition",
    title: "The Daily Wins Nutrition Reset",
    hook: "Eat better without extreme dieting.",
    bullets: [
      "Craving control",
      "Better food defaults (keep your guilty pleasures!)",
      "Energy & mood improvement",
      "Sustainable habits",
    ],
    icon: Apple,
    status: "coming-soon",
  },
  {
    topic: "Sleep",
    title: "The Daily Wins Sleep Reset",
    hook: "Fix the habit that quietly affects everything else.",
    bullets: [
      "Better recovery & confidence",
      "Lower stress/anxiety",
      "More discipline & motivation",
      "Energy ripple effects",
    ],
    icon: Moon,
    status: "coming-soon",
  },
];

const youtubeEpisodes = [
  { videoId: "SioUIPf4Sls", title: "Which Comfort Are You Choosing? - Daily Wins Podcast 118", viewCountText: "111K views" },
  { videoId: "L6cqky7TLpE", title: "Do This And Turn £10 Into £100,000 - Daily Wins Podcast 115", viewCountText: "108K views" },
  { videoId: "zUGM3gZbNY8", title: "Most People Stop here. Are You Most People? Daily Wins Podcast 116", viewCountText: "92K views" },
];

const connectionFlow = ["Sleep", "Nutrition", "Exercise", "Money", "Confidence", "Happiness"];

const StatusPill = ({ status }: { status: CourseStatus }) => {
  if (status === "available") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/15 border border-green-500/40 text-green-400 text-[11px] font-bold tracking-wider uppercase">
        <Sparkles className="w-3 h-3" />
        Available Now
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/15 border border-primary/40 text-primary text-[11px] font-bold tracking-wider uppercase">
      <Lock className="w-3 h-3" />
      Coming Soon
    </span>
  );
};

const LockedCover = () => (
  <div
    aria-hidden="true"
    className="absolute inset-0 rounded-2xl overflow-hidden z-10 pointer-events-none transition-all duration-300"
  >
    {/* Frost */}
    <div className="absolute inset-0 frost-fallback transition-colors duration-300 md:group-hover:bg-[rgba(10,10,10,0.18)]" />
    {/* Holographic sheen */}
    <div className="absolute inset-0 holo-sheen opacity-30 mix-blend-overlay transition-opacity duration-300 md:group-hover:opacity-45" />
    {/* Shimmer streak */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="holo-shimmer absolute top-0 -left-1/3 h-full w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </div>
    {/* Centre lock */}
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
      <Lock
        className="w-11 h-11 text-[#E8CE8A] drop-shadow-[0_0_18px_rgba(232,206,138,0.55)]"
        strokeWidth={2.25}
      />
      <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.18em] text-primary uppercase">
        Unlocking Soon
      </span>
      <span className="hidden md:inline-flex items-center gap-1 mt-1 text-[11px] font-semibold text-primary/0 md:group-hover:text-primary transition-colors duration-300">
        Join the Waitlist <ArrowRight className="w-3 h-3" />
      </span>
    </div>
  </div>
);

const Courses = () => {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const guideUrl = getGuideUrl("BDBT Foundation Blueprint") || "";
  const waitlistRef = useRef<HTMLElement | null>(null);

  const scrollToWaitlist = (topic?: string) => {
    if (topic) setSelectedCourse(topic);
    waitlistRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    if (playingVideo === null) return;
    const ep = youtubeEpisodes.find((e) => e.videoId === playingVideo);
    if (!ep) return;
    const t = setTimeout(() => {
      startTrackedRedirect(ep.videoId);
      setPlayingVideo(null);
    }, 4000);
    return () => clearTimeout(t);
  }, [playingVideo]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-12 pb-28 md:pb-16">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-20 md:space-y-24">
          {/* Hero */}
          <section className="text-center space-y-5">
            <h1 className="font-bold italic text-primary tracking-tight leading-[1.05] text-[clamp(2.25rem,6vw,4rem)]">
              Start Your Daily Wins Journey
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Four simple systems. One connected life. Pick where you want your first win.
            </p>

            {/* Trust strip */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141414] border border-primary/20 text-xs sm:text-sm text-foreground">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="font-semibold">30,000+</span>
                <span className="text-muted-foreground">learning daily</span>
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141414] border border-primary/20 text-xs sm:text-sm text-muted-foreground">
                As heard on the <span className="text-primary font-semibold">Daily Wins Podcast</span>
              </span>
            </div>
          </section>

          {/* Courses grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 items-stretch">
            {courses.map((course) => {
              const Icon = course.icon;
              const locked = course.status === "coming-soon";
              return (
                <Card
                  key={course.topic}
                  onClick={() => locked && scrollToWaitlist(course.topic)}
                  className={`group relative bg-[#141414] border border-primary/20 rounded-2xl shadow-soft transition-all duration-300 md:hover:-translate-y-1 md:hover:border-primary/50 md:hover:shadow-[0_0_40px_-10px_hsl(var(--primary)/0.5)] h-full overflow-hidden ${
                    locked ? "cursor-pointer" : ""
                  }`}
                >
                  <CardContent className="relative p-6 sm:p-7 flex flex-col h-full gap-5">
                    {/* Top row: icon + badge (badge sits above cover) */}
                    <div className="flex items-start justify-between gap-3 relative z-20">
                      <div
                        className={`w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center transition-colors md:group-hover:bg-primary/20`}
                      >
                        <Icon className="w-7 h-7 text-primary" strokeWidth={2.25} />
                      </div>
                      <StatusPill status={course.status} />
                    </div>

                    {/* Title + hook (behind cover) */}
                    <div className="space-y-2 relative z-0">
                      <h3 className="text-xl sm:text-2xl font-bold italic text-primary leading-tight">
                        {course.title}
                      </h3>
                      <p className="text-[15px] text-muted-foreground leading-relaxed">
                        {course.hook}
                      </p>
                    </div>

                    {/* Bullets (behind cover) */}
                    <ul className="space-y-2.5 relative z-0">
                      {course.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2.5 text-[15px] text-foreground/95 leading-snug">
                          <Check className="w-4 h-4 text-primary mt-1 shrink-0" strokeWidth={3} />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Locked cover (between content & button) */}
                    {locked && <LockedCover />}

                    {/* CTA (above cover) */}
                    <div className="mt-auto pt-2 relative z-20">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          scrollToWaitlist(course.topic);
                        }}
                        variant="outline"
                        className="w-full min-h-12 rounded-xl border-2 border-primary/60 text-primary font-bold tracking-tight bg-[#141414]/80 md:hover:bg-primary md:hover:text-primary-foreground md:hover:border-primary md:hover:scale-[1.02] transition-all"
                      >
                        Join the Waitlist
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </section>

          {/* They're All Connected */}
          <section className="text-center space-y-8">
            <h2 className="font-bold italic text-primary text-[clamp(1.75rem,4vw,2.5rem)]">
              They're All Connected
            </h2>

            {/* Desktop horizontal flow */}
            <div className="hidden md:flex flex-wrap items-center justify-center gap-2">
              {connectionFlow.map((node, i) => (
                <div key={node} className="flex items-center gap-2">
                  <span className="px-4 py-2 rounded-full bg-[#141414] border border-primary/40 text-primary font-bold text-sm shadow-[0_0_20px_-8px_hsl(var(--primary)/0.5)]">
                    {node}
                  </span>
                  {i < connectionFlow.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-primary/70" />
                  )}
                </div>
              ))}
            </div>

            {/* Mobile vertical flow */}
            <div className="flex md:hidden flex-col items-center gap-2">
              {connectionFlow.map((node, i) => (
                <div key={node} className="flex flex-col items-center gap-2">
                  <span className="px-5 py-2 rounded-full bg-[#141414] border border-primary/40 text-primary font-bold text-sm">
                    {node}
                  </span>
                  {i < connectionFlow.length - 1 && (
                    <ArrowDown className="w-4 h-4 text-primary/70" />
                  )}
                </div>
              ))}
            </div>

            <ul className="space-y-1.5 text-foreground/90 max-w-md mx-auto text-[15px] leading-relaxed">
              <li>Better sleep improves food choices.</li>
              <li>Better food improves energy.</li>
              <li>Better energy improves movement.</li>
              <li>Better routines reduce stress spending.</li>
              <li className="font-semibold text-foreground">Tiny wins compound into a different life.</li>
            </ul>

            <div className="pt-2">
              <Button
                variant="outline"
                size="lg"
                asChild
                className="rounded-xl border-2 border-primary text-primary font-bold italic md:hover:bg-primary md:hover:text-primary-foreground min-h-12"
              >
                <Link to="/tips">
                  Explore The Full Daily Wins System
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </section>

          {/* Start For Free */}
          <section>
            <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-[#141414] to-primary/5 rounded-2xl shadow-medium">
              <CardContent className="p-8 sm:p-12 text-center space-y-5">
                <div className="mx-auto w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-primary to-[#E8CE8A] flex items-center justify-center shadow-[0_0_40px_-10px_hsl(var(--primary)/0.6)]">
                  <Target className="w-12 h-12 sm:w-14 sm:h-14 text-primary-foreground" strokeWidth={2.2} />
                </div>
                <h2 className="font-bold italic text-primary text-[clamp(1.75rem,4vw,2.5rem)]">
                  Start For Free
                </h2>
                <p className="text-foreground/90 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
                  Not ready for a course? Download the free Foundation Blueprint and start building momentum today.
                </p>
                <div className="pt-2">
                  <Button
                    onClick={() => scrollToWaitlist()}
                    variant="default"
                    size="lg"
                    className="rounded-xl bg-primary text-primary-foreground font-bold md:hover:bg-[#E8CE8A] md:hover:scale-[1.02] min-h-12 px-8 shadow-[0_0_30px_-8px_hsl(var(--primary)/0.6)]"
                  >
                    Download Free Blueprint
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Learn For Free Every Day */}
          <section className="space-y-7 text-center">
            <h2 className="font-bold italic text-primary text-[clamp(1.75rem,4vw,2.5rem)]">
              Learn For Free Every Day
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 items-stretch px-1">
              {youtubeEpisodes.map((episode, index) => (
                <div
                  key={episode.videoId}
                  className={`rounded-2xl overflow-hidden bg-[#141414] border border-primary/20 transition-all duration-300 md:hover:border-primary/50 md:hover:-translate-y-1 md:hover:shadow-[0_0_30px_-10px_hsl(var(--primary)/0.5)] ${
                    index === 0 ? "md:order-2 md:scale-[1.03] md:z-10" : index === 1 ? "md:order-1" : "md:order-3"
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
                      className="relative w-full cursor-pointer group/thumb"
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
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover/thumb:bg-black/30 transition-colors">
                        <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-[0_0_25px_-5px_hsl(var(--primary)/0.7)]">
                          <Play className="w-6 h-6 text-primary-foreground ml-1" fill="currentColor" />
                        </div>
                      </div>
                    </div>
                  )}
                  <a
                    href={`https://www.youtube.com/watch?v=${episode.videoId}`}
                    onClick={(e) => {
                      e.preventDefault();
                      startTrackedRedirect(episode.videoId);
                    }}
                    className="block p-4 md:hover:bg-primary/5 transition-colors text-left"
                  >
                    <h3 className="font-semibold text-sm text-foreground line-clamp-2 leading-snug">
                      {episode.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">{episode.viewCountText}</p>
                  </a>
                </div>
              ))}
            </div>
            <p className="text-foreground font-bold italic text-base sm:text-lg">
              30,000+ people learning better habits every day
            </p>
            <div>
              <Button
                variant="outline"
                size="lg"
                onClick={() => startTrackedRedirect("channel-bdbt")}
                className="rounded-xl border-2 border-primary text-primary font-bold italic md:hover:bg-primary md:hover:text-primary-foreground min-h-12"
              >
                Watch On YouTube
              </Button>
            </div>
          </section>

          {/* About Me */}
          <section className="text-center space-y-5">
            <div className="mx-auto w-24 h-24 sm:w-28 sm:h-28 rounded-full ring-2 ring-primary ring-offset-4 ring-offset-[#0A0A0A] bg-gradient-to-br from-primary/30 to-[#141414] flex items-center justify-center">
              <span className="text-3xl font-bold italic text-primary">DW</span>
            </div>
            <h2 className="font-bold italic text-primary text-[clamp(1.75rem,4vw,2.5rem)]">
              About Me
            </h2>
            <div className="space-y-4 text-foreground/90 max-w-2xl mx-auto italic text-[15px] sm:text-base leading-relaxed">
              <p>
                After years working in finance and studying habits, health and behaviour,
                I realised something surprising; most people do not fail because they are
                lazy or lack discipline. They are simply living in a world where comfort
                has evolved faster than our biology.
              </p>
              <p>
                Modern life has made choosing comfort easier. It has made Daily Drifts
                easier. So I created Daily Wins to help people replace downward spirals
                with upward momentum through tiny daily actions that quietly compound.
              </p>
            </div>
            <div>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="rounded-xl border-2 border-primary text-primary font-bold italic md:hover:bg-primary md:hover:text-primary-foreground min-h-12"
              >
                <Link to="/about">My Story</Link>
              </Button>
            </div>
          </section>

          {/* General waiting list capture */}
          <section ref={waitlistRef} className="scroll-mt-24">
            <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-[#141414] to-primary/5 rounded-2xl shadow-strong">
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <h2 className="font-bold italic text-primary text-[clamp(1.5rem,3.5vw,2rem)]">
                    Join the Courses Waiting List
                  </h2>
                  <p className="text-foreground/80 mt-2 text-[15px]">
                    Be first to know when Daily Wins courses go live. You'll also get the
                    free Foundation Blueprint as a thank-you.
                  </p>
                </div>
                <EmailCaptureForm
                  title="Courses Waiting List"
                  guideDownloadUrl={guideUrl}
                  onClose={() => {}}
                  compact={false}
                  hideable={false}
                  headingLabel="Reserve your spot"
                  submitLabel="Join the Waitlist + Get the Free Blueprint →"
                  successTitle="You're on the list ✓"
                  successDescription="Check your inbox for the Foundation Blueprint."
                  showCourseSelector
                  courseValue={selectedCourse}
                  onCourseChange={setSelectedCourse}
                />
              </CardContent>
            </Card>
          </section>
        </div>
      </div>

      {/* Sticky mobile bottom bar */}
      <div className="fixed bottom-0 inset-x-0 md:hidden z-40 border-t border-primary/30 bg-[#0A0A0A]/95 backdrop-blur-md px-4 py-3">
        <Button
          onClick={() => scrollToWaitlist()}
          variant="default"
          className="w-full min-h-12 rounded-xl bg-primary text-primary-foreground font-bold shadow-[0_0_25px_-8px_hsl(var(--primary)/0.6)]"
        >
          Download Free Blueprint
        </Button>
      </div>
    </div>
  );
};

export default Courses;
