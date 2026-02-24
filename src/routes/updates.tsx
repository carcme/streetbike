import { createFileRoute } from "@tanstack/react-router";
import Footer from "@/components/footer";
import { Header } from "@/components/header";
import Updates from "@/components/updates";

export const Route = createFileRoute("/updates")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center space-y-8 text-center">
        <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="mb-8 text-center ">
            <h2 className="mb-2 font-display page-title text-foreground">
              <span className="text-primary">Build</span> Updates
            </h2>
            <p className="text-muted-foreground">
              Latest progress from the garage
            </p>
          </div>
        </div>
      </div>
      <Updates limited={false} />
      <Footer />
    </>
  );
}
