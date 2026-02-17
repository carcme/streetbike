import React from "react";
import { Button } from "./ui/button";

export const Newsletter = () => {
  return (
    <section className="w-full max-w-6xl py-16 bg-muted-foreground sm:rounded-lg relative overflow-hidden">
      <div className="absolute w-full inset-0 bg-[url('http://static.photos/industry/320x240/164')] opacity-20 bg-cover bg-center "></div>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="font-display text-3xl text-white mb-4">
          Follow the Build
        </h2>
        <p className="text-white/70 mb-8">
          Get updates when new progress is made on the R65. No spam, just garage
          stories.
        </p>

        <form
          className="flex items-center flex-col xs:flex-row gap-3"
          id="newsletter-form"
        >
          <input
            type="email"
            placeholder="Enter your email"
            required
            className="flex-1 px-4 py-2 bg-motor-dark/40 border border-white/10 rounded-lg focus:outline-none focus:border-gold text-white placeholder-white/80"
          />
          <Button type="submit" variant={"shed"} className="">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
};
