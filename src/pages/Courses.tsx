import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, Play, ArrowRight, Target } from "lucide-react";
import EmailCaptureForm from "@/components/EmailCaptureForm";
import { getGuideUrl } from "@/data/guideMapping";
import { supabase } from "@/integrations/supabase/client";
import { startTrackedRedirect } from "@/lib/youtube-redirect";

interface Course {
  topic: string;
  title: string;
  description: string;
  benefits: string[];
  cta: string;
}

const courses: Course[] = [
  {
    topic: "Exercise",
    title: "Daily Wins For Exercise",
    description:
      "Build a workout into your day, without needing a gym, personal trainer or any extra time.",
    benefits: [
      "Consistency over intensity",
      "Simple exercise habits",
      "More energy & confidence",
      "No overwhelm",
    ],
    cta: "Start Exercise Wins",
  },
  {
    topic: "Money",
    title: "Daily Wins For Money",
    description:
      "Stop money leaks and reduce financial stress without budgets or complicated spreadsheets.",
    benefits: [
      "Spending awareness",
      "Habit-based saving",
      "Systems over budgeting",
      "Small wins that compound",
    ],
    cta: "Start Money Wins",
  },
  {
    topic: "Nutrition",
    title: "Daily Wins For Nutrition",
    description: "Eat better without extreme dieting.",
    benefits: [
      "Craving control",
      "Better food defaults (keep your guilty pleasures!)",
      "Energy & mood improvement",
      "Sustainable habits",
    ],
    cta: "Start Nutritional Wins",
  },
  {
    topic: "Sleep",
    title: "Daily Wins For Sleep",
    description: "Fix the habit that quietly affects everything else.",
    benefits: [
      "Better recovery & confidence",
      "Lower stress/anxiety",
      "More discipline & motivation",
      "Energy ripple effects",
    ],
    cta: "Start Sleep Wins",
  },
];

const youtubeEpisodes = [
  { videoId: "SioUIPf4Sls", title: "Which Comfort Are You Choosing? - Daily Wins Podcast 118", viewCountText: "111K views" },
  { videoId: "L6cqky7TLpE", title: "Do This And Turn £10 Into £100,000 - Daily Wins Podcast 115", viewCountText: "108K views" },
  { videoId: "zUGM3gZbNY8", title: "Most People Stop here. Are You Most People? Daily Wins Podcast 116", viewCountText: "92K views" },
];

