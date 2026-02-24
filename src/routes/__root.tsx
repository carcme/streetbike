import { createRootRoute, Outlet } from "@tanstack/react-router";
import Helmet from "@/components/helmet";
import helmetData from "@/data/helmetData";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="flex flex-col min-h-screen">
        <Helmet page={helmetData.home} common={helmetData.common} />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </>
  ),
});
