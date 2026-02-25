import { useState } from "react";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
// import { steps } from "@/data/data"; // No longer needed
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, X, Maximize2 } from "lucide-react";
import { Header } from "@/components/header";
import Footer from "@/components/footer";
import { queryClient } from "@/main"; // Import queryClient
import { getStepQueryKey, getStepQueryFn } from "@/hooks/useSteps"; // Import query functions

import type { Step } from "@/types/database";
import { Image } from "@lonik/oh-image/react";

export const Route = createFileRoute("/timeline/$stepId")({
  loader: async ({ params }) => {
    const step = await queryClient.ensureQueryData({
      queryKey: getStepQueryKey(params.stepId),
      queryFn: () => getStepQueryFn(params.stepId),
    });
    if (!step) {
      throw redirect({ to: "/timeline" });
    }
    return step;
  },
  component: StepDetail,
});

function StepDetail() {
  const step = Route.useLoaderData() as Step; // Type the step
  // const { stepId } = Route.useParams(); // stepId is not directly used in the component anymore
  const [isFullScreen, setIsFullScreen] = useState(false);

  // No longer needed as data is fetched from Supabase and redirect handles not found
  // if (!step) {
  //   return <div className="p-8 text-center text-red-500">Step not found</div>;
  // }

  // !!HACK!! - get the 'find' photo from public -- TODO: change this once sourced all images from Rob
  // This hack is no longer necessary as image_url will come directly from Supabase
  // if (step.imageUrl.startsWith("shed")) {
  //   step.imageUrl = "/" + step.imageUrl;
  // }

  // Temporarily remove prev/next step logic as it requires all steps
  // const currentIndex = steps.findIndex((s) => s.id === stepId);
  // const prevStep = steps[currentIndex - 1];
  // const nextStep = steps[currentIndex + 1];

  return (
    <>
      {/* Full Screen Modal */}
      <Header />
      {isFullScreen && (
        <div
          className="fixed inset-0 flex items-center justify-center p-4 duration-200 z-100 bg-black/95 backdrop-blur-sm animate-in fade-in"
          onClick={() => setIsFullScreen(false)}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute w-12 h-12 text-white rounded-full top-4 right-4 hover:bg-white/20"
            onClick={() => setIsFullScreen(false)}
            aria-label="Close full screen image"
          >
            <X className="w-8 h-8" />
          </Button>
          {step.image_url && (
            <Image
              fill={true}
              src={step.image_url ?? undefined}
              alt={step.title}
              className="max-w-full max-h-[95vh] object-contain shadow-2xl"
            />
          )}
        </div>
      )}

      <div className="px-4 duration-300 md:px-8 animate-in fade-in">
        {/* Back Button */}
        <div className="mt-4 mb-6">
          <Button asChild variant="outline" size="sm" className="gap-2">
            <Link to="/timeline">
              <ChevronLeft className="w-4 h-4" />
              Back to Timeline
            </Link>
          </Button>
        </div>

        {/* Main Content - Side by Side on Large Screens */}
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Content Area - Left on Large Screens */}
          <div className="flex flex-col justify-center lg:w-1/3">
            <div className="p-8 space-y-6 border shadow-lg bg-card lg:aspect-video rounded-xl">
              <div className="space-y-2 text-center lg:text-left">
                <div className="flex items-center justify-center gap-3 lg:justify-start">
                  <Badge
                    variant={
                      step.category === "finish" ? "default" : "secondary"
                    }
                    className="uppercase"
                  >
                    {step.category}
                  </Badge>
                  <span className="font-mono text-sm text-muted-foreground">
                    {step.date}
                  </span>
                </div>
                <h1 className="text-4xl font-bold tracking-tight">
                  {step.title}
                </h1>
              </div>

              <div className="w-full h-px bg-border" />

              <p className="text-lg leading-relaxed text-center text-muted-foreground lg:text-left">
                {step.description}
              </p>
            </div>
          </div>

          {/* Image Area - Right on Large Screens */}
          <div className="lg:w-2/3">
            <div
              className="relative w-full overflow-hidden bg-black border shadow-2xl aspect-video rounded-xl border-white/10 group cursor-zoom-in"
              onClick={() => setIsFullScreen(true)}
              role="button"
              tabIndex={0}
              aria-label="Expand image"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setIsFullScreen(true);
              }}
            >
              {step.image_url && (
                <Image
                  fill={true}
                  src={step.image_url ?? undefined}
                  alt={step.title}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
              )}

              {/* Zoom Hint */}
              <div className="absolute inset-0 flex items-center justify-center transition-opacity opacity-0 pointer-events-none group-hover:opacity-100 bg-black/20">
                <div className="flex items-center gap-2 px-4 py-2 text-white rounded-full bg-black/30 backdrop-blur-xs">
                  <Maximize2 className="size-4" />
                  <span className="text-sm font-medium">Click to Expand</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
