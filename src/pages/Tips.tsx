import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import TipCard from "@/components/TipCard";
import ChevronRipple from "@/components/ChevronRipple";
import AITipFinder from "@/components/AITipFinder";
import { 
  Heart, DollarSign, Smile, SlidersHorizontal, Filter, Dumbbell, Flame, TrendingUp,
  BarChart3, Coffee, Eye, Shield, MessageCircle, ShoppingBasket, Map, Truck, Waves,
  EyeOff, Moon, RefreshCw, Package, Droplets, Activity, Sun, Monitor, Calendar,
  Bike, Car, Zap, ArrowUp, Footprints, Trees, Play, ArrowDown, Snowflake,
  RotateCcw, Apple, Minus, Wind, Bus, Pill, Leaf, Users, XCircle, BookOpen,
  PenTool, Brain, Clock, Timer, Target, Lightbulb, Home, Utensils, Bed,
  Camera, Music, Gift, Star, Gamepad2, ThumbsUp, CheckCircle, Award, Trophy
} from "lucide-react";
import { Link } from "react-router-dom";

const Tips = () => {
  const [sortBy, setSortBy] = useState("newest");
  const [highlightedTip, setHighlightedTip] = useState<string | null>(null);

  const tipCategories = [
    {
      icon: Dumbbell,
      title: "25 Ways to Prevent or Delay Sarcopenia",
      description: "A checklist of strength-training, nutrition and lifestyle tweaks to keep muscle as you age.",
      items: [
        "Health: Lift weights 2-3 times per week to maintain muscle mass",
        "Wealth: Home workouts save expensive gym memberships long-term",
        "Happiness: Staying strong boosts confidence and independence"
      ],
      level: "Easy",
      duration: "5 min read",
      category: "fitness",
      popularity: 45,
      views: 0,
      dateAdded: "2024-01-15"
    },
    {
      icon: Flame,
      title: "30 Benefits of Activating Your Brown Fat",
      description: "Explains how cold exposure and certain foods stoke your metabolic furnace.",
      items: [
        "Health: BAT burns calories at rest for effortless fat loss",
        "Wealth: Cold showers cost nothing but boost metabolism significantly",
        "Happiness: Natural endorphin release from cold exposure improves mood"
      ],
      level: "Easy",
      duration: "6 min read",
      category: "health",
      popularity: 52,
      views: 0,
      dateAdded: "2024-01-20"
    },
    {
      icon: TrendingUp,
      title: "30 Benefits of Getting Up and Down",
      description: "Shows why floor mobility predicts longevity and vitality.",
      items: [
        "Health: Improves balance, coordination and joint mobility naturally",
        "Wealth: Free fitness test requiring zero equipment or membership",
        "Happiness: Maintains independence and confidence as you age"
      ],
      level: "Moderate",
      duration: "6 min read",
      category: "fitness",
      popularity: 38,
      views: 0,
      dateAdded: "2024-02-01"
    },
    {
      icon: BarChart3,
      title: "30 Ways to Track Your Habit Progress",
      description: "Thirty low-tech and high-tech tracking options to keep momentum.",
      items: [
        "Health: Visibility creates consistency in exercise and nutrition habits",
        "Wealth: Track spending habits to identify money-saving opportunities",
        "Happiness: Celebrating streaks builds motivation and self-confidence"
      ],
      level: "Easy",
      duration: "5 min read",
      category: "productivity",
      popularity: 63,
      views: 1450,
      dateAdded: "2024-02-10"
    },
    {
      icon: Coffee,
      title: "30 Reasons to Drink Green Tea Instead of Water",
      description: "Positions green tea as a hydration-plus habit for daily wellness.",
      items: [
        "Health: Antioxidants boost metabolism and fight inflammation naturally",
        "Wealth: Cheaper than sugary drinks and expensive supplements long-term",
        "Happiness: Creates a calming daily ritual and mindfulness moment"
      ],
      level: "Easy",
      duration: "6 min read",
      category: "health",
      popularity: 41,
      views: 890,
      dateAdded: "2024-02-15"
    },
    {
      icon: Eye,
      title: "Appreciate the Things Around You",
      description: "A micro-gratitude practice for instant calm and contentment.",
      items: [
        "Health: Lowers stress hormones and reduces cortisol levels effectively",
        "Wealth: Curbs impulse spending by appreciating what you already have",
        "Happiness: Rewires brain for positivity and increases life satisfaction"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "mindfulness",
      popularity: 59,
      views: 1320,
      dateAdded: "2024-02-20"
    },
    {
      icon: Shield,
      title: "Build a 6-Month Emergency Buffer Fund",
      description: "Step-by-step guide to six months of bare-bones financial security.",
      items: [
        "Health: Reduces financial stress which impacts physical wellbeing",
        "Wealth: Automate transfers to build security without temptation",
        "Happiness: Financial peace of mind improves sleep and relationships"
      ],
      level: "Moderate",
      duration: "6 min read",
      category: "finance",
      popularity: 72,
      views: 1650,
      dateAdded: "2024-03-01"
    },
    {
      icon: Heart,
      title: "Connect with More Animals",
      description: "Uses animal interaction for free mood-boosts and stress relief.",
      items: [
        "Health: Lowers cortisol levels and improves cardiovascular health",
        "Wealth: Free entertainment that replaces expensive leisure activities",
        "Happiness: Sparks empathy, joy and emotional intelligence naturally"
      ],
      level: "Easy",
      duration: "5 min read",
      category: "wellness",
      popularity: 33,
      views: 890,
      dateAdded: "2024-03-05"
    },
    {
      icon: MessageCircle,
      title: "Create a WhatsApp Group with Friends for a Specific Purpose",
      description: "Shows how a focused chat turns goals into shared wins and accountability.",
      items: [
        "Health: Built-in accountability keeps fitness and wellness habits consistent",
        "Wealth: Low-cost coaching and support system replaces expensive services",
        "Happiness: Strengthens friendships through shared goals and achievements"
      ],
      level: "Easy",
      duration: "5 min read",
      category: "social",
      popularity: 47,
      views: 1120,
      dateAdded: "2024-03-10"
    },
    {
      icon: ShoppingBasket,
      title: "Do Food Shops Using Handbaskets, Not Trolleys",
      description: "Turning grocery runs into grip-strength and budget training sessions.",
      items: [
        "Health: Builds functional grip strength and adds incidental exercise",
        "Wealth: Limits impulse buys naturally by restricting carrying capacity",
        "Happiness: Makes shopping trips quicker and more intentional"
      ],
      level: "Easy",
      duration: "5 min read",
      category: "lifestyle",
      popularity: 35,
      views: 780,
      dateAdded: "2024-03-15"
    }
  ];

  const sortedAndFilteredTips = useMemo(() => {
    let tips = [...tipCategories];
    
    switch (sortBy) {
      case "popularity":
        return tips.sort((a, b) => b.popularity - a.popularity);
      case "newest":
        return tips.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
      case "oldest":
        return tips.sort((a, b) => new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime());
      default:
        return tips;
    }
  }, [sortBy]);

  const handleTipHighlight = (tipTitle: string) => {
    setHighlightedTip(tipTitle);
    setTimeout(() => setHighlightedTip(null), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-hero text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
              <span className="block text-white">Big Daddy's</span>
              <span className="block text-[hsl(35_45%_75%)]">Big Tips</span>
            </h1>
            <p className="text-lg lg:text-xl mb-6 text-white/90 leading-relaxed max-w-3xl mx-auto">
              Simple daily habits that silently transform your health, wealth, and happiness simultaneously.
            </p>
            <p className="text-white/70 text-sm mb-8">
              📖 {tipCategories.length} Powerful Guides Available
            </p>
          </div>
        </div>
      </section>

      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-12">
            <div className="flex items-center gap-3">
              <SlidersHorizontal className="w-5 h-5 text-muted-foreground" />
              <span className="font-medium text-foreground">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="popularity">Popularity</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* AI Tip Finder */}
      <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
        <AITipFinder tips={tipCategories} onTipHighlight={handleTipHighlight} />
      </div>

      {/* Tips Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedAndFilteredTips.map((tip, index) => (
              <div
                key={tip.title}
                className={`animate-fade-in ${
                  highlightedTip === tip.title 
                    ? 'shadow-[0_0_0_4px_rgba(59,130,246,0.5)] rounded-lg' 
                    : ''
                }`}
                style={{ animationDelay: `${400 + index * 100}ms` }}
              >
                <div data-tip-title={tip.title} className="w-full">
                  <TipCard tip={tip} index={index} />
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {sortedAndFilteredTips.length === 0 && (
            <div className="text-center py-12 animate-fade-in">
              <p className="text-muted-foreground text-lg mb-4">
                No guides found.
              </p>
            </div>
          )}

          {/* CTA Section - Now at bottom of tips grid */}
          <div className="mt-20 text-center bg-warning text-primary rounded-2xl p-12 border-4 border-warning/40">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Want More Life-Changing Strategies?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Get the complete BDBT system with your personalized blueprint and start implementing these tips today.
            </p>
            <Button variant="accent" size="lg" asChild>
              <Link to="/blueprint">Download Your Blueprint</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tips;