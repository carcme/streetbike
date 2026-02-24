import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useTimelinePhasesWithTasks } from "@/hooks/useTasks";
import type { ImageType } from "@/types/database"; // Import the generated Database type
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Header } from "@/components/header";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Image } from "@lonik/oh-image/react";

// Define the route with a loader for a specific phase
export const Route = createFileRoute("/tasksdb/$phaseId")({
  loader: async ({ params }) => {
    // We already have useTimelinePhasesWithTasks that fetches all phases with tasks
    // So, we'll fetch all and then find the specific phase.
    // In a real app, you might optimize this to fetch only the specific phase.
    return { phaseId: params.phaseId };
  },
  component: PhaseDetailComponent,
});

function PhaseDetailComponent() {
  const { phaseId } = Route.useLoaderData();
  const { data: phases, isLoading, isError } = useTimelinePhasesWithTasks();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="container py-8 mx-auto">Loading phase details...</div>
    );
  }

  if (isError || !phases) {
    return (
      <div className="container py-8 mx-auto text-red-500">
        Error loading phase details.
      </div>
    );
  }

  const phase = phases.find((p) => p.id === phaseId);

  if (!phase) {
    return (
      <div className="container py-8 mx-auto">
        <h1 className="mb-4 text-3xl font-bold">Phase Not Found</h1>
        <p>The requested phase could not be found.</p>
        <Button onClick={() => navigate({ to: "/tasksdb" })} className="mt-4">
          Back to Timeline
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-8 mx-auto">
      <Header />
      <div className="max-w-6xl px-4 pt-4 mx-auto sm:px-6 lg:px-8">
        <Button
          onClick={() => navigate({ to: "/tasksdb" })}
          variant="outline"
          className="mb-6"
        >
          &larr; Back to Timeline
        </Button>

        <h1 className="mb-4 text-4xl font-bold">{phase.title}</h1>
        <p className="mb-8 text-muted-foreground">Duration: {phase.duration}</p>

        <div className="space-y-12">
          {phase.tasks.length === 0 ? (
            <p className="text-muted-foreground">
              No tasks defined for this phase yet.
            </p>
          ) : (
            phase.tasks.map((task) => (
              <Card key={task.id} className="p-6">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-2xl font-semibold">
                    <div className="flex flex-col items-start gap-2 sm:items-center sm:flex-row">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          task.status === "completed"
                            ? "bg-green-600 text-white"
                            : "bg-primary text-background"
                        }`}
                      >
                        {task.status}
                      </span>
                      {task.task}
                    </div>
                  </CardTitle>
                  <CardDescription className="text-lg">
                    {task.details}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  {task.technical_notes && (
                    <div className="mb-4 text-sm text-muted-foreground">
                      <strong>Notes:</strong> {task.technical_notes}
                    </div>
                  )}
                  <div className="mb-4"></div>

                  <h3 className="mb-4 text-xl font-semibold">Task Images</h3>
                  {task.images && task.images.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                      {task.images.map((image: ImageType) => (
                        <Dialog key={image.id}>
                          <DialogTrigger asChild>
                            <Card className="py-0 overflow-hidden cursor-pointer group">
                              <AspectRatio ratio={16 / 9}>
                                <Image
                                  src={image.url}
                                  alt={
                                    image.alt_text || `Image for ${task.task}`
                                  }
                                                                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                />
                              </AspectRatio>
                            </Card>
                          </DialogTrigger>
                          <DialogContent className="flex flex-col items-center justify-center max-w-6xl p-0 max-h-96">
                            <DialogHeader className="sr-only">
                              <DialogTitle>{task.task}</DialogTitle>
                              <DialogDescription>
                                Full size image view for {task.task}
                              </DialogDescription>
                            </DialogHeader>
                            <Image
                              src={image.url}
                                                            alt={
                                image.alt_text ||
                                `Full screen image for ${task.task}`
                              }
                              className="object-cover max-w-full max-h-full"
                            />
                            <DialogFooter className="sm:justify-start">
                              <DialogClose asChild>
                                <Button type="button">Close</Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      ))}
                    </div>
                  ) : (
                    <p className="italic text-muted-foreground">
                      No images available for this task.
                    </p>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
