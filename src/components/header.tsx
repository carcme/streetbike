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
import { useState } from "react";

export function Header() {
  const { isAuthenticated } = useAuth();
  const [openMenu, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b">
      <div className="max-w-6xl mx-auto bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 ">
        <div className="flex flex-row items-center gap-8 mx-4 h-14">
          <div className="grow-0">
            <Link to="/" className="flex font-bold">
              <span className="text-lg">
                Project<span className="text-primary">R65</span>
              </span>
            </Link>
          </div>
          <div className="grow">
            <nav
              className="items-start hidden space-x-3 text-sm font-medium md:flex lg:space-x-6"
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
            <div className="flex items-center justify-center gap-2">
              <Link to="/about">
                <Button variant="ghost" size="icon" aria-label="View About me">
                  <UserSearch />
                </Button>
              </Link>
              <ModeToggle />
              <Link to="/admin" aria-label="Admin Panel">
                <Button variant="ghost" size="icon">
                  {isAuthenticated && (
                    <ShieldCheck className="text-green-600 size-5" />
                  )}
                  {!isAuthenticated && <Shield className="size-5" />}
                  <span className="sr-only">To Admin Panel</span>
                </Button>
              </Link>

              {/* add md:hidden to this div */}
              <div className="block md:hidden">
                <Sheet
                  open={openMenu}
                  onOpenChange={() => setMenuOpen(!openMenu)}
                >
                  <SheetTrigger
                    aria-roledescription="button"
                    aria-label="Menu"
                    aria-expanded={openMenu}
                    aria-controls="menu-list"
                    aria-haspopup="true"
                  >
                    <Menu />
                  </SheetTrigger>
                  <SheetContent className="top-14 rounded-l-2xl max-h-fit">
                    <SheetHeader>
                      <SheetTitle>
                        Project <span className="text-primary">R65</span>
                      </SheetTitle>
                    </SheetHeader>
                    <div className="grid flex-1 gap-4 px-2 auto-rows-min">
                      {headerItems.map((item) => (
                        <button
                          key={item.title}
                          aria-label={item.title}
                          className="text-left"
                        >
                          <Link
                            to={item.href}
                            className="transition-colors hover:text-primary group"
                          >
                            <div className="flex flex-col text-sm">
                              <div className="px-2 font-medium leading-none group-hover:underline">
                                {item.title}
                              </div>
                              <div className="px-2 text-muted-foreground line-clamp-2">
                                {item.description}
                              </div>
                            </div>
                          </Link>
                        </button>
                      ))}
                    </div>
                    <SheetFooter>
                      {isAuthenticated && <Button>Log out</Button>}
                      <SheetClose asChild>
                        <Button
                          onClick={() => setMenuOpen(false)}
                          variant="outline"
                        >
                          Close
                        </Button>
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
