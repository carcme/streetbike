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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="space-y-8 px-4">
        <div className="text-center mb-8">
          <h3 className="page-title bg-linear-to-r from-white to-gray-500 bg-clip-text text-transparent">
            <span className="text-gold">Build</span> Timeline
          </h3>
          <p className="text-muted-foreground">
            Witness the transformation step by step.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps?.map((step) => {
            return (
              <Link
                key={step.id}
                to="/timeline/$stepId"
                params={{ stepId: step.id }}
                className="block h-full"
              >
                <Card className="h-full overflow-hidden border-none shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl cursor-pointer">
                  <div className="aspect-video relative overflow-hidden ">
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
                        className="uppercase text-xs font-bold text-gold"
                      >
                        {step.category}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{step.title}</CardTitle>
                      <span className="text-xs text-muted-foreground font-mono">
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
