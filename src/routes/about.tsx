import { Header } from "@/components/header";
import { createFileRoute } from "@tanstack/react-router";

import ImageRob from "@/assets/happyRob.webp?$oh";

export const Route = createFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Header />
      <div className="relative text-white">
        <ImageRob
          className="fixed w-full h-[calc(100vh-60px)] object-cover"
          alt="A happy R65 owner"
        />
        <div className="absolute inset-0">
          <div className="relative text-center">
            <h1 className="page-title">
              Why is<span className="text-primary"> Hagen</span>
            </h1>
            <p className="pt-4 pb-8 text-sm italic font-bold tracking-widest text-center sm:text-lg lg:text-3xl">
              <span className="text-primary">"My Job can be done</span> by Rain"
            </p>
          </div>
          <div className="w-4/6 max-w-6xl px-4 mx-auto">
            <p className="pb-8 font-light tracking-wide text-justify">
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
