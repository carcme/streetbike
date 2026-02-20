import { useStats } from "@/hooks/useStats";
import { cn } from "@/lib/utils";

const PersonalStats = () => {
  const { data: stats } = useStats();

  return (
    <section className="py-16 bg-background border-t  border-t-muted-foreground border-b-muted-foreground">
      <div className="max-w-6xl w-screen mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats &&
            stats.map((stat) => (
              <div key={stat.label}>
                <div
                  className={cn(
                    "text-3xl font-display text-foreground mb-1",
                    stat.featured && "text-gold",
                  )}
                >
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">
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
