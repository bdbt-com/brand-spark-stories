import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface DownloadCountsResponse {
  counts: Record<string, number>;
}

export const useDownloadCounts = () => {
  return useQuery({
    queryKey: ["download-counts"],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke<DownloadCountsResponse>(
        "get-download-counts"
      );

      if (error) {
        console.error("Error fetching download counts:", error);
        throw error;
      }

      return data?.counts || {};
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    refetchOnWindowFocus: false,
  });
};
