import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import TipCard from "@/components/TipCard";
import ChevronRipple from "@/components/ChevronRipple";
import AITipFinder from "@/components/AITipFinder";
import { 
  Heart,
  DollarSign,
  Smile,
  SlidersHorizontal,
  Filter,
  Dumbbell,
  Flame,
  TrendingUp,
  BarChart3,
  Coffee,
  Eye,
  Shield,
  MessageCircle,
  ShoppingBasket,
  Map,
  Truck,
  Waves,
  EyeOff,
  Moon,
  RefreshCw,
  Package,
  Droplets,
  Activity,
  Sun,
  Monitor,
  Calendar,
  Bike,
  Car,
  Zap,
  ArrowUp,
  Footprints,
  Trees,
  Play,
  ArrowDown,
  Snowflake,
  RotateCcw,
  Apple,
  Minus,
  Wind,
  Bus,
  Pill,
  Leaf,
  Users,
  XCircle,
  BookOpen,
  PenTool,
  Brain
} from "lucide-react";

const Tips = () => {
  const [sortBy, setSortBy] = useState("newest");
  const [categoryFilter, setCategoryFilter] = useState("all");
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
      category: "all",
      popularity: 45,
      views: 1200,
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
      category: "all",
      popularity: 52,
      views: 980,
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
      category: "all",
      popularity: 38,
      views: 750,
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
      category: "all",
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
      category: "all",
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
      category: "all",
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
      category: "all",
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
      category: "all",
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
      category: "all",
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
      category: "all",
      popularity: 35,
      views: 780,
      dateAdded: "2024-03-15"
    }
  ];

  // Filter and sort tips
  const filteredTips = useMemo(() => {
    return tipCategories.filter(tip => {
      if (categoryFilter === "all") return true;
      // Since we removed categories, all tips now show for any filter
      return true;
    });
  }, [categoryFilter]);

  const filteredAndSortedTips = useMemo(() => {
    let sorted = [...filteredTips];
    
    switch (sortBy) {
      case "newest":
        sorted.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
        break;
      case "oldest":
        sorted.sort((a, b) => new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime());
        break;
      case "popular":
        sorted.sort((a, b) => b.popularity - a.popularity);
        break;
      case "views":
        sorted.sort((a, b) => b.views - a.views);
        break;
      default:
        break;
    }
    
    return sorted;
  }, [filteredTips, sortBy]);

  const handleTipHighlight = (tipTitle: string) => {
    setHighlightedTip(tipTitle);
    setTimeout(() => setHighlightedTip(null), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <Badge className="bg-white/20 text-white border-white/30 mb-6">
              📚 Life-Changing Guides
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="block text-gradient-primary">Big Daddy's</span>
              <span className="block text-white">Big Tips</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-white/90 leading-relaxed max-w-4xl mx-auto">
              Simple daily habits that silently transform your health, wealth, and happiness simultaneously. Each tip works across all three areas of your life.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: "100ms" }}>
            <ChevronRipple to="/daily-wins" label="Add to the Daily Wins Page" />
            <ChevronRipple to="/podcast" label="Go to Podcast" color="accent" />
          </div>
        </div>

        {/* AI Tip Finder */}
        <div className="animate-fade-in" style={{ animationDelay: "150ms" }}>
          <AITipFinder tips={tipCategories} onTipHighlight={handleTipHighlight} />
        </div>

        {/* Filters and Sorting */}
        <div className="mb-12 animate-fade-in" style={{ animationDelay: "200ms" }}>
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              <Button
                variant={categoryFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setCategoryFilter("all")}
                className="gap-2 transition-all duration-200 hover:scale-105"
              >
                <SlidersHorizontal className="w-4 h-4" />
                All Tips
              </Button>
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-4">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 bg-white/10 border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="views">Most Viewed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Tips Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedTips.map((tip, index) => (
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
          {filteredAndSortedTips.length === 0 && (
            <div className="text-center py-12 animate-fade-in">
              <p className="text-muted-foreground text-lg mb-4">
                No guides found for the selected category.
              </p>
              <Button 
                variant="outline" 
                onClick={() => setCategoryFilter("all")}
                className="hover:scale-105 transition-transform duration-200"
              >
                View All Categories
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Tips;