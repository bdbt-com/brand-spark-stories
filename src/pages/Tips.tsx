import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BookOpen, 
  Target, 
  TrendingUp, 
  Lightbulb, 
  Users, 
  Clock, 
  Star, 
  Brain,
  Rocket,
  Heart,
  DollarSign,
  Zap,
  ArrowRight,
  X,
  Dumbbell,
  Flame,
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
  Smile,
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
  XCircle,
  PenTool,
  SlidersHorizontal,
  Filter
} from "lucide-react";

const Tips = () => {
  const [emailCapture, setEmailCapture] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Featured cornerstone guide
  const featuredGuide = {
    icon: BookOpen,
    title: "The Source Blueprint",
    description: "The foundational framework that underpins everything we teach. Master the core principles that successful entrepreneurs use to build thriving businesses and meaningful lives.",
    items: ["Core Success Principles", "Business Foundation Framework", "Life Integration System"],
    level: "Essential",
    duration: "45 min read"
  };

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
      duration: "5 min read"
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
      duration: "5 min read"
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
      duration: "5 min read"
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
      duration: "5 min read"
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
      duration: "3 min read"
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
      duration: "3 min read"
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
      duration: "5 min read"
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
      duration: "4 min read"
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
      duration: "4 min read"
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
      duration: "4 min read"
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
      duration: "5 min read"
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
      duration: "6 min read"
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
      duration: "6 min read"
    },
    {
      icon: Monitor,
      title: "Use a Standing Desk at Home",
      description: "Posture-friendly home-office setup guide for better health.",
      items: [
        "Alternate sit-stand throughout day",
        "Anti-fatigue mat reduces leg stress",
        "Timer nudges prevent static postures"
      ],
      level: "Moderate",
      duration: "4 min read"
    },
    {
      icon: Calendar,
      title: "Use Free Local Events for Entertainment",
      description: "Swap spendy nights for council-run fun and community connection.",
      items: [
        "Library talks offer free education",
        "Park runs build fitness community",
        "Travel-cost hack for budget dates"
      ],
      level: "Easy",
      duration: "4 min read"
    },
    {
      icon: Bike,
      title: "Use Your Bike or Feet Wherever Possible",
      description: "Thirty swaps to ditch the car and boost daily activity.",
      items: [
        "Active commute improves fitness",
        "Stairs over lift builds strength",
        "10k-step goal becomes achievable"
      ],
      level: "Moderate",
      duration: "6 min read"
    },
    {
      icon: Car,
      title: "Park Further Away",
      description: "Adds incidental steps and eases parking stress simultaneously.",
      items: [
        "Extra 500-1000 steps per day",
        "Less door-ding risk for car",
        "Micro-workout mindset development"
      ],
      level: "Easy",
      duration: "3 min read"
    },
    {
      icon: Smile,
      title: "Smile at Yourself in the Mirror",
      description: "Tiny self-esteem hack with surprising psychological benefits.",
      items: [
        "Triggers natural dopamine spike",
        "Improves posture automatically",
        "Anchors positive morning routine"
      ],
      level: "Easy",
      duration: "3 min read"
    },
    {
      icon: Zap,
      title: "Stretch Daily",
      description: "Five-minute mobility flow with 10 starter moves included.",
      items: [
        "Reduces stiffness and pain",
        "Pairs perfectly with kettle time",
        "Improves posture throughout day"
      ],
      level: "Easy",
      duration: "4 min read"
    },
    {
      icon: ArrowUp,
      title: "Do Calf Raises While Brushing Your Teeth",
      description: "Sneak movement into hygiene routine for effortless gains.",
      items: [
        "Better circulation and blood flow",
        "Balance boost for injury prevention",
        "Perfect habit-stacking demonstration"
      ],
      level: "Easy",
      duration: "3 min read"
    },
    {
      icon: Droplets,
      title: "Drink One Extra Glass of Water",
      description: "Quick hydration win plus 25 creative implementation ideas.",
      items: [
        "Water bottle on desk as visual cue",
        "Flavour infusions prevent boredom",
        "Hourly alarms ensure consistency"
      ],
      level: "Easy",
      duration: "4 min read"
    },
    {
      icon: TrendingUp,
      title: "Do a Financial Health Check Every 3 Months",
      description: "Quarterly money MOT template for ongoing financial wellness.",
      items: [
        "Cancel unnecessary subscriptions regularly",
        "Track net-worth progress over time",
        "Set realistic next-quarter goals"
      ],
      level: "Moderate",
      duration: "6 min read"
    },
    {
      icon: BookOpen,
      title: "Always Use a Shopping List",
      description: "Curb impulse buys and food waste with this simple habit.",
      items: [
        "Note planned meals first",
        "Stick to specific aisles only",
        "Save significant money monthly"
      ],
      level: "Easy",
      duration: "3 min read"
    },
    {
      icon: Brain,
      title: "Meditate for 5 Minutes a Day",
      description: "Fast entry-level breath focus for mental clarity and calm.",
      items: [
        "Set timer to remove guesswork",
        "Anchor after coffee for consistency",
        "Accept wandering mind as normal"
      ],
      level: "Easy",
      duration: "3 min read"
    },
    {
      icon: Footprints,
      title: "Take a Short Walk After Meals",
      description: "10-minute post-prandial stroll for better digestion and health.",
      items: [
        "Blunts glucose spike naturally",
        "Aids digestion significantly",
        "Easy social habit to maintain"
      ],
      level: "Easy",
      duration: "3 min read"
    },
    {
      icon: Trees,
      title: "Get Out in Nature Each Sunday",
      description: "50 low-cost green time ideas for weekly nature connection.",
      items: [
        "Barefoot grounding reduces stress",
        "Forest mindfulness boosts mood",
        "Farmers market combines errands"
      ],
      level: "Moderate",
      duration: "5 min read"
    },
    {
      icon: Play,
      title: "Watch a TED Talk Instead of TV",
      description: "Swap passive binge for 18-minute learning and growth.",
      items: [
        "Curated playlist saves decision fatigue",
        "Discuss with friend for deeper learning",
        "Note one action for implementation"
      ],
      level: "Easy",
      duration: "3 min read"
    },
    {
      icon: ArrowDown,
      title: "Do Deep Squats During TV Ads",
      description: "Adds strength training while watching your favourite shows.",
      items: [
        "Hips below knee for full range",
        "Hold remote as counterweight",
        "3 sets of 10 every evening"
      ],
      level: "Easy",
      duration: "3 min read"
    },
    {
      icon: Snowflake,
      title: "Freeze Fruits & Veg for Smoothies",
      description: "Saves money and prevents waste with smart food prep.",
      items: [
        "Prep bags for convenience",
        "Smoothie-base list included",
        "Icy texture provides brown-fat bonus"
      ],
      level: "Easy",
      duration: "3 min read"
    },
    {
      icon: RotateCcw,
      title: "Try Amazon Subscribe & Save",
      description: "Automate essentials at discount for effortless savings.",
      items: [
        "Select 5+ items for 15% off",
        "Set 2-month cadence optimal",
        "Cancel anytime with no penalty"
      ],
      level: "Easy",
      duration: "4 min read"
    },
    {
      icon: Apple,
      title: "Eat Protein with Every Meal",
      description: "Simple macro rule for stable energy and better health.",
      items: [
        "Palm-size portion guide included",
        "Mix plant and animal sources",
        "Stabilise energy throughout day"
      ],
      level: "Easy",
      duration: "4 min read"
    },
    {
      icon: ArrowUp,
      title: "Practice Good Posture",
      description: "Desk-to-standing cues and wall tests for spinal health.",
      items: [
        "Ears over shoulders alignment",
        "Hourly reset reminders work",
        "Strengthen rear chain muscles"
      ],
      level: "Moderate",
      duration: "4 min read"
    },
    {
      icon: Minus,
      title: "Replace One Sugary Snack Daily",
      description: "Swap chocolate for fruit and protein alternatives gradually.",
      items: [
        "Prep healthy alternatives in advance",
        "Crowd-out strategy beats restriction",
        "Track cravings to identify patterns"
      ],
      level: "Easy",
      duration: "3 min read"
    },
    {
      icon: Wind,
      title: "Breathe Deeply for 60 Seconds Twice a Day",
      description: "Box-breathing micro-break for instant stress relief.",
      items: [
        "Lowers cortisol levels quickly",
        "Boosts focus and concentration",
        "Pairs perfectly with kettle boil"
      ],
      level: "Easy",
      duration: "3 min read"
    },
    {
      icon: ArrowUp,
      title: "Always Take the Stairs",
      description: "Everyday NEAT upgrade for effortless fitness gains.",
      items: [
        "Burns 3x walking calories",
        "Builds leg strength daily",
        "Free lifetime gym membership"
      ],
      level: "Easy",
      duration: "4 min read"
    },
    {
      icon: Eye,
      title: "Look Up at the Sky Once a Day",
      description: "One-minute perspective reset for mental clarity and calm.",
      items: [
        "Eye-strain relief from screens",
        "Circadian light exposure benefits",
        "Gratitude spark from nature"
      ],
      level: "Easy",
      duration: "2 min read"
    },
    {
      icon: Bus,
      title: "Use Public Transport Instead of Driving",
      description: "Habit swap for wallet and planet with bonus benefits.",
      items: [
        "Plan routes for stress reduction",
        "Read on bus for learning time",
        "Add walking legs for fitness"
      ],
      level: "Moderate",
      duration: "4 min read"
    },
    {
      icon: Pill,
      title: "Try Generic Medication Brands",
      description: "Cut pharmacy spend without quality loss using smart swaps.",
      items: [
        "Check active ingredient matches",
        "Ask pharmacist for guidance",
        "Save up to 70% on costs"
      ],
      level: "Easy",
      duration: "3 min read"
    },
    {
      icon: Leaf,
      title: "Try a New Healthy Food Each Week",
      description: "52-week variety challenge for nutritional diversity.",
      items: [
        "List untried plants for inspiration",
        "Share recipe pics for accountability",
        "Track favourites for repeat meals"
      ],
      level: "Easy",
      duration: "4 min read"
    },
    {
      icon: Users,
      title: "Connect with Loved Ones",
      description: "Sunday call and message script for stronger relationships.",
      items: [
        "Calendar cue ensures consistency",
        "3-question check-in template",
        "Strengthens bonds over time"
      ],
      level: "Easy",
      duration: "3 min read"
    },
    {
      icon: XCircle,
      title: "Have a Weekly No-Spend Day",
      description: "24-hour retail fast for mindful money awareness.",
      items: [
        "Pre-plan meals to avoid temptation",
        "Free fun list for entertainment",
        "Reflect on spending urges"
      ],
      level: "Moderate",
      duration: "3 min read"
    },
    {
      icon: BookOpen,
      title: "Learn Something New (5-min Skill)",
      description: "Quick-fire up-skilling framework for continuous growth.",
      items: [
        "Micro-lesson sources provided",
        "Track wins for motivation",
        "Stack skills for compound learning"
      ],
      level: "Easy",
      duration: "3 min read"
    },
    {
      icon: Leaf,
      title: "Try Natural Anxiety Fixes",
      description: "List of evidence-based, drug-free soothers for stress.",
      items: [
        "Breathwork techniques included",
        "Magnesium supplementation guide",
        "Nature time prescriptions"
      ],
      level: "Easy",
      duration: "5 min read"
    },
    {
      icon: Users,
      title: "Join a Community",
      description: "How to find and plug into groups that fuel personal growth.",
      items: [
        "Clarify interests before searching",
        "Test meetings before committing",
        "Add value consistently to belong"
      ],
      level: "Moderate",
      duration: "6 min read"
    },
    {
      icon: PenTool,
      title: "Keep a Notebook by Your Bed",
      description: "Captures 3 a.m. ideas and improves sleep quality.",
      items: [
        "Brain dump reduces racing thoughts",
        "Pattern spotting reveals insights",
        "Morning review sparks action"
      ],
      level: "Easy",
      duration: "3 min read"
    },
    {
      icon: RotateCcw,
      title: "When You Reach the Top of the Stairs, Go Back Down and Up Again",
      description: "One-minute leg blast hiding in plain sight for fitness.",
      items: [
        "Doubles stair benefit instantly",
        "Free cardio without gym",
        "Momentum hack for energy"
      ],
      level: "Easy",
      duration: "4 min read"
    },
    {
      icon: Zap,
      title: "Get Your Lunges In While Vacuuming",
      description: "Turn household chores into effective leg day workouts.",
      items: [
        "Lunge with each vacuum stroke",
        "Burns extra calories effortlessly",
        "No extra time required"
      ],
      level: "Easy",
      duration: "4 min read"
    }
  ].map((tip, index) => ({ 
    ...tip, 
    category: tip.category || (index % 3 === 0 ? "health" : index % 3 === 1 ? "wealth" : "happiness"),
    popularity: tip.popularity || Math.floor(Math.random() * 100) + 1,
    views: tip.views || Math.floor(Math.random() * 2000) + 100,
    dateAdded: tip.dateAdded || "2024-01-01"
  }));

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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "health": return "bg-success/10 text-success border-success/20";
      case "wealth": return "bg-warning/10 text-warning border-warning/20";
      case "happiness": return "bg-primary/10 text-primary border-primary/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Essential": return "bg-gradient-primary text-primary-foreground";
      case "Beginner": return "bg-success text-success-foreground";
      case "Intermediate": return "bg-warning text-warning-foreground";
      case "Advanced": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const handleDownloadClick = (index: number) => {
    setEmailCapture(index);
  };

  const handleFeaturedDownloadClick = () => {
    setEmailCapture(-1); // Use -1 for featured guide
  };

  const handleEmailSubmit = (e: React.FormEvent, tipTitle: string) => {
    e.preventDefault();
    if (email) {
      // Handle email submission logic here
      console.log(`Sending ${tipTitle} guide to ${email}`);
      // Reset form
      setEmail("");
      setEmailCapture(null);
      // Show success message (you could add a toast here)
    }
  };

  const closeEmailCapture = () => {
    setEmailCapture(null);
    setEmail("");
  };

  return (
    <div className="min-h-screen py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Free Tips & Guide Catalogue
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Transform your life with our comprehensive collection of proven strategies, actionable frameworks, 
            and practical guides. All completely free for our community.
          </p>
        </div>

        {/* Featured Guide - The Source Blueprint */}
        <div className="mb-20">
          <div className="text-center mb-8">
            <Badge className="bg-gradient-primary text-primary-foreground mb-4">
              ⭐ CORNERSTONE GUIDE
            </Badge>
            <h2 className="text-2xl font-bold text-foreground">Start Here</h2>
          </div>
          
          <Card className="max-w-2xl mx-auto group hover:shadow-strong transition-all duration-300 hover:-translate-y-2 cursor-pointer relative overflow-hidden bg-gradient-subtle border-2 border-primary/20">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <featuredGuide.icon className="w-8 h-8 text-white" />
                </div>
                <Badge className={getLevelColor(featuredGuide.level)}>
                  {featuredGuide.level}
                </Badge>
              </div>
              <CardTitle className="text-2xl leading-snug group-hover:text-primary transition-colors text-center">
                {featuredGuide.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {emailCapture === -1 ? (
                /* Email Capture Form for Featured Guide */
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-foreground">Get Your Free Guide</h4>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={closeEmailCapture}
                      className="w-6 h-6 hover:bg-destructive/10 hover:text-destructive"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <form onSubmit={(e) => handleEmailSubmit(e, featuredGuide.title)} className="space-y-4">
                    <div>
                      <Label htmlFor="featured-email" className="text-sm">Email Address</Label>
                      <Input
                        id="featured-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                        className="mt-1"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      variant="hero" 
                      size="lg" 
                      className="w-full"
                    >
                      Send Guide <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </form>
                  <p className="text-sm text-muted-foreground text-center">
                    We'll email you the guide instantly. No spam, ever.
                  </p>
                </div>
              ) : (
                /* Original Featured Guide Content */
                <>
                  <p className="text-muted-foreground leading-relaxed text-center text-lg">
                    {featuredGuide.description}
                  </p>
                  
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-foreground text-center">What's Included:</p>
                    <ul className="space-y-2 max-w-md mx-auto">
                      {featuredGuide.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-sm text-muted-foreground flex items-center justify-center">
                          <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-sm text-muted-foreground flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {featuredGuide.duration}
                    </span>
                    <Button 
                      size="lg" 
                      variant="hero" 
                      className="group-hover:shadow-strong"
                      onClick={handleFeaturedDownloadClick}
                    >
                      Download Now <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Filters and Sorting */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              <Button
                variant={categoryFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setCategoryFilter("all")}
                className="gap-2"
              >
                <Filter className="w-4 h-4" />
                All Categories
              </Button>
              <Button
                variant={categoryFilter === "health" ? "default" : "outline"}
                size="sm"
                onClick={() => setCategoryFilter("health")}
                className="gap-2"
              >
                <Heart className="w-4 h-4" />
                Health
              </Button>
              <Button
                variant={categoryFilter === "wealth" ? "default" : "outline"}
                size="sm"
                onClick={() => setCategoryFilter("wealth")}
                className="gap-2"
              >
                <DollarSign className="w-4 h-4" />
                Wealth
              </Button>
              <Button
                variant={categoryFilter === "happiness" ? "default" : "outline"}
                size="sm"
                onClick={() => setCategoryFilter("happiness")}
                className="gap-2"
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

        {/* Regular Tips Grid */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-center text-foreground mb-8">
            {categoryFilter === "all" 
              ? "Additional Resources" 
              : `${categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)} Tips`}
            <span className="text-muted-foreground ml-2">({filteredAndSortedTips.length})</span>
          </h3>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {filteredAndSortedTips.map((tip, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-2 cursor-pointer relative overflow-hidden bg-card/80 backdrop-blur-sm"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <tip.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex gap-1">
                    <Badge className={getCategoryColor(tip.category)} variant="outline">
                      {tip.category}
                    </Badge>
                    <Badge className={getLevelColor(tip.level)}>
                      {tip.level}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-lg leading-snug group-hover:text-primary transition-colors">
                  {tip.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {emailCapture === index ? (
                  /* Email Capture Form */
                  <div className="space-y-4 animate-fade-in">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-foreground">Get Your Free Guide</h4>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={closeEmailCapture}
                        className="w-6 h-6 hover:bg-destructive/10 hover:text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <form onSubmit={(e) => handleEmailSubmit(e, tip.title)} className="space-y-3">
                      <div>
                        <Label htmlFor={`email-${index}`} className="text-xs">Email Address</Label>
                        <Input
                          id={`email-${index}`}
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          required
                          className="mt-1 text-sm"
                        />
                      </div>
                      <Button 
                        type="submit" 
                        variant="hero" 
                        size="sm" 
                        className="w-full"
                      >
                        Send Guide <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </form>
                    <p className="text-xs text-muted-foreground">
                      We'll email you the guide instantly. No spam, ever.
                    </p>
                  </div>
                ) : (
                  /* Original Content */
                  <>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {tip.description}
                    </p>
                    
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-foreground">What's Included:</p>
                      <ul className="space-y-1">
                        {tip.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="text-xs text-muted-foreground flex items-center">
                            <div className="w-1 h-1 bg-primary rounded-full mr-2"></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <span className="text-xs text-muted-foreground flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {tip.duration}
                      </span>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="text-primary hover:text-primary hover:bg-primary/10 group-hover:bg-primary/10"
                        onClick={() => handleDownloadClick(index)}
                      >
                        Download
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-hero text-white rounded-2xl p-12 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">
              Want More Exclusive Content?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Join our premium community for advanced strategies, personal coaching, 
              and exclusive resources not available anywhere else.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="accent" size="lg" asChild>
                <Link to="/partnership">Join Premium Community</Link>
              </Button>
              <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20" asChild>
                <Link to="/tips">Browse All Resources</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tips;
