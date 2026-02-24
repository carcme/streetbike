import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// import { steps } from "@/data/data";
import Footer from "@/components/footer";
import { Header } from "@/components/header";
import { useSteps } from "@/hooks/useSteps";

export const Route = createFileRoute("/timeline/")({
  component: Timeline,
});

function Timeline() {
  const { data: steps, isLoading } = useSteps();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-b-2 rounded-full animate-spin border-primary" />
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="px-4 space-y-8">
        <div className="mb-8 text-center">
          <h3 className="text-transparent page-title bg-linear-to-r from-white to-gray-500 bg-clip-text">
            <span className="text-primary">Build</span> Timeline
          </h3>
          <p className="text-muted-foreground">
            Witness the transformation step by step.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {steps?.map((step) => {
            return (
              <Link
                key={step.id}
                to="/timeline/$stepId"
                params={{ stepId: step.id }}
                className="block h-full"
              >
                <Card className="h-full overflow-hidden border-none shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl cursor-pointer">
                  <div className="relative overflow-hidden aspect-video ">
                    <img
                      src={step.image_url ?? undefined}
                      alt={step.title}
                      className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge
                        variant={
                          step.category === "finish" ? "default" : "secondary"
                        }
                        className="text-xs font-bold uppercase text-primary"
                      >
                        {step.category}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-xl">{step.title}</CardTitle>
                      <span className="font-mono text-xs text-muted-foreground">
                        {step.date}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base line-clamp-3">
                      {step.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}
