import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export function usePageViews() {
  return useQuery({
    queryKey: ["page_views"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_counters")
        .select("count")
        .eq("key", "page_views")
        .single();

      if (error) throw error;
      return data?.count ?? 0;
    },
  });
}

export function useUniqueVisitors() {
  return useQuery({
    queryKey: ["unique_visitors"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("sessions")
        .select("*", { count: "exact", head: true });

      if (error) throw error;
      return count ?? 0;
    },
  });
}

export function useTopReferrer() {
  return useQuery({
    queryKey: ["top_referrer"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("sessions")
        .select("referrer");

      if (error) throw error;

      const counts: Record<string, number> = {};
      for (const row of data ?? []) {
        if (!row.referrer) continue;
        try {
          const host = new URL(row.referrer).hostname.replace(/^www\./, "");
          counts[host] = (counts[host] ?? 0) + 1;
        } catch {
          // ignore malformed referrer URLs
        }
      }

      const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
      return top ? { host: top[0], count: top[1] } : null;
    },
  });
}
