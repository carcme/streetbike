import { Button } from "./ui/button";

export const Newsletter = () => {
  return (
    <section className="relative w-full max-w-6xl py-16 overflow-hidden bg-muted-foreground sm:rounded-lg">
      <div className="absolute w-full inset-0 bg-[url('http://static.photos/industry/320x240/164')] opacity-20 bg-cover bg-center "></div>
      <div className="relative z-10 w-full px-4 mx-auto text-center sm:px-6 lg:px-8">
        <h2 className="mb-4 text-3xl text-white font-display">
          Follow the Build
        </h2>
        <p className="mb-8 text-white/70">
          Get updates when new progress is made on the R65. No spam, just garage
          stories.
        </p>

        <form
          className="flex flex-col items-center gap-3 xs:flex-row"
          id="newsletter-form"
        >
          <input
            type="email"
            placeholder="Enter your email"
            required
            className="flex-1 px-4 py-2 text-white border rounded-lg bg-motor-dark/40 border-white/10 focus:outline-none focus:border-primary placeholder-white/80"
          />
          <Button type="submit" variant={"shed"} className="">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
};
