import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Handshake, 
  Users, 
  TrendingUp, 
  Star, 
  CheckCircle, 
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Clock,
  Target,
  DollarSign
} from "lucide-react";

const Partnership = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    partnershipType: "",
    budget: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const partnershipTypes = [
    {
      icon: Users,
      title: "Content Collaboration",
      description: "Partner with us to create valuable content that serves both our audiences.",
      features: ["Joint webinars", "Co-authored guides", "Cross-promotion", "Shared expertise"],
      ideal: "Content creators, educators, thought leaders"
    },
    {
      icon: TrendingUp,
      title: "Business Partnership",
      description: "Strategic partnerships to expand reach and create mutual business growth.",
      features: ["Revenue sharing", "Joint ventures", "Market expansion", "Resource sharing"],
      ideal: "Established businesses, agencies, consultants"
    },
    {
      icon: Star,
      title: "Brand Sponsorship",
      description: "Sponsor our content and events to reach our engaged community.",
      features: ["Brand visibility", "Targeted exposure", "Event sponsorship", "Content integration"],
      ideal: "B2B companies, SaaS platforms, professional tools"
    },
    {
      icon: Handshake,
      title: "Affiliate Program",
      description: "Earn commissions by referring your audience to our premium offerings.",
      features: ["Competitive rates", "Marketing materials", "Tracking dashboard", "Regular payouts"],
      ideal: "Influencers, course creators, marketers"
    }
  ];

  const benefits = [
    "Access to our engaged community of 50K+ members",
    "Cross-promotional opportunities across multiple channels",
    "Collaborative content creation and knowledge sharing",
    "Performance tracking and analytics",
    "Dedicated partnership support team",
    "Flexible partnership terms and structures"
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Big Blue Header */}
      <section className="py-20 bg-gradient-hero text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="block text-gradient-primary">Partnership &</span>
              <span className="block text-white">Collaboration</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-white/90 leading-relaxed max-w-4xl mx-auto">
              Let's create something amazing together. We're always looking for strategic partners 
              who share our vision of empowering people to achieve their dreams.
            </p>
          </div>
        </div>
      </section>

      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Partnership Types */}
        <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-primary">
              Partnership Opportunities
            </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {partnershipTypes.map((type, index) => (
              <Card 
                key={index}
                className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-2"
              >
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border-2 border-warning/20">
                    <type.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {type.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {type.description}
                  </p>
                  <div className="space-y-2">
                    <p className="font-medium text-sm text-foreground">Key Features:</p>
                    <ul className="space-y-1">
                      {type.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="text-sm text-muted-foreground flex items-center">
                          <CheckCircle className="w-4 h-4 text-success mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Ideal for: {type.ideal}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-20 bg-gradient-subtle rounded-2xl p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-primary">
              Why Partner With Us?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join a network of successful partners who are making a real impact while growing their own businesses.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-0.5" />
                <span className="text-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-primary">
              Let's Start the Conversation
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Ready to explore partnership opportunities? Fill out the form and we'll get back to you 
              within 24 hours to discuss how we can work together.
            </p>

            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company">Company/Organization</Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="partnershipType">Partnership Interest *</Label>
                    <select
                      id="partnershipType"
                      name="partnershipType"
                      value={formData.partnershipType}
                      onChange={(e) => setFormData({...formData, partnershipType: e.target.value})}
                      required
                      className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="">Select partnership type</option>
                      <option value="content">Content Collaboration</option>
                      <option value="business">Business Partnership</option>
                      <option value="sponsorship">Brand Sponsorship</option>
                      <option value="affiliate">Affiliate Program</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="budget">Budget Range (Optional)</Label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={(e) => setFormData({...formData, budget: e.target.value})}
                      className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="">Select budget range</option>
                      <option value="under-5k">Under $5,000</option>
                      <option value="5k-25k">$5,000 - $25,000</option>
                      <option value="25k-100k">$25,000 - $100,000</option>
                      <option value="over-100k">$100,000+</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="message">Tell Us About Your Proposal *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="mt-1"
                      placeholder="Describe your partnership idea, goals, and how we can work together..."
                    />
                  </div>

                  <Button type="submit" variant="hero" size="lg" className="w-full">
                    Submit Partnership Proposal
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info & Stats */}
          <div className="space-y-8">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary" />
                  Get in Touch
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="w-5 h-5 text-primary" />
                  <span>partnerships@yourbrand.com</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="w-5 h-5 text-primary" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>Response time: Within 24 hours</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Partnership Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { icon: Users, label: "Community Reach", value: "50K+" },
                  { icon: TrendingUp, label: "Monthly Growth", value: "15%" },
                  { icon: Target, label: "Engagement Rate", value: "8.5%" },
                  { icon: DollarSign, label: "Partner ROI", value: "300%" }
                ].map((stat, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <stat.icon className="w-5 h-5 text-primary" />
                      <span className="text-muted-foreground">{stat.label}</span>
                    </div>
                    <span className="font-semibold text-foreground">{stat.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* CTA Card */}
            <Card className="bg-gradient-primary text-white">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold mb-3">
                  Ready to Partner With Us?
                </h3>
                <p className="text-white/90 mb-4">
                  Join our partner network and start building something amazing.
                </p>
                <Button variant="accent" size="sm">
                  Schedule a Call
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Partnership;