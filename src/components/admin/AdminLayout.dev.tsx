import { Link, useLocation } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  ListTodo,
  Clock,
  LogOut,
  Home,
  ChartBar,
} from "lucide-react";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/tasks", label: "Rebuild Todo's", icon: Clock },
  { to: "/admin/steps", label: "Steps", icon: ListTodo },
  { to: "/admin/updates", label: "Updates", icon: Clock },
  { to: "/admin/stats", label: "Statistics", icon: ChartBar },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { signOut, user } = useAuth();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}

      <aside className="flex flex-col w-64 border-r bg-card">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold">
            <span className="text-primary">Rob's</span> Playground
          </h1>
          <p className="text-sm truncate text-muted-foreground">
            {user?.email}
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-1" aria-label="Admin Navigation">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            const Icon = item.icon;

            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-4 space-y-2 border-t">
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium transition-colors rounded-md hover:bg-muted"
          >
            <Home className="w-4 h-4" />
            View Site
          </Link>
          <Button
            variant="outline"
            className="justify-start w-full gap-3"
            onClick={handleSignOut}
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto bg-background">{children}</main>
    </div>
  );
}
