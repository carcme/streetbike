import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/header";
import Footer from "@/components/footer";
import RebuildTimelineDB from "@/components/rebuildTimelineDb";

export const Route = createFileRoute("/tasksdb")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Header />
      <RebuildTimelineDB />
      <Footer />
    </>
  );
}
