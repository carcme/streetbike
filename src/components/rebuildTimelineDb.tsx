import { CheckCircle, LockKeyhole } from "lucide-react";
// import tasksData from "@/data/tasksData"; // No longer needed
import { cn } from "@/lib/utils";
import { useTimelinePhasesWithTasks } from "@/hooks/useTasks"; // Import the hook

const RebuildTimelineDB = () => {
  const { data: phases, isLoading } = useTimelinePhasesWithTasks();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  // Handle case where no phases are loaded or available
  if (!phases || phases.length === 0) {
    return (
      <section id="progress" className="bg-background py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="page-title ">
            <span className="text-gold">Rebuild</span> Timeline
          </h2>
          <p className="text-muted-foreground mt-4">
            No timeline phases available yet.
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="progress" className="bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="page-title ">
              <span className="text-gold">Rebuild</span> Timeline
            </h2>
            <span className="text-center text-sm font-normal tracking-widest text-muted-foreground">
              Type 248 (Short-Stroke Airhead)
            </span>
            <p className="italic font-bold pt-4 pb-8">
              Discovered in the Dust{" "}
              <span className="text-gold">Rebuilt for the Redline</span>
            </p>
          </div>

          <div className="relative animate-bottom-in">
            {/* <!-- Timeline Line --> */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px timeline-line hidden md:block " />

            {phases.map((phase, order) => {
              const isPhaseComplete = phase.tasks.every(task => task.status === "completed"); // Determine phase completion

              return (
                <div key={phase.id} className="relative mb-12 md:mb-24">
                  <div className="md:flex items-center justify-between">
                    <div
                      className={cn(
                        "md:w-5/12 md:text-right mb-4 md:mb-0",
                        order % 2 ? "md:order-2" : "",
                      )}
                    >
                      <div className="mechanical-border p-6 rounded-lg inline-block text-left md:text-right w-full">
                        <span className="text-gold text-xs font-bold uppercase tracking-wider">
                          {phase.duration}
                        </span>
                        <h3 className="text-foreground font-display text-xl">
                          {phase.title}
                        </h3>
                        {phase.tasks.map((task) => (
                          <div
                            key={task.id}
                            className="grid grid-cols-12 grid-rows-2 py-1 text-left"
                          >
                            <p
                              key={task.id}
                              className="text-goldVegas text-sm col-span-11"
                            >
                              {task.task}
                            </p>
                            <div className="mt-3 flex gap-1 text-xs justify-center items-center text-muted-foreground col-span-1 row-span-2">
                              {task.status === "completed" && (
                                <>
                                  <CheckCircle className="size-4 text-green-500" />
                                </>
                              )}
                              {task.status !== "completed" && (
                                <>
                                  <CheckCircle className="size-4 text-muted-foreground" />
                                </>
                              )}
                            </div>
                            <p className="text-gray-400 text-xs  col-span-11">
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
                        isPhaseComplete ? "bg-green-600 border-0" : "bg-rust", // Use isPhaseComplete here
                      )}
                    />
                    {/* image */}

                    <div
                      className={cn(
                        "md:w-5/12 ",
                        order % 2 ? "md:pr-12" : "md:pl-12",
                      )}
                    >
                      <div className="relative aspect-square rounded-lg overflow-hidden mechanical-border">
                        {phase.image_url ? ( // Use phase.image_url
                          <img
                            src={phase.image_url}
                            alt={phase.image_alt || phase.title} // Use phase.image_alt
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <LockKeyhole className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 size-20 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </div>
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
