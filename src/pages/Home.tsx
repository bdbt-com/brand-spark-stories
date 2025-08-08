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
      // Wait for content to expand, then scroll to center it
      setTimeout(() => {
        const contentElement = howContentRef.current;
        if (contentElement) {
          const rect = contentElement.getBoundingClientRect();
          const centerY = rect.top + rect.height / 2;
          const viewportCenter = window.innerHeight / 2;
          const scrollTarget = window.scrollY + centerY - viewportCenter;
          
          window.scrollTo({
            top: scrollTarget,
            behavior: 'smooth'
          });
        }
      }, 300);
    }
  };

  const howWorkTriggerRef = useRef<HTMLDivElement>(null);
  const handleHowWorkOpenChange = (open: boolean) => {
    const el = howWorkTriggerRef.current;
    const beforeTop = el ? el.getBoundingClientRect().top : null;
    setIsHowWorkOpen(open);
    if (beforeTop !== null) {
      requestAnimationFrame(() => {
        const afterTop = el ? el.getBoundingClientRect().top : beforeTop;
        const delta = afterTop - beforeTop;
        if (Math.abs(delta) > 1) {
          window.scrollBy({ top: delta, behavior: "auto" });
        }
      });
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
              <Badge className="bg-white/20 text-white border-white/30 mb-6">
                ✨ Transform Your Life Daily
              </Badge>
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="block text-muted-foreground drop-shadow-[0_0_18px_hsl(var(--primary-glow)/0.65)]">Small Daily Steps.</span>
                <span className="block text-accent-light">Big Life Change.</span>
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-white/90 leading-relaxed">
                Big Daddy's Big Tips teaches simple daily habits that silently transform your health, wealth, and happiness simultaneously. We turn overwhelming life changes into achievable daily steps.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                {/* Read My Story - enlarged and centered */}
                <div className="relative">
                  <div className="absolute inset-0">
                    <div className="absolute inset-0 rounded-xl border border-accent-light/40 animate-ping transform scale-50" style={{
                      animationDuration: '2s',
                      animationIterationCount: 'infinite'
                    }}></div>
                  </div>
                  <div className="absolute inset-0" style={{ margin: '1px' }}>
                    <div className="absolute inset-0 rounded-xl border border-accent-light/50 animate-ping transform scale-50" style={{
                      animationDuration: '2s',
                      animationDelay: '0.7s',
                      animationIterationCount: 'infinite'
                    }}></div>
                  </div>
                  <div className="absolute inset-0" style={{ margin: '2px' }}>
                    <div className="absolute inset-0 rounded-xl border border-accent-light/60 animate-ping transform scale-50" style={{
                      animationDuration: '2s',
                      animationDelay: '1.4s',
                      animationIterationCount: 'infinite'
                    }}></div>
                  </div>
                  <div className="absolute inset-0 bg-accent-light/10 rounded-xl animate-pulse transform scale-50" style={{ animationDuration: '3s' }}></div>
                  <Button variant="secondary" size="lg" asChild className="relative hover:scale-105 transition-transform duration-200 rounded-xl h-14 md:h-16 px-8 md:px-10 text-lg md:text-xl">
                    <Link 
                      to="/about#story" 
                      onClick={() => {
                        setTimeout(() => {
                          const storyElement = document.getElementById('story');
                          if (storyElement) {
                            storyElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }, 100);
                      }}
                    >
                      📖 Read My Story <ArrowRight className="w-5 h-5" />
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
              <div className="absolute inset-0 rounded-full border border-white/30 animate-ping" style={{ animationDuration: '2s', animationIterationCount: 'infinite' }}></div>
              <div className="absolute inset-0" style={{ margin: '2px' }}>
                <div className="absolute inset-0 rounded-full border border-white/40 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.6s', animationIterationCount: 'infinite' }}></div>
              </div>
              <div className="absolute inset-0" style={{ margin: '4px' }}>
                <div className="absolute inset-0 rounded-full border border-white/50 animate-ping" style={{ animationDuration: '2s', animationDelay: '1.2s', animationIterationCount: 'infinite' }}></div>
              </div>
              <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse" style={{ animationDuration: '3s' }}></div>
              <div className="relative w-14 h-14 rounded-full bg-white/15 backdrop-blur border border-white/30 flex items-center justify-center hover-scale">
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
                    <h2 className="text-3xl font-bold text-foreground mb-6">How BDBT Works for You</h2>
                    <h3 className="text-2xl font-semibold text-foreground mt-10 mb-4">Limiting beliefs stopping people from adopting BDBT</h3>
                    <div className="space-y-6">
                      <div>
                        <p className="font-semibold text-foreground">Belief:</p>
                        <p>“This is just another self-help system.”</p>
                        <p className="font-semibold text-foreground mt-2">Experience:</p>
                        <p>Tried courses that didn’t stick.</p>
                        <p className="font-semibold text-foreground mt-2">Story they're telling themselves:</p>
                        <p>“It’s just more fluff. I’ve heard it all before.”</p>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Belief:</p>
                        <p>“I already know what to do.”</p>
                        <p className="font-semibold text-foreground mt-2">Experience:</p>
                        <p>Consumed info but didn’t apply it.</p>
                        <p className="font-semibold text-foreground mt-2">Story they're telling themselves:</p>
                        <p>“It’s my fault. I don’t need a system. I just need more willpower.”</p>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Belief:</p>
                        <p>“Small habits don’t matter.”</p>
                        <p className="font-semibold text-foreground mt-2">Experience:</p>
                        <p>Tried habits but saw no big change.</p>
                        <p className="font-semibold text-foreground mt-2">Story they're telling themselves:</p>
                        <p>“Tiny changes don’t add up to anything meaningful.”</p>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Belief:</p>
                        <p>“I’m too busy.”</p>
                        <p className="font-semibold text-foreground mt-2">Experience:</p>
                        <p>Overloaded schedule, past failures.</p>
                        <p className="font-semibold text-foreground mt-2">Story they're telling themselves:</p>
                        <p>“There’s no space for more. I’ll just burn out.”</p>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Belief:</p>
                        <p>“I always fail.”</p>
                        <p className="font-semibold text-foreground mt-2">Experience:</p>
                        <p>Repeated broken promises to self.</p>
                        <p className="font-semibold text-foreground mt-2">Story they're telling themselves:</p>
                        <p>“Why bother? I’ll just quit again.”</p>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Belief:</p>
                        <p>“People like me don’t change.”</p>
                        <p className="font-semibold text-foreground mt-2">Experience:</p>
                        <p>Feels stuck, sees others succeed.</p>
                        <p className="font-semibold text-foreground mt-2">Story they're telling themselves:</p>
                        <p>“It’s too late for me. This works for them, not me.”</p>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Belief:</p>
                        <p>“My environment will derail me.”</p>
                        <p className="font-semibold text-foreground mt-2">Experience:</p>
                        <p>Family/friends discourage progress.</p>
                        <p className="font-semibold text-foreground mt-2">Story they're telling themselves:</p>
                        <p>“What’s the point? I’ll get dragged back down.”</p>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Belief:</p>
                        <p>“My loved ones won’t change.”</p>
                        <p className="font-semibold text-foreground mt-2">Experience:</p>
                        <p>Tried helping others to no avail.</p>
                        <p className="font-semibold text-foreground mt-2">Story they're telling themselves:</p>
                        <p>“If they won’t change, why should I? I’ll just stay where I am.”</p>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Belief:</p>
                        <p>“I’ll start when life calms down.”</p>
                        <p className="font-semibold text-foreground mt-2">Experience:</p>
                        <p>Life always interrupts change.</p>
                        <p className="font-semibold text-foreground mt-2">Story they're telling themselves:</p>
                        <p>“Now isn’t the time, it’s too hectic to start anything new.”</p>
                      </div>
                    </div>

                    <div className="space-y-10 mt-12">
                      <div>
                        <h3 className="text-2xl font-semibold text-foreground">False Belief #1: “This is just another self-help system.”</h3>
                        <p className="mt-3">I used to think the same thing. I’d tried courses, books, spreadsheets, planners, and every time I got the same result: a short buzz, then nothing. What changed for me wasn’t finding more advice. It was realising that the power wasn’t in the information, it was in how you apply it. One evening, after weeks of just doing five minutes of movement in the morning and a 10-minute wind-down routine at night, I realised I wasn’t stressed. The kids were calm. I was calm. Nothing in my life had been overhauled, but everything was working better. That’s when I realised: this isn’t self-help. This is life design. And it works because it’s stacked, not scattered.</p>
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-foreground">False Belief #2: “I already know what to do, I just need to do it.”</h3>
                        <p className="mt-3">For years, I told myself I had all the answers. I’d read the books, listened to the podcasts, taken the notes. I didn’t need a system, I needed more willpower. Until one day, I looked at my notes and thought, “If knowing was enough, I’d be thriving by now.” That’s when it clicked: the problem wasn’t knowledge. It was integration. I had all the right pieces, but no structure to make them work together. That’s what BDBT gave me, a way to link it all together. The shift came not from more effort, but from better design.</p>
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-foreground">False Belief #3: “Small habits won’t make a big enough difference.”</h3>
                        <p className="mt-3">I used to chase big results, big transformations, big declarations, big overhauls. But they never lasted. What finally changed everything was going small. I didn’t try to change my diet, routine, mindset, finances all at once. I started with a 5-minute morning movement, a 2-minute budget ritual, and a 5-minute evening reflection. That’s it. And over time, I saw the ripple: I was calmer, sharper, saving money, moving more. The small things became the big change. That’s when I realised, it’s not about how much you do. It’s about where the ripples go.</p>
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-foreground">False Belief #4: “I’m too busy to add anything new to my day.”</h3>
                        <p className="mt-3">When I became a single dad 50% of the week, with a business to run the other 50%, I genuinely believed there was no room for anything. But the truth was, my time was leaking through the cracks, endless scrolling, takeaways, decision fatigue, disorganised evenings. I didn’t need more time, I needed more structure. Just five minutes of the right habit gave me time back. I got calmer, more present, more productive and the chaos slowed down. That’s when I realised: busyness isn’t the enemy. Drift is.</p>
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-foreground">False Belief #5: “I’ve failed too many times, this won’t stick either.”</h3>
                        <p className="mt-3">I’ve started and quit more habits than I can count. What changed wasn’t that I suddenly became more disciplined, it was that I finally stopped relying on motivation. I built habits that could survive bad days. Even if I only hit 70%, I kept moving forward. That was the difference: not perfection, but momentum. One month in, I realised this was sticking because it wasn’t designed for a perfect version of me. It was designed for the real me. The one with kids, work, mess, and stress.</p>
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-foreground">False Belief #6: “People like me don’t change their whole life with a few tips.”</h3>
                        <p className="mt-3">I’m not a superhuman biohacker. I’m not an influencer. I’m just a guy who had to figure out how to stay sane and strong while raising two kids, running a business, and trying not to burn out. I didn’t “overhaul” anything. I just started stacking little wins. A few minutes a day. A few small decisions. And over time, they added up to a completely different direction. That’s when I realised people like me don’t change everything overnight. But we can change the trajectory. And that’s what really matters.</p>
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-foreground">False Belief #7: “My friends or family will pull me off track anyway.”</h3>
                        <p className="mt-3">When I started building my system, I worried I’d get derailed by everything around me, social invites, the kids' routines, other people’s chaos. But what I found was that I became the anchor. When I stuck to my simple habits, not perfectly, but consistently, the people around me actually adjusted. I wasn’t preaching, I was just showing up better. And slowly, that had more impact than anything I’d said. That’s when I realised: the strongest ripple comes from living it, not talking about it.</p>
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-foreground">False Belief #8: “Nobody around me will change, so what’s the point?”</h3>
                        <p className="mt-3">Watching people you love drift is hard. I’ve seen it in my own family  and no matter how much I care, they don’t always want to hear it from me. That’s painful. But what keeps me going is the belief that if I can be the voice someone else’s loved one listens to, then I’ve done my job. I might not reach my family directly, but someone else might. And in return, I might be the person your family finally hears. That’s what this movement is about. Ripples reaching where we can’t.</p>
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-foreground">False Belief #9: “I’ll start when life calms down.”</h3>
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

      {/* The Vessel, Ripples, Journey Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              The Vessel. The Ripples. The Journey.
            </h2>
            <div className="max-w-4xl mx-auto space-y-6">
              <p className="text-xl text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Your body is the vessel.</strong><br/>
                <strong className="text-foreground">Your habits create the ripples.</strong><br/>
                <strong className="text-foreground">The ripples determine the direction of your journey.</strong>
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                How well you care for your body will determine the quality of the decisions you make each day (your habits). 
                Your daily decisions (habits) will create ripple effects in other areas of your life. Those ripples will either 
                carry you towards the life that you want or leave you feeling stuck.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-8">
            <Card className="group hover:shadow-strong transition-all duration-300 hover:-translate-y-2 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-green-700 dark:text-green-300">Daily Wins Path</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Keep our vessels primed, make good daily decisions (daily wins), creating positive ripple effects that take us closer to our best life.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-strong transition-all duration-300 hover:-translate-y-2 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-red-700 dark:text-red-300">Daily Drifts Path</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Allow our vessels to develop rust, resulting in poor daily decisions (daily drifts), creating negative ripple effects that leave us feeling stuck.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* How BDBT Works Trigger */}
          <div className="flex justify-center mb-8" ref={howRef} id="how">
            <Collapsible open={isHowWorkOpen} onOpenChange={handleHowWorkOpenChange} className="w-full">
              <div className="flex justify-center">
                <CollapsibleTrigger asChild>
                  <div className="relative" ref={howWorkTriggerRef}>
                    <div className="absolute inset-0">
                      <div className="absolute inset-0 rounded-xl border border-blue-400/50 animate-ping" style={{ animationDuration: '2s', animationIterationCount: 'infinite' }}></div>
                    </div>
                    <div className="absolute inset-0" style={{ margin: '1px' }}>
                      <div className="absolute inset-0 rounded-xl border border-blue-500/50 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.7s', animationIterationCount: 'infinite' }}></div>
                    </div>
                    <div className="absolute inset-0" style={{ margin: '2px' }}>
                      <div className="absolute inset-0 rounded-xl border border-blue-600/50 animate-ping" style={{ animationDuration: '2s', animationDelay: '1.4s', animationIterationCount: 'infinite' }}></div>
                    </div>
                    <div className="absolute inset-0 bg-blue-500/10 rounded-xl animate-pulse" style={{ animationDuration: '3s' }}></div>
                    <Button variant="outline" size="lg" className="relative hover:scale-105 transition-transform h-14 md:h-16 px-8 md:px-10 text-lg md:text-xl bg-background/95 backdrop-blur-sm border-primary/30 rounded-xl">
                      ⬤ How BDBT Works for you
                      <ChevronDown className={`w-5 h-5 ml-3 transition-transform ${isHowWorkOpen ? 'rotate-180' : ''}`} />
                    </Button>
                  </div>
                </CollapsibleTrigger>
              </div>

              <CollapsibleContent ref={howWorkContentRef}>
                <div className="relative mt-8 max-w-4xl mx-auto lg:px-32">
                  {/* Thought Bubbles - Desktop pinned outside like About photos */}
                  {/* Left pinned stack - fills container height for percentage positioning */}
                  <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-[360px] z-10" style={{ left: '-160px' }}>
                    <div className="absolute w-[360px] bg-gradient-primary/10 border-2 border-primary/30 rounded-2xl shadow-strong animate-fade-in p-5 transform rotate-2 scale-95 text-foreground/90" style={{ animationDelay: '400ms', top: '5%' }}>
                      I'm too busy.
                    </div>
                    <div className="absolute w-[360px] bg-gradient-primary/10 border-2 border-primary/30 rounded-2xl shadow-strong animate-fade-in p-5 transform -rotate-1 scale-100 text-foreground/90" style={{ animationDelay: '1200ms', top: '45%' }}>
                      Small habits don't matter.
                    </div>
                    <div className="absolute w-[360px] bg-gradient-primary/10 border-2 border-primary/30 rounded-2xl shadow-strong animate-fade-in p-5 transform rotate-1 scale-105 text-foreground/90" style={{ animationDelay: '2000ms', top: '85%' }}>
                      My environment will derail me.
                    </div>
                  </div>

                  {/* Right pinned stack - fills container height for percentage positioning */}
                  <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[360px] z-10" style={{ right: '-160px' }}>
                    <div className="absolute w-[360px] bg-gradient-primary/10 border-2 border-primary/30 rounded-2xl shadow-strong animate-fade-in p-5 transform -rotate-2 scale-95 text-foreground/90" style={{ animationDelay: '800ms', top: '20%' }}>
                      I always fail.
                    </div>
                    <div className="absolute w-[360px] bg-gradient-primary/10 border-2 border-primary/30 rounded-2xl shadow-strong animate-fade-in p-5 transform rotate-1 scale-100 text-foreground/90" style={{ animationDelay: '1600ms', top: '60%' }}>
                      People like me don't change.
                    </div>
                    <div className="absolute w-[360px] bg-gradient-primary/10 border-2 border-primary/30 rounded-2xl shadow-strong animate-fade-in p-5 transform -rotate-1 scale-105 text-foreground/90" style={{ animationDelay: '2400ms', top: '95%' }}>
                      I'll start when life calms down.
                    </div>
                  </div>

                  <Card className="bg-background/95 backdrop-blur-sm border-primary/20 shadow-strong">
                    <CardContent className="p-8 lg:p-12">
                      <article className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">How BDBT Works for You</h2>

                        {/* Guided Path Chevrons */}
                        <section aria-label="Guided BDBT Path" className="my-8 hidden">
                          <div className="flex flex-col items-center">
                            {/* Step: Home Page */}
                            <Link to="/" className="group" aria-label="Go to Home Page">
                              <div className="relative w-14 h-14">
                                <div className="absolute inset-0 rounded-full border border-primary/30 animate-ping" style={{ animationDuration: '2s', animationIterationCount: 'infinite' }}></div>
                                <div className="absolute inset-0" style={{ margin: '2px' }}>
                                  <div className="absolute inset-0 rounded-full border border-primary/40 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.6s', animationIterationCount: 'infinite' }}></div>
                                </div>
                                <div className="absolute inset-0" style={{ margin: '4px' }}>
                                  <div className="absolute inset-0 rounded-full border border-primary/50 animate-ping" style={{ animationDuration: '2s', animationDelay: '1.2s', animationIterationCount: 'infinite' }}></div>
                                </div>
                                <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse" style={{ animationDuration: '3s' }}></div>
                                <div className="relative w-14 h-14 rounded-full bg-primary/10 backdrop-blur border border-primary/30 flex items-center justify-center hover-scale">
                                  <ChevronDown className="w-6 h-6 text-primary" />
                                </div>
                              </div>
                            </Link>
                            <span className="mt-2 text-sm font-medium text-foreground/80">Home Page</span>

                            <ChevronDown className="w-5 h-5 text-muted-foreground my-2" />

                            {/* Step: Why BDBT Works for You */}
                            <button type="button" onClick={() => { setIsHowWorkOpen(true); handleScrollToHow(); }} className="group" aria-label="Scroll to Why BDBT Works for You">
                              <div className="relative w-14 h-14">
                                <div className="absolute inset-0 rounded-full border border-primary/30 animate-ping" style={{ animationDuration: '2s', animationIterationCount: 'infinite' }}></div>
                                <div className="absolute inset-0" style={{ margin: '2px' }}>
                                  <div className="absolute inset-0 rounded-full border border-primary/40 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.6s', animationIterationCount: 'infinite' }}></div>
                                </div>
                                <div className="absolute inset-0" style={{ margin: '4px' }}>
                                  <div className="absolute inset-0 rounded-full border border-primary/50 animate-ping" style={{ animationDuration: '2s', animationDelay: '1.2s', animationIterationCount: 'infinite' }}></div>
                                </div>
                                <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse" style={{ animationDuration: '3s' }}></div>
                                <div className="relative w-14 h-14 rounded-full bg-primary/10 backdrop-blur border border-primary/30 flex items-center justify-center hover-scale">
                                  <ChevronDown className="w-6 h-6 text-primary" />
                                </div>
                              </div>
                            </button>
                            <span className="mt-2 text-sm font-medium text-foreground/80">Why BDBT Works for You</span>

                            <ChevronDown className="w-5 h-5 text-muted-foreground my-2" />

                            {/* Step: Read My Story */}
                            <Link 
                              to="/about#story" 
                              className="group" 
                              aria-label="Read My Story"
                              onClick={() => {
                                setTimeout(() => {
                                  const storyElement = document.getElementById('story');
                                  if (storyElement) {
                                    storyElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                  }
                                }, 100);
                              }}
                            >
                              <div className="relative w-14 h-14">
                                <div className="absolute inset-0 rounded-full border border-accent-light/40 animate-ping" style={{ animationDuration: '2s', animationIterationCount: 'infinite' }}></div>
                                <div className="absolute inset-0" style={{ margin: '2px' }}>
                                  <div className="absolute inset-0 rounded-full border border-accent-light/50 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.6s', animationIterationCount: 'infinite' }}></div>
                                </div>
                                <div className="absolute inset-0" style={{ margin: '4px' }}>
                                  <div className="absolute inset-0 rounded-full border border-accent-light/60 animate-ping" style={{ animationDuration: '2s', animationDelay: '1.2s', animationIterationCount: 'infinite' }}></div>
                                </div>
                                <div className="absolute inset-0 bg-accent-light/10 rounded-full animate-pulse" style={{ animationDuration: '3s' }}></div>
                                <div className="relative w-14 h-14 rounded-full bg-accent-light/10 backdrop-blur border border-accent-light/40 flex items-center justify-center hover-scale">
                                  <ChevronDown className="w-6 h-6 text-accent-light" />
                                </div>
                              </div>
                            </Link>
                            <span className="mt-2 text-sm font-medium text-foreground/80">Read My Story</span>

                            <ChevronDown className="w-5 h-5 text-muted-foreground my-2" />

                            {/* Step: Blueprint */}
                            <Link to="/blueprint" className="group" aria-label="Download and Read the Blueprint">
                              <div className="relative w-14 h-14">
                                <div className="absolute inset-0 rounded-full border border-primary/30 animate-ping" style={{ animationDuration: '2s', animationIterationCount: 'infinite' }}></div>
                                <div className="absolute inset-0" style={{ margin: '2px' }}>
                                  <div className="absolute inset-0 rounded-full border border-primary/40 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.6s', animationIterationCount: 'infinite' }}></div>
                                </div>
                                <div className="absolute inset-0" style={{ margin: '4px' }}>
                                  <div className="absolute inset-0 rounded-full border border-primary/50 animate-ping" style={{ animationDuration: '2s', animationDelay: '1.2s', animationIterationCount: 'infinite' }}></div>
                                </div>
                                <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse" style={{ animationDuration: '3s' }}></div>
                                <div className="relative w-14 h-14 rounded-full bg-primary/10 backdrop-blur border border-primary/30 flex items-center justify-center hover-scale">
                                  <ChevronDown className="w-6 h-6 text-primary" />
                                </div>
                              </div>
                            </Link>
                            <span className="mt-2 text-sm font-medium text-foreground/80">Download and Read the Blueprint</span>

                            <ChevronDown className="w-5 h-5 text-muted-foreground my-2" />

                            {/* Step: Tips */}
                            <Link to="/tips" className="group" aria-label="View the Tips Page">
                              <div className="relative w-14 h-14">
                                <div className="absolute inset-0 rounded-full border border-primary/30 animate-ping" style={{ animationDuration: '2s', animationIterationCount: 'infinite' }}></div>
                                <div className="absolute inset-0" style={{ margin: '2px' }}>
                                  <div className="absolute inset-0 rounded-full border border-primary/40 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.6s', animationIterationCount: 'infinite' }}></div>
                                </div>
                                <div className="absolute inset-0" style={{ margin: '4px' }}>
                                  <div className="absolute inset-0 rounded-full border border-primary/50 animate-ping" style={{ animationDuration: '2s', animationDelay: '1.2s', animationIterationCount: 'infinite' }}></div>
                                </div>
                                <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse" style={{ animationDuration: '3s' }}></div>
                                <div className="relative w-14 h-14 rounded-full bg-primary/10 backdrop-blur border border-primary/30 flex items-center justify-center hover-scale">
                                  <ChevronDown className="w-6 h-6 text-primary" />
                                </div>
                              </div>
                            </Link>
                            <span className="mt-2 text-sm font-medium text-foreground/80">View the Tips Page</span>

                            <ChevronDown className="w-5 h-5 text-muted-foreground my-2" />

                            {/* Step: Daily Wins */}
                            <Link to="/daily-wins" className="group" aria-label="Add to the Daily Wins Page">
                              <div className="relative w-14 h-14">
                                <div className="absolute inset-0 rounded-full border border-primary/30 animate-ping" style={{ animationDuration: '2s', animationIterationCount: 'infinite' }}></div>
                                <div className="absolute inset-0" style={{ margin: '2px' }}>
                                  <div className="absolute inset-0 rounded-full border border-primary/40 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.6s', animationIterationCount: 'infinite' }}></div>
                                </div>
                                <div className="absolute inset-0" style={{ margin: '4px' }}>
                                  <div className="absolute inset-0 rounded-full border border-primary/50 animate-ping" style={{ animationDuration: '2s', animationDelay: '1.2s', animationIterationCount: 'infinite' }}></div>
                                </div>
                                <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse" style={{ animationDuration: '3s' }}></div>
                                <div className="relative w-14 h-14 rounded-full bg-primary/10 backdrop-blur border border-primary/30 flex items-center justify-center hover-scale">
                                  <ChevronDown className="w-6 h-6 text-primary" />
                                </div>
                              </div>
                            </Link>
                            <span className="mt-2 text-sm font-medium text-foreground/80">Add to the Daily Wins Page</span>
                          </div>
                        </section>

                        {/* Mobile Thought Bubbles */}
                        <div className="lg:hidden flex flex-wrap gap-2 mb-6">
                          {[
                            "I’m too busy.",
                            "I always fail.",
                            "Small habits don’t matter.",
                            "People like me don’t change.",
                            "My environment will derail me.",
                            "I’ll start when life calms down."
                          ].map((t) => (
                            <span key={t} className="bg-primary/10 text-foreground border border-primary/20 rounded-2xl px-3 py-1 text-sm">{t}</span>
                          ))}
                        </div>

                        <div className="space-y-10">
                          <div>
                            <h3 className="text-2xl font-semibold text-foreground">False Belief #1: “This is just another self-help system.”</h3>
                            <p className="mt-3">I used to think the same thing. I’d tried courses, books, spreadsheets, planners, and every time I got the same result: a short buzz, then nothing. What changed for me wasn’t finding more advice. It was realising that the power wasn’t in the information, it was in how you apply it. One evening, after weeks of just doing five minutes of movement in the morning and a 10-minute wind-down routine at night, I realised I wasn’t stressed. The kids were calm. I was calm. Nothing in my life had been overhauled, but everything was working better. That’s when I realised: this isn’t self-help. This is life design. And it works because it’s stacked, not scattered.</p>
                          </div>
                          <div>
                            <h3 className="text-2xl font-semibold text-foreground">False Belief #2: “I already know what to do, I just need to do it.”</h3>
                            <p className="mt-3">For years, I told myself I had all the answers. I’d read the books, listened to the podcasts, taken the notes. I didn’t need a system, I needed more willpower. Until one day, I looked at my notes and thought, “If knowing was enough, I’d be thriving by now.” That’s when it clicked: the problem wasn’t knowledge. It was integration. I had all the right pieces, but no structure to make them work together. That’s what BDBT gave me, a way to link it all together. The shift came not from more effort, but from better design.</p>
                          </div>
                          <div>
                            <h3 className="text-2xl font-semibold text-foreground">False Belief #3: “Small habits won’t make a big enough difference.”</h3>
                            <p className="mt-3">I used to chase big results, big transformations, big declarations, big overhauls. But they never lasted. What finally changed everything was going small. I didn’t try to change my diet, routine, mindset, finances all at once. I started with a 5-minute morning movement, a 2-minute budget ritual, and a 5-minute evening reflection. That’s it. And over time, I saw the ripple: I was calmer, sharper, saving money, moving more. The small things became the big change. That’s when I realised, it’s not about how much you do. It’s about where the ripples go.</p>
                          </div>
                          <div>
                            <h3 className="text-2xl font-semibold text-foreground">False Belief #4: “I’m too busy to add anything new to my day.”</h3>
                            <p className="mt-3">When I became a single dad 50% of the week, with a business to run the other 50%, I genuinely believed there was no room for anything. But the truth was, my time was leaking through the cracks, endless scrolling, takeaways, decision fatigue, disorganised evenings. I didn’t need more time, I needed more structure. Just five minutes of the right habit gave me time back. I got calmer, more present, more productive and the chaos slowed down. That’s when I realised: busyness isn’t the enemy. Drift is.</p>
                          </div>
                          <div>
                            <h3 className="text-2xl font-semibold text-foreground">False Belief #5: “I’ve failed too many times, this won’t stick either.”</h3>
                            <p className="mt-3">I’ve started and quit more habits than I can count. What changed wasn’t that I suddenly became more disciplined, it was that I finally stopped relying on motivation. I built habits that could survive bad days. Even if I only hit 70%, I kept moving forward. That was the difference: not perfection, but momentum. One month in, I realised this was sticking because it wasn’t designed for a perfect version of me. It was designed for the real me. The one with kids, work, mess, and stress.</p>
                          </div>
                          <div>
                            <h3 className="text-2xl font-semibold text-foreground">False Belief #6: “People like me don’t change their whole life with a few tips.”</h3>
                            <p className="mt-3">I’m not a superhuman biohacker. I’m not an influencer. I’m just a guy who had to figure out how to stay sane and strong while raising two kids, running a business, and trying not to burn out. I didn’t “overhaul” anything. I just started stacking little wins. A few minutes a day. A few small decisions. And over time, they added up to a completely different direction. That’s when I realised people like me don’t change everything overnight. But we can change the trajectory. And that’s what really matters.</p>
                          </div>
                          <div>
                            <h3 className="text-2xl font-semibold text-foreground">False Belief #7: “My friends or family will pull me off track anyway.”</h3>
                            <p className="mt-3">When I started building my system, I worried I’d get derailed by everything around me, social invites, the kids' routines, other people’s chaos. But what I found was that I became the anchor. When I stuck to my simple habits, not perfectly, but consistently, the people around me actually adjusted. I wasn’t preaching, I was just showing up better. And slowly, that had more impact than anything I’d said. That’s when I realised: the strongest ripple comes from living it, not talking about it.</p>
                          </div>
                          <div>
                            <h3 className="text-2xl font-semibold text-foreground">False Belief #8: “Nobody around me will change, so what’s the point?”</h3>
                            <p className="mt-3">Watching people you love drift is hard. I’ve seen it in my own family  and no matter how much I care, they don’t always want to hear it from me. That’s painful. But what keeps me going is the belief that if I can be the voice someone else’s loved one listens to, then I’ve done my job. I might not reach my family directly, but someone else might. And in return, I might be the person your family finally hears. That’s what this movement is about. Ripples reaching where we can’t.</p>
                          </div>
                          <div>
                            <h3 className="text-2xl font-semibold text-foreground">False Belief #9: “I’ll start when life calms down.”</h3>
                            <p className="mt-3">I used to think the same. “I’ll start when work slows down. When the kids are older. When things feel more manageable.” But that perfect moment never came. The truth is, life never calms down. And once I realised that, I stopped waiting. I started anyway, with 5 minutes a day. That’s all I could give, and that’s all I needed. A few weeks in, things didn’t feel calmer but I did. I realised I didn’t need a better life to start. I just needed a better system to start in the life I already had.</p>
                          </div>
                        </div>
                      </article>
                    </CardContent>
                  </Card>
                  <div className="flex justify-center mt-10 mb-4">
                    <ChevronRipple 
                      to="/about#story" 
                      label="Read My Story" 
                      color="accent"
                      onClick={() => {
                        setTimeout(() => {
                          const storyElement = document.getElementById('story');
                          if (storyElement) {
                            storyElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }, 100);
                      }}
                    />
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </section>

      {/* Three Core Pillars */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              How do we prime our vessel?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              By being aware of these 3 core pillars that determine the quality of your daily decisions
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Pillar 1: What You Put Into Your Body */}
            <Card className="group hover:shadow-strong transition-all duration-300 hover:-translate-y-2 bg-gradient-subtle border-2 hover:border-primary/20">
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Droplets className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground text-center">What You Put Into Your Body</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Every single thing you put in your body will shape you, including:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    The food and drink you consume
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    The media you scroll past daily
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    The air you breathe in
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    The light and surroundings you expose yourself to
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    The people you allow into your space
                  </li>
                </ul>
                <p className="text-sm text-muted-foreground mt-4 italic">
                  BDBT will guide you daily on the inputs that prime your vessel and the things that build rust.
                </p>
              </CardContent>
            </Card>

            {/* Pillar 2: How Well You Move Your Body */}
            <Card className="group hover:shadow-strong transition-all duration-300 hover:-translate-y-2 bg-gradient-subtle border-2 hover:border-primary/20">
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Activity className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground text-center">How Well You Move Your Body</h3>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>You don't need to be an athlete.</p>
                  <p>You don't need to hit the gym six days a week.</p>
                  <p>But your body was designed to move, and when it doesn't, everything suffers; your posture, your mood, your metabolism, your motivation.</p>
                  <p className="text-sm italic">
                    BDBT teaches movement as a daily reset; walking, stretching, breathing, and simple routines that switch you on instead of wearing you down. Most take less than a minute and some can even be stacked onto things you are already doing!
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Pillar 3: How Well You Rest Your Body */}
            <Card className="group hover:shadow-strong transition-all duration-300 hover:-translate-y-2 bg-gradient-subtle border-2 hover:border-primary/20">
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Moon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground text-center">How Well You Rest Your Body</h3>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>The most underrated and yet most beneficial drug we could ever wish to put inside our bodies. It is completely free, monumentally beneficial and we are all given the chance to get a dose of it every single day.</p>
                  <p>Without proper rest your body and mind cannot repair, grow, or regulate properly.</p>
                  <p>With proper rest you can achieve things that have historically felt unimaginable.</p>
                  <p className="text-sm italic">
                    BDBT helps you design better sleep, smarter breaks, calmer evenings, and fewer stimulants.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Strong Vessel, Smoother Journey */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Strong Vessel, Smoother Journey
            </h2>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              Through BDBT you will learn how to prime your vessel and make good daily decisions that:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[
              {
                icon: DollarSign,
                title: "Save Thousands",
                description: "Save thousands a year with smarter daily habits"
              },
              {
                icon: Heart,
                title: "Improve Health",
                description: "Improve your health without unsustainable diets or overwhelming gym plans"
              },
              {
                icon: Smile,
                title: "Design Lifestyle",
                description: "Design a lifestyle of gratitude, reflection and fulfillment"
              },
              {
                icon: Zap,
                title: "Build Momentum",
                description: "Build momentum with a system you can start today"
              }
            ].map((item, index) => (
              <Card key={index} className="group hover:shadow-strong transition-all duration-300 hover:-translate-y-2 bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                  <p className="text-primary-foreground/80 text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button variant="accent" size="lg" asChild className="hover:scale-105 transition-transform duration-200">
              <Link to="/blueprint">
                ⬤ Get the Free Daily Wins Tracker <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            If you feel stuck, scattered, or just know you're capable of more, this is your next step.
          </h2>
          <p className="text-xl mb-8 text-muted-foreground">
            One habit today. A different life tomorrow.
          </p>
          <p className="text-lg mb-8 text-muted-foreground">
            Let's build it together - one tip at a time.
          </p>
          <Button variant="hero" size="lg" asChild className="hover:scale-105 transition-transform duration-200">
            <Link to="/blueprint">
              ⬤ Start Now <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;