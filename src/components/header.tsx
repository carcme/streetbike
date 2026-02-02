import { Link } from "@tanstack/react-router";
import { ModeToggle } from "@/components/mode-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-screen border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 mx-auto">
      <div className="w-full max-w-6xl mx-auto flex h-14 items-center justify-between px-4">
        <div className="mx-4 flex flex-1 items-center">
          <Link to="/" className="mr-6 flex items-center space-x-2 font-bold">
            <span>MotoFighter</span>
          </Link>
          <nav className="flex items-center space-x-4 lg:space-x-6 text-sm font-medium ml-4">
            <Link
              to="/"
              className="transition-colors hover:text-foreground/80 text-foreground/60 [&.active]:text-foreground"
            >
              Home
            </Link>
            <Link
              to="/timeline"
              className="transition-colors hover:text-foreground/80 text-foreground/60 [&.active]:text-foreground"
            >
              Timeline
            </Link>
          </nav>
        </div>
        <div className="flex items-center">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
