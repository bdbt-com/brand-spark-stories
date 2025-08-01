import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TipCard from "@/components/TipCard";
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

  const tipCategories = [
    {
      icon: Dumbbell,
      title: "25 Ways to Prevent or Delay Sarcopenia",
      description: "A checklist of strength-training, nutrition and lifestyle tweaks to keep muscle as you age.",
      items: [
        "Lift weights 2-3 times per week minimum",
        "Prioritise protein intake throughout the day",
        "Move daily to maintain muscle function"
      ],
      level: "Easy",
      duration: "5 min read",
      category: "health",
      popularity: 45,
      views: 1200,
      dateAdded: "2024-01-15"
    },
    {
      icon: Flame,
      title: "30 Benefits of Activating Your Brown Fat",
      description: "Explains how cold exposure and certain foods stoke your metabolic furnace.",
      items: [
        "BAT burns calories at rest for effortless fat loss",
        "Boosts insulin sensitivity for better health",
        "Pairs well with exercise for enhanced results"
      ],
      level: "Easy",
      duration: "6 min read",
      category: "health",
      popularity: 52,
      views: 980,
      dateAdded: "2024-01-20"
    },
    {
      icon: TrendingUp,
      title: "30 Benefits of Getting Up and Down",
      description: "Shows why floor mobility predicts longevity and vitality.",
      items: [
        "Improves balance and coordination",
        "Protects joints through natural movement",
        "Great self-test for functional fitness"
      ],
      level: "Moderate",
      duration: "6 min read",
      category: "health",
      popularity: 38,
      views: 750,
      dateAdded: "2024-02-01"
    },
    {
      icon: BarChart3,
      title: "30 Ways to Track Your Habit Progress",
      description: "Thirty low-tech and high-tech tracking options to keep momentum.",
      items: [
        "Visibility equals consistency in habit building",
        "Pick friction-free tools that fit your lifestyle",
        "Celebrate streaks to maintain motivation"
      ],
      level: "Easy",
      duration: "5 min read",
      category: "happiness",
      popularity: 63,
      views: 1450,
      dateAdded: "2024-02-10"
    },
    {
      icon: Coffee,
      title: "30 Reasons to Drink Green Tea Instead of Water",
      description: "Positions green tea as a hydration-plus habit for daily wellness.",
      items: [
        "Antioxidants boost metabolism naturally",
        "Cheaper than sugary drinks long-term",
        "Creates a calming daily ritual"
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
        "Lowers stress hormones effectively",
        "Curbs impulse spending habits",
        "Rewires mindset for positivity"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "happiness",
      popularity: 59,
      views: 1320,
      dateAdded: "2024-02-20"
    },
    {
      icon: Shield,
      title: "Build a 6-Month Emergency Buffer Fund",
      description: "Step-by-step guide to six months of bare-bones financial security.",
      items: [
        "Automate transfers to remove temptation",
        "Use windfalls to accelerate progress",
        "Celebrate milestones to stay motivated"
      ],
      level: "Moderate",
      duration: "6 min read",
      category: "wealth",
      popularity: 72,
      views: 1650,
      dateAdded: "2024-03-01"
    },
    {
      icon: Heart,
      title: "Connect with More Animals",
      description: "Uses animal interaction for free mood-boosts and stress relief.",
      items: [
        "Lowers cortisol levels naturally",
        "Encourages daily movement and activity",
        "Sparks empathy and emotional intelligence"
      ],
      level: "Easy",
      duration: "5 min read",
      category: "happiness",
      popularity: 33,
      views: 890,
      dateAdded: "2024-03-05"
    },
    {
      icon: MessageCircle,
      title: "Create a WhatsApp Group with Friends for a Specific Purpose",
      description: "Shows how a focused chat turns goals into shared wins and accountability.",
      items: [
        "Built-in accountability from friends",
        "Low-cost coaching and support system",
        "30 group-idea prompts included"
      ],
      level: "Easy",
      duration: "5 min read",
      category: "happiness",
      popularity: 47,
      views: 1120,
      dateAdded: "2024-03-10"
    },
    {
      icon: ShoppingBasket,
      title: "Do Food Shops Using Handbaskets, Not Trolleys",
      description: "Turning grocery runs into grip-strength and budget training sessions.",
      items: [
        "Limits impulse buys naturally",
        "Builds functional strength daily",
        "Makes for quicker shopping trips"
      ],
      level: "Easy",
      duration: "5 min read",
      category: "wealth",
      popularity: 35,
      views: 780,
      dateAdded: "2024-03-15"
    },
    {
      icon: Map,
      title: "Go Exploring",
      description: "Free, curiosity-driven walks that break boredom and boost creativity.",
      items: [
        "Adds extra steps without gym membership",
        "Zero-cost entertainment option",
        "Natural mood lift from novelty"
      ],
      level: "Easy",
      duration: "5 min read",
      category: "happiness",
      popularity: 41,
      views: 950,
      dateAdded: "2024-03-20"
    },
    {
      icon: Truck,
      title: "Get Free Deliveroo Plus with Amazon Prime",
      description: "Simple hack to bundle perks and save on delivery fees.",
      items: [
        "Activate in-app for instant savings",
        "Cancel if Prime lapses to avoid charges",
        "Stack with cashback for double benefits"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "wealth",
      popularity: 28,
      views: 645,
      dateAdded: "2024-03-25"
    },
    {
      icon: Waves,
      title: "Have More Baths",
      description: "Argues for hot-soak recovery on the cheap for stress relief.",
      items: [
        "Lowers cortisol levels effectively",
        "Helps improve sleep quality",
        "Creates mindfulness pocket in day"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "health",
      popularity: 56,
      views: 1240,
      dateAdded: "2024-03-30"
    },
    {
      icon: EyeOff,
      title: "Hide Your Savings From Yourself",
      description: "Automate transfers so you never see spendable cash lying around.",
      items: [
        "Pay-yourself-first principle in action",
        "Out-of-sight equals untouched savings",
        "Raise percentage with every pay-rise"
      ],
      level: "Easy",
      duration: "5 min read",
      category: "wealth",
      popularity: 68,
      views: 1580,
      dateAdded: "2024-04-01"
    },
    {
      icon: Moon,
      title: "Limit Screen Time Before Bed",
      description: "Blueprint for a one-hour digital sunset for better sleep.",
      items: [
        "Blue-light block improves sleep quality",
        "Book swap enhances mental stimulation",
        "Prep tomorrow reduces morning stress"
      ],
      level: "Moderate",
      duration: "4 min read",
      category: "health",
      popularity: 74,
      views: 1720,
      dateAdded: "2024-04-05"
    },
    {
      icon: RefreshCw,
      title: "Reframe One Thing Today",
      description: "Cognitive re-appraisal micro-habit for mental resilience.",
      items: [
        "Choose one daily annoyance to flip",
        "Practice perspective shifting regularly",
        "Repeat daily for lasting mindset change"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "happiness",
      popularity: 51,
      views: 1180,
      dateAdded: "2024-04-10"
    },
    {
      icon: Package,
      title: "Sell Unused Items",
      description: "Declutter for cash in three quick steps to boost finances.",
      items: [
        "Pick one drawer to start small",
        "List items same-day for momentum",
        "Earmark proceeds for debt or savings"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "wealth",
      popularity: 44,
      views: 1030,
      dateAdded: "2024-04-15"
    },
    {
      icon: Droplets,
      title: "Set a Water Intake Goal",
      description: "Personalised hydration target with 80 benefits list included.",
      items: [
        "Use bottle reminders for consistency",
        "Track daily intake for awareness",
        "Pair with meals for habit stacking"
      ],
      level: "Easy",
      duration: "5 min read",
      category: "health",
      popularity: 61,
      views: 1410,
      dateAdded: "2024-04-20"
    },
    {
      icon: Activity,
      title: "Spend Time in Zone 2 Each Week",
      description: "Explains conversational-pace cardio for longevity and health.",
      items: [
        "Boosts mitochondrial function significantly",
        "Aids fat-burning without stress",
        "Low-injury risk for sustainable fitness"
      ],
      level: "Moderate",
      duration: "6 min read",
      category: "health",
      popularity: 79,
      views: 1850,
      dateAdded: "2024-04-25"
    },
    {
      icon: Sun,
      title: "Start Your Day with Movement",
      description: "Thirty morning-move ideas from gentle stretch to kettlebells.",
      items: [
        "Sets circadian rhythm naturally",
        "Triggers natural dopamine release",
        "Pairs perfectly with coffee brew time"
      ],
      level: "Easy",
      duration: "6 min read",
      category: "health",
      popularity: 83,
      views: 1920,
      dateAdded: "2024-04-30"
    }
  ];

  // Filtering and sorting logic
  const filteredAndSortedTips = useMemo(() => {
    let filtered = tipCategories;
    
    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(tip => tip.category === categoryFilter);
    }
    
    // Apply sorting
    switch (sortBy) {
      case "popularity":
        return filtered.sort((a, b) => b.popularity - a.popularity);
      case "views":
        return filtered.sort((a, b) => b.views - a.views);
      case "newest":
        return filtered.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
      case "oldest":
        return filtered.sort((a, b) => new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime());
      case "shortest":
        return filtered.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
      case "longest":
        return filtered.sort((a, b) => parseInt(b.duration) - parseInt(a.duration));
      default:
        return filtered;
    }
  }, [categoryFilter, sortBy]);

  return (
    <div className="min-h-screen py-20 relative bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Free Tips & Guide Catalogue
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Transform your life with our comprehensive collection of proven strategies, actionable frameworks, 
            and practical guides. All completely free for our community.
          </p>
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
                <Filter className="w-4 h-4" />
                All Categories
              </Button>
              <Button
                variant={categoryFilter === "health" ? "default" : "outline"}
                size="sm"
                onClick={() => setCategoryFilter("health")}
                className="gap-2 transition-all duration-200 hover:scale-105"
              >
                <Heart className="w-4 h-4" />
                Health
              </Button>
              <Button
                variant={categoryFilter === "wealth" ? "default" : "outline"}
                size="sm"
                onClick={() => setCategoryFilter("wealth")}
                className="gap-2 transition-all duration-200 hover:scale-105"
              >
                <DollarSign className="w-4 h-4" />
                Wealth
              </Button>
              <Button
                variant={categoryFilter === "happiness" ? "default" : "outline"}
                size="sm"
                onClick={() => setCategoryFilter("happiness")}
                className="gap-2 transition-all duration-200 hover:scale-105"
              >
                <Smile className="w-4 h-4" />
                Happiness
              </Button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3">
              <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="popularity">Most Popular</SelectItem>
                  <SelectItem value="views">Most Viewed</SelectItem>
                  <SelectItem value="shortest">Shortest Read</SelectItem>
                  <SelectItem value="longest">Longest Read</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: "300ms" }}>
          <h3 className="text-xl font-semibold text-center text-foreground mb-8">
            {categoryFilter === "all" 
              ? "All Available Guides" 
              : `${categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)} Guides`}
            <span className="text-muted-foreground ml-2">({filteredAndSortedTips.length})</span>
          </h3>
        </div>
        
        {/* Tips Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {filteredAndSortedTips.map((tip, index) => (
            <div 
              key={index}
              className="animate-fade-in hover-lift"
              style={{ animationDelay: `${400 + index * 100}ms` }}
            >
              <TipCard tip={tip} index={index} />
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
    </div>
  );
};

export default Tips;