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