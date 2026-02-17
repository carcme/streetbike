import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/story")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="">
      <div className="page-title text-center mb-8">
        <h3 className="bg-linear-to-r from-white to-gray-500 bg-clip-text text-transparent">
          <span className="text-gold">The How </span>and Why
        </h3>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="inline-block px-3 py-1 bg-rust/20 text-rust rounded-full text-xs uppercase tracking-wider mb-4 border border-rust/20">
              The Discovery
            </div>
            <h2 className="font-display text-4xl text-foreground mb-6">
              Twenty Years in the Dark
            </h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                Found tucked behind rusted garden tools and forgotten boxes,
                this 1980s BMW R65 sat silently for two decades. The tires were
                flat, the tank rusty, but the spirit intact.
              </p>
              <p>
                For the price of a weekend grocery run (€500), I became the
                custodian of this sleeping boxer twin. The mission: bring it
                back to glory without losing its patina and character.
              </p>
              <p>
                This isn't just a restoration—it's a resurrection. Every seized
                bolt tells a story. Every cleaned carburetor is a step back to
                the road.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4 bg-gradient-to-b from-foreground/5 to-transparent dark:bg-background px-4 py-2 rounded-lg">
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
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-motor-gray/80 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-foreground font-display text-lg">
                  Day 0: Discovery
                </p>
                <p className="text-foreground/80 text-sm">
                  Covered in dust, full of potential
                </p>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-motor-dark mechanical-border rounded-lg flex items-center justify-center border-2 border-gold/20">
              <div className="text-center">
                <div className="text-2xl font-display text-gold">1984</div>
                <div className="text-xs text-muted-foreground">Model Year</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
