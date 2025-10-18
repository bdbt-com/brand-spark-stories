import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Loader2, Mail, X, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useFormValidation } from "@/hooks/useFormValidation";
import { supabase } from "@/integrations/supabase/client";

interface EmailCaptureFormProps {
  title: string;
  guideDownloadUrl: string;
  onClose: () => void;
  compact?: boolean;
}

const EmailCaptureForm = ({ title, guideDownloadUrl, onClose, compact = true }: EmailCaptureFormProps) => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { fieldErrors, validateField, validateAllFields, clearErrors } = useFormValidation();
  const { toast } = useToast();

  const handleInputChange = (field: "firstName" | "email", value: string) => {
    if (field === "firstName") {
      setFirstName(value);
      if (fieldErrors.firstName) {
        validateField("firstName", value);
      }
    } else {
      setEmail(value);
      if (fieldErrors.email) {
        validateField("email", value);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateAllFields(firstName, email)) {
      return;
    }

    setIsLoading(true);
    clearErrors();

    try {
      const { data, error } = await supabase.functions.invoke('send-guide', {
        body: {
          firstName,
          email,
          guideTitle: title,
          guideDownloadUrl,
        },
      });

      if (error) {
        throw error;
      }

      if (data?.success) {
        setIsSubmitted(true);
        toast({
          title: "Success! 🎉",
          description: `Your "${title}" guide has been sent to your email!`,
        });
        
        // Reset form after success animation
        setTimeout(() => {
          setFirstName("");
          setEmail("");
          setIsSubmitted(false);
          onClose();
        }, 3000);
      } else {
        throw new Error(data?.error || 'Failed to send guide');
      }
      
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong",
        description: error.message || "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-6 animate-scale-in">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse">
          <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        <h4 className="text-lg font-semibold text-foreground mb-2">
          Guide Sent! 🎉
        </h4>
        <p className="text-sm text-primary mb-3">
          Check your email - it should arrive within minutes.
        </p>
        <div className="flex items-center justify-center text-xs text-primary">
          <Mail className="w-3 h-3 mr-1" />
          Sent to: {email}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-4 space-y-5 py-2 animate-fade-in">
      <div className="flex items-center justify-between">
        <h4 className={`font-semibold text-foreground ${compact ? 'text-sm' : 'text-lg'}`}>
          Get Your Free Guide
        </h4>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onClose}
          className="w-6 h-6 hover:bg-destructive/10 hover:text-destructive"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
      
      {!compact && (
        <p className="text-sm text-primary">
          Join thousands who've transformed their lives with our proven strategies
        </p>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="firstName" className={compact ? "text-xs" : "text-sm"}>
            First Name *
          </Label>
          <Input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            placeholder="Enter your first name"
            disabled={isLoading}
            className={`transition-all duration-200 ${compact ? 'text-sm h-8' : ''} ${
              fieldErrors.firstName 
                ? "border-red-500 focus:border-red-500 focus:ring-red-200" 
                : "focus:border-primary focus:ring-primary/20"
            }`}
            onBlur={() => validateField("firstName", firstName)}
          />
          {fieldErrors.firstName && (
            <p className="text-xs text-red-500 animate-fade-in flex items-center">
              <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
              {fieldErrors.firstName}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="email" className={compact ? "text-xs" : "text-sm"}>
            Email Address *
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="your@email.com"
            disabled={isLoading}
            className={`transition-all duration-200 ${compact ? 'text-sm h-8' : ''} ${
              fieldErrors.email 
                ? "border-red-500 focus:border-red-500 focus:ring-red-200" 
                : "focus:border-primary focus:ring-primary/20"
            }`}
            onBlur={() => validateField("email", email)}
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
          size={compact ? "sm" : "lg"}
          className="w-full transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Sending Guide...
            </>
          ) : (
            <>
              Send Me The Guide
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
            </>
          )}
        </Button>
      </form>

    </div>
  );
};

export default EmailCaptureForm;