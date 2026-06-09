import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Droplets, Activity, Moon, DollarSign, Heart, Smile, Target, Zap, ChevronDown, Trophy, AlertTriangle, FileText, Headphones, Instagram, Youtube, Play } from "lucide-react";
import { Link } from "react-router-dom";
import TipsCarousel from "@/components/TipsCarousel";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { useEffect, useState, useRef } from "react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import ChevronRipple from "@/components/ChevronRipple";
import { supabase } from "@/integrations/supabase/client";
import { startTrackedRedirect } from "@/lib/youtube-redirect";

type Episode = { videoId: string; title: string; views: string; featured?: boolean };

const PODCAST_EPISODES: Episode[] = [
  { videoId: "D4dzO5rfBfs", title: "Daily Wins Podcast 112 - Why Choosing Discomfort Feels So Hard", views: "14K views" },
  { videoId: "cfLHVIIp4o0", title: "Build a Life You Don't Need to Escape From", views: "23K views", featured: true },
  { videoId: "EhpmrICLRK8", title: "Daily Wins Podcast 113 - Why Challenging Social Norms Polarises People", views: "9.5K views" },
];

const Home = () => {
  const images = ["/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png",
  // Sunset silhouette on rocks
  "/lovable-uploads/recording-setup-new.jpg",
  // Podcast recording setup - updated
  "/lovable-uploads/b362cf10-f3b4-4ab1-aeb3-30ab18058ace.png",
  // Man with dog outdoors
  "/lovable-uploads/4fd0818e-20c3-4941-9c54-6915db50a7c0.png",
  // Meditation with mirror
  "/lovable-uploads/661d98ce-15f1-4542-b8c0-bab549b78a55.png",
  // Man in bathroom mirror
  "/lovable-uploads/33ba01bc-045c-4c44-ac70-c61c05093bdc.png",
  // Silhouette by pool
  "/lovable-uploads/2678016c-a3fa-4e29-bf3d-3ebe92201186.png",
  // Person exercising outdoors
  "/lovable-uploads/2f4d6184-a8de-43f0-a345-4ed910c90522.png",
  // Man on phone in modern setting
  "/lovable-uploads/7db6bd1f-c12f-45f2-a1d1-505f38c743a1.png",
  // Man outdoors smiling
  "/lovable-uploads/8db636d1-94ff-432a-a4b1-6ca278173f2f.png",
  // Man in shoe store
  "/lovable-uploads/a886c4a9-0d09-442e-8348-25bd795ad7d0.png",
  // Man in home theater
  "/lovable-uploads/man-in-car.jpeg",
  // Man in car smiling
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
      <section className="relative bg-gradient-hero text-white py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="block text-white">Small Daily Steps.</span>
                <span className="block text-[hsl(35_45%_75%)]">Big Life Changes.</span>
              </h1>
              <h2 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight">
                <span className="block text-white">Are your habits building the life you want</span>
                <span className="block text-[hsl(35_45%_75%)]">or quietly pulling you away from it?</span>
              </h2>
              <p className="text-base lg:text-lg text-white/90 leading-relaxed">
                Your days are shaped by tiny repeated habits. And whether you realise it or not, your energy, health, finances, confidence and momentum are already compounding, either moving you forward or holding you back.
              </p>
            </div>
            <div className="animate-float">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-strong">
                <Carousel setApi={setEmbla} opts={{
                loop: true
              }} className="w-full" aria-label="Daily success journey image carousel">
                  <CarouselContent>
                    {(filteredImages.length ? filteredImages : images).map((src, idx) => <CarouselItem key={src}>
                         <img src={src} alt={`Big Life Change inspiration image ${idx + 1}`} className="w-full aspect-square object-cover rounded-xl" loading={idx === 0 ? "eager" : "lazy"} />
                      </CarouselItem>)}
                  </CarouselContent>
                </Carousel>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom Chevron Scroll to How BDBT Works */}
        <button aria-label="Scroll to Top Podcast Episodes" onClick={() => podcastRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="group absolute z-10 bottom-16 left-1/2 -translate-x-1/2">
          <div className="relative w-14 h-14">
            <div className="relative w-14 h-14 rounded-full bg-white/15 backdrop-blur border border-white/30 flex items-center justify-center">
              <ChevronDown className="w-6 h-6 text-white transition-transform group-hover:translate-y-0.5" />
            </div>
          </div>
        </button>
      </section>

      {/* Habits Question Section (placeholder slot) */}
      <section ref={podcastRef} className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            <span className="block text-foreground">Are your habits building the life you want</span>
            <span className="block text-primary">or quietly pulling you away from it?</span>
          </h2>
          <p className="text-base md:text-lg text-foreground/90 max-w-2xl mx-auto mb-10 leading-relaxed">
            Your days are shaped by tiny repeated habits. And whether you realise it or not, your energy, health, finances, confidence and momentum are already compounding, either moving you forward or holding you back.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <Button variant="default" size="lg" asChild className="rounded-xl h-16 px-6 text-base md:text-lg w-full">
              <Link to="/blueprint">Start With The Free Foundation Blueprint</Link>
            </Button>
            <Button variant="default" size="lg" asChild className="rounded-xl h-16 px-6 text-base md:text-lg w-full">
              <Link to="/courses">Browse Courses</Link>
            </Button>
          </div>
        </div>
      </section>



      {/* Daily Wins and Daily Drifts Boxes - on blue background */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Daily Wins Box */}
            <Card className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-warning rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-primary mb-4">Daily Wins</h3>
                <p className="text-foreground leading-relaxed">
                  Actions that invest in your future self. Tiny daily choices that create powerful ripple effects across your entire life. Stack them together to compound your confidence, freedom, and momentum.
                </p>
              </CardContent>
            </Card>

            {/* Daily Drifts Box */}
            <Card className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-warning rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <AlertTriangle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-primary mb-4">Daily Drifts</h3>
                <p className="text-foreground leading-relaxed">
                  The easy choices that feel harmless in the moment but quietly drain your energy, money, and peace of mind. Drifts are the invisible currents that keep you stuck exactly where you don't want to be.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tips Preview Section */}
      <section className="py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-primary">
              Your Daily Transformation Toolkit
            </h2>
            <p className="text-xl text-foreground max-w-3xl mx-auto">My supply of Daily Wins that quietly transform your health, wealth, and happiness through small daily actions.</p>
          </div>
          
          <TipsCarousel />
          
          
          <div className="flex justify-center">
            <Button variant="outline" size="lg" asChild className="w-full sm:w-auto max-w-sm">
              <Link to="/tips">
                View All Tips <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>;
};
export default Home;