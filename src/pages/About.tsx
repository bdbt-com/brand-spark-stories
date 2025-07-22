import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Heart, Award, Users2 } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
                Our Story & Mission
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Founded on the belief that everyone deserves to live their best life, we've dedicated ourselves to creating 
                a community where growth, success, and transformation are not just possible—they're inevitable.
              </p>
              <Button variant="hero" size="lg" asChild>
                <Link to="/partnership">Work With Us</Link>
              </Button>
            </div>
            <div className="animate-float">
              <img 
                src="/api/placeholder/600/500" 
                alt="Our Team" 
                className="w-full h-96 object-cover rounded-2xl shadow-strong"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Business History */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <img 
                src="/api/placeholder/600/400" 
                alt="Company Origins" 
                className="w-full h-80 object-cover rounded-xl shadow-medium"
              />
            </div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-foreground">
                How It All Began
              </h2>
              <div className="space-y-6 text-muted-foreground">
                <p className="leading-relaxed">
                  What started as a passion project in 2020 has grown into a thriving community of over 50,000 
                  ambitious individuals. Our founder recognized a gap in the market for authentic, actionable 
                  content that actually helps people achieve their goals.
                </p>
                <p className="leading-relaxed">
                  Through countless hours of research, testing, and community feedback, we've developed a proven 
                  methodology that has helped thousands of people transform their lives and businesses.
                </p>
                <p className="leading-relaxed">
                  Today, we're proud to be a trusted resource for entrepreneurs, professionals, and anyone 
                  committed to personal growth and success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-foreground">
              Our Core Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do and shape how we serve our community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Heart,
                title: "Authenticity",
                description: "We believe in genuine, honest communication and real results over hype.",
              },
              {
                icon: Users2,
                title: "Community First",
                description: "Our community's success is our success. We're in this journey together.",
              },
              {
                icon: Award,
                title: "Excellence",
                description: "We strive for the highest quality in everything we create and deliver.",
              },
              {
                icon: Clock,
                title: "Consistency",
                description: "Sustainable growth comes from consistent action and reliable systems.",
              },
            ].map((value, index) => (
              <Card key={index} className="group hover:shadow-medium transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-foreground">
                The People Behind the Mission
              </h2>
              <div className="space-y-6 text-muted-foreground">
                <p className="leading-relaxed">
                  Our team is a diverse group of experts, creators, and growth enthusiasts who share a common 
                  vision: to help as many people as possible achieve their dreams and live fulfilling lives.
                </p>
                <p className="leading-relaxed">
                  From content creators and business strategists to community managers and technical experts, 
                  each team member brings unique skills and perspectives that strengthen our collective impact.
                </p>
                <p className="leading-relaxed">
                  We're not just colleagues—we're a family united by purpose, driven by results, and committed 
                  to making a difference in the lives of those we serve.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="/api/placeholder/300/300" 
                alt="Team Member 1" 
                className="w-full h-48 object-cover rounded-lg shadow-soft hover:shadow-medium transition-shadow duration-300"
              />
              <img 
                src="/api/placeholder/300/300" 
                alt="Team Member 2" 
                className="w-full h-48 object-cover rounded-lg shadow-soft hover:shadow-medium transition-shadow duration-300"
              />
              <img 
                src="/api/placeholder/300/300" 
                alt="Team Member 3" 
                className="w-full h-48 object-cover rounded-lg shadow-soft hover:shadow-medium transition-shadow duration-300"
              />
              <img 
                src="/api/placeholder/300/300" 
                alt="Team Member 4" 
                className="w-full h-48 object-cover rounded-lg shadow-soft hover:shadow-medium transition-shadow duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Our Impact by the Numbers
              </h2>
              <p className="text-xl text-primary-foreground/90 mb-8">
                These numbers represent real people who have transformed their lives through our community and resources.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              {[
                { number: "50K+", label: "Community Members" },
                { number: "10K+", label: "Success Stories" },
                { number: "100+", label: "Free Resources" },
                { number: "95%", label: "Satisfaction Rate" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold mb-2 text-accent-light">
                    {stat.number}
                  </div>
                  <div className="text-primary-foreground/80">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;