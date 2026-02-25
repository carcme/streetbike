import { createFileRoute, Link } from "@tanstack/react-router";
import { useSteps } from "@/hooks/useSteps";
import { useTimelinePhases } from "@/hooks/useTasks";
import { useProgress } from "@/hooks/useStats";
import { usePageViews, useUniqueVisitors, useTopReferrer } from "@/hooks/usePageViews";
import { ListTodo, Clock, FileText, Eye, Users, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/_admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const { data: steps } = useSteps();
  const { data: phases } = useTimelinePhases();
  // const { data: stats } = useStats();
  // const { data: specs } = useSpecs();
  const { data: progress } = useProgress();
  const { data: pageViews } = usePageViews();
  const { data: uniqueVisitors } = useUniqueVisitors();
  const { data: topReferrer } = useTopReferrer();

  const cards = [
    {
      title: "Rebuild Todo's",
      count: phases?.length ?? 0,
      icon: ListTodo,
      to: "/admin/tasks",
      description: "Project phases",
    },

    {
      title: "Timeline",
      count: steps?.length ?? 0,
      icon: FileText,
      to: "/admin/steps",
      description: "Restoration milestones",
    },
    // {
    //   title: "Stats",
    //   count: stats?.length ?? 0,
    //   icon: BarChart3,
    //   to: "/admin/stats",
    //   description: "Quick statistics",
    // },
    // {
    //   title: "Specs",
    //   count: specs?.length ?? 0,
    //   icon: BarChart3,
    //   to: "/admin/stats",
    //   description: "Technical specifications",
    // },
    {
      title: "Updates",
      count: progress?.length ?? 0,
      icon: Clock,
      to: "/admin/updates",
      description: "Blog-style updates",
    },
  ];

  const userAnalysis = [
    {
      title: "Page Views",
      count: pageViews ?? 0,
      icon: Eye,
      description: "Total site visits",
    },
    {
      title: "Unique Visitors",
      count: uniqueVisitors ?? 0,
      icon: Users,
      description: "Distinct sessions",
    },
    {
      title: "Top Referrer",
      count: topReferrer ? `${topReferrer.host} (${topReferrer.count})` : "None yet",
      icon: ExternalLink,
      description: "Most common traffic source",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">Overview of your content</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              to={card.to}
              className="p-6 transition-colors border rounded-lg bg-card hover:border-primary"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{card.count}</p>
                  <p className="text-sm font-medium">{card.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {card.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="p-6 border rounded-lg bg-card">
        <h2 className="mb-4 text-xl font-semibold">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link to="/admin/tasks">
            <Button variant={"default"}>Manage Todo's</Button>
          </Link>
          <Link to="/admin/steps">
            <Button variant={"outline"}>Add New Step</Button>
          </Link>
          <Link to="/admin/updates">
            <Button variant={"outline"}>Add Progress Update</Button>
          </Link>
          <Link to="/admin/stats">
            <Button variant={"outline"}>Stats</Button>
          </Link>
        </div>
      </div>
      <div className="p-6 border rounded-lg bg-card">
        <h2 className="mb-4 text-xl font-semibold">User Interaction</h2>
        <div className="flex flex-wrap gap-3">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {userAnalysis.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold truncate max-w-[160px]">{card.count}</p>
                    <p className="text-sm font-medium">{card.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {card.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
