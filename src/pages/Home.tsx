import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Star, Users, Target, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-white py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Transform Your Success Journey
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-white/90 leading-relaxed">
                We empower ambitious individuals and businesses to unlock their full potential through proven strategies, actionable insights, and community-driven growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="accent" size="lg" asChild>
                  <Link to="/about">
                    Discover Our Story <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                  <Link to="/tips">
                    Explore Free Resources
                  </Link>
                </Button>
              </div>
            </div>
            <div className="animate-float">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-strong">
                <img 
                  src="/api/placeholder/500/400" 
                  alt="Success Journey" 
                  className="w-full h-80 object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-foreground">
              Our Mission
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-8">
                We believe that everyone has untapped potential waiting to be unleashed. Our mission is to provide the tools, 
                knowledge, and community support needed to help you achieve breakthrough results in both your personal and professional life.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Target,
                title: "Clear Direction",
                description: "Strategic guidance to help you set and achieve meaningful goals.",
              },
              {
                icon: Users,
                title: "Strong Community",
                description: "Connect with like-minded individuals on the same journey.",
              },
              {
                icon: TrendingUp,
                title: "Proven Results",
                description: "Time-tested strategies that deliver measurable outcomes.",
              },
              {
                icon: Star,
                title: "Excellence Focus",
                description: "Commitment to highest quality content and support.",
              },
            ].map((item, index) => (
              <Card key={index} className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-foreground">
              Success in Action
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See the impact of our community and the transformations happening every day.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { src: "/api/placeholder/400/300", alt: "Community Success Story 1" },
              { src: "/api/placeholder/400/300", alt: "Transformation Journey 2" },
              { src: "/api/placeholder/400/300", alt: "Achievement Celebration 3" },
              { src: "/api/placeholder/400/300", alt: "Goal Achievement 4" },
              { src: "/api/placeholder/400/300", alt: "Community Growth 5" },
              { src: "/api/placeholder/400/300", alt: "Success Milestone 6" },
            ].map((image, index) => (
              <div 
                key={index} 
                className="group overflow-hidden rounded-xl shadow-soft hover:shadow-strong transition-all duration-300 hover:scale-105"
              >
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Start Your Transformation?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Join thousands of successful individuals who have already begun their journey with us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="lg" asChild>
              <Link to="/partnership">
                Partner With Us <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
              <Link to="/daily-wins">
                See Daily Wins
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;