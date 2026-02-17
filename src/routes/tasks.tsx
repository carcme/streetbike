import { createFileRoute } from "@tanstack/react-router";
import RebuildTimeline from "@/components/rebuildTimeline";

export const Route = createFileRoute("/tasks")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <RebuildTimeline />
    </>
  );
}
