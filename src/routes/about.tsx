import { Header } from "@/components/header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center text-center space-y-8 ">
        <div className="space-y-4">
          <h1 className="page-title">
            <span className="text-gold">Who is</span> Hagen
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            Some witty tag line header.
            <br />
            <p className="italic text-lg text-center font-bold pt-4 pb-8">
              "My Job can be
              <span className="text-gold"> done by Rain</span>."
            </p>
          </p>
        </div>
      </div>
      <div>
        <div className="flex justify-center w-full">
          <img src="/happyRob.jpeg" height={400} className="w-24" />
        </div>
        <p className="text-center text-2xl pt-8 italic">Nothing here yet</p>
      </div>
    </>
  );
}
