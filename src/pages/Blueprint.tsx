import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Users, Download, CheckCircle, Target, Zap } from "lucide-react";

const Blueprint = () => {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");

  const handleDownloadClick = () => {
    setShowEmailForm(true);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Blueprint download requested for:", firstName, email);
    setFirstName("");
    setEmail("");
    setShowEmailForm(false);
    // TODO: Implement actual email sending and PDF delivery
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <Badge className="bg-gradient-primary text-primary-foreground mb-4">
              ⭐ CORNERSTONE GUIDE
            </Badge>
            <h1 className="text-3xl font-bold text-foreground">The Source Blueprint</h1>
          </div>
          
          <Card className="group hover:shadow-strong transition-all duration-300 hover:-translate-y-2 relative overflow-hidden bg-gradient-subtle border-2 border-primary/20">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                  Moderate
                </Badge>
              </div>
              <CardTitle className="text-2xl leading-snug group-hover:text-primary transition-colors text-center">
                Big Daddy's Foundation Blueprint
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {showEmailForm ? (
                <div className="space-y-4 animate-fade-in">
                  <div className="text-center">
                    <h4 className="font-semibold text-foreground">Get Your Free Blueprint</h4>
                  </div>
                  <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="firstName" className="text-sm">First Name</Label>
                      <Input
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Your first name"
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                        className="mt-1"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      variant="hero" 
                      size="lg" 
                      className="w-full"
                    >
                      Send Me The Blueprint <Download className="w-4 h-4 ml-2" />
                    </Button>
                  </form>
                  <p className="text-sm text-muted-foreground text-center">
                    We'll email you the guide instantly. No spam, ever.
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-muted-foreground leading-relaxed text-center text-lg">
                    The complete operating system for health, wealth & happiness. 20 Daily Wins + 20 Daily Drifts, weekly identity check-in, plug-in habit library – a full operating system for transformation.
                  </p>
                  
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-foreground text-center">Key Takeaways:</p>
                    <ul className="space-y-2 max-w-md mx-auto">
                      <li className="text-sm text-muted-foreground flex items-start">
                        <CheckCircle className="w-4 h-4 mr-3 mt-0.5 text-primary flex-shrink-0" />
                        Momentum over motivation – one tick is a "vote" for your future self
                      </li>
                      <li className="text-sm text-muted-foreground flex items-start">
                        <CheckCircle className="w-4 h-4 mr-3 mt-0.5 text-primary flex-shrink-0" />
                        Wins spark wins – identity shifts trigger better choices and higher energy
                      </li>
                      <li className="text-sm text-muted-foreground flex items-start">
                        <CheckCircle className="w-4 h-4 mr-3 mt-0.5 text-primary flex-shrink-0" />
                        Track patterns, not perfection – see which habits ignite positive chain reactions
                      </li>
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        12 min read
                      </span>
                      <span className="text-sm text-muted-foreground flex items-center">
                        <BookOpen className="w-4 h-4 mr-2" />
                        19 pages
                      </span>
                    </div>
                    <Button 
                      size="lg" 
                      variant="hero" 
                      className="group-hover:shadow-strong"
                      onClick={handleDownloadClick}
                    >
                      Download Now <Download className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Blueprint;