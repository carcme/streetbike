import { timelineProgress } from "@/data/updateData";
import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Clock, X } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useMemo, useState } from "react";
import { Image } from "@lonik/oh-image/react";
dayjs.extend(relativeTime);

type Section = (typeof timelineProgress.section)[number];

const Updates = ({ limited = false }: { limited?: boolean }) => {
  const numItems = limited ? 3 : timelineProgress.section.length;
  const [selected, setSelected] = useState<Section | null>(null);
  const [imageFullscreen, setImageFullscreen] = useState(false);

  const sortedSections = useMemo(() => {
    return [...timelineProgress.section].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }, [timelineProgress.section]);

  const closeModal = () => {
    setSelected(null);
    setImageFullscreen(false);
  };

  return (
    <section className="py-8 bg-background">
      <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="space-y-4">
          {sortedSections.slice(0, numItems).map((section) => {
            const timeSince = dayjs(section.date).fromNow();
            return (
              <article
                key={section.title}
                onClick={() => setSelected(section)}
                className="p-4 transition-colors rounded-lg cursor-pointer mechanical-border hover:border-primary/80 group"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center text-sm font-bold text-center rounded-lg shrink-0 size-16 bg-secondary group-hover:bg-primary text-primary-foreground">
                    {section.date}
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-xl transition-colors text-foreground font-display group-hover:text-primary group-hover:font-bold">
                      {section.title}
                    </h3>
                    <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                      {section.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock size={14} className="text-primary" />
                        {timeSince}
                      </span>
                      <Badge
                        variant={"secondary"}
                        className="text-white capitalize bg-secondary group-hover:bg-primary"
                      >
                        {section.tag}
                      </Badge>
                    </div>
                  </div>
                  <div className="hidden w-24 h-24 overflow-hidden rounded-lg xs:block mechanical-border shrink-0">
                    <Image
                      src={section.imageUrl}
                      alt="Update"
                      className="object-cover w-full h-full group-hover:scale-105"
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

      {/* Detail modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-h-[90vh] max-w-lg p-6 rounded-lg shadow-xl bg-background mechanical-border max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant={"outline"}
              size={"icon-sm"}
              onClick={closeModal}
              className="absolute transition-colors text-foreground top-8 right-8 hover:text-primary"
            >
              <X />
            </Button>

            {/* Image */}
            <div
              className="relative overflow-hidden rounded-lg not-last:mb-4 mechanical-border cursor-zoom-in"
              onClick={() => setImageFullscreen(true)}
            >
              <img
                src={selected.imageUrl}
                alt={selected.title}
                className="object-cover w-full max-h-64"
              />
              <div className="absolute flex items-center justify-center text-sm font-bold text-center rounded-lg inset-2 shrink-0 size-16 bg-primary/80 text-primary-foreground">
                {selected.date}
              </div>
              <Badge className="absolute top-2 right-2">{selected.tag}</Badge>
            </div>

            <h2 className="mb-3 text-2xl font-display text-primary">
              {selected.title}
            </h2>
            <p className="overflow-y-auto text-sm leading-relaxed text-muted-foreground max-h-52">
              {selected.description}
            </p>
            <span className="flex items-center gap-1 pt-4 text-xs text-muted-foreground">
              <Clock size={12} className="text-primary" />
              {dayjs(selected.date).fromNow()}
            </span>
          </div>
        </div>
      )}

      {/* Fullscreen image overlay */}
      {imageFullscreen && selected && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 cursor-zoom-out"
          onClick={() => setImageFullscreen(false)}
        >
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={() => setImageFullscreen(false)}
            className="absolute text-foreground top-4 right-4 "
          >
            <X />
          </Button>
          <Image
            src={selected.imageUrl}
            alt={selected.title}
            className="object-cover sm:w-[80vw] sm:h-[80vh] max-w-full max-h-full"
          />
        </div>
      )}
    </section>
  );
};

export default Updates;
