import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { X, Users, Mail, Clock, BookOpen } from "lucide-react";

interface AdminEmailStatsProps {
  onClose: () => void;
}

const AdminEmailStats = ({ onClose }: AdminEmailStatsProps) => {
  const { data: subscriptions, isLoading, error } = useQuery({
    queryKey: ["admin-email-subscriptions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("email_subscriptions")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const total = subscriptions?.length ?? 0;
  const sent = subscriptions?.filter((s) => s.email_sent).length ?? 0;
  const pending = total - sent;

  const guideBreakdown = subscriptions?.reduce<Record<string, number>>((acc, s) => {
    const guide = s.guide_title || "Unknown";
    acc[guide] = (acc[guide] || 0) + 1;
    return acc;
  }, {}) ?? {};

  if (error) {
    return (
      <div className="mt-4 p-4 border border-destructive/30 rounded-lg bg-destructive/5">
        <div className="flex justify-between items-center">
          <p className="text-destructive text-sm">Failed to load email stats: {(error as Error).message}</p>
          <Button variant="ghost" size="icon" onClick={onClose}><X className="w-4 h-4" /></Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">📊 Email Subscription Stats</h3>
        <Button variant="ghost" size="icon" onClick={onClose}><X className="w-4 h-4" /></Button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard icon={<Users className="w-4 h-4" />} label="Total" value={isLoading ? null : total} />
        <StatCard icon={<Mail className="w-4 h-4" />} label="Sent" value={isLoading ? null : sent} />
        <StatCard icon={<Clock className="w-4 h-4" />} label="Pending" value={isLoading ? null : pending} />
        <StatCard icon={<BookOpen className="w-4 h-4" />} label="Guides" value={isLoading ? null : Object.keys(guideBreakdown).length} />
      </div>

      {/* Guide Breakdown */}
      {!isLoading && Object.keys(guideBreakdown).length > 0 && (
        <Card>
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-sm">Signups by Guide</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-3 pt-0">
            <div className="flex flex-wrap gap-2">
              {Object.entries(guideBreakdown).sort((a, b) => b[1] - a[1]).map(([guide, count]) => (
                <Badge key={guide} variant="secondary" className="text-xs">
                  {guide}: {count}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Subscriber Table */}
      <Card>
        <CardContent className="p-0">
          <div className="max-h-64 overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Name</TableHead>
                  <TableHead className="text-xs">Email</TableHead>
                  <TableHead className="text-xs">Guide</TableHead>
                  <TableHead className="text-xs">Date</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <TableRow key={i}>
                      {Array.from({ length: 5 }).map((_, j) => (
                        <TableCell key={j}><Skeleton className="h-4 w-full" /></TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : subscriptions?.map((sub) => (
                  <TableRow key={sub.id}>
                    <TableCell className="text-xs">{sub.first_name}</TableCell>
                    <TableCell className="text-xs">{sub.email}</TableCell>
                    <TableCell className="text-xs truncate max-w-[120px]">{sub.guide_title}</TableCell>
                    <TableCell className="text-xs">{new Date(sub.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={sub.email_sent ? "default" : "secondary"} className="text-[10px]">
                        {sub.email_sent ? "Sent" : "Pending"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const StatCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: number | null }) => (
  <Card>
    <CardContent className="p-3 flex items-center gap-2">
      <div className="text-primary">{icon}</div>
      <div>
        <p className="text-[10px] text-muted-foreground uppercase">{label}</p>
        {value === null ? <Skeleton className="h-5 w-8" /> : <p className="text-lg font-bold">{value}</p>}
      </div>
    </CardContent>
  </Card>
);

export default AdminEmailStats;
