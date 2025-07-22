import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Trophy, 
  Star, 
  TrendingUp,
  Target,
  DollarSign,
  Users,
  Calendar,
  Filter
} from "lucide-react";

const DailyWins = () => {
  const wins = [
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        avatar: "/api/placeholder/50/50",
        initials: "SJ",
        level: "Gold Member"
      },
      content: "Just closed my first $10K client after implementing the sales strategies from the community! This proves that consistent action really pays off. Thank you to everyone who supported me on this journey! 🎉",
      category: "Business",
      date: "2 hours ago",
      likes: 47,
      comments: 12,
      featured: true
    },
    {
      id: 2,
      user: {
        name: "Mike Chen",
        avatar: "/api/placeholder/50/50",
        initials: "MC",
        level: "Premium"
      },
      content: "Completed my first marathon today! 26.2 miles of pure determination. The mental strategies I learned here helped me push through when my body wanted to quit. Mind over matter! 🏃‍♂️",
      category: "Health",
      date: "4 hours ago",
      likes: 89,
      comments: 23,
      featured: false
    },
    {
      id: 3,
      user: {
        name: "Emily Rodriguez",
        avatar: "/api/placeholder/50/50",
        initials: "ER",
        level: "Community"
      },
      content: "Finally launched my online course after months of preparation! Already got 50 pre-orders in the first 24 hours. The power of building an audience first is incredible. Thanks for all the guidance! 📚",
      category: "Business",
      date: "6 hours ago",
      likes: 156,
      comments: 31,
      featured: true
    },
    {
      id: 4,
      user: {
        name: "David Thompson",
        avatar: "/api/placeholder/50/50",
        initials: "DT",
        level: "Gold Member"
      },
      content: "Broke my personal deadlift record today - 405 lbs! Been following the progressive overload principles and staying consistent with my nutrition. Small improvements add up to big results! 💪",
      category: "Fitness",
      date: "8 hours ago",
      likes: 72,
      comments: 18,
      featured: false
    },
    {
      id: 5,
      user: {
        name: "Jessica Park",
        avatar: "/api/placeholder/50/50",
        initials: "JP",
        level: "Premium"
      },
      content: "Got promoted to Senior Manager today! The leadership skills I developed through this community made all the difference. Special thanks to everyone who helped me practice my presentation skills! 🎯",
      category: "Career",
      date: "12 hours ago",
      likes: 198,
      comments: 45,
      featured: true
    },
    {
      id: 6,
      user: {
        name: "Alex Martinez",
        avatar: "/api/placeholder/50/50",
        initials: "AM",
        level: "Community"
      },
      content: "Paid off my last credit card today! It took 18 months of disciplined budgeting and the financial strategies from our money management workshops. Debt-free feels amazing! 💳",
      category: "Finance",
      date: "1 day ago",
      likes: 134,
      comments: 28,
      featured: false
    },
    {
      id: 7,
      user: {
        name: "Lisa Wong",
        avatar: "/api/placeholder/50/50",
        initials: "LW",
        level: "Gold Member"
      },
      content: "Spoke at my first conference today! 6 months ago I was terrified of public speaking. The confidence-building exercises and practice sessions here transformed my fear into excitement! 🎤",
      category: "Personal Growth",
      date: "1 day ago",
      likes: 167,
      comments: 39,
      featured: true
    },
    {
      id: 8,
      user: {
        name: "Ryan Foster",
        avatar: "/api/placeholder/50/50",
        initials: "RF",
        level: "Premium"
      },
      content: "Hit 1000 subscribers on my YouTube channel! The content creation strategies and consistency tips from this community were game-changers. On to the next milestone! 📹",
      category: "Creator",
      date: "2 days ago",
      likes: 91,
      comments: 22,
      featured: false
    }
  ];

  const categories = ["All", "Business", "Health", "Career", "Finance", "Personal Growth", "Creator", "Fitness"];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Business": return DollarSign;
      case "Health": return Heart;
      case "Career": return TrendingUp;
      case "Finance": return DollarSign;
      case "Personal Growth": return Target;
      case "Creator": return Star;
      case "Fitness": return Trophy;
      default: return Star;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Business": return "bg-success text-success-foreground";
      case "Health": return "bg-destructive text-destructive-foreground";
      case "Career": return "bg-primary text-primary-foreground";
      case "Finance": return "bg-warning text-warning-foreground";
      case "Personal Growth": return "bg-accent text-accent-foreground";
      case "Creator": return "bg-primary text-primary-foreground";
      case "Fitness": return "bg-success text-success-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Gold Member": return "text-yellow-600";
      case "Premium": return "text-purple-600";
      case "Community": return "text-blue-600";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen py-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Daily Wins Wall
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Celebrate the incredible achievements of our community members. Every win, big or small, 
            inspires others to push forward and reach their goals.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: Trophy, label: "Total Wins", value: "2,847", color: "text-yellow-500" },
            { icon: Users, label: "Active Members", value: "1,234", color: "text-blue-500" },
            { icon: Target, label: "Goals Achieved", value: "5,692", color: "text-green-500" },
            { icon: Star, label: "This Week", value: "156", color: "text-purple-500" }
          ].map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-medium transition-shadow duration-300">
              <CardContent className="p-6">
                <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter by:
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === "All" ? "default" : "outline"}
              size="sm"
              className="hover:bg-primary hover:text-primary-foreground"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Wins Feed */}
        <div className="grid lg:grid-cols-2 gap-8">
          {wins.map((win) => {
            const CategoryIcon = getCategoryIcon(win.category);
            return (
              <Card 
                key={win.id}
                className={`group hover:shadow-medium transition-all duration-300 hover:-translate-y-1 ${
                  win.featured ? "ring-2 ring-primary/20 bg-primary/5" : ""
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={win.user.avatar} />
                        <AvatarFallback className="bg-gradient-primary text-white">
                          {win.user.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-foreground">{win.user.name}</div>
                        <div className={`text-xs font-medium ${getLevelColor(win.user.level)}`}>
                          {win.user.level}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {win.featured && (
                        <Badge className="bg-accent text-accent-foreground">
                          Featured
                        </Badge>
                      )}
                      <Badge className={getCategoryColor(win.category)}>
                        <CategoryIcon className="w-3 h-3 mr-1" />
                        {win.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-foreground leading-relaxed">{win.content}</p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {win.date}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="flex items-center gap-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-muted-foreground hover:text-destructive group-hover:text-destructive"
                      >
                        <Heart className="w-4 h-4 mr-1" />
                        {win.likes}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-muted-foreground hover:text-primary group-hover:text-primary"
                      >
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {win.comments}
                      </Button>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Wins
          </Button>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center bg-gradient-hero text-white rounded-2xl p-12">
          <Trophy className="w-16 h-16 mx-auto mb-6 text-accent-light" />
          <h2 className="text-3xl font-bold mb-4">
            Share Your Win Today!
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Every achievement deserves celebration. Share your progress, inspire others, 
            and become part of our success story.
          </p>
          <Button variant="accent" size="lg">
            Submit Your Win
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DailyWins;