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
        "Wealth: Free education that builds valuable skills and knowledge",
        "Happiness: Inspiring content that motivates and uplifts mood"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "learning",
      popularity: 40,
      views: 890,
      dateAdded: "2024-06-20"
    },
    {
      icon: ArrowDown,
      title: "Practice Deep Breathing Every Hour",
      description: "Hourly stress reset for better focus and emotional regulation.",
      items: [
        "Health: Activates parasympathetic nervous system for stress relief",
        "Wealth: Free anxiety management that improves decision making",
        "Happiness: Instant mood regulation and mental clarity boost"
      ],
      level: "Easy",
      duration: "2 min read",
      category: "wellness",
      popularity: 48,
      views: 1070,
      dateAdded: "2024-06-25"
    },
    {
      icon: Snowflake,
      title: "Take Cold Showers",
      description: "Cold therapy for resilience, metabolism, and mental toughness.",
      items: [
        "Health: Boosts metabolism and strengthens immune system",
        "Wealth: Reduces hot water costs and builds mental discipline",
        "Happiness: Releases endorphins and builds confidence through challenges"
      ],
      level: "Moderate",
      duration: "5 min read",
      category: "health",
      popularity: 55,
      views: 1260,
      dateAdded: "2024-07-01"
    },
    {
      icon: RotateCcw,
      title: "Implement the 2-Minute Rule",
      description: "Immediate action strategy for productivity and reduced overwhelm.",
      items: [
        "Health: Reduces stress by preventing task accumulation",
        "Wealth: Improves time management leading to better opportunities",
        "Happiness: Creates momentum and sense of accomplishment"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "productivity",
      popularity: 62,
      views: 1390,
      dateAdded: "2024-07-05"
    },
    {
      icon: Apple,
      title: "Eat Only Whole Foods for 30 Days",
      description: "Nutritional reset that transforms health and relationship with food.",
      items: [
        "Health: Eliminates processed foods and improves nutrient absorption",
        "Wealth: Reduces food costs by avoiding expensive packaged products",
        "Happiness: Increases energy levels and mental clarity significantly"
      ],
      level: "Moderate",
      duration: "7 min read",
      category: "health",
      popularity: 68,
      views: 1540,
      dateAdded: "2024-07-10"
    },
    {
      icon: Minus,
      title: "Practice Minimalism in One Area",
      description: "Intentional reduction for clarity, savings, and peace of mind.",
      items: [
        "Health: Reduces stress from clutter and decision fatigue",
        "Wealth: Prevents unnecessary purchases and increases savings",
        "Happiness: Creates calm environment and mental clarity"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "lifestyle",
      popularity: 43,
      views: 970,
      dateAdded: "2024-07-15"
    },
    {
      icon: Wind,
      title: "Do Box Breathing for 5 Minutes",
      description: "Military breathing technique for stress management and focus.",
      items: [
        "Health: Regulates nervous system and reduces cortisol levels",
        "Wealth: Free stress management that improves work performance",
        "Happiness: Instant calm and emotional regulation technique"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "wellness",
      popularity: 51,
      views: 1150,
      dateAdded: "2024-07-20"
    },
    {
      icon: Bus,
      title: "Use Public Transport Instead of Driving",
      description: "Sustainable transportation that saves money and provides thinking time.",
      items: [
        "Health: Increases daily walking and reduces driving stress",
        "Wealth: Dramatically reduces transportation and parking costs",
        "Happiness: Provides time for reading, planning, or meditation"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "lifestyle",
      popularity: 36,
      views: 810,
      dateAdded: "2024-07-25"
    },
    {
      icon: Pill,
      title: "Take Vitamin D3 Daily",
      description: "Essential supplementation for immune system and mood support.",
      items: [
        "Health: Supports immune function and bone health significantly",
        "Wealth: Inexpensive supplement that prevents costly health issues",
        "Happiness: Improves mood and reduces symptoms of depression"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "health",
      popularity: 59,
      views: 1320,
      dateAdded: "2024-08-01"
    },
    {
      icon: Leaf,
      title: "Grow Your Own Herbs",
      description: "Simple indoor gardening for fresh ingredients and mindfulness.",
      items: [
        "Health: Fresh herbs provide nutrients and medicinal benefits",
        "Wealth: Reduces grocery costs and provides sustainable food source",
        "Happiness: Connects you with nature and provides sense of accomplishment"
      ],
      level: "Easy",
      duration: "5 min read",
      category: "lifestyle",
      popularity: 39,
      views: 870,
      dateAdded: "2024-08-05"
    },
    {
      icon: Users,
      title: "Join a Local Community Group",
      description: "Social connection strategy for networking and personal growth.",
      items: [
        "Health: Reduces loneliness and provides social support system",
        "Wealth: Creates networking opportunities and potential partnerships",
        "Happiness: Builds meaningful relationships and sense of belonging"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "social",
      popularity: 45,
      views: 1010,
      dateAdded: "2024-08-10"
    },
    {
      icon: XCircle,
      title: "Eliminate One Bad Habit",
      description: "Strategic habit removal for immediate life improvement.",
      items: [
        "Health: Removes harmful behaviors that damage physical wellbeing",
        "Wealth: Stops money drain from destructive habits",
        "Happiness: Increases self-control and personal satisfaction"
      ],
      level: "Moderate",
      duration: "6 min read",
      category: "wellness",
      popularity: 73,
      views: 1680,
      dateAdded: "2024-08-15"
    },
    {
      icon: BookOpen,
      title: "Read for 30 Minutes Before Bed",
      description: "Evening reading ritual for better sleep and continuous learning.",
      items: [
        "Health: Improves sleep quality by replacing screen time",
        "Wealth: Builds knowledge that creates career opportunities",
        "Happiness: Provides mental escape and personal enrichment"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "learning",
      popularity: 66,
      views: 1480,
      dateAdded: "2024-08-20"
    },
    {
      icon: PenTool,
      title: "Write Three Things You're Grateful For",
      description: "Daily gratitude practice for improved mood and perspective.",
      items: [
        "Health: Reduces stress hormones and improves mental health",
        "Wealth: Increases appreciation for what you have",
        "Happiness: Rewires brain for positivity and life satisfaction"
      ],
      level: "Easy",
      duration: "2 min read",
      category: "mindfulness",
      popularity: 70,
      views: 1590,
      dateAdded: "2024-08-25"
    },
    {
      icon: Brain,
      title: "Learn a New Word Every Day",
      description: "Vocabulary expansion for better communication and cognitive function.",
      items: [
        "Health: Keeps brain active and prevents cognitive decline",
        "Wealth: Improves communication skills for career advancement",
        "Happiness: Provides sense of daily accomplishment and growth"
      ],
      level: "Easy",
      duration: "2 min read",
      category: "learning",
      popularity: 41,
      views: 920,
      dateAdded: "2024-09-01"
    },
    {
      icon: Clock,
      title: "Practice Time Blocking",
      description: "Structured scheduling for maximum productivity and focus.",
      items: [
        "Health: Reduces stress by providing clear daily structure",
        "Wealth: Maximizes productive time leading to better results",
        "Happiness: Creates work-life balance and reduces overwhelm"
      ],
      level: "Moderate",
      duration: "5 min read",
      category: "productivity",
      popularity: 57,
      views: 1290,
      dateAdded: "2024-09-05"
    },
    {
      icon: Timer,
      title: "Use the Pomodoro Technique",
      description: "Focused work intervals with breaks for sustained productivity.",
      items: [
        "Health: Prevents mental fatigue and eye strain from long work sessions",
        "Wealth: Increases work efficiency and quality of output",
        "Happiness: Reduces work stress and provides sense of progress"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "productivity",
      popularity: 54,
      views: 1220,
      dateAdded: "2024-09-10"
    },
    {
      icon: Target,
      title: "Set Three Daily Priorities",
      description: "Focus strategy that prevents overwhelm and ensures progress.",
      items: [
        "Health: Reduces stress by providing clear daily direction",
        "Wealth: Ensures important money-making tasks get completed",
        "Happiness: Creates sense of accomplishment and progress"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "productivity",
      popularity: 60,
      views: 1350,
      dateAdded: "2024-09-15"
    },
    {
      icon: Lightbulb,
      title: "Spend 10 Minutes Brainstorming Daily",
      description: "Creative thinking time for problem-solving and innovation.",
      items: [
        "Health: Stimulates brain function and prevents mental stagnation",
        "Wealth: Generates ideas for income opportunities and solutions",
        "Happiness: Provides creative outlet and mental stimulation"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "creativity",
      popularity: 42,
      views: 950,
      dateAdded: "2024-09-20"
    },
    {
      icon: Home,
      title: "Create a Morning Routine",
      description: "Structured start to the day for consistency and momentum.",
      items: [
        "Health: Establishes healthy habits and reduces morning stress",
        "Wealth: Creates productive mindset that improves work performance",
        "Happiness: Provides sense of control and positive daily start"
      ],
      level: "Moderate",
      duration: "6 min read",
      category: "productivity",
      popularity: 75,
      views: 1720,
      dateAdded: "2024-09-25"
    },
    {
      icon: Utensils,
      title: "Eat Slowly and Mindfully",
      description: "Mindful eating practice for better digestion and satisfaction.",
      items: [
        "Health: Improves digestion and helps maintain healthy weight",
        "Wealth: Reduces food waste by eating appropriate portions",
        "Happiness: Increases meal satisfaction and mindful awareness"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "wellness",
      popularity: 47,
      views: 1060,
      dateAdded: "2024-10-01"
    },
    {
      icon: Bed,
      title: "Establish a Consistent Sleep Schedule",
      description: "Regular sleep timing for better rest and daily energy.",
      items: [
        "Health: Regulates circadian rhythm and improves sleep quality",
        "Wealth: Better rest leads to improved work performance",
        "Happiness: Consistent energy levels and improved mood"
      ],
      level: "Easy",
      duration: "5 min read",
      category: "wellness",
      popularity: 69,
      views: 1560,
      dateAdded: "2024-10-05"
    },
    {
      icon: Camera,
      title: "Take One Photo of Something Beautiful Daily",
      description: "Daily beauty practice for mindfulness and gratitude.",
      items: [
        "Health: Encourages outdoor time and mindful observation",
        "Wealth: Free entertainment that replaces expensive hobbies",
        "Happiness: Trains brain to notice beauty and positive aspects"
      ],
      level: "Easy",
      duration: "2 min read",
      category: "mindfulness",
      popularity: 38,
      views: 850,
      dateAdded: "2024-10-10"
    },
    {
      icon: Music,
      title: "Listen to Classical Music While Working",
      description: "Background music for improved focus and stress reduction.",
      items: [
        "Health: Reduces stress hormones and lowers blood pressure",
        "Wealth: Improves focus leading to better work quality",
        "Happiness: Elevates mood and creates pleasant work environment"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "productivity",
      popularity: 44,
      views: 990,
      dateAdded: "2024-10-15"
    },
    {
      icon: Gift,
      title: "Do One Random Act of Kindness",
      description: "Daily kindness practice for community building and happiness.",
      items: [
        "Health: Releases endorphins and reduces stress levels",
        "Wealth: Builds social capital and strengthens community connections",
        "Happiness: Creates positive feedback loop and sense of purpose"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "social",
      popularity: 65,
      views: 1460,
      dateAdded: "2024-10-20"
    },
    {
      icon: Star,
      title: "Review Your Goals Weekly",
      description: "Regular goal assessment for maintained focus and progress.",
      items: [
        "Health: Keeps health goals visible and maintains motivation",
        "Wealth: Ensures financial goals stay on track",
        "Happiness: Provides sense of direction and accomplishment"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "productivity",
      popularity: 58,
      views: 1310,
      dateAdded: "2024-10-25"
    },
    {
      icon: Gamepad2,
      title: "Limit Screen Time to 2 Hours Daily",
      description: "Digital wellness boundary for better health and productivity.",
      items: [
        "Health: Reduces eye strain and improves sleep quality",
        "Wealth: Frees up time for income-generating activities",
        "Happiness: Increases real-world social interaction and activities"
      ],
      level: "Moderate",
      duration: "5 min read",
      category: "digital",
      popularity: 52,
      views: 1170,
      dateAdded: "2024-11-01"
    },
    {
      icon: ThumbsUp,
      title: "Compliment Someone Genuinely Daily",
      description: "Positive interaction practice for better relationships.",
      items: [
        "Health: Reduces social anxiety and builds confidence",
        "Wealth: Strengthens professional and personal networks",
        "Happiness: Creates positive social interactions and goodwill"
      ],
      level: "Easy",
      duration: "2 min read",
      category: "social",
      popularity: 46,
      views: 1030,
      dateAdded: "2024-11-05"
    },
    {
      icon: CheckCircle,
      title: "Complete Your Most Important Task First",
      description: "Priority execution strategy for maximum daily impact.",
      items: [
        "Health: Reduces stress by handling important matters early",
        "Wealth: Ensures critical money-making tasks get completed",
        "Happiness: Creates momentum and sense of accomplishment"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "productivity",
      popularity: 63,
      views: 1420,
      dateAdded: "2024-11-10"
    },
    {
      icon: Award,
      title: "Celebrate Small Wins Daily",
      description: "Recognition practice for maintained motivation and positive mindset.",
      items: [
        "Health: Releases dopamine and reinforces healthy behaviors",
        "Wealth: Maintains motivation for long-term financial goals",
        "Happiness: Builds positive self-image and confidence"
      ],
      level: "Easy",
      duration: "2 min read",
      category: "mindfulness",
      popularity: 67,
      views: 1510,
      dateAdded: "2024-11-15"
    },
    {
      icon: Trophy,
      title: "Track One Metric That Matters",
      description: "Single-focus measurement for clear progress and motivation.",
      items: [
        "Health: Provides clear feedback on health improvement efforts",
        "Wealth: Tracks financial progress with concrete numbers",
        "Happiness: Shows tangible progress toward meaningful goals"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "productivity",
      popularity: 56,
      views: 1260,
      dateAdded: "2024-11-20"
    },
    {
      icon: Shield,
      title: "Create Weekly Financial Check-ins",
      description: "Schedule regular money meetings with yourself for financial awareness.",
      items: [
        "Health: Reduces financial stress that impacts physical wellbeing",
        "Wealth: Catches overspending early before it becomes problematic",
        "Happiness: Creates sense of control and financial confidence"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "finance",
      popularity: 54,
      views: 1210,
      dateAdded: "2024-11-21"
    },
    {
      icon: Wind,
      title: "Practice Deep Breathing for 2 Minutes Daily",
      description: "Simple breathwork for stress reduction and mental clarity.",
      items: [
        "Health: Activates parasympathetic nervous system reducing stress",
        "Wealth: Free stress management technique replacing expensive therapy",
        "Happiness: Immediate mood improvement through increased oxygen flow"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "wellness",
      popularity: 67,
      views: 1540,
      dateAdded: "2024-11-22"
    },
    {
      icon: Lightbulb,
      title: "Write Down 3 Ideas Every Day",
      description: "Daily creativity practice to strengthen your innovation muscle.",
      items: [
        "Health: Keeps mind active and prevents cognitive decline",
        "Wealth: Ideas can become income streams or cost-saving solutions",
        "Happiness: Creative expression boosts mood and self-esteem"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "creativity",
      popularity: 48,
      views: 1080,
      dateAdded: "2024-11-23"
    },
    {
      icon: Calendar,
      title: "Schedule Important Tasks for Your Peak Energy Time",
      description: "Time management based on your natural energy rhythms.",
      items: [
        "Health: Reduces stress by working with natural body rhythms",
        "Wealth: Increases productivity leading to better career outcomes",
        "Happiness: Less frustration from fighting your natural energy patterns"
      ],
      level: "Moderate",
      duration: "5 min read",
      category: "productivity",
      popularity: 61,
      views: 1380,
      dateAdded: "2024-11-24"
    },
    {
      icon: Users,
      title: "Compliment One Person Daily",
      description: "Build positive relationships through genuine appreciation.",
      items: [
        "Health: Releases oxytocin reducing stress and improving wellbeing",
        "Wealth: Strengthens professional networks creating opportunities",
        "Happiness: Spreads joy while boosting your own mood"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "social",
      popularity: 71,
      views: 1620,
      dateAdded: "2024-11-25"
    },
    {
      icon: Zap,
      title: "Do One Push-up Every Hour",
      description: "Micro-exercise breaks to maintain strength throughout the day.",
      items: [
        "Health: Builds functional strength without gym commitment",
        "Wealth: Free exercise that requires no equipment or membership",
        "Happiness: Regular movement boosts energy and mood"
      ],
      level: "Easy",
      duration: "2 min read",
      category: "fitness",
      popularity: 56,
      views: 1250,
      dateAdded: "2024-11-26"
    },
    {
      icon: Coffee,
      title: "Replace One Coffee with Herbal Tea",
      description: "Gentle caffeine reduction for better sleep and savings.",
      items: [
        "Health: Reduces caffeine dependency and improves sleep quality",
        "Wealth: Herbal tea costs less than specialty coffee drinks",
        "Happiness: Creates calming ritual without afternoon crashes"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "health",
      popularity: 43,
      views: 970,
      dateAdded: "2024-11-27"
    },
    {
      icon: BookOpen,
      title: "Read for 15 Minutes Before Bed",
      description: "Replace screen time with reading for better sleep and learning.",
      items: [
        "Health: Improves sleep quality by reducing blue light exposure",
        "Wealth: Library books provide free education and entertainment",
        "Happiness: Escapism and learning create satisfaction and calm"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "learning",
      popularity: 65,
      views: 1480,
      dateAdded: "2024-11-28"
    },
    {
      icon: Sun,
      title: "Take Vitamin D Supplements in Winter",
      description: "Combat seasonal deficiency for mood and immune support.",
      items: [
        "Health: Supports immune system and bone health during dark months",
        "Wealth: Prevents illness costs and maintains productivity",
        "Happiness: Reduces seasonal depression and mood swings"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "health",
      popularity: 58,
      views: 1320,
      dateAdded: "2024-11-29"
    },
    {
      icon: Target,
      title: "Set One Tiny Goal Each Morning",
      description: "Micro-goal setting for consistent daily wins and momentum.",
      items: [
        "Health: Creates positive habit loops reinforcing healthy behaviors",
        "Wealth: Small consistent actions compound into major results",
        "Happiness: Daily wins build confidence and motivation"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "productivity",
      popularity: 62,
      views: 1410,
      dateAdded: "2024-11-30"
    },
    {
      icon: Heart,
      title: "Hug Someone You Care About Daily",
      description: "Physical affection for oxytocin release and connection.",
      items: [
        "Health: Releases oxytocin reducing stress and boosting immunity",
        "Wealth: Free therapy that strengthens support systems",
        "Happiness: Physical touch releases feel-good hormones naturally"
      ],
      level: "Easy",
      duration: "2 min read",
      category: "wellness",
      popularity: 69,
      views: 1580,
      dateAdded: "2024-12-01"
    },
    {
      icon: Droplets,
      title: "Drink a Glass of Water Upon Waking",
      description: "Start hydration immediately to kickstart metabolism.",
      items: [
        "Health: Kickstarts metabolism and flushes out toxins",
        "Wealth: Replaces expensive morning beverages with free hydration",
        "Happiness: Provides energy boost and mental clarity"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "health",
      popularity: 72,
      views: 1650,
      dateAdded: "2024-12-02"
    },
    {
      icon: Clock,
      title: "Use a Timer for All Tasks",
      description: "Time-boxing technique for focus and productivity.",
      items: [
        "Health: Prevents overwork and encourages regular breaks",
        "Wealth: Increases hourly productivity improving earning potential",
        "Happiness: Reduces procrastination stress and creates accomplishment"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "productivity",
      popularity: 59,
      views: 1340,
      dateAdded: "2024-12-03"
    },
    {
      icon: Smile,
      title: "Practice Smiling at Yourself in the Mirror",
      description: "Self-compassion technique for improved mood and confidence.",
      items: [
        "Health: Releases endorphins and reduces stress hormones",
        "Wealth: Builds confidence that leads to better opportunities",
        "Happiness: Self-compassion practice improves overall wellbeing"
      ],
      level: "Easy",
      duration: "2 min read",
      category: "mindfulness",
      popularity: 51,
      views: 1150,
      dateAdded: "2024-12-04"
    },
    {
      icon: Trees,
      title: "Plant Something Small",
      description: "Gardening for mental health and environmental connection.",
      items: [
        "Health: Gardening provides gentle exercise and stress relief",
        "Wealth: Growing food saves money on grocery purchases",
        "Happiness: Nurturing growth creates purpose and satisfaction"
      ],
      level: "Easy",
      duration: "5 min read",
      category: "wellness",
      popularity: 44,
      views: 990,
      dateAdded: "2024-12-05"
    },
    {
      icon: Activity,
      title: "Track Your Steps Daily",
      description: "Movement awareness for increased daily activity.",
      items: [
        "Health: Encourages more movement throughout the day",
        "Wealth: Free fitness tracking using phone apps",
        "Happiness: Gamification makes exercise more enjoyable"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "fitness",
      popularity: 64,
      views: 1450,
      dateAdded: "2024-12-06"
    },
    {
      icon: Gift,
      title: "Give Away One Item Daily",
      description: "Decluttering practice for minimalism and generosity.",
      items: [
        "Health: Reduces clutter stress and creates calming environment",
        "Wealth: Decluttering reveals forgotten valuable items",
        "Happiness: Generosity releases feel-good chemicals naturally"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "lifestyle",
      popularity: 47,
      views: 1060,
      dateAdded: "2024-12-07"
    },
    {
      icon: Star,
      title: "Write Down One Win Each Evening",
      description: "Gratitude practice focusing on daily accomplishments.",
      items: [
        "Health: Positive focus reduces stress and improves sleep",
        "Wealth: Recognizing progress motivates continued financial growth",
        "Happiness: Celebrating wins builds confidence and optimism"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "mindfulness",
      popularity: 66,
      views: 1510,
      dateAdded: "2024-12-08"
    },
    {
      icon: Camera,
      title: "Take One Photo of Something Beautiful Daily",
      description: "Mindfulness practice through photography and appreciation.",
      items: [
        "Health: Encourages outdoor exploration and movement",
        "Wealth: Free entertainment that replaces expensive hobbies",
        "Happiness: Beauty appreciation rewires brain for positivity"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "creativity",
      popularity: 53,
      views: 1200,
      dateAdded: "2024-12-09"
    },
    {
      icon: Music,
      title: "Listen to Uplifting Music in the Morning",
      description: "Mood enhancement through strategic music selection.",
      items: [
        "Health: Positive music reduces cortisol and boosts immunity",
        "Wealth: Free mood enhancement that improves productivity",
        "Happiness: Music releases dopamine creating natural high"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "wellness",
      popularity: 57,
      views: 1290,
      dateAdded: "2024-12-10"
    },
    {
      icon: Bed,
      title: "Make Your Bed Every Morning",
      description: "First win of the day for momentum and discipline.",
      items: [
        "Health: Creates structure that supports other healthy habits",
        "Wealth: Discipline in small things builds wealth-building habits",
        "Happiness: Immediate accomplishment starts day with success"
      ],
      level: "Easy",
      duration: "2 min read",
      category: "productivity",
      popularity: 68,
      views: 1560,
      dateAdded: "2024-12-11"
    },
    {
      icon: Utensils,
      title: "Eat Without Distractions Once Daily",
      description: "Mindful eating for better digestion and satisfaction.",
      items: [
        "Health: Improves digestion and prevents overeating",
        "Wealth: Mindful eating reduces food waste and costs",
        "Happiness: Present moment awareness increases meal satisfaction"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "mindfulness",
      popularity: 55,
      views: 1240,
      dateAdded: "2024-12-12"
    },
    {
      icon: Home,
      title: "Declutter One Small Area Daily",
      description: "Micro-organizing for gradual home transformation.",
      items: [
        "Health: Organized space reduces stress and improves focus",
        "Wealth: Finds forgotten items and prevents duplicate purchases",
        "Happiness: Clean space creates mental clarity and calm"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "lifestyle",
      popularity: 60,
      views: 1370,
      dateAdded: "2024-12-13"
    },
    {
      icon: Brain,
      title: "Learn One New Word Daily",
      description: "Vocabulary expansion for cognitive enhancement.",
      items: [
        "Health: Keeps brain active and builds cognitive reserve",
        "Wealth: Better communication skills improve career prospects",
        "Happiness: Learning creates sense of growth and accomplishment"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "learning",
      popularity: 46,
      views: 1040,
      dateAdded: "2024-12-14"
    },
    {
      icon: PenTool,
      title: "Write Three Things You're Grateful For",
      description: "Classic gratitude practice for perspective and happiness.",
      items: [
        "Health: Gratitude practice reduces inflammation and improves immunity",
        "Wealth: Appreciation mindset reduces impulse spending",
        "Happiness: Focusing on positives rewires brain for optimism"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "mindfulness",
      popularity: 74,
      views: 1690,
      dateAdded: "2024-12-15"
    },
    {
      icon: Timer,
      title: "Take a 2-Minute Movement Break Every Hour",
      description: "Regular movement breaks for physical and mental health.",
      items: [
        "Health: Breaks up sedentary time reducing health risks",
        "Wealth: Prevents repetitive strain injuries and medical costs",
        "Happiness: Movement releases endorphins improving mood"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "wellness",
      popularity: 63,
      views: 1430,
      dateAdded: "2024-12-16"
    },
    {
      icon: Eye,
      title: "Practice the 20-20-20 Rule for Eye Health",
      description: "Screen break technique to prevent digital eye strain.",
      items: [
        "Health: Prevents eye strain and maintains long-term vision health",
        "Wealth: Avoids costly vision problems from excessive screen time",
        "Happiness: Regular breaks improve focus and reduce frustration"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "health",
      popularity: 58,
      views: 1310,
      dateAdded: "2024-12-17"
    },
    {
      icon: Gamepad2,
      title: "Limit Gaming to 1 Hour on Weekdays",
      description: "Gaming moderation for balanced lifestyle and productivity.",
      items: [
        "Health: Prevents sedentary behavior and sleep disruption",
        "Wealth: More time for income-generating activities",
        "Happiness: Moderation prevents gaming addiction and guilt"
      ],
      level: "Moderate",
      duration: "4 min read",
      category: "digital",
      popularity: 42,
      views: 950,
      dateAdded: "2024-12-18"
    },
    {
      icon: ThumbsUp,
      title: "Give One Genuine Compliment Daily",
      description: "Spread positivity while building social connections.",
      items: [
        "Health: Positive interactions reduce stress and boost wellbeing",
        "Wealth: Strong relationships create professional opportunities",
        "Happiness: Making others happy increases your own joy"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "social",
      popularity: 67,
      views: 1530,
      dateAdded: "2024-12-19"
    },
    {
      icon: CheckCircle,
      title: "Complete One Unfinished Task Weekly",
      description: "Systematic approach to clearing mental clutter.",
      items: [
        "Health: Reduces stress from mental load of unfinished tasks",
        "Wealth: Completing tasks often reveals savings or opportunities",
        "Happiness: Closure brings satisfaction and mental freedom"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "productivity",
      popularity: 54,
      views: 1220,
      dateAdded: "2024-12-20"
    },
    {
      icon: Award,
      title: "Celebrate Small Wins Immediately",
      description: "Positive reinforcement for sustained motivation.",
      items: [
        "Health: Celebrating releases dopamine strengthening positive habits",
        "Wealth: Acknowledging progress motivates continued financial discipline",
        "Happiness: Regular celebration creates optimistic mindset"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "mindfulness",
      popularity: 61,
      views: 1390,
      dateAdded: "2024-12-21"
    },
    {
      icon: Leaf,
      title: "Spend 5 Minutes with Plants Daily",
      description: "Green therapy for stress reduction and air quality.",
      items: [
        "Health: Plants improve air quality and reduce stress hormones",
        "Wealth: Indoor plants cost less than air purifiers",
        "Happiness: Caring for living things releases nurturing hormones"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "wellness",
      popularity: 49,
      views: 1110,
      dateAdded: "2024-12-22"
    },
    {
      icon: Pill,
      title: "Take a High-Quality Multivitamin Daily",
      description: "Nutritional insurance for optimal health and energy.",
      items: [
        "Health: Fills nutritional gaps supporting overall wellbeing",
        "Wealth: Prevents deficiency-related health issues and costs",
        "Happiness: Optimal nutrition supports stable mood and energy"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "health",
      popularity: 56,
      views: 1270,
      dateAdded: "2024-12-23"
    },
    {
      icon: Bus,
      title: "Use Public Transport Once Weekly",
      description: "Sustainable transportation for savings and mindfulness.",
      items: [
        "Health: Walking to stops adds movement to your routine",
        "Wealth: Reduces fuel costs and vehicle wear significantly",
        "Happiness: Reading or relaxing time during commute"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "lifestyle",
      popularity: 38,
      views: 860,
      dateAdded: "2024-12-24"
    },
    {
      icon: Minus,
      title: "Remove One Negative Influence Weekly",
      description: "Environmental optimization for mental health.",
      items: [
        "Health: Reduces stress from toxic relationships or content",
        "Wealth: Eliminates financial drains from negative influences",
        "Happiness: Creates space for positive influences to flourish"
      ],
      level: "Moderate",
      duration: "5 min read",
      category: "lifestyle",
      popularity: 65,
      views: 1480,
      dateAdded: "2024-12-25"
    },
    {
      icon: Apple,
      title: "Replace One Snack with Fruit Daily",
      description: "Gradual nutrition improvement through simple swaps.",
      items: [
        "Health: Increases fiber and nutrients while reducing processed foods",
        "Wealth: Whole fruits often cost less than packaged snacks",
        "Happiness: Natural sugars provide stable energy without crashes"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "health",
      popularity: 59,
      views: 1340,
      dateAdded: "2024-12-26"
    },
    {
      icon: RotateCcw,
      title: "Do One Task Differently Each Day",
      description: "Novelty practice for cognitive flexibility and creativity.",
      items: [
        "Health: Novel experiences create new neural pathways",
        "Wealth: Creative thinking leads to innovative solutions",
        "Happiness: Variety prevents routine from becoming stale"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "creativity",
      popularity: 45,
      views: 1020,
      dateAdded: "2024-12-27"
    },
    {
      icon: Snowflake,
      title: "Take Cold Showers 2x Per Week",
      description: "Cold therapy for resilience and metabolism boost.",
      items: [
        "Health: Boosts metabolism and strengthens immune system",
        "Wealth: Reduces hot water costs while improving health",
        "Happiness: Cold exposure releases endorphins and builds mental toughness"
      ],
      level: "Moderate",
      duration: "5 min read",
      category: "wellness",
      popularity: 52,
      views: 1180,
      dateAdded: "2024-12-28"
    },
    {
      icon: ArrowDown,
      title: "Sit on the Floor for 10 Minutes Daily",
      description: "Floor sitting for hip mobility and posture improvement.",
      items: [
        "Health: Improves hip flexibility and core strength naturally",
        "Wealth: Free mobility exercise requiring no equipment",
        "Happiness: Ground connection provides mental grounding and calm"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "fitness",
      popularity: 41,
      views: 930,
      dateAdded: "2024-12-29"
    },
    {
      icon: Play,
      title: "Listen to Educational Podcasts During Commute",
      description: "Transform travel time into learning opportunities.",
      items: [
        "Health: Mental stimulation during otherwise passive time",
        "Wealth: Free education that can lead to career advancement",
        "Happiness: Learning creates sense of growth and purpose"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "learning",
      popularity: 63,
      views: 1440,
      dateAdded: "2024-12-30"
    },
    {
      icon: Footprints,
      title: "Walk in Silence for 10 Minutes Daily",
      description: "Walking meditation for mindfulness and clarity.",
      items: [
        "Health: Combines physical exercise with stress reduction",
        "Wealth: Free meditation that doesn't require apps or classes",
        "Happiness: Quiet time reduces mental chatter and anxiety"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "mindfulness",
      popularity: 57,
      views: 1300,
      dateAdded: "2024-12-31"
    },
    {
      icon: ArrowUp,
      title: "Stand During Phone Calls",
      description: "Add movement to necessary daily activities.",
      items: [
        "Health: Reduces sedentary time and improves posture",
        "Wealth: Better vocal projection can improve professional presence",
        "Happiness: Movement during calls increases energy and alertness"
      ],
      level: "Easy",
      duration: "2 min read",
      category: "wellness",
      popularity: 48,
      views: 1090,
      dateAdded: "2025-01-01"
    },
    {
      icon: Zap,
      title: "Do 10 Jumping Jacks Before Meals",
      description: "Pre-meal activation for metabolism and mindfulness.",
      items: [
        "Health: Activates metabolism before eating improving digestion",
        "Wealth: Free exercise that requires no equipment or time",
        "Happiness: Movement releases endorphins before nourishment"
      ],
      level: "Easy",
      duration: "2 min read",
      category: "fitness",
      popularity: 50,
      views: 1130,
      dateAdded: "2025-01-02"
    },
    {
      icon: Car,
      title: "Park Further Away From Destinations",
      description: "Automatic exercise integration through parking strategy.",
      items: [
        "Health: Adds steps and light exercise to necessary trips",
        "Wealth: Often finds free parking further from popular areas",
        "Happiness: Walking provides transition time and fresh air"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "fitness",
      popularity: 55,
      views: 1250,
      dateAdded: "2025-01-03"
    },
    {
      icon: Bike,
      title: "Stretch for 5 Minutes Every Morning",
      description: "Morning mobility routine for flexibility and energy.",
      items: [
        "Health: Improves flexibility and reduces injury risk",
        "Wealth: Prevents costly physical therapy and medical bills",
        "Happiness: Movement creates energy and positive start to day"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "wellness",
      popularity: 66,
      views: 1500,
      dateAdded: "2025-01-04"
    },
    {
      icon: Calendar,
      title: "Plan Tomorrow Before Bed",
      description: "Evening planning for stress-free mornings and clarity.",
      items: [
        "Health: Reduces morning stress by eliminating decision fatigue",
        "Wealth: Better planning leads to more productive days",
        "Happiness: Clear plan creates confidence and reduces anxiety"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "productivity",
      popularity: 62,
      views: 1410,
      dateAdded: "2025-01-05"
    },
    {
      icon: Monitor,
      title: "Use Night Mode on All Devices After 8PM",
      description: "Blue light reduction for better sleep and eye health.",
      items: [
        "Health: Reduces blue light exposure improving sleep quality",
        "Wealth: Prevents sleep-related health issues and costs",
        "Happiness: Better sleep improves mood and cognitive function"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "digital",
      popularity: 69,
      views: 1570,
      dateAdded: "2025-01-06"
    },
    {
      icon: Activity,
      title: "Check Your Posture Every Hour",
      description: "Postural awareness for spinal health and confidence.",
      items: [
        "Health: Prevents back pain and improves spinal alignment",
        "Wealth: Good posture projects confidence improving opportunities",
        "Happiness: Upright posture naturally improves mood and energy"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "health",
      popularity: 58,
      views: 1320,
      dateAdded: "2025-01-07"
    },
    {
      icon: Droplets,
      title: "Drink Green Smoothies 3x Per Week",
      description: "Nutrient-dense drink for easy vegetable consumption.",
      items: [
        "Health: Increases vegetable intake in easily digestible form",
        "Wealth: Prevents expensive supplement needs through whole foods",
        "Happiness: Nutrient density supports stable mood and energy"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "health",
      popularity: 54,
      views: 1230,
      dateAdded: "2025-01-08"
    },
    {
      icon: Package,
      title: "Prepare Healthy Snacks on Sundays",
      description: "Meal prep for convenient healthy choices all week.",
      items: [
        "Health: Ensures healthy options are always available",
        "Wealth: Bulk preparation saves money on individual portions",
        "Happiness: Reduces daily decision fatigue about food choices"
      ],
      level: "Easy",
      duration: "5 min read",
      category: "health",
      popularity: 60,
      views: 1360,
      dateAdded: "2025-01-09"
    },
    {
      icon: RefreshCw,
      title: "Review and Adjust Goals Monthly",
      description: "Regular goal maintenance for continued relevance and progress.",
      items: [
        "Health: Keeps health goals realistic and motivating",
        "Wealth: Adjusts financial targets based on changing circumstances",
        "Happiness: Ensures goals still align with values and desires"
      ],
      level: "Moderate",
      duration: "6 min read",
      category: "productivity",
      popularity: 56,
      views: 1280,
      dateAdded: "2025-01-10"
    },
    {
      icon: Moon,
      title: "Create a Consistent Bedtime Routine",
      description: "Sleep ritual for better rest and recovery.",
      items: [
        "Health: Consistent routine improves sleep quality significantly",
        "Wealth: Better sleep improves productivity and decision-making",
        "Happiness: Quality rest supports emotional regulation and mood"
      ],
      level: "Easy",
      duration: "5 min read",
      category: "wellness",
      popularity: 71,
      views: 1610,
      dateAdded: "2025-01-11"
    },
    {
      icon: EyeOff,
      title: "Practice Digital Sunset One Day Per Week",
      description: "Weekly digital detox for mental health and presence.",
      items: [
        "Health: Reduces screen-related eye strain and mental fatigue",
        "Wealth: Prevents impulse online purchases during detox",
        "Happiness: Increases presence and real-world connection"
      ],
      level: "Moderate",
      duration: "5 min read",
      category: "digital",
      popularity: 63,
      views: 1430,
      dateAdded: "2025-01-12"
    },
    {
      icon: Waves,
      title: "Practice Box Breathing When Stressed",
      description: "4-4-4-4 breathing technique for immediate stress relief.",
      items: [
        "Health: Activates parasympathetic nervous system reducing stress",
        "Wealth: Free stress management preventing stress-related spending",
        "Happiness: Immediate calm and clarity during difficult moments"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "wellness",
      popularity: 68,
      views: 1550,
      dateAdded: "2025-01-13"
    },
    {
      icon: Truck,
      title: "Buy Generic Brands for Non-Essential Items",
      description: "Smart shopping for significant savings without sacrifice.",
      items: [
        "Health: Generic medicines have same active ingredients",
        "Wealth: Can save 20-40% on household and personal items",
        "Happiness: Financial savings reduce money stress significantly"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "finance",
      popularity: 64,
      views: 1460,
      dateAdded: "2025-01-14"
    },
    {
      icon: Map,
      title: "Explore Your Local Library Monthly",
      description: "Free community resource for learning and entertainment.",
      items: [
        "Health: Walking to library adds movement to routine",
        "Wealth: Free books, movies, and events replace paid entertainment",
        "Happiness: Discovery and learning create excitement and growth"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "learning",
      popularity: 47,
      views: 1070,
      dateAdded: "2025-01-15"
    },
    {
      icon: ShoppingBasket,
      title: "Shop with a List and Stick to It",
      description: "Disciplined shopping for budget control and efficiency.",
      items: [
        "Health: Planned shopping leads to healthier food choices",
        "Wealth: Prevents impulse purchases saving significant money",
        "Happiness: Organized shopping reduces stress and decision fatigue"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "finance",
      popularity: 67,
      views: 1520,
      dateAdded: "2025-01-16"
    },
    {
      icon: Trophy,
      title: "Set Micro-Goals for Massive Wins",
      description: "Break down overwhelming objectives into tiny, actionable steps.",
      items: [
        "Health: 5-minute workouts lead to consistent fitness habits",
        "Wealth: Save $1 daily instead of trying to save $365 monthly",
        "Happiness: Small wins build momentum and confidence daily"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "productivity",
      popularity: 58,
      views: 0,
      dateAdded: "2024-12-01"
    },
    {
      icon: Award,
      title: "Practice the 5-Second Rule",
      description: "Beat procrastination by acting within 5 seconds of having an idea.",
      items: [
        "Health: Exercise immediately when you think about it",
        "Wealth: Make investment decisions quickly before fear sets in",
        "Happiness: Act on positive impulses before talking yourself out"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "productivity",
      popularity: 62,
      views: 0,
      dateAdded: "2024-12-02"
    },
    {
      icon: CheckCircle,
      title: "Complete One Important Task Before Checking Phone",
      description: "Morning productivity ritual that sets the tone for your entire day.",
      items: [
        "Health: Exercise or healthy breakfast before digital distractions",
        "Wealth: Handle finances or work before social media temptation",
        "Happiness: Accomplish something meaningful before reactive mode"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "productivity",
      popularity: 67,
      views: 0,
      dateAdded: "2024-12-03"
    },
    {
      icon: ThumbsUp,
      title: "Give Compliments More Freely",
      description: "Spread positivity that comes back multiplied in relationships.",
      items: [
        "Health: Positive interactions boost immune system and longevity",
        "Wealth: Better relationships create more opportunities and referrals",
        "Happiness: Making others feel good creates reciprocal joy"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "social",
      popularity: 45,
      views: 0,
      dateAdded: "2024-12-04"
    },
    {
      icon: Gamepad2,
      title: "Turn Waiting Time Into Learning Time",
      description: "Transform dead time into growth opportunities with mobile learning.",
      items: [
        "Health: Learn about nutrition while waiting for appointments",
        "Wealth: Study investing during commutes or queues",
        "Happiness: Acquire new skills that boost confidence and capability"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "learning",
      popularity: 53,
      views: 0,
      dateAdded: "2024-12-05"
    },
    {
      icon: Star,
      title: "Rate Your Energy Levels Hourly",
      description: "Track energy patterns to optimize your daily schedule and habits.",
      items: [
        "Health: Identify when you need rest vs. stimulation",
        "Wealth: Schedule important work during peak energy hours",
        "Happiness: Align activities with natural energy rhythms"
      ],
      level: "Easy",
      duration: "5 min read",
      category: "wellness",
      popularity: 41,
      views: 0,
      dateAdded: "2024-12-06"
    },
    {
      icon: Gift,
      title: "Buy Experiences Not Things",
      description: "Invest in memories that appreciate in value over time.",
      items: [
        "Health: Adventures often involve physical activity and fresh air",
        "Wealth: Experiences don't depreciate like material possessions",
        "Happiness: Memories provide lasting joy and personal growth"
      ],
      level: "Easy",
      duration: "5 min read",
      category: "lifestyle",
      popularity: 59,
      views: 0,
      dateAdded: "2024-12-07"
    },
    {
      icon: Music,
      title: "Create Mood-Based Playlists",
      description: "Use music strategically to influence your emotional state and productivity.",
      items: [
        "Health: Calming music reduces stress and lowers blood pressure",
        "Wealth: Focus music increases productivity and earning potential",
        "Happiness: Happy music instantly improves mood and energy"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "wellness",
      popularity: 47,
      views: 0,
      dateAdded: "2024-12-08"
    },
    {
      icon: Camera,
      title: "Take One Photo Every Day",
      description: "Document your life to appreciate moments and track personal growth.",
      items: [
        "Health: Encourages you to notice and seek beautiful moments",
        "Wealth: Free hobby that creates lasting value and memories",
        "Happiness: Daily documentation increases gratitude and awareness"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "mindfulness",
      popularity: 38,
      views: 0,
      dateAdded: "2024-12-09"
    },
    {
      icon: Bed,
      title: "Make Your Bed Every Morning",
      description: "Start each day with an immediate win and organized environment.",
      items: [
        "Health: Creates morning structure that improves sleep hygiene",
        "Wealth: Builds discipline that transfers to financial habits",
        "Happiness: Instant accomplishment that boosts confidence daily"
      ],
      level: "Easy",
      duration: "2 min read",
      category: "productivity",
      popularity: 65,
      views: 0,
      dateAdded: "2024-12-10"
    },
    {
      icon: Utensils,
      title: "Eat Without Distractions",
      description: "Mindful eating for better digestion and portion control.",
      items: [
        "Health: Improves digestion and helps recognize satiety signals",
        "Wealth: Prevents overeating which reduces food costs",
        "Happiness: Increases meal satisfaction and mindful awareness"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "mindfulness",
      popularity: 52,
      views: 0,
      dateAdded: "2024-12-11"
    },
    {
      icon: Home,
      title: "Declutter One Space Weekly",
      description: "Systematic organization for mental clarity and functional living.",
      items: [
        "Health: Reduces stress from cluttered environments",
        "Wealth: Discover forgotten items and prevent unnecessary purchases",
        "Happiness: Organized spaces create calm and control feelings"
      ],
      level: "Easy",
      duration: "5 min read",
      category: "lifestyle",
      popularity: 56,
      views: 0,
      dateAdded: "2024-12-12"
    },
    {
      icon: Lightbulb,
      title: "Write Down Ideas Immediately",
      description: "Capture creative thoughts before they disappear forever.",
      items: [
        "Health: Reduces mental load from trying to remember everything",
        "Wealth: Ideas are assets that can become income streams",
        "Happiness: Creative expression and problem-solving boost satisfaction"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "creativity",
      popularity: 49,
      views: 0,
      dateAdded: "2024-12-13"
    },
    {
      icon: Target,
      title: "Set One Priority Each Day",
      description: "Focus on what matters most to achieve consistent progress.",
      items: [
        "Health: Prioritize one healthy habit to build sustainable routines",
        "Wealth: Focus daily effort on highest-impact financial activities",
        "Happiness: Accomplish important goals without overwhelming yourself"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "productivity",
      popularity: 61,
      views: 0,
      dateAdded: "2024-12-14"
    },
    {
      icon: Timer,
      title: "Use the Pomodoro Technique",
      description: "25-minute focus blocks for sustained productivity and mental freshness.",
      items: [
        "Health: Regular breaks prevent mental fatigue and eye strain",
        "Wealth: Increased productivity leads to better work outcomes",
        "Happiness: Manageable work chunks reduce overwhelm and stress"
      ],
      level: "Easy",
      duration: "5 min read",
      category: "productivity",
      popularity: 68,
      views: 0,
      dateAdded: "2024-12-15"
    },
    {
      icon: Clock,
      title: "Schedule Time for Spontaneity",
      description: "Plan unplanned time to maintain life balance and creativity.",
      items: [
        "Health: Reduces rigidity stress and allows for adaptive self-care",
        "Wealth: Spontaneous opportunities often lead to unexpected income",
        "Happiness: Flexible time creates joy and prevents schedule burnout"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "wellness",
      popularity: 43,
      views: 0,
      dateAdded: "2024-12-16"
    },
    {
      icon: Brain,
      title: "Practice Mental Math Daily",
      description: "Keep your brain sharp with regular mathematical challenges.",
      items: [
        "Health: Cognitive exercise prevents mental decline and aging",
        "Wealth: Better number sense improves financial decision making",
        "Happiness: Mental challenges create achievement and confidence"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "learning",
      popularity: 36,
      views: 0,
      dateAdded: "2024-12-17"
    },
    {
      icon: PenTool,
      title: "Handwrite Important Notes",
      description: "Use pen and paper for better memory retention and focus.",
      items: [
        "Health: Reduces screen time and improves hand-eye coordination",
        "Wealth: Better note-taking leads to improved work performance",
        "Happiness: Tactile experience is more satisfying than digital"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "learning",
      popularity: 44,
      views: 0,
      dateAdded: "2024-12-18"
    },
    {
      icon: BookOpen,
      title: "Read Before Bed Instead of Screens",
      description: "Evening reading ritual for better sleep and continuous learning.",
      items: [
        "Health: Reduces blue light exposure that disrupts sleep cycles",
        "Wealth: Knowledge acquisition that can improve career prospects",
        "Happiness: Relaxing routine that ends the day positively"
      ],
      level: "Easy",
      duration: "5 min read",
      category: "wellness",
      popularity: 57,
      views: 0,
      dateAdded: "2024-12-19"
    },
    {
      icon: XCircle,
      title: "Say No to Non-Essential Commitments",
      description: "Protect your time and energy for what truly matters.",
      items: [
        "Health: Reduces stress and prevents burnout from overcommitment",
        "Wealth: Focus time on high-value activities and opportunities",
        "Happiness: More time for activities that bring genuine joy"
      ],
      level: "Moderate",
      duration: "5 min read",
      category: "productivity",
      popularity: 63,
      views: 0,
      dateAdded: "2024-12-20"
    },
    {
      icon: Users,
      title: "Surround Yourself with Better People",
      description: "Curate your social circle for mutual growth and positive influence.",
      items: [
        "Health: Positive relationships improve mental and physical health",
        "Wealth: Network with ambitious people who create opportunities",
        "Happiness: Supportive friends enhance life satisfaction significantly"
      ],
      level: "Moderate",
      duration: "6 min read",
      category: "social",
      popularity: 71,
      views: 0,
      dateAdded: "2024-12-21"
    },
    {
      icon: Leaf,
      title: "Add Plants to Your Living Space",
      description: "Natural air purification and mood enhancement for your home.",
      items: [
        "Health: Plants improve air quality and reduce stress hormones",
        "Wealth: Low-cost home improvement that increases property value",
        "Happiness: Nature indoors creates calming and beautiful environment"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "lifestyle",
      popularity: 48,
      views: 0,
      dateAdded: "2024-12-22"
    },
    {
      icon: Pill,
      title: "Take Vitamin D Supplements",
      description: "Essential nutrient for immune health and mood regulation.",
      items: [
        "Health: Supports immune system and bone health significantly",
        "Wealth: Prevents costly health issues from deficiency",
        "Happiness: Adequate levels improve mood and energy naturally"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "health",
      popularity: 54,
      views: 0,
      dateAdded: "2024-12-23"
    },
    {
      icon: Bus,
      title: "Use Public Transport Instead of Driving",
      description: "Save money while reducing stress and environmental impact.",
      items: [
        "Health: Walking to stations adds exercise to daily routine",
        "Wealth: Significant savings on fuel, parking, and car maintenance",
        "Happiness: Reading or relaxing time instead of traffic stress"
      ],
      level: "Easy",
      duration: "5 min read",
      category: "lifestyle",
      popularity: 42,
      views: 0,
      dateAdded: "2024-12-24"
    },
    {
      icon: Wind,
      title: "Practice Deep Breathing Exercises",
      description: "Simple breath work for instant stress relief and mental clarity.",
      items: [
        "Health: Activates parasympathetic nervous system for relaxation",
        "Wealth: Better decision making under pressure improves outcomes",
        "Happiness: Immediate stress relief and emotional regulation"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "wellness",
      popularity: 59,
      views: 0,
      dateAdded: "2024-12-25"
    },
    {
      icon: Minus,
      title: "Minimize Decision Fatigue",
      description: "Reduce daily choices to preserve mental energy for important decisions.",
      items: [
        "Health: Less stress from constant decision making",
        "Wealth: Save decision energy for financial and career choices",
        "Happiness: Simplified life creates more mental space for joy"
      ],
      level: "Moderate",
      duration: "6 min read",
      category: "productivity",
      popularity: 55,
      views: 0,
      dateAdded: "2024-12-26"
    },
    {
      icon: Apple,
      title: "Eat Fruit Instead of Dessert",
      description: "Natural sweetness that satisfies cravings while nourishing your body.",
      items: [
        "Health: Fiber and nutrients instead of empty calories and sugar",
        "Wealth: Cheaper than processed desserts and restaurant sweets",
        "Happiness: Natural energy without sugar crashes and guilt"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "health",
      popularity: 46,
      views: 0,
      dateAdded: "2024-12-27"
    },
    {
      icon: RotateCcw,
      title: "Review Your Week Every Sunday",
      description: "Weekly reflection for continuous improvement and goal alignment.",
      items: [
        "Health: Assess what health habits worked and need adjustment",
        "Wealth: Review spending and progress toward financial goals",
        "Happiness: Celebrate wins and learn from challenges weekly"
      ],
      level: "Easy",
      duration: "5 min read",
      category: "productivity",
      popularity: 60,
      views: 0,
      dateAdded: "2024-12-28"
    },
    {
      icon: Snowflake,
      title: "Take Cold Showers",
      description: "Cold therapy for improved circulation and mental resilience.",
      items: [
        "Health: Boosts circulation and strengthens immune system",
        "Wealth: Builds mental toughness for difficult financial decisions",
        "Happiness: Releases endorphins and creates sense of achievement"
      ],
      level: "Moderate",
      duration: "5 min read",
      category: "wellness",
      popularity: 51,
      views: 0,
      dateAdded: "2024-12-29"
    },
    {
      icon: ArrowDown,
      title: "Reduce Sugar Intake Gradually",
      description: "Systematic sugar reduction for sustained energy and health.",
      items: [
        "Health: Prevents energy crashes and reduces inflammation",
        "Wealth: Saves money on expensive processed and sugary foods",
        "Happiness: Stable mood without sugar-induced emotional swings"
      ],
      level: "Moderate",
      duration: "6 min read",
      category: "health",
      popularity: 64,
      views: 0,
      dateAdded: "2024-12-30"
    },
    {
      icon: Play,
      title: "Schedule Regular Fun Activities",
      description: "Intentional joy to maintain work-life balance and prevent burnout.",
      items: [
        "Health: Play reduces stress and supports mental health",
        "Wealth: Prevents expensive burnout and maintains productivity",
        "Happiness: Regular fun creates anticipation and life satisfaction"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "wellness",
      popularity: 66,
      views: 0,
      dateAdded: "2024-12-31"
    },
    {
      icon: Trees,
      title: "Plant a Tree or Garden",
      description: "Long-term investment in environment and personal well-being.",
      items: [
        "Health: Gardening provides exercise and fresh air exposure",
        "Wealth: Growing food reduces grocery bills significantly",
        "Happiness: Nurturing life creates purpose and connection to nature"
      ],
      level: "Moderate",
      duration: "6 min read",
      category: "lifestyle",
      popularity: 39,
      views: 0,
      dateAdded: "2025-01-01"
    },
    {
      icon: Footprints,
      title: "Take Walking Meetings",
      description: "Combine business with exercise for creativity and health.",
      items: [
        "Health: Adds movement to sedentary work schedule",
        "Wealth: Increased creativity leads to better business solutions",
        "Happiness: Fresh air and movement improve mood and energy"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "productivity",
      popularity: 52,
      views: 0,
      dateAdded: "2025-01-02"
    },
    {
      icon: ArrowUp,
      title: "Stand More, Sit Less",
      description: "Combat sedentary lifestyle with strategic standing breaks.",
      items: [
        "Health: Reduces back pain and improves posture significantly",
        "Wealth: Standing desk alternatives cost less than medical bills",
        "Happiness: Better energy levels and alertness throughout day"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "health",
      popularity: 58,
      views: 0,
      dateAdded: "2025-01-03"
    },
    {
      icon: Zap,
      title: "Batch Similar Tasks Together",
      description: "Group related activities to minimize context switching and maximize flow.",
      items: [
        "Health: Reduces mental fatigue from constant task switching",
        "Wealth: Increased efficiency leads to better work outcomes",
        "Happiness: Flow states create satisfaction and sense of control"
      ],
      level: "Easy",
      duration: "5 min read",
      category: "productivity",
      popularity: 63,
      views: 0,
      dateAdded: "2025-01-04"
    },
    {
      icon: Car,
      title: "Carpool or Share Rides",
      description: "Social transportation that saves money and builds relationships.",
      items: [
        "Health: Less driving stress and more social interaction",
        "Wealth: Split fuel costs and reduce vehicle wear significantly",
        "Happiness: Shared experiences and conversations during travel"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "social",
      popularity: 35,
      views: 0,
      dateAdded: "2025-01-05"
    },
    {
      icon: Bike,
      title: "Bike to Work Once a Week",
      description: "Weekly cycling commitment for fitness and environmental benefits.",
      items: [
        "Health: Cardiovascular exercise integrated into work routine",
        "Wealth: Reduces transportation costs and parking fees",
        "Happiness: Fresh air and exercise improve mood before work"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "fitness",
      popularity: 41,
      views: 0,
      dateAdded: "2025-01-06"
    },
    {
      icon: Calendar,
      title: "Block Time for Deep Work",
      description: "Protected time slots for your most important and complex tasks.",
      items: [
        "Health: Reduces stress from rushed or incomplete work",
        "Wealth: High-quality work leads to better career opportunities",
        "Happiness: Accomplishing meaningful work creates satisfaction"
      ],
      level: "Moderate",
      duration: "6 min read",
      category: "productivity",
      popularity: 69,
      views: 0,
      dateAdded: "2025-01-07"
    },
    {
      icon: Monitor,
      title: "Use Blue Light Filters",
      description: "Protect your eyes and sleep quality from excessive screen exposure.",
      items: [
        "Health: Reduces eye strain and improves sleep quality",
        "Wealth: Prevents costly vision problems from screen overuse",
        "Happiness: Better sleep leads to improved mood and energy"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "health",
      popularity: 47,
      views: 0,
      dateAdded: "2025-01-08"
    },
    {
      icon: Sun,
      title: "Get Sunlight Within First Hour of Waking",
      description: "Morning light exposure for optimal circadian rhythm regulation.",
      items: [
        "Health: Regulates sleep-wake cycle and vitamin D production",
        "Wealth: Free therapy that replaces expensive light treatment",
        "Happiness: Natural mood boost and increased alertness"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "wellness",
      popularity: 62,
      views: 0,
      dateAdded: "2025-01-09"
    },
    {
      icon: Activity,
      title: "Track One Health Metric Daily",
      description: "Simple biomarker monitoring for health awareness and motivation.",
      items: [
        "Health: Early detection of health changes and trends",
        "Wealth: Prevents expensive medical issues through monitoring",
        "Happiness: Control over health creates confidence and peace"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "health",
      popularity: 56,
      views: 0,
      dateAdded: "2025-01-10"
    },
    {
      icon: Droplets,
      title: "Drink Water Before Every Meal",
      description: "Pre-meal hydration for better digestion and portion control.",
      items: [
        "Health: Improves digestion and helps control portion sizes",
        "Wealth: Reduces overeating which saves money on food costs",
        "Happiness: Better hydration improves energy and mental clarity"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "health",
      popularity: 53,
      views: 0,
      dateAdded: "2025-01-11"
    },
    {
      icon: Package,
      title: "Prepare Healthy Snacks in Advance",
      description: "Meal prep for nutritious choices when hunger strikes.",
      items: [
        "Health: Prevents impulse eating of processed junk food",
        "Wealth: Saves money compared to buying expensive healthy snacks",
        "Happiness: Reduces decision fatigue and guilt from poor choices"
      ],
      level: "Easy",
      duration: "5 min read",
      category: "health",
      popularity: 49,
      views: 0,
      dateAdded: "2025-01-12"
    },
    {
      icon: RefreshCw,
      title: "Learn a New Word Every Day",
      description: "Daily vocabulary expansion for better communication and thinking.",
      items: [
        "Health: Mental exercise that keeps brain active and engaged",
        "Wealth: Better communication improves career and business prospects",
        "Happiness: Learning creates sense of growth and accomplishment"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "learning",
      popularity: 37,
      views: 0,
      dateAdded: "2025-01-13"
    },
    {
      icon: Moon,
      title: "Create an Evening Wind-Down Routine",
      description: "Consistent pre-sleep ritual for better rest and recovery.",
      items: [
        "Health: Signals body to prepare for sleep and recovery",
        "Wealth: Better sleep improves decision making and productivity",
        "Happiness: Peaceful routine reduces anxiety and stress"
      ],
      level: "Easy",
      duration: "5 min read",
      category: "wellness",
      popularity: 65,
      views: 0,
      dateAdded: "2025-01-14"
    },
    {
      icon: EyeOff,
      title: "Practice Digital Sunsets",
      description: "End screen time at specific hour for better sleep and relationships.",
      items: [
        "Health: Reduces blue light exposure that disrupts sleep cycles",
        "Wealth: Less late-night online shopping and subscription services",
        "Happiness: More time for relationships and meaningful activities"
      ],
      level: "Moderate",
      duration: "5 min read",
      category: "digital",
      popularity: 61,
      views: 0,
      dateAdded: "2025-01-15"
    },
    {
      icon: Waves,
      title: "Listen to Ocean Sounds for Relaxation",
      description: "Natural soundscapes for stress relief and focus enhancement.",
      items: [
        "Health: Reduces cortisol levels and lowers blood pressure",
        "Wealth: Free relaxation tool that replaces expensive therapies",
        "Happiness: Creates calm environment that improves mood"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "wellness",
      popularity: 44,
      views: 0,
      dateAdded: "2025-01-16"
    },
    {
      icon: Truck,
      title: "Buy Local Products When Possible",
      description: "Support community while getting fresher products and building connections.",
      items: [
        "Health: Fresher food with higher nutritional value",
        "Wealth: Builds local relationships that create opportunities",
        "Happiness: Contributes to community and supports neighbors"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "lifestyle",
      popularity: 40,
      views: 0,
      dateAdded: "2025-01-17"
    },
    {
      icon: Map,
      title: "Explore Your Neighborhood on Foot",
      description: "Rediscover your local area through walking exploration.",
      items: [
        "Health: Increases daily steps and provides fresh air",
        "Wealth: Free entertainment that discovers local businesses",
        "Happiness: Novel experiences close to home boost mood"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "adventure",
      popularity: 38,
      views: 0,
      dateAdded: "2025-01-18"
    },
    {
      icon: ShoppingBasket,
      title: "Shop with a List and Stick to It",
      description: "Strategic shopping to avoid impulse purchases and food waste.",
      items: [
        "Health: Planned nutrition prevents impulse junk food purchases",
        "Wealth: Reduces unnecessary spending and food waste significantly",
        "Happiness: Less decision fatigue and post-shopping regret"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "finance",
      popularity: 57,
      views: 0,
      dateAdded: "2025-01-19"
    },
    {
      icon: MessageCircle,
      title: "Send Appreciation Messages Regularly",
      description: "Express gratitude to strengthen relationships and spread positivity.",
      items: [
        "Health: Positive relationships improve mental and physical health",
        "Wealth: Strong relationships create professional opportunities",
        "Happiness: Expressing gratitude increases personal happiness levels"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "social",
      popularity: 48,
      views: 0,
      dateAdded: "2025-01-20"
    },
    {
      icon: Heart,
      title: "Volunteer in Your Community",
      description: "Give back while building connections and gaining perspective.",
      items: [
        "Health: Purpose and social connection improve mental health",
        "Wealth: Networking opportunities and skill development",
        "Happiness: Helping others creates deep satisfaction and meaning"
      ],
      level: "Moderate",
      duration: "6 min read",
      category: "social",
      popularity: 43,
      views: 0,
      dateAdded: "2025-01-21"
    },
    {
      icon: Shield,
      title: "Review and Update Passwords Quarterly",
      description: "Digital security maintenance for financial and personal protection.",
      items: [
        "Health: Reduces stress from potential security breaches",
        "Wealth: Protects financial accounts from unauthorized access",
        "Happiness: Peace of mind from knowing accounts are secure"
      ],
      level: "Easy",
      duration: "5 min read",
      category: "security",
      popularity: 45,
      views: 0,
      dateAdded: "2025-01-22"
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