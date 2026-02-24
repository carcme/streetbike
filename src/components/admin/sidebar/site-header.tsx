import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { IconBrandGithub } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex items-center w-full gap-1 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4 bg-muted"
        />
        <Link to="/">
          <h1 className="text-base font-medium">
            <span className="text-primary">R65</span> Playground
          </h1>
        </Link>

        <div className="flex items-center gap-2 ml-auto">
          <ModeToggle />
          <Button variant="ghost" asChild size="icon-lg" className="flex">
            <a
              href="https://github.com/carcme/streetbike"
              rel="noopener noreferrer"
              target="_blank"
              className="dark:text-foreground"
            >
              <IconBrandGithub />
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
