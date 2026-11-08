import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { GoldButton } from "./ui";

// Saves a lead into the existing `course_waitlist` table (public insert allowed),
// tagged so it can be filtered. Phase 2: move to a dedicated leads table + email alert.
export const saveLead = async (email: string, tag: string) => {
  const { error } = await supabase.from("course_waitlist").insert({ email: email.trim().toLowerCase(), course_title: tag.slice(0, 900) });
  if (error) throw error;
};

interface LeadFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  tag: string; // e.g. "Coaching enquiry: Deep Dive"
  submitLabel?: string;
  showMessage?: boolean;
  messagePlaceholder?: string;
  successText?: string;
}

const LeadForm = ({
  open,
  onOpenChange,
  title,
  description,
  tag,
  submitLabel = "Send",
  showMessage = false,
  messagePlaceholder = "Anything you'd like me to know (optional)",
  successText = "Thanks, I'll be in touch shortly.",
}: LeadFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setState("error");
    setState("loading");
    try {
      const parts = [tag, `Name: ${name.trim() || "-"}`];
      if (showMessage && message.trim()) parts.push(`Message: ${message.trim()}`);
      await saveLead(email, parts.join(" | "));
      setState("done");
    } catch {
      setState("error");
    }
  };

  const close = (o: boolean) => {
    onOpenChange(o);
    if (!o) setTimeout(() => { setState("idle"); setName(""); setEmail(""); setMessage(""); }, 200);
  };

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="max-w-md border-primary/30 bg-[#111]">
        {state === "done" ? (
          <div className="text-center py-6">
            <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
            <p className="text-lg font-semibold">{successText}</p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-primary italic text-2xl">{title}</DialogTitle>
              {description && <DialogDescription>{description}</DialogDescription>}
            </DialogHeader>
            <form onSubmit={submit} className="space-y-4 mt-2">
              <div className="space-y-1.5">
                <Label htmlFor="lead-name">First name</Label>
                <Input id="lead-name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="given-name" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="lead-email">Email</Label>
                <Input id="lead-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
              </div>
              {showMessage && (
                <div className="space-y-1.5">
                  <Label htmlFor="lead-msg">Message</Label>
                  <Textarea id="lead-msg" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder={messagePlaceholder} />
                </div>
              )}
              {state === "error" && <p className="text-sm text-destructive">Please check your email address and try again.</p>}
              <GoldButton type="submit" className="w-full" disabled={state === "loading"}>
                {state === "loading" ? <Loader2 className="w-5 h-5 animate-spin" /> : submitLabel}
              </GoldButton>
              <p className="text-xs text-muted-foreground text-center">No spam. Just the information you asked for.</p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LeadForm;
