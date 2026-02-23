import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

import type {
  TimelinePhaseType,
  TaskWithImages,
  ImageType,
} from "@/types/database";

type TimelinePhaseWithTasks = TimelinePhaseType & { tasks: TaskWithImages[] };

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
      return data as TimelinePhaseType[];
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
        .select(
          `
          *,
          task_images (
            image_id,
            images (
              id, url, alt_text, uploaded_by, created_at
            )
          )
        `,
        )
        .order("task_id", { ascending: true });

      if (tasksError) throw tasksError;

      // Group tasks by phase and map images
      const phasesWithTasks: TimelinePhaseWithTasks[] = (
        phases as TimelinePhaseType[]
      ).map((phase) => ({
        ...phase,
        tasks: (
          tasks as (TaskWithImages & { task_images: { images: ImageType }[] })[]
        ) // Use ImageType here
          .filter((task) => task.phase_id === phase.id)
          .map((task) => ({
            ...task,
            images: task.task_images.map((ti) => ti.images),
          })),
      }));

      return phasesWithTasks;
    },
  });
}

export function useCreatePhase() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (phase: Omit<TimelinePhaseType, "id" | "created_at">) => {
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
      queryClient.invalidateQueries({
        queryKey: ["timeline_phases_with_tasks"],
      });
    },
  });
}

export function useUpdatePhase() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      ...updates
    }: Partial<TimelinePhaseType> & { id: string }) => {
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
      queryClient.invalidateQueries({
        queryKey: ["timeline_phases_with_tasks"],
      });
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
      queryClient.invalidateQueries({
        queryKey: ["timeline_phases_with_tasks"],
      });
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
      return data as TaskWithImages[];
    },
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      task: Omit<TaskWithImages, "id" | "created_at" | "images">,
    ) => {
      // Adjust Omit to exclude 'images'
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
      queryClient.invalidateQueries({
        queryKey: ["timeline_phases_with_tasks"],
      });
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      ...updates
    }: Partial<Omit<TaskWithImages, "images">> & { id: string }) => {
      // Adjust Partial to omit 'images'
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
      queryClient.invalidateQueries({
        queryKey: ["timeline_phases_with_tasks"],
      });
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
      queryClient.invalidateQueries({
        queryKey: ["timeline_phases_with_tasks"],
      });
    },
  });
}

export function useManageTaskImages() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      taskId,
      imageIds,
    }: {
      taskId: string;
      imageIds: string[];
    }) => {
      // 1. Delete existing associations for this taskId
      const { error: deleteError } = await supabase
        .from("task_images")
        .delete()
        .eq("task_id", taskId);

      if (deleteError) {
        console.error("Error deleting existing task images:", deleteError);
        throw deleteError;
      }

      // 2. Insert new associations
      if (imageIds.length > 0) {
        const newAssociations = imageIds.map((imageId) => ({
          task_id: taskId,
          image_id: imageId,
        }));
        const { error: insertError } = await supabase
          .from("task_images")
          .insert(newAssociations);

        if (insertError) {
          console.error("Error inserting new task images:", insertError);
          throw insertError;
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["timeline_phases_with_tasks"],
      });
    },
  });
}
