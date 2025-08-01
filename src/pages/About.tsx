import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Heart, Award, Users2, Quote, BookOpen, Target, Star, TrendingUp, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Personal Brand Focus */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-background via-muted/30 to-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in space-y-8">
              <div className="space-y-4">
                <Badge className="bg-gradient-primary text-primary-foreground">
                  ✨ Personal Brand Story
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="block text-foreground">Meet the</span>
                  <span className="block text-gradient">Visionary</span>
                </h1>
              </div>
              <p className="text-xl text-muted-foreground leading-relaxed">
                [Personal story introduction - space for founder's journey, mission, and what drives their passion 
                for transformation. This section should capture their unique voice and compelling backstory.]
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="hero" size="lg" asChild className="hover:scale-105 transition-transform">
                  <Link to="/partnership">Work With Me</Link>
                </Button>
                <Button variant="outline" size="lg" className="hover:scale-105 transition-transform">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Read My Story
                </Button>
              </div>
            </div>
            <div className="relative animate-fade-in" style={{ animationDelay: "200ms" }}>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&h=600&fit=crop&crop=face" 
                  alt="Founder Portrait" 
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

      {/* Personal Journey Timeline */}
      <section className="py-20 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              The Journey to Success
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              [Space for personal timeline - key milestones, breakthrough moments, and lessons learned]
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                year: "2018",
                title: "The Awakening",
                description: "[Personal story section 1 - the beginning, struggles, or catalyst moment that started the journey]",
                icon: Target,
                color: "bg-blue-500"
              },
              {
                year: "2021",
                title: "The Breakthrough",
                description: "[Personal story section 2 - major breakthrough, system development, or key realization]",
                icon: Zap,
                color: "bg-yellow-500"
              },
              {
                year: "2024",
                title: "The Mission",
                description: "[Personal story section 3 - current mission, impact, and vision for the future]",
                icon: Star,
                color: "bg-green-500"
              }
            ].map((milestone, index) => (
              <Card key={index} className="group hover:shadow-strong transition-all duration-300 hover:-translate-y-2 bg-card/80 backdrop-blur-sm border-2 hover:border-primary/20">
                <CardContent className="p-8 text-center space-y-6">
                  <div className={`w-20 h-20 ${milestone.color} rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <milestone.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="space-y-3">
                    <Badge className="bg-muted/50 text-muted-foreground border-0">
                      {milestone.year}
                    </Badge>
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {milestone.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Gallery & Achievements */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-success/10 text-success border-success/20">
                  🏆 Achievements & Recognition
                </Badge>
                <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  Proven Track Record of
                  <span className="block text-gradient">Excellence</span>
                </h2>
              </div>
              <div className="space-y-6 text-muted-foreground">
                <p className="text-lg leading-relaxed">
                  [Space for achievements, awards, media mentions, certifications, or notable accomplishments 
                  that establish credibility and authority in the field.]
                </p>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { metric: "10M+", label: "Content Views", icon: TrendingUp },
                    { metric: "#1", label: "Bestselling Author", icon: BookOpen },
                    { metric: "500K+", label: "Social Following", icon: Users2 },
                    { metric: "95%", label: "Success Rate", icon: Award }
                  ].map((stat, index) => (
                    <div key={index} className="text-center p-4 rounded-lg bg-gradient-subtle hover:shadow-medium transition-all duration-300">
                      <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <div className="text-2xl font-bold text-foreground">{stat.metric}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=400&fit=crop" 
                alt="Success moment 1" 
                className="w-full h-64 object-cover rounded-xl shadow-medium hover:shadow-strong transition-all duration-300 hover:scale-105"
              />
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=400&fit=crop" 
                alt="Success moment 2" 
                className="w-full h-64 object-cover rounded-xl shadow-medium hover:shadow-strong transition-all duration-300 hover:scale-105 mt-8"
              />
              <img 
                src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=300&h=400&fit=crop" 
                alt="Success moment 3" 
                className="w-full h-64 object-cover rounded-xl shadow-medium hover:shadow-strong transition-all duration-300 hover:scale-105 -mt-8"
              />
              <img 
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=400&fit=crop" 
                alt="Success moment 4" 
                className="w-full h-64 object-cover rounded-xl shadow-medium hover:shadow-strong transition-all duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Quote/Philosophy */}
      <section className="py-20 bg-gradient-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <Quote className="w-16 h-16 mx-auto mb-8 opacity-50" />
          <blockquote className="text-3xl lg:text-4xl font-bold leading-relaxed mb-8">
            "[Space for personal philosophy, favorite quote, or mission statement that captures 
            the essence of their approach and values]"
          </blockquote>
          <cite className="text-xl opacity-90">— [Founder Name], Founder & Visionary</cite>
        </div>
      </section>

      {/* Book Extracts / Content Showcase */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              Featured Content & Insights
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              [Space for book extracts, popular blog posts, or key insights that showcase expertise]
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <Badge className="bg-accent/10 text-accent border-accent/20">
                📚 From the bestselling book
              </Badge>
              <h3 className="text-3xl font-bold text-foreground">
                "[Book Title or Key Content Piece]"
              </h3>
              <div className="prose prose-lg text-muted-foreground">
                <p className="leading-relaxed">
                  "[Space for book extract, key insight, or compelling content that demonstrates 
                  thought leadership and provides value to readers. This should be engaging and 
                  showcase the unique perspective and expertise.]"
                </p>
                <p className="leading-relaxed">
                  "[Additional paragraph to continue the thought or provide more value...]"
                </p>
              </div>
              <Button variant="outline" size="lg" className="hover:scale-105 transition-transform">
                Read Full Content
              </Button>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=500&h=600&fit=crop" 
                alt="Content showcase" 
                className="w-full h-96 object-cover rounded-2xl shadow-strong"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values with Personal Touch */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              My Core Principles
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The fundamental beliefs that guide my work and shape how I serve my community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Heart,
                title: "Authenticity",
                description: "I believe in genuine, honest communication and real results over hype.",
              },
              {
                icon: Users2,
                title: "Community First",
                description: "Your success is my success. We're in this transformation journey together.",
              },
              {
                icon: Award,
                title: "Excellence",
                description: "I strive for the highest quality in everything I create and deliver.",
              },
              {
                icon: Clock,
                title: "Consistency",
                description: "Sustainable growth comes from consistent action and reliable systems.",
              },
            ].map((value, index) => (
              <Card key={index} className="group hover:shadow-strong transition-all duration-300 hover:-translate-y-2 bg-card/80 backdrop-blur-sm border-2 hover:border-primary/20">
                <CardContent className="p-8 text-center space-y-6">
                  <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <value.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
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