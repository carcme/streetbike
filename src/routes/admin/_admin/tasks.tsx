import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react"; // Import useEffect
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  useTimelinePhasesWithTasks,
  useCreatePhase,
  useUpdatePhase,
  useDeletePhase,
  useCreateTask,
  useUpdateTask,
  useDeleteTask,
  useManageTaskImages, // Will create this soon
} from "@/hooks/useTasks";
import type { TimelinePhase } from "@/types/database";

import type { ImageType, TaskWithImages } from "@/types/database";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, Plus, X, ChevronDown, ChevronUp } from "lucide-react";
import { uploadImage } from "@/lib/supabase";
import { ImageSelector } from "@/components/image-selector"; // Import ImageSelector
import { Image } from "@lonik/oh-image/react";

const phaseSchema = z.object({
  phase_number: z.coerce
    .number()
    .int()
    .min(1, "Phase number must be at least 1"),
  title: z.string().min(1, "Title is required"),
  duration: z.string().min(1, "Duration is required"),
  image_url: z.string().optional().nullable(),
  image_alt: z.string().optional().nullable(),
});

const taskSchema = z.object({
  phase_id: z.string().min(1),
  task_id: z.string().min(1, "Task ID is required"),
  task: z.string().min(1, "Task name is required"),
  details: z.string().min(1, "Details are required"),
  technical_notes: z.string().nullable(),
  status: z.enum(["pending", "completed"]),
  // images: z.array(z.string()).optional(), // No need to include in form schema directly
});

type PhaseForm = z.infer<typeof phaseSchema>;
type TaskForm = z.infer<typeof taskSchema>;

export const Route = createFileRoute("/admin/_admin/tasks")({
  component: TasksPage,
});

