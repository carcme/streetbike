import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  useStats,
  useCreateStat,
  useUpdateStat,
  useDeleteStat,
} from "@/hooks/useStats";
import type { Stat } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const statSchema = z.object({
  label: z.string().min(1, "Label is required"),
  value: z.string().min(1, "Value is required"),
  featured: z.boolean().default(false),
});

type StatForm = z.infer<typeof statSchema>;

export const Route = createFileRoute("/admin/_admin/stats")({
  component: StatsPage,
});

function StatsPage() {
  const { data: stats, isLoading: statsLoading } = useStats();

  const createStat = useCreateStat();
  const updateStat = useUpdateStat();
  const deleteStat = useDeleteStat();

  const [editingStatId, setEditingStatId] = useState<string | null>(null);
  const [isCreatingStat, setIsCreatingStat] = useState(false);

  const statForm = useForm<StatForm>({
    resolver: zodResolver(statSchema) as any,
    defaultValues: {
      label: "",
      value: "",
      featured: false,
    },
  });

  const onSubmitStat = async (data: StatForm) => {
    try {
      if (editingStatId) {
        await updateStat.mutateAsync({ id: editingStatId, ...data });
        setEditingStatId(null);
      } else {
        await createStat.mutateAsync(data);
        setIsCreatingStat(false);
      }
      statForm.reset();
    } catch (error) {
      console.error("Error saving stat:", error);
    }
  };

  const handleEditStat = (stat: Stat) => {
    setEditingStatId(stat.id);
    setIsCreatingStat(false);
    statForm.reset({
      label: stat.label,
      value: stat.value,
      featured: stat.featured ?? false,
    });
  };

  if (statsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Stats & Specs</h1>
        <p className="text-muted-foreground">Manage build statistics</p>
      </div>

      {/* Stats Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Quick Stats</h2>
          {!isCreatingStat && !editingStatId && (
            <Button
              size="sm"
              onClick={() => {
                statForm.reset({ label: "", value: "", featured: false });
                setIsCreatingStat(true);
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Stat
            </Button>
          )}
        </div>

        {(isCreatingStat || editingStatId) && (
          <form
            onSubmit={statForm.handleSubmit(onSubmitStat)}
            className="p-4 space-y-3 border rounded-lg bg-card"
          >
            <div className="flex items-center justify-between ">
              <h3 className="font-medium">
                {editingStatId ? "Edit Stat" : "New Stat"}
              </h3>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setEditingStatId(null);
                  setIsCreatingStat(false);
                  statForm.reset();
                }}
                aria-label="Cancel Stat Creation/Edit"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid items-end grid-cols-1 gap-3 md:grid-cols-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Label</label>
                <Input
                  {...statForm.register("label")}
                  placeholder="e.g., Beers Drank"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Value</label>
                <Input {...statForm.register("value")} placeholder="e.g., 3" />
              </div>

              <div className="flex items-center h-10 gap-4">
                <label className="text-sm font-medium">Featured</label>
                <Controller
                  name="featured"
                  control={statForm.control}
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>
            <Button type="submit" size="sm">
              {editingStatId ? "Update" : "Create"}
            </Button>
          </form>
        )}

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {stats?.map((stat) => (
            <div
              key={stat.id}
              className="flex items-center justify-between p-4 border rounded-lg bg-card"
            >
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  {stat.featured && (
                    <span className="text-[10px] bg-primary text-background px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-lg font-bold">{stat.value}</p>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEditStat(stat)}
                  aria-label={`Edit Stat: ${stat.label}`}
                >
                  <Pencil className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteStat.mutate(stat.id)}
                  aria-label={`Delete Stat: ${stat.label}`}
                >
                  <Trash2 className="w-3 h-3 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
