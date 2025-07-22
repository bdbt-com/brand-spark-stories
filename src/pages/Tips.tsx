import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  Zap
} from "lucide-react";

const Tips = () => {
  const tipCategories = [
    {
      icon: Target,
      title: "Goal Setting Mastery",
      description: "Learn the proven frameworks for setting and achieving meaningful goals that create lasting change.",
      items: ["SMART Goals Framework", "90-Day Sprint Planning", "Milestone Tracking"],
      level: "Beginner",
      duration: "15 min read"
    },
    {
      icon: TrendingUp,
      title: "Productivity Hacks",
      description: "Time-tested strategies to maximize your output and create more time for what matters most.",
      items: ["Time Blocking System", "Energy Management", "Focus Techniques"],
      level: "Intermediate",
      duration: "20 min read"
    },
    {
      icon: Brain,
      title: "Mindset Transformation",
      description: "Powerful mental frameworks that successful people use to overcome challenges and stay motivated.",
      items: ["Growth Mindset Development", "Limiting Belief Removal", "Confidence Building"],
      level: "Advanced",
      duration: "25 min read"
    },
    {
      icon: Rocket,
      title: "Business Growth",
      description: "Essential strategies for scaling your business and creating sustainable revenue streams.",
      items: ["Market Research Methods", "Customer Acquisition", "Revenue Optimization"],
      level: "Intermediate",
      duration: "30 min read"
    },
    {
      icon: Users,
      title: "Leadership Essentials",
      description: "Develop the leadership skills needed to inspire teams and drive meaningful change.",
      items: ["Communication Mastery", "Team Building", "Decision Making"],
      level: "Advanced",
      duration: "25 min read"
    },
    {
      icon: Heart,
      title: "Work-Life Balance",
      description: "Create harmony between your professional ambitions and personal well-being.",
      items: ["Boundary Setting", "Stress Management", "Self-Care Routines"],
      level: "Beginner",
      duration: "18 min read"
    },
    {
      icon: DollarSign,
      title: "Financial Mastery",
      description: "Build wealth and financial security through smart money management and investment strategies.",
      items: ["Budgeting Systems", "Investment Basics", "Passive Income"],
      level: "Intermediate",
      duration: "22 min read"
    },
    {
      icon: Lightbulb,
      title: "Creative Problem Solving",
      description: "Unlock your creative potential and learn to approach challenges with innovative solutions.",
      items: ["Design Thinking", "Brainstorming Techniques", "Innovation Methods"],
      level: "Intermediate",
      duration: "20 min read"
    },
    {
      icon: Zap,
      title: "Energy & Wellness",
      description: "Optimize your physical and mental energy to perform at your highest level consistently.",
      items: ["Morning Routines", "Nutrition Basics", "Exercise Planning"],
      level: "Beginner",
      duration: "15 min read"
    },
    {
      icon: BookOpen,
      title: "Learning Acceleration",
      description: "Master the art of rapid skill acquisition and continuous learning in our fast-paced world.",
      items: ["Speed Reading", "Memory Techniques", "Skill Stacking"],
      level: "Advanced",
      duration: "28 min read"
    },
    {
      icon: Star,
      title: "Personal Branding",
      description: "Build a powerful personal brand that opens doors and creates opportunities.",
      items: ["Brand Strategy", "Content Creation", "Network Building"],
      level: "Intermediate",
      duration: "24 min read"
    },
    {
      icon: Clock,
      title: "Time Management",
      description: "Take control of your schedule and make time for what truly matters in your life.",
      items: ["Priority Matrix", "Calendar Systems", "Habit Stacking"],
      level: "Beginner",
      duration: "16 min read"
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-success text-success-foreground";
      case "Intermediate": return "bg-warning text-warning-foreground";
      case "Advanced": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen py-20">
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

        {/* Tips Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {tipCategories.map((tip, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <tip.icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge className={getLevelColor(tip.level)}>
                    {tip.level}
                  </Badge>
                </div>
                <CardTitle className="text-lg leading-snug group-hover:text-primary transition-colors">
                  {tip.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
                  >
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-subtle rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            Want More Exclusive Content?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our premium community for advanced strategies, personal coaching, 
            and exclusive resources not available anywhere else.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg">
              Join Premium Community
            </Button>
            <Button variant="outline" size="lg">
              Browse All Resources
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tips;