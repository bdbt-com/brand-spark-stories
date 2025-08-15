import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { useNavigate } from "react-router-dom";
import { 
  Dumbbell, Coffee, Utensils, Droplets, Activity, Moon, Sun, Zap, 
  Clock, Brain, Heart, Target, Lightbulb, Shield, CheckCircle
} from "lucide-react";

const TipsCarousel = () => {
  const [embla, setEmbla] = useState<CarouselApi | null>(null);
  const navigate = useNavigate();

  // Tips that exactly match the titles in the Tips page
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
      icon: Dumbbell,
      title: "30 Benefits of Greater Grip Strength",
      description: "Discover how grip strength affects longevity and overall health.",
      level: "Easy",
      duration: "5 min read",
      category: "fitness"
    },
    {
      icon: Dumbbell,
      title: "30 Benefits of Using an AB Roller",
      description: "Core strengthening benefits of this simple exercise tool.",
      level: "Moderate",
      duration: "4 min read",
      category: "fitness"
    },
    {
      icon: Coffee,
      title: "30 Reasons to Drink Green Tea Instead of Water",
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
      icon: Utensils,
      title: "30 Benefits of Drinking Decaf Coffee",
      description: "Explore the health benefits of decaffeinated coffee.",
      level: "Easy",
      duration: "5 min read",
      category: "health"
    },
    {
      icon: Droplets,
      title: "30 Benefits of Only Drinking Water for 30 Days",
      description: "Transform your health with this simple hydration challenge.",
      level: "Easy",
      duration: "6 min read",
      category: "health"
    },
    {
      icon: Activity,
      title: "30 Benefits of Building Your Physical Bank Account",
      description: "Invest in your body's long-term health and vitality.",
      level: "Moderate",
      duration: "7 min read",
      category: "fitness"
    },
    {
      icon: Moon,
      title: "30 Benefits of Sleeping the Same Time Every Day",
      description: "Consistent sleep schedule for optimal health and energy.",
      level: "Easy",
      duration: "5 min read",
      category: "health"
    },
    {
      icon: Sun,
      title: "30 Benefits of Getting 10 Minutes of Morning Sunlight",
      description: "Natural vitamin D and circadian rhythm regulation.",
      level: "Easy",
      duration: "4 min read",
      category: "health"
    },
    {
      icon: Brain,
      title: "30 Benefits of Learning Something New Every Day",
      description: "Keep your mind sharp with continuous learning.",
      level: "Easy",
      duration: "6 min read",
      category: "mental"
    },
    {
      icon: Target,
      title: "30 Benefits of Writing Down Your Goals",
      description: "Transform dreams into reality through written commitment.",
      level: "Easy",
      duration: "5 min read",
      category: "productivity"
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

  // Handle tip card click
  const handleTipClick = (tipTitle: string) => {
    navigate('/tips', { state: { highlightTip: tipTitle } });
  };

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
              <Card 
                className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-2 h-full cursor-pointer"
                onClick={() => handleTipClick(tip.title)}
              >
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