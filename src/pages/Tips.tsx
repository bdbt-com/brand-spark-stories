import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import TipCard from "@/components/TipCard";
import ChevronRipple from "@/components/ChevronRipple";
import AITipFinder from "@/components/AITipFinder";
import { useDownloadCounts } from "@/hooks/useDownloadCounts";
import { 
  Heart, DollarSign, Smile, SlidersHorizontal, Filter, Dumbbell, Flame, TrendingUp,
  BarChart3, Coffee, Eye, Shield, MessageCircle, ShoppingBasket, Map, Truck, Waves,
  EyeOff, Moon, RefreshCw, Package, Droplets, Activity, Sun, Monitor, Calendar,
  Bike, Car, Zap, ArrowUp, Footprints, Trees, Play, ArrowDown, Snowflake,
  RotateCcw, Apple, Minus, Wind, Bus, Pill, Leaf, Users, XCircle, BookOpen,
  PenTool, Brain, Clock, Timer, Target, Lightbulb, Home, Utensils, Bed,
  Camera, Music, Gift, Star, Gamepad2, ThumbsUp, CheckCircle, Award, Trophy,
  Briefcase, Calculator, X
} from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import { tipKeywordMap } from "@/data/tipKeywords";

const Tips = () => {
  const [sortBy, setSortBy] = useState("newest");
  const [highlightedTip, setHighlightedTip] = useState<string | null>(null);
  const location = useLocation();
  const { keyword } = useParams<{ keyword?: string }>();
  const { data: downloadCounts } = useDownloadCounts();

  const tipCategories = [
    {
      icon: Car,
      title: "Park further away",
      description: "Simple parking strategy for effortless daily exercise.",
      items: [
        "Health: Adds 10-15 minutes of walking to daily routine",
        "Wealth: Reduces parking stress and vehicle door damage risk",
        "Happiness: Peaceful walk transitions between activities"
      ],
      level: "Easy",
      duration: "2 min read",
      category: "fitness",
      popularity: 38,
      views: 0,
      dateAdded: "2024-01-01"
    },
    {
      icon: Dumbbell,
      title: "Do calf raises while brushing your teeth",
      description: "Stack habits for efficient use of daily routine time.",
      items: [
        "Health: Strengthens calves and improves circulation",
        "Wealth: Free exercise during existing daily routine",
        "Happiness: Efficient habit stacking creates sense of productivity"
      ],
      level: "Easy",
      duration: "2 min read",
      category: "fitness",
      popularity: 36,
      views: 0,
      dateAdded: "2024-01-02"
    },
    {
      icon: ShoppingBasket,
      title: "Put it in your online basket. Wait 24 hours. Get a discount.",
      description: "Strategic online shopping for automatic discounts.",
      items: [
        "Health: Reduces impulse buying stress",
        "Wealth: Often triggers abandoned cart discounts",
        "Happiness: Satisfaction from smart shopping strategies"
      ],
      level: "Easy",
      duration: "2 min read",
      category: "finance",
      popularity: 45,
      views: 0,
      dateAdded: "2024-01-03"
    },
    {
      icon: Droplets,
      title: "Drink one extra glass of water daily",
      description: "Simple hydration improvement for immediate health benefits.",
      items: [
        "Health: Improves skin health and supports organ function",
        "Wealth: Free health improvement with zero cost",
        "Happiness: Increased energy and mental clarity"
      ],
      level: "Easy",
      duration: "2 min read",
      category: "health",
      popularity: 44,
      views: 0,
      dateAdded: "2024-01-04"
    },
    {
      icon: ShoppingBasket,
      title: "Buy Nuts in Bulk",
      description: "Smart bulk buying strategy for healthy snacking.",
      items: [
        "Health: Nutrient-dense snack always available",
        "Wealth: Significant savings through bulk purchasing",
        "Happiness: Satisfying healthy snack option ready to enjoy"
      ],
      level: "Easy",
      duration: "2 min read",
      category: "finance",
      popularity: 32,
      views: 0,
      dateAdded: "2024-01-05"
    },
    {
      icon: Apple,
      title: "Eat a Handful of Nuts Daily",
      description: "Simple daily habit for better nutrition and sustained energy.",
      items: [
        "Health: Packed with healthy fats, protein, and essential nutrients",
        "Wealth: Affordable and long-lasting pantry staple",
        "Happiness: Satisfying snack that boosts energy and mood"
      ],
      level: "Easy",
      duration: "2 min read",
      category: "health",
      popularity: 30,
      views: 0,
      dateAdded: "2026-01-08"
    },
    {
      icon: Moon,
      title: "Stretch before bed",
      description: "Evening stretching routine for better sleep and recovery.",
      items: [
        "Health: Relaxes muscles and reduces tension for deeper sleep",
        "Wealth: Free nightly routine that improves recovery",
        "Happiness: Peaceful transition from day to restful night"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "wellness",
      popularity: 40,
      views: 0,
      dateAdded: "2026-01-08"
    },
    {
      icon: Smile,
      title: "Smile at yourslf in the mirror every morning",
      description: "Self-love practice for positive day starting.",
      items: [
        "Health: Releases endorphins and reduces stress hormones",
        "Wealth: Positive mindset leads to better opportunities",
        "Happiness: Self-acceptance and mood improvement"
      ],
      level: "Easy",
      duration: "1 min read",
      category: "mindfulness",
      popularity: 37,
      views: 0,
      dateAdded: "2024-01-06"
    },
    {
      icon: Activity,
      title: "Stretch Daily",
      description: "Flexibility maintenance for injury prevention and mobility.",
      items: [
        "Health: Maintains range of motion and prevents injury",
        "Wealth: Prevents costly physical therapy through prevention",
        "Happiness: Reduces daily tension and improves comfort"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "fitness",
      popularity: 54,
      views: 0,
      dateAdded: "2024-01-07"
    },
    {
      icon: Brain,
      title: "Meditate for 2 minutes",
      description: "Quick mindfulness practice for mental clarity.",
      items: [
        "Health: Lowers blood pressure and reduces anxiety",
        "Wealth: Free mental health support with profound benefits",
        "Happiness: Inner peace and emotional regulation improvement"
      ],
      level: "Easy",
      duration: "2 min read",
      category: "mindfulness",
      popularity: 67,
      views: 0,
      dateAdded: "2024-01-08"
    },
    {
      icon: Timer,
      title: "Do one minute of deep squats per day",
      description: "Daily movement practice for hip mobility and leg strength.",
      items: [
        "Health: Improves hip flexibility and strengthens leg muscles",
        "Wealth: No equipment needed for effective exercise",
        "Happiness: Quick daily accomplishment builds confidence"
      ],
      level: "Easy",
      duration: "2 min read",
      category: "fitness",
      popularity: 42,
      views: 0,
      dateAdded: "2024-01-09"
    },
    {
      icon: Apple,
      title: "The power of frozen fruits and vegetables",
      description: "Nutritious and budget-friendly produce alternatives.",
      items: [
        "Health: Retained nutrients with convenience and longer storage",
        "Wealth: Cost-effective way to maintain healthy diet year-round",
        "Happiness: Convenience reduces meal prep stress"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "health",
      popularity: 38,
      views: 0,
      dateAdded: "2024-01-10"
    },
    {
      icon: Music,
      title: "Swap one tv episode for a ted talk or podcast",
      description: "Educational entertainment for passive learning opportunities.",
      items: [
        "Health: Mental stimulation and learning while multitasking",
        "Wealth: Free education and skill development",
        "Happiness: Engaging content that enriches knowledge"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "learning",
      popularity: 48,
      views: 0,
      dateAdded: "2024-01-11"
    },
    {
      icon: ShoppingBasket,
      title: "Always use a shopping list",
      description: "Organized shopping for budget control and efficiency.",
      items: [
        "Health: Ensures nutritious food purchases and meal planning",
        "Wealth: Prevents impulse purchases and reduces food waste",
        "Happiness: Organized approach reduces shopping stress and decisions"
      ],
      level: "Easy",
      duration: "2 min read",
      category: "productivity",
      popularity: 47,
      views: 0,
      dateAdded: "2024-01-12"
    },
    {
      icon: Footprints,
      title: "Take a short walk after meals",
      description: "Post-meal movement for improved digestion and glucose control.",
      items: [
        "Health: Improves blood sugar control and aids digestion",
        "Wealth: Free exercise that doesn't require equipment",
        "Happiness: Peaceful transition time and fresh air"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "health",
      popularity: 49,
      views: 0,
      dateAdded: "2024-01-13"
    },
    {
      icon: Trees,
      title: "50 ways to incorporate more nature into daily life",
      description: "Simple methods to connect with nature every day.",
      items: [
        "Health: Nature exposure reduces stress hormones and blood pressure",
        "Wealth: Free activities that replace expensive entertainment",
        "Happiness: Natural settings improve mood and mental clarity"
      ],
      level: "Easy",
      duration: "8 min read",
      category: "wellness",
      popularity: 48,
      views: 0,
      dateAdded: "2024-01-14"
    },
    {
      icon: Utensils,
      title: "Try and eat protein with every meal",
      description: "Protein prioritization for satiety and muscle maintenance.",
      items: [
        "Health: Supports muscle maintenance and stable blood sugar",
        "Wealth: Increased satiety reduces snacking and food costs",
        "Happiness: Stable energy levels improve mood throughout day"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "health",
      popularity: 51,
      views: 0,
      dateAdded: "2024-01-15"
    },
    {
      icon: ArrowUp,
      title: "Always take the stairs",
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
      dateAdded: "2024-01-16"
    },
    {
      icon: Package,
      title: "Buy Generic store brand products instead of name brands",
      description: "Smart shopping strategy for identical quality at lower cost.",
      items: [
        "Health: Same ingredients and quality standards as name brands",
        "Wealth: 20-40% savings on grocery bills annually",
        "Happiness: Smart spending creates satisfaction and financial freedom"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "finance",
      popularity: 48,
      views: 0,
      dateAdded: "2024-01-17"
    },
    {
      icon: Apple,
      title: "Replace at least one sugary snack with a healthier alternative",
      description: "Simple dietary swap for immediate health benefits.",
      items: [
        "Health: Reduces sugar crashes and improves energy stability",
        "Wealth: Whole foods often cost less than processed snacks",
        "Happiness: Stable blood sugar improves mood and focus"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "health",
      popularity: 45,
      views: 0,
      dateAdded: "2024-01-18"
    },
    {
      icon: Package,
      title: "Amazon subscribe and save",
      description: "Automate essential purchases for convenience and savings.",
      items: [
        "Health: Ensures consistent supply of health supplements",
        "Wealth: Automatic discounts and free shipping on essentials",
        "Happiness: Eliminates shopping stress for routine items"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "finance",
      popularity: 38,
      views: 0,
      dateAdded: "2024-01-19"
    },
    {
      icon: Activity,
      title: "Practice good posture",
      description: "Body alignment for physical health and confident presence.",
      items: [
        "Health: Reduces back pain and improves breathing efficiency",
        "Wealth: Prevents costly physical therapy and medical bills",
        "Happiness: Confident posture improves self-image and presence"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "health",
      popularity: 52,
      views: 0,
      dateAdded: "2024-01-20"
    },
    {
      icon: Wind,
      title: "Do 60 Seconds Deep Breathing Twice a Day",
      description: "Simple breathing practice for stress relief and focus.",
      items: [
        "Health: Activates parasympathetic nervous system for relaxation",
        "Wealth: Free stress management technique saves therapy costs",
        "Happiness: Immediate mood improvement and mental clarity"
      ],
      level: "Easy",
      duration: "2 min read",
      category: "wellness",
      popularity: 59,
      views: 0,
      dateAdded: "2024-01-21"
    },
    {
      icon: Eye,
      title: "Look up at the sky once a day",
      description: "Simple mindfulness practice for perspective and peace.",
      items: [
        "Health: Provides mental break and reduces eye strain",
        "Wealth: Free moment of mindfulness costs nothing",
        "Happiness: Connects with nature and provides perspective"
      ],
      level: "Easy",
      duration: "2 min read",
      category: "mindfulness",
      popularity: 34,
      views: 0,
      dateAdded: "2024-01-22"
    },
    {
      icon: Dumbbell,
      title: "Box Jumping (for Bone Health)",
      description: "Impact exercise for bone density and athletic performance.",
      items: [
        "Health: Increases bone density and prevents osteoporosis",
        "Wealth: Minimal equipment needed for significant benefits",
        "Happiness: Athletic achievement and energy boost"
      ],
      level: "Moderate",
      duration: "4 min read",
      category: "fitness",
      popularity: 41,
      views: 0,
      dateAdded: "2024-01-23"
    },
    {
      icon: Apple,
      title: "Expand your diet & improve your health",
      description: "Dietary diversity strategies for optimal nutrition and enjoyment.",
      items: [
        "Health: Wider nutrient profile supports optimal body function",
        "Wealth: Seasonal eating and variety can reduce costs",
        "Happiness: Culinary adventure and new flavors bring joy"
      ],
      level: "Moderate",
      duration: "5 min read",
      category: "health",
      popularity: 51,
      views: 0,
      dateAdded: "2024-01-24"
    },
    {
      icon: Bus,
      title: "Use Public transport to get your steps in",
      description: "Active transportation for fitness and environmental benefits.",
      items: [
        "Health: Integrates walking into necessary transportation",
        "Wealth: Saves on fuel costs and vehicle maintenance",
        "Happiness: Reading or relaxation time during transit"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "fitness",
      popularity: 42,
      views: 0,
      dateAdded: "2024-01-25"
    },
    {
      icon: Heart,
      title: "Connect with loved ones",
      description: "Prioritize relationships for emotional and physical wellbeing.",
      items: [
        "Health: Strong relationships reduce stress and boost immune system",
        "Wealth: Support network provides opportunities and assistance",
        "Happiness: Deep connections provide meaning and joy"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "social",
      popularity: 68,
      views: 0,
      dateAdded: "2024-01-26"
    },
    {
      icon: BookOpen,
      title: "Keep a notebook by your bed for random thoughts",
      description: "Capture nocturnal insights and reduce sleep disruption.",
      items: [
        "Health: Prevents sleep disruption from racing thoughts",
        "Wealth: Capture money-making ideas that come at night",
        "Happiness: Reduces anxiety about forgetting important thoughts"
      ],
      level: "Easy",
      duration: "2 min read",
      category: "productivity",
      popularity: 43,
      views: 0,
      dateAdded: "2024-01-27"
    },
    {
      icon: Footprints,
      title: "Walk During Phone Calls",
      description: "Multi-task movement for increased daily activity.",
      items: [
        "Health: Adds significant steps to daily count effortlessly",
        "Wealth: Free exercise during necessary communication",
        "Happiness: Movement improves mood and call energy"
      ],
      level: "Easy",
      duration: "2 min read",
      category: "fitness",
      popularity: 44,
      views: 0,
      dateAdded: "2024-01-28"
    },
    {
      icon: BookOpen,
      title: "Stop Buying Books and go to the Library",
      description: "Free reading resources for continuous learning.",
      items: [
        "Health: Reading reduces stress and improves mental health",
        "Wealth: Massive savings on book purchases",
        "Happiness: Access to unlimited knowledge and entertainment"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "finance",
      popularity: 42,
      views: 0,
      dateAdded: "2024-01-29"
    },
    {
      icon: Users,
      title: "Join a Community",
      description: "Social connection for support, learning, and belonging.",
      items: [
        "Health: Social connections boost immune system and longevity",
        "Wealth: Networking opportunities and shared resources",
        "Happiness: Sense of belonging and shared purpose"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "social",
      popularity: 55,
      views: 0,
      dateAdded: "2024-01-30"
    },
    {
      icon: Clock,
      title: "Wait for the Next Sale/Promo",
      description: "Patient purchasing for maximum savings.",
      items: [
        "Health: Reduces impulse buying stress",
        "Wealth: Significant savings on planned purchases",
        "Happiness: Satisfaction from smart shopping decisions"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "finance",
      popularity: 46,
      views: 0,
      dateAdded: "2024-01-31"
    },
    {
      icon: Lightbulb,
      title: "Learn something new",
      description: "Continuous learning for cognitive health and personal growth.",
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
      dateAdded: "2024-02-01"
    },
    {
      icon: Leaf,
      title: "Try Natural anxiety fixes",
      description: "Natural remedies for anxiety management and mental health.",
      items: [
        "Health: Reduces anxiety without medication side effects",
        "Wealth: Natural remedies cost less than prescription medications",
        "Happiness: Holistic approach to mental wellbeing"
      ],
      level: "Moderate",
      duration: "5 min read",
      category: "wellness",
      popularity: 55,
      views: 0,
      dateAdded: "2024-02-02"
    },
    {
      icon: Flame,
      title: "30 benefits of activating your brown fat",
      description: "Discover how brown fat activation boosts metabolism and health.",
      items: [
        "Health: Activates thermogenesis for natural calorie burning",
        "Wealth: Free metabolic boost without supplements or equipment",
        "Happiness: Increased energy and vitality from metabolic efficiency"
      ],
      level: "Moderate",
      duration: "6 min read",
      category: "health",
      popularity: 40,
      views: 0,
      dateAdded: "2024-02-03"
    },
    {
      icon: Dumbbell,
      title: "30 benefits of getting up and down from the floor without using your arms",
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
      dateAdded: "2024-02-04"
    },
    {
      icon: Map,
      title: "Free Local Events for Entertainment",
      description: "Discover free community events for entertainment and connection.",
      items: [
        "Health: Social activities improve mental health",
        "Wealth: Free entertainment saves significant money",
        "Happiness: Community connection and new experiences"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "lifestyle",
      popularity: 41,
      views: 0,
      dateAdded: "2024-02-05"
    },
    {
      icon: Monitor,
      title: "Use a standing desk at home",
      description: "Ergonomic workspace for posture and energy benefits.",
      items: [
        "Health: Reduces sitting-related health risks and improves posture",
        "Wealth: DIY options available for budget-conscious setup",
        "Happiness: Increased energy and alertness during work"
      ],
      level: "Moderate",
      duration: "4 min read",
      category: "health",
      popularity: 44,
      views: 0,
      dateAdded: "2024-02-06"
    },
    {
      icon: ShoppingBasket,
      title: "Buy 3 for 2 in bulk and store them",
      description: "Strategic bulk buying to maximize promotional offers.",
      items: [
        "Health: Ensures consistent supply of healthy essentials at home",
        "Wealth: Significant savings through promotional bulk purchases",
        "Happiness: Reduces shopping frequency and decision fatigue"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "finance",
      popularity: 40,
      views: 0,
      dateAdded: "2024-02-07"
    },
    {
      icon: Activity,
      title: "Spend time in zone 2 each week",
      description: "Aerobic base building for metabolic health and endurance.",
      items: [
        "Health: Improves fat burning and cardiovascular efficiency",
        "Wealth: Low-intensity exercise requires minimal equipment",
        "Happiness: Sustainable exercise that feels good"
      ],
      level: "Moderate",
      duration: "5 min read",
      category: "fitness",
      popularity: 47,
      views: 0,
      dateAdded: "2024-02-08"
    },
    {
      icon: Map,
      title: "Go Exploring",
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
      dateAdded: "2024-02-09"
    },
    {
      icon: Waves,
      title: "Have more baths",
      description: "Regular bathing for stress relief and self-care rituals.",
      items: [
        "Health: Muscle relaxation and improved circulation",
        "Wealth: Affordable luxury that replaces expensive spa treatments",
        "Happiness: Dedicated relaxation time improves mental health"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "wellness",
      popularity: 40,
      views: 0,
      dateAdded: "2024-02-10"
    },
    {
      icon: Dumbbell,
      title: "30 benefits of greater grip strength",
      description: "Discover how grip strength affects longevity and overall health.",
      items: [
        "Health: Strong grip correlates with cardiovascular health and longevity",
        "Wealth: Prevents costly injuries from poor grip strength",
        "Happiness: Builds confidence through functional strength"
      ],
      level: "Easy",
      duration: "5 min read",
      category: "fitness",
      popularity: 42,
      views: 0,
      dateAdded: "2024-02-11"
    },
    {
      icon: Bike,
      title: "Use your Bike/Feet Wherever Possible",
      description: "Active transportation for fitness and environmental benefits.",
      items: [
        "Health: Regular cycling improves cardiovascular health",
        "Wealth: Saves on fuel and transportation costs",
        "Happiness: Outdoor activity and exercise combined"
      ],
      level: "Moderate",
      duration: "4 min read",
      category: "fitness",
      popularity: 45,
      views: 0,
      dateAdded: "2024-02-12"
    },
    {
      icon: Coffee,
      title: "30 Reasons to drink green tea instead of water",
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
      dateAdded: "2024-02-13"
    },
    {
      icon: Truck,
      title: "Get free deliveroo plus with amazon prime",
      description: "Maximize subscription benefits for food delivery savings.",
      items: [
        "Health: Reduces cooking stress when time is limited",
        "Wealth: Free delivery saves money on food delivery fees",
        "Happiness: Convenience during busy periods reduces stress"
      ],
      level: "Easy",
      duration: "2 min read",
      category: "finance",
      popularity: 33,
      views: 0,
      dateAdded: "2024-02-14"
    },
    {
      icon: Heart,
      title: "Connect with more animals",
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
      dateAdded: "2024-02-15"
    },
    {
      icon: Dumbbell,
      title: "25 ways to prevent or delay sarcopenia",
      description: "Age-related muscle loss prevention strategies.",
      items: [
        "Health: Maintains functional strength and mobility as you age",
        "Wealth: Prevents costly falls and medical interventions",
        "Happiness: Independence and quality of life preservation"
      ],
      level: "Moderate",
      duration: "5 min read",
      category: "fitness",
      popularity: 45,
      views: 0,
      dateAdded: "2024-02-16"
    },
    {
      icon: Activity,
      title: "Start your day with movement",
      description: "Morning exercise for energy and metabolic benefits.",
      items: [
        "Health: Kickstarts metabolism and improves circulation",
        "Wealth: Free energy boost that improves productivity",
        "Happiness: Endorphin release creates positive mood"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "fitness",
      popularity: 61,
      views: 0,
      dateAdded: "2024-02-17"
    },
    {
      icon: Package,
      title: "Sell unused items",
      description: "Decluttering strategy for space and income generation.",
      items: [
        "Health: Reduces clutter stress and creates organized environment",
        "Wealth: Generate income from items gathering dust",
        "Happiness: Satisfaction from organization and extra income"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "finance",
      popularity: 50,
      views: 0,
      dateAdded: "2024-02-18"
    },
    {
      icon: Activity,
      title: "Use a Spike Mat",
      description: "Acupressure therapy for pain relief and relaxation.",
      items: [
        "Health: Natural pain relief and improved circulation",
        "Wealth: One-time purchase replaces expensive massage therapy",
        "Happiness: Relaxation and stress relief in comfort of home"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "wellness",
      popularity: 31,
      views: 0,
      dateAdded: "2024-02-19"
    },
    {
      icon: BookOpen,
      title: "Take a free online course",
      description: "Skill development through accessible digital education.",
      items: [
        "Health: Keeps mind active and engaged in learning",
        "Wealth: Free skill development that can increase earning potential",
        "Happiness: Sense of achievement and personal growth"
      ],
      level: "Moderate",
      duration: "4 min read",
      category: "learning",
      popularity: 52,
      views: 0,
      dateAdded: "2024-02-20"
    },
    {
      icon: Droplets,
      title: "Set a water intake goal",
      description: "Hydration targeting for optimal body function.",
      items: [
        "Health: Ensures adequate hydration for all body systems",
        "Wealth: Prevents dehydration-related health issues and costs",
        "Happiness: Better hydration improves energy and mood"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "health",
      popularity: 42,
      views: 0,
      dateAdded: "2024-02-21"
    },
    {
      icon: Monitor,
      title: "Limit screen time before bed",
      description: "Digital boundaries for improved sleep quality.",
      items: [
        "Health: Improves sleep quality by reducing blue light exposure",
        "Wealth: Prevents late-night online shopping impulses",
        "Happiness: Better sleep leads to improved mood and energy"
      ],
      level: "Moderate",
      duration: "4 min read",
      category: "wellness",
      popularity: 69,
      views: 0,
      dateAdded: "2024-02-22"
    },
    {
      icon: BookOpen,
      title: "Learn One Word - Osteoperosis",
      description: "Understanding bone health for prevention and longevity.",
      items: [
        "Health: Knowledge leads to better bone health practices",
        "Wealth: Prevention saves on costly medical treatments",
        "Happiness: Maintaining mobility and independence as you age"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "health",
      popularity: 35,
      views: 0,
      dateAdded: "2024-02-23"
    },
    {
      icon: ArrowUp,
      title: "Climb the stairs, go back down and up again",
      description: "Stair climbing multiplication for increased exercise benefit.",
      items: [
        "Health: Doubles the cardiovascular and strength benefits",
        "Wealth: Maximizes free exercise opportunity",
        "Happiness: Achievement satisfaction from extra effort"
      ],
      level: "Moderate",
      duration: "2 min read",
      category: "fitness",
      popularity: 33,
      views: 0,
      dateAdded: "2024-02-24"
    },
    {
      icon: TrendingUp,
      title: "Time in the market vs Timing the market",
      description: "Investment strategy for long-term wealth building.",
      items: [
        "Health: Reduces financial stress through steady growth approach",
        "Wealth: Compound growth beats market timing attempts",
        "Happiness: Peace of mind from consistent investment strategy"
      ],
      level: "Advanced",
      duration: "6 min read",
      category: "finance",
      popularity: 68,
      views: 0,
      dateAdded: "2024-02-25"
    },
    {
      icon: RefreshCw,
      title: "Reframe one thing today",
      description: "Perspective shifting for improved emotional resilience.",
      items: [
        "Health: Reduces stress through positive cognitive reframing",
        "Wealth: Better perspective leads to clearer financial decisions",
        "Happiness: Reframing challenges as opportunities improves mood"
      ],
      level: "Moderate",
      duration: "4 min read",
      category: "mindfulness",
      popularity: 48,
      views: 0,
      dateAdded: "2024-02-26"
    },
    {
      icon: EyeOff,
      title: "Hide your savings from yourself",
      description: "Psychological tricks for automatic wealth building.",
      items: [
        "Health: Reduces financial stress through automated systems",
        "Wealth: Out of sight savings grow without temptation",
        "Happiness: Surprise wealth accumulation brings joy"
      ],
      level: "Moderate",
      duration: "4 min read",
      category: "finance",
      popularity: 54,
      views: 0,
      dateAdded: "2024-02-27"
    },
    {
      icon: Snowflake,
      title: "Frozen Blueberries in evening (Brown Fat)",
      description: "Cold snack for metabolic activation and health benefits.",
      items: [
        "Health: Activates brown fat and provides antioxidants",
        "Wealth: Affordable healthy snack option",
        "Happiness: Satisfying treat that supports weight management"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "health",
      popularity: 36,
      views: 0,
      dateAdded: "2024-02-28"
    },
    {
      icon: BarChart3,
      title: "30 Ways to track your habit progress",
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
      dateAdded: "2024-03-01"
    },
    {
      icon: MessageCircle,
      title: "Create a whatsapp group with friends for a specific purpose",
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
      dateAdded: "2024-03-02"
    },
    {
      icon: ShoppingBasket,
      title: "Do food shops with handbaskets not trolleys",
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
      dateAdded: "2024-03-03"
    },
    {
      icon: Shield,
      title: "Build a 6 month emergency Buffer Fund",
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
      dateAdded: "2024-03-04"
    },
    {
      icon: Utensils,
      title: "30 reasons to swap butter for peanut butter",
      description: "Nutritional benefits of making this simple dietary swap.",
      items: [
        "Health: Higher protein content supports muscle maintenance",
        "Wealth: More filling, reducing overall food consumption",
        "Happiness: Satisfying taste makes healthy eating enjoyable"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "health",
      popularity: 28,
      views: 0,
      dateAdded: "2024-03-05"
    },
    {
      icon: Heart,
      title: "Hug Daily",
      description: "Physical affection for emotional and physiological benefits.",
      items: [
        "Health: Releases oxytocin and reduces cortisol levels",
        "Wealth: Free mood enhancement that costs nothing",
        "Happiness: Strengthens bonds and provides comfort"
      ],
      level: "Easy",
      duration: "2 min read",
      category: "wellness",
      popularity: 57,
      views: 0,
      dateAdded: "2024-03-06"
    },
    {
      icon: Bed,
      title: "Prioritise finding time to unwind, relax and recharge",
      description: "Intentional rest for sustainable energy and performance.",
      items: [
        "Health: Prevents burnout and supports recovery processes",
        "Wealth: Better decision making when well-rested saves money",
        "Happiness: Regular relaxation improves overall life satisfaction"
      ],
      level: "Moderate",
      duration: "5 min read",
      category: "wellness",
      popularity: 59,
      views: 0,
      dateAdded: "2024-03-07"
    },
    {
      icon: Droplets,
      title: "Drink warm lemon water with cayenne pepper every day",
      description: "Morning ritual for metabolism boost and digestive health.",
      items: [
        "Health: Boosts metabolism and supports digestive function",
        "Wealth: Inexpensive morning ritual with multiple benefits",
        "Happiness: Energizing start to the day with purpose"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "health",
      popularity: 38,
      views: 0,
      dateAdded: "2024-03-08"
    },
    {
      icon: Dumbbell,
      title: "Do 10 reverse lunges while watching TV",
      description: "Multi-task fitness for busy schedules and consistent exercise.",
      items: [
        "Health: Builds leg strength and improves balance",
        "Wealth: Free exercise that maximizes entertainment time",
        "Happiness: Makes TV time productive and guilt-free"
      ],
      level: "Easy",
      duration: "2 min read",
      category: "fitness",
      popularity: 41,
      views: 0,
      dateAdded: "2024-03-09"
    },
    {
      icon: BarChart3,
      title: "Why its so important to understand body compositions",
      description: "Understanding and tracking your body composition for health.",
      items: [
        "Health: Track muscle mass and fat percentage for optimal health",
        "Wealth: Home monitoring saves expensive medical assessments",
        "Happiness: Objective data improves body confidence and goals"
      ],
      level: "Moderate",
      duration: "6 min read",
      category: "health",
      popularity: 41,
      views: 0,
      dateAdded: "2024-03-10"
    },
    {
      icon: XCircle,
      title: "Do a spending freeze challenge for a week",
      description: "Temporary spending restriction to reset financial habits.",
      items: [
        "Health: Reduces shopping stress and impulse-related anxiety",
        "Wealth: Immediate savings and awareness of spending patterns",
        "Happiness: Satisfaction from self-discipline and goal achievement"
      ],
      level: "Moderate",
      duration: "4 min read",
      category: "finance",
      popularity: 53,
      views: 0,
      dateAdded: "2024-03-11"
    },
    {
      icon: DollarSign,
      title: "Have a weekly no spend day",
      description: "Designate one day per week with zero spending.",
      items: [
        "Health: Reduces stress from constant purchasing decisions",
        "Wealth: Guaranteed savings one day per week",
        "Happiness: Builds mindful spending habits"
      ],
      level: "Easy",
      duration: "2 min read",
      category: "finance",
      popularity: 40,
      views: 0,
      dateAdded: "2025-01-22"
    },
    {
      icon: Utensils,
      title: "Eat the fibre on your plate first",
      description: "Strategic eating order for better digestion and satisfaction.",
      items: [
        "Health: Improves blood sugar control and digestive health",
        "Wealth: Natural portion control reduces food costs",
        "Happiness: Better energy levels throughout the day"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "health",
      popularity: 47,
      views: 0,
      dateAdded: "2024-03-12"
    },
    {
      icon: BookOpen,
      title: "Read for 20 minutes a day",
      description: "Daily reading habit for knowledge and mental stimulation.",
      items: [
        "Health: Reduces stress and keeps mind sharp",
        "Wealth: Free education and skill development",
        "Happiness: Escapism and continuous learning bring joy"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "learning",
      popularity: 56,
      views: 0,
      dateAdded: "2024-03-13"
    },
    {
      icon: Snowflake,
      title: "Take Cold Showers",
      description: "Cold exposure for resilience and metabolic benefits.",
      items: [
        "Health: Boosts immune system and improves circulation",
        "Wealth: Reduces hot water costs and energy bills",
        "Happiness: Mental toughness and endorphin release"
      ],
      level: "Advanced",
      duration: "4 min read",
      category: "wellness",
      popularity: 56,
      views: 0,
      dateAdded: "2024-03-14"
    },
    {
      icon: Package,
      title: "Create a capsule wardrobe",
      description: "Minimalist clothing approach for simplified decisions and style.",
      items: [
        "Health: Reduces morning stress and decision fatigue",
        "Wealth: Significant savings through strategic, quality purchases",
        "Happiness: Simplified choices and consistent personal style"
      ],
      level: "Moderate",
      duration: "6 min read",
      category: "lifestyle",
      popularity: 52,
      views: 0,
      dateAdded: "2024-03-15"
    },
    {
      icon: ShoppingBasket,
      title: "Stock up on favourite beauty and skincare items when on sale",
      description: "Strategic purchasing for personal care savings.",
      items: [
        "Health: Ensures consistent skincare routine with quality products",
        "Wealth: Bulk buying during sales reduces long-term costs",
        "Happiness: Never running out of favorite products reduces stress"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "finance",
      popularity: 35,
      views: 0,
      dateAdded: "2024-03-16"
    },
    {
      icon: MessageCircle,
      title: "Say something kind to yourself out loud",
      description: "Verbal self-compassion for improved self-relationship.",
      items: [
        "Health: Reduces stress hormones and boosts confidence",
        "Wealth: Positive self-talk improves decision-making abilities",
        "Happiness: Self-kindness directly improves life satisfaction"
      ],
      level: "Easy",
      duration: "2 min read",
      category: "mindfulness",
      popularity: 49,
      views: 0,
      dateAdded: "2024-03-17"
    },
    {
      icon: Leaf,
      title: "Use Saffron as an AntiDeppresant",
      description: "Natural mood enhancement through culinary spice.",
      items: [
        "Health: Natural compounds support mood regulation",
        "Wealth: Affordable alternative to prescription antidepressants",
        "Happiness: Culinary enjoyment combined with mood benefits"
      ],
      level: "Moderate",
      duration: "4 min read",
      category: "wellness",
      popularity: 39,
      views: 0,
      dateAdded: "2024-03-18"
    },
    {
      icon: Zap,
      title: "Turn off appliances at the plug",
      description: "Energy conservation for environmental and financial benefits.",
      items: [
        "Health: Reduces electromagnetic exposure in living spaces",
        "Wealth: Eliminates phantom energy costs on electricity bills",
        "Happiness: Environmental responsibility provides satisfaction"
      ],
      level: "Easy",
      duration: "2 min read",
      category: "finance",
      popularity: 33,
      views: 0,
      dateAdded: "2024-03-19"
    },
    {
      icon: Award,
      title: "Top 88 Retail loyalty schemes for maximum savings",
      description: "Comprehensive guide to maximizing loyalty program benefits.",
      items: [
        "Health: Access to discounts on healthy food and wellness products",
        "Wealth: Significant savings through strategic loyalty program use",
        "Happiness: Reward satisfaction from maximizing everyday spending"
      ],
      level: "Easy",
      duration: "8 min read",
      category: "finance",
      popularity: 55,
      views: 0,
      dateAdded: "2024-03-20"
    },
    {
      icon: Apple,
      title: "Replace a dessert with a yogurt or fruit option",
      description: "Sweet tooth satisfaction with nutritional benefits.",
      items: [
        "Health: Provides protein and fiber instead of empty calories",
        "Wealth: Healthier options often cost less than elaborate desserts",
        "Happiness: Satisfies cravings while supporting health goals"
      ],
      level: "Easy",
      duration: "2 min read",
      category: "health",
      popularity: 41,
      views: 0,
      dateAdded: "2024-03-21"
    },
    {
      icon: Clock,
      title: "Set an hourly reminder to stand up",
      description: "Movement breaks for sedentary lifestyle counteraction.",
      items: [
        "Health: Reduces sitting-related health risks and improves circulation",
        "Wealth: Prevents expensive ergonomic injuries and treatments",
        "Happiness: Regular movement boosts energy and focus"
      ],
      level: "Easy",
      duration: "2 min read",
      category: "health",
      popularity: 46,
      views: 0,
      dateAdded: "2024-03-22"
    },
    {
      icon: TrendingUp,
      title: "Don't upgrade your lifestyle with every pay rise",
      description: "Lifestyle inflation prevention for wealth accumulation.",
      items: [
        "Health: Reduces financial stress from keeping up appearances",
        "Wealth: Accelerates savings and investment growth exponentially",
        "Happiness: Freedom from comparison and status-seeking stress"
      ],
      level: "Moderate",
      duration: "5 min read",
      category: "finance",
      popularity: 70,
      views: 0,
      dateAdded: "2024-03-23"
    },
    {
      icon: Utensils,
      title: "Chew Food More slowly",
      description: "Mindful eating practice for better digestion and satisfaction.",
      items: [
        "Health: Improves digestion and nutrient absorption",
        "Wealth: Natural portion control reduces food costs",
        "Happiness: Greater meal satisfaction and mindful enjoyment"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "health",
      popularity: 43,
      views: 0,
      dateAdded: "2024-03-24"
    },
    {
      icon: Briefcase,
      title: "Capitalise on the benefits offered by your employer",
      description: "Maximize workplace benefits for health and wealth building.",
      items: [
        "Health: Utilize health insurance, gym memberships, and wellness programs",
        "Wealth: 401k matching, stock options, and professional development",
        "Happiness: Work-life balance benefits and recognition programs"
      ],
      level: "Moderate",
      duration: "7 min read",
      category: "finance",
      popularity: 65,
      views: 0,
      dateAdded: "2024-03-25"
    },
    {
      icon: Sun,
      title: "Expose yourself to natural sunlight in the morning",
      description: "Morning light exposure for circadian rhythm optimization.",
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
      dateAdded: "2024-03-26"
    },
    {
      icon: Brain,
      title: "30 ways to reduce descision fatigue in everyday life",
      description: "Streamline daily choices to preserve mental energy.",
      items: [
        "Health: Reduces mental stress and improves sleep quality",
        "Wealth: Prevents impulse purchases through simplified systems",
        "Happiness: More energy for important decisions and creativity"
      ],
      level: "Moderate",
      duration: "7 min read",
      category: "productivity",
      popularity: 67,
      views: 0,
      dateAdded: "2024-03-27"
    },
    {
      icon: Activity,
      title: "Do 5 minutes of jumping jacks or skipping daily",
      description: "High-intensity burst for cardiovascular health and energy.",
      items: [
        "Health: Improves cardiovascular fitness and coordination",
        "Wealth: No equipment or gym membership required",
        "Happiness: Endorphin release boosts mood quickly"
      ],
      level: "Moderate",
      duration: "3 min read",
      category: "fitness",
      popularity: 45,
      views: 0,
      dateAdded: "2024-03-28"
    },
    {
      icon: Utensils,
      title: "Be more japanese eat until 80% full",
      description: "Ancient wisdom for portion control and digestive health.",
      items: [
        "Health: Improves digestion and prevents overeating",
        "Wealth: Reduces food costs through smaller portions",
        "Happiness: Increases energy levels and mental clarity"
      ],
      level: "Moderate",
      duration: "4 min read",
      category: "health",
      popularity: 44,
      views: 0,
      dateAdded: "2024-03-29"
    },
    {
      icon: Target,
      title: "Plan your day and define what success looks like",
      description: "Intentional daily planning for focused and meaningful action.",
      items: [
        "Health: Reduces stress through organized approach to daily life",
        "Wealth: Focused efforts lead to better financial outcomes",
        "Happiness: Clear direction provides sense of purpose and achievement"
      ],
      level: "Moderate",
      duration: "5 min read",
      category: "productivity",
      popularity: 64,
      views: 0,
      dateAdded: "2024-03-30"
    },
    {
      icon: Bed,
      title: "Sit in silence for 5 minutes a day",
      description: "Meditation practice for mental clarity and peace.",
      items: [
        "Health: Reduces stress hormones and lowers blood pressure",
        "Wealth: Free stress management saves on therapy costs",
        "Happiness: Inner peace and emotional regulation"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "mindfulness",
      popularity: 58,
      views: 0,
      dateAdded: "2024-03-31"
    },
    {
      icon: Brain,
      title: "Understand what high blood sugar does to your brain and body",
      description: "Education on glucose impact for better dietary choices.",
      items: [
        "Health: Knowledge leads to better blood sugar management",
        "Wealth: Prevents costly diabetes-related health complications",
        "Happiness: Stable blood sugar improves mood and cognitive function"
      ],
      level: "Moderate",
      duration: "6 min read",
      category: "health",
      popularity: 47,
      views: 0,
      dateAdded: "2024-04-01"
    },
    {
      icon: Timer,
      title: "Do a 30 second plank every day",
      description: "Minimal time commitment for maximum core strength benefits.",
      items: [
        "Health: Builds core stability and improves posture",
        "Wealth: No equipment needed for effective exercise",
        "Happiness: Quick daily achievement builds momentum"
      ],
      level: "Easy",
      duration: "2 min read",
      category: "fitness",
      popularity: 49,
      views: 0,
      dateAdded: "2024-04-02"
    },
    {
      icon: Pill,
      title: "Take supplements for what you are deficient in",
      description: "Targeted nutrition for identified deficiencies.",
      items: [
        "Health: Addresses specific nutritional gaps for optimal function",
        "Wealth: Targeted approach prevents unnecessary supplement costs",
        "Happiness: Better health leads to improved energy and mood"
      ],
      level: "Moderate",
      duration: "5 min read",
      category: "health",
      popularity: 43,
      views: 0,
      dateAdded: "2024-04-03"
    },
    {
      icon: Gamepad2,
      title: "Buy used / second hand video games",
      description: "Gaming on a budget without sacrificing entertainment value.",
      items: [
        "Health: Same entertainment benefits at reduced financial stress",
        "Wealth: 50-70% savings on gaming hobby expenses",
        "Happiness: More games accessible within budget constraints"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "finance",
      popularity: 31,
      views: 0,
      dateAdded: "2024-04-04"
    },
    {
      icon: Droplets,
      title: "Replace sugary drinks with water",
      description: "Hydration upgrade for health and financial benefits.",
      items: [
        "Health: Eliminates empty calories and reduces sugar addiction",
        "Wealth: Significant savings on beverage purchases",
        "Happiness: Stable energy without sugar crashes"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "health",
      popularity: 53,
      views: 0,
      dateAdded: "2024-04-05"
    },
    {
      icon: Calendar,
      title: "Review Your day",
      description: "Daily reflection practice for continuous improvement.",
      items: [
        "Health: Identifies stress patterns and health habit success",
        "Wealth: Tracks spending patterns and financial decisions",
        "Happiness: Celebrates wins and learns from challenges"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "productivity",
      popularity: 57,
      views: 0,
      dateAdded: "2024-04-06"
    },
    {
      icon: Droplets,
      title: "Invest in a quality water bottle",
      description: "One-time purchase for long-term hydration and savings.",
      items: [
        "Health: Encourages consistent hydration throughout the day",
        "Wealth: Eliminates costly bottled water purchases",
        "Happiness: Environmental responsibility provides satisfaction"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "health",
      popularity: 39,
      views: 0,
      dateAdded: "2024-04-07"
    },
    {
      icon: Bed,
      title: "Be more japanese sit on the floor more",
      description: "Floor sitting for flexibility and cultural mindfulness.",
      items: [
        "Health: Improves hip flexibility and core strength",
        "Wealth: No furniture costs for additional seating",
        "Happiness: Mindful practice and connection with traditional wisdom"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "wellness",
      popularity: 34,
      views: 0,
      dateAdded: "2024-04-08"
    },
    {
      icon: Utensils,
      title: "Use Spices Instead Of Salt",
      description: "Flavor enhancement with reduced sodium and added nutrients.",
      items: [
        "Health: Reduces sodium intake while adding antioxidants",
        "Wealth: Spices provide more flavor value than salt",
        "Happiness: Culinary creativity and diverse flavor experiences"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "health",
      popularity: 36,
      views: 0,
      dateAdded: "2024-04-09"
    },
    {
      icon: ShoppingBasket,
      title: "Buy from farmers markets",
      description: "Local shopping for fresher food and community connection.",
      items: [
        "Health: Fresher, more nutritious produce with fewer chemicals",
        "Wealth: Often competitive prices for higher quality food",
        "Happiness: Supports local community and builds relationships"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "health",
      popularity: 37,
      views: 0,
      dateAdded: "2024-04-10"
    },
    {
      icon: Droplets,
      title: "Add lemon to water for a vitamin C Boost",
      description: "Simple way to enhance hydration with nutritional benefits.",
      items: [
        "Health: Boosts immune system and aids in iron absorption",
        "Wealth: Affordable way to enhance plain water naturally",
        "Happiness: Refreshing taste makes hydration more enjoyable"
      ],
      level: "Easy",
      duration: "2 min read",
      category: "health",
      popularity: 32,
      views: 0,
      dateAdded: "2024-04-11"
    },
    {
      icon: Bed,
      title: "Stop compromising on sleep",
      description: "Sleep prioritization for optimal health and performance.",
      items: [
        "Health: Essential for immune function and recovery",
        "Wealth: Better decisions when well-rested save money",
        "Happiness: Quality sleep directly improves mood and energy"
      ],
      level: "Moderate",
      duration: "5 min read",
      category: "wellness",
      popularity: 73,
      views: 0,
      dateAdded: "2024-04-12"
    },
    {
      icon: PenTool,
      title: "Journal Daily",
      description: "Writing practice for mental clarity and emotional processing.",
      items: [
        "Health: Reduces stress and improves emotional regulation",
        "Wealth: Free therapy that saves on counseling costs",
        "Happiness: Self-reflection leads to greater self-awareness"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "mindfulness",
      popularity: 62,
      views: 0,
      dateAdded: "2024-04-13"
    },
    {
      icon: Activity,
      title: "Add a 5 - minute mobility routine to your day",
      description: "Quick daily movements to maintain flexibility and joint health.",
      items: [
        "Health: Prevents stiffness and maintains range of motion",
        "Wealth: Prevents costly physical therapy through prevention",
        "Happiness: Reduces daily aches and improves energy levels"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "fitness",
      popularity: 45,
      views: 0,
      dateAdded: "2024-04-14"
    },
    {
      icon: Package,
      title: "Borrow Or Rent Items",
      description: "Share economy strategies for sustainable and affordable living.",
      items: [
        "Health: Reduces clutter stress and promotes minimalism",
        "Wealth: Significant savings on infrequently used items",
        "Happiness: Less maintenance and storage stress"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "finance",
      popularity: 35,
      views: 0,
      dateAdded: "2024-04-15"
    },
    {
      icon: MessageCircle,
      title: "Practice positive self talk",
      description: "Internal dialogue improvement for confidence and resilience.",
      items: [
        "Health: Reduces stress hormones and boosts immune function",
        "Wealth: Positive mindset leads to better decision making",
        "Happiness: Self-compassion improves overall life satisfaction"
      ],
      level: "Moderate",
      duration: "4 min read",
      category: "mindfulness",
      popularity: 63,
      views: 0,
      dateAdded: "2024-04-16"
    },
    {
      icon: Home,
      title: "Declutter your living and working spaces",
      description: "Organization strategies for improved productivity and peace.",
      items: [
        "Health: Reduces stress and improves sleep quality",
        "Wealth: Discover forgotten items and prevent duplicate purchases",
        "Happiness: Clear space creates mental clarity and calm"
      ],
      level: "Moderate",
      duration: "5 min read",
      category: "lifestyle",
      popularity: 58,
      views: 0,
      dateAdded: "2024-04-17"
    },
    {
      icon: Heart,
      title: "Practice gratitude",
      description: "Daily appreciation practice for mental and emotional wellbeing.",
      items: [
        "Health: Reduces stress and improves immune function",
        "Wealth: Appreciation for what you have reduces spending urges",
        "Happiness: Scientifically proven to increase life satisfaction"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "mindfulness",
      popularity: 71,
      views: 0,
      dateAdded: "2024-04-18"
    },
    {
      icon: XCircle,
      title: "Learn to say No",
      description: "Boundary setting for time and energy management.",
      items: [
        "Health: Reduces stress from overcommitment and burnout",
        "Wealth: Prevents costly obligations and time waste",
        "Happiness: Alignment with values and priorities"
      ],
      level: "Moderate",
      duration: "5 min read",
      category: "productivity",
      popularity: 66,
      views: 0,
      dateAdded: "2024-04-19"
    },
    {
      icon: Dumbbell,
      title: "30 benefits of using an ab roller",
      description: "Core strengthening benefits of this simple exercise tool.",
      items: [
        "Health: Builds functional core strength for daily activities",
        "Wealth: Affordable equipment with maximum fitness impact",
        "Happiness: Quick workouts that fit any schedule"
      ],
      level: "Moderate",
      duration: "4 min read",
      category: "fitness",
      popularity: 35,
      views: 0,
      dateAdded: "2024-04-20"
    },
    {
      icon: ShoppingBasket,
      title: "Use the Too Good To Go App",
      description: "Food waste reduction for savings and environmental impact.",
      items: [
        "Health: Access to quality food at reduced prices",
        "Wealth: Significant savings on restaurant and bakery items",
        "Happiness: Environmental responsibility and discovery of new foods"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "finance",
      popularity: 42,
      views: 0,
      dateAdded: "2024-04-21"
    },
    {
      icon: Footprints,
      title: "50 ways to walk more in a day",
      description: "Practical strategies to increase daily step count effortlessly.",
      items: [
        "Health: Improves cardiovascular health and joint mobility",
        "Wealth: Free exercise that replaces expensive gym memberships",
        "Happiness: Walking boosts mood through endorphin release"
      ],
      level: "Easy",
      duration: "8 min read",
      category: "fitness",
      popularity: 55,
      views: 0,
      dateAdded: "2024-04-22"
    },
    {
      icon: Wind,
      title: "Breath deeply for 60 seconds, twice a day",
      description: "Simple breathing practice for stress relief and focus.",
      items: [
        "Health: Activates parasympathetic nervous system for relaxation",
        "Wealth: Free stress management technique saves therapy costs",
        "Happiness: Immediate mood improvement and mental clarity"
      ],
      level: "Easy",
      duration: "2 min read",
      category: "wellness",
      popularity: 59,
      views: 0,
      dateAdded: "2024-04-23"
    },
    {
      icon: Pill,
      title: "Try Generic Medication Brands",
      description: "Cost-effective healthcare through generic alternatives.",
      items: [
        "Health: Same active ingredients as brand names",
        "Wealth: 70-90% savings on prescription medications",
        "Happiness: Affordable healthcare reduces financial stress"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "finance",
      popularity: 41,
      views: 0,
      dateAdded: "2024-04-24"
    },
    {
      icon: Users,
      title: "30 benefits of doing chores with friends",
      description: "Transform mundane tasks into social connection opportunities.",
      items: [
        "Health: Physical activity while maintaining social bonds",
        "Wealth: Shared effort reduces individual time and cost burdens",
        "Happiness: Making chores enjoyable through companionship"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "wellness",
      popularity: 36,
      views: 0,
      dateAdded: "2024-04-25"
    },
    {
      icon: ShoppingBasket,
      title: "Wait 24 Hours before Clicking Buy",
      description: "Smart shopping strategy to avoid impulse purchases and save money.",
      items: [
        "Health: Reduces stress from buyer's remorse",
        "Wealth: Prevents impulse purchases and saves money",
        "Happiness: Greater satisfaction from mindful spending"
      ],
      level: "Easy",
      duration: "2 min read",
      category: "finance",
      popularity: 42,
      views: 0,
      dateAdded: "2025-01-06"
    },
    {
      icon: Zap,
      title: "Use energy efficient devices at home",
      description: "Save money and reduce environmental impact with efficient appliances.",
      items: [
        "Health: Better air quality and reduced noise from efficient appliances",
        "Wealth: Lower electricity bills and longer-lasting devices",
        "Happiness: Eco-friendly choices create peace of mind"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "finance",
      popularity: 40,
      views: 0,
      dateAdded: "2026-01-30"
    },
    {
      icon: Calculator,
      title: "Do a financial health check every 3 months",
      description: "Regular financial reviews to stay on track with your money goals.",
      items: [
        "Health: Reduces financial stress and anxiety",
        "Wealth: Identifies savings opportunities and spending leaks",
        "Happiness: Confidence and control over your financial future"
      ],
      level: "Moderate",
      duration: "4 min read",
      category: "finance",
      popularity: 38,
      views: 0,
      dateAdded: "2026-02-10"
    },
    {
      icon: Target,
      title: "Be more japanese, find your strong sense of life purpose",
      description: "Discover your Ikigai and align your daily actions with deeper meaning.",
      items: [
        "Health: Purpose-driven living linked to longer lifespan",
        "Wealth: Clarity of purpose improves career and financial decisions",
        "Happiness: Deep fulfilment from living with intention"
      ],
      level: "Intermediate",
      duration: "5 min read",
      category: "mindfulness",
      popularity: 44,
      views: 0,
      dateAdded: "2026-02-10"
    },
    {
      icon: Flame,
      title: "Get your lunges in while vacuuming",
      description: "Turn household chores into effective lower body workouts.",
      items: [
        "Health: Strengthens legs, glutes and improves balance",
        "Wealth: Free workout during a task you already do",
        "Happiness: Sense of productivity from combining exercise with chores"
      ],
      level: "Easy",
      duration: "2 min read",
      category: "fitness",
      popularity: 35,
      views: 0,
      dateAdded: "2026-02-10"
    },
    {
      icon: Leaf,
      title: "Take up meditation",
      description: "Build a consistent meditation practice for lasting mental clarity.",
      items: [
        "Health: Reduces cortisol, lowers blood pressure and boosts immunity",
        "Wealth: Improved focus leads to better decision-making",
        "Happiness: Greater emotional resilience and inner peace"
      ],
      level: "Beginner",
      duration: "4 min read",
      category: "mindfulness",
      popularity: 52,
      views: 0,
      dateAdded: "2026-02-10"
    },
    {
      icon: Monitor,
      title: "Say goodbye to netflix, prime & binge watching",
      description: "Reclaim hours of your life by breaking the binge watching habit.",
      items: [
        "Health: Better sleep quality and reduced eye strain",
        "Wealth: Save on multiple streaming subscriptions",
        "Happiness: More time for meaningful activities and connections"
      ],
      level: "Moderate",
      duration: "4 min read",
      category: "wellness",
      popularity: 40,
      views: 0,
      dateAdded: "2026-02-10"
    },
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

  // Handle navigation from carousel clicks
  useEffect(() => {
    const state = location.state as { highlightTip?: string } | null;
    if (state?.highlightTip) {
      // Wait for components to render, then find and scroll to the tip
      setTimeout(() => {
        const element = document.querySelector(`[data-tip-title="${state.highlightTip}"]`);
        if (element) {
          setHighlightedTip(state.highlightTip);
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Clear the highlighting after 3 seconds
          setTimeout(() => setHighlightedTip(null), 3000);
        }
      }, 500); // Small delay to ensure all components are rendered
      
      // Clear the navigation state to prevent repeat triggers
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Handle URL keyword parameter for direct tip links
  useEffect(() => {
    if (keyword) {
      const normalizeSearchTerm = (term: string): string => {
        return term.toLowerCase()
          .replace(/[-_\s]/g, '')
          .replace(/['"]/g, '');
      };
      
      const keywordNormalized = normalizeSearchTerm(keyword);
      const matchedKeyword = Object.keys(tipKeywordMap).find(
        key => normalizeSearchTerm(key) === keywordNormalized
      );
      
      if (matchedKeyword) {
        const tipTitle = tipKeywordMap[matchedKeyword];
        
        // Mobile and iOS detection
        const isMobile = window.innerWidth < 768;
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const scrollDelay = isMobile ? 800 : 500;
        
        // Retry mechanism for elements that may not be rendered yet
        const scrollWithRetry = (attempts = 0) => {
          // Case-insensitive element matching for keyword-title lookup
          const allTipElements = document.querySelectorAll('[data-tip-title]');
          const element = Array.from(allTipElements).find(el => 
            el.getAttribute('data-tip-title')?.toLowerCase() === tipTitle.toLowerCase()
          ) as HTMLElement;
          
          if (element) {
            handleTipHighlight(tipTitle);
            
            if (isIOS) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              element.offsetHeight;
              setTimeout(() => {
                window.scrollBy({ top: -60, behavior: 'smooth' });
              }, 400);
            } else if (isMobile) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              setTimeout(() => {
                window.scrollBy({ top: -80, behavior: 'smooth' });
              }, 600);
            } else {
              element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          } else if (attempts < 5) {
            setTimeout(() => scrollWithRetry(attempts + 1), 200);
          }
        };
        
        setTimeout(scrollWithRetry, scrollDelay);
      }
    }
  }, [keyword]);

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
              Simple Daily Wins that silently transform your health, wealth, and happiness simultaneously.
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
                data-tip-title={tip.title}
                className={`animate-fade-in transition-all duration-300 ${
                  highlightedTip === tip.title 
                    ? 'shadow-[0_0_0_4px_rgba(59,130,246,0.6)] md:shadow-[0_0_0_4px_rgba(59,130,246,0.5)] ring-4 ring-blue-400/30 rounded-lg scale-[1.02]' 
                    : ''
                }`}
                style={{ animationDelay: `${400 + index * 100}ms` }}
              >
                <div className="w-full">
                  <TipCard 
                    tip={tip} 
                    index={index} 
                    downloadCount={downloadCounts?.[tip.title]}
                  />
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
          <div className="mt-20 text-center bg-warning text-white rounded-2xl p-6 sm:p-12 border-4 border-warning/40">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">
              Want More Life-Changing Strategies?
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto px-4">
              Get the complete BDBT system with your personalised blueprint and start implementing these tips today.
            </p>
            <Button variant="colored-bg" size="lg" asChild className="w-full sm:w-auto">
              <Link to="/blueprint">Download Your Blueprint</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tips;