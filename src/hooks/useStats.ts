import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Stat, Progress } from "@/types/database";

// Stats
export function useStats() {
  return useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const { data, error } = await supabase.from("stats").select("*");

      if (error) throw error;
      return data as Stat[];
    },
  });
}

export function useCreateStat() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (stat: Omit<Stat, "id" | "created_at">) => {
      const { data, error } = await supabase
        .from("stats")
        .insert(stat)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stats"] });
    },
  });
}

export function useUpdateStat() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Stat> & { id: string }) => {
      const { data, error } = await supabase
        .from("stats")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stats"] });
    },
  });
}

export function useDeleteStat() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("stats").delete().eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stats"] });
    },
  });
}

// Progress
export function useProgress() {
  return useQuery({
    queryKey: ["progress"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("progress")
        .select("*")
        .order("sort_order", { ascending: true });

      if (error) throw error;
      return data as Progress[];
    },
  });
}

export function useCreateProgress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (progress: Omit<Progress, "id" | "created_at">) => {
      const { data, error } = await supabase
        .from("progress")
        .insert(progress)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["progress"] });
    },
  });
}

export function useUpdateProgress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      ...updates
    }: Partial<Progress> & { id: string }) => {
      const { data, error } = await supabase
        .from("progress")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["progress"] });
    },
  });
}

export function useDeleteProgress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("progress").delete().eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["progress"] });
    },
  });
}
