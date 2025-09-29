import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Droplets, Activity, Moon, DollarSign, Heart, Smile, Target, Zap, ChevronDown, Trophy, AlertTriangle, FileText, Headphones, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import TipsCarousel from "@/components/TipsCarousel";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { useEffect, useState, useRef } from "react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import ChevronRipple from "@/components/ChevronRipple";
import tikTokBg from "@/assets/tiktok-background.png";
const Home = () => {
  const images = ["/lovable-uploads/bc6fa209-b818-463e-aeb6-08d6c7b423c6.png",
  // Sunset silhouette on rocks
  "/lovable-uploads/8d06c526-bd08-42b7-9a4e-09be508119c7.png",
  // Podcast recording setup
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
  "/lovable-uploads/347bc4c8-a5fc-40c4-a30c-1d91b5bd5761.png",
  // Man on beach at sunset
  "/lovable-uploads/fa5ff878-34d6-44b6-a517-f055a1627aab.png",
  // Man smiling in car
  "/lovable-uploads/75853635-930c-4fa5-9403-d0b58c6db83b.png" // Person meditating in gazebo
  ];
  const [embla, setEmbla] = useState<CarouselApi | null>(null);
  const [filteredImages, setFilteredImages] = useState<string[]>([]);
  const [isHowOpen, setIsHowOpen] = useState(false);
  const [isHowWorkOpen, setIsHowWorkOpen] = useState(false);
  const howRef = useRef<HTMLDivElement>(null);
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
              <p className="text-base lg:text-lg mb-8 text-white/90 leading-relaxed">
                Big Daddy's Big Tips teaches simple daily habits that silently transform your health, wealth, and happiness simultaneously. Turning overwhelming life changes into achievable daily steps.
              </p>
              <div className="flex justify-center">
                {/* Start Your Journey Here - enlarged and centered */}
                <div className="relative w-full max-w-md">
                  <Button variant="secondary" size="lg" asChild className="relative transition-transform duration-200 rounded-xl h-14 md:h-16 px-8 md:px-10 text-lg md:text-xl w-full">
                    <Link to="/blueprint">
                      Start Your Journey Here <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                </div>
              </div>
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
        <button aria-label="Scroll to How BDBT Works" onClick={handleScrollToHow} className="group absolute z-10 bottom-16 left-1/2 -translate-x-1/2">
          <div className="relative w-14 h-14">
            <div className="relative w-14 h-14 rounded-full bg-white/15 backdrop-blur border border-white/30 flex items-center justify-center">
              <ChevronDown className="w-6 h-6 text-white transition-transform group-hover:translate-y-0.5" />
            </div>
          </div>
        </button>
      </section>

      {/* Pinned Reels Section */}
      <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-primary">
              Core Explanations
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Reel 1: The Modern World is Designed to Keep You Stuck */}
            <div className="group cursor-pointer transform transition-all duration-300 hover:scale-105">
              <div className="relative w-full aspect-[9/16] max-w-sm mx-auto overflow-hidden rounded-2xl shadow-lg hover:shadow-xl">
                {/* Background Image */}
                <img 
                  src={tikTokBg} 
                  alt="TikTok Background" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/30"></div>
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-between p-6">
                  {/* Title */}
                  <div className="flex-1 flex items-center justify-center text-center">
                    <h3 className="text-xl sm:text-2xl font-bold leading-tight text-white" style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.9)' }}>
                      <span className="block">The Modern World</span>
                      <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>is Designed to Keep You Stuck</span>
                    </h3>
                  </div>
                  
                  {/* Bottom Section */}
                  <div className="flex flex-col items-center space-y-3">
                    {/* BDBT Logo */}
                    <img 
                      src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" 
                      alt="BDBT Logo"
                      className="h-12 opacity-90"
                      style={{ 
                        filter: 'drop-shadow(0 0 8px rgba(255,255,255,1)) drop-shadow(0 0 4px rgba(255,255,255,0.8)) drop-shadow(2px 2px 4px rgba(0,0,0,0.8))',
                      }}
                    />
                    {/* Social Icons */}
                    <div className="flex gap-3">
                      <Instagram className="w-5 h-5 text-white" style={{ filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.8))' }} />
                      <Youtube className="w-5 h-5 text-white" style={{ filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.8))' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Reel 2: Every Choice is a Daily Win or a Daily Drift */}
            <div className="group cursor-pointer transform transition-all duration-300 hover:scale-105">
              <div className="relative w-full aspect-[9/16] max-w-sm mx-auto overflow-hidden rounded-2xl shadow-lg hover:shadow-xl">
                {/* Background Image */}
                <img 
                  src={tikTokBg} 
                  alt="TikTok Background" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/30"></div>
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-between p-6">
                  {/* Title */}
                  <div className="flex-1 flex items-center justify-center text-center">
                    <h3 className="text-xl sm:text-2xl font-bold leading-tight text-white" style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.9)' }}>
                      <span className="block">Every Choice is a</span>
                      <span className="block" style={{ color: 'hsl(35, 45%, 75%)' }}>Daily Win or a Daily Drift</span>
                    </h3>
                  </div>
                  
                  {/* Bottom Section */}
                  <div className="flex flex-col items-center space-y-3">
                    {/* BDBT Logo */}
                    <img 
                      src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" 
                      alt="BDBT Logo"
                      className="h-12 opacity-90"
                      style={{ 
                        filter: 'drop-shadow(0 0 8px rgba(255,255,255,1)) drop-shadow(0 0 4px rgba(255,255,255,0.8)) drop-shadow(2px 2px 4px rgba(0,0,0,0.8))',
                      }}
                    />
                    {/* Social Icons */}
                    <div className="flex gap-3">
                      <Instagram className="w-5 h-5 text-white" style={{ filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.8))' }} />
                      <Youtube className="w-5 h-5 text-white" style={{ filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.8))' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Reel 3: BDBT Explained */}
            <div className="group cursor-pointer transform transition-all duration-300 hover:scale-105">
              <div className="relative w-full aspect-[9/16] max-w-sm mx-auto overflow-hidden rounded-2xl shadow-lg hover:shadow-xl">
                {/* Background Image */}
                <img 
                  src={tikTokBg} 
                  alt="TikTok Background" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/30"></div>
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-between p-6">
                  {/* Title */}
                  <div className="flex-1 flex items-center justify-center text-center">
                    <h3 className="text-3xl sm:text-4xl font-bold leading-tight text-white" style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.9)' }}>
                      <span style={{ color: 'hsl(35, 45%, 75%)' }}>BDBT</span>
                      <span className="block">Explained</span>
                    </h3>
                  </div>
                  
                  {/* Bottom Section */}
                  <div className="flex flex-col items-center space-y-3">
                    {/* BDBT Logo */}
                    <img 
                      src="/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png" 
                      alt="BDBT Logo"
                      className="h-12 opacity-90"
                      style={{ 
                        filter: 'drop-shadow(0 0 8px rgba(255,255,255,1)) drop-shadow(0 0 4px rgba(255,255,255,0.8)) drop-shadow(2px 2px 4px rgba(0,0,0,0.8))',
                      }}
                    />
                    {/* Social Icons */}
                    <div className="flex gap-3">
                      <Instagram className="w-5 h-5 text-white" style={{ filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.8))' }} />
                      <Youtube className="w-5 h-5 text-white" style={{ filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.8))' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Vessels, The Ripples, & The Journey Section */}
      <section ref={howRef} className="py-20 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-primary">
              The Vessel, The Ripples, & The Journey
            </h2>
            <div className="text-xl text-primary max-w-3xl mx-auto">
              <ul className="space-y-2 text-left">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-3 mr-3 flex-shrink-0"></span>
                  Your body is the vessel. Prime it to make good decisions.
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-3 mr-3 flex-shrink-0"></span>
                  Your daily decisions create your ripples. Stack the right ones daily.
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-3 mr-3 flex-shrink-0"></span>
                  Your ripples shape your journey. Small wins today create a transformed tomorrow.
                </li>
              </ul>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[{
            icon: Droplets,
            title: "What goes into your body",
            description: "It's not just food and drink. It's what you see and what you hear. The inputs you feed your body, mind, and environment shape your energy, focus, and finances. Choose better fuel and watch every area of life transform.",
            color: "bg-primary/10 text-primary"
          }, {
            icon: Activity,
            title: "How you move your body",
            description: "Strength, stamina, flexibility. Movement isn't one-dimensional. Small, consistent actions build a body that carries you further, a mind that thinks sharper, and a wallet that benefits from daily momentum.",
            color: "bg-accent/10 text-accent"
          }, {
            icon: Moon,
            title: "How you rest your body",
            description: "Rest isn't passive, it's the amplifier. Quality sleep and recovery unlock energy, clarity, and resilience, turning stacked habits into lasting breakthroughs. Quality rest is the foundation of all other daily wins.",
            color: "bg-accent/10 text-accent"
          }].map((step, index) => <Card key={index} className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${step.color} rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-2 group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-primary leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>)}
          </div>

          {/* How BDBT Works for You Collapsible Section */}
          <div className="text-center">
            <Collapsible open={isHowWorkOpen} onOpenChange={handleHowWorkOpenChange}>
              <CollapsibleTrigger asChild>
                <Button variant="outline" size="lg" ref={howWorkTriggerRef} className="group">
                  How BDBT Works for You 
                  <ChevronDown className={`w-5 h-5 ml-2 transition-transform duration-200 ${isHowWorkOpen ? 'rotate-180' : ''}`} />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent ref={howWorkContentRef} className="mt-8">
                <div className="max-w-4xl mx-auto">
                  <div className="bg-warning/20 border border-warning/30 rounded-2xl p-8 text-left space-y-6">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-xl font-semibold text-primary mb-4">The Problem</h4>
                        <ul className="space-y-3 text-primary">
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            Most self-improvement advice is overwhelming and hard to stick with
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            People try to change too much at once and end up changing nothing
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            Without a system, motivation fades and old habits return
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-primary mb-4">The BDBT Solution</h4>
                        <ul className="space-y-3 text-primary">
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            Simple, high impact habits that require minimal time and minimal effort
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            Habit stacking: layer new habits on top of things you already do on autopilot
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            Track progress to build momentum that works even when motivation doesn't
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="border-t border-warning/20 pt-6">
                      <h4 className="text-xl font-semibold text-primary mb-4 text-center">What You Get</h4>
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-primary/10 border-2 border-primary/20 rounded-xl flex items-center justify-center mx-auto mb-3 hover:scale-110 hover:bg-primary/20 hover:border-primary/30 transition-all duration-300">
                            <FileText className="w-8 h-8 text-primary" />
                          </div>
                          <h5 className="font-semibold text-primary mb-2">Foundation Blueprint</h5>
                          <p className="text-sm text-primary">Your guide for spotting drifts, tracking wins and staying on course</p>
                        </div>
                        <div className="text-center">
                          <div className="w-16 h-16 bg-primary/10 border-2 border-primary/20 rounded-xl flex items-center justify-center mx-auto mb-3 hover:scale-110 hover:bg-primary/20 hover:border-primary/30 transition-all duration-300">
                            <Zap className="w-8 h-8 text-primary" />
                          </div>
                          <h5 className="font-semibold text-primary mb-2">Daily Tips</h5>
                          <p className="text-sm text-primary">Small daily steps that quietly transform your health, wealth and happiness</p>
                        </div>
                        <div className="text-center">
                          <div className="w-16 h-16 bg-primary/10 border-2 border-primary/20 rounded-xl flex items-center justify-center mx-auto mb-3 hover:scale-110 hover:bg-primary/20 hover:border-primary/30 transition-all duration-300">
                            <Headphones className="w-8 h-8 text-primary" />
                          </div>
                          <h5 className="font-semibold text-primary mb-2">BDBT Guidance</h5>
                          <p className="text-sm text-primary">Daily podcasts, free guides and social posts explaining every tip</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-center pt-4 border-t border-warning/20">
                      <Button variant="outline" size="lg" asChild>
                        <Link to="/about">
                          Learn More About Our Story <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                      </Button>
                    </div>

                    {/* 9 Limiting Beliefs BDBT Breaks - Complete Document */}
                    <div className="mt-8 pt-8 border-t border-warning/20">
                      <h4 className="text-xl font-semibold text-primary mb-6 text-center">9 Limiting Beliefs That BDBT Breaks</h4>
                      
                      <div className="space-y-8">

                        {/* Belief #1 */}
                        <div className="space-y-4">
                          <div className="p-4 bg-background/50 rounded-lg border border-warning/20">
                            <div className="flex items-start mb-2">
                              <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">1</span>
                              <div>
                                <h5 className="font-semibold text-primary mb-1">"This is just another self-help system."</h5>
                                <p className="text-sm text-muted-foreground italic mb-2">Past experience: Tried courses that didn't stick.</p>
                                <p className="text-sm text-muted-foreground">The story you may now tell yourself: "It's just more fluff. I've heard it all before."</p>
                              </div>
                            </div>
                          </div>
                          <div className="pl-8">
                            <h6 className="font-semibold text-primary mb-2">What I realised:</h6>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              I used to think the same thing. I'd tried courses, books, spreadsheets, planners, and every time I got the same result: a short buzz, then nothing. What changed for me wasn't finding more advice. It was realising that the power wasn't in the information, it was in how you apply it. One evening, after weeks of just doing five minutes of movement in the morning and a 10-minute wind-down routine at night, I realised I wasn't stressed. The kids were calm. I was calm. Nothing in my life had been overhauled, but everything was working better. That's when I realised: this isn't self-help. This is life design. And it works because it's stacked, not scattered.
                            </p>
                          </div>
                        </div>

                        {/* Belief #2 */}
                        <div className="space-y-4">
                          <div className="p-4 bg-background/50 rounded-lg border border-warning/20">
                            <div className="flex items-start mb-2">
                              <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">2</span>
                              <div>
                                <h5 className="font-semibold text-primary mb-1">"I already know what to do."</h5>
                                <p className="text-sm text-muted-foreground italic mb-2">Past experience: Consumed info but didn't apply it.</p>
                                <p className="text-sm text-muted-foreground">The story you may now tell yourself: "It's my fault. I don't need a system. I just need more willpower."</p>
                              </div>
                            </div>
                          </div>
                          <div className="pl-8">
                            <h6 className="font-semibold text-primary mb-2">What I realised:</h6>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              For years, I told myself I had all the answers. I'd read the books, listened to the podcasts, taken the notes. I didn't need a system, I needed more willpower. Until one day, I looked at my notes and thought, "If knowing was enough, I'd be thriving by now." That's when it clicked: the problem wasn't knowledge. It was integration. I had all the right pieces, but no structure to make them work together. That's what BDBT gave me, a way to link it all together. The shift came not from more effort, but from better design.
                            </p>
                          </div>
                        </div>

                        {/* Belief #3 */}
                        <div className="space-y-4">
                          <div className="p-4 bg-background/50 rounded-lg border border-warning/20">
                            <div className="flex items-start mb-2">
                              <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">3</span>
                              <div>
                                <h5 className="font-semibold text-primary mb-1">"Small habits don't matter."</h5>
                                <p className="text-sm text-muted-foreground italic mb-2">Past experience: Tried habits but saw no big change.</p>
                                <p className="text-sm text-muted-foreground">The story you may now tell yourself: "Tiny changes don't add up to anything meaningful."</p>
                              </div>
                            </div>
                          </div>
                          <div className="pl-8">
                            <h6 className="font-semibold text-primary mb-2">What I realised:</h6>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              I used to chase big results, big transformations, big declarations, big overhauls. But they never lasted. What finally changed everything was going small. I didn't try to change my diet, routine, mindset, finances all at once. I started with a 5-minute morning movement, a 2-minute budget ritual, and a 5-minute evening reflection. That's it. And over time, I saw the ripple: I was calmer, sharper, saving money, moving more. The small things became the big change. That's when I realised, it's not about how much you do. It's about where the ripples go.
                            </p>
                          </div>
                        </div>

                        {/* Belief #4 */}
                        <div className="space-y-4">
                          <div className="p-4 bg-background/50 rounded-lg border border-warning/20">
                            <div className="flex items-start mb-2">
                              <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">4</span>
                              <div>
                                <h5 className="font-semibold text-primary mb-1">"I'm too busy."</h5>
                                <p className="text-sm text-muted-foreground italic mb-2">Past experience: Overloaded schedule, past failures.</p>
                                <p className="text-sm text-muted-foreground">The story you may now tell yourself: "There's no space for more. I'll just burn out."</p>
                              </div>
                            </div>
                          </div>
                          <div className="pl-8">
                            <h6 className="font-semibold text-primary mb-2">What I realised:</h6>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              When I became a single dad 50% of the week, with a business to run the other 50%, I genuinely believed there was no room for anything. But the truth was, my time was leaking through the cracks, endless scrolling, takeaways, decision fatigue, disorganised evenings. I didn't need more time, I needed more structure. Just five minutes of the right habit gave me time back. I got calmer, more present, more productive and the chaos slowed down. That's when I realised: busyness isn't the enemy. Drift is.
                            </p>
                          </div>
                        </div>

                        {/* Belief #5 */}
                        <div className="space-y-4">
                          <div className="p-4 bg-background/50 rounded-lg border border-warning/20">
                            <div className="flex items-start mb-2">
                              <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">5</span>
                              <div>
                                <h5 className="font-semibold text-primary mb-1">"I always fail."</h5>
                                <p className="text-sm text-muted-foreground italic mb-2">Past experience: Repeated broken promises to self.</p>
                                <p className="text-sm text-muted-foreground">The story you may now tell yourself: "Why bother? I'll just quit again."</p>
                              </div>
                            </div>
                          </div>
                          <div className="pl-8">
                            <h6 className="font-semibold text-primary mb-2">What I realised:</h6>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              I've started and quit more habits than I can count. What changed wasn't that I suddenly became more disciplined, it was that I finally stopped relying on motivation. I built habits that could survive bad days. Even if I only hit 70%, I kept moving forward. That was the difference: not perfection, but momentum. One month in, I realised this was sticking because it wasn't designed for a perfect version of me. It was designed for the real me. The one with kids, work, mess, and stress.
                            </p>
                          </div>
                        </div>

                        {/* Belief #6 */}
                        <div className="space-y-4">
                          <div className="p-4 bg-background/50 rounded-lg border border-warning/20">
                            <div className="flex items-start mb-2">
                              <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">6</span>
                              <div>
                                <h5 className="font-semibold text-primary mb-1">"I'm too old to change."</h5>
                                <p className="text-sm text-muted-foreground italic mb-2">Past experience: Feels stuck, sees others succeed.</p>
                                <p className="text-sm text-muted-foreground">The story you may now tell yourself: "It's too late for me. This works for them, not me."</p>
                              </div>
                            </div>
                          </div>
                          <div className="pl-8">
                            <h6 className="font-semibold text-primary mb-2">What I realised:</h6>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              I'm not a superhuman biohacker. I'm not an influencer. I'm just a guy who had to figure out how to stay sane and strong while raising two kids, running a business, and trying not to burn out. I didn't "overhaul" anything. I just started stacking little wins. A few minutes a day. A few small decisions. And over time, they added up to a completely different direction. That's when I realised people like me don't change everything overnight. But we can change the trajectory. And that's what really matters.
                            </p>
                          </div>
                        </div>

                        {/* Belief #7 */}
                        <div className="space-y-4">
                          <div className="p-4 bg-background/50 rounded-lg border border-warning/20">
                            <div className="flex items-start mb-2">
                              <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">7</span>
                              <div>
                                <h5 className="font-semibold text-primary mb-1">"My environment will derail me."</h5>
                                <p className="text-sm text-muted-foreground italic mb-2">Past experience: Family/friends discourage progress.</p>
                                <p className="text-sm text-muted-foreground">The story you may now tell yourself: "What's the point? I'll get dragged back down."</p>
                              </div>
                            </div>
                          </div>
                          <div className="pl-8">
                            <h6 className="font-semibold text-primary mb-2">What I realised:</h6>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              When I started building my system, I worried I'd get derailed by everything around me, social invites, the kids' routines, other people's chaos. But what I found was that I became the anchor. When I stuck to my simple habits, not perfectly, but consistently, the people around me actually adjusted. I wasn't preaching, I was just showing up better. And slowly, that had more impact than anything I'd said. That's when I realised: the strongest ripple comes from living it, not talking about it.
                            </p>
                          </div>
                        </div>

                        {/* Belief #8 */}
                        <div className="space-y-4">
                          <div className="p-4 bg-background/50 rounded-lg border border-warning/20">
                            <div className="flex items-start mb-2">
                              <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">8</span>
                              <div>
                                <h5 className="font-semibold text-primary mb-1">"My loved ones won't change."</h5>
                                <p className="text-sm text-muted-foreground italic mb-2">Past experience: Tried helping others to no avail.</p>
                                <p className="text-sm text-muted-foreground">The story you may now tell yourself: "If they won't change, why should I? I'll just stay where I am."</p>
                              </div>
                            </div>
                          </div>
                          <div className="pl-8">
                            <h6 className="font-semibold text-primary mb-2">What I realised:</h6>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              Watching people you love drift is hard. I've seen it in my own family and no matter how much I care, they don't always want to hear it from me. That's painful. But what keeps me going is the belief that if I can be the voice someone else's loved one listens to, then I've done my job. I might not reach my family directly, but someone else might. And in return, I might be the person your family finally hears. That's what this movement is about. Ripples reaching where we can't.
                            </p>
                          </div>
                        </div>

                        {/* Belief #9 */}
                        <div className="space-y-4">
                          <div className="p-4 bg-background/50 rounded-lg border border-warning/20">
                            <div className="flex items-start mb-2">
                              <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">9</span>
                              <div>
                                <h5 className="font-semibold text-primary mb-1">"I'll start when life calms down."</h5>
                                <p className="text-sm text-muted-foreground italic mb-2">Past experience: Life always interrupts change.</p>
                                <p className="text-sm text-muted-foreground">The story you may now tell yourself: "Now isn't the time, it's too hectic to start anything new."</p>
                              </div>
                            </div>
                          </div>
                          <div className="pl-8">
                            <h6 className="font-semibold text-primary mb-2">What I realised:</h6>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              I used to think the same. "I'll start when work slows down. When the kids are older. When things feel more manageable." But that perfect moment never came. The truth is, life never calms down. And once I realised that, I stopped waiting. I started anyway, with 5 minutes a day. That's all I could give, and that's all I needed. A few weeks in, things didn't feel calmer but I did. I realised I didn't need a better life to start. I just needed a better system to start in the life I already had.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        </div>
      </section>

      {/* Strong vessel section - now orange */}
      <section className="py-20 bg-warning text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-white">
            Strong vessel, smoother journey
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12">
            Build the daily habits that become the foundation for lasting transformation in every area of your life.
          </p>
          <div className="flex justify-center">
            <Button variant="colored-bg" size="lg" asChild className="w-full sm:w-auto max-w-sm">
              <Link to="/blueprint">
                Get Your Foundation Blueprint <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Daily Wins and Daily Drifts Boxes */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Daily Wins Box - Green */}
            <Card className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-2 bg-success/10 border-success/20">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-success rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-success mb-4">Daily Wins</h3>
                <p className="text-primary leading-relaxed">
                  Actions that invest in your future self. Tiny daily choices that create powerful ripple effects across your entire life. Celebrate and track these daily victories. Every small daily win builds momentum towards your bigger goals.
                </p>
              </CardContent>
            </Card>

            {/* Daily Drifts Box - Red */}
            <Card className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-2 bg-destructive/10 border-destructive/20">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-destructive rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <AlertTriangle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-destructive mb-4">Daily Drifts</h3>
                <p className="text-primary leading-relaxed">
                  Identify the small habits that are slowly pulling you away from your goals before they compound.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Feeling Stuck Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-primary">
              Feeling Stuck?
            </h2>
            <p className="text-xl text-primary max-w-3xl mx-auto mb-8">
              You're smart enough to compound over time and strong enough to rebuild your identity from the inside out.
            </p>
            <p className="text-xl text-primary max-w-3xl mx-auto mb-8">
              You don't need another goal. You need an achievable daily win that creates a ripple effect across your entire life.
            </p>
            <p className="text-xl text-primary max-w-3xl mx-auto mb-8">
              If you feel stuck, scattered, or just know you're capable of more, this is your next step.
            </p>
            <p className="text-xl text-primary max-w-3xl mx-auto mb-12 font-semibold">
              One habit today. A different life tomorrow. Let's build it together - one tip at a time.
            </p>
            <div className="flex justify-center">
              <Button variant="outline" size="lg" asChild className="w-full sm:w-auto max-w-sm">
                <Link to="/blueprint">
                  Start Your Journey <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
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
            <p className="text-xl text-primary max-w-3xl mx-auto">Tested strategies that quietly transform your health, wealth, and happiness through small daily actions.</p>
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