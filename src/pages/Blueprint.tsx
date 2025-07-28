import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, TrendingUp, Users, Download, CheckCircle, Target, Zap } from "lucide-react";

const Blueprint = () => {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState("");

  const handleDownloadClick = () => {
    setShowEmailForm(true);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Blueprint download requested for:", email);
    setEmail("");
    setShowEmailForm(false);
    // TODO: Implement actual email sending and PDF delivery
  };

  const keyFeatures = [
    {
      icon: <Target className="h-5 w-5" />,
      title: "20 Daily Wins + 20 Daily Drifts",
      description: "Clear roadmap of what to do and what to avoid each day"
    },
    {
      icon: <CheckCircle className="h-5 w-5" />,
      title: "Weekly Identity Check-in",
      description: "Track how your habits are shaping your identity"
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      title: "Plug-in Habit Library",
      description: "Modular system to add new habits as you grow"
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "Chain Reaction Tracking",
      description: "See how one habit sparks positive changes in other areas"
    }
  ];

  const benefits = [
    "Momentum over motivation approach",
    "Identity-based habit formation",
    "Compound effect visualization",
    "Daily reflection framework",
    "Progress pattern recognition",
    "Sustainable long-term growth"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-primary text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              <Zap className="h-3 w-3 mr-1" />
              Foundation Blueprint
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              The Source Blueprint
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-white/90">
              Big Daddy's Foundation Blueprint
            </p>
            <p className="text-lg mb-8 max-w-3xl mx-auto text-white/80">
              The complete operating system for health, wealth & happiness. Transform your life through the power of compound habits and chain reactions.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                <Clock className="h-4 w-4" />
                <span>12 min read</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                <BookOpen className="h-4 w-4" />
                <span>19 pages</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                <Users className="h-4 w-4" />
                <span>Moderate difficulty</span>
              </div>
            </div>
            {!showEmailForm ? (
              <Button 
                size="lg" 
                onClick={handleDownloadClick}
                className="bg-white text-primary hover:bg-white/90"
              >
                <Download className="h-5 w-5 mr-2" />
                Download The Blueprint
              </Button>
            ) : (
              <Card className="max-w-md mx-auto bg-white/10 backdrop-blur border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Get Your Blueprint</CardTitle>
                  <CardDescription className="text-white/80">
                    Enter your email to receive the complete guide
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="email" className="text-white">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                        className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                      />
                    </div>
                    <Button type="submit" className="w-full bg-white text-primary hover:bg-white/90">
                      Send Me The Blueprint
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Key Takeaways */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Takeaways</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Momentum over Motivation</h3>
                <p className="text-muted-foreground">One tick is a "vote" for your future self</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Wins Spark Wins</h3>
                <p className="text-muted-foreground">Identity shifts trigger better choices and higher energy</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Track Patterns, Not Perfection</h3>
                <p className="text-muted-foreground">See which habits ignite positive chain reactions</p>
              </CardContent>
            </Card>
          </div>

          {/* What You'll Get */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-2xl font-bold mb-6">What's Inside The Blueprint</h3>
              <div className="space-y-4">
                {keyFeatures.map((feature, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold">{feature.title}</h4>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6">Benefits You'll Experience</h3>
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* How It Works */}
          <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <CardHeader>
              <CardTitle className="text-center">How The Chain Reaction Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <p className="text-lg">
                  Every small habit is a "domino" that creates positive momentum in other areas of your life.
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm">
                  <Badge variant="outline">Take Stairs</Badge>
                  <span className="text-muted-foreground">→</span>
                  <Badge variant="outline">Identity Shift</Badge>
                  <span className="text-muted-foreground">→</span>
                  <Badge variant="outline">Better Food Choices</Badge>
                  <span className="text-muted-foreground">→</span>
                  <Badge variant="outline">Higher Energy</Badge>
                </div>
                <p className="text-muted-foreground">
                  The Blueprint shows you exactly how to set up these chain reactions in your own life.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Blueprint;