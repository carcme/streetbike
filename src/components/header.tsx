import { Link } from "@tanstack/react-router";
import { ModeToggle } from "@/components/mode-toggle";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b">
      <div className="mx-auto max-w-6xl bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 ">
        <div className="flex h-14 items-center justify-between mx-4 ">
          <Link to="/" className="flex font-bold">
            <span className="text-lg">
              Project<span className="text-gold">R65</span>
            </span>
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className="bg-transparent"
                  onPointerMove={(event) => event.preventDefault()}
                  onPointerLeave={(event) => event.preventDefault()}
                >
                  Menu
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-96">
                    <ListItem href="/" title="Home">
                      Back to Start
                    </ListItem>

                    <ListItem href="/story" title="Story">
                      The how and Why.
                    </ListItem>

                    <ListItem href="/tasks" title="Tasks">
                      The process to rebuild.
                    </ListItem>

                    <ListItem href="/updates" title="Updates">
                      Latest updates
                    </ListItem>

                    <ListItem href="/timeline" title="Timeline">
                      Image of the rebuild
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <nav className="flex items-start space-x-3 lg:space-x-6 text-sm font-medium">
            {/* <Link
              to="/"
              className="transition-colors hover:text-foreground/80 text-foreground/60 [&.active]:text-foreground"
            >
              Home
            </Link>
            <Link
              to="/story"
              className="transition-colors hover:text-foreground/80 text-foreground/60 [&.active]:text-foreground"
            >
              Story
            </Link> 
            <Link
              to="/tasks"
              className="transition-colors hover:text-foreground/80 text-foreground/60 [&.active]:text-foreground"
            >
              Tasks
            </Link>
            <Link
              to="/updates"
              className="transition-colors hover:text-foreground/80 text-foreground/60 [&.active]:text-foreground"
            >
              Update
            </Link>
            <Link
              to="/timeline"
              className="transition-colors hover:text-foreground/80 text-foreground/60 [&.active]:text-foreground"
            >
              Timeline
            </Link>
            */}
          </nav>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link to={href}>
          <div className="flex flex-col gap-1 text-sm">
            <div className="leading-none font-medium">{title}</div>
            <div className="text-muted-foreground line-clamp-2">{children}</div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
