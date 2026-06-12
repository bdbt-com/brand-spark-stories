import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Loader2, Mail, X, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useFormValidation } from "@/hooks/useFormValidation";
import { supabase } from "@/integrations/supabase/client";
import { trackClick } from "@/lib/youtube-redirect";

interface EmailCaptureFormProps {
  title: string;
  description?: string;
  guideDownloadUrl: string;
  onClose: () => void;
  compact?: boolean;
  hideable?: boolean;
  headingLabel?: string | null;
  submitLabel?: string;
  successTitle?: string;
  successDescription?: string;
  showCourseSelector?: boolean;
  courseValue?: string;
  onCourseChange?: (v: string) => void;
}

const COURSE_OPTIONS = ["Exercise", "Money", "Nutrition", "Sleep", "All of them"];

const EmailCaptureForm = ({
  title,
  description,
  guideDownloadUrl,
  onClose,
  compact = true,
  hideable = true,
  headingLabel,
  submitLabel,
  successTitle,
  successDescription,
  showCourseSelector = false,
  courseValue,
  onCourseChange,
}: EmailCaptureFormProps) => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { fieldErrors, validateField, validateAllFields, clearErrors } = useFormValidation();
  const { toast } = useToast();

  const heading = headingLabel === undefined ? "Get Your Free Copy" : headingLabel;

  const handleInputChange = (field: "firstName" | "email", value: string) => {
    if (field === "firstName") {
      setFirstName(value);
      if (fieldErrors.firstName) validateField("firstName", value);
    } else {
      setEmail(value);
      if (fieldErrors.email) validateField("email", value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAllFields("Friend", email)) return;

    setIsLoading(true);
    clearErrors();

    try {
      const sendPromise = supabase.functions.invoke("send-guide", {
        body: { firstName: firstName || "Friend", email, guideTitle: title, guideDownloadUrl },
      });

      // Best-effort waitlist insert when a course is selected
      if (showCourseSelector && courseValue) {
        supabase
          .from("course_waitlist")
          .insert({ email, course_title: courseValue })
          .then(() => {});
      }

      const { data, error } = await sendPromise;
      if (error) throw error;

      if (data?.success) {
        setIsSubmitted(true);
        setTimeout(() => {
          setFirstName("");
          setEmail("");
          setIsSubmitted(false);
          onClose();
        }, 20000);
      } else {
        throw new Error(data?.error || "Failed to send guide");
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
          {successTitle ?? "Guide Sent! 🎉"}
        </h4>
        <p className="text-sm text-foreground mb-3">
          {successDescription ??
            "Check your email - it should arrive within minutes (also please check your spam just in case our system or your email is having a bad day!)."}
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
      {heading !== null && (
        <div className="flex items-center justify-between">
          <h4 className={`font-semibold text-foreground ${compact ? "text-sm" : "text-lg"}`}>
            {heading}
          </h4>
          {hideable && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="w-6 h-6 hover:bg-destructive/10 hover:text-destructive"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      )}

      {!compact && description && (
        <p className="text-sm text-foreground">{description}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="firstName" className={compact ? "text-xs" : "text-sm"}>
            First Name <span className="text-muted-foreground font-normal">(optional)</span>
          </Label>
          <Input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter your first name"
            disabled={isLoading}
            autoComplete="given-name"
            className={`transition-all duration-200 ${compact ? "text-sm h-8" : ""} focus:border-primary focus:ring-primary/20`}
          />
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
            className={`transition-all duration-200 ${compact ? "text-sm h-8" : ""} ${
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

        {showCourseSelector && (
          <div className="space-y-2 pt-1">
            <Label className="text-sm text-foreground">
              Which course are you most interested in?{" "}
              <span className="text-muted-foreground font-normal">(optional)</span>
            </Label>
            <div className="flex flex-wrap gap-2">
              {COURSE_OPTIONS.map((opt) => {
                const selected = courseValue === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => onCourseChange?.(selected ? "" : opt)}
                    className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold border transition-all ${
                      selected
                        ? "bg-primary/20 border-primary text-primary shadow-[0_0_15px_-6px_hsl(var(--primary)/0.8)]"
                        : "bg-[#141414] border-primary/40 text-foreground/85 hover:border-primary/70 hover:text-primary"
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        )}

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
          ) : submitLabel ? (
            <>{submitLabel}</>
          ) : (
            <>
              Send me this Guide
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default EmailCaptureForm;
