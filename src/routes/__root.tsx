import { createRootRoute, Outlet } from "@tanstack/react-router";
import Helmet from "@/components/helmet";
import helmetData from "@/data/helmetData";
import { usePageTracking } from "@/hooks/usePageTracking";

function RootComponent() {
  usePageTracking();
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Helmet page={helmetData.home} common={helmetData.common} />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
});
