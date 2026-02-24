import { createFileRoute } from "@tanstack/react-router";
import Footer from "@/components/footer";
import { Header } from "@/components/header";

import ImageShedBikd from "@/assets/shedbike.webp?$oh";

export const Route = createFileRoute("/story")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Header />
      <section className="pb-8">
        <div className="mb-8 text-center page-title">
          <h3 className="">
            <span className="text-primary">The How </span>and Why
          </h3>
        </div>
        <p className="pt-4 pb-8 italic font-bold text-center">
          From the Shadows of the Shed
          <span className="text-primary"> to the Center of the Circuit</span>
        </p>

        <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8 animate-bottom-in">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <div className="inline-block px-3 py-1 mb-4 text-xs tracking-wider uppercase border rounded-full bg-primary/70 text-background border-primary">
                The Discovery
              </div>
              <h2 className="mb-6 text-4xl font-display text-foreground">
                Twenty Years in the Dark
              </h2>
              <div className="space-y-4 leading-relaxed text-muted-foreground">
                <p>
                  Found tucked behind rusted garden tools and forgotten boxes,
                  this 1980s BMW R65 sat silently for two decades. The tires
                  were flat, the tank rusty, but the spirit intact.
                </p>
                <p>
                  For the price of a weekend grocery run (€500), I became the
                  custodian of this sleeping boxer twin. The mission: bring it
                  back to glory without losing its patina and character.
                </p>
                <p>
                  This isn't just a restoration—it's a resurrection. Every
                  seized bolt tells a story. Every cleaned carburetor is a step
                  back to the road.
                </p>
              </div>

              <div className="flex items-center gap-4 px-4 py-2 mt-8 rounded-lg">
                <div className="flex-1 h-px "></div>
                <span className="text-sm tracking-widest text-primary font-display">
                  EST. 2024
                </span>
                <div className="flex-1 h-px"></div>
              </div>
            </div>
            <div className="relative order-1 md:order-2">
              <div className="relative overflow-hidden rounded-lg aspect-4/3 mechanical-border group">
                <ImageShedBikd
                  alt="Barn Find"
                  className="object-cover w-full h-full duration-300 opacity-80 group-hover:opacity-100 group-hover:scale-105"
                />

                <div className="absolute inset-0 transition-opacity duration-300 ease-in-out bg-black opacity-50 group-hover:opacity-0 "></div>

                <div className="absolute bottom-4 left-4 right-4">
                  <p className="z-10 text-lg text-white font-display">
                    Day 0: Discovery
                  </p>
                  <p className="text-sm text-white">
                    Covered in Dust, Full of Potential
                  </p>
                </div>
              </div>
              <div className="absolute flex items-center justify-center w-24 h-24 border-2 rounded-lg -bottom-4 -right-4 bg-motor-dark mechanical-border border-primary">
                <div className="text-center">
                  <div className="text-2xl font-display text-primary">1984</div>
                  <div className="text-xs text-muted-foreground">
                    Model Year
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
