import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Step } from "@/types/database";

export function useSteps() {
  return useQuery({
    queryKey: ["steps"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("steps")
        .select("*")
        .order("date", { ascending: true });

      if (error) throw error;
      return data as Step[];
    },
  });
}

export const getStepQueryKey = (id: string) => ["steps", id];
export const getStepQueryFn = async (id: string) => {
  const { data, error } = await supabase
    .from("steps")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as Step;
};

export function useStep(id: string) {
  return useQuery({
    queryKey: getStepQueryKey(id),
    queryFn: () => getStepQueryFn(id),
    enabled: !!id,
  });
}

export function useCreateStep() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (step: Omit<Step, "id" | "created_at">) => {
      const { data, error } = await supabase
        .from("steps")
        .insert(step)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["steps"] });
    },
  });
}

export function useUpdateStep() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Step> & { id: string }) => {
      const { data, error } = await supabase
        .from("steps")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["steps"] });
    },
  });
}

export function useDeleteStep() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("steps").delete().eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["steps"] });
    },
  });
}
