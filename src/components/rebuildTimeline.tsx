import { CheckCircle, LockKeyhole } from "lucide-react";
import tasksData from "@/data/tasksData";
import { cn } from "@/lib/utils";

const RebuildTimeline = () => {
  let complete = false;

  return (
    <>
      <section id="progress" className="bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="page-title ">
              <span className="text-gold">Rebuild</span> Timeline
            </h2>
            <span className="text-center text-sm font-normal tracking-widest text-muted-foreground">
              {tasksData.model_type}
            </span>
            <p className="italic font-bold pt-4 pb-8">
              Discovered in the Dust{" "}
              <span className="text-gold">Rebuilt for the Redline</span>
            </p>
          </div>

          <div className="relative animate-bottom-in">
            {/* <!-- Timeline Line --> */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px timeline-line hidden md:block " />

            {tasksData.timeline.map((phase, order) => (
              <div key={phase.title} className="relative mb-12 md:mb-24">
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
                                {/* <span>{task.status}</span> */}
                                <CheckCircle className="size-4 text-green-500" />
                                {(complete = true)}
                              </>
                            )}
                            {task.status !== "completed" && (
                              <>
                                {/* <span>{task.status}</span> */}
                                <CheckCircle className="size-4 text-muted-foreground" />
                                {(complete = false)}
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
                      complete ? "bg-green-600 border-0" : "bg-rust",
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
                      {phase.img !== "" ? (
                        <img
                          src={phase.img}
                          alt={phase.imgAlt}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <LockKeyhole className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 size-20 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default RebuildTimeline;
