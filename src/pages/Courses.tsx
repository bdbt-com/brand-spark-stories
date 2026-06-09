import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CoursesIntentModal from "@/components/CoursesIntentModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Lock,
  ArrowRight,
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
import { SiInstagram, SiSpotify, SiTiktok, SiYoutube } from "react-icons/si";

type CourseStatus = "coming-soon" | "available";

interface Course {
  topic: string;
  title: string;
  hook: string;
  bullets: string[];
  cta: string;
  icon: LucideIcon;
  status: CourseStatus;
}

const courses: Course[] = [
  {
    topic: "Exercise",
    title: "Daily Wins For Exercise",
    hook: "Build a workout into your day, without needing a gym, personal trainer or any extra time.",
    bullets: [
      "Consistency over intensity",
      "Simple exercise habits",
      "More energy & confidence",
      "No overwhelm",
    ],
    cta: "Start Exercise Wins",
    icon: Dumbbell,
    status: "coming-soon",
  },
  {
    topic: "Money",
    title: "Daily Wins For Money",
    hook: "Stop money leaks and reduce financial stress without budgets or complicated spreadsheets.",
    bullets: [
      "Spending awareness",
      "Habit-based saving",
      "Systems over budgeting",
      "Small wins that compound",
    ],
    cta: "Start Money Wins",
    icon: PiggyBank,
    status: "coming-soon",
  },
  {
    topic: "Nutrition",
    title: "Daily Wins For Nutrition",
    hook: "Eat better without extreme dieting.",
    bullets: [
      "Craving control",
      "Better food defaults (keep your guilty pleasures!)",
      "Energy & mood improvement",
      "Sustainable habits",
    ],
    cta: "Start Nutritional Wins",
    icon: Apple,
    status: "coming-soon",
  },
  {
    topic: "Sleep",
    title: "Daily Wins For Sleep",
    hook: "Fix the habit that quietly affects everything else.",
    bullets: [
      "Better recovery & confidence",
      "Lower stress/anxiety",
      "More discipline & motivation",
      "Energy ripple effects",
    ],
    cta: "Start Sleep Wins",
    icon: Moon,
    status: "coming-soon",
  },
];

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
  </div>
);

const Courses = () => {
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [intentOpen, setIntentOpen] = useState(false);
  const guideUrl = getGuideUrl("BDBT Foundation Blueprint") || "";
  const waitlistRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("courses_intent_modal_seen")) return;
    } catch {}
    const t = setTimeout(() => setIntentOpen(true), 600);
    return () => clearTimeout(t);
  }, []);

  const scrollToWaitlist = (topic?: string) => {
    if (topic) setSelectedCourse(topic);
    waitlistRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-12 pb-28 md:pb-16">
      <CoursesIntentModal
        open={intentOpen}
        onOpenChange={setIntentOpen}
        onSubmitted={(course) => {
          if (course) setSelectedCourse(course);
        }}
      />
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

                    {/* Cover removed — text must stay readable on mobile (frost blurred it) */}

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
                        {course.cta}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
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

          {/* Follow / Social footer */}
          <section className="text-center space-y-8 pt-4">
            <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto">
              {[
                { stat: "30K+", label: "YouTube Subscribers" },
                { stat: "100+", label: "Daily Wins Shared" },
                { stat: "8PM", label: "New Episode, Every Day" },
              ].map((s) => (
                <div key={s.label} className="space-y-1">
                  <div className="font-bold italic text-[#E8CE8A] text-[clamp(1.75rem,5vw,2.75rem)] leading-none">
                    {s.stat}
                  </div>
                  <div className="text-[11px] sm:text-xs uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <p className="italic text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
              "Helping people replace Daily Drifts with Daily Wins."
            </p>

            <div className="space-y-5">
              <p className="font-bold italic text-primary text-lg sm:text-xl">
                Follow @bigdaddysbigtips
              </p>

              <div className="flex items-center justify-center gap-4 sm:gap-5">
                {[
                  { Icon: SiInstagram, href: "https://instagram.com/BigDaddysBigTips", label: "Instagram" },
                  { Icon: SiSpotify, href: "https://open.spotify.com/show/7AryqWOzeVCOC7WQ9wcBlk", label: "Spotify" },
                  { Icon: SiTiktok, href: "https://tiktok.com/@BigDaddysBigTips", label: "TikTok" },
                  { Icon: SiYoutube, href: "https://youtube.com/@BigDaddysBigTips", label: "YouTube" },
                ].map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="group w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#141414] border border-primary/40 flex items-center justify-center transition-all duration-300 hover:border-primary hover:-translate-y-0.5 hover:shadow-[0_0_25px_-5px_hsl(var(--primary)/0.7)]"
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#E8CE8A] transition-transform group-hover:scale-110" />
                  </a>
                ))}
              </div>
            </div>
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
