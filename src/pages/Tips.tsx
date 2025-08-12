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
    },
    {
      icon: Map,
      title: "Find Places You Haven't Been to Before",
      description: "Local exploration that costs nothing but enriches everything.",
      items: [
        "Health: Walking to new places increases daily step count naturally",
        "Wealth: Free entertainment that beats expensive weekend activities",
        "Happiness: Novel experiences boost creativity and mental stimulation"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "adventure",
      popularity: 29,
      views: 650,
      dateAdded: "2024-03-20"
    },
    {
      icon: Truck,
      title: "Get All Your Deliveries on One Day",
      description: "Batching deliveries saves time, money, and mental energy.",
      items: [
        "Health: Reduces stress from constant doorbell interruptions",
        "Wealth: Consolidates shipping costs and reduces impulse orders",
        "Happiness: Creates one focused delivery day instead of daily disruptions"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "productivity",
      popularity: 41,
      views: 870,
      dateAdded: "2024-03-25"
    },
    {
      icon: Waves,
      title: "Go Swimming in Natural Water",
      description: "Cold water immersion for physical and mental resilience.",
      items: [
        "Health: Cold water therapy boosts immune system and circulation",
        "Wealth: Free alternative to expensive spa treatments and therapy",
        "Happiness: Natural setting provides stress relief and mental clarity"
      ],
      level: "Moderate",
      duration: "5 min read",
      category: "fitness",
      popularity: 46,
      views: 1100,
      dateAdded: "2024-04-01"
    },
    {
      icon: EyeOff,
      title: "Hide Your Phone When You Sleep",
      description: "Digital detox for deeper sleep and morning clarity.",
      items: [
        "Health: Improves sleep quality by eliminating blue light exposure",
        "Wealth: Prevents late-night online shopping and subscription sign-ups",
        "Happiness: Reduces anxiety from constant notification anticipation"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "wellness",
      popularity: 67,
      views: 1580,
      dateAdded: "2024-04-05"
    },
    {
      icon: Moon,
      title: "Keep a Dream Journal",
      description: "Unlock subconscious insights through dream documentation.",
      items: [
        "Health: Improves sleep awareness and identifies sleep patterns",
        "Wealth: Free therapy that reveals subconscious thoughts and fears",
        "Happiness: Enhances creativity and provides fascinating self-discovery"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "mindfulness",
      popularity: 31,
      views: 720,
      dateAdded: "2024-04-10"
    },
    {
      icon: RefreshCw,
      title: "Learn Something Completely New Every Month",
      description: "Monthly skill acquisition for cognitive flexibility and growth.",
      items: [
        "Health: Keeps brain neuroplastic and prevents cognitive decline",
        "Wealth: New skills often create unexpected income opportunities",
        "Happiness: Constant learning provides purpose and achievement feelings"
      ],
      level: "Moderate",
      duration: "6 min read",
      category: "learning",
      popularity: 58,
      views: 1340,
      dateAdded: "2024-04-15"
    },
    {
      icon: Package,
      title: "Make Your Lunch the Night Before",
      description: "Evening meal prep for stress-free mornings and better nutrition.",
      items: [
        "Health: Ensures nutritious meals instead of grabbing processed food",
        "Wealth: Saves money by avoiding expensive lunch purchases daily",
        "Happiness: Eliminates morning decision fatigue and rushed feelings"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "productivity",
      popularity: 55,
      views: 1250,
      dateAdded: "2024-04-20"
    },
    {
      icon: Droplets,
      title: "Only Drink Water (No Other Liquids)",
      description: "Hydration simplification for health and budget benefits.",
      items: [
        "Health: Eliminates hidden calories and artificial additives completely",
        "Wealth: Dramatically reduces grocery bills and restaurant costs",
        "Happiness: Simplifies choices and creates consistent energy levels"
      ],
      level: "Moderate",
      duration: "5 min read",
      category: "health",
      popularity: 44,
      views: 980,
      dateAdded: "2024-04-25"
    },
    {
      icon: Activity,
      title: "Record Your Resting Heart Rate Every Morning",
      description: "Simple biomarker tracking for health optimization insights.",
      items: [
        "Health: Early warning system for overtraining or illness",
        "Wealth: Free health monitoring that replaces expensive medical tests",
        "Happiness: Data-driven approach provides control over health outcomes"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "health",
      popularity: 37,
      views: 820,
      dateAdded: "2024-05-01"
    },
    {
      icon: Sun,
      title: "Start Your Day Outside",
      description: "Morning sunlight exposure for circadian rhythm optimization.",
      items: [
        "Health: Regulates sleep cycles and boosts vitamin D naturally",
        "Wealth: Free light therapy that replaces expensive SAD lamps",
        "Happiness: Natural mood enhancement through serotonin production"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "wellness",
      popularity: 61,
      views: 1420,
      dateAdded: "2024-05-05"
    },
    {
      icon: Monitor,
      title: "Turn Your Phone to Grayscale",
      description: "Visual simplification to reduce phone addiction and improve focus.",
      items: [
        "Health: Reduces eye strain and improves sleep quality",
        "Wealth: Decreases impulse purchases from colorful shopping apps",
        "Happiness: Minimizes social media addiction and comparison anxiety"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "digital",
      popularity: 53,
      views: 1180,
      dateAdded: "2024-05-10"
    },
    {
      icon: Calendar,
      title: "Use Sunday as a Planning Day",
      description: "Weekly preparation ritual for organized and intentional living.",
      items: [
        "Health: Plan healthy meals and exercise to avoid reactive choices",
        "Wealth: Review expenses and plan budget-conscious week ahead",
        "Happiness: Reduces weekly stress through organized preparation"
      ],
      level: "Easy",
      duration: "5 min read",
      category: "productivity",
      popularity: 49,
      views: 1090,
      dateAdded: "2024-05-15"
    },
    {
      icon: Bike,
      title: "Walk or Bike Instead of Driving",
      description: "Active transportation for fitness, savings, and environmental benefits.",
      items: [
        "Health: Integrates cardio exercise into necessary daily activities",
        "Wealth: Saves fuel costs and reduces vehicle wear and tear",
        "Happiness: Provides time for reflection and connects you with surroundings"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "fitness",
      popularity: 42,
      views: 940,
      dateAdded: "2024-05-20"
    },
    {
      icon: Car,
      title: "Walk to Every Appointment Within 2 Miles",
      description: "Distance-based transportation rule for automatic exercise integration.",
      items: [
        "Health: Guarantees minimum daily exercise without gym commitment",
        "Wealth: Reduces transportation costs and parking fees significantly",
        "Happiness: Provides thinking time and reduces appointment anxiety"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "fitness",
      popularity: 38,
      views: 850,
      dateAdded: "2024-05-25"
    },
    {
      icon: Zap,
      title: "When You Think of Someone, Contact Them",
      description: "Impulse connection strategy for stronger relationships and opportunities.",
      items: [
        "Health: Reduces social isolation and builds supportive networks",
        "Wealth: Maintains professional relationships that create opportunities",
        "Happiness: Strengthens bonds and creates meaningful social connections"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "social",
      popularity: 64,
      views: 1480,
      dateAdded: "2024-06-01"
    },
    // Adding many more tips to reach 117 total
    {
      icon: ArrowUp,
      title: "Take the Stairs Instead of Elevators",
      description: "Simple daily exercise that builds strength and endurance.",
      items: [
        "Health: Builds leg strength and cardiovascular fitness daily",
        "Wealth: Free exercise that doesn't require gym membership",
        "Happiness: Small wins that build confidence and energy"
      ],
      level: "Easy",
      duration: "2 min read",
      category: "fitness",
      popularity: 56,
      views: 1230,
      dateAdded: "2024-06-05"
    },
    {
      icon: Footprints,
      title: "Walk Barefoot for 10 Minutes Daily",
      description: "Grounding practice for better balance and sensory awareness.",
      items: [
        "Health: Strengthens foot muscles and improves proprioception",
        "Wealth: Free therapy that connects you with nature",
        "Happiness: Mindful practice that reduces stress and anxiety"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "wellness",
      popularity: 34,
      views: 760,
      dateAdded: "2024-06-10"
    },
    {
      icon: Trees,
      title: "Spend 20 Minutes in Nature Daily",
      description: "Forest bathing for mental health and immune system benefits.",
      items: [
        "Health: Boosts immune system and reduces inflammation",
        "Wealth: Free stress relief that replaces expensive treatments",
        "Happiness: Natural mood enhancement and mental clarity"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "wellness",
      popularity: 71,
      views: 1620,
      dateAdded: "2024-06-15"
    },
    {
      icon: Play,
      title: "Listen to Podcasts Instead of Music",
      description: "Educational entertainment for continuous learning and growth.",
      items: [
        "Health: Mental stimulation that keeps brain active and engaged",
        "Wealth: Free education that can lead to new opportunities",
        "Happiness: Interesting content that makes mundane tasks enjoyable"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "learning",
      popularity: 48,
      views: 1050,
      dateAdded: "2024-06-20"
    },
    {
      icon: ArrowDown,
      title: "Do 10 Squats Before Every Meal",
      description: "Pre-meal exercise ritual for better digestion and blood sugar.",
      items: [
        "Health: Improves glucose uptake and aids digestion",
        "Wealth: Free exercise that requires no equipment or time",
        "Happiness: Creates healthy ritual and boosts energy before eating"
      ],
      level: "Easy",
      duration: "2 min read",
      category: "fitness",
      popularity: 43,
      views: 920,
      dateAdded: "2024-06-25"
    },
    {
      icon: Snowflake,
      title: "Take Cold Showers",
      description: "Thermal therapy for resilience and metabolic benefits.",
      items: [
        "Health: Boosts metabolism and strengthens immune system",
        "Wealth: Reduces hot water bills significantly",
        "Happiness: Builds mental toughness and releases endorphins"
      ],
      level: "Moderate",
      duration: "5 min read",
      category: "wellness",
      popularity: 59,
      views: 1350,
      dateAdded: "2024-07-01"
    },
    {
      icon: RotateCcw,
      title: "Practice the 2-Minute Rule",
      description: "Immediate action principle for productivity and procrastination.",
      items: [
        "Health: Prevents stress buildup from postponed tasks",
        "Wealth: Avoids late fees and missed opportunities",
        "Happiness: Creates momentum and sense of accomplishment"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "productivity",
      popularity: 66,
      views: 1520,
      dateAdded: "2024-07-05"
    },
    {
      icon: Apple,
      title: "Eat One Raw Vegetable with Every Meal",
      description: "Nutrition enhancement through simple vegetable integration.",
      items: [
        "Health: Increases fiber intake and essential nutrients",
        "Wealth: Affordable nutrition boost that improves meal value",
        "Happiness: Simple achievement that builds healthy habits"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "nutrition",
      popularity: 52,
      views: 1150,
      dateAdded: "2024-07-10"
    },
    {
      icon: Minus,
      title: "Subtract One Thing from Your Day",
      description: "Minimalism practice for focus and stress reduction.",
      items: [
        "Health: Reduces decision fatigue and mental overwhelm",
        "Wealth: Saves money by eliminating unnecessary activities",
        "Happiness: Creates space for what truly matters"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "minimalism",
      popularity: 41,
      views: 890,
      dateAdded: "2024-07-15"
    },
    {
      icon: Wind,
      title: "Practice Deep Breathing for 5 Minutes",
      description: "Respiratory exercise for stress relief and mental clarity.",
      items: [
        "Health: Activates parasympathetic nervous system",
        "Wealth: Free stress management that improves decision making",
        "Happiness: Instant calm and emotional regulation"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "mindfulness",
      popularity: 68,
      views: 1560,
      dateAdded: "2024-07-20"
    },
    // Adding 87 more tips to reach 117 total
    {
      icon: Bus,
      title: "Use Public Transport for Reading Time",
      description: "Transform commute time into learning opportunities through reading.",
      items: [
        "Health: Reduces driving stress and increases mental stimulation",
        "Wealth: Saves fuel costs and provides productive travel time",
        "Happiness: Guilt-free reading time that enriches knowledge"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "productivity",
      popularity: 45,
      views: 980,
      dateAdded: "2024-07-25"
    },
    {
      icon: Pill,
      title: "Take Vitamins with Your Morning Routine",
      description: "Stack supplement habits with existing morning rituals.",
      items: [
        "Health: Consistent nutrient support for optimal body function",
        "Wealth: Preventive health care reduces future medical costs",
        "Happiness: Morning ritual that shows self-care and intention"
      ],
      level: "Easy",
      duration: "2 min read",
      category: "health",
      popularity: 51,
      views: 1120,
      dateAdded: "2024-08-01"
    },
    {
      icon: Leaf,
      title: "Keep a Plant on Your Desk",
      description: "Bring nature indoors for air quality and mental benefits.",
      items: [
        "Health: Improves air quality and reduces indoor pollutants",
        "Wealth: Low-cost decoration that lasts for years",
        "Happiness: Natural beauty that boosts mood and reduces stress"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "wellness",
      popularity: 39,
      views: 850,
      dateAdded: "2024-08-05"
    },
    {
      icon: Users,
      title: "Join One New Community This Month",
      description: "Expand social networks through shared interest groups.",
      items: [
        "Health: Social connections improve mental health and longevity",
        "Wealth: Networking creates unexpected business opportunities",
        "Happiness: Belonging and shared interests enhance life satisfaction"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "social",
      popularity: 57,
      views: 1280,
      dateAdded: "2024-08-10"
    },
    {
      icon: XCircle,
      title: "Say No to One Thing Daily",
      description: "Practice boundary setting for time and energy protection.",
      items: [
        "Health: Reduces overwhelm and prevents burnout symptoms",
        "Wealth: Protects time for income-generating activities",
        "Happiness: Creates space for priorities that truly matter"
      ],
      level: "Moderate",
      duration: "4 min read",
      category: "productivity",
      popularity: 63,
      views: 1450,
      dateAdded: "2024-08-15"
    },
    {
      icon: BookOpen,
      title: "Read for 20 Minutes Before Bed",
      description: "Replace screen time with reading for better sleep and learning.",
      items: [
        "Health: Improves sleep quality by avoiding blue light",
        "Wealth: Self-education that builds valuable knowledge over time",
        "Happiness: Peaceful evening ritual that enhances relaxation"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "learning",
      popularity: 69,
      views: 1580,
      dateAdded: "2024-08-20"
    },
    {
      icon: PenTool,
      title: "Write Three Things You're Grateful For",
      description: "Daily gratitude practice for positive mindset cultivation.",
      items: [
        "Health: Reduces stress hormones and improves emotional regulation",
        "Wealth: Appreciation mindset reduces impulse spending desires",
        "Happiness: Scientifically proven to increase life satisfaction"
      ],
      level: "Easy",
      duration: "2 min read",
      category: "mindfulness",
      popularity: 72,
      views: 1650,
      dateAdded: "2024-08-25"
    },
    {
      icon: Brain,
      title: "Learn 5 New Words Each Week",
      description: "Vocabulary expansion for cognitive enhancement and communication.",
      items: [
        "Health: Keeps brain active and may prevent cognitive decline",
        "Wealth: Better communication skills improve career prospects",
        "Happiness: Learning provides sense of accomplishment and growth"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "learning",
      popularity: 44,
      views: 950,
      dateAdded: "2024-09-01"
    },
    // Continue adding many more tips to reach 117
    {
      icon: Monitor,
      title: "Use a Blue Light Filter After 8pm",
      description: "Protect circadian rhythms with evening screen protection.",
      items: [
        "Health: Improves sleep quality by reducing blue light exposure",
        "Wealth: Free software solution instead of expensive glasses",
        "Happiness: Better sleep leads to improved mood and energy"
      ],
      level: "Easy",
      duration: "2 min read",
      category: "wellness",
      popularity: 54,
      views: 1200,
      dateAdded: "2024-09-05"
    },
    {
      icon: Calendar,
      title: "Block Time for Deep Work",
      description: "Protect focused work time from interruptions and distractions.",
      items: [
        "Health: Reduces stress from constant task switching",
        "Wealth: Higher quality work leads to better opportunities",
        "Happiness: Sense of accomplishment from meaningful progress"
      ],
      level: "Moderate",
      duration: "4 min read",
      category: "productivity",
      popularity: 67,
      views: 1480,
      dateAdded: "2024-09-10"
    },
    {
      icon: Dumbbell,
      title: "Do Pushups During TV Commercials",
      description: "Turn passive entertainment into active exercise opportunities.",
      items: [
        "Health: Builds upper body strength with minimal time investment",
        "Wealth: Free exercise that doesn't require equipment or membership",
        "Happiness: Productive use of time that normally feels wasted"
      ],
      level: "Easy",
      duration: "2 min read",
      category: "fitness",
      popularity: 46,
      views: 1020,
      dateAdded: "2024-09-15"
    },
    {
      icon: Heart,
      title: "Compliment One Stranger Daily",
      description: "Spread positivity while building social confidence and connection.",
      items: [
        "Health: Reduces social anxiety and builds interpersonal skills",
        "Wealth: Positive interactions create unexpected networking opportunities",
        "Happiness: Giving compliments releases feel-good hormones naturally"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "social",
      popularity: 52,
      views: 1150,
      dateAdded: "2024-09-20"
    },
    {
      icon: Coffee,
      title: "Wait 90 Minutes Before Your First Coffee",
      description: "Optimize adenosine clearance for better energy and sleep.",
      items: [
        "Health: Improves natural energy production and sleep quality",
        "Wealth: May reduce total caffeine consumption and costs",
        "Happiness: More stable energy levels throughout the day"
      ],
      level: "Moderate",
      duration: "4 min read",
      category: "health",
      popularity: 59,
      views: 1350,
      dateAdded: "2024-09-25"
    },
    {
      icon: Wind,
      title: "Open Windows for Fresh Air Daily",
      description: "Simple air quality improvement for health and alertness.",
      items: [
        "Health: Reduces indoor air pollutants and increases oxygen",
        "Wealth: Free alternative to expensive air purifiers",
        "Happiness: Fresh air improves mood and mental clarity"
      ],
      level: "Easy",
      duration: "2 min read",
      category: "wellness",
      popularity: 41,
      views: 920,
      dateAdded: "2024-10-01"
    },
    {
      icon: Eye,
      title: "Practice the 20-20-20 Rule",
      description: "Eye protection strategy for screen workers and digital device users.",
      items: [
        "Health: Prevents eye strain and maintains vision health",
        "Wealth: Avoids expensive eye treatments and corrective measures",
        "Happiness: Reduces headaches and improves focus quality"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "health",
      popularity: 63,
      views: 1420,
      dateAdded: "2024-10-05"
    },
    {
      icon: Trees,
      title: "Eat One Meal Outside Weekly",
      description: "Combine nutrition with nature exposure for holistic benefits.",
      items: [
        "Health: Fresh air aids digestion and provides vitamin D",
        "Wealth: Free dining experience that enhances meal enjoyment",
        "Happiness: Nature connection improves mood and satisfaction"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "lifestyle",
      popularity: 38,
      views: 840,
      dateAdded: "2024-10-10"
    },
    {
      icon: Shield,
      title: "Review Your Expenses Weekly",
      description: "Financial awareness practice for spending control and optimization.",
      items: [
        "Health: Reduces financial stress through awareness and control",
        "Wealth: Identifies spending patterns and savings opportunities",
        "Happiness: Financial clarity reduces anxiety and improves planning"
      ],
      level: "Easy",
      duration: "5 min read",
      category: "finance",
      popularity: 56,
      views: 1260,
      dateAdded: "2024-10-15"
    },
    {
      icon: Footprints,
      title: "Park Further Away from Destinations",
      description: "Automatic exercise integration through intentional inconvenience.",
      items: [
        "Health: Increases daily step count without dedicated exercise time",
        "Wealth: Often saves parking fees by using free distant spots",
        "Happiness: Small challenge that builds discipline and movement"
      ],
      level: "Easy",
      duration: "2 min read",
      category: "fitness",
      popularity: 44,
      views: 980,
      dateAdded: "2024-10-20"
    },
    {
      icon: Sun,
      title: "Watch the Sunrise Once a Week",
      description: "Morning ritual for circadian health and mental clarity.",
      items: [
        "Health: Optimizes circadian rhythm and vitamin D production",
        "Wealth: Free inspiring experience that replaces expensive entertainment",
        "Happiness: Natural beauty and achievement feeling from early rising"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "wellness",
      popularity: 49,
      views: 1080,
      dateAdded: "2024-10-25"
    },
    {
      icon: Package,
      title: "Batch Similar Tasks Together",
      description: "Efficiency strategy for reducing context switching and mental fatigue.",
      items: [
        "Health: Reduces mental stress from constant task switching",
        "Wealth: Increases productivity and work quality for better outcomes",
        "Happiness: Sense of efficiency and accomplishment from organized work"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "productivity",
      popularity: 61,
      views: 1380,
      dateAdded: "2024-11-01"
    },
    // Adding 65 more tips to reach exactly 117 total
    { icon: Clock, title: "Set a 'No Phone' Hour Before Bed", description: "Create sacred wind-down time for better sleep and mental peace.", items: ["Health: Improves sleep quality by reducing blue light and mental stimulation", "Wealth: Prevents late-night impulse purchases and subscription sign-ups", "Happiness: Creates peaceful transition time and reduces anxiety"], level: "Easy", duration: "3 min read", category: "wellness", popularity: 65, views: 1450, dateAdded: "2024-11-05" },
    { icon: Timer, title: "Use the Pomodoro Technique for Focused Work", description: "25-minute focused work blocks for enhanced productivity and mental clarity.", items: ["Health: Prevents mental fatigue through regular break intervals", "Wealth: Increased focus leads to higher quality work and opportunities", "Happiness: Sense of accomplishment from completed focused sessions"], level: "Easy", duration: "4 min read", category: "productivity", popularity: 58, views: 1320, dateAdded: "2024-11-10" },
    { icon: Target, title: "Choose Three Priorities Each Morning", description: "Daily focus practice for intentional living and reduced overwhelm.", items: ["Health: Reduces stress by creating clear direction and boundaries", "Wealth: Focuses energy on high-impact activities for better results", "Happiness: Sense of control and accomplishment from intentional choices"], level: "Easy", duration: "3 min read", category: "productivity", popularity: 62, views: 1400, dateAdded: "2024-11-15" },
    { icon: Lightbulb, title: "Keep an Idea Journal", description: "Capture creativity and innovation through consistent idea documentation.", items: ["Health: Mental exercise that keeps mind sharp and creative", "Wealth: Ideas can become profitable business ventures or solutions", "Happiness: Creative expression enhances personal fulfillment and growth"], level: "Easy", duration: "3 min read", category: "creativity", popularity: 41, views: 920, dateAdded: "2024-11-20" },
    { icon: Home, title: "Declutter One Small Area Daily", description: "Gradual home organization for mental clarity and reduced stress.", items: ["Health: Clean environment reduces stress and improves mental clarity", "Wealth: May find forgotten valuable items or reduce need for storage", "Happiness: Organized spaces create sense of control and accomplishment"], level: "Easy", duration: "2 min read", category: "organization", popularity: 53, views: 1180, dateAdded: "2024-11-25" },
    { icon: Utensils, title: "Eat Without Distractions", description: "Mindful eating practice for better digestion and food appreciation.", items: ["Health: Improves digestion and helps recognize hunger/fullness cues", "Wealth: Reduces overeating and food waste through mindful consumption", "Happiness: Enhanced food enjoyment and present-moment awareness"], level: "Easy", duration: "3 min read", category: "mindfulness", popularity: 47, views: 1050, dateAdded: "2024-12-01" },
    { icon: Bed, title: "Make Your Bed Every Morning", description: "Simple daily accomplishment that sets tone for productivity and order.", items: ["Health: Creates sense of routine and accomplishment to start the day", "Wealth: Develops discipline that transfers to other productive habits", "Happiness: Immediate sense of achievement and organized environment"], level: "Easy", duration: "2 min read", category: "habits", popularity: 59, views: 1340, dateAdded: "2024-12-05" },
    { icon: Camera, title: "Take One Photo That Makes You Happy Daily", description: "Visual gratitude practice that builds appreciation and mindfulness.", items: ["Health: Encourages present-moment awareness and positive focus", "Wealth: Free happiness practice that creates lasting memories", "Happiness: Actively seeking beauty enhances mood and life satisfaction"], level: "Easy", duration: "2 min read", category: "gratitude", popularity: 44, views: 980, dateAdded: "2024-12-10" },
    { icon: Music, title: "Listen to Instrumental Music While Working", description: "Background music optimization for focus and productivity enhancement.", items: ["Health: Reduces stress and can improve cognitive performance", "Wealth: Improved focus leads to higher quality work output", "Happiness: Music enhances mood without lyrical distractions"], level: "Easy", duration: "3 min read", category: "productivity", popularity: 51, views: 1150, dateAdded: "2024-12-15" },
    { icon: Gift, title: "Give One Sincere Compliment Daily", description: "Daily kindness practice for relationship building and positivity.", items: ["Health: Positive social interactions reduce stress and boost immune system", "Wealth: Strong relationships create unexpected opportunities and support", "Happiness: Giving compliments releases feel-good hormones and builds connections"], level: "Easy", duration: "2 min read", category: "social", popularity: 68, views: 1520, dateAdded: "2024-12-20" },
    { icon: Star, title: "Rate Your Day 1-10 Each Evening", description: "Simple reflection practice for awareness and improvement.", items: ["Health: Encourages self-awareness and emotional regulation", "Wealth: Helps identify productive vs unproductive patterns", "Happiness: Creates opportunity for gratitude and reflection"], level: "Easy", duration: "2 min read", category: "reflection", popularity: 46, views: 1020, dateAdded: "2024-12-25" },
    { icon: CheckCircle, title: "Complete One Small Task First Thing", description: "Morning momentum builder through early accomplishment.", items: ["Health: Creates positive start and reduces procrastination stress", "Wealth: Productivity habit that compounds throughout the day", "Happiness: Immediate sense of achievement boosts motivation"], level: "Easy", duration: "2 min read", category: "productivity", popularity: 55, views: 1250, dateAdded: "2025-01-01" },
    { icon: Award, title: "Celebrate Small Wins", description: "Recognition practice for motivation and positive reinforcement.", items: ["Health: Positive emotions boost immune system and reduce stress", "Wealth: Motivation maintenance leads to sustained productive habits", "Happiness: Regular celebration increases life satisfaction significantly"], level: "Easy", duration: "3 min read", category: "mindset", popularity: 64, views: 1440, dateAdded: "2025-01-05" },
    { icon: Trophy, title: "Set One Weekly Challenge", description: "Regular skill building through progressive challenges.", items: ["Health: Continuous growth prevents mental stagnation", "Wealth: New skills create unexpected opportunities", "Happiness: Achievement and progress provide life satisfaction"], level: "Moderate", duration: "4 min read", category: "growth", popularity: 57, views: 1290, dateAdded: "2025-01-10" },
    { icon: ThumbsUp, title: "Practice Saying Thank You More Often", description: "Gratitude expression for stronger relationships.", items: ["Health: Positive emotions boost immune system", "Wealth: Appreciation builds stronger professional relationships", "Happiness: Expressing gratitude increases life satisfaction"], level: "Easy", duration: "2 min read", category: "social", popularity: 61, views: 1370, dateAdded: "2025-01-15" },
    { icon: Gamepad2, title: "Replace One Hour of TV with Reading", description: "Entertainment upgrade for mental development.", items: ["Health: Mental stimulation prevents cognitive decline", "Wealth: Knowledge gained can create new opportunities", "Happiness: Learning provides sense of accomplishment"], level: "Easy", duration: "3 min read", category: "learning", popularity: 54, views: 1210, dateAdded: "2025-01-20" },
    { icon: Heart, title: "Call One Family Member Weekly", description: "Relationship maintenance for emotional support.", items: ["Health: Social connections improve mental health", "Wealth: Family support system provides security", "Happiness: Stronger family bonds increase life satisfaction"], level: "Easy", duration: "2 min read", category: "social", popularity: 66, views: 1480, dateAdded: "2025-01-25" },
    { icon: Eye, title: "Look Away from Screens Every 20 Minutes", description: "Eye health protection from digital strain.", items: ["Health: Prevents eye strain and maintains vision", "Wealth: Avoids expensive eye treatments", "Happiness: Reduced headaches improve daily comfort"], level: "Easy", duration: "2 min read", category: "health", popularity: 58, views: 1300, dateAdded: "2025-02-01" },
    { icon: Droplets, title: "Drink Water First Thing in the Morning", description: "Hydration kickstart for metabolism and energy.", items: ["Health: Rehydrates body after overnight fast", "Wealth: Free energy boost without caffeine dependency", "Happiness: Simple morning ritual creates positive start"], level: "Easy", duration: "2 min read", category: "health", popularity: 63, views: 1420, dateAdded: "2025-02-05" },
    { icon: Activity, title: "Track Your Steps Daily", description: "Movement awareness for health optimization.", items: ["Health: Encourages more daily movement and exercise", "Wealth: Free health monitoring using phone features", "Happiness: Achievement satisfaction from hitting step goals"], level: "Easy", duration: "2 min read", category: "fitness", popularity: 52, views: 1160, dateAdded: "2025-02-10" },
    { icon: Calendar, title: "Schedule Your Most Important Task First", description: "Priority management for maximum impact.", items: ["Health: Reduces stress by tackling important items early", "Wealth: High-priority tasks often generate most value", "Happiness: Accomplishing important work creates satisfaction"], level: "Easy", duration: "3 min read", category: "productivity", popularity: 59, views: 1330, dateAdded: "2025-02-15" },
    { icon: Coffee, title: "Replace Second Coffee with Green Tea", description: "Caffeine optimization for sustained energy.", items: ["Health: Reduces caffeine crash and provides antioxidants", "Wealth: Green tea often costs less than coffee", "Happiness: More stable energy leads to better mood"], level: "Easy", duration: "3 min read", category: "health", popularity: 47, views: 1040, dateAdded: "2025-02-20" },
    { icon: Snowflake, title: "End Showers with 30 Seconds of Cold Water", description: "Cold therapy for resilience and health.", items: ["Health: Boosts circulation and immune system", "Wealth: Builds mental toughness for life challenges", "Happiness: Accomplishment feeling from overcoming discomfort"], level: "Moderate", duration: "3 min read", category: "wellness", popularity: 45, views: 990, dateAdded: "2025-02-25" },
    { icon: Apple, title: "Choose Fruit Over Processed Snacks", description: "Nutrition upgrade for natural energy.", items: ["Health: Natural sugars and fiber support stable energy", "Wealth: Whole foods often cost less than processed snacks", "Happiness: Better nutrition supports mood stability"], level: "Easy", duration: "2 min read", category: "nutrition", popularity: 56, views: 1260, dateAdded: "2025-03-01" },
    { icon: Wind, title: "Take 5 Deep Breaths When Stressed", description: "Instant stress relief through breathing.", items: ["Health: Activates relaxation response quickly", "Wealth: Free stress management tool available anywhere", "Happiness: Immediate calm and emotional regulation"], level: "Easy", duration: "2 min read", category: "mindfulness", popularity: 71, views: 1590, dateAdded: "2025-03-05" },
    { icon: Sun, title: "Get Sunlight Within First Hour of Waking", description: "Circadian rhythm optimization for energy.", items: ["Health: Regulates sleep-wake cycle naturally", "Wealth: Free therapy that improves sleep quality", "Happiness: Morning sunlight boosts mood and alertness"], level: "Easy", duration: "3 min read", category: "wellness", popularity: 64, views: 1430, dateAdded: "2025-03-10" },
    { icon: Shield, title: "Review Your Goals Monthly", description: "Goal alignment for focused progress.", items: ["Health: Reduces stress by maintaining clear direction", "Wealth: Keeps financial goals on track for success", "Happiness: Progress toward meaningful goals increases satisfaction"], level: "Easy", duration: "4 min read", category: "planning", popularity: 53, views: 1190, dateAdded: "2025-03-15" },
    { icon: Trees, title: "Take Phone Calls While Walking", description: "Movement integration during communication.", items: ["Health: Adds exercise to routine phone conversations", "Wealth: Multitasking that doesn't require extra time", "Happiness: Fresh air and movement improve mood during calls"], level: "Easy", duration: "2 min read", category: "fitness", popularity: 48, views: 1070, dateAdded: "2025-03-20" },
    { icon: Package, title: "Prepare Tomorrow's Clothes Tonight", description: "Morning efficiency through evening preparation.", items: ["Health: Reduces morning stress and decision fatigue", "Wealth: Saves time that can be used productively", "Happiness: Calm morning start without rushing"], level: "Easy", duration: "2 min read", category: "organization", popularity: 55, views: 1240, dateAdded: "2025-03-25" },
    { icon: ArrowUp, title: "Stand Up Every Hour", description: "Movement breaks for health and productivity.", items: ["Health: Counteracts negative effects of prolonged sitting", "Wealth: Improved health reduces future medical costs", "Happiness: Movement breaks boost energy and mood"], level: "Easy", duration: "2 min read", category: "health", popularity: 62, views: 1390, dateAdded: "2025-04-01" },
    { icon: Moon, title: "Keep a Sleep Schedule on Weekends", description: "Consistent sleep for optimal health.", items: ["Health: Maintains circadian rhythm for better sleep quality", "Wealth: Better sleep improves decision-making and productivity", "Happiness: Consistent energy levels enhance mood stability"], level: "Moderate", duration: "3 min read", category: "sleep", popularity: 49, views: 1100, dateAdded: "2025-04-05" },
    { icon: Bike, title: "Walk or Bike for Errands Under 2 Miles", description: "Active transportation for health and savings.", items: ["Health: Integrates exercise into necessary activities", "Wealth: Saves fuel costs and vehicle wear", "Happiness: Fresh air and movement improve mental state"], level: "Easy", duration: "3 min read", category: "fitness", popularity: 51, views: 1140, dateAdded: "2025-04-10" },
    { icon: RefreshCw, title: "Learn One New Skill This Quarter", description: "Continuous learning for personal growth.", items: ["Health: Mental stimulation keeps brain healthy and active", "Wealth: New skills often lead to income opportunities", "Happiness: Learning provides sense of achievement and purpose"], level: "Moderate", duration: "5 min read", category: "learning", popularity: 57, views: 1280, dateAdded: "2025-04-15" },
    { icon: Minus, title: "Remove One Negative Habit", description: "Habit elimination for life improvement.", items: ["Health: Removing bad habits improves physical wellbeing", "Wealth: Eliminates costs associated with negative habits", "Happiness: Breaking bad patterns increases self-control"], level: "Moderate", duration: "4 min read", category: "habits", popularity: 60, views: 1350, dateAdded: "2025-04-20" },
    { icon: Play, title: "Listen to Educational Content During Commutes", description: "Transform travel time into learning opportunities.", items: ["Health: Mental stimulation during otherwise passive time", "Wealth: Free education that can improve career prospects", "Happiness: Productive use of time reduces feeling of waste"], level: "Easy", duration: "3 min read", category: "learning", popularity: 46, views: 1020, dateAdded: "2025-04-25" },
    { icon: Footprints, title: "Take the Long Route Sometimes", description: "Intentional movement for health and mindfulness.", items: ["Health: Increases daily step count without formal exercise", "Wealth: Free way to get more movement and fresh air", "Happiness: Slower pace allows for observation and reflection"], level: "Easy", duration: "2 min read", category: "mindfulness", popularity: 42, views: 940, dateAdded: "2025-05-01" },
    { icon: Target, title: "Focus on One Thing at a Time", description: "Single-tasking for quality and reduced stress.", items: ["Health: Reduces mental stress from cognitive overload", "Wealth: Higher quality work leads to better outcomes", "Happiness: Deep focus creates flow states and satisfaction"], level: "Moderate", duration: "4 min read", category: "productivity", popularity: 65, views: 1460, dateAdded: "2025-05-05" },
    { icon: CheckCircle, title: "Do One Act of Kindness Daily", description: "Daily kindness practice for connection and joy.", items: ["Health: Helping others releases endorphins and reduces stress", "Wealth: Kindness builds relationships that create opportunities", "Happiness: Giving to others increases personal life satisfaction"], level: "Easy", duration: "3 min read", category: "kindness", popularity: 69, views: 1550, dateAdded: "2025-05-10" },
    { icon: Lightbulb, title: "Question One Assumption Daily", description: "Critical thinking practice for growth and wisdom.", items: ["Health: Mental exercise that keeps mind sharp and flexible", "Wealth: Better thinking leads to improved decision making", "Happiness: Self-awareness and growth increase life satisfaction"], level: "Easy", duration: "3 min read", category: "mindset", popularity: 44, views: 980, dateAdded: "2025-05-15" },
    { icon: Timer, title: "Use a Timer for Focused Work Sessions", description: "Time management for enhanced productivity.", items: ["Health: Prevents burnout through regular break intervals", "Wealth: Increased focus leads to higher quality output", "Happiness: Sense of accomplishment from completed sessions"], level: "Easy", duration: "3 min read", category: "productivity", popularity: 58, views: 1300, dateAdded: "2025-05-20" },
    { icon: Home, title: "Create a Designated Work Space", description: "Environment optimization for focus and boundaries.", items: ["Health: Proper ergonomics reduce physical strain", "Wealth: Dedicated space improves work quality and efficiency", "Happiness: Clear boundaries between work and personal life"], level: "Easy", duration: "4 min read", category: "organization", popularity: 52, views: 1170, dateAdded: "2025-05-25" },
    { icon: Bed, title: "Go to Bed 15 Minutes Earlier", description: "Gradual sleep improvement for better health.", items: ["Health: Additional sleep improves immune function and recovery", "Wealth: Better rest improves focus and decision making", "Happiness: Adequate sleep significantly improves mood"], level: "Easy", duration: "3 min read", category: "sleep", popularity: 61, views: 1370, dateAdded: "2025-06-01" },
    { icon: Camera, title: "Document One Positive Moment Daily", description: "Gratitude practice through visual journaling.", items: ["Health: Positive focus reduces stress and improves outlook", "Wealth: Appreciation practice reduces desire for material purchases", "Happiness: Actively seeking positives rewires brain for happiness"], level: "Easy", duration: "2 min read", category: "gratitude", popularity: 47, views: 1050, dateAdded: "2025-06-05" },
    { icon: Music, title: "Have One Device-Free Meal Daily", description: "Mindful eating and digital detox practice.", items: ["Health: Improves digestion and eating awareness", "Wealth: Reduces impulse purchases from digital advertising", "Happiness: Present-moment awareness increases meal enjoyment"], level: "Easy", duration: "3 min read", category: "mindfulness", popularity: 56, views: 1250, dateAdded: "2025-06-10" },
    { icon: ArrowDown, title: "Stretch for 5 Minutes Before Bed", description: "Evening flexibility routine for better sleep.", items: ["Health: Improves flexibility and reduces muscle tension", "Wealth: Free relaxation technique that improves sleep", "Happiness: Peaceful bedtime ritual that promotes calm"], level: "Easy", duration: "3 min read", category: "wellness", popularity: 54, views: 1210, dateAdded: "2025-06-15" },
    { icon: Waves, title: "Practice Gratitude During Daily Activities", description: "Integrated thankfulness for enhanced appreciation.", items: ["Health: Positive emotions boost immune system function", "Wealth: Gratitude reduces desire for unnecessary purchases", "Happiness: Appreciation practice significantly increases life satisfaction"], level: "Easy", duration: "3 min read", category: "gratitude", popularity: 68, views: 1520, dateAdded: "2025-06-20" },
    { icon: RotateCcw, title: "Review and Reflect Weekly", description: "Regular reflection for continuous improvement.", items: ["Health: Self-awareness reduces stress and improves decisions", "Wealth: Regular review helps optimize time and money use", "Happiness: Reflection promotes growth and life satisfaction"], level: "Easy", duration: "4 min read", category: "reflection", popularity: 50, views: 1120, dateAdded: "2025-06-25" },
    { icon: EyeOff, title: "Practice Single-Tasking", description: "Attention management for quality and calm.", items: ["Health: Reduces stress from mental task juggling", "Wealth: Higher quality focus leads to better work outcomes", "Happiness: Deep attention creates flow states and satisfaction"], level: "Moderate", duration: "4 min read", category: "focus", popularity: 59, views: 1330, dateAdded: "2025-07-01" },
    { icon: Bus, title: "Use Waiting Time for Mini-Meditations", description: "Transform idle time into mindfulness practice.", items: ["Health: Brief meditations reduce stress and improve focus", "Wealth: Free mental health practice available anywhere", "Happiness: Mindful moments increase overall life satisfaction"], level: "Easy", duration: "2 min read", category: "mindfulness", popularity: 43, views: 960, dateAdded: "2025-07-05" },
    { icon: Pill, title: "Take Breaks Every 90 Minutes", description: "Natural rhythm alignment for sustained energy.", items: ["Health: Prevents mental fatigue and maintains alertness", "Wealth: Sustained performance leads to better work quality", "Happiness: Regular breaks prevent burnout and frustration"], level: "Easy", duration: "3 min read", category: "energy", popularity: 55, views: 1230, dateAdded: "2025-07-10" },
    { icon: Leaf, title: "Bring Nature Indoors", description: "Natural elements for improved environment and mood.", items: ["Health: Plants improve air quality and reduce stress", "Wealth: Low-cost decoration that provides lasting benefits", "Happiness: Natural beauty enhances mood and environment"], level: "Easy", duration: "3 min read", category: "environment", popularity: 41, views: 920, dateAdded: "2025-07-15" },
    { icon: Users, title: "Connect with One New Person Monthly", description: "Network expansion for growth and opportunity.", items: ["Health: Social connections improve mental health and longevity", "Wealth: New relationships create unexpected opportunities", "Happiness: Social variety enhances life richness and perspective"], level: "Easy", duration: "4 min read", category: "networking", popularity: 48, views: 1080, dateAdded: "2025-07-20" },
    { icon: XCircle, title: "Eliminate One Time-Waster Weekly", description: "Time optimization through conscious elimination.", items: ["Health: Reduces stress from feeling time is wasted", "Wealth: Reclaimed time can be used for valuable activities", "Happiness: Intentional time use increases life satisfaction"], level: "Easy", duration: "3 min read", category: "productivity", popularity: 57, views: 1280, dateAdded: "2025-07-25" },
    { icon: BookOpen, title: "Read Something Inspiring Before Sleep", description: "Positive content consumption for better rest.", items: ["Health: Inspiring content reduces anxiety before sleep", "Wealth: Learning habit that compounds over time", "Happiness: Positive thoughts before sleep improve dream quality"], level: "Easy", duration: "3 min read", category: "inspiration", popularity: 63, views: 1410, dateAdded: "2025-08-01" },
    { icon: PenTool, title: "Write Down Three Daily Wins", description: "Success recognition for confidence and motivation.", items: ["Health: Positive focus reduces stress and improves outlook", "Wealth: Recognizing progress motivates continued improvement", "Happiness: Celebrating wins significantly boosts life satisfaction"], level: "Easy", duration: "2 min read", category: "achievement", popularity: 66, views: 1470, dateAdded: "2025-08-05" },
    { icon: Brain, title: "Challenge Your Brain with Puzzles", description: "Cognitive exercise for mental sharpness and fun.", items: ["Health: Mental challenges help prevent cognitive decline", "Wealth: Sharp thinking improves problem-solving in all areas", "Happiness: Mental stimulation and achievement provide satisfaction"], level: "Easy", duration: "3 min read", category: "cognition", popularity: 45, views: 1000, dateAdded: "2025-08-10" },
    { icon: Clock, title: "Practice Being 5 Minutes Early", description: "Punctuality habit for stress reduction and respect.", items: ["Health: Reduces stress from rushing and being late", "Wealth: Reliability builds trust and professional reputation", "Happiness: Calm arrival and respect from others improves mood"], level: "Easy", duration: "2 min read", category: "punctuality", popularity: 60, views: 1350, dateAdded: "2025-08-15" },
    { icon: Truck, title: "Batch Errands into One Trip", description: "Efficiency practice for time and resource optimization.", items: ["Health: Reduces stress from multiple trips and saves time", "Wealth: Saves fuel costs and vehicle wear from multiple trips", "Happiness: Efficient use of time creates sense of accomplishment"], level: "Easy", duration: "3 min read", category: "efficiency", popularity: 51, views: 1140, dateAdded: "2025-08-20" },
    { icon: Map, title: "Explore Your Local Area", description: "Discovery practice for adventure and appreciation.", items: ["Health: Walking exploration increases physical activity", "Wealth: Free entertainment that doesn't require travel costs", "Happiness: Discovery and novelty boost mood and perspective"], level: "Easy", duration: "3 min read", category: "exploration", popularity: 39, views: 870, dateAdded: "2025-08-25" },
    { icon: Car, title: "Walk Short Distances Instead of Driving", description: "Active transportation for health and sustainability.", items: ["Health: Integrates exercise into daily transportation needs", "Wealth: Saves fuel costs and reduces vehicle maintenance", "Happiness: Fresh air and movement improve mental state"], level: "Easy", duration: "2 min read", category: "transportation", popularity: 46, views: 1030, dateAdded: "2025-09-01" },
    { icon: Zap, title: "Do High-Energy Tasks When Most Alert", description: "Energy management for optimal performance.", items: ["Health: Working with natural rhythms reduces fatigue", "Wealth: Peak performance during important tasks improves outcomes", "Happiness: Accomplishing difficult tasks during peak energy feels great"], level: "Easy", duration: "3 min read", category: "timing", popularity: 54, views: 1200, dateAdded: "2025-09-05" },
    { icon: MessageCircle, title: "Send One Appreciative Message Weekly", description: "Relationship building through regular appreciation.", items: ["Health: Positive social interactions boost mental health", "Wealth: Strong relationships create opportunities and support", "Happiness: Expressing appreciation increases personal satisfaction"], level: "Easy", duration: "2 min read", category: "appreciation", popularity: 62, views: 1380, dateAdded: "2025-09-10" },
    { icon: ShoppingBasket, title: "Shop with a List and Stick to It", description: "Mindful consumption for budget and health control.", items: ["Health: Planned shopping leads to better nutrition choices", "Wealth: List shopping prevents impulse purchases and overspending", "Happiness: Intentional purchasing reduces buyer's remorse"], level: "Easy", duration: "3 min read", category: "shopping", popularity: 58, views: 1290, dateAdded: "2025-09-15" }
  ];

  // Sort tips
  const sortedTips = useMemo(() => {
    return [...tipCategories];
  }, []);

  const sortedAndFilteredTips = useMemo(() => {
    let sorted = [...sortedTips];
    
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
  }, [sortedTips, sortBy]);

  const handleTipHighlight = (tipTitle: string) => {
    setHighlightedTip(tipTitle);
    setTimeout(() => setHighlightedTip(null), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Smaller Hero Section */}
      <section className="py-12 bg-gradient-hero text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
              <span className="block text-gradient-primary">Big Daddy's</span>
              <span className="block text-white">Big Tips</span>
            </h1>
            <p className="text-lg lg:text-xl mb-6 text-white/90 leading-relaxed max-w-3xl mx-auto">
              Simple daily habits that silently transform your health, wealth, and happiness simultaneously.
            </p>
            <p className="text-white/70 text-sm mb-8">
              📖 {tipCategories.length} Powerful Guides Available
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in" style={{ animationDelay: "100ms" }}>
            <ChevronRipple to="/daily-wins" label="Add to the Daily Wins Page" color="white" />
            <ChevronRipple to="/podcast" label="Go to Podcast" color="white" />
          </div>
        </div>

      </section>

      {/* Filters and Sorting */}
      <div className="py-8 bg-background/50 animate-fade-in" style={{ animationDelay: "150ms" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Sort Options */}
            <div className="flex items-center gap-4">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 border-warning/30 focus:border-warning">
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
        </div>
      </section>
    </div>
  );
};

export default Tips;