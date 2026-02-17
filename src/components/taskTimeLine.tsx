import React from "react";

const StatusIcon = ({ status }) => {
  switch (status) {
    case "completed":
      return (
        <div className="size-4 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
      );
    case "in-progress":
      return (
        <>
          <div className="size-4 rounded-full bg-yellow-100" />
          <div className=" absolute inset-0 size-4 rounded-full bg-yellow-800 animate-pulse" />
        </>
      );
    default:
      return (
        <div className="size-4 rounded-full bg-gray-600 border border-gray-400" />
      );
  }
};

const TaskTimeLine = ({ data }) => {
  return (
    <section className="w-full pt-4 bg-background">
      <div className="max-w-6xl mx-auto sm:px-6 lg:px-8 text-primary font-sans">
        <h1 className="text-3xl font-bold mb-8 border-b border-muted-foreground pb-4 text-gold">
          {data.project}
          <p>
            <span className="text-sm font-normal text-muted-foreground">
              {data.model_type}
            </span>
          </p>
        </h1>

        {data.timeline.map((phase, pIdx) => (
          <div key={pIdx} className="mb-10">
            <div className="flex items-center mb-6">
              <div className="bg-gold text-black/80 font-black px-3 py-1 rounded mr-4">
                PHASE {phase.phase}
              </div>
              <h2 className="text-xl font-semibold tracking-tight uppercase">
                {phase.title}
              </h2>
            </div>

            <div className="ml-4 border-l-2 border-zinc-700">
              {phase.tasks.map((item) => (
                <div key={item.id} className="relative mb-8 ml-6">
                  {/* Visual Connector Dot */}
                  <div className="absolute -left-8.25 top-1/2 ">
                    <StatusIcon status={item.status} />
                  </div>

                  <div
                    className={`p-4 rounded-lg border ${
                      item.status === "in-progress"
                        ? "bg-background border-blue-500/50"
                        : "bg-background border-zinc-700"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-mono text-foreground mb-1 block">
                        TASK {item.id}
                      </span>
                      <span
                        className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                          item.status === "completed"
                            ? "bg-green-900/30 text-green-400"
                            : item.status === "in-progress"
                              ? "bg-blue-900/30 text-blue-400"
                              : "text-zinc-500 bg-zinc-200"
                        }`}
                      >
                        {item.status.replace("-", " ")}
                      </span>
                    </div>
                    <p
                      className={`text-md ${item.status === "completed" ? "text-zinc-400 line-through" : "text-foreground"}`}
                    >
                      {item.task}
                    </p>
                    <p
                      className={`text-xs py-2 ${item.status === "completed" ? "text-zinc-400 line-through" : "text-muted-foreground"}`}
                    >
                      {item.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TaskTimeLine;
