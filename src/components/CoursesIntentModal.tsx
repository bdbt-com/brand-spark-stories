import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Loader2, Mail, ArrowRight, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useFormValidation } from "@/hooks/useFormValidation";
import { supabase } from "@/integrations/supabase/client";
import { getGuideUrl } from "@/data/guideMapping";

const COURSE_OPTIONS = ["Exercise", "Money", "Nutrition", "Sleep"];

interface CoursesIntentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitted?: (course: string) => void;
}

const CoursesIntentModal = ({ open, onOpenChange, onSubmitted }: CoursesIntentModalProps) => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [courses, setCourses] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { fieldErrors, validateField, validateAllFields, clearErrors } = useFormValidation();
  const { toast } = useToast();

  const guideUrl = getGuideUrl("BDBT Foundation Blueprint") || "";

  const markSeen = () => {
    try {
      sessionStorage.setItem("courses_intent_modal_seen", "1");
    } catch {}
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAllFields(firstName, email)) return;

    setIsLoading(true);
    clearErrors();

    try {
      const sendPromise = supabase.functions.invoke("send-guide", {
        body: {
          firstName,
          email,
          guideTitle: "Courses Waiting List",
          guideDownloadUrl: guideUrl,
        },
      });

      if (courses.length > 0) {
        const rows = courses.map((c) => ({ email, course_title: c }));
        supabase.from("course_waitlist").insert(rows).then(() => {});
      }

      const { data, error } = await sendPromise;
      if (error) throw error;
      if (!data?.success) throw new Error(data?.error || "Failed to sign up");

      setIsSubmitted(true);
      markSeen();
      onSubmitted?.(courses[0] ?? "");
      setTimeout(() => onOpenChange(false), 4000);
    } catch (err: any) {
      toast({
        title: "Oops! Something went wrong",
        description: err.message || "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) markSeen();
    onOpenChange(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="w-[calc(100vw-1.5rem)] max-w-md sm:max-w-lg p-5 sm:p-6 max-h-[92vh] overflow-y-auto bg-gradient-to-br from-primary/10 via-[#141414] to-primary/5 border-2 border-primary/40 rounded-2xl shadow-[0_0_60px_-10px_hsl(var(--primary)/0.5)] [&>button]:top-3 [&>button]:right-3 [&>button]:h-9 [&>button]:w-9"
      >
        {isSubmitted ? (
          <div className="text-center py-8 animate-scale-in">
            <div className="w-16 h-16 bg-primary/15 border border-primary/40 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold italic text-primary mb-2">
              You're on the list ✓
            </h3>
            <p className="text-sm text-foreground/90 mb-3">
              Check your inbox for the Foundation Blueprint.
            </p>
            <div className="flex items-center justify-center text-xs text-primary">
              <Mail className="w-3 h-3 mr-1" />
              Sent to: {email}
            </div>
          </div>
        ) : (
          <>
            <DialogHeader className="text-center sm:text-center space-y-1.5">
              <DialogTitle className="font-bold italic text-primary text-xl sm:text-2xl leading-tight">
                Pick where you want your first win
              </DialogTitle>
              <DialogDescription className="text-foreground/80 text-sm">
                Get the free Foundation Blueprint + early access when your course drops.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-3 mt-1">
              <div className="space-y-2">
                <Label className="text-xs text-foreground">
                  Which course are you most interested in?{" "}
                  <span className="text-muted-foreground font-normal">(optional)</span>
                </Label>
                <div className="grid grid-cols-2 gap-2.5">
                  {COURSE_OPTIONS.map((opt) => {
                    const selected = courses.includes(opt);
                    return (
                      <button
                        key={opt}
                        type="button"
                        aria-pressed={selected}
                        onClick={() =>
                          setCourses((prev) =>
                            prev.includes(opt) ? prev.filter((c) => c !== opt) : [...prev, opt]
                          )
                        }
                        className={`relative w-full min-h-[52px] px-4 rounded-xl text-base font-bold transition-all active:scale-[0.98] ${
                          selected
                            ? "bg-primary text-primary-foreground shadow-[0_0_24px_-6px_hsl(var(--primary)/0.8)]"
                            : "bg-transparent border-2 border-primary/50 text-primary hover:bg-primary/10"
                        }`}
                      >
                        {opt}
                        {selected && (
                          <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-scale-in" />
                        )}
                      </button>
                    );
                  })}
                </div>
                {courses.length > 0 && (
                  <p className="text-[11px] text-primary animate-fade-in">
                    {courses.length} selected — we'll tailor your early access.
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="intent-first-name" className="text-xs">First Name *</Label>
                <Input
                  id="intent-first-name"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    if (fieldErrors.firstName) validateField("firstName", e.target.value);
                  }}
                  onBlur={() => validateField("firstName", firstName)}
                  placeholder="Enter your first name"
                  disabled={isLoading}
                  autoComplete="given-name"
                  autoCapitalize="words"
                  enterKeyHint="next"
                  className={`h-11 text-base ${fieldErrors.firstName ? "border-red-500" : "focus:border-primary"}`}
                />
                {fieldErrors.firstName && (
                  <p className="text-xs text-red-500">{fieldErrors.firstName}</p>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="intent-email" className="text-xs">Email Address *</Label>
                <Input
                  id="intent-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (fieldErrors.email) validateField("email", e.target.value);
                  }}
                  onBlur={() => validateField("email", email)}
                  placeholder="your@email.com"
                  disabled={isLoading}
                  inputMode="email"
                  autoComplete="email"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  enterKeyHint="send"
                  className={`h-11 text-base ${fieldErrors.email ? "border-red-500" : "focus:border-primary"}`}
                />
                {fieldErrors.email && (
                  <p className="text-xs text-red-500">{fieldErrors.email}</p>
                )}
              </div>

              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full min-h-12"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Join the Waitlist + Get the Blueprint
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>

              <p className="text-[11px] text-center text-muted-foreground">
                No spam. Unsubscribe anytime.
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CoursesIntentModal;
