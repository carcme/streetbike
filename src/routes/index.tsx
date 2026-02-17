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
import StatsGrid from "@/components/statsGrid";
import Specifications from "@/components/specs";
import Updates from "@/components/updates";
import { Newsletter } from "@/components/newsletter";
import { Badge } from "@/components/ui/badge";

const imageList = [
  "concept.jpeg",
  "concept2.jpeg",
  "concept3.jpeg",
  "concept4.jpeg",
  "imageGen1.png",
  "imageGen2.png",
  "imageGen3.png",
  "imageGen4.png",
  "imageGen5.png",
  "imageGen6.png",
  "imageGen7.png",
];

function Index() {
  const imgTotal = imageList.length;
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in duration-700 slide-in-from-bottom-40">
      <div className="space-y-4">
        <h1 className="page-title bg-linear-to-r from-white to-gray-500 bg-clip-text text-transparent">
          <span className="text-gold">R65</span> Street Fighter
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
      <StatsGrid showDays={true} />
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild size="lg" className="text-lg px-8 py-6 h-auto">
          <Link to="/timeline">Start the Journey</Link>
        </Button>
        <Button
          asChild
          variant="secondary"
          size="lg"
          className="text-lg px-8 py-6 h-auto text-primary"
        >
          <a
            href="https://github.com/carcme/streetbike"
            target="_blank"
            rel="noreferrer"
          >
            GitHub Repo
          </a>
        </Button>
      </div>
      <Carousel className="w-full max-w-5xl mx-auto" opts={{ loop: true }}>
        <CarouselContent>
          {imageList.map((src, index) => (
            <CarouselItem key={index}>
              <div className="relative p-0">
                <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10 aspect-video relative">
                  <img
                    src={src}
                    alt={`Concept bike ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <Badge className="absolute bottom-0.5 right-1/2 transform translate-x-1/2 bg-black/50 text-white">
                  Concept Image {index + 1}/{imgTotal}
                </Badge>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <Specifications />
      <Updates />
      <Newsletter />
    </div>
  );
}