function TasksPage() {
  const { data: phases, isLoading } = useTimelinePhasesWithTasks();
  const createPhase = useCreatePhase();
  const updatePhase = useUpdatePhase();
  const deletePhase = useDeletePhase();
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();
  const manageTaskImages = useManageTaskImages(); // Initialize the new hook

  const [expandedPhases, setExpandedPhases] = useState<Set<string>>(new Set());
  const [editingPhaseId, setEditingPhaseId] = useState<string | null>(null);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [isCreatingPhase, setIsCreatingPhase] = useState(false);
  const [creatingTaskForPhase, setCreatingTaskForPhase] = useState<
    string | null
  >(null);
  const [selectedPhaseImage, setSelectedPhaseImage] = useState<File | null>(
    null,
  ); // Renamed for clarity
  const [selectedTaskImageIds, setSelectedTaskImageIds] = useState<string[]>(
    [],
  ); // New state for selected task images

  const phaseForm = useForm<PhaseForm>({
    resolver: zodResolver(phaseSchema) as any,
    defaultValues: {
      phase_number: 1,
      title: "",
      duration: "",
      image_url: null,
      image_alt: null,
    },
  });

  const taskForm = useForm<TaskForm>({
    resolver: zodResolver(taskSchema),
  });

  // Effect to reset selectedTaskImageIds when creating a new task or editing a different one
  useEffect(() => {
    if (creatingTaskForPhase) {
      setSelectedTaskImageIds([]); // Reset for new task
    } else if (editingTaskId) {
      // Find the current task to get its images
      const currentTask = phases
        ?.flatMap((p) => p.tasks as TaskWithImages[])
        .find((t) => t.id === editingTaskId);
      if (currentTask && currentTask.images) {
        setSelectedTaskImageIds(
          currentTask.images.map((img: ImageType) => img.id),
        );
      } else {
        setSelectedTaskImageIds([]);
      }
    } else {
      setSelectedTaskImageIds([]);
    }
  }, [creatingTaskForPhase, editingTaskId, phases]); // Depend on phases as well

  const togglePhase = (id: string) => {
    setExpandedPhases((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const onSubmitPhase = async (data: PhaseForm) => {
    let finalImageUrl: string | null = null;
    const finalImageAlt: string | null = data.image_alt || null; // Use existing alt or null

    if (selectedPhaseImage) {
      const uploadedUrl = await uploadImage(
        selectedPhaseImage,
        "timeline-images",
      );
      if (uploadedUrl) {
        finalImageUrl = uploadedUrl;
      } else {
        alert("Failed to upload image.");
        return;
      }
    } else {
      // If no new image selected, retain existing image_url if available
      finalImageUrl = data.image_url || null;
    }

    if (editingPhaseId) {
      await updatePhase.mutateAsync({
        id: editingPhaseId,
        ...data,
        image_url: finalImageUrl,
        image_alt: finalImageAlt,
      });
      setEditingPhaseId(null);
    } else {
      // Creating a new phase
      await createPhase.mutateAsync({
        ...data,
        image_url: finalImageUrl,
        image_alt: finalImageAlt,
      });
      setIsCreatingPhase(false);
    }
    phaseForm.reset();
    setSelectedPhaseImage(null); // Clear selected image after submission
  };

  const onSubmitTask = async (data: TaskForm) => {
    let taskIdToUpdate = editingTaskId;
    if (editingTaskId) {
      // Update existing task
      await updateTask.mutateAsync({ id: editingTaskId, ...data });
    } else {
      // Create new task
      const newTask = await createTask.mutateAsync(data);
      taskIdToUpdate = newTask.id;
    }

    // Manage task images
    if (taskIdToUpdate) {
      await manageTaskImages.mutateAsync({
        taskId: taskIdToUpdate,
        imageIds: selectedTaskImageIds,
      });
    }

    setEditingTaskId(null);
    setCreatingTaskForPhase(null);
    taskForm.reset();
    setSelectedTaskImageIds([]); // Clear selected images after submission
  };

  const handleEditPhase = (phase: TimelinePhase) => {
    setEditingPhaseId(phase.id);
    setIsCreatingPhase(false);
    phaseForm.reset({
      phase_number: phase.phase_number,
      title: phase.title,
      duration: phase.duration,
      image_url: phase.image_url,
      image_alt: phase.image_alt,
    });
    setSelectedPhaseImage(null); // Clear selected image when editing a phase
  };

  const handleEditTask = (task: TaskWithImages) => {
    setEditingTaskId(task.id);
    setCreatingTaskForPhase(null);
    taskForm.reset({
      phase_id: task.phase_id ?? "",
      task_id: task.task_id,
      task: task.task,
      details: task.details,
      technical_notes: task.technical_notes ?? "",
      status: task.status,
    });
    setSelectedTaskImageIds(task.images.map((img: ImageType) => img.id)); // Initialize selected images
  };

  const handleDeletePhase = async (id: string) => {
    if (confirm("Delete this phase and all its tasks?")) {
      await deletePhase.mutateAsync(id);
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (confirm("Delete this task?")) {
      await deleteTask.mutateAsync(id);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Rebuild Todo's</h1>
          <p className="text-muted-foreground">
            Manage project phases and tasks
          </p>
        </div>
        {!isCreatingPhase && !editingPhaseId && (
          <Button onClick={() => setIsCreatingPhase(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Phase
          </Button>
        )}
      </div>

      {/* Phase Form */}
      {(isCreatingPhase || editingPhaseId) && (
        <form
          onSubmit={phaseForm.handleSubmit(onSubmitPhase)}
          className="p-6 space-y-4 border rounded-lg bg-card"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              {editingPhaseId ? "Edit Phase" : "New Phase"}
            </h2>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setEditingPhaseId(null);
                setIsCreatingPhase(false);
                phaseForm.reset();
                setSelectedPhaseImage(null); // Clear selected image on cancel
              }}
              aria-label="Cancel Phase Creation/Edit"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Phase Number</label>
              <Input type="number" {...phaseForm.register("phase_number")} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input {...phaseForm.register("title")} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Duration</label>
              <Input
                {...phaseForm.register("duration")}
                placeholder="e.g., 2-3 Weeks"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Image Upload</label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setSelectedPhaseImage(e.target.files?.[0] || null)
                }
              />
              {selectedPhaseImage && (
                <p className="text-sm text-muted-foreground">
                  Selected: {selectedPhaseImage.name}
                </p>
              )}
              {!selectedPhaseImage && phaseForm.watch("image_url") && (
                <p className="text-sm text-muted-foreground">
                  Current image:{" "}
                  <a
                    href={phaseForm.watch("image_url")?.toString()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    View
                  </a>
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Image Alt</label>
              <Input {...phaseForm.register("image_alt")} />
            </div>
          </div>

          <Button type="submit">
            {editingPhaseId ? "Update Phase" : "Create Phase"}
          </Button>
        </form>
      )}

      {/* Phases List */}
      <div className="space-y-4">
        {phases?.map((phase) => (
          <div
            key={phase.id}
            className="overflow-hidden border rounded-lg bg-card"
          >
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50"
              onClick={() => togglePhase(phase.id)}
            >
              <div className="flex items-center gap-3">
                {expandedPhases.has(phase.id) ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
                <div>
                  <span className="font-semibold">
                    Phase {phase.phase_number}: {phase.title}
                  </span>
                  <span className="ml-2 text-sm text-muted-foreground">
                    ({phase.duration})
                  </span>
                </div>
              </div>
              <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEditPhase(phase)}
                  aria-label={`Edit Phase: ${phase.title}`}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeletePhase(phase.id)}
                  aria-label={`Delete Phase: ${phase.title}`}
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            </div>

            {expandedPhases.has(phase.id) && (
              <div className="p-4 pt-0 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Tasks ({phase.tasks.length})
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setCreatingTaskForPhase(phase.id);
                      taskForm.reset({ phase_id: phase.id, status: "pending" });
                    }}
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add Task
                  </Button>
                </div>

                {/* Task Form */}
                {(creatingTaskForPhase === phase.id ||
                  (editingTaskId &&
                    phase.tasks.some((t) => t.id === editingTaskId))) && (
                  <form
                    onSubmit={taskForm.handleSubmit(onSubmitTask)}
                    className="p-4 space-y-3 rounded-md bg-muted/50"
                  >
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Task ID</label>
                        <Input
                          {...taskForm.register("task_id")}
                          placeholder="Task ID (e.g., 1.1)"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Task Name</label>
                        <Input
                          {...taskForm.register("task")}
                          placeholder="Task name"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium">Details</label>
                        <Input
                          {...taskForm.register("details")}
                          placeholder="Details"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Technical Notes (optional)
                        </label>
                        <Input
                          {...taskForm.register("technical_notes")}
                          placeholder="Technical notes (optional)"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Status</label>
                        <select
                          {...taskForm.register("status")}
                          className="w-full px-3 py-2 border rounded-md bg-background"
                        >
                          <option value="pending">Pending</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                    </div>

                    {/* Image Selector */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Associated Images
                      </label>
                      <ImageSelector
                        initialSelectedImageIds={selectedTaskImageIds}
                        onSelectionChange={setSelectedTaskImageIds}
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button type="submit" size="sm">
                        {editingTaskId ? "Update" : "Create"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingTaskId(null);
                          setCreatingTaskForPhase(null);
                          taskForm.reset();
                          setSelectedTaskImageIds([]); // Clear selected images on cancel
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                )}

                {/* Tasks List */}
                <div className="space-y-2">
                  {phase.tasks.map((task: TaskWithImages) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between p-3 border rounded bg-background"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="px-1 font-mono text-xs rounded bg-muted">
                            {task.task_id}
                          </span>
                          <span
                            className={`text-xs px-1.5 py-0.5 rounded ${
                              task.status === "completed"
                                ? "bg-green-500/10 text-green-500"
                                : "bg-yellow-500/10 text-yellow-500"
                            }`}
                          >
                            {task.status}
                          </span>
                        </div>
                        <p className="mt-1 text-sm font-medium">{task.task}</p>
                        <p className="text-xs text-muted-foreground">
                          {task.details}
                        </p>
                        {task.images && task.images.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {task.images.map((img) => (
                              <Image
                                key={img.id}
                                src={img.url}
                                alt={img.alt_text || "Task image"}
                                className="object-cover w-10 h-10 rounded-sm"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditTask(task)}
                          aria-label={`Edit Task: ${task.task}`}
                        >
                          <Pencil className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteTask(task.id)}
                          aria-label={`Delete Task: ${task.task}`}
                        >
                          <Trash2 className="w-3 h-3 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        {phases?.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            No phases yet. Create your first phase to get started.
          </div>
        )}
      </div>
    </div>
  );
}
