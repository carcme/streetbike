import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type {
  Task,
  TimelinePhase,
  TimelinePhaseWithTasks,
  ProjectMeta,
} from "@/types/database";

// Timeline Phases
export function useTimelinePhases() {
  return useQuery({
    queryKey: ["timeline_phases"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("timeline_phases")
        .select("*")
        .order("phase_number", { ascending: true });

      if (error) throw error;
      return data as TimelinePhase[];
    },
  });
}

export function useTimelinePhasesWithTasks() {
  return useQuery({
    queryKey: ["timeline_phases_with_tasks"],
    queryFn: async () => {
      const { data: phases, error: phasesError } = await supabase
        .from("timeline_phases")
        .select("*")
        .order("phase_number", { ascending: true });

      if (phasesError) throw phasesError;

      const { data: tasks, error: tasksError } = await supabase
        .from("tasks")
        .select("*")
        .order("task_id", { ascending: true });

      if (tasksError) throw tasksError;

      // Group tasks by phase
      const phasesWithTasks: TimelinePhaseWithTasks[] = (
        phases as TimelinePhase[]
      ).map((phase) => ({
        ...phase,
        tasks: (tasks as Task[]).filter((task) => task.phase_id === phase.id),
      }));

      return phasesWithTasks;
    },
  });
}

export function useCreatePhase() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (phase: Omit<TimelinePhase, "id" | "created_at">) => {
      const { data, error } = await supabase
        .from("timeline_phases")
        .insert(phase)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["timeline_phases"] });
      queryClient.invalidateQueries({ queryKey: ["timeline_phases_with_tasks"] });
    },
  });
}

export function useUpdatePhase() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      ...updates
    }: Partial<TimelinePhase> & { id: string }) => {
      const { data, error } = await supabase
        .from("timeline_phases")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["timeline_phases"] });
      queryClient.invalidateQueries({ queryKey: ["timeline_phases_with_tasks"] });
    },
  });
}

export function useDeletePhase() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("timeline_phases")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["timeline_phases"] });
      queryClient.invalidateQueries({ queryKey: ["timeline_phases_with_tasks"] });
    },
  });
}

// Tasks
export function useTasks(phaseId?: string) {
  return useQuery({
    queryKey: ["tasks", phaseId],
    queryFn: async () => {
      let query = supabase.from("tasks").select("*").order("task_id");

      if (phaseId) {
        query = query.eq("phase_id", phaseId);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Task[];
    },
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (task: Omit<Task, "id" | "created_at">) => {
      const { data, error } = await supabase
        .from("tasks")
        .insert(task)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["timeline_phases_with_tasks"] });
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Task> & { id: string }) => {
      const { data, error } = await supabase
        .from("tasks")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["timeline_phases_with_tasks"] });
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("tasks").delete().eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["timeline_phases_with_tasks"] });
    },
  });
}

// Project Meta
export function useProjectMeta() {
  return useQuery({
    queryKey: ["project_meta"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("project_meta")
        .select("*")
        .single();

      if (error && error.code !== "PGRST116") throw error; // PGRST116 = no rows
      return data as ProjectMeta | null;
    },
  });
}

export function useUpdateProjectMeta() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (meta: Partial<ProjectMeta> & { id: string }) => {
      const { id, ...updates } = meta;
      const { data, error } = await supabase
        .from("project_meta")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project_meta"] });
    },
  });
}
