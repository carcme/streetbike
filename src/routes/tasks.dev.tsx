import { createFileRoute } from "@tanstack/react-router";
import RebuildTimeline from "@/components/rebuildTimeline";
import { Header } from "@/components/header";
import Footer from "@/components/footer";

export const Route = createFileRoute("/tasks/dev")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Header />
      <RebuildTimeline />
      <Footer />
    </>
  );
}
