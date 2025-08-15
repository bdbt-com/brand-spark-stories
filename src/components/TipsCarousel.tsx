import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { 
  Dumbbell, Coffee, Utensils, Droplets, Activity, Moon, Sun, Zap, 
  Clock, Brain, Heart, Target, Lightbulb, Shield, CheckCircle
} from "lucide-react";

const TipsCarousel = () => {
  const [embla, setEmbla] = useState<CarouselApi | null>(null);

  // Sample tips data from your Tips page
  const tips = [
    {
      icon: Dumbbell,
      title: "30 Benefits of Getting Up and Down",
      description: "Shows why floor mobility predicts longevity and vitality.",
      level: "Moderate",
      duration: "6 min read",
      category: "fitness"
    },
    {
      icon: Coffee,
      title: "30 Reasons to Drink Green Tea",
      description: "Positions green tea as a hydration-plus habit for daily wellness.",
      level: "Easy",
      duration: "6 min read",
      category: "health"
    },
    {
      icon: Utensils,
      title: "30 Reasons to Swap Butter for Peanut Butter",
      description: "Nutritional benefits of making this simple dietary swap.",
      level: "Easy",
      duration: "4 min read",
      category: "health"
    },
    {
      icon: Droplets,
      title: "Only Drink Water",
      description: "Simple hydration hack that saves money and transforms your energy levels.",
      level: "Easy",
      duration: "3 min read",
      category: "health"
    },
    {
      icon: Activity,
      title: "Track Your Heart Rate",
      description: "Free health monitoring that gives you insights into your recovery and fitness.",
      level: "Easy",
      duration: "5 min read",
      category: "fitness"
    },
    {
      icon: Moon,
      title: "Hide Your Phone at Night",
      description: "Digital detox strategy that improves sleep quality and morning productivity.",
      level: "Easy",
      duration: "4 min read",
      category: "habits"
    },
    {
      icon: Sun,
      title: "Morning Sunlight Exposure",
      description: "Natural circadian rhythm regulation for better energy and sleep.",
      level: "Easy",
      duration: "3 min read",
      category: "health"
    },
    {
      icon: Brain,
      title: "5 Minute Meditation",
      description: "Simple mindfulness practice for stress reduction and focus.",
      level: "Easy",
      duration: "4 min read",
      category: "mental"
    },
    {
      icon: Zap,
      title: "Cold Shower Benefits",
      description: "How cold exposure builds resilience and boosts metabolism.",
      level: "Moderate",
      duration: "5 min read",
      category: "health"
    },
    {
      icon: Clock,
      title: "Time Blocking Method",
      description: "Productivity technique that eliminates decision fatigue.",
      level: "Easy",
      duration: "6 min read",
      category: "productivity"
    },
    {
      icon: Target,
      title: "One Thing First",
      description: "Focus strategy that maximizes impact with minimal effort.",
      level: "Easy",
      duration: "3 min read",
      category: "productivity"
    },
    {
      icon: Heart,
      title: "Gratitude Practice",
      description: "Daily appreciation exercise that rewires your brain for positivity.",
      level: "Easy",
      duration: "2 min read",
      category: "mental"
    }
  ];

  // Auto-rotation - slower like a sushi restaurant (every 4 seconds)
  useEffect(() => {
    if (!embla) return;
    
    const autoPlay = setInterval(() => {
      if (embla.canScrollNext()) {
        embla.scrollNext();
      } else {
        embla.scrollTo(0);
      }
    }, 4000); // 4 seconds like a slow sushi conveyor

    return () => clearInterval(autoPlay);
  }, [embla]);

  return (
    <div className="mb-16">
      <Carousel
        setApi={setEmbla}
        opts={{ 
          loop: true,
          align: "start",
          skipSnaps: false,
          dragFree: false
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {tips.map((tip, index) => (
            <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
              <Card className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-2 h-full">
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <tip.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-2 group-hover:text-primary transition-colors flex-shrink-0">
                    {tip.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed flex-grow">
                    {tip.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mt-auto">
                    <span className="inline-flex items-center">
                      <CheckCircle className="w-3 h-3 mr-1 text-success" />
                      {tip.level}
                    </span>
                    <span>{tip.duration}</span>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default TipsCarousel;