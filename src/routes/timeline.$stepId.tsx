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
import type { Step } from "@/types/database"; // Import Step type

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
          className="fixed inset-0 z-100 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setIsFullScreen(false)}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full h-12 w-12"
            onClick={() => setIsFullScreen(false)}
            aria-label="Close full screen image"
          >
            <X className="h-8 w-8" />
          </Button>
          <img
            src={step.image_url}
            alt={step.title}
            className="max-w-full max-h-[95vh] object-contain shadow-2xl"
          />
        </div>
      )}

      <div className="px-4 md:px-8 md:py-8 animate-in fade-in duration-300">
        {/* Back Button */}
        <div className="mb-6">
          <Button asChild variant="outline" size="sm" className="gap-2">
            <Link to="/timeline">
              <ChevronLeft className="h-4 w-4" />
              Back to Timeline
            </Link>
          </Button>
        </div>

        {/* Main Content - Side by Side on Large Screens */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Content Area - Left on Large Screens */}
          <div className="lg:w-1/3 flex flex-col justify-center">
            <div className="bg-card lg:aspect-video rounded-xl p-8 shadow-lg border space-y-6">
              <div className="space-y-2 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-3">
                  <Badge
                    variant={
                      step.category === "finish" ? "default" : "secondary"
                    }
                    className="uppercase"
                  >
                    {step.category}
                  </Badge>
                  <span className="text-sm text-muted-foreground font-mono">
                    {step.date}
                  </span>
                </div>
                <h1 className="text-4xl font-bold tracking-tight">
                  {step.title}
                </h1>
              </div>

              <div className="w-full h-px bg-border" />

              <p className="text-lg text-muted-foreground leading-relaxed text-center lg:text-left">
                {step.description}
              </p>
            </div>
          </div>

          {/* Image Area - Right on Large Screens */}
          <div className="lg:w-2/3">
            <div
              className="relative aspect-video w-full rounded-xl overflow-hidden shadow-2xl bg-black border border-white/10 group cursor-zoom-in"
              onClick={() => setIsFullScreen(true)}
              role="button"
              aria-label="Expand image"
            >
              <img
                src={step.image_url}
                alt={step.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Zoom Hint */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 pointer-events-none">
                <div className="bg-black/30 text-white px-4 py-2 rounded-full flex items-center gap-2 backdrop-blur-xs">
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
