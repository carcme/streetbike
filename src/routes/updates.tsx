import { createFileRoute } from "@tanstack/react-router";
import { progress } from "@/data/basicStats";

export const Route = createFileRoute("/updates")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <div className="flex flex-col items-center justify-center text-center space-y-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 ">
            <h2 className="font-display page-title text-foreground mb-2">
              <span className="text-gold">Build</span> Updates
            </h2>
            <p className="text-muted-foreground">
              Latest progress from the garage
            </p>
          </div>

          <div className="flex justify-center flex-col space-y-4  animate-bottom-in">
            {progress.section.map((section) => {
              return (
                <article
                  key={section.title}
                  className="mechanical-border rounded-lg p-4  hover:border-gold/30 transition-colors cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 text-center size-16 rounded-lg bg-foreground/30 group-hover:bg-gold flex items-center justify-center text-muted-background group-hover:text-black/80 font-bold text-sm">
                      {section.date}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-foreground font-display text-xl mb-2 group-hover:text-gold transition-colors">
                        {section.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {section.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <i data-lucide="clock" className="w-3 h-3"></i>4 hours
                          ago
                        </span>
                        <span className="flex items-center gap-1">
                          <i data-lucide="tag" className="w-3 h-3"></i>
                          {section.tag}
                        </span>
                      </div>
                    </div>
                    <div className="hidden sm:block w-24 h-24 rounded-lg overflow-hidden shrink-0">
                      <img
                        src={section.imageUrl}
                        alt="Update"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
