import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Droplets, Activity, Moon, DollarSign, Heart, Smile, Target, Zap, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { useEffect, useState, useRef } from "react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import ChevronRipple from "@/components/ChevronRipple";

const Home = () => {
  const images = [
    "/lovable-uploads/091ea38c-18d1-4a6c-4b3d0-b2e9e92d382d.png",
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

  const howWorkTriggerRef = useRef<HTMLDivElement>(null);
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
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="block text-primary">Small Daily Steps.</span>
                <span className="block text-[hsl(35_45%_75%)]">Big Life Change.</span>
              </h1>
              <p className="text-lg lg:text-xl mb-8 text-white/90 leading-relaxed">
                Big Daddy's Big Tips teaches simple daily habits that silently transform your health, wealth, and happiness simultaneously. We turn overwhelming life changes into achievable daily steps.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                {/* Read My Story - enlarged and centered */}
                <div className="relative">
                  <Button variant="secondary" size="lg" asChild className="relative hover:scale-105 transition-transform duration-200 rounded-xl h-14 md:h-16 px-8 md:px-10 text-lg md:text-xl">
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
              <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse" style={{ animationDuration: '3s' }}></div>
              <div className="relative w-14 h-14 rounded-full bg-white/15 backdrop-blur border border-white/30 flex items-center justify-center">
                <ChevronDown className="w-6 h-6 text-white transition-transform group-hover:translate-y-0.5" />
              </div>
            </div>
          </button>
        </section>

      {/* How BDBT Works - Collapsible Content */}
      <Collapsible open={isHowOpen} onOpenChange={handleHowOpenChange}>
        <CollapsibleContent ref={howContentRef}>
          <div className="py-12 bg-gradient-subtle border-t">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <Card className="bg-background/95 backdrop-blur-sm border-primary/20 shadow-strong">
                <CardContent className="p-8 lg:p-12">
                  <article className="prose prose-lg max-w-none text-muted-foreground">
                    <h2 className="text-3xl font-bold text-primary mb-6">How BDBT Works for You</h2>
                    <h3 className="text-2xl font-semibold text-primary mt-10 mb-4">Limiting beliefs stopping people from adopting BDBT</h3>
                    <div className="space-y-6">
                      <div>
                        <p className="font-semibold text-foreground">Belief:</p>
                        <p>"This is just another self-help system."</p>
                        <p className="font-semibold text-foreground mt-2">Experience:</p>
                        <p>Tried courses that didn't stick.</p>
                        <p className="font-semibold text-foreground mt-2">Story they're telling themselves:</p>
                        <p>"It's just more fluff. I've heard it all before."</p>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Belief:</p>
                        <p>"I already know what to do."</p>
                        <p className="font-semibold text-foreground mt-2">Experience:</p>
                        <p>Consumed info but didn’t apply it.</p>
                        <p className="font-semibold text-foreground mt-2">Story they're telling themselves:</p>
                        <p>"It’s my fault. I don’t need a system. I just need more willpower."</p>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Belief:</p>
                        <p>"Small habits don’t matter."</p>
                        <p className="font-semibold text-foreground mt-2">Experience:</p>
                        <p>Tried habits but saw no big change.</p>
                        <p className="font-semibold text-foreground mt-2">Story they're telling themselves:</p>
                        <p>"Tiny changes don’t add up to anything meaningful."</p>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Belief:</p>
                        <p>"I’m too busy."</p>
                        <p className="font-semibold text-foreground mt-2">Experience:</p>
                        <p>Overloaded schedule, past failures.</p>
                        <p className="font-semibold text-foreground mt-2">Story they're telling themselves:</p>
                        <p>"There’s no space for more. I’ll just burn out."</p>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Belief:</p>
                        <p>"I always fail."</p>
                        <p className="font-semibold text-foreground mt-2">Experience:</p>
                        <p>Repeated broken promises to self.</p>
                        <p className="font-semibold text-foreground mt-2">Story they're telling themselves:</p>
                        <p>"Why bother? I’ll just quit again."</p>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Belief:</p>
                        <p>"People like me don’t change."</p>
                        <p className="font-semibold text-foreground mt-2">Experience:</p>
                        <p>Feels stuck, sees others succeed.</p>
                        <p className="font-semibold text-foreground mt-2">Story they're telling themselves:</p>
                        <p>"It’s too late for me. This works for them, not me."</p>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Belief:</p>
                        <p>"My environment will derail me."</p>
                        <p className="font-semibold text-foreground mt-2">Experience:</p>
                        <p>Family/friends discourage progress.</p>
                        <p className="font-semibold text-foreground mt-2">Story they're telling themselves:</p>
                        <p>"What’s the point? I’ll get dragged back down."</p>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Belief:</p>
                        <p>"My loved ones won’t change."</p>
                        <p className="font-semibold text-foreground mt-2">Experience:</p>
                        <p>Tried helping others to no avail.</p>
                        <p className="font-semibold text-foreground mt-2">Story they're telling themselves:</p>
                        <p>"If they won’t change, why should I? I’ll just stay where I am."</p>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Belief:</p>
                        <p>"I’ll start when life calms down."</p>
                        <p className="font-semibold text-foreground mt-2">Experience:</p>
                        <p>Life always interrupts change.</p>
                        <p className="font-semibold text-foreground mt-2">Story they're telling themselves:</p>
                        <p>"Now isn’t the time, it’s too hectic to start anything new."</p>
                      </div>
                    </div>

                    <div className="space-y-10 mt-12">
                      <div>
                        <h3 className="text-2xl font-semibold text-primary">False Belief #1: “This is just another self-help system.”</h3>
                        <p className="mt-3">I used to think the same thing. I’d tried courses, books, spreadsheets, planners, and every time I got the same result: a short buzz, then nothing. What changed for me wasn’t finding more advice. It was realising that the power wasn’t in the information, it was in how you apply it. One evening, after weeks of just doing five minutes of movement in the morning and a 10-minute wind-down routine at night, I realised I wasn’t stressed. The kids were calm. I was calm. Nothing in my life had been overhauled, but everything was working better. That’s when I realised: this isn’t self-help. This is life design. And it works because it’s stacked, not scattered.</p>
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-primary">False Belief #2: “I already know what to do, I just need to do it.”</h3>
                        <p className="mt-3">For years, I told myself I had all the answers. I’d read the books, listened to the podcasts, taken the notes. I didn’t need a system, I needed more willpower. Until one day, I looked at my notes and thought, “If knowing was enough, I’d be thriving by now.” That’s when it clicked: the problem wasn’t knowledge. It was integration. I had all the right pieces, but no structure to make them work together. That’s what BDBT gave me, a way to link it all together. The shift came not from more effort, but from better design.</p>
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-primary">False Belief #3: “Small habits won’t make a big enough difference.”</h3>
                        <p className="mt-3">I used to chase big results, big transformations, big declarations, big overhauls. But they never lasted. What finally changed everything was going small. I didn’t try to change my diet, routine, mindset, finances all at once. I started with a 5-minute morning movement, a 2-minute budget ritual, and a 5-minute evening reflection. That’s it. And over time, I saw the ripple: I was calmer, sharper, saving money, moving more. The small things became the big change. That’s when I realised, it’s not about how much you do. It’s about where the ripples go.</p>
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-primary">False Belief #4: “I’m too busy to add anything new to my day.”</h3>
                        <p className="mt-3">When I became a single dad 50% of the week, with a business to run the other 50%, I genuinely believed there was no room for anything. But the truth was, my time was leaking through the cracks, endless scrolling, takeaways, decision fatigue, disorganised evenings. I didn’t need more time, I needed more structure. Just five minutes of the right habit gave me time back. I got calmer, more present, more productive and the chaos slowed down. That’s when I realised: busyness isn’t the enemy. Drift is.</p>
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-primary">False Belief #5: “I’ve failed too many times, this won’t stick either.”</h3>
                        <p className="mt-3">I’ve started and quit more habits than I can count. What changed wasn’t that I suddenly became more disciplined, it was that I finally stopped relying on motivation. I built habits that could survive bad days. Even if I only hit 70%, I kept moving forward. That was the difference: not perfection, but momentum. One month in, I realised this was sticking because it wasn’t designed for a perfect version of me. It was designed for the real me. The one with kids, work, mess, and stress.</p>
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-primary">False Belief #6: “People like me don’t change their whole life with a few tips.”</h3>
                        <p className="mt-3">I’m not a superhuman biohacker. I’m not an influencer. I’m just a guy who had to figure out how to stay sane and strong while raising two kids, running a business, and trying not to burn out. I didn’t “overhaul” anything. I just started stacking little wins. A few minutes a day. A few small decisions. And over time, they added up to a completely different direction. That’s when I realised people like me don’t change everything overnight. But we can change the trajectory. And that’s what really matters.</p>
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-primary">False Belief #7: “My friends or family will pull me off track anyway.”</h3>
                        <p className="mt-3">When I started building my system, I worried I’d get derailed by everything around me, social invites, the kids' routines, other people’s chaos. But what I found was that I became the anchor. When I stuck to my simple habits, not perfectly, but consistently, the people around me actually adjusted. I wasn’t preaching, I was just showing up better. And slowly, that had more impact than anything I’d said. That’s when I realised: the strongest ripple comes from living it, not talking about it.</p>
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-primary">False Belief #8: “Nobody around me will change, so what’s the point?”</h3>
                        <p className="mt-3">Watching people you love drift is hard. I’ve seen it in my own family  and no matter how much I care, they don’t always want to hear it from me. That’s painful. But what keeps me going is the belief that if I can be the voice someone else’s loved one listens to, then I’ve done my job. I might not reach my family directly, but someone else might. And in return, I might be the person your family finally hears. That’s what this movement is about. Ripples reaching where we can’t.</p>
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-primary">False Belief #9: “I’ll start when life calms down.”</h3>
                        <p className="mt-3">I used to think the same. “I’ll start when work slows down. When the kids are older. When things feel more manageable.” But that perfect moment never came. The truth is, life never calms down. And once I realised that, I stopped waiting. I started anyway, with 5 minutes a day. That’s all I could give, and that’s all I needed. A few weeks in, things didn’t feel calmer but I did. I realised I didn’t need a better life to start. I just needed a better system to start in the life I already had.</p>
                      </div>
                    </div>
                  </article>
                </CardContent>
              </Card>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Main CTA Section - Blue Background */}
      <section className="py-32 bg-gradient-hero text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <div className="space-y-6 text-center">
              <h3 className="text-3xl font-bold leading-tight text-white">
                Strong vessel, smoother journey
              </h3>
              <p className="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
                When you strengthen your daily practices, you strengthen yourself. Small changes build momentum. Momentum drives transformation.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
                <Button variant="ghost" size="lg" asChild className="hover:scale-105 transition-transform duration-200 border border-white/20 text-white hover:bg-white/10">
                  <Link to="/blueprint">Get Your Foundation Blueprint Here</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How BDBT Actually Works - Collapsible */}
      <div ref={howRef}>
        <Collapsible open={isHowWorkOpen} onOpenChange={handleHowWorkOpenChange}>
          <CollapsibleTrigger asChild>
            <div className="py-16 bg-background text-center cursor-pointer">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" ref={howWorkTriggerRef}>
                <Button
                  variant="outline"
                  size="lg"
                  className="group text-lg px-8 py-6 h-auto transition-all duration-300 hover:shadow-medium hover:scale-105"
                >
                  <Target className="w-6 h-6 mr-3" />
                  How BDBT Works for You
                  <ChevronDown className={`w-5 h-5 ml-3 transition-transform duration-300 ${isHowWorkOpen ? 'rotate-180' : ''}`} />
                </Button>
              </div>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="py-20 bg-gradient-subtle" ref={howWorkContentRef}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16">
                  <div className="space-y-8">
                    <h2 className="text-3xl font-bold text-primary">Three Pillars of Transformation</h2>
                    
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                          <Heart className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-primary mb-2">Health</h3>
                          <p className="text-muted-foreground">Simple daily practices that compound into extraordinary vitality and energy.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                          <DollarSign className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-primary mb-2">Wealth</h3>
                          <p className="text-muted-foreground">Financial habits that create security and abundance without sacrificing your present.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                          <Smile className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-primary mb-2">Happiness</h3>
                          <p className="text-muted-foreground">Mindset shifts and practices that create lasting fulfillment and inner peace.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-8">
                    <h2 className="text-3xl font-bold text-primary">The BDBT Difference</h2>
                    <div className="space-y-6">
                      <div className="bg-card p-6 rounded-xl border border-border shadow-soft">
                        <h4 className="font-semibold text-primary mb-2">Small & Stackable</h4>
                        <p className="text-muted-foreground text-sm">Every tip builds on the last, creating compound growth without overwhelm.</p>
                      </div>
                      
                      <div className="bg-card p-6 rounded-xl border border-border shadow-soft">
                        <h4 className="font-semibold text-primary mb-2">Instantly Actionable</h4>
                        <p className="text-muted-foreground text-sm">No complex systems or expensive tools. Start seeing results from day one.</p>
                      </div>
                      
                      <div className="bg-card p-6 rounded-xl border border-border shadow-soft">
                        <h4 className="font-semibold text-primary mb-2">Real-World Tested</h4>
                        <p className="text-muted-foreground text-sm">Every strategy comes from real experience and has been proven to work.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

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
                description: "Simple hydration hack that saves money and transforms your energy levels.",
                category: "Health"
              },
              {
                icon: Activity,
                title: "Track Your Heart Rate",
                description: "Free health monitoring that gives you insights into your recovery and fitness.",
                category: "Wellness"
              },
              {
                icon: Moon,
                title: "Hide Your Phone at Night",
                description: "Digital detox strategy that improves sleep quality and morning productivity.",
                category: "Lifestyle"
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
                  <Badge variant="outline" className="text-xs">
                    {tip.category}
                  </Badge>
                </CardContent>
              </Card>
            ))}</div
