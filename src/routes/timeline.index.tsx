import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { steps } from "@/lib/data";

export const Route = createFileRoute("/timeline/")({
  component: Timeline,
});

function Timeline() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          The Build Timeline
        </h2>
        <p className="text-muted-foreground">
          Witness the transformation step by step.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {steps.map((step) => (
          <Link
            key={step.id}
            to="/timeline/$stepId"
            params={{ stepId: step.id }}
            className="block h-full"
          >
            <Card className="h-full overflow-hidden bg-card border-none shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl cursor-pointer">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={step.imageUrl}
                  alt={step.title}
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-2 right-2">
                  <Badge
                    variant={
                      step.category === "finish" ? "default" : "secondary"
                    }
                    className="uppercase text-xs font-bold"
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
        ))}
      </div>
    </div>
  );
}
