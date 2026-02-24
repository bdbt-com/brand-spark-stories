import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface Subscriber {
  email: string;
  first_name: string | null;
  created_at: string | null;
}

const AdminList = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [secret, setSecret] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.functions.invoke("admin-email-stats", {
        headers: { "x-admin-secret": secret },
      });
      if (error) throw error;
      if (data?.error === "Unauthorized") {
        setError("Invalid admin secret");
        setLoading(false);
        return;
      }
      setSubscribers(data.subscribers || []);
      setAuthenticated(true);
    } catch (err: any) {
      setError(err.message || "Failed to authenticate");
    } finally {
      setLoading(false);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
          <h1 className="text-xl font-bold text-foreground text-center">Admin Access</h1>
          <input
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Enter admin secret"
            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"
            autoFocus
          />
          {error && <p className="text-destructive text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading || !secret}
            className="w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "Access"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-2">Email Subscribers</h1>
        <p className="text-muted-foreground mb-6">
          {subscribers.length} unique subscribers
        </p>

        <div className="border border-border rounded-lg overflow-hidden">
          <div className="grid grid-cols-[1fr_2fr_auto] gap-2 p-3 bg-muted/30 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            <span>Name</span>
            <span>Email</span>
            <span>Date</span>
          </div>

          {subscribers.map((sub, i) => (
            <div
              key={i}
              className="grid grid-cols-[1fr_2fr_auto] gap-2 p-3 border-t border-border text-sm hover:bg-muted/20 transition-colors"
            >
              <span className="text-foreground truncate">{sub.first_name || "—"}</span>
              <span className="text-foreground truncate">{sub.email}</span>
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
