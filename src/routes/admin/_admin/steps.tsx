import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  useSteps,
  useCreateStep,
  useUpdateStep,
  useDeleteStep,
} from "@/hooks/useSteps";
import type { Step, StepCategory } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, Plus, X } from "lucide-react";

const stepSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  date: z.string().min(1, "Date is required"),
  category: z.enum(["find", "strip", "build", "respray", "finish"]),
  image_url: z.string().min(1, "Image URL is required"),
  sort_order: z.coerce.number().int().min(0),
});

type StepForm = z.infer<typeof stepSchema>;

export const Route = createFileRoute("/admin/_admin/steps")({
  component: StepsPage,
});

function StepsPage() {
  const { data: steps, isLoading } = useSteps();
  const createStep = useCreateStep();
  const updateStep = useUpdateStep();
  const deleteStep = useDeleteStep();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StepForm>({
    resolver: zodResolver(stepSchema) as any,
    defaultValues: {
      sort_order: steps?.length ?? 0,
    },
  });

  const onSubmit = async (data: StepForm) => {
    if (editingId) {
      await updateStep.mutateAsync({ id: editingId, ...data });
      setEditingId(null);
    } else {
      await createStep.mutateAsync(data);
      setIsCreating(false);
    }
    reset();
  };

  const handleEdit = (step: Step) => {
    setEditingId(step.id);
    setIsCreating(false);
    reset({
      title: step.title,
      description: step.description,
      date: step.date,
      category: step.category,
      image_url: step.image_url,
      sort_order: step.sort_order,
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this step?")) {
      await deleteStep.mutateAsync(id);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsCreating(false);
    reset();
  };

  const categories: StepCategory[] = [
    "find",
    "strip",
    "build",
    "respray",
    "finish",
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Steps</h1>
          <p className="text-muted-foreground">Manage restoration milestones</p>
        </div>
        {!isCreating && !editingId && (
          <Button onClick={() => setIsCreating(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Step
          </Button>
        )}
      </div>

      {(isCreating || editingId) && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 bg-card rounded-lg border space-y-4"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">
              {editingId ? "Edit Step" : "New Step"}
            </h2>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleCancel}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input {...register("title")} placeholder="Step title" />
              {errors.title && (
                <p className="text-sm text-destructive">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Date</label>
              <Input type="date" {...register("date")} />
              {errors.date && (
                <p className="text-sm text-destructive">
                  {errors.date.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <select
                {...register("category")}
                className="w-full px-3 py-2 rounded-md border bg-background"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-sm text-destructive">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* <div className="space-y-2">
              <label className="text-sm font-medium">Sort Order</label>
              <Input type="number" {...register("sort_order")} />
              {errors.sort_order && (
                <p className="text-sm text-destructive">
                  {errors.sort_order.message}
                </p>
              )}
            </div> */}

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Image URL</label>
              <Input
                {...register("image_url")}
                placeholder="/image.jpg or https://..."
              />
              {errors.image_url && (
                <p className="text-sm text-destructive">
                  {errors.image_url.message}
                </p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Description</label>
              <textarea
                {...register("description")}
                rows={3}
                className="w-full px-3 py-2 rounded-md border bg-background resize-none"
                placeholder="Describe this step..."
              />
              {errors.description && (
                <p className="text-sm text-destructive">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              type="submit"
              disabled={createStep.isPending || updateStep.isPending}
            >
              {editingId ? "Update" : "Create"}
            </Button>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {steps?.map((step) => (
          <div
            key={step.id}
            className="p-4 bg-card rounded-lg border flex items-start justify-between gap-4"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded">
                  {step.category}
                </span>
                <span className="text-xs text-muted-foreground">
                  {step.date}
                </span>
              </div>
              <h3 className="font-semibold">{step.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {step.description}
              </p>
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEdit(step)}
              >
                <Pencil className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(step.id)}
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          </div>
        ))}

        {steps?.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            No steps yet. Create your first step to get started.
          </div>
        )}
      </div>
    </div>
  );
}