const Courses = () => {
  const waitlistRef = useRef<HTMLDivElement>(null);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const guideUrl = getGuideUrl("BDBT Foundation Blueprint") || "";

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

  const scrollToWaitlist = () => {
    waitlistRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-24">
          {/* Hero */}
          <section className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold italic text-primary tracking-tight">
              Start Your Daily Wins Journey
            </h1>
          </section>

          {/* Course cards */}
          <section className="space-y-20">
            {courses.map((course) => (
              <Card
                key={course.topic}
                className="border-2 border-primary/30 bg-background/60 shadow-medium"
              >
                <CardContent className="p-8 sm:p-12 flex flex-col items-center text-center space-y-6">
                  {/* Title button */}
                  <div className="inline-flex items-center justify-center px-8 py-5 border-2 border-primary rounded-lg bg-background min-w-[240px]">
                    <span className="text-xl sm:text-2xl font-bold text-primary">
                      {course.title}
                    </span>
                  </div>

                  <p className="text-lg text-foreground max-w-xl">
                    {course.description}
                  </p>

                  <ul className="space-y-1 text-foreground">
                    {course.benefits.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>

                  <Button
                    variant="outline"
                    size="lg"
                    onClick={scrollToWaitlist}
                    className="border-2 border-primary text-primary font-bold italic hover:bg-primary hover:text-primary-foreground"
                  >
                    {course.cta}
                  </Button>

                  <p className="text-primary italic font-bold flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    (Locked — Coming Soon — Join Waiting List)
                  </p>
                </CardContent>
              </Card>
            ))}
          </section>

          {/* They're All Connected */}
          <section className="text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold italic text-primary">
              They're All Connected
            </h2>
            <p className="text-lg font-semibold text-foreground">
              Sleep <span className="text-primary">→</span> Nutrition{" "}
              <span className="text-primary">→</span> Exercise{" "}
              <span className="text-primary">→</span> Money{" "}
              <span className="text-primary">→</span> Confidence{" "}
              <span className="text-primary">→</span> Happiness
            </p>
            <div className="space-y-3 text-foreground max-w-2xl mx-auto">
              <p className="font-semibold">Most people try to fix life one problem at a time.</p>
              <p className="font-semibold">
                Daily Wins work differently. Small habits that create ripple effects:
              </p>
              <p>Better sleep improves food choices.</p>
              <p>Better food improves energy.</p>
              <p>Better energy improves movement.</p>
              <p>Better routines reduce stress spending.</p>
              <p>Tiny wins compound into a different life.</p>
            </div>
            <div className="pt-4">
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-2 border-primary text-primary font-bold italic hover:bg-primary hover:text-primary-foreground"
              >
                <Link to="/tips">
                  Explore The Full Daily Wins System
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </section>

          {/* Start For Free */}
          <section className="text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold italic text-primary">
              Start For Free
            </h2>
            <div className="flex justify-center">
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-medium">
                <Target className="w-20 h-20 text-primary-foreground" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-foreground">Not ready for a course?</h3>
            <p className="text-foreground max-w-xl mx-auto italic">
              Download the free Foundation Blueprint and start building momentum today.
            </p>
            <div className="pt-2">
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-2 border-primary text-primary font-bold italic hover:bg-primary hover:text-primary-foreground"
              >
                <Link to="/blueprint">Download Free Blueprint</Link>
              </Button>
            </div>
          </section>

          {/* Learn For Free Every Day */}
          <section className="space-y-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold italic text-primary">
              Learn For Free Every Day
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center px-4">
              {youtubeEpisodes.map((episode, index) => (
                <div
                  key={episode.videoId}
                  className={`rounded-2xl overflow-hidden shadow-medium bg-background border border-border/50 transition-all duration-300 hover:shadow-strong ${
                    index === 0 ? "md:order-2 md:scale-105 md:z-10" : index === 1 ? "md:order-1" : "md:order-3"
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
                  <a
                    href={`https://www.youtube.com/watch?v=${episode.videoId}`}
                    onClick={(e) => {
                      e.preventDefault();
                      startTrackedRedirect(episode.videoId);
                    }}
                    className="block p-4 hover:bg-muted/50 transition-colors text-left"
                  >
                    <h3 className="font-semibold text-sm text-foreground line-clamp-2">
                      {episode.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">{episode.viewCountText}</p>
                  </a>
                </div>
              ))}
            </div>
            <p className="text-foreground font-semibold italic">
              30,000+ people learning better habits every day
            </p>
            <div>
              <Button
                variant="outline"
                size="lg"
                onClick={() => startTrackedRedirect("channel-bdbt")}
                className="border-2 border-primary text-primary font-bold italic hover:bg-primary hover:text-primary-foreground"
              >
                Watch On YouTube
              </Button>
            </div>
          </section>

          {/* About Me */}
          <section className="text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold italic text-primary">
              About Me
            </h2>
            <div className="space-y-4 text-foreground max-w-2xl mx-auto italic">
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
                className="border-2 border-primary text-primary font-bold italic hover:bg-primary hover:text-primary-foreground"
              >
                <Link to="/about">My Story</Link>
              </Button>
            </div>
          </section>

          {/* Waiting list capture */}
          <section ref={waitlistRef} className="scroll-mt-24">
            <Card className="border-2 border-primary/40 bg-background shadow-strong">
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <h2 className="text-2xl sm:text-3xl font-bold italic text-primary">
                    Join the Courses Waiting List
                  </h2>
                  <p className="text-foreground/80 mt-2">
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
                />
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Courses;
