import { timelineProgress } from "@/data/updateData";
import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Clock } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useMemo } from "react";
dayjs.extend(relativeTime);

const Updates = ({ limited = false }: { limited?: boolean }) => {
  const numItems = limited ? 3 : timelineProgress.section.length;

  const sortedSections = useMemo(() => {
    return [...timelineProgress.section].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }, [timelineProgress.section]);

  return (
    <section className="py-8 bg-background">
      <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="space-y-4">
          {sortedSections.slice(0, numItems).map((section) => {
            const timeSince = dayjs(section.date).fromNow();
            console.log("🚀 ~ Updates ~ timeSince:", timeSince);
            return (
              <article
                key={section.title}
                className="p-4 transition-colors rounded-lg cursor-pointer mechanical-border hover:border-primary/80 group"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center text-sm font-bold text-center rounded-lg shrink-0 size-16 bg-secondary group-hover:bg-primary text-primary-foreground">
                    {section.date}
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-xl transition-colors text-foreground font-display group-hover:text-primary">
                      {section.title}
                    </h3>
                    <p className="mb-4 text-sm text-gray-400 line-clamp-2">
                      {section.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock size={14} className="text-primary" />
                        {timeSince}
                      </span>
                      <Badge variant={"secondary"}>{section.tag}</Badge>
                    </div>
                  </div>
                  <div className="hidden w-24 h-24 overflow-hidden rounded-lg xs:block mechanical-border shrink-0">
                    <img
                      src={section.imageUrl}
                      alt="Update"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link to="/updates">
            <Button variant={"secondary"}>View All Updates</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Updates;
