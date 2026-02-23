import Footer from "@/components/footer";
import { Header } from "@/components/header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/story")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Header />
      <section className="pb-8">
        <div className="page-title text-center mb-8">
          <h3 className="">
            <span className="text-gold">The How </span>and Why
          </h3>
        </div>
        <p className="italic text-center font-bold pt-4 pb-8">
          From the Shadows of the Shed
          <span className="text-gold"> to the Center of the Circuit</span>
        </p>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 animate-bottom-in">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="inline-block px-3 py-1 bg-rust/50 dark:text-white text-background rounded-full text-xs uppercase tracking-wider mb-4 border border-rust">
                The Discovery
              </div>
              <h2 className="font-display text-4xl text-foreground mb-6">
                Twenty Years in the Dark
              </h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
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

              <div className="mt-8 flex items-center gap-4 bg-linear-to-b from-foreground/5 to-transparent dark:bg-background px-4 py-2 rounded-lg">
                <div className="h-px flex-1 bg-linear-to-r from-gold to-transparent"></div>
                <span className="text-gold font-display text-sm tracking-widest">
                  EST. 2024
                </span>
                <div className="h-px flex-1 bg-linear-to-l from-gold to-transparent"></div>
              </div>
            </div>
            <div className="order-1 md:order-2 relative">
              <div className="aspect-4/3 rounded-lg overflow-hidden mechanical-border relative group">
                <img
                  src="/shedbike.jpeg"
                  alt="Barn Find"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 hover:scale-105 duration-300"
                />

                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-background/80 dark:text-foreground font-display text-lg">
                    Day 0: Discovery
                  </p>
                  <p className="text-background/80 dark:text-foreground text-sm">
                    Covered in dust, full of potential
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-motor-dark mechanical-border rounded-lg flex items-center justify-center border-2 border-gold/20">
                <div className="text-center">
                  <div className="text-2xl font-display text-gold">1984</div>
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
