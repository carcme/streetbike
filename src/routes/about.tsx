import { Header } from "@/components/header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Header />
      <div className="relative text-white">
        <img
          className="fixed w-full h-[calc(100vh-60px)] object-cover"
          src="/happyRob.jpeg"
          alt="A happy R65 owner"
        />
        <div className="absolute inset-0">
          <div className="relative text-center">
            <h1 className="page-title">
              Why is<span className="text-gold"> Hagen</span>
            </h1>
            <p className="italic text-sm sm:text-lg lg:text-3xl text-center font-extralight tracking-widest pt-4 pb-8">
              <span className="text-gold">"My Job can be done</span> by Rain"
            </p>
          </div>
          <div className="max-w-6xl w-4/6 px-4 mx-auto">
            <p className="text-justify font-light tracking-wide pb-8">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Recusandae cupiditate repellendus vero dignissimos? Sunt,
              accusantium alias necessitatibus perferendis pariatur asperiores
              amet odio inventore, consequuntur maiores labore sed animi
              voluptates. Rerum!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
