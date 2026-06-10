import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Droplets, Activity, Moon, DollarSign, Heart, Smile, Target, Zap, ChevronDown, FileText, Headphones, Instagram, Youtube, Play, Dumbbell, PiggyBank, Apple, Check, Lock as LockIcon } from "lucide-react";
import { Link } from "react-router-dom";
import TipsCarousel from "@/components/TipsCarousel";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { useEffect, useState, useRef } from "react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import ChevronRipple from "@/components/ChevronRipple";
import { supabase } from "@/integrations/supabase/client";
import { startTrackedRedirect } from "@/lib/youtube-redirect";
import linkBlueprintAsset from "@/assets/link-blueprint.png.asset.json";
import linkYoutubeAsset from "@/assets/link-youtube.png.asset.json";
import linkSpotifyAsset from "@/assets/link-spotify.png.asset.json";
import clapperboardAsset from "@/assets/clapperboard-shot.png.asset.json";
import blueprintCoverAsset from "@/assets/foundation-blueprint-cover.png.asset.json";
import bdClapperSetAsset from "@/assets/bd-clapper-set.png.asset.json";
import bdTalking1Asset from "@/assets/bd-talking-1.png.asset.json";
import bdTalking2Asset from "@/assets/bd-talking-2.png.asset.json";
import { SiInstagram, SiSpotify, SiTiktok, SiYoutube } from "react-icons/si";

type Episode = { videoId: string; title: string; views: string; featured?: boolean };

const PODCAST_EPISODES: Episode[] = [
  { videoId: "D4dzO5rfBfs", title: "Daily Wins Podcast 112 - Why Choosing Discomfort Feels So Hard", views: "14K views" },
  { videoId: "cfLHVIIp4o0", title: "Build a Life You Don't Need to Escape From", views: "23K views", featured: true },
  { videoId: "EhpmrICLRK8", title: "Daily Wins Podcast 113 - Why Challenging Social Norms Polarises People", views: "9.5K views" },
];

