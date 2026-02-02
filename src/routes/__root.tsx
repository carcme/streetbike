import { createRootRoute, Outlet } from "@tanstack/react-router";

import { Header } from "@/components/header";

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <main className="flex-1 flex flex-col items-center px-4 py-6">
        <div className="w-full max-w-6xl">
          <Outlet />
        </div>
      </main>
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
});
