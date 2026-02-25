import { CheckCircle, ImageIcon, LockKeyhole } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTimelinePhasesWithTasks } from "@/hooks/useTasks";
import { Link } from "@tanstack/react-router";
import { Image } from "@lonik/oh-image/react";

const RebuildTimelineDB = () => {
  const { data: phases, isLoading, isError } = useTimelinePhasesWithTasks();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="w-8 h-8 border-b-2 rounded-full animate-spin border-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">Error loading timeline.</div>
    );
  }

  // Handle case where no phases are loaded or available
  if (!phases || phases.length === 0) {
    return (
      <section id="progress" className="py-12 bg-background">
        <div className="max-w-6xl px-4 mx-auto text-center sm:px-6 lg:px-8">
          <h2 className="page-title ">
            <span className="text-primary">Rebuild</span> Timeline
          </h2>
          <p className="mt-4 text-muted-foreground">
            No timeline phases available yet.
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="progress" className="bg-background">
        <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="page-title ">
              <span className="text-primary">Rebuild</span> Timeline
            </h2>
            <span className="text-sm font-normal tracking-widest text-center text-muted-foreground">
              Type 248 (Short-Stroke Airhead)
            </span>
            <p className="pt-4 pb-8 italic font-bold">
              Discovered in the Dust{" "}
              <span className="text-primary">Rebuilt for the Redline</span>
            </p>
          </div>

          <div className="relative animate-bottom-in">
            {/* <!-- Timeline Line --> */}
            <div className="absolute hidden w-px h-full transform -translate-x-1/2 left-1/2 timeline-line md:block " />

            {phases.map((phase, order) => {
              const isPhaseComplete = phase.tasks.every(
                (task) => task.status === "completed",
              );

              return (
                <div key={phase.id} className="relative mb-12 md:mb-24">
                  <Link to="/tasksdb/$phaseId" params={{ phaseId: phase.id }}>
                    <div className="items-center justify-between md:flex">
                      <div
                        className={cn(
                          "md:w-5/12 md:text-right mb-4 md:mb-0",
                          order % 2 ? "md:order-2" : "",
                        )}
                      >
                        <div className="inline-block w-full p-6 text-left rounded-lg mechanical-border md:text-right">
                          <span className="text-xs font-bold tracking-wider uppercase text-primary">
                            {phase.duration}
                          </span>
                          <h3 className="text-xl text-foreground font-display">
                            {phase.title}
                          </h3>
                          {phase.tasks.map((task) => (
                            <div
                              key={task.id}
                              className="grid grid-cols-12 grid-rows-2 py-1 text-left"
                            >
                              <p
                                key={task.id}
                                className="col-span-11 text-sm text-primary"
                              >
                                {task.task}
                              </p>
                              <div className="flex items-center justify-center col-span-1 row-span-2 gap-1 mt-3 text-xs text-muted-foreground">
                                <div className="flex flex-row gap-2">
                                  {task.status === "completed" && (
                                    <>
                                      <CheckCircle
                                        className={cn(
                                          "size-4 text-green-500",
                                          task.status === "completed"
                                            ? "text-green-500"
                                            : "text-muted-foreground",
                                        )}
                                      />
                                    </>
                                  )}
                                  {task.images.length > 0 && (
                                    <ImageIcon className="size-4" />
                                  )}
                                </div>
                              </div>
                              <p className="col-span-11 text-xs text-shadow-muted-foreground">
                                {task.details}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* timeline dot */}
                      <div
                        className={cn(
                          "absolute left-1/2 transform -translate-x-1/2 size-5  rounded-full z-10 hidden md:block",
                          isPhaseComplete ? "bg-green-600" : "bg-primary ",
                        )}
                      />
                      {/* image */}

                      <div
                        className={cn(
                          "md:w-5/12 ",
                          order % 2 ? "md:pr-12" : "md:pl-12",
                        )}
                      >
                        <div className="relative overflow-hidden rounded-lg aspect-square mechanical-border">
                          {phase.image_url ? ( // Use phase.image_url
                            <Image
                              fill={true}
                              src={phase.image_url}
                              alt={phase.image_alt || phase.title}
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <LockKeyhole className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 size-20 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default RebuildTimelineDB;
