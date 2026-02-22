import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useTimelinePhasesWithTasks } from "@/hooks/useTasks";
import type { Database } from "@/types/database"; // Import the generated Database type
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
import { DialogTitle } from "@radix-ui/react-dialog";

// Define the type for an image from the database
type ImageType = Database["public"]["Tables"]["images"]["Row"];

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
      <div className="container mx-auto py-8">Loading phase details...</div>
    );
  }

  if (isError || !phases) {
    return (
      <div className="container mx-auto py-8 text-red-500">
        Error loading phase details.
      </div>
    );
  }

  const phase = phases.find((p) => p.id === phaseId);

  if (!phase) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Phase Not Found</h1>
        <p>The requested phase could not be found.</p>
        <Button onClick={() => navigate({ to: "/tasksdb" })} className="mt-4">
          Back to Timeline
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Header />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Button
          onClick={() => navigate({ to: "/tasksdb" })}
          variant="outline"
          className="mb-6"
        >
          &larr; Back to Timeline
        </Button>

        <h1 className="text-4xl font-bold mb-4">{phase.title}</h1>
        <p className="text-muted-foreground mb-8">Duration: {phase.duration}</p>

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
                    <div className="flex flex-col items-start sm:items-center sm:flex-row gap-2">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          task.status === "completed"
                            ? "bg-green-600 text-white"
                            : "bg-gold text-background"
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

                  <h3 className="text-xl font-semibold mb-4">Task Images</h3>
                  {task.images && task.images.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {task.images.map((image: ImageType) => (
                        <Dialog key={image.id}>
                          <DialogTrigger asChild>
                            <Card className="cursor-pointer overflow-hidden py-0  group">
                              <AspectRatio ratio={16 / 9}>
                                <img
                                  src={image.url}
                                  alt={
                                    image.alt_text || `Image for ${task.task}`
                                  }
                                  aria-describedby={task.task}
                                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                />
                              </AspectRatio>
                            </Card>
                          </DialogTrigger>
                          <DialogContent className="max-w-6xl max-h-96 flex flex-col items-center justify-center p-0">
                            <DialogHeader className="sr-only">
                              <DialogTitle>{task.task}</DialogTitle>
                            </DialogHeader>
                            <img
                              src={image.url}
                              aria-describedby={task.task}
                              alt={
                                image.alt_text ||
                                `Full screen image for ${task.task}`
                              }
                              className="max-w-full max-h-full object-cover"
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
                    <p className="text-muted-foreground italic">
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
