import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  useStats,
  useCreateStat,
  useUpdateStat,
  useDeleteStat,
  useSpecs,
  useCreateSpec,
  useUpdateSpec,
  useDeleteSpec,
} from "@/hooks/useStats";
import type { Stat, Spec } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, Plus, X } from "lucide-react";

const statSchema = z.object({
  label: z.string().min(1, "Label is required"),
  value: z.string().min(1, "Value is required"),
});

const specSchema = z.object({
  section_title: z.string().min(1, "Section title is required"),
  label: z.string().min(1, "Label is required"),
  value: z.string().min(1, "Value is required"),
  sort_order: z.coerce.number().int().min(0),
});

type StatForm = z.infer<typeof statSchema>;
type SpecForm = z.infer<typeof specSchema>;

export const Route = createFileRoute("/admin/_admin/stats")({
  component: StatsPage,
});

function StatsPage() {
  const { data: stats, isLoading: statsLoading } = useStats();
  const { data: specs, isLoading: specsLoading } = useSpecs();

  const createStat = useCreateStat();
  const updateStat = useUpdateStat();
  const deleteStat = useDeleteStat();
  const createSpec = useCreateSpec();
  const updateSpec = useUpdateSpec();
  const deleteSpec = useDeleteSpec();

  const [editingStatId, setEditingStatId] = useState<string | null>(null);
  const [editingSpecId, setEditingSpecId] = useState<string | null>(null);
  const [isCreatingStat, setIsCreatingStat] = useState(false);
  const [isCreatingSpec, setIsCreatingSpec] = useState(false);

  const statForm = useForm<StatForm>({
    resolver: zodResolver(statSchema) as any,
  });

  const specForm = useForm<SpecForm>({
    resolver: zodResolver(specSchema) as any,
  });

  const onSubmitStat = async (data: StatForm) => {
    if (editingStatId) {
      await updateStat.mutateAsync({ id: editingStatId, ...data });
      setEditingStatId(null);
    } else {
      await createStat.mutateAsync(data);
      setIsCreatingStat(false);
    }
    statForm.reset();
  };

  const onSubmitSpec = async (data: SpecForm) => {
    if (editingSpecId) {
      await updateSpec.mutateAsync({ id: editingSpecId, ...data });
      setEditingSpecId(null);
    } else {
      await createSpec.mutateAsync(data);
      setIsCreatingSpec(false);
    }
    specForm.reset();
  };

  const handleEditStat = (stat: Stat) => {
    setEditingStatId(stat.id);
    setIsCreatingStat(false);
    statForm.reset({ label: stat.label, value: stat.value });
  };

  const handleEditSpec = (spec: Spec) => {
    setEditingSpecId(spec.id);
    setIsCreatingSpec(false);
    specForm.reset({
      section_title: spec.section_title,
      label: spec.label,
      value: spec.value,
      sort_order: spec.sort_order,
    });
  };

  if (statsLoading || specsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Stats & Specs</h1>
        <p className="text-muted-foreground">
          Manage quick statistics and technical specifications
        </p>
      </div>

      {/* Stats Section */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Quick Stats</h2>
          {!isCreatingStat && !editingStatId && (
            <Button size="sm" onClick={() => setIsCreatingStat(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Stat
            </Button>
          )}
        </div>

        {(isCreatingStat || editingStatId) && (
          <form
            onSubmit={statForm.handleSubmit(onSubmitStat)}
            className="p-4 bg-card rounded-lg border space-y-3"
          >
            <div className="flex justify-between items-center">
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
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input
                {...statForm.register("label")}
                placeholder="Label (e.g., Engine CC)"
              />
              <Input
                {...statForm.register("value")}
                placeholder="Value (e.g., 650)"
              />
            </div>
            <Button type="submit" size="sm">
              {editingStatId ? "Update" : "Create"}
            </Button>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {stats?.map((stat) => (
            <div
              key={stat.id}
              className="p-4 bg-card rounded-lg border flex justify-between items-center"
            >
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-lg font-bold">{stat.value}</p>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEditStat(stat)}
                >
                  <Pencil className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteStat.mutate(stat.id)}
                >
                  <Trash2 className="w-3 h-3 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Specs Section */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Technical Specifications</h2>
          {!isCreatingSpec && !editingSpecId && (
            <Button size="sm" onClick={() => setIsCreatingSpec(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Spec
            </Button>
          )}
        </div>

        {(isCreatingSpec || editingSpecId) && (
          <form
            onSubmit={specForm.handleSubmit(onSubmitSpec)}
            className="p-4 bg-card rounded-lg border space-y-3"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-medium">
                {editingSpecId ? "Edit Spec" : "New Spec"}
              </h3>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setEditingSpecId(null);
                  setIsCreatingSpec(false);
                  specForm.reset();
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                {...specForm.register("section_title")}
                placeholder="Section (e.g., Engine & Transmission)"
              />
              <Input
                {...specForm.register("sort_order")}
                type="number"
                placeholder="Sort order"
              />
              <Input
                {...specForm.register("label")}
                placeholder="Label (e.g., Displacement)"
              />
              <Input
                {...specForm.register("value")}
                placeholder="Value (e.g., 649 cc)"
              />
            </div>
            <Button type="submit" size="sm">
              {editingSpecId ? "Update" : "Create"}
            </Button>
          </form>
        )}

        {/* Group specs by section */}
        {(() => {
          const sections = specs?.reduce(
            (acc, spec) => {
              if (!acc[spec.section_title]) {
                acc[spec.section_title] = [];
              }
              acc[spec.section_title].push(spec);
              return acc;
            },
            {} as Record<string, Spec[]>,
          );

          return Object.entries(sections || {}).map(
            ([section, sectionSpecs]) => (
              <div key={section} className="space-y-2">
                <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                  {section}
                </h3>
                <div className="bg-card rounded-lg border divide-y">
                  {sectionSpecs.map((spec) => (
                    <div
                      key={spec.id}
                      className="p-3 flex justify-between items-center"
                    >
                      <div className="flex-1 grid grid-cols-2 gap-4">
                        <span className="text-muted-foreground">
                          {spec.label}
                        </span>
                        <span className="font-medium">{spec.value}</span>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditSpec(spec)}
                        >
                          <Pencil className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteSpec.mutate(spec.id)}
                        >
                          <Trash2 className="w-3 h-3 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ),
          );
        })()}
      </section>
    </div>
  );
}
