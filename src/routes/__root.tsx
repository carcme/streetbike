import { createRootRoute, Outlet } from "@tanstack/react-router";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="min-h-screen flex flex-col">
        {/* <Header /> */}
        <main className="flex-1">
          <Outlet />
          <SpeedInsights />
        </main>
        {/* <Footer /> */}
      </div>
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
});
