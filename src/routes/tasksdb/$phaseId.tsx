import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useTimelinePhasesWithTasks } from "@/hooks/useTasks";
import type { ImageType } from "@/types/database";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Header } from "@/components/header";
import { Image } from "@lonik/oh-image/react";
import { ChevronLeft, X } from "lucide-react";
import { useState } from "react";

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
const noAltText = "alt-text not set";

function PhaseDetailComponent() {
  const { phaseId } = Route.useLoaderData();
  const { data: phases, isLoading, isError } = useTimelinePhasesWithTasks();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
  const [imageFullscreen, setImageFullscreen] = useState(false);

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
    <>
      <Header />
      <div className="max-w-6xl px-4 pt-4 mx-auto sm:px-6 lg:px-8">
        <Button
          onClick={() => navigate({ to: "/tasksdb" })}
          variant="outline"
          className="mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Timeline
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
                        <Card
                          key={image.id}
                          className="py-0 overflow-hidden cursor-zoom-in group mechanical-border"
                          onClick={() => setSelectedImage(image)}
                        >
                          <AspectRatio ratio={16 / 9}>
                            <Image
                              fill={true}
                              src={image.url}
                              alt={image.alt_text || `Image for ${task.task}`}
                              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                            />
                          </AspectRatio>
                        </Card>
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

      {/* Detail modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => {
            setSelectedImage(null);
            setImageFullscreen(false);
          }}
        >
          <div
            className="relative w-full max-w-xl p-2 rounded-lg shadow-xl bg-background mechanical-border"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => {
                setSelectedImage(null);
                setImageFullscreen(false);
              }}
              className="absolute z-50 top-4 right-4"
            >
              <X />
            </Button>
            <div
              className="relative mb-4 overflow-hidden rounded-lg mechanical-border cursor-zoom-in"
              onClick={() => setImageFullscreen(true)}
            >
              <Image
                fill={true}
                src={selectedImage.url}
                alt={selectedImage.alt_text || noAltText}
                className="object-cover w-full max-h-96"
              />
            </div>

            <p className="text-sm text-muted-foreground">
              {selectedImage.alt_text || noAltText}
            </p>
          </div>
        </div>
      )}

      {/* Fullscreen image overlay */}
      {imageFullscreen && selectedImage && (
        <div
          className="fixed inset-0 flex items-center justify-center z-60 bg-black/95 cursor-zoom-out"
          onClick={() => setImageFullscreen(false)}
        >
          <Button
            variant="outline"
            size="icon"
            onClick={() => setImageFullscreen(false)}
            className="absolute top-4 right-4 text-foreground"
          >
            <X />
          </Button>
          <Image
            fill={true}
            src={selectedImage.url}
            alt={selectedImage.alt_text || noAltText}
            className="object-contain sm:w-[80vw] sm:h-[80vh] max-w-full max-h-[90vh]"
          />
        </div>
      )}
    </>
  );
}
