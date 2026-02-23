import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { X } from "lucide-react";

interface AdminEmailStatsProps {
  onClose: () => void;
}

const AdminEmailStats = ({ onClose }: AdminEmailStatsProps) => {
  const { data: subscriptions, isLoading, error } = useQuery({
    queryKey: ["admin-email-subscriptions"],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("admin-email-stats");
      if (error) throw error;
      return data.subscriptions as Array<{
        id: string;
        first_name: string;
        email: string;
        guide_title: string;
        email_sent: boolean;
        created_at: string;
      }>;
    },
  });

  if (error) {
    return (
      <div className="mt-4 p-4 border border-destructive/30 rounded-lg bg-destructive/5">
        <div className="flex justify-between items-center">
          <p className="text-destructive text-sm">Failed to load emails: {(error as Error).message}</p>
          <Button variant="ghost" size="icon" onClick={onClose}><X className="w-4 h-4" /></Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">📧 Email List ({subscriptions?.length ?? "..."})</h3>
        <Button variant="ghost" size="icon" onClick={onClose}><X className="w-4 h-4" /></Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="max-h-80 overflow-y-auto">
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

export default AdminEmailStats;
