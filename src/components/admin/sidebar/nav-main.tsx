import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebar";

import {
  LayoutDashboard,
  ListTodo,
  Clock,
  FileText,
  ChartBar,
} from "lucide-react";
import { Link, useLocation } from "@tanstack/react-router";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/tasks", label: "Todo's", icon: ListTodo },
  { to: "/admin/steps", label: "Steps", icon: FileText },
  { to: "/admin/updates", label: "Updates", icon: Clock },
  { to: "/admin/stats", label: "Statistics", icon: ChartBar },
];

export function NavMain() {
  const location = useLocation();
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <div className="flex-1 space-y-3" aria-label="Admin Navigation">
            {navItems.map((item) => {
              const isActive = location.pathname === item.to;
              const Icon = item.icon;

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-gold text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
