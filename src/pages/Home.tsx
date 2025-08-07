import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Droplets, Activity, Moon, DollarSign, Heart, Smile, Target, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { useEffect, useState } from "react";

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
              <div className="flex flex-wrap gap-4">
                <Button variant="accent" size="lg" asChild className="hover:scale-105 transition-transform duration-200">
                  <Link to="/blueprint">
                    ⬤ Start Your Daily Wins <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
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
                  <Button variant="secondary" size="lg" asChild className="relative hover:scale-105 transition-transform duration-200 rounded-xl">
                    <Link to="/about">
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
      </section>

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

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
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