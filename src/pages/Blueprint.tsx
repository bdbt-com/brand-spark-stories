import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import ChevronRipple from "@/components/ChevronRipple";
import { BookOpen, Clock, Users, Download, CheckCircle, Target, Zap, Loader2, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Blueprint = () => {
  const [showEmailForm, setShowEmailForm] = useState(true);
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
            
            <h1 className="text-3xl font-bold text-primary">The Source Blueprint</h1>
          </div>

          {/* Email capture form - visible above document */}
          <Card className="mb-8 border-2 border-primary/20 bg-background">
            <CardContent className="space-y-4 pt-4 pb-4">
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
                    <h4 className="text-xl font-semibold text-foreground">Get your free copy of Big Daddy's Foundation Blueprint</h4>
                  </div>
                  
                  <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    </div>

                    <Button 
                      type="submit" 
                      variant="hero" 
                      size="lg" 
                      className="w-full transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
                      disabled={isLoading || !firstName.trim() || !email.trim()}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Sending Blueprint...
                        </>
                      ) : (
                        <>
                          Download Foundation Blueprint
                          <Download className="w-4 h-4 ml-2 group-hover:translate-y-0.5 transition-transform" />
                        </>
                      )}
                    </Button>
                  </form>

                </>
              )}
            </CardContent>
          </Card>
          
          <Card className="group hover:shadow-strong transition-all duration-300 hover:-translate-y-2 relative overflow-hidden bg-gradient-subtle border-2 border-primary/20 hover:border-warning/30">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-8 h-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl leading-snug group-hover:text-primary transition-colors text-center text-primary">
                Big Daddy's Foundation Blueprint
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4 text-center">
                <ul className="space-y-2 max-w-md mx-auto text-left">
                  <li className="text-sm text-muted-foreground flex items-start">
                    <CheckCircle className="w-4 h-4 mr-3 mt-0.5 text-primary flex-shrink-0" />
                    The BDBT Foundation blueprint will help you spot your daily drifts
                  </li>
                  <li className="text-sm text-muted-foreground flex items-start">
                    <CheckCircle className="w-4 h-4 mr-3 mt-0.5 text-primary flex-shrink-0" />
                    It will give you suggestions for Daily Wins, you can use it to track your habits, and document every step of your Journey
                  </li>
                  <li className="text-sm text-muted-foreground flex items-start">
                    <CheckCircle className="w-4 h-4 mr-3 mt-0.5 text-primary flex-shrink-0" />
                    It is your Ultimate Reference Point for Implementing the BDBT System into your life
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <p className="text-sm font-medium text-foreground text-center">Key Takeaways:</p>
                <ul className="space-y-2 max-w-md mx-auto">
                  <li className="text-sm text-muted-foreground flex items-start">
                    <CheckCircle className="w-4 h-4 mr-3 mt-0.5 text-primary flex-shrink-0" />
                    Momentum {'>'}Motivation
                  </li>
                  <li className="text-sm text-muted-foreground flex items-start">
                    <CheckCircle className="w-4 h-4 mr-3 mt-0.5 text-primary flex-shrink-0" />
                    A System that works even when your Motivation Doesn't
                  </li>
                  <li className="text-sm text-muted-foreground flex items-start">
                    <CheckCircle className="w-4 h-4 mr-3 mt-0.5 text-primary flex-shrink-0" />
                    Once Applied to your unique lifestyle, Benefit from the positive changes you Experience Daily
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          {/* CTA Section */}
          <div className="mt-20 text-center bg-warning text-white rounded-2xl p-6 sm:p-12 border-4 border-warning/40">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">
              Start Building Your Foundation Today
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto px-4">
              With your blueprint in hand, explore our complete tip library to maximize your transformation.
            </p>
            <Button variant="accent" size="lg" asChild className="w-full sm:w-auto">
              <Link to="/tips">Explore All Tips</Link>
            </Button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Blueprint;