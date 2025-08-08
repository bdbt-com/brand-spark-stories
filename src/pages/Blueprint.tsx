import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import ChevronRipple from "@/components/ChevronRipple";
import { BookOpen, Clock, Users, Download, CheckCircle, Target, Zap, Loader2, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Blueprint = () => {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{firstName?: string; email?: string}>({});
  const { toast } = useToast();

  // Validation functions
  const validateFirstName = (name: string) => {
    if (!name.trim()) return "First name is required";
    if (name.trim().length < 2) return "First name must be at least 2 characters";
    return null;
  };

  const validateEmail = (email: string) => {
    if (!email.trim()) return "Email address is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return null;
  };

  const handleInputChange = (field: "firstName" | "email", value: string) => {
    if (field === "firstName") {
      setFirstName(value);
      if (fieldErrors.firstName) {
        const error = validateFirstName(value);
        setFieldErrors(prev => ({ ...prev, firstName: error || undefined }));
      }
    } else {
      setEmail(value);
      if (fieldErrors.email) {
        const error = validateEmail(value);
        setFieldErrors(prev => ({ ...prev, email: error || undefined }));
      }
    }
  };

  const handleDownloadClick = () => {
    setShowEmailForm(true);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const firstNameError = validateFirstName(firstName);
    const emailError = validateEmail(email);
    
    if (firstNameError || emailError) {
      setFieldErrors({
        firstName: firstNameError || undefined,
        email: emailError || undefined
      });
      return;
    }

    setIsLoading(true);
    setFieldErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitted(true);
      toast({
        title: "Success! 🎉",
        description: "Your blueprint has been sent to your email!",
      });
      
      // Reset form after success animation
      setTimeout(() => {
        setFirstName("");
        setEmail("");
        setShowEmailForm(false);
        setIsSubmitted(false);
      }, 3000);
      
    } catch (error) {
      toast({
        title: "Oops! Something went wrong",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
                <div className="space-y-6 animate-fade-in">
                  {isSubmitted ? (
                    <div className="text-center py-8 animate-scale-in">
                      <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                      </div>
                      <h4 className="text-xl font-semibold text-foreground mb-2">
                        Blueprint Sent Successfully! 🎉
                      </h4>
                      <p className="text-muted-foreground mb-4">
                        Check your email - your blueprint should arrive within minutes.
                      </p>
                      <div className="flex items-center justify-center text-sm text-muted-foreground">
                        <Mail className="w-4 h-4 mr-2" />
                        Sent to: {email}
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="text-center space-y-2">
                        <h4 className="text-xl font-semibold text-foreground">Get Your Free Blueprint</h4>
                        <p className="text-sm text-muted-foreground">
                          Join thousands who've transformed their lives with this system
                        </p>
                      </div>
                      
                      <form onSubmit={handleEmailSubmit} className="space-y-5">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="text-sm font-medium">
                            First Name *
                          </Label>
                          <Input
                            id="firstName"
                            type="text"
                            value={firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            placeholder="Enter your first name"
                            disabled={isLoading}
                            className={`mt-1 transition-all duration-200 ${
                              fieldErrors.firstName 
                                ? "border-red-500 focus:border-red-500 focus:ring-red-200" 
                                : "focus:border-primary focus:ring-primary/20"
                            }`}
                            onBlur={() => {
                              const error = validateFirstName(firstName);
                              setFieldErrors(prev => ({ ...prev, firstName: error || undefined }));
                            }}
                          />
                          {fieldErrors.firstName && (
                            <p className="text-xs text-red-500 animate-fade-in flex items-center">
                              <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                              {fieldErrors.firstName}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm font-medium">
                            Email Address *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            placeholder="Enter your email address"
                            disabled={isLoading}
                            className={`mt-1 transition-all duration-200 ${
                              fieldErrors.email 
                                ? "border-red-500 focus:border-red-500 focus:ring-red-200" 
                                : "focus:border-primary focus:ring-primary/20"
                            }`}
                            onBlur={() => {
                              const error = validateEmail(email);
                              setFieldErrors(prev => ({ ...prev, email: error || undefined }));
                            }}
                          />
                          {fieldErrors.email && (
                            <p className="text-xs text-red-500 animate-fade-in flex items-center">
                              <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                              {fieldErrors.email}
                            </p>
                          )}
                        </div>

                        <Button 
                          type="submit" 
                          variant="hero" 
                          size="lg" 
                          className="w-full transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Sending Blueprint...
                            </>
                          ) : (
                            <>
                              Send Me The Blueprint
                              <Download className="w-4 h-4 ml-2 group-hover:translate-y-0.5 transition-transform" />
                            </>
                          )}
                        </Button>
                      </form>

                      <div className="text-center space-y-2">
                        <p className="text-sm text-muted-foreground">
                          📧 Instant delivery • 🚫 No spam, ever • 🔒 Privacy protected
                        </p>
                        <button
                          type="button"
                          onClick={() => setShowEmailForm(false)}
                          className="text-xs text-muted-foreground hover:text-foreground transition-colors underline"
                          disabled={isLoading}
                        >
                          ← Go back to preview
                        </button>
                      </div>
                    </>
                  )}
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
          <div className="flex justify-center mt-12">
            <ChevronRipple to="/tips" label="View the Tips Page" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blueprint;