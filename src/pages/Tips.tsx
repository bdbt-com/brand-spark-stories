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
  Camera, Music, Gift, Star, Gamepad2, ThumbsUp, CheckCircle, Award, Trophy,
  Sparkles, Compass, Building, Briefcase, GraduationCap, Palette, Headphones,
  Smartphone, Laptop, Globe, Feather, Gem, Sunrise, Mountain, Rocket, Telescope
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
        "Wealth: Learn new skills that can advance your career",
        "Happiness: Inspiring content that motivates and entertains"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "learning",
      popularity: 48,
      views: 950,
      dateAdded: "2024-06-20"
    },
    {
      icon: ArrowDown,
      title: "Practice Deep Breathing Every Hour",
      description: "Micro-meditations throughout the day for stress management.",
      items: [
        "Health: Activates parasympathetic nervous system for relaxation",
        "Wealth: Better decision-making under pressure improves outcomes",
        "Happiness: Regular stress relief maintains emotional equilibrium"
      ],
      level: "Easy",
      duration: "2 min read",
      category: "wellness",
      popularity: 50,
      views: 1040,
      dateAdded: "2024-06-25"
    },
    {
      icon: Snowflake,
      title: "Take Cold Showers",
      description: "Cold therapy for improved circulation and mental resilience.",
      items: [
        "Health: Boosts circulation and strengthens immune system",
        "Wealth: Builds mental toughness for difficult decisions",
        "Happiness: Releases endorphins and creates sense of achievement"
      ],
      level: "Moderate",
      duration: "5 min read",
      category: "wellness",
      popularity: 51,
      views: 1100,
      dateAdded: "2024-07-01"
    },
    {
      icon: RotateCcw,
      title: "Implement the 2-Minute Rule",
      description: "Complete any task that takes less than two minutes immediately.",
      items: [
        "Health: Prevents stress buildup from small undone tasks",
        "Wealth: Efficiency gains compound to create more opportunities",
        "Happiness: Constant small accomplishments boost daily satisfaction"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "productivity",
      popularity: 65,
      views: 1380,
      dateAdded: "2024-07-05"
    },
    {
      icon: Apple,
      title: "Eat Only Whole Foods for 30 Days",
      description: "One-month reset to understand how processed foods affect your body.",
      items: [
        "Health: Reduces inflammation and improves energy levels significantly",
        "Wealth: Cooking at home saves money on expensive processed foods",
        "Happiness: Mental clarity and stable mood from consistent nutrition"
      ],
      level: "Moderate",
      duration: "6 min read",
      category: "health",
      popularity: 60,
      views: 1290,
      dateAdded: "2024-07-10"
    },
    {
      icon: Minus,
      title: "Practice Minimalism in One Area",
      description: "Start small with one category to experience the benefits of less.",
      items: [
        "Health: Reduced stress from visual clutter and decision overload",
        "Wealth: Stop buying unnecessary items and discover what you have",
        "Happiness: Freedom from managing and organizing excess possessions"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "lifestyle",
      popularity: 45,
      views: 920,
      dateAdded: "2024-07-15"
    },
    {
      icon: Wind,
      title: "Do Box Breathing for 5 Minutes",
      description: "4-4-4-4 breathing pattern for immediate stress relief and focus.",
      items: [
        "Health: Lowers heart rate and blood pressure quickly",
        "Wealth: Clear thinking leads to better financial decisions",
        "Happiness: Instant calm that improves mood and perspective"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "wellness",
      popularity: 43,
      views: 840,
      dateAdded: "2024-07-20"
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
      popularity: 39,
      views: 780,
      dateAdded: "2024-07-25"
    },
    {
      icon: Pill,
      title: "Take Vitamin D3 Daily",
      description: "Essential supplementation for immune health and mood regulation.",
      items: [
        "Health: Supports immune system and bone health effectively",
        "Wealth: Inexpensive prevention that reduces future medical costs",
        "Happiness: Adequate levels improve mood and reduce seasonal depression"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "health",
      popularity: 47,
      views: 980,
      dateAdded: "2024-08-01"
    },
    {
      icon: Leaf,
      title: "Grow Your Own Herbs",
      description: "Window garden for fresh ingredients and stress relief.",
      items: [
        "Health: Fresh herbs provide maximum nutritional benefits",
        "Wealth: Growing your own saves money on expensive organic herbs",
        "Happiness: Nurturing plants provides purpose and connection to nature"
      ],
      level: "Easy",
      duration: "5 min read",
      category: "lifestyle",
      popularity: 36,
      views: 710,
      dateAdded: "2024-08-05"
    },
    {
      icon: Users,
      title: "Join a Local Community Group",
      description: "Build meaningful connections through shared interests and activities.",
      items: [
        "Health: Social connection improves mental and physical wellbeing",
        "Wealth: Networking opportunities and skill sharing reduce costs",
        "Happiness: Sense of belonging and purpose through community involvement"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "social",
      popularity: 41,
      views: 850,
      dateAdded: "2024-08-10"
    },
    {
      icon: XCircle,
      title: "Eliminate One Bad Habit",
      description: "Focus on removing one negative behavior for maximum impact.",
      items: [
        "Health: Removing harmful habits creates immediate health benefits",
        "Wealth: Bad habits often cost money through waste or poor decisions",
        "Happiness: Breaking negative patterns builds confidence and control"
      ],
      level: "Moderate",
      duration: "5 min read",
      category: "productivity",
      popularity: 58,
      views: 1200,
      dateAdded: "2024-08-15"
    },
    {
      icon: BookOpen,
      title: "Read for 30 Minutes Before Bed",
      description: "Evening reading ritual for better sleep and continuous learning.",
      items: [
        "Health: Reduces blue light exposure that disrupts sleep cycles",
        "Wealth: Knowledge acquisition that can improve career prospects",
        "Happiness: Relaxing routine that ends the day positively"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "learning",
      popularity: 62,
      views: 1320,
      dateAdded: "2024-08-20"
    },
    {
      icon: PenTool,
      title: "Write Three Things You're Grateful For",
      description: "Daily gratitude practice for improved mood and perspective.",
      items: [
        "Health: Gratitude practice reduces stress and improves sleep quality",
        "Wealth: Appreciation mindset reduces desire for unnecessary purchases",
        "Happiness: Focusing on positives rewires brain for greater satisfaction"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "mindfulness",
      popularity: 69,
      views: 1450,
      dateAdded: "2024-08-25"
    },
    {
      icon: Brain,
      title: "Learn a New Word Every Day",
      description: "Daily vocabulary expansion for better communication and thinking.",
      items: [
        "Health: Mental exercise that keeps brain active and engaged",
        "Wealth: Better communication improves career and business prospects",
        "Happiness: Learning creates sense of growth and accomplishment"
      ],
      level: "Easy",
      duration: "2 min read",
      category: "learning",
      popularity: 35,
      views: 680,
      dateAdded: "2024-09-01"
    },
    {
      icon: Clock,
      title: "Practice Time Blocking",
      description: "Schedule specific time slots for different activities and tasks.",
      items: [
        "Health: Ensures time for exercise and self-care activities",
        "Wealth: Focused work time increases productivity and earnings",
        "Happiness: Structured day reduces stress and creates accomplishment"
      ],
      level: "Moderate",
      duration: "5 min read",
      category: "productivity",
      popularity: 54,
      views: 1150,
      dateAdded: "2024-09-05"
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
      duration: "4 min read",
      category: "productivity",
      popularity: 68,
      views: 1420,
      dateAdded: "2024-09-10"
    },
    {
      icon: Target,
      title: "Set Three Daily Priorities",
      description: "Focus on three most important tasks to avoid overwhelm.",
      items: [
        "Health: Prioritizing self-care ensures it doesn't get skipped",
        "Wealth: Focus on high-impact activities that drive results",
        "Happiness: Completing priorities creates sense of control and progress"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "productivity",
      popularity: 57,
      views: 1180,
      dateAdded: "2024-09-15"
    },
    {
      icon: Lightbulb,
      title: "Spend 10 Minutes Brainstorming Daily",
      description: "Regular creative thinking to generate ideas and solutions.",
      items: [
        "Health: Mental exercise that keeps cognitive abilities sharp",
        "Wealth: Creative solutions can lead to new income opportunities",
        "Happiness: Creative expression and problem-solving boost satisfaction"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "creativity",
      popularity: 42,
      views: 840,
      dateAdded: "2024-09-20"
    },
    {
      icon: Home,
      title: "Create a Morning Routine",
      description: "Consistent morning habits that set positive tone for the day.",
      items: [
        "Health: Morning exercise and nutrition create energy for the day",
        "Wealth: Productive morning habits compound into career success",
        "Happiness: Routine reduces decision fatigue and creates calm start"
      ],
      level: "Easy",
      duration: "5 min read",
      category: "productivity",
      popularity: 66,
      views: 1380,
      dateAdded: "2024-09-25"
    },
    {
      icon: Utensils,
      title: "Eat Slowly and Mindfully",
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
      views: 1080,
      dateAdded: "2024-10-01"
    },
    {
      icon: Bed,
      title: "Establish a Consistent Sleep Schedule",
      description: "Regular sleep and wake times for optimal circadian rhythm.",
      items: [
        "Health: Consistent sleep improves immune function and recovery",
        "Wealth: Better sleep improves decision-making and productivity",
        "Happiness: Quality rest enhances mood and emotional regulation"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "wellness",
      popularity: 59,
      views: 1240,
      dateAdded: "2024-10-05"
    },
    {
      icon: Camera,
      title: "Take One Photo of Something Beautiful Daily",
      description: "Train your eye to notice beauty and document positive moments.",
      items: [
        "Health: Encourages outdoor time and appreciation of surroundings",
        "Wealth: Free hobby that creates lasting memories and joy",
        "Happiness: Actively seeking beauty rewires brain for positivity"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "mindfulness",
      popularity: 38,
      views: 760,
      dateAdded: "2024-10-10"
    },
    {
      icon: Music,
      title: "Listen to Classical Music While Working",
      description: "Use instrumental music to improve focus and productivity.",
      items: [
        "Health: Reduces stress and lowers cortisol levels during work",
        "Wealth: Improved focus leads to higher quality work output",
        "Happiness: Beautiful music enhances mood and creates pleasant environment"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "productivity",
      popularity: 44,
      views: 920,
      dateAdded: "2024-10-15"
    },
    {
      icon: Gift,
      title: "Do One Random Act of Kindness",
      description: "Daily kindness practice for community building and personal joy.",
      items: [
        "Health: Helping others releases endorphins and reduces stress",
        "Wealth: Kindness builds relationships that create opportunities",
        "Happiness: Giving to others creates deep satisfaction and purpose"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "social",
      popularity: 61,
      views: 1290,
      dateAdded: "2024-10-20"
    },
    {
      icon: Star,
      title: "Review Your Goals Weekly",
      description: "Regular check-ins to stay aligned with your priorities and adjust course.",
      items: [
        "Health: Regular assessment ensures health goals stay on track",
        "Wealth: Weekly reviews prevent financial drift and maintain progress",
        "Happiness: Goal alignment creates sense of purpose and direction"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "productivity",
      popularity: 55,
      views: 1150,
      dateAdded: "2024-10-25"
    },
    {
      icon: Gamepad2,
      title: "Limit Screen Time to 2 Hours Daily",
      description: "Digital boundaries for better mental health and real-world engagement.",
      items: [
        "Health: Reduces eye strain and improves posture from less sitting",
        "Wealth: Less screen time means less exposure to advertising and impulse buying",
        "Happiness: More time for relationships and meaningful activities"
      ],
      level: "Moderate",
      duration: "5 min read",
      category: "digital",
      popularity: 48,
      views: 980,
      dateAdded: "2024-11-01"
    },
    {
      icon: ThumbsUp,
      title: "Compliment Someone Genuinely Daily",
      description: "Spread positivity while building stronger relationships.",
      items: [
        "Health: Positive interactions boost immune system and reduce stress",
        "Wealth: Good relationships create opportunities and professional network",
        "Happiness: Making others feel good creates reciprocal joy and connection"
      ],
      level: "Easy",
      duration: "2 min read",
      category: "social",
      popularity: 46,
      views: 950,
      dateAdded: "2024-11-05"
    },
    {
      icon: CheckCircle,
      title: "Complete Your Most Important Task First",
      description: "Tackle your biggest priority when energy and focus are highest.",
      items: [
        "Health: Morning exercise ensures it doesn't get skipped later",
        "Wealth: High-impact work done early drives better results",
        "Happiness: Early accomplishment creates momentum and confidence"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "productivity",
      popularity: 63,
      views: 1320,
      dateAdded: "2024-11-10"
    },
    {
      icon: Award,
      title: "Celebrate Small Wins Daily",
      description: "Acknowledge progress to maintain motivation and positive momentum.",
      items: [
        "Health: Celebrating healthy choices reinforces positive behaviors",
        "Wealth: Recognition of financial progress maintains saving motivation",
        "Happiness: Regular celebration creates positive feedback loop"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "mindfulness",
      popularity: 51,
      views: 1050,
      dateAdded: "2024-11-15"
    },
    {
      icon: Trophy,
      title: "Track One Metric That Matters",
      description: "Choose one key measurement to focus improvement efforts.",
      items: [
        "Health: Single health metric prevents overwhelm while driving progress",
        "Wealth: One financial number keeps focus on what truly impacts wealth",
        "Happiness: Measuring what matters creates clarity and purpose"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "productivity",
      popularity: 49,
      views: 1020,
      dateAdded: "2024-11-20"
    },
    {
      icon: Sparkles,
      title: "Create Weekly Financial Check-ins",
      description: "Regular money reviews to stay on track with financial goals.",
      items: [
        "Health: Financial stress reduction improves physical and mental health",
        "Wealth: Weekly attention prevents small issues from becoming big problems",
        "Happiness: Financial awareness creates security and peace of mind"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "finance",
      popularity: 56,
      views: 1180,
      dateAdded: "2024-11-25"
    },
    {
      icon: Compass,
      title: "Practice Deep Breathing for 2 Minutes Daily",
      description: "Simple breathing exercise for stress relief and mental clarity.",
      items: [
        "Health: Activates relaxation response and lowers blood pressure",
        "Wealth: Clear thinking improves decision-making in all areas",
        "Happiness: Instant stress relief and emotional regulation tool"
      ],
      level: "Easy",
      duration: "2 min read",
      category: "wellness",
      popularity: 45,
      views: 920,
      dateAdded: "2024-11-30"
    },
    {
      icon: Building,
      title: "Write Down 3 Ideas Every Day",
      description: "Daily ideation practice to boost creativity and problem-solving.",
      items: [
        "Health: Mental exercise that keeps cognitive abilities sharp",
        "Wealth: Ideas are assets that can become future income streams",
        "Happiness: Creative expression and innovation bring satisfaction"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "creativity",
      popularity: 40,
      views: 820,
      dateAdded: "2024-12-01"
    },
    {
      icon: Briefcase,
      title: "Schedule Important Tasks for Your Peak Energy Time",
      description: "Align your most challenging work with your natural energy rhythms.",
      items: [
        "Health: Working with natural rhythms reduces stress and fatigue",
        "Wealth: Peak performance on important tasks drives better results",
        "Happiness: Easier task completion when energy levels are optimal"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "productivity",
      popularity: 53,
      views: 1110,
      dateAdded: "2024-12-05"
    },
    {
      icon: GraduationCap,
      title: "Turn Waiting Time Into Learning Time",
      description: "Transform dead time into growth opportunities with mobile learning.",
      items: [
        "Health: Learn about nutrition and wellness during downtime",
        "Wealth: Study investing or skills during commutes and queues",
        "Happiness: Continuous learning creates sense of progress and growth"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "learning",
      popularity: 43,
      views: 880,
      dateAdded: "2024-12-10"
    },
    {
      icon: Palette,
      title: "Do One Push-up Every Hour",
      description: "Micro-exercise habit that builds strength throughout the day.",
      items: [
        "Health: Regular movement breaks up sedentary time effectively",
        "Wealth: Free strength training that requires no equipment",
        "Happiness: Small physical accomplishments boost energy and mood"
      ],
      level: "Easy",
      duration: "2 min read",
      category: "fitness",
      popularity: 37,
      views: 750,
      dateAdded: "2024-12-15"
    },
    {
      icon: Headphones,
      title: "Replace One Coffee with Herbal Tea",
      description: "Gradual caffeine reduction while maintaining warm drink ritual.",
      items: [
        "Health: Reduces caffeine dependency and improves sleep quality",
        "Wealth: Herbal teas often cost less than specialty coffee drinks",
        "Happiness: Maintains comforting ritual while improving health"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "health",
      popularity: 34,
      views: 690,
      dateAdded: "2024-12-20"
    },
    {
      icon: Smartphone,
      title: "Set One Tiny Goal Each Morning",
      description: "Start each day with an easily achievable target for momentum.",
      items: [
        "Health: Small health goals build into lasting lifestyle changes",
        "Wealth: Tiny financial actions compound into significant wealth",
        "Happiness: Daily accomplishments create positive momentum"
      ],
      level: "Easy",
      duration: "2 min read",
      category: "productivity",
      popularity: 48,
      views: 980,
      dateAdded: "2024-12-25"
    },
    {
      icon: Laptop,
      title: "Hug Someone You Care About Daily",
      description: "Physical affection for stress relief and relationship strengthening.",
      items: [
        "Health: Physical touch releases oxytocin and reduces cortisol",
        "Wealth: Strong relationships provide emotional and practical support",
        "Happiness: Physical affection creates immediate mood boost and connection"
      ],
      level: "Easy",
      duration: "2 min read",
      category: "social",
      popularity: 41,
      views: 850,
      dateAdded: "2024-12-30"
    },
    {
      icon: Globe,
      title: "Drink a Glass of Water Upon Waking",
      description: "Start hydration early to support metabolism and energy.",
      items: [
        "Health: Kickstarts metabolism and helps flush toxins after sleep",
        "Wealth: Free energy boost that replaces expensive morning drinks",
        "Happiness: Healthy morning habit creates positive start to day"
      ],
      level: "Easy",
      duration: "2 min read",
      category: "health",
      popularity: 52,
      views: 1080,
      dateAdded: "2025-01-01"
    },
    {
      icon: Feather,
      title: "Use a Timer for All Tasks",
      description: "Time awareness to improve focus and prevent task expansion.",
      items: [
        "Health: Prevents overwork and ensures breaks between activities",
        "Wealth: Time efficiency translates to increased productivity",
        "Happiness: Clear boundaries reduce stress and create completion satisfaction"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "productivity",
      popularity: 46,
      views: 950,
      dateAdded: "2025-01-05"
    },
    {
      icon: Gem,
      title: "Practice Smiling at Yourself in the Mirror",
      description: "Self-compassion practice for improved self-image and mood.",
      items: [
        "Health: Smiling triggers endorphin release even when forced",
        "Wealth: Positive self-image improves confidence in professional settings",
        "Happiness: Self-kindness creates foundation for overall well-being"
      ],
      level: "Easy",
      duration: "2 min read",
      category: "mindfulness",
      popularity: 33,
      views: 670,
      dateAdded: "2025-01-10"
    },
    {
      icon: Sunrise,
      title: "Plant Something Small",
      description: "Nurture life to connect with nature and create hope.",
      items: [
        "Health: Gardening provides gentle exercise and fresh air",
        "Wealth: Growing food or herbs saves money on groceries",
        "Happiness: Nurturing growth creates purpose and connection to life cycles"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "lifestyle",
      popularity: 39,
      views: 800,
      dateAdded: "2025-01-15"
    },
    {
      icon: Mountain,
      title: "Track Your Steps Daily",
      description: "Simple movement awareness to encourage more physical activity.",
      items: [
        "Health: Increased awareness naturally leads to more movement",
        "Wealth: Walking is free exercise that improves health outcomes",
        "Happiness: Achieving step goals creates sense of accomplishment"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "fitness",
      popularity: 44,
      views: 910,
      dateAdded: "2025-01-20"
    },
    {
      icon: Rocket,
      title: "Give Away One Item Daily",
      description: "Daily decluttering to create space and help others.",
      items: [
        "Health: Reduced clutter decreases stress and improves mental clarity",
        "Wealth: Discover forgotten items and prevent unnecessary purchases",
        "Happiness: Helping others through donations creates positive feelings"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "lifestyle",
      popularity: 42,
      views: 860,
      dateAdded: "2025-01-25"
    },
    {
      icon: Telescope,
      title: "Write Down One Win Each Evening",
      description: "Daily reflection on accomplishments to maintain positive perspective.",
      items: [
        "Health: Positive reflection reduces stress and improves sleep quality",
        "Wealth: Recognizing progress maintains motivation for financial goals",
        "Happiness: Celebrating daily wins creates positive thought patterns"
      ],
      level: "Easy",
      duration: "2 min read",
      category: "mindfulness",
      popularity: 47,
      views: 970,
      dateAdded: "2025-01-30"
    }
  ];

  const allTips = tipCategories.map((tip, index) => ({
    ...tip,
    index
  }));

  const filteredAndSortedTips = useMemo(() => {
    let filtered = [...allTips];
    
    // Sort tips
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
        break;
      case "oldest": 
        filtered.sort((a, b) => new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime());
        break;
      case "popular":
        filtered.sort((a, b) => b.popularity - a.popularity);
        break;
      case "views":
        filtered.sort((a, b) => b.views - a.views);
        break;
      default:
        break;
    }
    
    return filtered;
  }, [sortBy]);

  const handleAIRecommendation = (tipTitle: string) => {
    setHighlightedTip(tipTitle);
    setTimeout(() => setHighlightedTip(null), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle pt-20">
      <ChevronRipple to="#tips" label="Explore Tips" />
      
      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center space-y-8">
            <Badge variant="outline" className="mb-4 px-6 py-2 text-sm font-medium border-primary/20 text-primary hover:bg-primary/5">
              📚 Knowledge Base
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                118 Powerful Guides
              </span>
              <br />
              <span className="text-foreground">Available</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Evidence-based strategies for health, wealth, and happiness. Each guide is designed to create immediate impact and long-term transformation.
            </p>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">118</div>
                <div className="text-sm text-muted-foreground">Total Guides</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">10M+</div>
                <div className="text-sm text-muted-foreground">Total Views</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">3</div>
                <div className="text-sm text-muted-foreground">Life Areas</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Tip Finder */}
      <section className="pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <AITipFinder 
            tips={allTips} 
            onTipHighlight={handleAIRecommendation}
          />
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 items-center justify-between">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-muted-foreground" />
              <span className="text-muted-foreground font-medium">Sort & Filter</span>
            </div>
            
            <div className="flex flex-wrap gap-4 items-center">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] border-2 hover:border-primary/30 transition-colors">
                  <SelectValue placeholder="Sort by..." />
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

          {/* Tips Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredAndSortedTips.map((tip, index) => (
              <div 
                key={`${tip.title}-${index}`}
                className={`transition-all duration-500 ${
                  highlightedTip === tip.title 
                    ? 'ring-4 ring-primary/50 shadow-2xl scale-105' 
                    : ''
                }`}
              >
                <TipCard tip={tip} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tips;