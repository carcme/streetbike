import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function Index() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8 animate-in fade-in duration-700 slide-in-from-bottom-40">
      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight lg:text-7xl bg-linear-to-r from-white to-gray-500 bg-clip-text text-transparent">
          Project: Street Fighter
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          From a rusted shed find to a track-tearing monster. Follow the
          complete restoration journey of the BMW R65.
          <br />
          <span className="text-sm italic opacity-70">
            "It's not just a bike, it's an obsession."
          </span>
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild size="lg" className="text-lg px-8 py-6 h-auto">
          <Link to="/timeline">Start the Journey</Link>
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="text-lg px-8 py-6 h-auto"
        >
          <a
            href="https://github.com/carc/moto-build"
            target="_blank"
            rel="noreferrer"
          >
            GitHub Repo
          </a>
        </Button>
      </div>
      <Carousel className="w-full max-w-5xl mx-auto" opts={{ loop: true }}>
        <CarouselContent>
          {[
            "concept.jpeg",
            "concept2.jpeg",
            "concept3.jpeg",
            "concept4.jpeg",
          ].map((src, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10 aspect-video relative">
                  <img
                    src={src}
                    alt={`Concept ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
