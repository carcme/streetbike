// import UmamiAnalytics from "@/components/analytics/UmamiAnalytics";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import Helmet from "@/components/helmet";
import helmetData from "@/data/helmetData";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="min-h-screen flex flex-col">
        <Helmet page={helmetData.home} common={helmetData.common} />
        {/* <Header /> */}
        {/* <UmamiAnalytics /> */}
        <main className="flex-1">
          <Outlet />
        </main>
        {/* <Footer /> */}
      </div>
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
});
