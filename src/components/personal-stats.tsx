import { useStats } from "@/hooks/useStats";
import { cn } from "@/lib/utils";

const PersonalStats = () => {
  const { data: stats } = useStats();

  return (
    <section className="py-16 border-t bg-background border-t-muted-foreground border-b-muted-foreground">
      <div className="w-full max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          {stats &&
            stats.map((stat) => (
              <div key={stat.label}>
                <div
                  className={cn(
                    "text-3xl font-display text-foreground mb-1",
                    stat.featured && "text-primary",
                  )}
                >
                  {stat.value}
                </div>
                <div className="text-xs tracking-wider uppercase text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default PersonalStats;
