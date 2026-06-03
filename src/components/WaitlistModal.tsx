import { useState } from "react";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Check, Loader2 } from "lucide-react";

interface WaitlistModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courseTitle: string;
}

const emailSchema = z.string().trim().email("Please enter a valid email").max(255);

const WaitlistModal = ({ open, onOpenChange, courseTitle }: WaitlistModalProps) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const reset = () => {
    setEmail("");
    setStatus("idle");
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      setError(parsed.error.errors[0].message);
      return;
    }
    setStatus("loading");
    const { error: insertError } = await supabase
      .from("course_waitlist")
      .insert({ email: parsed.data, course_title: courseTitle });

    if (insertError && !insertError.message.toLowerCase().includes("duplicate")) {
      setStatus("error");
      setError("Something went wrong. Please try again.");
      return;
    }
    setStatus("success");
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        onOpenChange(o);
        if (!o) setTimeout(reset, 200);
      }}
    >
      <DialogContent className="bg-[#141414] border-primary/30 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-primary italic font-bold text-2xl">
            Join the Waitlist
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Be first in when {courseTitle} opens.
          </DialogDescription>
        </DialogHeader>

        {status === "success" ? (
          <div className="py-6 text-center space-y-3">
            <div className="mx-auto w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center">
              <Check className="w-7 h-7 text-primary" />
            </div>
            <p className="text-foreground font-semibold">You're on the list ✓</p>
            <p className="text-sm text-muted-foreground">
              We'll email you the moment {courseTitle} opens.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <Input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading"}
              className="min-h-12"
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button
              type="submit"
              variant="default"
              size="lg"
              disabled={status === "loading"}
              className="w-full min-h-12 font-bold"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Submitting…
                </>
              ) : (
                "Notify Me"
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default WaitlistModal;
