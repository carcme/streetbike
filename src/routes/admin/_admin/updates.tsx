import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  useProgress,
  useCreateProgress,
  useUpdateProgress,
  useDeleteProgress,
} from "@/hooks/useStats";

import type { Database } from "@/types/database";
type Progress = Database["public"]["Tables"]["progress"]["Row"];

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, Plus, X } from "lucide-react";

const progressSchema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.string().min(1, "Date is required"),
  tag: z.string().min(1, "Tag is required"),
  image_url: z.string().min(1, "Image URL is required"),
  image_alt: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  sort_order: z.coerce.number().int().min(0),
});

type ProgressForm = z.infer<typeof progressSchema>;

export const Route = createFileRoute("/admin/_admin/updates")({
  component: ProgressPage,
});

function ProgressPage() {
  const { data: progress, isLoading } = useProgress();
  const createProgress = useCreateProgress();
  const updateProgress = useUpdateProgress();
  const deleteProgress = useDeleteProgress();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProgressForm>({
    // zodResolver typing can be incompatible with react-hook-form's generic
    // inference in some TS configurations; cast to `any` to avoid build errors
    // while keeping runtime validation.
    resolver: zodResolver(progressSchema) as any,
  });

  const onSubmit = async (data: ProgressForm) => {
    if (editingId) {
      await updateProgress.mutateAsync({ id: editingId, ...data });
      setEditingId(null);
    } else {
      // ensure image_alt is present for DB insert
      const payload = { ...(data as any), image_alt: data.image_alt ?? "" };
      await createProgress.mutateAsync(payload);
      console.log("🚀 ~ onSubmit ~ data:", data);
      setIsCreating(false);
    }
    reset();
  };

  const handleEdit = (item: Progress) => {
    setEditingId(item.id);
    setIsCreating(false);
    reset({
      title: item.title,
      date: item.date ?? "",
      tag: item.tag ?? "",
      image_alt: item.image_alt ?? "",
      image_url: item.image_url ?? "",
      description: item.description ?? "",
      sort_order: item.sort_order,
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this progress update?")) {
      await deleteProgress.mutateAsync(id);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsCreating(false);
    reset();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Progress Updates</h1>
          <p className="text-muted-foreground">
            Manage blog-style restoration updates
          </p>
        </div>
        {!isCreating && !editingId && (
          <Button onClick={() => setIsCreating(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Update
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
              {editingId ? "Edit Update" : "New Update"}
            </h2>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleCancel}
              aria-label="Cancel Update Creation/Edit"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input {...register("title")} placeholder="Update title" />
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
              <label className="text-sm font-medium">Tag</label>
              <Input
                {...register("tag")}
                placeholder="e.g., engine, acquisition"
              />
              {errors.tag && (
                <p className="text-sm text-destructive">{errors.tag.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Sort Order</label>
              <Input type="number" {...register("sort_order")} />
              {errors.sort_order && (
                <p className="text-sm text-destructive">
                  {errors.sort_order.message}
                </p>
              )}
            </div>

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
              <label className="text-sm font-medium">Image Alt</label>
              <Input
                {...register("image_alt")}
                placeholder="Image alt text (optional)"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Description</label>
              <textarea
                {...register("description")}
                rows={4}
                className="w-full px-3 py-2 rounded-md border bg-background resize-none"
                placeholder="Write your update..."
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
              disabled={createProgress.isPending || updateProgress.isPending}
            >
              {editingId ? "Update" : "Create"}
            </Button>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {progress?.map((item) => (
          <div
            key={item.id}
            className="p-4 bg-card rounded-lg border flex gap-4"
          >
            {item.image_url && (
              <div className="w-24 h-24 rounded overflow-hidden shrink-0 bg-muted">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded">
                  {item.tag}
                </span>
                <span className="text-xs text-muted-foreground">
                  {item.date}
                </span>
              </div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {item.description}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEdit(item)}
                aria-label={`Edit Update: ${item.title}`}
              >
                <Pencil className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(item.id)}
                aria-label={`Delete Update: ${item.title}`}
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          </div>
        ))}

        {progress?.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            No progress updates yet. Create your first update to get started.
          </div>
        )}
      </div>
    </div>
  );
}
