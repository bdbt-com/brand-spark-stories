import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Droplets, Activity, Moon, DollarSign, Heart, Smile, Target, Zap, ChevronDown, Trophy, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { useEffect, useState, useRef } from "react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import ChevronRipple from "@/components/ChevronRipple";

const Home = () => {
  const images = [
    "/lovable-uploads/091ea38c-18d1-4a6c-b3d0-b2e9e92d382d.png",
    "/lovable-uploads/106caa66-a28a-4871-b4da-391b59d6c6ee.png",
    "/lovable-uploads/11966bbc-71f9-40df-ac7d-d99bead4b5d3.png",
    "/lovable-uploads/2e4d322c-a647-4622-b44d-912958bfa401.png",
    "/lovable-uploads/429221d1-d6c7-4743-9918-18a35e4a4eb2.png",
    "/lovable-uploads/59a1a8dd-ab26-431d-b9c6-9da3f2f01f38.png",
    "/lovable-uploads/5e436d55-85a6-48ef-bef9-69ba7502f2a9.png",
    "/lovable-uploads/5e8aba04-f6cc-44a2-9bcc-eaf2424e3976.png",
    "/lovable-uploads/639b2e42-bb5e-4e0f-a150-3c447b0ca4d2.png",
    "/lovable-uploads/711d369c-9d1d-4efb-9800-98349c1c7a48.png",
    "/lovable-uploads/7208834d-dbba-4fc6-8da5-2f81f4e3796f.png",
    "/lovable-uploads/8c209669-d4f3-4beb-9184-98693514ffca.png",
    "/lovable-uploads/bb15285e-dc4c-46ae-93a2-3c27d8cad778.png",
    "/lovable-uploads/dd8771a0-3f95-4ef7-838b-c6e40d9f78c4.png",
  ];
  const [embla, setEmbla] = useState<CarouselApi | null>(null);
  const [filteredImages, setFilteredImages] = useState<string[]>([]);
  const [isHowOpen, setIsHowOpen] = useState(false);
  const [isHowWorkOpen, setIsHowWorkOpen] = useState(false);
  const howRef = useRef<HTMLDivElement>(null);
  const howWorkContentRef = useRef<HTMLDivElement>(null);
  const howContentRef = useRef<HTMLDivElement>(null);
  
  const handleScrollToHow = () => {
    howRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
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
  const isPhotoLike = (src: string): Promise<boolean> =>
    new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const size = 32;
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        if (!ctx) return resolve(true);
        ctx.drawImage(img, 0, 0, size, size);
        const { data } = ctx.getImageData(0, 0, size, size);
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
      const keep = await Promise.all(images.map((s) => isPhotoLike(s)));
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-white py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="block text-white">Small Daily Steps.</span>
                <span className="block text-[hsl(35_45%_75%)]">Big Life Change.</span>
              </h1>
              <p className="text-base lg:text-lg mb-8 text-white/90 leading-relaxed">
                Big Daddy's Big Tips teaches simple daily habits that silently transform your health, wealth, and happiness simultaneously. We turn overwhelming life changes into achievable daily steps.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                {/* Get Your Foundation Blueprint Here - enlarged and centered */}
                <div className="relative">
                  <Button variant="secondary" size="lg" asChild className="relative transition-transform duration-200 rounded-xl h-14 md:h-16 px-8 md:px-10 text-lg md:text-xl">
                    <Link to="/blueprint">
                      Get Your Foundation Blueprint Here <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            <div className="animate-float">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-strong">
                <Carousel
                  setApi={setEmbla}
                  opts={{ loop: true }}
                  className="w-full"
                  aria-label="Daily success journey image carousel"
                >
                  <CarouselContent>
                    {(filteredImages.length ? filteredImages : images).map((src, idx) => (
                      <CarouselItem key={src}>
                        <img
                          src={src}
                          alt={`Big Life Change inspiration image ${idx + 1}`}
                          className="w-full h-[480px] object-cover rounded-xl"
                          loading={idx === 0 ? "eager" : "lazy"}
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom Chevron Scroll to How BDBT Works */}
        <button
          aria-label="Scroll to How BDBT Works"
          onClick={handleScrollToHow}
          className="group absolute z-10 bottom-16 left-1/2 -translate-x-1/2"
        >
          <div className="relative w-14 h-14">
            <div className="relative w-14 h-14 rounded-full bg-white/15 backdrop-blur border border-white/30 flex items-center justify-center">
              <ChevronDown className="w-6 h-6 text-white transition-transform group-hover:translate-y-0.5" />
            </div>
          </div>
        </button>
      </section>

      {/* How BDBT Works Section */}
      <section ref={howRef} className="py-20 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-primary">
              How BDBT Works for You
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The simple system that transforms chaotic life changes into achievable daily steps.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Target,
                title: "Spot Your Drifts",
                description: "Identify the small, unconscious habits that are slowly pulling you away from your goals.",
                color: "bg-primary/10 text-primary"
              },
              {
                icon: Zap,
                title: "Stack Your Wins",
                description: "Build momentum by connecting new habits to existing routines for effortless integration.",
                color: "bg-accent/10 text-accent"
              },
              {
                icon: Heart,
                title: "Track Your Journey",
                description: "Document every step of your transformation and celebrate the compound effect of consistency.",
                color: "bg-success/10 text-success"
              }
            ].map((step, index) => (
              <Card key={index} className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${step.color} rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-2 group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
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
                        <ul className="space-y-3 text-muted-foreground">
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
                        <ul className="space-y-3 text-muted-foreground">
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            Simple, tested strategies that take 5 minutes or less
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            Habit stacking: Connect new habits to existing routines
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
                          <div className="w-16 h-16 bg-warning rounded-xl flex items-center justify-center mx-auto mb-3 hover:scale-110 transition-transform duration-300">
                            <Target className="w-8 h-8 text-primary" />
                          </div>
                          <h5 className="font-semibold text-primary mb-2">Foundation Blueprint</h5>
                          <p className="text-sm text-muted-foreground">Your personal habit stacking reference point</p>
                        </div>
                        <div className="text-center">
                          <div className="w-16 h-16 bg-warning rounded-xl flex items-center justify-center mx-auto mb-3 hover:scale-110 transition-transform duration-300">
                            <Zap className="w-8 h-8 text-primary" />
                          </div>
                          <h5 className="font-semibold text-primary mb-2">118 Daily Tips</h5>
                          <p className="text-sm text-muted-foreground">Tested strategies for health, wealth & happiness</p>
                        </div>
                        <div className="text-center">
                          <div className="w-16 h-16 bg-warning rounded-xl flex items-center justify-center mx-auto mb-3 hover:scale-110 transition-transform duration-300">
                            <Heart className="w-8 h-8 text-primary" />
                          </div>
                          <h5 className="font-semibold text-primary mb-2">Progress Tracking</h5>
                          <p className="text-sm text-muted-foreground">Document your journey and celebrate wins</p>
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

                    {/* 9 Limiting Beliefs BDBT Breaks */}
                    <div className="mt-8 pt-8 border-t border-warning/20">
                      <h4 className="text-xl font-semibold text-primary mb-6 text-center">9 Limiting Beliefs BDBT Breaks</h4>
                      <div className="space-y-6">
                        <div className="grid md:grid-cols-1 gap-4">
                          <div className="space-y-4">
                            <div className="p-4 bg-background/50 rounded-lg border border-warning/20">
                              <div className="flex items-start mb-2">
                                <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">1</span>
                                <div>
                                  <h5 className="font-semibold text-primary mb-1">"This is just another self-help system."</h5>
                                  <p className="text-sm text-muted-foreground italic mb-2">Experience: Tried courses that didn't stick.</p>
                                  <p className="text-sm text-muted-foreground">Story: "It's just more fluff. I've heard it all before."</p>
                                </div>
                              </div>
                            </div>
                            
                            <div className="p-4 bg-background/50 rounded-lg border border-warning/20">
                              <div className="flex items-start mb-2">
                                <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">2</span>
                                <div>
                                  <h5 className="font-semibold text-primary mb-1">"I already know what to do."</h5>
                                  <p className="text-sm text-muted-foreground italic mb-2">Experience: Consumed info but didn't apply it.</p>
                                  <p className="text-sm text-muted-foreground">Story: "It's my fault. I don't need a system. I just need more willpower."</p>
                                </div>
                              </div>
                            </div>

                            <div className="p-4 bg-background/50 rounded-lg border border-warning/20">
                              <div className="flex items-start mb-2">
                                <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">3</span>
                                <div>
                                  <h5 className="font-semibold text-primary mb-1">"Small habits don't matter."</h5>
                                  <p className="text-sm text-muted-foreground italic mb-2">Experience: Tried habits but saw no big change.</p>
                                  <p className="text-sm text-muted-foreground">Story: "Tiny changes don't add up to anything meaningful."</p>
                                </div>
                              </div>
                            </div>

                            <div className="p-4 bg-background/50 rounded-lg border border-warning/20">
                              <div className="flex items-start mb-2">
                                <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">4</span>
                                <div>
                                  <h5 className="font-semibold text-primary mb-1">"I'm too busy."</h5>
                                  <p className="text-sm text-muted-foreground italic mb-2">Experience: Overloaded schedule, past failures.</p>
                                  <p className="text-sm text-muted-foreground">Story: "There's no space for more. I'll just burn out."</p>
                                </div>
                              </div>
                            </div>

                            <div className="p-4 bg-background/50 rounded-lg border border-warning/20">
                              <div className="flex items-start mb-2">
                                <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">5</span>
                                <div>
                                  <h5 className="font-semibold text-primary mb-1">"I always fail."</h5>
                                  <p className="text-sm text-muted-foreground italic mb-2">Experience: Repeated broken promises to self.</p>
                                  <p className="text-sm text-muted-foreground">Story: "Why bother? I'll just quit again."</p>
                                </div>
                              </div>
                            </div>

                            <div className="p-4 bg-background/50 rounded-lg border border-warning/20">
                              <div className="flex items-start mb-2">
                                <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">6</span>
                                <div>
                                  <h5 className="font-semibold text-primary mb-1">"People like me don't change."</h5>
                                  <p className="text-sm text-muted-foreground italic mb-2">Experience: Feels stuck, sees others succeed.</p>
                                  <p className="text-sm text-muted-foreground">Story: "It's too late for me. This works for them, not me."</p>
                                </div>
                              </div>
                            </div>

                            <div className="p-4 bg-background/50 rounded-lg border border-warning/20">
                              <div className="flex items-start mb-2">
                                <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">7</span>
                                <div>
                                  <h5 className="font-semibold text-primary mb-1">"My environment will derail me."</h5>
                                  <p className="text-sm text-muted-foreground italic mb-2">Experience: Family/friends discourage progress.</p>
                                  <p className="text-sm text-muted-foreground">Story: "What's the point? I'll get dragged back down."</p>
                                </div>
                              </div>
                            </div>

                            <div className="p-4 bg-background/50 rounded-lg border border-warning/20">
                              <div className="flex items-start mb-2">
                                <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">8</span>
                                <div>
                                  <h5 className="font-semibold text-primary mb-1">"My loved ones won't change."</h5>
                                  <p className="text-sm text-muted-foreground italic mb-2">Experience: Tried helping others to no avail.</p>
                                  <p className="text-sm text-muted-foreground">Story: "If they won't change, why should I? I'll just stay where I am."</p>
                                </div>
                              </div>
                            </div>

                            <div className="p-4 bg-background/50 rounded-lg border border-warning/20">
                              <div className="flex items-start mb-2">
                                <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">9</span>
                                <div>
                                  <h5 className="font-semibold text-primary mb-1">"I'll start when life calms down."</h5>
                                  <p className="text-sm text-muted-foreground italic mb-2">Experience: Life always interrupts change.</p>
                                  <p className="text-sm text-muted-foreground">Story: "Now isn't the time, it's too hectic to start anything new."</p>
                                </div>
                              </div>
                            </div>
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

      {/* Second CTA Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/blueprint">
                Get Your Foundation Blueprint Here <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Strong vessel, smoother journey section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-white">
            Strong vessel, smoother journey
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12">
            Build the daily habits that become the foundation for lasting transformation in every area of your life.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="accent" size="lg" asChild>
              <Link to="/blueprint">
                Get Your Free Starter Kit Here <ArrowRight className="w-5 h-5 ml-2" />
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
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Celebrate and track your daily victories. Every small win builds momentum toward your bigger goals.
                </p>
                <Button variant="outline" size="lg" asChild className="border-success/30 text-success hover:bg-success hover:text-white">
                  <Link to="/daily-wins">
                    View Daily Wins <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Daily Drifts Box - Red */}
            <Card className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-2 bg-destructive/10 border-destructive/20">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-destructive rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <AlertTriangle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-destructive mb-4">Daily Drifts</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Identify the small habits that are slowly pulling you away from your goals before they compound.
                </p>
                <Button variant="outline" size="lg" asChild className="border-destructive/30 text-destructive hover:bg-destructive hover:text-white">
                  <Link to="/tips">
                    Spot Your Drifts <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
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
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              117 tested strategies to transform your health, wealth, and happiness through small daily actions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Droplets,
                title: "Only Drink Water",
                description: "Simple hydration hack that saves money and transforms your energy levels."
              },
              {
                icon: Activity,
                title: "Track Your Heart Rate",
                description: "Free health monitoring that gives you insights into your recovery and fitness."
              },
              {
                icon: Moon,
                title: "Hide Your Phone at Night",
                description: "Digital detox strategy that improves sleep quality and morning productivity."
              }
            ].map((tip, index) => (
              <Card key={index} className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <tip.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-2 group-hover:text-primary transition-colors">
                    {tip.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {tip.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/tips">
                View All Tips <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;