import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

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
import { Image } from "@lonik/oh-image/react";
import StatsGrid from "@/components/statsGrid";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/header";

// import Specifications from "@/components/specs";
// import Updates from "@/components/updates";
// import PersonalStats from "@/components/personal-stats";
// import Footer from "@/components/footer";

const Specifications = lazy(() => import("@/components/specs"));
const Updates = lazy(() => import("@/components/updates"));
const PersonalStats = lazy(() => import("@/components/personal-stats"));
const Footer = lazy(() => import("@/components/footer"));

const imageList = [
  "concept.webp",
  "concept2.webp",
  "concept3.webp",
  "concept4.webp",
  "imageGen1.webp",
  "imageGen2.webp",
  "imageGen3.webp",
  "imageGen4.webp",
  "imageGen5.webp",
  "imageGen6.webp",
  "imageGen7.webp",
];

function Index() {
  const imgTotal = imageList.length;
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center space-y-8 text-center ">
        <div className="pb-4 space-y-4">
          <h1 className="page-title">
            R65<span className="text-primary"> Coffee Racer</span>
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground">
            From rusted shed find to a track-tearing monster. Follow the
            complete restoration journey of the BMW R65.
            <br />
          </p>
          <p className="pt-0 text-lg italic font-bold text-center">
            "It's not just a Bike,
            <span className="text-primary"> it's an Obsession</span>."
          </p>
        </div>

        <StatsGrid showDays={true} />
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg" className="h-auto px-8 py-6 text-lg">
            <Link to="/timeline">Start the Journey</Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant={"outline"}
            className="h-auto px-8 py-6 text-lg"
          >
            <a href="#specs">Technical Specifications</a>
          </Button>

          <Button
            asChild
            size="lg"
            variant={"outline"}
            className="h-auto px-8 py-6 text-lg"
          >
            <a href="#updates">Build Updates</a>
          </Button>
        </div>
        <PersonalStats />
        <Carousel className="w-full max-w-5xl mx-auto" opts={{ loop: true }}>
          <CarouselContent>
            {imageList.map((src, index) => (
              <CarouselItem key={index}>
                <div className="relative p-0">
                  <div className="relative overflow-hidden border shadow-2xl rounded-xl border-white/10 aspect-video">
                    <Image
                      src={src}
                      alt={`Concept bike ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                    <Badge className="absolute transform translate-x-1/2 text-primary-foreground top-2 right-1/2 bg-primary">
                      Concept Image {index + 1}/{imgTotal}
                    </Badge>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <div id={"specs"}>
          <Suspense fallback={null}>
            <Specifications />
          </Suspense>
        </div>

        <div id="updates" className="pt-16">
          <div className="text-center">
            <h2 className="mb-2 text-4xl text-primary">Build Updates</h2>
            <p className="text-muted-foreground">
              Latest updates from the garage
            </p>
          </div>

          <Suspense fallback={null}>
            <Updates limited={true} />
          </Suspense>
        </div>
        {/* <Newsletter /> */}
      </div>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
}
