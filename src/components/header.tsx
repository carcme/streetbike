import { Link } from "@tanstack/react-router";
import { ModeToggle } from "@/components/mode-toggle";
import { headerItems } from "@/data/headerItems";

import { Menu, Shield, ShieldCheck, UserSearch } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/useAuth";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Header() {
  const { isAuthenticated } = useAuth();
  return (
    <header className="sticky top-0 z-50 w-full border-b">
      <div className="mx-auto max-w-6xl bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 ">
        <div className="flex h-14 flex-row gap-8 items-center mx-4">
          <div className="grow-0">
            <Link to="/" className="flex font-bold">
              <span className="text-lg">
                Project<span className="text-gold">R65</span>
              </span>
            </Link>
          </div>
          <div className="grow">
            <nav
              className="hidden md:flex items-start space-x-3 lg:space-x-6 text-sm font-medium"
              aria-label="Main navigation"
            >
              {headerItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.href}
                  className="transition-colors hover:text-foreground/80 text-foreground/60 [&.active]:text-foreground"
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
          <div className="grow-0">
            <div className="flex justify-center items-center gap-2">
              <Button variant="ghost" size="icon">
                <Link to="/about">
                  <UserSearch />
                </Link>
              </Button>
              <ModeToggle />
              <Button variant="ghost" size="icon">
                <Link to="/admin" aria-label="Admin Panel">
                  {isAuthenticated && (
                    <ShieldCheck className="size-5 text-green-600" />
                  )}
                  {!isAuthenticated && <Shield className="size-5" />}
                  <span className="sr-only">To Admin Panel</span>
                </Link>
              </Button>

              {/* add md:hidden to this div */}
              <div className="block md:hidden">
                <Sheet>
                  <SheetTrigger asChild aria-label="Open main menu">
                    <Menu />
                  </SheetTrigger>
                  <SheetContent className="top-14 rounded-l-2xl max-h-fit">
                    <SheetHeader>
                      <SheetTitle>
                        Project <span className="text-gold">R65</span>
                      </SheetTitle>
                    </SheetHeader>
                    <div className="grid flex-1 auto-rows-min gap-4 px-2">
                      {headerItems.map((item) => (
                        <Link
                          key={item.title}
                          to={item.href}
                          className="transition-colors hover:text-gold group"
                        >
                          <div className="flex flex-col text-sm">
                            <div className="leading-none font-medium px-2 group-hover:underline">
                              {item.title}
                            </div>
                            <div className="text-muted-foreground line-clamp-2 px-2">
                              {item.description}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <SheetFooter>
                      {isAuthenticated && <Button>Log out</Button>}
                      <SheetClose asChild>
                        <Button variant="outline">Close</Button>
                      </SheetClose>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
