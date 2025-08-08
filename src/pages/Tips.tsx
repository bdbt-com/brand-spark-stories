import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TipCard from "@/components/TipCard";
import ChevronRipple from "@/components/ChevronRipple";
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
      category: "wealth", // Changed from happiness to wealth
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
      duration: "4 min read",
      category: "health",
      popularity: 45,
      views: 1050,
      dateAdded: "2024-05-01"
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
      duration: "4 min read",
      category: "wealth",
      popularity: 37,
      views: 890,
      dateAdded: "2024-05-05"
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
      duration: "6 min read",
      category: "health",
      popularity: 52,
      views: 1280,
      dateAdded: "2024-05-10"
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
      duration: "3 min read",
      category: "health",
      popularity: 29,
      views: 720,
      dateAdded: "2024-05-15"
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
      duration: "3 min read",
      category: "happiness",
      popularity: 64,
      views: 1450,
      dateAdded: "2024-05-20"
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
      duration: "4 min read",
      category: "health",
      popularity: 71,
      views: 1630,
      dateAdded: "2024-05-25"
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
      duration: "3 min read",
      category: "health",
      popularity: 58,
      views: 1340,
      dateAdded: "2024-05-30"
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
      duration: "4 min read",
      category: "health",
      popularity: 49,
      views: 1150,
      dateAdded: "2024-06-01"
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
      duration: "6 min read",
      category: "wealth",
      popularity: 66,
      views: 1520,
      dateAdded: "2024-06-05"
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
      duration: "3 min read",
      category: "wealth",
      popularity: 43,
      views: 1020,
      dateAdded: "2024-06-10"
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
      duration: "3 min read",
      category: "happiness",
      popularity: 77,
      views: 1780,
      dateAdded: "2024-06-15"
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
      duration: "3 min read",
      category: "health",
      popularity: 54,
      views: 1260,
      dateAdded: "2024-06-20"
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
      duration: "5 min read",
      category: "happiness",
      popularity: 62,
      views: 1430,
      dateAdded: "2024-06-25"
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
      duration: "3 min read",
      category: "wealth", // Changed from happiness to wealth
      popularity: 48,
      views: 1120,
      dateAdded: "2024-06-30"
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
      duration: "3 min read",
      category: "health",
      popularity: 39,
      views: 920,
      dateAdded: "2024-07-01"
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
      duration: "3 min read",
      category: "wealth",
      popularity: 33,
      views: 810,
      dateAdded: "2024-07-05"
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
      duration: "4 min read",
      category: "wealth",
      popularity: 42,
      views: 980,
      dateAdded: "2024-07-10"
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
      duration: "4 min read",
      category: "health",
      popularity: 69,
      views: 1590,
      dateAdded: "2024-07-15"
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
      duration: "4 min read",
      category: "health",
      popularity: 56,
      views: 1310,
      dateAdded: "2024-07-20"
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
      duration: "3 min read",
      category: "health",
      popularity: 47,
      views: 1100,
      dateAdded: "2024-07-25"
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
      duration: "3 min read",
      category: "happiness",
      popularity: 72,
      views: 1670,
      dateAdded: "2024-07-30"
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
      duration: "4 min read",
      category: "health",
      popularity: 51,
      views: 1190,
      dateAdded: "2024-08-01"
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
      duration: "2 min read",
      category: "wealth", // Changed from happiness to wealth
      popularity: 38,
      views: 890,
      dateAdded: "2024-08-05"
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
      duration: "4 min read",
      category: "wealth",
      popularity: 34,
      views: 820,
      dateAdded: "2024-08-10"
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
      duration: "3 min read",
      category: "wealth",
      popularity: 25,
      views: 650,
      dateAdded: "2024-08-15"
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
      duration: "4 min read",
      category: "health",
      popularity: 59,
      views: 1370,
      dateAdded: "2024-08-20"
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
      duration: "3 min read",
      category: "happiness",
      popularity: 73,
      views: 1690,
      dateAdded: "2024-08-25"
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
      duration: "3 min read",
      category: "wealth",
      popularity: 46,
      views: 1080,
      dateAdded: "2024-08-30"
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
      duration: "3 min read",
      category: "wealth", // Changed from happiness to wealth
      popularity: 55,
      views: 1290,
      dateAdded: "2024-09-01"
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
      duration: "5 min read",
      category: "happiness",
      popularity: 67,
      views: 1550,
      dateAdded: "2024-09-05"
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
      duration: "6 min read",
      category: "happiness",
      popularity: 61,
      views: 1420,
      dateAdded: "2024-09-10"
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
      duration: "3 min read",
      category: "happiness",
      popularity: 44,
      views: 1040,
      dateAdded: "2024-09-15"
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
      duration: "4 min read",
      category: "health",
      popularity: 31,
      views: 760,
      dateAdded: "2024-09-20"
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
      duration: "4 min read",
      category: "health",
      popularity: 36,
      views: 850,
      dateAdded: "2024-09-25"
    },
    {
      icon: Dumbbell,
      title: "30 Benefits of Greater Grip Strength",
      description: "Comprehensive guide to building functional grip strength and its health benefits.",
      items: [
        "Improves overall upper body strength significantly",
        "Enhances athletic performance in multiple sports",
        "Strong predictor of longevity and health"
      ],
      level: "Moderate",
      duration: "6 min read",
      category: "health",
      popularity: 41,
      views: 950,
      dateAdded: "2024-10-01"
    },
    {
      icon: Activity,
      title: "30 Benefits of Using an AB Roller",
      description: "Master the ab roller for core strength and full-body stability.",
      items: [
        "Targets entire core including deep muscles",
        "Improves functional movement patterns",
        "Builds impressive core strength efficiently"
      ],
      level: "Hard",
      duration: "7 min read",
      category: "health",
      popularity: 38,
      views: 880,
      dateAdded: "2024-10-02"
    },
    {
      icon: Apple,
      title: "30 Reasons to Swap Butter for Peanut Butter",
      description: "Nutritional comparison and health benefits of making the switch.",
      items: [
        "Higher protein content for satiety",
        "Heart-healthy monounsaturated fats",
        "More micronutrients per serving"
      ],
      level: "Easy",
      duration: "5 min read",
      category: "health",
      popularity: 35,
      views: 820,
      dateAdded: "2024-10-03"
    },
    {
      icon: Brain,
      title: "30 Ways to Reduce Decision Fatigue in Everyday Life",
      description: "Streamline choices to preserve mental energy for what matters.",
      items: [
        "Create daily routine templates",
        "Batch similar decisions together",
        "Automate recurring choices"
      ],
      level: "Moderate",
      duration: "6 min read",
      category: "happiness",
      popularity: 58,
      views: 1340,
      dateAdded: "2024-10-04"
    },
    {
      icon: Footprints,
      title: "50 Ways to Walk More in a Day",
      description: "Creative strategies to increase daily steps without formal exercise.",
      items: [
        "Take phone calls while walking",
        "Park at far end of lots",
        "Use stairs instead of elevators"
      ],
      level: "Easy",
      duration: "7 min read",
      category: "health",
      popularity: 52,
      views: 1210,
      dateAdded: "2024-10-05"
    },
    {
      icon: Trees,
      title: "50 Ways to Incorporate Nature into Your Daily Life",
      description: "Bring the outdoors inside and connect with nature anywhere.",
      items: [
        "Add plants to your workspace",
        "Listen to nature sounds while working",
        "Take breaks in green spaces"
      ],
      level: "Easy",
      duration: "8 min read",
      category: "happiness",
      popularity: 46,
      views: 1070,
      dateAdded: "2024-10-06"
    },
    {
      icon: Zap,
      title: "Add 5-Minute Mobility Routine to Your Day",
      description: "Quick daily mobility flow to combat stiffness and improve movement.",
      items: [
        "Focus on problem areas first",
        "Perfect for morning or evening",
        "Requires no equipment or space"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "health",
      popularity: 49,
      views: 1150,
      dateAdded: "2024-10-07"
    },
    {
      icon: Droplets,
      title: "Add Lemon to Water for a Vitamin C Boost",
      description: "Simple hydration upgrade with immune and digestive benefits.",
      items: [
        "Supports immune system naturally",
        "Aids digestion and metabolism",
        "Adds flavor without calories"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "health",
      popularity: 43,
      views: 1000,
      dateAdded: "2024-10-08"
    },
    {
      icon: Sun,
      title: "Be More Japanese: Eat Until 80% Full",
      description: "Practice Hara Hachi Bu for better digestion and weight management.",
      items: [
        "Improves digestion significantly",
        "Natural portion control method",
        "Reduces post-meal fatigue"
      ],
      level: "Moderate",
      duration: "5 min read",
      category: "health",
      popularity: 55,
      views: 1280,
      dateAdded: "2024-10-09"
    },
    {
      icon: Heart,
      title: "Be More Japanese: Find Your Strong Sense of Life Purpose",
      description: "Discover your Ikigai for a more meaningful and fulfilling life.",
      items: [
        "Combines passion with mission",
        "Creates sense of direction",
        "Improves mental wellbeing"
      ],
      level: "Moderate",
      duration: "8 min read",
      category: "happiness",
      popularity: 67,
      views: 1550,
      dateAdded: "2024-10-10"
    },
    {
      icon: BarChart3,
      title: "Body Composition",
      description: "Understanding muscle vs fat ratios for optimal health outcomes.",
      items: [
        "Focus on muscle preservation",
        "Track strength not just weight",
        "Optimize protein intake timing"
      ],
      level: "Moderate",
      duration: "6 min read",
      category: "health",
      popularity: 44,
      views: 1020,
      dateAdded: "2024-10-11"
    },
    {
      icon: Package,
      title: "Borrow or Rent Items",
      description: "Save money and space by accessing instead of owning.",
      items: [
        "Use library tool lending programs",
        "Rent specialized equipment as needed",
        "Share items with neighbors"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "wealth",
      popularity: 39,
      views: 920,
      dateAdded: "2024-10-12"
    },
    {
      icon: ShoppingBasket,
      title: "Buy from Farmers' Markets",
      description: "Get fresher produce while supporting local agriculture.",
      items: [
        "Seasonal produce at peak nutrition",
        "Often cheaper than supermarkets",
        "Builds community connections"
      ],
      level: "Easy",
      duration: "5 min read",
      category: "wealth",
      popularity: 42,
      views: 980,
      dateAdded: "2024-10-13"
    },
    {
      icon: Package,
      title: "Buy Generic/Store-Brand Products Instead of Big Name Brands",
      description: "Same quality products at fraction of the cost.",
      items: [
        "Often made by same manufacturers",
        "Save 20-40% on grocery bills",
        "Check ingredient lists for verification"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "wealth",
      popularity: 47,
      views: 1100,
      dateAdded: "2024-10-14"
    },
    {
      icon: Play,
      title: "Buy Used/Second-Hand Video Games",
      description: "Gaming on a budget without sacrificing entertainment quality.",
      items: [
        "Save 50-70% on popular titles",
        "Check condition before purchase",
        "Digital marketplaces offer guarantees"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "wealth",
      popularity: 31,
      views: 740,
      dateAdded: "2024-10-15"
    },
    {
      icon: TrendingUp,
      title: "Capitalise on the Benefits Offered by Your Employer",
      description: "Maximize workplace perks and benefits for financial gain.",
      items: [
        "Review all available benefits annually",
        "Use health savings accounts maximally",
        "Take advantage of employer matching"
      ],
      level: "Moderate",
      duration: "6 min read",
      category: "wealth",
      popularity: 56,
      views: 1300,
      dateAdded: "2024-10-16"
    },
    {
      icon: Apple,
      title: "Chew Food More Slowly",
      description: "Improve digestion and satiety through mindful eating practices.",
      items: [
        "Put fork down between bites",
        "Chew each bite 20-30 times",
        "Reduces overeating naturally"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "health",
      popularity: 48,
      views: 1120,
      dateAdded: "2024-10-17"
    },
    {
      icon: Smile,
      title: "Create a Capsule Wardrobe",
      description: "Simplify clothing choices while reducing spending.",
      items: [
        "Choose versatile, quality pieces",
        "Stick to 2-3 color palette",
        "Reduces decision fatigue daily"
      ],
      level: "Moderate",
      duration: "7 min read",
      category: "wealth",
      popularity: 45,
      views: 1050,
      dateAdded: "2024-10-18"
    },
    {
      icon: Package,
      title: "Declutter Your Living and Working Spaces",
      description: "Clear spaces for mental clarity and improved productivity.",
      items: [
        "Start with one drawer or area",
        "Use one-year rule for items",
        "Donate items in good condition"
      ],
      level: "Easy",
      duration: "5 min read",
      category: "happiness",
      popularity: 61,
      views: 1420,
      dateAdded: "2024-10-19"
    },
    {
      icon: Dumbbell,
      title: "Do 10 Reverse Lunges While Watching TV",
      description: "Strengthen legs and glutes during leisure time.",
      items: [
        "Alternate legs for each set",
        "Focus on controlled movement",
        "Perfect multitasking exercise"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "health",
      popularity: 37,
      views: 860,
      dateAdded: "2024-10-20"
    },
    {
      icon: Activity,
      title: "Do 30-Second Plank Every Day",
      description: "Build core strength with minimal time investment.",
      items: [
        "Start with modified version if needed",
        "Focus on proper form over duration",
        "Gradually increase hold time"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "health",
      popularity: 54,
      views: 1260,
      dateAdded: "2024-10-21"
    },
    {
      icon: Zap,
      title: "Do 5 Minutes of Jumping Jacks or Skipping Daily",
      description: "Quick cardio burst for heart health and energy.",
      items: [
        "Excellent warm-up exercise",
        "Improves coordination significantly",
        "Burns calories efficiently"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "health",
      popularity: 46,
      views: 1070,
      dateAdded: "2024-10-22"
    },
    {
      icon: Calendar,
      title: "Do a Spending Freeze Challenge for a Week",
      description: "Reset spending habits with a temporary purchasing pause.",
      items: [
        "Only buy essential needs",
        "Track urges to spend",
        "Discover wants vs needs clearly"
      ],
      level: "Moderate",
      duration: "4 min read",
      category: "wealth",
      popularity: 53,
      views: 1230,
      dateAdded: "2024-10-23"
    },
    {
      icon: Dumbbell,
      title: "Do One Minute of Deep Squats per Day",
      description: "Improve hip mobility and leg strength with daily practice.",
      items: [
        "Hold deep squat position",
        "Focus on ankle and hip mobility",
        "Great for desk workers"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "health",
      popularity: 41,
      views: 950,
      dateAdded: "2024-10-24"
    },
    {
      icon: Droplets,
      title: "Drink Warm Lemon Water with Cayenne Pepper Every Day",
      description: "Morning metabolism booster with detox benefits.",
      items: [
        "Kickstarts metabolism naturally",
        "Supports immune system function",
        "Aids natural detoxification"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "health",
      popularity: 39,
      views: 910,
      dateAdded: "2024-10-25"
    },
    {
      icon: Apple,
      title: "Eat the Fibre on Your Plate First",
      description: "Strategic eating order for better blood sugar control.",
      items: [
        "Vegetables first, then protein",
        "Carbohydrates consumed last",
        "Improves glucose response significantly"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "health",
      popularity: 44,
      views: 1020,
      dateAdded: "2024-10-26"
    },
    {
      icon: Sun,
      title: "Expose Yourself to Natural Sunlight in the Morning",
      description: "Reset circadian rhythm with morning light exposure.",
      items: [
        "Within 30 minutes of waking",
        "10-15 minutes minimum exposure",
        "Improves sleep quality at night"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "health",
      popularity: 57,
      views: 1320,
      dateAdded: "2024-10-27"
    },
    {
      icon: Apple,
      title: "Expand Your Diet to Improve Your Health",
      description: "Diversify nutrition with new foods and cooking methods.",
      items: [
        "Try one new vegetable weekly",
        "Experiment with different cuisines",
        "Focus on colorful whole foods"
      ],
      level: "Moderate",
      duration: "6 min read",
      category: "health",
      popularity: 50,
      views: 1160,
      dateAdded: "2024-10-28"
    },
    {
      icon: Heart,
      title: "Hug Daily",
      description: "Physical affection for emotional and physical health benefits.",
      items: [
        "Releases oxytocin naturally",
        "Reduces stress and anxiety",
        "Strengthens relationships significantly"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "happiness",
      popularity: 62,
      views: 1440,
      dateAdded: "2024-10-29"
    },
    {
      icon: Droplets,
      title: "Invest in a Quality Water Bottle",
      description: "Hydration infrastructure for consistent water intake.",
      items: [
        "Choose insulated stainless steel",
        "Track intake with marked bottles",
        "Reduces plastic waste significantly"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "health",
      popularity: 40,
      views: 930,
      dateAdded: "2024-10-30"
    },
    {
      icon: PenTool,
      title: "Journal Daily",
      description: "Process thoughts and emotions through daily writing practice.",
      items: [
        "Start with just 5 minutes",
        "Stream-of-consciousness writing works",
        "Improves mental clarity significantly"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "happiness",
      popularity: 65,
      views: 1510,
      dateAdded: "2024-10-31"
    },
    {
      icon: XCircle,
      title: "Learn to Say No",
      description: "Boundary setting for time and energy management.",
      items: [
        "Practice polite declining phrases",
        "Prioritize important commitments",
        "Reduces overwhelm significantly"
      ],
      level: "Moderate",
      duration: "5 min read",
      category: "happiness",
      popularity: 69,
      views: 1600,
      dateAdded: "2024-11-01"
    },
    {
      icon: Calendar,
      title: "Plan Your Day & Define What Success Looks Like",
      description: "Daily planning framework for purposeful productivity.",
      items: [
        "Define 3 key priorities",
        "Schedule important tasks first",
        "Review progress each evening"
      ],
      level: "Moderate",
      duration: "5 min read",
      category: "happiness",
      popularity: 72,
      views: 1670,
      dateAdded: "2024-11-02"
    },
    {
      icon: Heart,
      title: "Practice Gratitude",
      description: "Daily appreciation practice for improved mental wellbeing.",
      items: [
        "Write three things daily",
        "Be specific about reasons",
        "Share gratitude with others"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "happiness",
      popularity: 75,
      views: 1740,
      dateAdded: "2024-11-03"
    },
    {
      icon: Smile,
      title: "Practice Positive Self-Talk",
      description: "Reframe internal dialogue for improved self-confidence.",
      items: [
        "Notice negative thought patterns",
        "Replace criticism with curiosity",
        "Speak to yourself kindly"
      ],
      level: "Moderate",
      duration: "5 min read",
      category: "happiness",
      popularity: 68,
      views: 1580,
      dateAdded: "2024-11-04"
    },
    {
      icon: Waves,
      title: "Prioritise Finding Time to Unwind, Relax and Recharge",
      description: "Schedule rest as essential for sustainable productivity.",
      items: [
        "Block time for relaxation",
        "Choose activities that truly restore",
        "Protect downtime from interruptions"
      ],
      level: "Moderate",
      duration: "5 min read",
      category: "happiness",
      popularity: 64,
      views: 1480,
      dateAdded: "2024-11-05"
    },
    {
      icon: BookOpen,
      title: "Read for 20 Minutes a Day",
      description: "Build reading habit for continuous learning and growth.",
      items: [
        "Choose topics that interest you",
        "Keep book visible as reminder",
        "Track progress for motivation"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "happiness",
      popularity: 59,
      views: 1370,
      dateAdded: "2024-11-06"
    },
    {
      icon: Apple,
      title: "Replace a Dessert with a Yogurt or Fruit Option",
      description: "Healthier dessert swaps without feeling deprived.",
      items: [
        "Greek yogurt with berries",
        "Frozen fruit for ice cream substitute",
        "Dark chocolate as occasional treat"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "health",
      popularity: 43,
      views: 1000,
      dateAdded: "2024-11-07"
    },
    {
      icon: Droplets,
      title: "Replace Sugary Drinks with Water",
      description: "Hydration upgrade for better health and budget.",
      items: [
        "Infuse water with fruits",
        "Sparkling water for variety",
        "Gradual reduction prevents cravings"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "health",
      popularity: 51,
      views: 1190,
      dateAdded: "2024-11-08"
    },
    {
      icon: Calendar,
      title: "Review Your Day",
      description: "Evening reflection practice for continuous improvement.",
      items: [
        "What went well today?",
        "What could be improved?",
        "Plan tomorrow's priorities"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "happiness",
      popularity: 56,
      views: 1300,
      dateAdded: "2024-11-09"
    },
    {
      icon: XCircle,
      title: "Say Goodbye to Netflix, Prime & Binge-Watching",
      description: "Reclaim time from passive entertainment consumption.",
      items: [
        "Replace with active hobbies",
        "Set viewing time limits",
        "Choose quality over quantity"
      ],
      level: "Moderate",
      duration: "5 min read",
      category: "happiness",
      popularity: 47,
      views: 1090,
      dateAdded: "2024-11-10"
    },
    {
      icon: Smile,
      title: "Say Something Kind to Yourself Out Loud Daily",
      description: "Verbal self-compassion for improved self-esteem.",
      items: [
        "Use your name when speaking",
        "Focus on efforts not just outcomes",
        "Practice in mirror for impact"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "happiness",
      popularity: 53,
      views: 1230,
      dateAdded: "2024-11-11"
    },
    {
      icon: ArrowUp,
      title: "Set an Hourly Reminder to Stand Up",
      description: "Combat sedentary lifestyle with regular movement breaks.",
      items: [
        "Set phone or watch reminders",
        "Take 2-minute walking breaks",
        "Stretch while standing"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "health",
      popularity: 48,
      views: 1120,
      dateAdded: "2024-11-12"
    },
    {
      icon: Brain,
      title: "Sit in Silence for 5 Minutes a Day",
      description: "Meditation starter practice for mental clarity.",
      items: [
        "No music or distractions",
        "Focus on breath naturally",
        "Don't judge wandering thoughts"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "happiness",
      popularity: 60,
      views: 1390,
      dateAdded: "2024-11-13"
    },
    {
      icon: Snowflake,
      title: "Stop Compromising on Sleep",
      description: "Prioritize sleep quality for optimal health and performance.",
      items: [
        "Consistent sleep schedule daily",
        "Create pre-sleep routine",
        "Optimize bedroom environment"
      ],
      level: "Moderate",
      duration: "6 min read",
      category: "health",
      popularity: 78,
      views: 1810,
      dateAdded: "2024-11-14"
    },
    {
      icon: Package,
      title: "Stock Up on Favourite Beauty & Skincare Items When on Sale",
      description: "Strategic purchasing for personal care essentials.",
      items: [
        "Track sale cycles of favorites",
        "Buy 3-6 month supply",
        "Check expiration dates carefully"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "wealth",
      popularity: 34,
      views: 790,
      dateAdded: "2024-11-15"
    },
    {
      icon: Play,
      title: "Swap TV for a Podcast",
      description: "Transform passive entertainment into active learning.",
      items: [
        "Choose educational content",
        "Listen while doing chores",
        "Take notes on key insights"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "happiness",
      popularity: 52,
      views: 1210,
      dateAdded: "2024-11-16"
    },
    {
      icon: BookOpen,
      title: "Take a Free Online Course",
      description: "Skill development through accessible online education.",
      items: [
        "Coursera and edX offer certificates",
        "Choose job-relevant skills",
        "Set weekly learning schedule"
      ],
      level: "Moderate",
      duration: "5 min read",
      category: "wealth",
      popularity: 58,
      views: 1340,
      dateAdded: "2024-11-17"
    },
    {
      icon: Snowflake,
      title: "Take Cold Showers",
      description: "Cold exposure therapy for resilience and health benefits.",
      items: [
        "Start with 30 seconds cold",
        "Gradually increase duration",
        "Boosts metabolism and immunity"
      ],
      level: "Hard",
      duration: "5 min read",
      category: "health",
      popularity: 45,
      views: 1050,
      dateAdded: "2024-11-18"
    },
    {
      icon: Pill,
      title: "Take Supplements for What You Are Deficient In",
      description: "Targeted supplementation based on individual needs.",
      items: [
        "Get blood work done first",
        "Focus on common deficiencies",
        "Quality over quantity approach"
      ],
      level: "Moderate",
      duration: "6 min read",
      category: "health",
      popularity: 49,
      views: 1140,
      dateAdded: "2024-11-19"
    },
    {
      icon: Apple,
      title: "The Power of Frozen Fruits & Vegetables",
      description: "Nutrition and budget benefits of frozen produce.",
      items: [
        "Often more nutritious than fresh",
        "No waste from spoilage",
        "Available year-round"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "wealth",
      popularity: 41,
      views: 950,
      dateAdded: "2024-11-20"
    },
    {
      icon: TrendingUp,
      title: "Time In the Market vs Timing the Market",
      description: "Investment strategy for long-term wealth building.",
      items: [
        "Consistent investing beats timing",
        "Compound interest works over time",
        "Dollar-cost averaging reduces risk"
      ],
      level: "Moderate",
      duration: "7 min read",
      category: "wealth",
      popularity: 64,
      views: 1480,
      dateAdded: "2024-11-21"
    },
    {
      icon: Zap,
      title: "Turn Off Appliances at the Plug",
      description: "Reduce phantom energy consumption and electricity bills.",
      items: [
        "Standby mode still uses power",
        "Save 5-10% on electricity bills",
        "Use smart power strips"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "wealth",
      popularity: 37,
      views: 860,
      dateAdded: "2024-11-22"
    },
    {
      icon: Brain,
      title: "Understand What High Blood Sugar Does to Your Brain and Body",
      description: "Education on glucose impact for better health choices.",
      items: [
        "Affects cognitive function significantly",
        "Impacts energy levels throughout day",
        "Learn blood sugar management techniques"
      ],
      level: "Moderate",
      duration: "6 min read",
      category: "health",
      popularity: 55,
      views: 1280,
      dateAdded: "2024-11-23"
    },
    {
      icon: Leaf,
      title: "Use Saffron as an Antidepressant",
      description: "Natural mood enhancement through spice supplementation.",
      items: [
        "Clinically proven mood benefits",
        "Quality saffron supplement important",
        "Consult healthcare provider first"
      ],
      level: "Moderate",
      duration: "5 min read",
      category: "health",
      popularity: 38,
      views: 890,
      dateAdded: "2024-11-24"
    },
    {
      icon: Leaf,
      title: "Use Spices Instead of Salt for Seasoning",
      description: "Flavor enhancement without sodium excess.",
      items: [
        "Herbs and spices add antioxidants",
        "Reduces blood pressure naturally",
        "Expands flavor palette significantly"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "health",
      popularity: 44,
      views: 1020,
      dateAdded: "2024-11-25"
    },
    {
      icon: Activity,
      title: "Use Spike Mat",
      description: "Acupressure benefits for pain relief and relaxation.",
      items: [
        "Reduces muscle tension effectively",
        "Improves circulation naturally",
        "Start with light clothing layer"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "health",
      popularity: 33,
      views: 770,
      dateAdded: "2024-11-26"
    },
    {
      icon: ShoppingBasket,
      title: "Use the Too Good To Go App",
      description: "Reduce food waste while saving money on meals.",
      items: [
        "Get surplus food at discount",
        "Help reduce environmental impact",
        "Discover new restaurants cheaply"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "wealth",
      popularity: 42,
      views: 980,
      dateAdded: "2024-11-27"
    },
    {
      icon: Calendar,
      title: "Wait 30 Days Before Any Status Spend",
      description: "Impulse control for non-essential purchases.",
      items: [
        "Write down what you want",
        "Set calendar reminder for 30 days",
        "Often desire fades naturally"
      ],
      level: "Moderate",
      duration: "4 min read",
      category: "wealth",
      popularity: 54,
      views: 1250,
      dateAdded: "2024-11-28"
    },
    {
      icon: Footprints,
      title: "Walk Backwards",
      description: "Unique exercise for balance, coordination and muscle activation.",
      items: [
        "Improves proprioception significantly",
        "Uses different muscle patterns",
        "Start slow in safe environment"
      ],
      level: "Moderate",
      duration: "4 min read",
      category: "health",
      popularity: 29,
      views: 680,
      dateAdded: "2024-11-29"
    },
    {
      icon: DollarSign,
      title: "Why Implement a 30-Day Rule for Big Purchases",
      description: "Decision framework for significant financial commitments.",
      items: [
        "Prevents impulse buying mistakes",
        "Allows time for research",
        "Often reveals you don't need item"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "wealth",
      popularity: 61,
      views: 1420,
      dateAdded: "2024-11-30"
    },
    {
      icon: PenTool,
      title: "Write Down 3 Things You Accomplished at the End of Each Day",
      description: "Daily achievement recognition for improved self-worth.",
      items: [
        "Include small wins too",
        "Focus on progress made",
        "Builds positive mindset daily"
      ],
      level: "Easy",
      duration: "3 min read",
      category: "happiness",
      popularity: 58,
      views: 1350,
      dateAdded: "2024-12-01"
    },
    {
      icon: Sun,
      title: "Be More Japanese: Sit on the Floor More",
      description: "Floor sitting benefits for posture and flexibility.",
      items: [
        "Improves hip mobility naturally",
        "Strengthens core muscles",
        "Encourages better posture"
      ],
      level: "Easy",
      duration: "4 min read",
      category: "health",
      popularity: 36,
      views: 840,
      dateAdded: "2024-12-02"
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
          <div className="mt-8 flex justify-center gap-10 animate-fade-in" style={{ animationDelay: "120ms" }}>
            <ChevronRipple to="/daily-wins" label="Add to the Daily Wins Page" />
            <ChevronRipple to="/podcast" label="Go to Podcast" color="accent" />
          </div>
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16 auto-rows-fr items-stretch">
          {filteredAndSortedTips.map((tip, index) => (
            <div 
              key={index}
              className="animate-fade-in hover-lift h-full flex"
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