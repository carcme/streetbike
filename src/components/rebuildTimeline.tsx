import { CheckCircle, ImageIcon, LockKeyhole } from "lucide-react";
import tasksData from "@/data/tasksData";
import { cn } from "@/lib/utils";
import { Image } from "@lonik/oh-image/react";

const RebuildTimeline = () => {
  let complete = false;

  return (
    <>
      <section id="progress" className="bg-background">
        <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="page-title ">
              <span className="text-primary">Rebuild</span> Timeline
            </h2>
            <span className="text-sm font-normal tracking-widest text-center text-muted-foreground">
              {tasksData.model_type}
            </span>
            <p className="pt-4 pb-8 italic font-bold">
              Discovered in the Dust
              <span className="text-primary"> Rebuilt for the Redline</span>
            </p>
          </div>

          <div className="relative animate-bottom-in">
            {/* <!-- Timeline Line --> */}
            <div className="absolute hidden w-px h-full transform -translate-x-1/2 left-1/2 timeline-line md:block " />

            {tasksData.timeline.map((phase, order) => (
              <div key={phase.title} className="relative mb-12 md:mb-24">
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
                          <p className="col-span-11 text-sm text-primary">
                            {task.task}
                          </p>
                          <div className="flex items-center justify-center col-span-1 row-span-2 gap-1 mt-3 text-xs text-muted-foreground">
                            {task.status === "completed" && (
                              <>
                                {/* <span>{task.status}</span> */}
                                <CheckCircle className="text-green-500 size-4" />
                                <ImageIcon className="size-4 text-muted-foreground" />
                                {(complete = true)}
                              </>
                            )}
                            {task.status !== "completed" && (
                              <>
                                {/* <span>{task.status}</span> */}
                                <CheckCircle className="size-4 text-muted-foreground" />
                                <ImageIcon className="size-4 text-muted-foreground" />
                                {(complete = false)}
                              </>
                            )}
                          </div>
                          <p className="col-span-11 text-xs text-muted-foreground line-clamp-2">
                            {task.details}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* timeline dot */}
                  <div
                    className={cn(
                      "absolute left-1/2 transform -translate-x-1/2 size-5  rounded-full z-10 hidden md:block border border-foreground",
                      complete ? "bg-green-600" : "bg-primary ",
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
                      {phase.img !== "" ? (
                        <Image
                          fill={true}
                          src={phase.img}
                          alt={phase.imgAlt}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <LockKeyhole className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 size-20 text-muted-foreground" />
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
