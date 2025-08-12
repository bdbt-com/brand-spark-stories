import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ChevronRipple from "@/components/ChevronRipple";
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
  ArrowLeft,
  ArrowRight
} from "lucide-react";

const DailyWins = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const wins = [
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        avatar: "/api/placeholder/50/50",
        initials: "SJ",
        level: "Gold Member"
      },
      content: "Completed my morning meditation streak for 30 days straight! The mental clarity and reduced stress levels have transformed my daily productivity and relationships.",
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
      content: "Implemented a 10-minute morning routine that includes gratitude journaling and light stretching. This simple change has completely transformed how I approach each day.",
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
      content: "Started doing five push-ups every time I enter my home office. After three weeks, I can now do 30 push-ups easily and feel stronger throughout the day.",
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
      content: "Started tracking expenses using the envelope method. In just one month, I've saved $200 without feeling deprived and finally understand where my money goes.",
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
      content: "Committed to reading for 15 minutes before checking my phone each morning. The mental clarity and reduced anxiety have improved every aspect of my day.",
      date: "12 hours ago",
      likes: 198,
      comments: 45,
      featured: true
    }
  ];

  // Auto-rotate carousel every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % wins.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [wins.length]);

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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % wins.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + wins.length) % wins.length);
  };

  return (
    <div className="min-h-screen py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-primary">
            Daily Wins Wall
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-4">
            Any Wins Across Any Area of Your Life? We want to Hear about it. Excited to see the visible ripple effect in your life? We want to hear about it!
          </p>
        </div>

        {/* Rotating Wins Carousel */}
        <div className="relative mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Featured Success Stories</h2>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="icon"
                onClick={prevSlide}
                className="hover:bg-primary hover:text-primary-foreground"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={nextSlide}
                className="hover:bg-primary hover:text-primary-foreground"
              >
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl shadow-strong bg-card/80 backdrop-blur-sm">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {wins.map((win) => {
                return (
                  <div key={win.id} className="w-full flex-shrink-0">
                    <Card className="border-0 shadow-none bg-transparent">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-4">
                            <Avatar className="w-16 h-16">
                              <AvatarImage src={win.user.avatar} />
                              <AvatarFallback className="bg-gradient-primary text-white text-lg">
                                {win.user.initials}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="text-xl font-semibold text-foreground">{win.user.name}</div>
                              <div className={`text-sm font-medium ${getLevelColor(win.user.level)}`}>
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
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6 px-6 pb-8">
                        <p className="text-lg text-foreground leading-relaxed">{win.content}</p>
                        
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {win.date}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <div className="flex items-center gap-6">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-muted-foreground hover:text-destructive"
                            >
                              <Heart className="w-5 h-5 mr-2" />
                              {win.likes}
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-muted-foreground hover:text-primary"
                            >
                              <MessageCircle className="w-5 h-5 mr-2" />
                              {win.comments}
                            </Button>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <Share2 className="w-5 h-5" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {wins.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? "bg-primary scale-110" 
                    : "bg-muted hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mb-20">
          <Button variant="outline" size="lg" asChild>
            <Link to="/daily-wins">View All Community Wins</Link>
          </Button>
        </div>


        {/* CTA Section */}
        <div className="text-center bg-warning text-primary rounded-2xl p-12 border-4 border-warning/40">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-white">
            Ready to Start Your Own Success Story?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Get the same system these people used to transform their lives through simple daily habits.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/blueprint">
              Get Your Foundation Blueprint Here <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DailyWins;