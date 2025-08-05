import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Heart, Award, Users2, Quote, BookOpen, Target, Star, TrendingUp, Zap, AlertTriangle, CheckCircle, ArrowRight, BarChart3, Brain, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section - The Creator */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-background via-muted/30 to-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in space-y-8">
              <div className="space-y-4">
                <Badge className="bg-gradient-primary text-primary-foreground">
                  ✨ The Mind Behind BDBT
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="block text-foreground">Welcome to</span>
                  <span className="block text-gradient">Habit-Driven</span>
                  <span className="block text-gradient">Lifestyle Design</span>
                </h1>
              </div>
              <p className="text-xl text-muted-foreground leading-relaxed">
                I created BDBT because I was tired of seeing people fail with the old models of self-improvement. 
                You don't need another goal. You need an achievable daily win that creates a ripple effect across your entire life.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="hero" size="lg" asChild className="hover:scale-105 transition-transform">
                  <Link to="/blueprint">Get Started Now</Link>
                </Button>
                <Button variant="outline" size="lg" className="hover:scale-105 transition-transform">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Learn My System
                </Button>
              </div>
            </div>
            <div className="relative animate-fade-in" style={{ animationDelay: "200ms" }}>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&h=600&fit=crop&crop=face" 
                  alt="BDBT Founder" 
                  className="w-full h-96 lg:h-[500px] object-cover rounded-3xl shadow-strong border-4 border-white/20"
                />
                <div className="absolute -bottom-6 -right-6 bg-gradient-primary p-6 rounded-2xl shadow-strong">
                  <div className="text-white text-center">
                    <div className="text-2xl font-bold">50K+</div>
                    <div className="text-sm opacity-90">Lives Transformed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-32 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-6xl font-light mb-8 text-foreground tracking-tight">
              The Problem
            </h2>
            <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto">
              Why traditional approaches fail to create lasting change
            </p>
          </div>
          
          <div className="space-y-32">
            {/* First statement - Center aligned */}
            <div className="text-center max-w-4xl mx-auto">
              <h3 className="text-3xl lg:text-4xl font-light leading-tight text-foreground mb-6">
                We live in a world obsessed with doing more.
              </h3>
              <p className="text-xl text-muted-foreground font-light">
                More workouts. More goals. More hustle. Yet most people feel stuck, drained, and uncertain.
              </p>
            </div>

            {/* Second statement - Center aligned */}
            <div className="text-center max-w-4xl mx-auto">
              <h3 className="text-3xl lg:text-4xl font-light leading-tight text-foreground mb-6">
                We're told to fix our lives one isolated tip at a time.
              </h3>
              <p className="text-xl text-muted-foreground font-light">
                A budgeting app here. A gym membership there. A meditation streak that lasts three days.
              </p>
            </div>

            {/* Third statement - Center aligned with emphasis */}
            <div className="text-center max-w-4xl mx-auto">
              <h3 className="text-4xl lg:text-5xl font-medium leading-tight text-foreground mb-6">
                But nothing sticks.
              </h3>
              <p className="text-xl text-muted-foreground font-light mb-4">
                Not because people are lazy. Not because they're broken.
              </p>
              <p className="text-xl text-foreground font-medium">
                But because the old model is.
              </p>
            </div>

            {/* Fourth statement - Center aligned */}
            <div className="text-center max-w-4xl mx-auto">
              <h3 className="text-3xl lg:text-4xl font-light leading-tight text-foreground mb-6">
                Meanwhile, modern life pushes us further behind.
              </h3>
              <p className="text-xl text-muted-foreground font-light">
                Sit more. Scroll more. Consume more. With every new demand, we feel more overwhelmed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Truth Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
              <Lightbulb className="w-4 h-4 mr-2" />
              The Truth
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              Life Isn't Lived in Silos
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Your health affects your wealth. Your wealth affects your happiness. Your happiness affects your health.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="prose prose-lg text-muted-foreground">
                <p className="leading-relaxed text-lg">
                  Trying to fix one without the others creates imbalance. Trying to fix everything at once creates overwhelm.
                </p>
                <p className="leading-relaxed text-lg font-semibold text-primary">
                  That's where BDBT comes in.
                </p>
                <p className="leading-relaxed text-lg">
                  BDBT is the first and only system that helps you build health, wealth, and happiness simultaneously, 
                  through daily habits that create ripple effects across your entire life.
                </p>
              </div>
              
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-4">The BDBT Difference:</h3>
                  <div className="space-y-3">
                    {[
                      "One stacked system that improves all three together",
                      "Works even when your motivation doesn't",
                      "Clear steps that turn overwhelm into action",
                      "1% daily improvement mindset"
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="relative">
              <img 
                src="/lovable-uploads/2e4d322c-a647-4622-b44d-912958bfa401.png" 
                alt="BDBT Ripple Effect Diagram" 
                className="w-full h-auto rounded-2xl shadow-strong"
              />
              <div className="absolute -bottom-4 -right-4 bg-gradient-primary p-4 rounded-xl shadow-strong">
                <p className="text-white text-sm font-medium">Ripple effects from daily habits</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Old Way vs BDBT Way */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              Why Habit-Driven Lifestyle Design™ Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Compare the old approach with the BDBT system that creates lasting change
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Old Way Column */}
            <Card className="bg-destructive/5 border-destructive/20">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <Badge className="bg-destructive/10 text-destructive border-destructive/20">
                    ❌ The Old Way
                  </Badge>
                  <h3 className="text-2xl font-bold text-destructive mt-4">What Doesn't Work</h3>
                </div>
                <div className="space-y-4">
                  {[
                    "Separate goals for health, wealth, and happiness",
                    "Relying on motivation or willpower",
                    "Isolated tips from different experts",
                    "Overhauling everything on January 1st",
                    "All or nothing thinking",
                    "Quick hacks with no staying power",
                    "One-size-fits-all plans",
                    "Starting strong, burning out fast"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* BDBT Way Column */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <Badge className="bg-primary/10 text-primary border-primary/20">
                    ✅ The BDBT Way
                  </Badge>
                  <h3 className="text-2xl font-bold text-primary mt-4">What Actually Works</h3>
                </div>
                <div className="space-y-4">
                  {[
                    "One stacked system that improves all three together",
                    "A structure that works even when motivation doesn't",
                    "Simplified information and achievable progress",
                    "Tiny daily shifts that build a life you love",
                    "1% daily improvement mindset",
                    "Long-term identity change through ripple habits",
                    "A flexible framework that fits around your life",
                    "Small daily steps. Big life changes"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* BDBT Philosophy */}
      <section className="py-20 bg-gradient-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <Quote className="w-16 h-16 mx-auto mb-8 opacity-50" />
            <h2 className="text-4xl lg:text-5xl font-bold mb-8">The BDBT Philosophy</h2>
            <blockquote className="text-2xl lg:text-3xl font-bold leading-relaxed mb-8">
              "We believe in habits that create ripple effects. Small daily actions that spark powerful momentum across your entire life."
            </blockquote>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                belief: "In stacking micro-wins, not chasing macro-perfection."
              },
              {
                icon: Clock,
                belief: "That 10 minutes can change your entire day. The ripple can then change your entire life."
              },
              {
                icon: Brain,
                belief: "That your environment beats your willpower."
              },
              {
                icon: Zap,
                belief: "That you don't need more motivation, you need a system that works even when you don't."
              },
              {
                icon: Heart,
                belief: "That real change happens when your habits serve your values."
              },
              {
                icon: Star,
                belief: "That you don't need another goal. You need an achievable daily win that creates ripple effects."
              }
            ].map((item, index) => (
              <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <item.icon className="w-12 h-12 mx-auto mb-4 text-white" />
                  <p className="text-white/90 leading-relaxed">{item.belief}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* The New Opportunity */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-accent/10 text-accent border-accent/20 mb-4">
              🚀 The New Opportunity
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              Welcome to Habit-Driven Lifestyle Design
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              A system that's simple enough to start today, smart enough to compound over time 
              and strong enough to rebuild your identity from the inside out.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="prose prose-lg text-muted-foreground">
                <p className="leading-relaxed text-lg">
                  You don't need another goal. You need an achievable daily win that creates a ripple effect across your entire life.
                </p>
                <p className="leading-relaxed text-lg font-semibold text-primary">
                  If you feel stuck, scattered, or just know you're capable of more, this is your next step.
                </p>
                <p className="leading-relaxed text-lg">
                  One habit today. A different life tomorrow. Let's build it together - one tip at a time.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button variant="hero" size="lg" asChild className="hover:scale-105 transition-transform">
                  <Link to="/blueprint">
                    Start Your Journey
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="hover:scale-105 transition-transform">
                  <Link to="/daily-wins">Get Daily Wins Tracker</Link>
                </Button>
              </div>
            </div>
            
            <Card className="bg-gradient-primary/5 border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-primary mb-6">What You'll Get:</h3>
                <div className="space-y-4">
                  {[
                    "A system that works even when you don't feel motivated",
                    "Daily habits that create ripple effects across all areas",
                    "Clear, achievable steps instead of overwhelming goals",
                    "A community of people on the same journey",
                    "Tools to track and stack your wins"
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stats */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-success/10 text-success border-success/20 mb-4">
              🏆 Proven Results
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              The Numbers Don't Lie
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real transformation, real people, real results from the BDBT system.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { metric: "50K+", label: "Lives Transformed", icon: Users2 },
              { metric: "10M+", label: "Content Views", icon: TrendingUp },
              { metric: "95%", label: "Success Rate", icon: Award },
              { metric: "#1", label: "System That Works", icon: Star }
            ].map((stat, index) => (
              <Card key={index} className="group hover:shadow-strong transition-all duration-300 hover:-translate-y-2 bg-gradient-subtle">
                <CardContent className="p-8 text-center space-y-4">
                  <stat.icon className="w-12 h-12 mx-auto text-primary group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-4xl font-bold text-foreground">{stat.metric}</div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section (kept at bottom as requested) */}
      <section className="py-20 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-muted/50 text-muted-foreground mb-4">
              🤝 Meet the Team
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-foreground">
              The People Behind the Mission
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A diverse group of experts and creators who share the common vision of helping people achieve their dreams.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((_, index) => (
              <Card key={index} className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <img 
                    src={`https://images.unsplash.com/photo-${['1649972904349-6e44c42644a7', '1581091226825-a6a2a5aee158', '1486312338219-ce68d2c6f44d', '1581090464777-f3220bbe1b8b'][index]}?w=200&h=200&fit=crop&crop=face`}
                    alt={`Team Member ${index + 1}`} 
                    className="w-24 h-24 object-cover rounded-full mx-auto mb-4 shadow-medium"
                  />
                  <h3 className="text-lg font-semibold text-foreground mb-1">Team Member {index + 1}</h3>
                  <p className="text-sm text-muted-foreground mb-3">Role Title</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Brief description of team member's expertise and contribution.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;