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
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="block text-primary">Small Daily Steps.</span>
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