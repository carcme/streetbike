import { statsData } from "@/data/basicStats";

const calculateDaysActive = () => {
  const purchaseDate = new Date("2026-02-21"); // purchase date
  const today = new Date();
  const timeDiff = today.getTime() - purchaseDate.getTime();
  const daysActive = Math.floor(timeDiff / (1000 * 3600 * 24));
  return daysActive;
};

const StatsGrid = ({ showDays }: { showDays?: boolean }) => {
  return (
    <div className="grid grid-cols-2 gap-4 mx-auto sm:grid-cols-4 md:gap-16">
      {statsData.data.map((stat) => {
        return (
          <div key={stat.label} className="p-4 rounded-lg mechanical-border">
            <div className="text-2xl font-display text-foreground">
              {stat.value}
            </div>
            <div className="text-xs tracking-wider uppercase text-muted-foreground">
              {stat.label}
            </div>
          </div>
        );
      })}

      {showDays && (
        <div className="p-4 rounded-lg mechanical-border">
          <div
            className="text-2xl font-display text-foreground"
            id="days-counter"
          >
            {calculateDaysActive()}
          </div>
          <div className="text-xs tracking-wider uppercase text-muted-foreground">
            Days Active
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsGrid;
