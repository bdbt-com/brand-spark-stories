import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface Subscriber {
  email: string;
  first_name: string | null;
  guide_title: string | null;
  created_at: string | null;
}

const AdminList = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uniqueCount, setUniqueCount] = useState(0);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const { data, error } = await supabase.functions.invoke("admin-email-stats");
        if (error) throw error;
        setSubscribers(data.subscribers || []);
        setUniqueCount(data.uniqueSignups || 0);
      } catch (err: any) {
        setError(err.message || "Failed to load subscribers");
      } finally {
        setLoading(false);
      }
    };
    fetchSubscribers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-2">Email Subscribers</h1>
        <p className="text-muted-foreground mb-6">
          Total entries: {subscribers.length} · Unique emails: {uniqueCount}
        </p>

        <div className="border border-border rounded-lg overflow-hidden">
          <div className="grid grid-cols-[1fr_2fr_2fr_auto] gap-2 p-3 bg-muted/30 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            <span>Name</span>
            <span>Email</span>
            <span>Guide</span>
            <span>Date</span>
          </div>

          {subscribers.map((sub, i) => (
            <div
              key={i}
              className="grid grid-cols-[1fr_2fr_2fr_auto] gap-2 p-3 border-t border-border text-sm hover:bg-muted/20 transition-colors"
            >
              <span className="text-foreground truncate">{sub.first_name || "—"}</span>
              <span className="text-foreground truncate">{sub.email}</span>
              <span className="text-muted-foreground truncate">{sub.guide_title || "—"}</span>
              <span className="text-muted-foreground whitespace-nowrap">
                {sub.created_at
                  ? new Date(sub.created_at).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "2-digit",
                    })
                  : "—"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminList;
