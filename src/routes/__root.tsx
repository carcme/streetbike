import { createRootRoute, Outlet } from "@tanstack/react-router";

import { Header } from "@/components/header";
import Footer from "@/components/footer";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
});
