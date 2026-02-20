import { timelineProgress } from "@/data/updateData";
import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";

const Updates = () => {
  return (
    <section className="pt-16 bg-background pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="font-display text-4xl text-foreground mb-2">
            Build Updates
          </h2>
          <p className="text-muted-foreground">
            Latest progress from the garage
          </p>
        </div>

        <div className="space-y-4">
          {timelineProgress.section.slice(0, 3).map((section) => {
            return (
              <article
                key={section.title}
                className="mechanical-border rounded-lg p-2 sm:p-6 hover:border-gold/30 transition-colors cursor-pointer group"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 size-16 rounded-lg bg-foreground/30 group-hover:bg-gold  flex items-center justify-center text-muted-background dark:text-background font-bold text-sm">
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
                  <div className="hidden xs:block w-24 h-24 rounded-lg overflow-hidden mechanical-border shrink-0">
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

        <div className="mt-8 text-center">
          <Link to="/updates">
            <Button
              variant={"secondary"}
              className="hover:bg-gold bg-goldSatin text-motor-dark transition-colors duration-300"
            >
              View All Updates
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Updates;