const Home = () => {
  const images = [bdClapperSetAsset.url,
  bdTalking2Asset.url,
  bdTalking1Asset.url,
  "/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png",
  // Sunset silhouette on rocks

  // Man with dog outdoors
  "/lovable-uploads/4fd0818e-20c3-4941-9c54-6915db50a7c0.png",
  // Meditation with mirror
  "/lovable-uploads/661d98ce-15f1-4542-b8c0-bab549b78a55.png",
  // Man in bathroom mirror
  "/lovable-uploads/33ba01bc-045c-4c44-ac70-c61c05093bdc.png",
  // Silhouette by pool
  "/lovable-uploads/2678016c-a3fa-4e29-bf3d-3ebe92201186.png",
  // Person exercising outdoors
  linkSpotifyAsset.url,
  // Man on phone in modern setting - replaced with arms-wide speaking shot
  "/lovable-uploads/7db6bd1f-c12f-45f2-a1d1-505f38c743a1.png",
  // Man outdoors smiling
  "/lovable-uploads/8db636d1-94ff-432a-a4b1-6ca278173f2f.png",
  // Man in shoe store
  "/lovable-uploads/a886c4a9-0d09-442e-8348-25bd795ad7d0.png",
  // Man in home theater
  linkYoutubeAsset.url,
  // Man in car smiling - replaced with close-up speaking shot
  "/lovable-uploads/347bc4c8-a5fc-40c4-a30c-1d91b5bd5761.png",
  // Man on beach at sunset
  "/lovable-uploads/75853635-930c-4fa5-9403-d0b58c6db83b.png" // Person meditating in gazebo
  ];
  const [embla, setEmbla] = useState<CarouselApi | null>(null);
  const [filteredImages, setFilteredImages] = useState<string[]>([]);
  const [isHowOpen, setIsHowOpen] = useState(false);
  const [isHowWorkOpen, setIsHowWorkOpen] = useState(false);
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const podcastEpisodes = PODCAST_EPISODES;


  // Auto-redirect to YouTube after 4 seconds of playing
  useEffect(() => {
    if (playingVideo === null) return;
    const episode = podcastEpisodes[playingVideo];
    if (!episode) return;
    const timer = setTimeout(() => {
      startTrackedRedirect(episode.videoId);
      setPlayingVideo(null);
    }, 4000);
    return () => clearTimeout(timer);
  }, [playingVideo]);
  const howRef = useRef<HTMLDivElement>(null);
  const podcastRef = useRef<HTMLDivElement>(null);
  const howWorkContentRef = useRef<HTMLDivElement>(null);
  const howContentRef = useRef<HTMLDivElement>(null);
  const handleScrollToHow = () => {
    howRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  };
  const handleHowOpenChange = (open: boolean) => {
    setIsHowOpen(open);
    if (open) {
      // Wait for content to expand, then scroll to show the top of the content
      setTimeout(() => {
        const contentElement = howContentRef.current;
        if (contentElement) {
          contentElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 200);
    }
  };
  const howWorkTriggerRef = useRef<HTMLButtonElement>(null);
  const handleHowWorkOpenChange = (open: boolean) => {
    setIsHowWorkOpen(open);
    if (open) {
      // Wait for content to expand, then scroll to show the top of the content
      setTimeout(() => {
        const contentElement = howWorkContentRef.current;
        if (contentElement) {
          contentElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 200);
    }
  };
  const isPhotoLike = (src: string): Promise<boolean> => new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      const size = 32;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (!ctx) return resolve(true);
      ctx.drawImage(img, 0, 0, size, size);
      const {
        data
      } = ctx.getImageData(0, 0, size, size);
      let whiteish = 0;
      const total = size * size;
      for (let i = 0; i < total; i++) {
        const r = data[i * 4];
        const g = data[i * 4 + 1];
        const b = data[i * 4 + 2];
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const sat = max === 0 ? 0 : (1 - min / max) * 100;
        const bright = (r + g + b) / 3;
        if (bright > 245 && sat < 10) whiteish++;
      }
      const ratio = whiteish / total;
      resolve(ratio < 0.6);
    };
    img.onerror = () => resolve(true);
    img.src = src;
  });
  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      const keep = await Promise.all(images.map(s => isPhotoLike(s)));
      const next = images.filter((_, i) => keep[i]);
      if (!cancelled) setFilteredImages(next);
    };
    run();
    return () => {
      cancelled = true;
    };
  }, []);
  useEffect(() => {
    if (!embla) return;
    const id = setInterval(() => {
      if (embla.canScrollNext()) {
        embla.scrollNext();
      } else {
        embla.scrollTo(0);
      }
    }, 5500);
    return () => clearInterval(id);
  }, [embla]);
  return <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-white py-6 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
            <div className="animate-fade-in text-center">
              <h1 className="text-4xl lg:text-6xl font-bold mb-3 lg:mb-5 leading-tight">
                <span className="block text-white">Are your habits building the life you want?</span>
                <span className="block text-[hsl(35_45%_75%)]">or quietly pulling you away from it?</span>
              </h1>
              <p className="text-sm lg:text-lg text-white/90 leading-relaxed mb-4 lg:mb-7 mx-auto max-w-prose">
                Your days are shaped by tiny repeated habits. And whether you realise it or not, your energy, health, finances, confidence and momentum are already compounding, either moving you forward or holding you back.
              </p>
            </div>
            <div className="animate-float">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 lg:p-8 shadow-strong max-w-[85%] mx-auto lg:max-w-none">
                <Carousel setApi={setEmbla} opts={{
                loop: true
              }} className="w-full" aria-label="Daily success journey image carousel">
                  <CarouselContent>
                    {(filteredImages.length ? filteredImages : images).map((src, idx) => <CarouselItem key={src}>
                         <img src={src} alt={`Big Life Change inspiration image ${idx + 1}`} className="w-full aspect-[4/3] lg:aspect-square object-cover rounded-xl" loading={idx === 0 ? "eager" : "lazy"} />
                      </CarouselItem>)}
                  </CarouselContent>
                </Carousel>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom Chevron Scroll */}
        <button aria-label="Scroll to next section" onClick={() => podcastRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="group absolute z-10 bottom-8 left-1/2 -translate-x-1/2 hidden lg:block">
          <div className="relative w-14 h-14">
            <div className="relative w-14 h-14 rounded-full bg-white/15 backdrop-blur border border-white/30 flex items-center justify-center">
              <ChevronDown className="w-6 h-6 text-white transition-transform group-hover:translate-y-0.5" />
            </div>
          </div>
        </button>
      </section>

      {/* Anchor for chevron scroll */}
      <div ref={podcastRef} aria-hidden="true" />




      {/* Browse Courses CTA - sits between hero and boxes */}
      <section className="pt-8 lg:pt-24 pb-6 lg:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <Link
            to="/courses?intent=1"
            aria-label="Browse Courses"
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl w-full sm:w-auto h-14 md:h-16 px-10 md:px-12 text-lg md:text-xl font-semibold tracking-tight text-black bg-gradient-to-r from-primary via-[hsl(35_45%_78%)] to-primary bg-[length:200%_100%] bg-[position:0%_50%] transition-[background-position,transform,box-shadow] duration-500 ease-out hover:bg-[position:100%_50%] hover:-translate-y-0.5 active:translate-y-0 shadow-[0_0_0_1px_hsl(var(--primary)/0.35),0_10px_30px_-12px_hsl(var(--primary)/0.45)] hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.5),0_18px_45px_-12px_hsl(var(--primary)/0.65)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-2xl bg-gradient-to-b from-white/30 to-transparent" />
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
              <span className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/35 to-transparent animate-shimmer-sweep" />
            </span>
            <span className="relative">Browse Courses</span>
            <ArrowRight className="relative w-5 h-5 transition-transform duration-300 ease-out group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Follow / Social footer (moved from Courses) */}
      <section className="pt-6 lg:pt-10 pb-4">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-8">
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
        </div>
      </section>

      {/* Pull quote */}
      <section className="py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-6">
          <blockquote className="text-center italic font-bold text-foreground text-lg md:text-2xl leading-relaxed">
            "If you don't build a system around your Daily Wins, comfort will quietly build one around your Daily Drifts."
          </blockquote>
        </div>
      </section>

      {/* Why Life Feels Harder Than It Should */}
      <section className="pt-6 lg:pt-8 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="italic text-3xl md:text-4xl font-bold text-primary text-center mb-10">
            Why Life Feels Harder Than It Should
          </h2>

          <p className="text-foreground font-semibold text-center mb-6">
            Modern life quietly pulls us towards Daily Drifts:
          </p>

          <ul className="space-y-2 text-center italic text-foreground mb-10">
            <li>Too many screens → overstimulated mind</li>
            <li>Overstimulated mind → poor sleep</li>
            <li>Poor sleep → low energy</li>
            <li>Low energy → worse food choices</li>
            <li>Worse food → less movement</li>
            <li>Low movement → lower confidence</li>
            <li>Low confidence → more stress</li>
            <li>More stress → emotional spending</li>
            <li>Emotional spending → financial pressure</li>
          </ul>

          <div className="space-y-4 text-center text-foreground leading-relaxed">
            <p>Most people think they have separate problems. In reality, they have a system problem.</p>
            <p>The good news? A system of Daily Drifts can be replaced with a system of Daily Wins.</p>
            <p>This is not another all-or-nothing New Year's resolution. It is a system you build gradually, layering small Daily Wins that quietly reshape your habits, identity, and ultimately, your future.</p>
          </div>
        </div>
      </section>

      {/* Courses preview - laid out like Courses page */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="italic text-3xl md:text-4xl font-bold text-primary mb-4">
              Start Your Daily Wins Journey
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              Four simple systems. One connected life. Pick where you want your first win.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 items-stretch">
            {[
              { topic: "Exercise", title: "Daily Wins For Exercise", hook: "Build a workout into your day, without needing a gym, personal trainer or any extra time.", bullets: ["Consistency over intensity", "Simple exercise habits", "More energy & confidence", "No overwhelm"], cta: "Start Exercise Wins", Icon: Dumbbell },
              { topic: "Money", title: "Daily Wins For Money", hook: "Stop money leaks and reduce financial stress without budgets or complicated spreadsheets.", bullets: ["Spending awareness", "Habit-based saving", "Systems over budgeting", "Small wins that compound"], cta: "Start Money Wins", Icon: PiggyBank },
              { topic: "Nutrition", title: "Daily Wins For Nutrition", hook: "Eat better without extreme dieting.", bullets: ["Craving control", "Better food defaults (keep your guilty pleasures!)", "Energy & mood improvement", "Sustainable habits"], cta: "Start Nutritional Wins", Icon: Apple },
              { topic: "Sleep", title: "Daily Wins For Sleep", hook: "Fix the habit that quietly affects everything else.", bullets: ["Better recovery & confidence", "Lower stress/anxiety", "More discipline & motivation", "Energy ripple effects"], cta: "Start Sleep Wins", Icon: Moon },
            ].map(({ topic, title, hook, bullets, cta, Icon }) => (
              <Card key={topic} className="group relative bg-[#141414] border border-primary/20 rounded-2xl shadow-soft transition-all duration-300 md:hover:-translate-y-1 md:hover:border-primary/50 md:hover:shadow-[0_0_40px_-10px_hsl(var(--primary)/0.5)] h-full overflow-hidden">
                <CardContent className="relative p-6 sm:p-7 flex flex-col h-full gap-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center md:group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-7 h-7 text-primary" strokeWidth={2.25} />
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/15 border border-primary/40 text-primary text-[11px] font-bold tracking-wider uppercase">
                      <LockIcon className="w-3 h-3" />
                      Coming Soon
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-bold italic text-primary leading-tight">{title}</h3>
                    <p className="text-[15px] text-muted-foreground leading-relaxed">{hook}</p>
                  </div>

                  <ul className="space-y-2.5">
                    {bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-[15px] text-foreground/95 leading-snug">
                        <Check className="w-4 h-4 text-primary mt-1 shrink-0" strokeWidth={3} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-2">
                    <Button asChild variant="outline" className="w-full min-h-12 rounded-xl border-2 border-primary/60 text-primary font-bold tracking-tight bg-[#141414]/80 md:hover:bg-primary md:hover:text-primary-foreground md:hover:border-primary md:hover:scale-[1.02] transition-all">
                      <Link to={`/courses?topic=${encodeURIComponent(topic)}`}>{cta}</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* They're All Connected */}
      <section className="py-20 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="italic text-3xl md:text-4xl font-bold text-primary mb-8">
            They're All Connected
          </h2>

          <p className="font-bold text-foreground text-lg md:text-xl mb-10">
            Sleep → Nutrition → Exercise → Money → Confidence → Happiness
          </p>

          <p className="font-bold text-foreground mb-2">
            Most people try to fix life one problem at a time.
          </p>
          <p className="font-bold text-foreground mb-8">
            Daily Wins work differently. Small habits that create ripple effects:
          </p>

          <ul className="space-y-3 text-foreground mb-12">
            <li>Better sleep improves food choices.</li>
            <li>Better food improves energy.</li>
            <li>Better energy improves movement.</li>
            <li>Better routines reduce stress spending.</li>
            <li>Tiny wins compound into a different life.</li>
          </ul>

          <div className="flex justify-center">
            <Button variant="outline" size="lg" asChild className="italic font-bold">
              <Link to="/tips">
                Explore The Full Daily Wins System <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Start For Free */}
      <section className="py-20 lg:py-24 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="italic text-3xl md:text-4xl font-bold text-primary mb-8">
            Start For Free
          </h2>

          <div className="flex justify-center mb-8">
            <img
              src={blueprintCoverAsset.url}
              alt="Foundation Blueprint"
              className="w-full max-w-sm rounded-2xl border border-primary/30 shadow-strong"
            />
          </div>

          <p className="italic font-bold text-foreground text-lg md:text-xl mb-3">
            Not ready for a course?
          </p>
          <p className="italic text-muted-foreground mb-8 max-w-xl mx-auto">
            Download the free Foundation Blueprint and start building momentum today.
          </p>

          <div className="flex justify-center">
            <Button asChild size="lg" className="italic font-bold">
              <Link to="/blueprint">
                Download Free Blueprint <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Learn For Free Every Day */}
      <section className="py-20 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="italic text-3xl md:text-4xl font-bold text-primary mb-4">
              Learn For Free Every Day
            </h2>
            <p className="italic text-muted-foreground">
              30,000+ people learning better habits every day
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-10">
            {PODCAST_EPISODES.map((ep) => (
              <div key={ep.videoId} className="rounded-2xl overflow-hidden border border-primary/20 bg-[#141414] shadow-soft">
                <div className="relative aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${ep.videoId}`}
                    title={ep.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm font-semibold text-foreground line-clamp-2">{ep.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{ep.views}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mb-20">
            <Button asChild variant="outline" size="lg" className="italic font-bold">
              <a href="/redirect?url=https%3A%2F%2Fyoutube.com%2F%40BigDaddysBigTips">
                Watch On YouTube <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
          </div>

          {/* About Me */}
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="italic text-3xl md:text-4xl font-bold text-primary mb-8">
              About Me
            </h2>
            <p className="italic text-foreground leading-relaxed mb-6">
              After years working in finance and studying habits, health and behaviour, I realised something surprising; most people do not fail because they are lazy or lack discipline. They are simply living in a world where comfort has evolved faster than our biology.
            </p>
            <p className="italic text-foreground leading-relaxed mb-10">
              Modern life has made choosing comfort easier. It has made Daily Drifts easier. So I created Daily Wins to help people replace downward spirals with upward momentum through tiny daily actions that quietly compound.
            </p>

            <div className="flex justify-center">
              <Button asChild variant="outline" size="lg" className="italic font-bold">
                <Link to="/about#story">
                  My Story <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Ready To Replace Daily Drifts With Daily Wins? */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="italic text-3xl md:text-5xl font-bold text-primary mb-10 leading-tight">
            Ready To Replace Daily Drifts With Daily Wins?
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
            <Button asChild variant="outline" size="lg" className="italic font-bold">
              <Link to="/blueprint">
                Start With The Free Foundation Blueprint <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button asChild size="lg" className="italic font-bold">
              <Link to="/courses">
                Browse Courses <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

    </div>;
};
export default Home;