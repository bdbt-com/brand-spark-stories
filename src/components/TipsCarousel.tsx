import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { useNavigate } from "react-router-dom";
import { 
  Dumbbell, Coffee, Utensils, Droplets, Activity, Moon, Sun, Zap, 
  Clock, Brain, Heart, Target, Lightbulb, Shield, CheckCircle,
  BarChart3, Footprints, Trees, ArrowUp
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
      icon: Brain,
      title: "30 Ways to Reduce Decision Fatigue in Everyday Life",
      description: "Streamline daily choices to preserve mental energy.",
      level: "Moderate",
      duration: "7 min read",
      category: "productivity"
    },
    {
      icon: BarChart3,
      title: "30 Ways to Track Your Habit Progress",
      description: "Thirty low-tech and high-tech tracking options to keep momentum.",
      level: "Easy",
      duration: "5 min read",
      category: "productivity"
    },
    {
      icon: Footprints,
      title: "50 Ways to Walk More in a Day",
      description: "Practical strategies to increase daily step count effortlessly.",
      level: "Easy",
      duration: "8 min read",
      category: "fitness"
    },
    {
      icon: Trees,
      title: "50 ways to incorporate nature into your daily life",
      description: "Simple methods to connect with nature every day.",
      level: "Easy",
      duration: "8 min read",
      category: "wellness"
    },
    {
      icon: Activity,
      title: "Add 5-Minute Mobility Routine to Your Day",
      description: "Quick daily movements to maintain flexibility and joint health.",
      level: "Easy",
      duration: "3 min read",
      category: "fitness"
    },
    {
      icon: Droplets,
      title: "Add Lemon to Water for a Vitamin C Boost",
      description: "Simple way to enhance hydration with nutritional benefits.",
      level: "Easy",
      duration: "2 min read",
      category: "health"
    },
    {
      icon: ArrowUp,
      title: "Always Take the Stairs",
      description: "Simple daily exercise that builds strength and endurance.",
      level: "Easy",
      duration: "2 min read",
      category: "fitness"
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
                  <p className="text-primary mb-4 leading-relaxed flex-grow">
                    {tip.description}
                  </p>
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